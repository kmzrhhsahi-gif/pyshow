// PyShow – Python in the browser for the Write code mode.
// The files share one global scope and are loaded in this order: i18n, bank, problems, core, snake, sound, python, game, ui, main.
// ================= Python in the browser (Pyodide, in a worker so an endless loop can be stopped) =================
const PYODIDE_URL = new URL("pyodide/pyodide.js", location.href).href;   // files are hosted with the site so it also works without access to the CDN
const PyRunner = {
  worker: null, ready: null, jobs: {}, n: 0,
  start() {
    if (this.ready) return this.ready;
    const src = `importScripts(${JSON.stringify(PYODIDE_URL)});
let py = null;
const boot = (async () => { py = await loadPyodide(); await py.runPythonAsync(${JSON.stringify(PY_RUNNER)}); })();
onmessage = async (e) => {
  const { id, code, tests } = e.data;
  try {
    await boot;
    py.globals.set("_code", code);
    py.globals.set("_tests", tests);
    postMessage({ id, out: await py.runPythonAsync("await run_tests(_code, _tests)") });
  } catch (err) { postMessage({ id, fail: String(err) }); }
};
boot.then(() => postMessage({ id: "ready" }), (err) => postMessage({ id: "ready", fail: String(err) }));`;
    const w = new Worker(URL.createObjectURL(new Blob([src], { type: "text/javascript" })));
    this.worker = w;
    let ok, bad;
    this.ready = new Promise((res, rej) => { ok = res; bad = rej; });
    this.ready.catch(() => this.reset());
    const giveUp = setTimeout(() => bad(new Error("timeout")), 90000);
    w.onerror = () => bad(new Error("worker"));
    w.onmessage = (e) => {
      const { id } = e.data;
      if (id === "ready") { clearTimeout(giveUp); e.data.fail ? bad(new Error(e.data.fail)) : ok(); return; }
      const j = this.jobs[id];
      if (!j) return;
      delete this.jobs[id];
      e.data.fail ? j.rej(new Error(e.data.fail)) : j.res(JSON.parse(e.data.out));
    };
    return this.ready;
  },
  reset() {
    if (this.worker) this.worker.terminate();
    this.worker = null; this.ready = null;
    Object.values(this.jobs).forEach((j) => j.rej(new Error("stopped")));
    this.jobs = {};
  },
  async run(code, tests, ms = 6000) {
    await this.start();
    const id = ++this.n;
    return new Promise((res, rej) => {
      const timer = setTimeout(() => { delete this.jobs[id]; this.reset(); res({ timeout: true }); }, ms);
      this.jobs[id] = { res: (v) => { clearTimeout(timer); res(v); }, rej: (e) => { clearTimeout(timer); rej(e); } };
      this.worker.postMessage({ id, code, tests: JSON.stringify(tests) });
    });
  },
};
// runs the player's code against the tests of the current problem
async function runPy(code) {
  try { return await PyRunner.run(code, session.q.tests); }
  catch (e) { return { offline: true }; }
}
function renderRun(out, r) {
  out.classList.remove("good", "bad");
  if (r.offline) { out.textContent = t("pyOffline"); return; }
  if (r.timeout) { out.textContent = t("pyTimeout"); out.classList.add("bad"); return; }
  if (r.error) { out.textContent = "✗ " + r.error; out.classList.add("bad"); return; }
  const pass = r.results.filter((x) => x.ok).length;
  const lines = r.results.map((x) => {
    const last = x.t.split("\n").pop();
    return x.ok ? `✓ ${last}` : `✗ ${last}\n    ${t("gotLbl")}: ${x.got}   ${t("wantLbl")}: ${x.want}`;
  });
  out.textContent = `${t("testsPassed")}: ${pass} / ${r.results.length}\n` + lines.join("\n");
  out.classList.add(pass === r.results.length ? "good" : "bad");
}
function taskText(q) {
  const wrap = (txt) => {
    const out = []; let line = "";
    txt.split(" ").forEach((w) => { if ((line + " " + w).length > 78) { out.push(line); line = w; } else line = line ? line + " " + w : w; });
    return out.concat(line);
  };
  const L = state.lang, title = (q.title[L] || q.title.en), desc = (q.desc[L] || q.desc.en);
  return ["# " + title, "#", ...wrap(desc).map((x) => "# " + x), "#", `# ${t("testsPassed")}: ${q.tests.length}`].join("\n");
}
const PY_KW = "and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield".split(" ");
const PY_CONST = ["True", "False", "None", "self"];
const PY_BUILT = "print len range int str float list dict set tuple bool sum min max abs sorted reversed enumerate zip map filter isinstance open input type round any all".split(" ");
function highlightPy(src) {
  const esc = (x) => x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const re = /(#[^\n]*)|("""[\s\S]*?(?:"""|$)|'''[\s\S]*?(?:'''|$)|"(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)/g;
  let out = "", last = 0, m, prev = "";
  while ((m = re.exec(src))) {
    out += esc(src.slice(last, m.index)); last = re.lastIndex;
    const w = m[0];
    if (m[1]) out += `<span class="hc">${esc(w)}</span>`;
    else if (m[2]) out += `<span class="hs">${esc(w)}</span>`;
    else if (m[3]) out += `<span class="hn">${w}</span>`;
    else if (PY_KW.includes(w)) out += `<span class="hk">${w}</span>`;
    else if (PY_CONST.includes(w)) out += `<span class="hv">${w}</span>`;
    else if (prev === "def" || prev === "class") out += `<span class="hf">${w}</span>`;
    else if (PY_BUILT.includes(w)) out += `<span class="hb">${w}</span>`;
    else out += esc(w);
    prev = w;
  }
  return out + esc(src.slice(last)) + "\n";
}
function setupCode(ans) {
  const ta = el("textarea", { class: "editor", spellcheck: "false", autocapitalize: "off", autocomplete: "off", "aria-label": t("codeEditor") });
  ta.value = session.q.starter;
  ta.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && !e.ctrlKey && !e.metaKey) { e.preventDefault(); ta.setRangeText("    ", ta.selectionStart, ta.selectionEnd, "end"); }
  });
  const out = el("pre", { class: "testout", "aria-live": "polite", text: t("pyHint") });
  const run = el("button", { class: "chip", text: t("runTests"), onclick: async () => {
    if (session.locked || run.disabled) return;
    run.disabled = true;
    out.textContent = t("pyLoading");
    const r = await runPy(ta.value);
    renderRun(out, r);
    run.disabled = false;
  } });
  const hl = el("pre", { class: "hl", "aria-hidden": "true" });
  const paint = () => { hl.innerHTML = highlightPy(ta.value); hl.scrollTop = ta.scrollTop; hl.scrollLeft = ta.scrollLeft; };
  ta.addEventListener("input", paint);
  ta.addEventListener("scroll", () => { hl.scrollTop = ta.scrollTop; hl.scrollLeft = ta.scrollLeft; });
  const wrap = el("div", { class: "edwrap" }, hl, ta);
  paint();
  ans.append(wrap, el("div", { class: "code-actions" }, run, el("span", { class: "empty", text: "Ctrl + Enter = " + t("submitCode") })), out);
  PyRunner.start().catch(() => {});
  $("confirm").disabled = false;
}

