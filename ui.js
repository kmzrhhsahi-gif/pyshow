// PyShow – Windows (profile, settings, rewards ...), streak, bot duel, custom questions, tour.
// The files share one global scope and are loaded in this order: i18n, bank, problems, core, snake, sound, python, game, ui, main.
// ================= Modals =================
function openModal(title, build) {
  hideTip();
  modalTitle.textContent = title;
  modalBody.innerHTML = "";
  build(modalBody);
  if (modalBg.hidden) modalFocus = document.activeElement;
  modalBg.hidden = false;
  const first = modalBody.querySelector("input, select, textarea, button");
  (first || $("modal-x")).focus();
}
let modalFocus = null;
function closeModal() { modalBg.hidden = true; if (modalFocus && modalFocus.isConnected) modalFocus.focus(); modalFocus = null; }

modalBg.addEventListener("click", (e) => { if (e.target === modalBg) closeModal(); });
$("modal-x").addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
  if (e.key === "Tab" && !modalBg.hidden) {               // keep the Tab key inside the open window
    const f = [...modalEl.querySelectorAll("button, input, select, textarea, a[href]")].filter((x) => !x.disabled && !x.hidden && x.offsetParent);
    if (!f.length) return;
    const i = f.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && (i === f.length - 1 || i < 0)) { e.preventDefault(); f[0].focus(); }
  }
  // game shortcuts: 1-4 pick an answer, Ctrl+Enter / Enter confirms
  if (view === "game" && session && !session.locked && !busy && modalBg.hidden && $("result").hidden) {
    const typing = /^(TEXTAREA|SELECT|INPUT)$/.test(document.activeElement.tagName);
    if (session.mode === "A" && /^[1-9]$/.test(e.key) && !typing) {
      const o = $("answers").querySelectorAll(".opt")[Number(e.key) - 1];
      if (o) o.click();
    } else if (e.key === "Enter" && (e.ctrlKey || e.metaKey || document.activeElement === document.body) && !$("confirm").disabled) {
      $("confirm").click();
    }
  }
});

function showThanks() {
  modalBody.innerHTML = "";
  modalBody.append(
    el("p", { class: "ok-msg", text: "✓ " + t("thanks") }),
    el("p", { class: "empty", text: t("demo") }),
    el("button", { class: "btn-primary", text: t("close"), onclick: closeModal })
  );
}

function field(label, control) {
  if (control.matches && control.matches("input, select, textarea") && !control.getAttribute("aria-label")) control.setAttribute("aria-label", label);
  return el("div", { class: "field" }, el("label", { text: label }), control);
}
function select(options) {
  const s = el("select");
  options.forEach(([value, label]) => s.append(el("option", { value, text: label })));
  return s;
}
function segment(options, current, onPick) {
  const wrap = el("div", { class: "seg" });
  options.forEach(([value, label]) => {
    const b = el("button", { class: "chip" + (value === current ? " active" : ""), text: label });
    b.addEventListener("click", () => {
      onPick(value);
      wrap.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      b.classList.add("active");
    });
    wrap.append(b);
  });
  return wrap;
}
function row(label, control) {
  // give a bare input / select a name for screen readers
  const f = control.matches && control.matches("input, select, textarea") ? control : control.querySelector && control.querySelector("input, select, textarea");
  if (f && !f.getAttribute("aria-label")) f.setAttribute("aria-label", label);
  return el("div", { class: "row" }, el("span", { text: label }), control);
}

// ----- Countries and flags (flags are drawn from flags.js, no internet needed) -----
const COUNTRIES = ["IR", "US", "GB", "DE", "FR", "ES", "IT", "TR", "RU", "CN", "JP", "KR", "IN", "PK", "SA", "AE", "EG", "IQ",
  "AF", "TJ", "AZ", "AM", "BR", "MX", "CA", "AU", "NL", "SE", "PL", "UA"];
function cname(code) {
  try { return new Intl.DisplayNames([state.lang], { type: "region" }).of(code) || code; } catch (e) { return code; }
}
function flag(code) {
  if (!code) return el("span", { class: "flag ph", text: "··" });
  const svg = typeof FLAGS !== "undefined" && FLAGS[code];
  if (!svg) return el("span", { class: "flag ph", text: code });
  return el("img", { class: "flag", alt: code, src: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg) });
}

// ----- Top players: rank | flag | name | score (only this device + sample players for now) -----
const DEMO_PLAYERS = [
  { name: "NeoCoder", c: "US", s: 1240 }, { name: "Pythonista", c: "DE", s: 980 }, { name: "Saeed", c: "IR", s: 860 },
  { name: "Aiko", c: "JP", s: 745 }, { name: "Lucía", c: "ES", s: 610 }, { name: "Kerem", c: "TR", s: 430 },
];
$("nav-top").addEventListener("click", () => {
  openModal(t("topTitle"), (box) => {
    const me = { name: load("pyshow_name", "") || "You", c: load("pyshow_country", ""), s: totalPoints(), me: true };
    [...DEMO_PLAYERS.map((p) => ({ ...p, demo: true })), me].sort((a, b) => b.s - a.s).slice(0, 10).forEach((p, i) => {
      box.append(el("div", { class: "lb-row" + (p.me ? " me" : "") + (p.demo ? " demo" : "") },
        el("span", { class: "rk", text: String(i + 1) }), flag(p.c),
        el("span", { class: "nm", text: p.name }), el("strong", { text: String(p.s) })));
    });
    box.append(el("p", { class: "empty", text: t("topDemo") }));
  });
});

// ----- Rewards: starter gift, daily and weekly wheels, missions -----
const RANKS = [1, 3, 5, 8, 12, 20];      // level where each rank title starts
function rankOf(level) { let r = 1; RANKS.forEach((l, i) => { if (level >= l) r = i + 1; }); return t("rank" + r); }
const giftsClaimed = () => Number(load("pyshow_lvlgifts", "0")) || 0;
const giftsPending = () => Math.max(0, levelOf(getXP()) - 1 - giftsClaimed());
function levelWheel() {                  // prizes grow with the level you are collecting
  const k = 1 + giftsClaimed() * 0.25;
  return { vals: [20, 35, 50, 65, 80, 120].map((v) => Math.round((v * k) / 5) * 5), title: "rwLevel", sub: "rwLevelD" };
}
const WHEELS = {
  starter: { vals: [75, 90, 100, 110, 125, 150], cd: 0, title: "rwStarter", sub: "rwStarterD" },
  daily: { vals: [10, 40, 5, 20, 70, 15, 25, 10], cd: 864e5, title: "rwDaily", sub: "rwDailyD" },
  weekly: { vals: [150, 200, 260, 180, 400, 230, 350, 300], cd: 6048e5, title: "rwWeekly", sub: "rwWeeklyD" },
};
function getClaims() { try { return JSON.parse(load("pyshow_claims", "{}")) || {}; } catch (e) { return {}; } }
function wheelLeft(kind) {                       // 0 = ready, Infinity = one-time gift already used
  const last = getClaims()[kind];
  if (!last) return 0;
  if (!WHEELS[kind].cd) return Infinity;
  return Math.max(0, last + WHEELS[kind].cd - Date.now());
}
function fmtLeft(ms) {
  const m = Math.ceil(ms / 6e4), d = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60);
  return d ? `${d}d ${h}h` : h ? `${h}h ${m % 60}m` : `${m}m`;
}
function pickWeighted(vals) {                    // small prizes come up more often than big ones
  const w = vals.map((v) => 1 / v), sum = w.reduce((a, b) => a + b, 0);
  let r = Math.random() * sum;
  for (let i = 0; i < vals.length; i++) { r -= w[i]; if (r <= 0) return i; }
  return vals.length - 1;
}
function wheelSVG(vals) {
  const n = vals.length, s = 360 / n, r = 140, top = Math.max(...vals);
  const svg = svgEl("svg", { viewBox: "-150 -150 300 300", width: 280, height: 280 });
  const pt = (deg, rad) => [(rad * Math.sin((deg * Math.PI) / 180)).toFixed(2), (-rad * Math.cos((deg * Math.PI) / 180)).toFixed(2)];
  const cols = ["#1f9d4c", "#14702f", "#2bc047", "#0f7a63"];
  vals.forEach((v, i) => {
    const a = pt(i * s, r), b = pt((i + 1) * s, r), gold = v === top;
    svg.append(svgEl("path", { d: `M0 0 L${a[0]} ${a[1]} A${r} ${r} 0 0 1 ${b[0]} ${b[1]} Z`,
      fill: gold ? "#e0a800" : cols[i % cols.length], stroke: "#0b1a12", "stroke-width": 2 }));
    const tx = svgEl("text", { transform: `rotate(${(i + 0.5) * s}) translate(0 -96)`, "text-anchor": "middle",
      "dominant-baseline": "central", fill: gold ? "#2a1d00" : "#fff", "font-size": 22, "font-weight": 700,
      "font-family": "Fira Code, Consolas, monospace" });
    tx.textContent = v;
    svg.append(tx);
  });
  svg.append(svgEl("circle", { r: 26, fill: "#0b1a12", stroke: "#e0a800", "stroke-width": 4 }));
  return svg;
}
function showWheel(kind) {
  const W = kind === "level" ? levelWheel() : WHEELS[kind];
  modalTitle.textContent = t(W.title);
  modalBody.innerHTML = "";
  const wheelSvg = wheelSVG(W.vals);
  const out = el("p", { class: "wheel-out", text: " " });
  const spin = el("button", { class: "btn-primary", text: t("rwSpin") });
  const back = el("button", { class: "chip", text: t("rwBack"), onclick: () => openRewards() });
  spin.addEventListener("click", async () => {
    spin.disabled = true;
    back.disabled = true;
    audio();
    const i = pickWeighted(W.vals), prize = W.vals[i], s = 360 / W.vals.length;
    // the prize is saved first, so closing the window can never give a second spin
    if (kind === "level") save("pyshow_lvlgifts", String(giftsClaimed() + 1));
    else {
      const claims = getClaims();
      claims[kind] = Date.now();
      save("pyshow_claims", JSON.stringify(claims));
    }
    const up = gainXP(() => addBonus(prize));
    addMessage("reward", { pts: prize, src: W.title });
    const deg = 360 * 6 - (i + 0.5) * s + (Math.random() - 0.5) * s * 0.6;
    wheelSvg.style.transition = state.anim === "on" ? "transform 4.6s cubic-bezier(.12,.62,.1,1)" : "none";
    wheelSvg.style.transform = `rotate(${deg}deg)`;
    out.textContent = t("spinning");
    if (state.anim === "on") for (let k = 1; k <= 26; k++) setTimeout(sfxTick, 4500 * (1 - Math.pow(1 - k / 26, 1 / 3)));
    await wait(4700);
    sfxCoin();
    if (up) setTimeout(() => celebrate(up), 600);
    out.textContent = t("rwWon").replace("{n}", prize) + (up ? `  ·  ${t("lvlUp")} ${t("lvlN").replace("{n}", up)}` : "");
    out.classList.add("won");
    back.disabled = false;
  });
  modalBody.append(
    el("div", { class: "wheel-wrap" }, el("div", { class: "wheel" }, wheelSvg), el("div", { class: "wheel-pin" })),
    out,
    el("div", { class: "wheel-actions" }, spin, back)
  );
}
function openRewards(note) {
  openModal(t("rwTitle"), (box) => {
    if (note) box.append(el("p", { class: "ok-msg", text: note }));
    const grid = el("div", { class: "rw-grid" });
    ["starter", "daily", "weekly", "level"].forEach((k) => {
      const lv = k === "level", pend = giftsPending();
      const W = lv ? levelWheel() : WHEELS[k], left = lv ? (pend ? 0 : Infinity) : wheelLeft(k), ready = left === 0;
      const b = el("button", { class: "btn-primary",
        text: ready ? t("rwSpin") + (lv && pend > 1 ? ` ×${pend}` : "") : left === Infinity ? (lv ? t("rwNoGift") : t("rwClaimed")) : t("rwIn").replace("{t}", fmtLeft(left)) });
      b.disabled = !ready;
      b.addEventListener("click", () => showWheel(k));
      grid.append(el("div", { class: "rw-card" + (ready ? " ready" : "") },
        el("h4", { text: t(W.title) }),
        el("p", { class: "empty", text: t(W.sub) }),
        el("div", { class: "rw-range", text: `${Math.min(...W.vals)}–${Math.max(...W.vals)} XP` }),
        b));
    });
    box.append(grid);

    const m = getMission(), d = MISSIONS[m.i % MISSIONS.length];
    const text = d.pro
      ? t("missPro").replace("{n}", d.n)
      : t("missWin").replace("{n}", d.n).replace("{mode}", t("mode" + d.mode)).replace("{diff}", t(d.diff));
    const text2 = text + " · " + t("missRow");
    const claim = el("button", { class: "btn-primary", text: t("missClaim").replace("{n}", d.xp) });
    claim.disabled = m.p < d.n;
    claim.addEventListener("click", () => {
      const up = gainXP(() => addBonus(d.xp));
      addMessage("reward", { pts: d.xp, src: "missions" });
      setMission({ i: m.i + 1, p: 0 });
      if (up) setTimeout(() => celebrate(up), 300);
      openRewards(`+${d.xp} XP · ${t("missNext")}` + (up ? ` · ${t("lvlUp")} ${t("lvlN").replace("{n}", up)}` : ""));
    });
    const dl = getDaily(), dReady = dl.wins >= DAILY_N && !dl.claimed;
    const dBtn = el("button", { class: "btn-primary", text: dl.claimed ? t("dailyDone") : t("missClaim").replace("{n}", DAILY_XP) });
    dBtn.disabled = !dReady;
    dBtn.addEventListener("click", () => {
      const v = getDaily(); v.claimed = true; save("pyshow_daily", JSON.stringify(v));
      const up = gainXP(() => addBonus(DAILY_XP));
      addMessage("reward", { pts: DAILY_XP, src: "daily" });
      if (up) setTimeout(() => celebrate(up), 300);
      openRewards(`+${DAILY_XP} XP` + (up ? ` · ${t("lvlUp")} ${t("lvlN").replace("{n}", up)}` : ""));
    });
    box.append(
      el("h3", { class: "rw-h", text: t("dailyTitle") }),
      el("div", { class: "mission" },
        el("p", { text: t("dailyText").replace("{n}", DAILY_N) }),
        el("div", { class: "bar" }, el("i", { style: `width:${Math.min(100, (dl.wins / DAILY_N) * 100)}%` })),
        el("div", { class: "mission-foot" }, el("span", { text: `${Math.min(dl.wins, DAILY_N)} / ${DAILY_N}` }), dBtn)),
      el("h3", { class: "rw-h", text: t("missions") }),
      el("div", { class: "mission" },
        el("p", { text: text2 }),
        el("div", { class: "bar" }, el("i", { style: `width:${Math.min(100, (m.p / d.n) * 100)}%` })),
        el("div", { class: "mission-foot" }, el("span", { text: `${Math.min(m.p, d.n)} / ${d.n}` }), claim))
    );
  });
}
$("nav-rewards").addEventListener("click", () => openRewards());

// Messages
$("nav-msgs").addEventListener("click", () => {
  openModal(t("msgsTitle"), (box) => {
    const list = getInbox().slice().reverse();
    if (!list.length) {
      box.append(el("p", { class: "empty", text: t("msgEmpty") }));
      return;
    }
    list.forEach((m) => {
      const txt = msgText(m);
      const title = el("h4", { text: txt.title });
      if (m.sample) title.append(el("span", { class: "tag", text: t("sampleTag") }));
      box.append(el("div", { class: "mail" + (m.read ? "" : " unread") },
        title,
        el("time", { text: fmtDate(m.at) }),
        el("p", { text: txt.body })));
    });
    setInbox(getInbox().map((m) => ({ ...m, read: true })));
  });
});

// Default profile pictures (players cannot upload their own)
const AV = (a, b, body) => `<svg viewBox="0 0 64 64"><rect width="64" height="64" fill="${a}"/><path d="M0 64L64 0V64Z" fill="${b}" opacity=".7"/>${body}</svg>`;
const AVATARS = [
  AV("#1f9d4c", "#0f7a63", `<ellipse cx="32" cy="34" rx="19" ry="16" fill="#b8f5c8"/><circle cx="24" cy="29" r="5" fill="#fff"/><circle cx="40" cy="29" r="5" fill="#fff"/><ellipse cx="24" cy="29" rx="1.6" ry="4" fill="#111"/><ellipse cx="40" cy="29" rx="1.6" ry="4" fill="#111"/><path d="M32 49v8M32 57l-4 4M32 57l4 4" stroke="#ff4d4d" stroke-width="2.4" fill="none" stroke-linecap="round"/>`),
  AV("#3b82f6", "#1e3a8a", `<rect x="14" y="22" width="36" height="28" rx="7" fill="#dbeafe"/><rect x="21" y="30" width="8" height="8" rx="2" fill="#1e3a8a"/><rect x="35" y="30" width="8" height="8" rx="2" fill="#1e3a8a"/><path d="M24 44h16" stroke="#1e3a8a" stroke-width="3" stroke-linecap="round"/><path d="M32 22v-8" stroke="#dbeafe" stroke-width="3"/><circle cx="32" cy="12" r="4" fill="#fbbf24"/>`),
  AV("#f59e0b", "#b45309", `<path d="M17 28l2-17 12 11zM47 28l-2-17-12 11z" fill="#fde68a"/><circle cx="32" cy="36" r="17" fill="#fde68a"/><circle cx="25" cy="33" r="3" fill="#1f2937"/><circle cx="39" cy="33" r="3" fill="#1f2937"/><path d="M29 40l3 3 3-3z" fill="#f43f5e"/><path d="M14 38h9M14 43l8-2M50 38h-9M50 43l-8-2" stroke="#78350f" stroke-width="1.6" stroke-linecap="round"/>`),
  AV("#7c3aed", "#312e81", `<path d="M32 8c9 10 11 26 8 40H24C21 34 23 18 32 8z" fill="#f1f5f9"/><circle cx="32" cy="27" r="5" fill="#38bdf8"/><path d="M24 40l-9 11 9-3zM40 40l9 11-9-3z" fill="#f87171"/><path d="M28 50l4 10 4-10z" fill="#fb923c"/>`),
  AV("#0ea5e9", "#075985", `<ellipse cx="32" cy="37" rx="18" ry="21" fill="#fcd34d"/><path d="M16 22l4-12 8 8zM48 22l-4-12-8 8z" fill="#fcd34d"/><circle cx="24" cy="31" r="8" fill="#fff"/><circle cx="40" cy="31" r="8" fill="#fff"/><circle cx="25" cy="32" r="3.5" fill="#111"/><circle cx="39" cy="32" r="3.5" fill="#111"/><path d="M28 39l4 7 4-7z" fill="#f97316"/>`),
  AV("#475569", "#0f172a", `<path d="M16 52V30a16 16 0 0 1 32 0v22l-5-5-5 5-6-5-6 5-5-5z" fill="#f8fafc"/><circle cx="26" cy="31" r="3.5" fill="#0f172a"/><circle cx="38" cy="31" r="3.5" fill="#0f172a"/><ellipse cx="32" cy="40" rx="3" ry="4" fill="#0f172a"/>`),
  AV("#ec4899", "#9f1239", `<path d="M32 9l6 16h17L41 35l6 17-15-10-15 10 6-17L9 25h17z" fill="#fde047" stroke="#fff7c2" stroke-width="1.5" stroke-linejoin="round"/>`),
  AV("#14b8a6", "#134e4a", `<circle cx="32" cy="32" r="13" fill="#fef08a"/><ellipse cx="32" cy="34" rx="25" ry="7" transform="rotate(-20 32 34)" fill="none" stroke="#fff" stroke-width="3"/><circle cx="55" cy="17" r="2" fill="#fff"/><circle cx="10" cy="48" r="1.6" fill="#fff"/>`),
];
function avatarEl(id, cls = "avatar") {
  const e = el("div", { class: cls });
  e.innerHTML = AVATARS[id] || AVATARS[0];
  return e;
}
const getAvatar = () => Math.min(AVATARS.length - 1, Math.max(0, Number(load("pyshow_avatar", "0")) || 0));
function updateNavAvatar() {
  const ico = $("nav-profile").querySelector(".ico");
  if (!ico) return;
  if (load("pyshow_avatar", null) === null) return;
  ico.innerHTML = AVATARS[getAvatar()];
  ico.classList.add("av-ico");
}

// Profile: name, country, level bar, stats
function stat(v, label) { return el("div", { class: "stat" }, el("b", { text: String(v) }), el("span", { text: label })); }
$("nav-profile").addEventListener("click", () => {
  openModal(t("profileTitle"), (box) => {
    const games = getGames(), xp = getXP(), lv = levelOf(xp);
    const a = lvlStart(lv), b = lvlStart(lv + 1);
    const best = Math.max(0, ...games.map((g) => g.delta));
    const name = el("input", { type: "text", maxlength: "20", value: load("pyshow_name", "") });
    const country = select([["", t("pickCountry")], ...COUNTRIES.map((c) => [c, cname(c)])]);
    country.value = load("pyshow_country", "");
    const prev = el("span", {}, flag(country.value));
    country.addEventListener("change", () => prev.replaceChildren(flag(country.value)));
    const avatar = avatarEl(getAvatar());
    const picker = el("div", { class: "av-grid", role: "radiogroup", "aria-label": t("avatarTitle") });
    AVATARS.forEach((_, i) => {
      const b = el("button", { class: "av-pick" + (i === getAvatar() ? " active" : ""), role: "radio", "aria-checked": String(i === getAvatar()), "aria-label": `${t("avatarTitle")} ${i + 1}` });
      b.innerHTML = AVATARS[i];
      b.addEventListener("click", () => {
        save("pyshow_avatar", String(i));
        avatar.innerHTML = AVATARS[i];
        picker.querySelectorAll(".av-pick").forEach((x, j) => { x.classList.toggle("active", j === i); x.setAttribute("aria-checked", String(j === i)); });
        updateNavAvatar();
      });
      picker.append(b);
    });
    const note = el("p", { class: "ok-msg" });
    const pick = el("input", { type: "file", accept: "application/json,.json", hidden: "" });
    pick.addEventListener("change", async () => {
      const f = pick.files && pick.files[0];
      if (!f) return;
      if (importProgress(await f.text())) { note.textContent = "✓ " + t("importOk"); setTimeout(() => location.reload(), 900); }
      else note.textContent = t("importBad");
    });
    box.append(
      avatar,
      el("div", { class: "empty", style: "text-align:center", text: t("avatarTitle") }),
      picker,
      el("div", { class: "lvl" }, el("b", { text: t("lvlN").replace("{n}", lv) }), el("span", { text: `${xp} ${t("xp")}` })),
      el("div", { class: "bar" }, el("i", { style: `width:${((xp - a) / (b - a)) * 100}%` })),
      el("p", { class: "empty", text: t("xpToNext").replace("{n}", b - xp).replace("{l}", lv + 1) }),
      el("div", { class: "stats" }, stat(totalPoints(), t("score")), stat(games.length, t("games")), stat(best, t("best")), stat(getStreak().n, t("streakLbl")), stat(Object.keys(getMiss()).length, t("missLbl")), stat(load("pyshow_visits", "1"), t("visitsLbl"))),
      field(t("username"), name),
      field(t("country"), el("div", { class: "country-row" }, country, prev)),
      el("button", { class: "btn-primary", text: t("save"), onclick: () => {
        save("pyshow_name", name.value.trim());
        save("pyshow_country", country.value);
        note.textContent = "✓ " + t("saved");
      } }),
      note,
      el("div", { class: "guest" },
        el("b", { text: t("guestTag") }),
        el("p", { class: "empty", text: t("guestNote") }),
        el("div", { class: "guest-actions" },
          el("button", { class: "chip", text: t("exportBtn"), onclick: exportProgress }),
          el("button", { class: "chip", text: t("importBtn"), onclick: () => pick.click() }),
          pick))
    );
  });
});

// Report
$("nav-report").addEventListener("click", () => {
  openModal(t("reportTitle"), (box) => {
    const reason = select([
      ["cheat", t("r_cheat")], ["name", t("r_name")],
      ["question", t("r_question")], ["other", t("r_other")],
    ]);
    const details = el("textarea");
    box.append(
      field(t("reason"), reason),
      field(t("details"), details),
      el("button", { class: "btn-primary", text: t("submit"), onclick: () => {
        pushLocal("pyshow_reports", { reason: reason.value, details: details.value, at: Date.now() });
        showThanks();
      } })
    );
  });
});

// Bug report
$("nav-bug").addEventListener("click", () => {
  openModal(t("bugTitle"), (box) => {
    const title = el("input", { type: "text", maxlength: "80" });
    const steps = el("textarea");
    const sev = select([["low", t("s_low")], ["mid", t("s_mid")], ["high", t("s_high")]]);
    box.append(
      field(t("bugName"), title),
      field(t("steps"), steps),
      field(t("severity"), sev),
      el("button", { class: "btn-primary", text: t("submit"), onclick: () => {
        pushLocal("pyshow_bugs", { title: title.value, steps: steps.value, severity: sev.value, at: Date.now() });
        showThanks();
      } })
    );
  });
});

// Feedback
$("nav-feedback").addEventListener("click", () => {
  openModal(t("fbTitle"), (box) => {
    let rating = 0;
    const stars = el("div", { class: "stars" });
    const starBtns = [1, 2, 3, 4, 5].map((n) => {
      const b = el("button", { text: "★", "aria-label": String(n) });
      b.addEventListener("click", () => {
        rating = n;
        starBtns.forEach((s, i) => s.classList.toggle("on", i < n));
      });
      stars.append(b);
      return b;
    });
    const text = el("textarea");
    box.append(
      field(t("rate"), stars),
      field(t("fbText"), text),
      el("button", { class: "btn-primary", text: t("submit"), onclick: () => {
        pushLocal("pyshow_feedback", { rating, text: text.value, at: Date.now() });
        showThanks();
      } })
    );
  });
});

// Language
$("nav-lang").addEventListener("click", () => {
  openModal(t("langTitle"), (box) => {
    const grid = el("div", { class: "lang-grid" });
    Object.keys(LANGS).forEach((code) => {
      const b = el("button", { class: "lang-btn" + (code === state.lang ? " active" : ""), text: LANGS[code].name });
      b.addEventListener("click", () => {
        state.lang = code;
        save("pyshow_lang", code);
        applyLang();
        closeModal();
      });
      grid.append(b);
    });
    box.append(grid);
  });
});

// Music
$("nav-music").addEventListener("click", () => {
  openModal(t("musicTitle"), (box) => {
    const grid = el("div", { class: "trk-grid" });
    [["off", t("musicOff")], ...Object.keys(TRACKS).map((k) => [k, t("trk_" + k)])].forEach(([id, label]) => {
      const b = el("button", { class: "lang-btn" + (id === Music.id ? " active" : ""), text: label });
      b.addEventListener("click", () => {
        if (state.sound !== "on") { state.sound = "on"; save("pyshow_sound", "on"); }
        Music.set(id);
        grid.querySelectorAll(".lang-btn").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
      });
      grid.append(b);
    });
    const r = document.createElement("input");
    r.type = "range"; r.min = 0; r.max = 100; r.value = Music.mvol; r.className = "vol";
    r.setAttribute("aria-label", t("musicVol"));
    r.addEventListener("input", () => Music.setVol(Number(r.value)));
    box.append(grid, row(t("musicVol"), r));
  });
});

// Settings
$("nav-set").addEventListener("click", () => {
  openModal(t("setTitle"), (box) => {
    box.append(
      row(t("theme"), (() => {
        const wrap = el("div", { class: "themes" });
        THEMES.forEach(([id, a, b, label]) => {
          const btn = el("button", { class: "theme-btn" + (id === state.theme ? " active" : ""), title: t(label) });
          btn.style.setProperty("--a", a); btn.style.setProperty("--b", b);
          btn.addEventListener("click", () => {
            state.theme = id; save("pyshow_theme", id); applyTheme();
            wrap.querySelectorAll(".theme-btn").forEach((x) => x.classList.remove("active"));
            btn.classList.add("active");
          });
          wrap.append(btn);
        });
        return wrap;
      })()),
      row(t("anim"), segment(
        [["on", t("on")], ["off", t("off")]],
        state.anim,
        (v) => { state.anim = v; save("pyshow_anim", v); applyAnimSetting(); }
      )),
      row(t("sound"), segment(
        [["on", t("on")], ["off", t("off")]],
        state.sound,
        (v) => { state.sound = v; save("pyshow_sound", v); Music.sync(); }
      )),
      row(t("volume"), (() => {
        const r = document.createElement("input");
        r.type = "range"; r.min = 0; r.max = 100; r.value = state.vol; r.className = "vol";
        r.addEventListener("input", () => { state.vol = Number(r.value); save("pyshow_vol", String(state.vol)); if (actx) Music.gain(actx); });
        r.addEventListener("change", sfxCoin);
        return r;
      })()),
      row(t("replay"), el("button", { class: "chip", text: t("replayBtn"), onclick: replaySnake }))
    );
    customRow(box);
  });
});


// ================= Streak, combo and the daily challenge =================
const p2d = (n) => String(n).padStart(2, "0");
const dayKey = (d = new Date()) => `${d.getFullYear()}-${p2d(d.getMonth() + 1)}-${p2d(d.getDate())}`;
const yesterdayKey = () => dayKey(new Date(Date.now() - 864e5));
function getStreak() {
  let v; try { v = JSON.parse(load("pyshow_streak", "null")); } catch (e) { v = null; }
  if (!v || (v.last !== dayKey() && v.last !== yesterdayKey())) return { n: 0, last: v ? v.last : "" };   // a missed day breaks it
  return v;
}
function touchStreak() {
  const v = getStreak(), today = dayKey();
  if (v.last === today) return;
  save("pyshow_streak", JSON.stringify({ n: v.n + 1, last: today }));
}
const getCombo = () => Number(load("pyshow_combo", "0")) || 0;
const comboMult = (n) => 1 + 0.1 * Math.min(Math.max(n - 1, 0), 5);     // 1st win x1, 2nd x1.1 ... up to x1.5
let lastCombo = null;                                                    // shown on the result card
const DAILY_N = 3, DAILY_XP = 80;
function getDaily() {
  let v; try { v = JSON.parse(load("pyshow_daily", "null")); } catch (e) { v = null; }
  return v && v.day === dayKey() ? v : { day: dayKey(), wins: 0, claimed: false };
}
function dailyWin() { const v = getDaily(); v.wins++; save("pyshow_daily", JSON.stringify(v)); }

// ================= Duel against the bot (until real online matches exist) =================
const BOT_SKILL = { easy: 0.55, medium: 0.7, hard: 0.85 };
function openDuel() {
  openModal(t("botTitle"), (box) => {
    let diff = "medium";
    const start = () => {
      const pool = QUESTIONS.filter((q) => q.lvl === diff);
      const qs = shuffle(pool.length >= 5 ? pool : QUESTIONS).slice(0, 5);
      round(qs, 0, 0, 0);
    };
    box.replaceChildren(
      el("p", { class: "empty", text: t("botText") }),
      segment([["easy", t("easy")], ["medium", t("medium")], ["hard", t("hard")]], diff, (v) => { diff = v; }),
      el("button", { class: "btn-primary", text: t("botGo"), onclick: start }));
    function round(qs, i, me, bot) {
      if (i >= qs.length) return finish(me, bot);
      const q = qs[i], opts = shuffle(q.options.map((text, k) => ({ text, k })));
      let done = false, timer = null;
      const code = el("pre", { class: "duel-code", text: q.code });
      const list = el("div", { class: "answers" });
      const head = el("div", { class: "duel-head" },
        el("span", { text: t("botRound").replace("{i}", i + 1).replace("{n}", qs.length) }),
        el("b", { text: `${t("botYou")} ${me} : ${bot} ${t("botBot")}` }),
        el("span", { class: "duel-t", text: "20" }));
      const botRight = Math.random() < BOT_SKILL[diff], botAt = 4 + Math.random() * 11;
      const t0 = Date.now(); let botDone = false;
      const end = (pick) => {
        if (done) return; done = true; clearInterval(timer);
        const right = pick >= 0 && opts[pick].k === q.answer;
        const myPts = me + (right ? 1 : 0), botPts = bot + (botRight ? 1 : 0);
        list.querySelectorAll(".opt").forEach((b, n) => { b.disabled = true; if (opts[n].k === q.answer) b.classList.add("correct"); else if (n === pick) b.classList.add("wrong"); });
        sfxClick();
        box.append(el("p", { class: "empty", text: `${right ? "✓" : "✗"} ${t("botYou")}   ${botRight ? "✓" : "✗"} ${t("botBot")}` }),
          el("button", { class: "btn-primary", text: i + 1 < qs.length ? t("botNext") : t("botFinish"), onclick: () => round(qs, i + 1, myPts, botPts) }));
      };
      opts.forEach((o, n) => list.append(el("button", { class: "opt", text: o.text, onclick: () => end(n) })));
      box.replaceChildren(head, code, list);
      timer = setInterval(() => {
        const s = (Date.now() - t0) / 1000;
        head.querySelector(".duel-t").textContent = String(Math.max(0, Math.ceil(20 - s)));
        if (!botDone && s >= botAt) botDone = true;
        if (s >= 20) end(-1);
      }, 250);
    }
    function finish(me, bot) {
      const res = me > bot ? "win" : me < bot ? "lose" : "draw";
      const xp = { win: 30, draw: 12, lose: 5 }[res];
      const up = gainXP(() => addBonus(xp));
      addMessage("reward", { pts: xp, src: "bot" });
      if (up) setTimeout(() => celebrate(up), 400);
      if (res === "win") sfxWin();
      box.replaceChildren(
        el("h3", { text: t(res === "win" ? "botWin" : res === "lose" ? "botLose" : "botDraw") }),
        el("p", { class: "result-pts", text: `${t("botYou")} ${me} : ${bot} ${t("botBot")}` }),
        el("p", { class: "empty", text: `+${xp} XP` }),
        el("button", { class: "btn-primary", text: t("botAgain"), onclick: () => closeModal() || openDuel() }));
    }
  });
}

// ================= My own questions (JSON file, no code editing) =================
const CUSTOM_KEY = "pyshow_custom";
const QUESTION_TOPICS = () => [...new Set(QUESTIONS.filter((q) => !q.custom).map((q) => q.topic))];
function getCustom() { try { return JSON.parse(load(CUSTOM_KEY, "[]")); } catch (e) { return []; } }
function mergeCustom() {
  QUESTIONS.splice(0, QUESTIONS.length, ...QUESTIONS.filter((q) => !q.custom));
  getCustom().forEach((c) => QUESTIONS.push({ topic: c.topic, lvl: c.lvl, code: c.code, options: c.options, answer: 0, why: { en: c.why || "", fa: c.why || "" }, custom: true }));
}
function validateCustom(data) {
  if (!Array.isArray(data) || !data.length) throw new Error("not a list");
  const topics = QUESTION_TOPICS();
  return data.map((q, i) => {
    const n = i + 1;
    if (!q || typeof q.code !== "string" || !q.code.trim()) throw new Error(`#${n}: code`);
    if (!topics.includes(q.topic)) throw new Error(`#${n}: topic (${topics.join(", ")})`);
    if (!["easy", "medium", "hard"].includes(q.lvl)) throw new Error(`#${n}: lvl (easy, medium, hard)`);
    if (!Array.isArray(q.options) || q.options.length !== 4 || q.options.some((o) => typeof o !== "string" || !o.trim()) || new Set(q.options).size !== 4) throw new Error(`#${n}: options (4 different texts, the correct one first)`);
    return { topic: q.topic, lvl: q.lvl, code: q.code, options: q.options, why: typeof q.why === "string" ? q.why : "" };
  });
}
function downloadFile(name, text, type) {
  const a = el("a", { href: URL.createObjectURL(new Blob([text], { type })), download: name });
  document.body.append(a); a.click(); a.remove();
}
function customRow(box) {
  const info = el("span", { class: "empty", text: t("myQCount").replace("{n}", getCustom().length) });
  const file = el("input", { type: "file", accept: ".json,application/json", hidden: "" });
  const msg = el("p", { class: "msg" });
  file.addEventListener("change", async () => {
    try {
      const add = validateCustom(JSON.parse(await file.files[0].text()));
      save(CUSTOM_KEY, JSON.stringify(getCustom().concat(add)));
      mergeCustom(); info.textContent = t("myQCount").replace("{n}", getCustom().length);
      msg.className = "msg ok"; msg.textContent = t("myQOk").replace("{n}", add.length);
    } catch (e) { msg.className = "msg"; msg.textContent = t("myQBad").replace("{e}", e.message); }
    file.value = "";
  });
  box.append(row(t("myQ"), el("div", { class: "myq" }, info,
    el("button", { class: "chip", text: t("myQImport"), onclick: () => file.click() }),
    el("button", { class: "chip", text: t("myQTemplate"), onclick: () => downloadFile("pyshow-questions.json", JSON.stringify([{ topic: "loops", lvl: "easy", code: "for i in range(3):\n    print(i)", options: ["0 1 2", "1 2 3", "0 1 2 3", "3"], why: "range(3) gives 0, 1, 2." }], null, 2), "application/json") }),
    el("button", { class: "chip", text: t("myQClear"), onclick: () => { save(CUSTOM_KEY, "[]"); mergeCustom(); info.textContent = t("myQCount").replace("{n}", 0); msg.textContent = ""; } }),
    file)), msg);
}
mergeCustom();

// ================= First-visit tour and simple local numbers =================
save("pyshow_visits", String((Number(load("pyshow_visits", "0")) || 0) + 1));
function startTour() {
  let i = 0;
  const steps = ["tour1", "tour2", "tour3", "tour4"];
  const show = () => openModal(t("tourTitle"), (box) => {
    box.append(el("p", { text: t(steps[i]) }),
      el("div", { class: "tour-foot" },
        el("span", { class: "empty", text: `${i + 1} / ${steps.length}` }),
        el("button", { class: "chip", text: t("tourSkip"), onclick: closeModal }),
        el("button", { class: "btn-primary", text: i + 1 < steps.length ? t("tourNext") : t("tourDone"), onclick: () => { if (++i < steps.length) show(); else closeModal(); } })));
  });
  show();
}
const tourWatch = setInterval(() => {
  if (!app.classList.contains("done")) return;
  clearInterval(tourWatch);
  if (!load("pyshow_tour", "")) { save("pyshow_tour", "1"); setTimeout(startTour, 1200); }
}, 800);



// ================= Lessons (short text lessons for every topic) =================
function openLessons(topic) {
  const keys = Object.keys(LESSONS);
  topic = LESSONS[topic] ? topic : keys[0];
  openModal(t("lessonBtn"), (body) => {
    const tabs = el("div", { class: "options lesson-tabs" });
    const page = el("div", { class: "lesson" });
    const show = (k) => {
      const L = LESSONS[k], tx = L[state.lang] || L.en;
      tabs.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c.dataset.value === k));
      page.innerHTML = "";
      page.append(el("h3", { text: tx.t }));
      const ul = el("ul");
      tx.p.forEach((p) => ul.append(el("li", { text: p })));
      page.append(ul, el("pre", { class: "lesson-code" }, el("code", { text: L.code })));
    };
    keys.forEach((k) => tabs.append(el("button", { class: "chip", type: "button", "data-value": k, text: t("t_" + k), onclick: () => show(k) })));
    body.append(tabs, page);
    show(topic);
  });
}
$("lesson-btn").addEventListener("click", () => openLessons());
