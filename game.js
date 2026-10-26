// PyShow – Points, XP, levels, game flow, sidebar and tooltips.
// The files share one global scope and are loaded in this order: i18n, bank, problems, core, snake, sound, python, game, ui, main.
// ================= Points and messages =================
function getGames() {
  try { return JSON.parse(load("pyshow_games", "[]")); } catch (e) { return []; }
}
function totalPoints() { return getGames().reduce((s, g) => s + g.delta, 0); }   // leaderboard score (wins +, losses -)

// XP never goes down and decides the level: game wins + rewards
function getBonus() { return Number(load("pyshow_bonus", "0")) || 0; }
function addBonus(n) { save("pyshow_bonus", String(getBonus() + n)); }
function getXP() { return getGames().reduce((s, g) => s + Math.max(0, g.delta), 0) + getBonus(); }
const lvlStart = (n) => 25 * n * (n - 1);          // XP needed to reach level n (L2 = 50, L3 = 150, L4 = 300 ...)
function levelOf(xp) { let l = 1; while (xp >= lvlStart(l + 1)) l++; return l; }
// runs fn (which adds XP); returns the new level if it went up, otherwise 0
function gainXP(fn) {
  const before = levelOf(getXP());
  fn();
  updateXpBar();
  const after = levelOf(getXP());
  if (after > before) addMessage("level", { n: after });
  return after > before ? after : 0;
}

// ----- Persistent XP bar (home screen) -----
function updateXpBar() {
  const b = $("xpbar");
  if (!b) return;
  const xp = getXP(), lv = levelOf(xp), a = lvlStart(lv), n = lvlStart(lv + 1);
  b.replaceChildren(
    el("div", { class: "xp-top" }, el("b", { text: `${t("lvlN").replace("{n}", lv)} · ${rankOf(lv)}` }), el("span", { text: `${xp - a} / ${n - a} ${t("xp")}` })),
    el("div", { class: "bar" }, el("i", { style: `width:${((xp - a) / (n - a)) * 100}%` })));
}

// ----- Level-up celebration: confetti, glowing rings, level counter and an XP bar that fills up -----
function confetti(cv, ms) {
  const ctx = cv.getContext("2d"), dpr = window.devicePixelRatio || 1;
  const W = (cv.width = innerWidth * dpr), H = (cv.height = innerHeight * dpr);
  const cs = getComputedStyle(document.documentElement);
  const cols = [cs.getPropertyValue("--accent").trim(), cs.getPropertyValue("--scale").trim(), "#ffd34d", "#ffffff", "#ff6b81", "#7cf0ff"];
  const P = Array.from({ length: 170 }, (_, i) => ({
    x: W / 2, y: H * 0.46, vx: (Math.random() - 0.5) * 20 * dpr, vy: -(6 + Math.random() * 16) * dpr,
    w: (5 + Math.random() * 8) * dpr, h: (3 + Math.random() * 6) * dpr, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,
    c: cols[i % cols.length], life: 0.6 + Math.random() * 0.4,
  }));
  const t0 = performance.now();
  (function frame(now) {
    const k = (now - t0) / ms;
    ctx.clearRect(0, 0, W, H);
    P.forEach((p) => {
      p.vy += 0.38 * dpr; p.vx *= 0.992; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save(); ctx.globalAlpha = Math.max(0, Math.min(1, (p.life - k) * 2.5));
      ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
    });
    if (k < 1 && cv.isConnected) requestAnimationFrame(frame);
  })(t0);
}
function celebrate(lv) {
  const old = $("lvlfx");
  if (old) old.remove();
  const a = lvlStart(lv), b = lvlStart(lv + 1), xp = getXP();
  const num = el("div", { class: "lf-num", text: String(lv - 1) });
  const fill = el("i", { style: "width:0%" });
  const close = () => { root.remove(); document.removeEventListener("keydown", onKey); if (lastFocus) lastFocus.focus(); };
  const lastFocus = document.activeElement;
  const gift = giftsPending() > 0 ? el("button", { class: "btn-primary", text: t("lvlGift"), onclick: () => { close(); $("result").hidden = true; openRewards(); } }) : null;
  const cont = el("button", { class: gift ? "chip" : "btn-primary", text: t("okBtn"), onclick: close });
  const cv = el("canvas", { class: "lf-confetti", "aria-hidden": "true" });
  const root = el("div", { id: "lvlfx", class: "lvlfx", role: "dialog", "aria-modal": "true", "aria-label": t("lvlUp") }, cv,
    el("div", { class: "lf-card" },
      el("div", { class: "lf-glow", "aria-hidden": "true" }),
      el("div", { class: "lf-title", text: t("lvlUp") }),
      el("div", { class: "lf-badge" }, el("div", { class: "lf-ring r1" }), el("div", { class: "lf-ring r2" }), el("div", { class: "lf-ring r3" }),
        el("div", { class: "lf-lv", text: t("level") }), num),
      el("div", { class: "lf-rank", text: rankOf(lv) }),
      el("div", { class: "lf-xp" }, el("div", { class: "bar" }, fill), el("span", { text: `${xp - a} / ${b - a} ${t("xp")}` })),
      el("div", { class: "lf-actions" }, ...(gift ? [gift, cont] : [cont]))));
  const onKey = (e) => {
    if (e.key === "Escape") close();
    if (e.key === "Tab") { const f = [...root.querySelectorAll("button")]; if (!f.length) return; const i = f.indexOf(document.activeElement); e.preventDefault(); f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus(); }
  };
  document.addEventListener("keydown", onKey);
  document.body.append(root);
  (gift || cont).focus();
  sfxLevel();
  if (state.anim === "on") {
    confetti(cv, 4200);
    setTimeout(() => { num.textContent = String(lv); num.classList.add("pop"); }, 650);
    setTimeout(() => { fill.style.width = `${((xp - a) / (b - a)) * 100}%`; }, 500);
  } else { num.textContent = String(lv); fill.style.width = `${((xp - a) / (b - a)) * 100}%`; }
}

// Missions: win N games with the given mode / difficulty, claim the reward, the next one appears
const MISSIONS = [
  { mode: "A", diff: "easy", n: 10, xp: 60 },
  { mode: "B", diff: "easy", n: 5, xp: 70 },
  { mode: "A", diff: "medium", n: 8, xp: 100 },
  { mode: "B", diff: "medium", n: 5, xp: 120 },
  { pro: true, n: 3, xp: 200 },
  { mode: "A", diff: "hard", n: 5, xp: 160 },
  { mode: "B", diff: "hard", n: 5, xp: 240 },
  { mode: "C", diff: "easy", n: 3, xp: 150 },
  { mode: "C", diff: "medium", n: 3, xp: 220 },
  { mode: "C", diff: "hard", n: 2, xp: 400 },
  { pro: true, n: 5, xp: 350 },
];
function getMission() {
  try { const m = JSON.parse(load("pyshow_mission", "")); if (m && typeof m.i === "number") return m; } catch (e) {}
  return { i: 0, p: 0 };
}
function setMission(m) { save("pyshow_mission", JSON.stringify(m)); }
function missionProgress(win) {
  const m = getMission(), d = MISSIONS[m.i % MISSIONS.length];
  const ok = (!d.mode || d.mode === session.mode) && (!d.diff || d.diff === session.diff) && (!d.pro || session.pro);
  if (!ok || m.p >= d.n) return;                 // a finished mission keeps its progress until it is claimed
  m.p = win ? m.p + 1 : 0;                       // the wins must be in a row: a loss starts the count again
  setMission(m);
}

function getInbox() {
  try { return JSON.parse(load("pyshow_inbox", "[]")); } catch (e) { return []; }
}
function setInbox(list) {
  save("pyshow_inbox", JSON.stringify(list.slice(-100)));
  updateBadge();
}
function addMessage(type, data = {}, sample = false) {
  const list = getInbox();
  list.push({ id: Date.now() + Math.random(), type, data, at: Date.now(), read: false, sample });
  setInbox(list);
}
function updateBadge() {
  const n = getInbox().filter((m) => !m.read).length;
  const b = $("badge");
  b.textContent = n > 9 ? "9+" : String(n);
  b.hidden = n === 0;
}
function seedInbox() {
  if (load("pyshow_seeded", "")) { updateBadge(); return; }
  save("pyshow_seeded", "1");
  addMessage("welcome");
  addMessage("report", { reason: "cheat", textKey: "sampleReportText", n: 1 }, true);
}

function msgText(m) {
  const d = m.data || {};
  const vars = {
    date: fmtDate(m.at),
    pts: d.pts,
    d: d.diff ? t(d.diff) : "",
    reason: d.reason ? t("r_" + d.reason) : "",
    text: d.textKey ? t(d.textKey) : (d.text || ""),
    n: d.n,
    src: d.src ? t(d.src) : "",
  };
  let body = t("msg_" + m.type + "_b");
  Object.entries(vars).forEach(([k, v]) => { body = body.split("{" + k + "}").join(v); });
  return { title: t("msg_" + m.type + "_t"), body };
}

// ================= Game flow =================
let session = null;

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// picks a question of one of the chosen topics, preferring the chosen difficulty
const RECENT = [];
// ----- Review list: questions you got wrong come back later (after 10 min, 1, 3, 7 days) until you answer them right again -----
const MISS_GAP = [10 * 60e3, 864e5, 3 * 864e5, 7 * 864e5];
const qKey = (q) => (q.title || q.code || "").slice(0, 90);
function getMiss() { try { return JSON.parse(load("pyshow_miss", "{}")) || {}; } catch (e) { return {}; } }
function recordMiss(q, win) {
  const m = getMiss(), k = qKey(q); if (!k) return;
  if (!win) m[k] = { b: 0, due: Date.now() + MISS_GAP[0] };
  else if (m[k]) { m[k].b++; if (m[k].b >= MISS_GAP.length) delete m[k]; else m[k].due = Date.now() + MISS_GAP[m[k].b]; }
  save("pyshow_miss", JSON.stringify(m));
}
function pickQuestion(pool, topics, diff) {
  const miss = getMiss(), now = Date.now();
  const due = pool.filter((q) => miss[qKey(q)] && miss[qKey(q)].due <= now && !RECENT.includes(q));
  if (due.length && Math.random() < 0.4) {                          // sometimes bring back a question you got wrong
    const q = due[Math.floor(Math.random() * due.length)];
    RECENT.push(q); if (RECENT.length > 12) RECENT.shift();
    return q;
  }
  let c = pool.filter((q) => topics.includes(q.topic));
  if (!c.length) c = pool;
  const m = c.filter((q) => q.lvl === diff);
  if (m.length) c = m;
  const fresh = c.filter((q) => !RECENT.includes(q));            // do not repeat a question you just saw
  if (fresh.length) c = fresh;
  const q = c[Math.floor(Math.random() * c.length)];
  RECENT.push(q); if (RECENT.length > 12) RECENT.shift();
  return q;
}

// ----- Lock after a loss (later: coins can buy another chance) and the answer timer -----
const MAX_LIVES = 3, LIFE_MS = 3 * 60 * 1000, LOCK_MS = 20 * 60 * 1000;   // 3 locks; one comes back every 3 min; with all 3 gone, 20 min
const TIME_LIMIT = { A: { easy: 30, medium: 45, hard: 60 }, B: { easy: 60, medium: 90, hard: 120 }, C: { easy: 180, medium: 240, hard: 300 } };
// lives: { n: locks left, next: when the next one comes back, lock: when a full lock ends (all 3 lost) }
function getLives() {
  let v; try { v = JSON.parse(load("pyshow_lives", "null")); } catch (e) { v = null; }
  if (!v) v = { n: MAX_LIVES, next: 0, lock: 0 };
  const now = Date.now();
  if (v.lock) { if (now >= v.lock) v = { n: MAX_LIVES, next: 0, lock: 0 }; else return { n: 0, next: 0, lock: v.lock }; }
  while (v.n < MAX_LIVES && v.next && now >= v.next) { v.n++; v.next = v.n < MAX_LIVES ? v.next + LIFE_MS : 0; }
  return v;
}
function loseLife() {
  const v = getLives(), now = Date.now();
  v.n = Math.max(0, v.n - 1);
  if (v.n === 0) { v.lock = now + LOCK_MS; v.next = 0; }
  else if (!v.next) v.next = now + LIFE_MS;
  save("pyshow_lives", JSON.stringify(v));
  updateLives();
}
const lockLeft = () => { const v = getLives(); return v.n > 0 ? 0 : Math.max(0, v.lock - Date.now()); };
function updateLives() {
  const b = $("lives"); if (!b) return;
  const v = getLives(), until = v.n === 0 ? v.lock : v.next;
  const lock = (open) => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${open ? "on" : "off"}"><rect x="5" y="11" width="14" height="10" rx="2" ${open ? 'fill="currentColor" fill-opacity=".18"' : ""}/><path d="${open ? "M8 11V7a4 4 0 0 1 7.5-1.9" : "M8 11V7a4 4 0 0 1 8 0v4"}"/></svg>`;
  const sk = getStreak().n;
  const flame = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${sk ? "on fl" : "off"}"><path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z"/></svg>`;
  b.innerHTML = Array.from({ length: MAX_LIVES }, (_, i) => lock(i < v.n)).join("") + (until ? `<span>${fmtMS(until - Date.now())}</span>` : "") + `<i class="sep"></i>${flame}<span title="${t("streakDays").replace("{n}", sk)}">${sk}</span>`;
  b.setAttribute("aria-label", `${v.n} / ${MAX_LIVES}`);
}
const fmtMS = (ms) => { const s = Math.ceil(ms / 1000); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
const lockText = () => t("lockMsg").replace("{t}", fmtMS(lockLeft()));
setInterval(() => {
  updateLives();
  if (view !== "home") return;
  if (lockLeft() > 0) { msg.className = "msg"; msg.dataset.lock = "1"; msg.textContent = lockText(); }
  else if (msg.dataset.lock) { delete msg.dataset.lock; msg.textContent = ""; }
}, 1000);

const Timer = {
  id: null,
  start(ms) {
    this.stop();
    const total = (TIME_LIMIT[session.mode][session.diff] || 60) * 1000;
    session.total = total; session.endAt = Date.now() + (ms || total);
    let lastSec = -1;
    const tick = () => {
      const left = Math.max(0, session.endAt - Date.now()), sec = Math.ceil(left / 1000);
      $("qt-sec").textContent = fmtMS(left);
      $("qt-fill").style.width = (left / total) * 100 + "%";
      $("qtimer").classList.toggle("warn", sec <= 10);
      if (sec <= 5 && sec > 0 && sec !== lastSec) sfxTick();
      lastSec = sec;
      if (left <= 0) timeUp();
    };
    tick(); this.id = setInterval(tick, 250);
  },
  stop() { if (this.id) clearInterval(this.id); this.id = null; },
};
function timeUp() {
  if (!session || session.locked || busy || session.timedOut) return;
  session.timedOut = true;
  Timer.stop();
  $("sr").textContent = t("timeUp");
  $("confirm").disabled = false;
  $("confirm").click();
}

async function startGame() {
  if (busy || !app.classList.contains("done") || view !== "home") return;
  if (lockLeft() > 0) { msg.className = "msg"; msg.dataset.lock = "1"; msg.textContent = lockText(); return; }
  const mode = document.querySelector("#modes .active").dataset.value;
  const diff = document.querySelector("#difficulty .active").dataset.value;
  const picked = pickedTopics();
  // an advanced (Pro) topic counts double for the points bonus
  const topics = picked.reduce((n, k) => n + (PRO_TOPICS.includes(k) ? 2 : 1), 0);

  if (!picked.length) { msg.className = "msg"; msg.textContent = t("noTopic"); return; }

  audio(); // unlock sound (needs a click)
  sfxSlither();
  if (mode === "C") PyRunner.start().catch(() => {});   // start loading Python while the snake moves
  msg.textContent = "";
  busy = true;
  panel.classList.add("locked");
  session = {
    mode, diff, topics, locked: true, sel: -1,
    pro: $("pro-chip").classList.contains("active"),
    q: pickQuestion(mode === "B" ? BUGS : mode === "C" ? PROBLEMS : QUESTIONS, picked, diff),
  };

  try {
    // 1) the snake leaves: straight on, up at the screen edge and out of the top
    await tween(2600, (x) => { hero.head = hero.len + x * hero.rig.LEN; });
    // 2) everything fades away
    await fade(home, 0, 600);
    // 3) the snake comes back from the top and makes a frame
    gameInner.classList.remove("show");
    frame.angry = false;
    frame.rig.hs = 0.42;
    frameSvg.classList.remove("angry");
    $("frame-head").classList.remove("fast");
    showView("game");
    frame.head = 0;
    renderFrame(performance.now() / 1000);
    setupQuestion();
    await tween(Math.max(1800, frame.len * 0.9), (x) => {
      frame.head = x * frame.len;
      if (x > 0.4) gameInner.classList.add("show");
    });
    session.locked = false;
    Timer.start();
  } finally {
    busy = false;
  }
}

// Game B: choose how many bugs, then a line + bug type for each
function setupBugForm(ans) {
  const lines = session.q.code.split("\n").length;
  const rows = el("div", { class: "brows" });
  const cnt = el("div", { class: "options" });
  const check = () => {
    $("confirm").disabled = !rows.children.length || [...rows.querySelectorAll("select")].some((s) => !s.value);
  };
  ans.append(el("div", { class: "blabel", text: t("bugCount") }), cnt, rows);
  [1, 2, 3, 4].forEach((n) => {
    const b = el("button", { class: "chip", text: String(n) });
    b.addEventListener("click", () => {
      if (session.locked) return;
      cnt.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      b.classList.add("active");
      rows.innerHTML = "";
      for (let i = 0; i < n; i++) {
        const ln = select([["", t("bugLine")], ...Array.from({ length: lines }, (_, k) => [String(k + 1), `${t("bugLine")} ${k + 1}`])]);
        const ty = select([["", t("bugType")], ...BUG_TYPES.map((k) => [k, t("bt_" + k)])]);
        [ln, ty].forEach((s) => s.addEventListener("change", check));
        rows.append(el("div", { class: "brow" }, ln, ty));
      }
      check();
    });
    cnt.append(b);
  });
  $("confirm").disabled = true;
}

function checkBugs() {
  const want = session.q.bugs.map((b) => b.line + ":" + b.type).sort().join();
  const got = [...$("answers").querySelectorAll(".brow")].map((r) => {
    const s = r.querySelectorAll("select");
    return s[0].value + ":" + s[1].value;
  }).sort().join();
  return want === got;
}

// A faint watermark (name, date, short id) over the game: it cannot stop a screenshot, but a shared picture shows where it came from.
function updateWatermark() {
  let w = $("wm");
  if (!w) { w = document.createElement("div"); w.id = "wm"; w.className = "wm"; w.setAttribute("aria-hidden", "true"); document.body.append(w); }
  let vid = load("pyshow_vid", "");
  if (!vid) { vid = Math.random().toString(36).slice(2, 8); save("pyshow_vid", vid); }
  const name = (load("pyshow_name", "") || "PyShow").replace(/[<>&"']/g, "");
  const txt = `${name} · ${new Date().toISOString().slice(0, 10)} · ${vid}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="200"><text x="20" y="110" transform="rotate(-24 180 100)" font-family="monospace" font-size="17" fill="#808080" fill-opacity="0.16">${txt}</text></svg>`;
  w.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
function setupQuestion() {
  updateWatermark();
  const q = session.q;
  const codeEl = $("code");
  codeEl.innerHTML = "";
  gameInner.dataset.mode = session.mode;
  $("confirm").textContent = t(session.mode === "C" ? "submitCode" : "confirm");
  (session.mode === "C" ? taskText(q) : q.code).split("\n").forEach((line, i) => {
    codeEl.append(el("div", { class: "line" },
      el("span", { class: "ln", text: String(i + 1) }),
      el("span", { class: "tx", text: line || " " })));
  });

  const ans = $("answers");
  ans.className = session.mode === "B" ? "bugform" : session.mode === "C" ? "codeform" : "answers";
  ans.innerHTML = "";
  if (session.mode === "B") { setupBugForm(ans); return; }
  if (session.mode === "C") { setupCode(ans); return; }
  session.opts = shuffle(q.options.map((text, i) => ({ text, i })));
  session.opts.forEach((o, idx) => {
    const b = el("button", { class: "opt", text: o.text });
    b.addEventListener("click", () => {
      if (session.locked) return;
      session.sel = idx;
      ans.querySelectorAll(".opt").forEach((x) => x.classList.remove("sel"));
      b.classList.add("sel");
      $("confirm").disabled = false;
    });
    ans.append(b);
  });
  $("confirm").disabled = true;
}

$("confirm").addEventListener("click", async () => {
  if (!session || session.locked || (session.sel < 0 && session.mode === "A" && !session.timedOut) || busy) return;
  audio();
  const left = session.endAt - Date.now();
  Timer.stop();
  session.locked = true;
  busy = true;
  $("confirm").disabled = true;
  const btns = [...$("answers").querySelectorAll(session.mode === "B" ? ".brow" : session.mode === "C" ? ".editor" : ".opt")];
  const targets = session.mode === "A" ? (session.sel >= 0 ? [btns[session.sel]] : []) : btns;
  let ok = session.timedOut ? false : session.mode === "B" ? checkBugs() : session.mode === "A" ? session.opts[session.sel].i === session.q.answer : false;

  try {
    targets.forEach((x) => x.classList.add("checking"));
    if (session.mode === "C" && !session.timedOut) {            // run the player's code against the tests
      const ed = btns[0], out = $("answers").querySelector(".testout");
      ed.readOnly = true;
      out.textContent = t("pyLoading");
      const r = await runPy(ed.value);
      renderRun(out, r);
      if (r.offline) {                     // Python could not load: nothing is lost, try again later
        targets.forEach((x) => x.classList.remove("checking"));
        ed.readOnly = false; session.locked = false; $("confirm").disabled = false; Timer.start(Math.max(5000, left));
        return;
      }
      session.last = r;
      ok = !r.error && !r.timeout && !!r.results && r.results.length > 0 && r.results.every((x) => x.ok);
    }
    await wait(900);                       // short suspense
    targets.forEach((x) => x.classList.remove("checking"));
    targets.forEach((x) => x.classList.add(ok ? "correct" : "wrong"));
    $("sr").textContent = ok ? t("resultWin") : t("resultLose");
    if (ok) {
      sfxWin();
      await wait(1000);
      await finishWin();
    } else {
      await finishLose();
    }
  } finally {
    busy = false;
  }
});

function recordGame(win) {
  const base = { easy: 10, medium: 20, hard: 35 }[session.diff] || 10;
  // harder level and more known topics = more points; a wrong answer costs half
  let pts = Math.round(base * (1 + 0.1 * (session.topics - 1)) * (session.mode === "C" ? 1.5 : 1));   // writing code is worth more
  const combo = win ? getCombo() + 1 : 0;                         // wins in a row give a bonus
  save("pyshow_combo", String(combo));
  lastCombo = win && combo > 1 ? { n: combo, pct: Math.round((comboMult(combo) - 1) * 100) } : null;
  if (win) pts = Math.round(pts * comboMult(combo));
  recordMiss(session.q, win);
  touchStreak();
  if (win) dailyWin();
  const delta = win ? pts : -Math.round(pts / 2);
  const list = getGames();
  const up = gainXP(() => {
    list.push({ delta, at: Date.now(), diff: session.diff, win });
    save("pyshow_games", JSON.stringify(list.slice(-2000)));
  });
  addMessage(win ? "win" : "lose", { pts: Math.abs(delta), diff: session.diff });
  missionProgress(win);
  return { delta, up };
}

async function backToHome() {
  gameInner.classList.remove("show");
  game.style.opacity = "1";
  frame.angry = false;
  frameSvg.classList.remove("angry");
  home.style.opacity = "0";
  showView("home");
  restoreHero();
  renderHero(performance.now() / 1000);
}

async function finishWin() {
  // the snake goes back the way it came: up through the top where it entered
  await tween(frame.rig.LEN / 1.4, (x) => { frame.head = frame.len + x * frame.rig.LEN; });
  await fade(game, 0, 600);
  const r = recordGame(true);
  await backToHome();
  await fade(home, 1, 700);
  showResult(true, r.delta, r.up);
}

async function finishLose() {
  // angry snake
  frame.angry = true;
  frame.rig.hs = 0.62;
  frameSvg.classList.add("angry");
  $("frame-head").classList.add("fast");
  sfxHiss();
  await wait(1400);

  // bite
  const bite = $("bite");
  bite.hidden = false;
  bite.style.opacity = "1";
  bite.className = "bite show";
  sfxChomp();
  await wait(520);
  bite.classList.add("blackout");

  // behind the black screen: go back to home
  $("frame-head").classList.remove("fast");
  frame.rig.hs = 0.42;
  loseLife();
  const r = recordGame(false);
  await backToHome();
  home.style.opacity = "1";
  await wait(1000);

  // fade the black away
  bite.style.transition = "opacity .9s ease";
  bite.style.opacity = "0";
  await wait(900);
  bite.hidden = true;
  bite.className = "bite";
  bite.style.transition = "";
  showResult(false, r.delta, r.up);
}

async function leaveGame() {
  Timer.stop();
  if (busy || !session) { showView("home"); return; }
  busy = true;
  session.locked = true;
  try {
    await tween(frame.rig.LEN / 1.4, (x) => { frame.head = frame.len + x * frame.rig.LEN; });
    await fade(game, 0, 600);
    await backToHome();
    await fade(home, 1, 700);
  } finally {
    busy = false;
  }
}

const ICON_WIN = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M32 5l20 7v17c0 14-9 24-20 30C21 53 12 43 12 29V12z"/><path d="M22 32l7 7 14-15"/></svg>`;
const ICON_LOSE = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M32 5C19 5 10 14 10 27c0 8 4 14 10 17v9h24v-9c6-3 10-9 10-17C54 14 45 5 32 5z"/><circle cx="23" cy="29" r="5"/><circle cx="41" cy="29" r="5"/><path d="M32 36l-3 6h6z"/><path d="M26 53v-6M32 53v-6M38 53v-6"/></svg>`;

// After a game: show the right answer and a short explanation (so a loss teaches something)
function reviewBlock() {
  const q = session && session.q;
  if (!q) return null;
  const box = el("div", { class: "review" });
  if (session.mode === "C") {
    const r = session.last;
    if (r && r.results) {
      box.append(el("b", { text: `${t("testsPassed")}: ${r.results.filter((x) => x.ok).length} / ${r.results.length}` }));
      r.results.filter((x) => !x.ok).slice(0, 3).forEach((x) =>
        box.append(el("div", { class: "rv-line", text: `✗ ${x.t.split("\n").pop()}  →  ${t("gotLbl")}: ${x.got} · ${t("wantLbl")}: ${x.want}` })));
    } else if (r && (r.error || r.timeout)) box.append(el("b", { text: r.error || t("pyTimeout") }));
  } else if (session.mode === "B") {
    box.append(el("b", { text: t("rvBugs") }));
    q.bugs.slice().sort((a, b) => a.line - b.line).forEach((b) =>
      box.append(el("div", { class: "rv-line", text: `${t("bugLine")} ${b.line} — ${t("bt_" + b.type)}` })));
  } else {
    box.append(el("b", { text: `${t("rvAnswer")}: ` }), el("code", { text: q.options[q.answer] }));
    const ex = (typeof EXPLAIN !== "undefined" && EXPLAIN[q.topic]) || null;
    if (ex) box.append(el("div", { class: "rv-why", text: ex[state.lang] || ex.en }));
  }
  return box;
}

function showResult(win, delta, up) {
  const card = $("result-card");
  card.innerHTML = "";
  const ico = el("div", { class: "result-emoji " + (win ? "win" : "lose") });
  ico.innerHTML = win ? ICON_WIN : ICON_LOSE;
  card.append(
    ico,
    el("h2", { text: win ? t("resultWin") : t("resultLose") }),
    el("p", { class: "result-pts " + (win ? "gain" : "loss"),
              text: (win ? t("ptsGain") : t("ptsLoss")).replace("{n}", Math.abs(delta)) }),
    el("p", { class: "empty", text: `${t("totalLbl")}: ${totalPoints()}` })
  );
  if (up) setTimeout(() => celebrate(up), 500);
  if (win && lastCombo) card.append(el("p", { class: "combo", text: t("comboRes").replace("{n}", lastCombo.n).replace("{p}", lastCombo.pct) }));
  if (!win && lockLeft() > 0) card.append(el("p", { class: "empty", text: lockText() }));
  const rv = reviewBlock();
  if (rv) card.append(rv);
  if (!win && session && typeof LESSONS !== "undefined" && LESSONS[session.q.topic]) {
    const tp = session.q.topic;
    card.append(el("button", { class: "chip", type: "button", text: t("lessonRead"), onclick: () => { $("result").hidden = true; openLessons(tp); } }));
  }
  card.append(el("button", { class: "btn-primary", text: t("okBtn"), onclick: () => { $("result").hidden = true; } }));
  $("result").hidden = false;
}

const play = $("play-btn");
play.addEventListener("click", startGame);
play.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") startGame();
});

// ================= Sidebar navigation =================
$("nav-home").addEventListener("click", () => {
  if (busy) return;
  if (view === "game") leaveGame();
  else if (view !== "home") showView("home");
});
$("nav-compete").addEventListener("click", () => {
  if (busy || view === "game") return;
  showView("compete");
});
$("bot-btn").addEventListener("click", () => openDuel());
$("compete-btn").addEventListener("click", () => {
  $("compete-msg").className = "msg";
  $("compete-msg").textContent = t("competeSoon");
});

// ================= Tooltip (shows after the mouse rests for 2 seconds) =================
let tipTimer = null, lastX = 0, lastY = 0;

function hideTip() {
  clearTimeout(tipTimer);
  tipTimer = null;
  tip.classList.remove("show");
  $("dim").classList.remove("show");
}

function showTip(target) {
  const key = target.dataset.tip;
  const dd = (T[state.lang] && T[state.lang][key + "D"]) || T.en[key + "D"];
  tip.innerHTML = "";
  tip.append(el("b", { text: t(key) }));
  if (dd) tip.append(el("span", { text: dd }));
  $("dim").classList.add("show");
  tip.style.left = "0px";
  tip.style.top = "0px";
  tip.classList.add("show");
  const w = tip.offsetWidth, h = tip.offsetHeight;
  const r = target.getBoundingClientRect();
  let x = r.left + r.width / 2 - w / 2, y = r.bottom + 12;
  if (target.closest(".sidebar")) { x = r.right + 14; y = r.top + r.height / 2 - h / 2; }
  x = Math.min(x, window.innerWidth - w - 8);
  if (y + h + 8 > window.innerHeight) y = r.top - h - 12;
  tip.style.left = Math.max(4, x) + "px";
  tip.style.top = Math.max(4, y) + "px";
}

document.addEventListener("mousemove", (e) => {
  lastX = e.clientX;
  lastY = e.clientY;
  hideTip();
  const target = e.target.closest ? e.target.closest("[data-tip]") : null;
  if (!target || !modalBg.hidden) return;
  tipTimer = setTimeout(() => showTip(target), 3000);
});
document.addEventListener("mousedown", hideTip);
document.addEventListener("keydown", hideTip);
document.addEventListener("scroll", hideTip, true);
document.documentElement.addEventListener("mouseleave", hideTip);
window.addEventListener("blur", hideTip);

