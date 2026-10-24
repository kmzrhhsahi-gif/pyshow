// PyShow – Snake animation, views, intro and the setup panel.
// The files share one global scope and are loaded in this order: i18n, bank, problems, core, snake, sound, python, game, ui, main.
// ================= Snake rig (body wave, head, tongue) =================
class Rig {
  constructor(o) {
    this.base = o.base;
    this.paths = o.paths;
    this.head = o.head;
    this.hs = o.headScale || 1;
    this.step = o.step || 6;
    this.K = 0.022;   // wave length
    this.W = 2.4;     // wave speed
    this.N = 0;
  }

  setGuide(d) {
    this.base.setAttribute("d", d);
    this.LEN = this.base.getTotalLength();
    const N = (this.N = Math.max(4, Math.ceil(this.LEN / this.step)));
    this.k = N / this.LEN;
    ["S", "BX", "BY", "NX", "NY", "X", "Y"].forEach((key) => { this[key] = new Float32Array(N + 1); });
    for (let i = 0; i <= N; i++) {
      const s = (i / N) * this.LEN;
      const pt = this.base.getPointAtLength(s);
      const a = this.base.getPointAtLength(Math.max(0, s - 1));
      const b = this.base.getPointAtLength(Math.min(this.LEN, s + 1));
      const tx = b.x - a.x, ty = b.y - a.y;
      const m = Math.hypot(tx, ty) || 1;
      this.S[i] = s; this.BX[i] = pt.x; this.BY[i] = pt.y;
      this.NX[i] = -ty / m; this.NY[i] = tx / m;
    }
  }

  pointAt(fi) {
    fi = Math.max(0, Math.min(this.N, fi));
    const i0 = Math.floor(fi), i1 = Math.min(this.N, i0 + 1), f = fi - i0;
    return [this.X[i0] + (this.X[i1] - this.X[i0]) * f, this.Y[i0] + (this.Y[i1] - this.Y[i0]) * f];
  }

  angleAt(fi) {
    const a = this.pointAt(fi - 0.8), b = this.pointAt(fi + 0.8);
    return (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
  }

  // Fractional sample index closest to a point of the (undisturbed) guide path
  fiAtPoint(x, y) {
    let best = 0, bd = Infinity;
    for (let i = 0; i <= this.N; i++) {
      const dd = (this.BX[i] - x) ** 2 + (this.BY[i] - y) ** 2;
      if (dd < bd) { bd = dd; best = i; }
    }
    const dot = (x - this.BX[best]) * this.NY[best] - (y - this.BY[best]) * this.NX[best];
    return Math.max(0, Math.min(this.N, best + dot / (this.LEN / this.N)));
  }

  baseAngleAt(fi) {
    const i = Math.max(0, Math.min(this.N, Math.round(fi)));
    return (Math.atan2(-this.NX[i], this.NY[i]) * 180) / Math.PI;
  }

  subPath(fa, fb) {
    const parts = [];
    let p = this.pointAt(fa);
    parts.push("M" + p[0].toFixed(1) + " " + p[1].toFixed(1));
    for (let i = Math.ceil(fa + 0.001); i < fb; i++) {
      parts.push("L" + this.X[i].toFixed(1) + " " + this.Y[i].toFixed(1));
    }
    p = this.pointAt(fb);
    parts.push("L" + p[0].toFixed(1) + " " + p[1].toFixed(1));
    return parts.join("");
  }

  // headS = distance (along the guide) of the head, lenS = length of the body
  render(headS, lenS, time, amp, jitter) {
    if (!this.N) return;
    const N = this.N;
    for (let i = 0; i <= N; i++) {
      const env = Math.min(1, this.S[i] / 160);
      const o = amp * env * Math.sin(this.K * this.S[i] + this.W * time);
      this.X[i] = this.BX[i] + this.NX[i] * o;
      this.Y[i] = this.BY[i] + this.NY[i] * o;
    }
    const s1 = Math.min(this.LEN, headS);
    const s0 = Math.min(this.LEN, Math.max(0, headS - lenS));
    const f0 = s0 * this.k, f1 = s1 * this.k;

    const d = f1 - f0 < 0.5 ? "" : this.subPath(f0, f1);
    this.paths.forEach((p) => p.setAttribute("d", d));

    if (headS > this.LEN) {
      this.head.setAttribute("visibility", "hidden");
    } else {
      this.head.setAttribute("visibility", "visible");
      const c = this.pointAt(f1);
      let ang = this.angleAt(f1);
      if (amp > 0) ang += Math.sin(time * 2.2) * 4;
      ang += jitter || 0;
      this.head.setAttribute("transform",
        `translate(${c[0].toFixed(1)} ${c[1].toFixed(1)}) rotate(${ang.toFixed(1)}) scale(${this.hs})`);
    }
  }
}

function measureLen(d, svg) {
  const p = svgEl("path", { d, fill: "none", stroke: "none" });
  svg.appendChild(p);
  const len = p.getTotalLength();
  svg.removeChild(p);
  return len;
}

// ----- Hero snake (home) -----
const HERO_S = "M -40 90 H 800 C 960 90 960 250 800 250 H 200 C 40 250 40 410 200 410 H 780";

const hero = {
  rig: new Rig({
    base: $("hero-base"),
    paths: ["hero-outer", "hero-inner", "hero-scales"].map($),
    head: $("hero-head"),
    headScale: 1,
  }),
  head: 0,      // head distance along the guide
  len: 1,       // body length (distance from start to the end of the S)
  key: null,
  letters: [],
  words: [],
  pill: { fa: 0, fb: 0 },
};

const WORDS = [
  { id: "t1", y: 90, cx: 400, step: 44,
    chars: [["P", "#3776ab"], ["y", "#3776ab"], ["S", "#e0a800"], ["h", "#e0a800"], ["o", "#e0a800"], ["w", "#e0a800"]] },
  { id: "t2", y: 250, cx: 500, step: 44,
    chars: [["P"], ["y"], ["t"], ["h"], ["o"], ["n"]] },
  { id: "play-btn", y: 410, cx: 500, step: 42, play: true,
    chars: [["▶"], ["P"], ["L"], ["A"], ["Y"]] },
];

function buildLetters() {
  const rig = hero.rig;
  hero.letters = [];
  hero.words = [];
  WORDS.forEach((w) => {
    const g = $(w.id);
    g.querySelectorAll(".letter").forEach((n) => n.remove());
    const n = w.chars.length;
    let maxFi = 0;
    w.chars.forEach((c, k) => {
      const x = w.cx + (k - (n - 1) / 2) * w.step;
      const fi = rig.fiAtPoint(x, w.y);
      maxFi = Math.max(maxFi, fi);
      const node = svgEl("text", { class: "letter" + (w.play ? " play-letter" : "") });
      node.textContent = c[0];
      if (c[1]) node.style.fill = c[1];
      g.appendChild(node);
      hero.letters.push({ el: node, fi0: fi, a0: rig.baseAngleAt(fi) });
    });
    hero.words.push({ el: g, revealS: (maxFi + 10) / rig.k });
  });
  hero.pill.fa = rig.fiAtPoint(400, 410);
  hero.pill.fb = rig.fiAtPoint(600, 410);
}

function layoutHero() {
  const r = heroSvg.getBoundingClientRect();
  if (!r.width || !r.height) return;
  const scale = Math.min(r.width / 1100, r.height / 520);
  const xEdge = r.width / scale;
  const key = Math.round(xEdge);
  if (hero.key === key && hero.rig.N) return;
  hero.key = key;
  const R = 100;
  const xE = Math.max(1060, xEdge - 60);
  // after the S the snake goes straight to the right edge, turns up and leaves
  const d = HERO_S + ` H ${xE - R} A ${R} ${R} 0 0 0 ${xE} ${410 - R} V -420`;
  hero.rig.setGuide(d);
  hero.len = measureLen(HERO_S, heroSvg);
  buildLetters();
}

function renderHero(time) {
  if (!hero.rig.N) return;
  const rig = hero.rig;
  const amp = state.anim === "on" ? 4 + 6 * (1 - Math.min(1, hero.head / hero.len)) : 0;
  rig.render(hero.head, hero.len, time, amp, 0);

  // letters and the PLAY pill travel with the body
  const shift = Math.max(0, hero.head - hero.len) * rig.k;
  hero.letters.forEach((L) => {
    const fi = L.fi0 + shift;
    if (fi > rig.N) { L.el.setAttribute("visibility", "hidden"); return; }
    L.el.setAttribute("visibility", "visible");
    const p = rig.pointAt(fi);
    let da = rig.angleAt(fi) - L.a0;
    da = ((da + 540) % 360) - 180;
    L.el.setAttribute("transform", `translate(${p[0].toFixed(1)} ${p[1].toFixed(1)}) rotate(${da.toFixed(1)})`);
  });
  const pill = $("play-pill");
  const fa = hero.pill.fa + shift;
  if (fa >= rig.N) pill.setAttribute("d", "");
  else pill.setAttribute("d", rig.subPath(fa, Math.min(hero.pill.fb + shift, rig.N)));

  hero.words.forEach((w) => w.el.classList.toggle("show", hero.head >= w.revealS));
}

// ----- Frame snake (game) -----
const frame = {
  rig: new Rig({
    base: $("frame-base"),
    paths: ["frame-outer", "frame-inner", "frame-scales"].map($),
    head: $("frame-head"),
    headScale: 0.42,
    step: 6,
  }),
  head: 0,
  len: 1,
  angry: false,
};
$("frame-head").innerHTML = $("hero-head").innerHTML;

function layoutFrame() {
  const W = game.clientWidth, H = game.clientHeight;
  if (!W || !H) return;
  frameSvg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  const c = 24, R = 34, rb = 40;
  const xr = W - c, xl = c, yt = c, yb = H - c;
  // enters from above on the right and goes round the screen. The head stops on the top edge.
  // When the question is answered it goes a little further, turns UP and leaves through the top
  // (it never goes back along the way it came in, so it never touches its own body or tongue)
  const Xb = xr - 150;
  const dMain =
    `M ${xr} -240 V ${yb - R} A ${R} ${R} 0 0 1 ${xr - R} ${yb} H ${xl + R} ` +
    `A ${R} ${R} 0 0 1 ${xl} ${yb - R} V ${yt + R} A ${R} ${R} 0 0 1 ${xl + R} ${yt} H ${Xb}`;
  frame.rig.setGuide(dMain + ` A ${rb} ${rb} 0 0 0 ${Xb + rb} ${yt - rb} V -1600`);
  frame.len = measureLen(dMain, frameSvg) - 60;
  ["gFrame", "gAngry"].forEach((id) => {
    const g = $(id);
    g.setAttribute("x2", W);
    g.setAttribute("y2", H);
  });
}

function renderFrame(time) {
  if (!frame.rig.N) return;
  const amp = state.anim === "on" ? 3 : 0;
  const jitter = frame.angry && state.anim === "on" ? (Math.random() - 0.5) * 16 : 0;
  frame.rig.render(frame.head, frame.len, time, amp, jitter);
}

// ================= Animation loop =================
let view = "home";
let busy = false;
let started = false;
let tweening = 0;
let idleRaf = null;

function renderAll(time) {
  if (view === "home") renderHero(time);
  else if (view === "game") renderFrame(time);
}

function ease(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }

function tween(ms, update, easeFn = ease) {
  return new Promise((resolve) => {
    tweening++;
    const t0 = performance.now();
    function step(now) {
      const x = state.anim === "on" ? Math.min(1, (now - t0) / ms) : 1;
      update(easeFn(x));
      renderAll(now / 1000);
      if (x < 1) requestAnimationFrame(step);
      else { tweening--; resolve(); }
    }
    requestAnimationFrame(step);
  });
}

function idle(now) {
  idleRaf = null;
  if (state.anim !== "on") return;
  if (!tweening) renderAll(now / 1000);
  idleRaf = requestAnimationFrame(idle);
}
function startIdle() {
  if (!idleRaf && state.anim === "on") idleRaf = requestAnimationFrame(idle);
}

async function fade(elm, to, ms = 600) {
  void elm.offsetWidth;
  elm.style.transition = `opacity ${ms}ms ease`;
  elm.style.opacity = String(to);
  await wait(ms);
}

// Applies the on/off setting immediately
function applyAnimSetting() {
  document.documentElement.classList.toggle("no-anim", state.anim === "off");
  if (state.anim === "off") {
    if (idleRaf) { cancelAnimationFrame(idleRaf); idleRaf = null; }
    renderAll(0);
  } else {
    startIdle();
  }
}

// ================= Views =================
function showView(name) {
  view = name;
  app.dataset.view = name;
  document.querySelectorAll(".nav[data-view]").forEach((n) => {
    n.classList.toggle("active", n.dataset.view === name);
  });
  hideTip();
  if (name === "home") { layoutHero(); updateXpBar(); }
  if (name === "game") layoutFrame();
  renderAll(performance.now() / 1000);
}

function restoreHero() {
  hero.head = hero.len;
  app.classList.add("done");
  panel.classList.remove("locked");
}

// ================= Intro =================
async function startSnake() {
  if (started || busy) return;
  started = true;
  busy = true;
  app.classList.add("open");
  startIdle();
  await tween(3200, (x) => { hero.head = x * hero.len; });
  app.classList.add("done");
  busy = false;
}

async function replaySnake() {
  closeModal();
  if (busy || view !== "home") return;
  busy = true;
  app.classList.remove("done");
  hero.head = 0;
  await tween(3200, (x) => { hero.head = x * hero.len; });
  app.classList.add("done");
  busy = false;
}

$("hit").addEventListener("click", startSnake);
$("hit").addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); startSnake(); } });
document.querySelector(".click-hint").addEventListener("click", startSnake);

// ================= Setup panel =================
// basic and advanced chips toggle; the Pro chip selects every basic topic and opens the advanced table
document.querySelectorAll("#topics .chip:not(.pro), #pro-topics .chip").forEach((chip) => {
  chip.addEventListener("click", () => { chip.classList.toggle("active"); msg.textContent = ""; });
});
$("pro-chip").addEventListener("click", () => {
  const on = $("pro-chip").classList.toggle("active");
  $("pro-box").hidden = !on;
  if (on) document.querySelectorAll("#topics .chip:not(.pro)").forEach((c) => c.classList.add("active"));
  else document.querySelectorAll("#pro-topics .chip").forEach((c) => c.classList.remove("active"));
  msg.textContent = "";
});
function pickedTopics() {
  return [...document.querySelectorAll("#topics .chip.active:not(.pro), #pro-topics .chip.active")].map((c) => c.dataset.value);
}
["difficulty", "modes"].forEach((id) => {
  document.querySelectorAll(`#${id} .chip`).forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(`#${id} .chip`).forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      msg.textContent = "";
    });
  });
});

