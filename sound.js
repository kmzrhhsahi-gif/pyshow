// PyShow – Sounds and background music.
// The files share one global scope and are loaded in this order: i18n, bank, problems, core, snake, sound, python, game, ui, main.
// ================= Sound (made with the browser, no files) =================
let actx = null;
function audio() {
  if (!actx) {
    try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; }
  }
  if (actx.state === "suspended") actx.resume();
  return actx;
}
function out(c) {                       // master volume
  if (!c._m) { c._m = c.createGain(); c._m.connect(c.destination); }
  c._m.gain.value = Math.max(0, Math.min(100, state.vol)) / 100;
  return c._m;
}
function noiseBurst(c, dur, hp, vol) {
  const len = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;
  const f = c.createBiquadFilter();
  f.type = "highpass";
  f.frequency.value = hp;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, c.currentTime);
  g.gain.linearRampToValueAtTime(vol, c.currentTime + dur * 0.2);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
  src.connect(f); f.connect(g); g.connect(out(c));
  src.start();
}
function tone(c, freq, start, dur, vol, type = "sine") {
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, c.currentTime + start);
  g.gain.setValueAtTime(0.0001, c.currentTime + start);
  g.gain.linearRampToValueAtTime(vol, c.currentTime + start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + start + dur);
  o.connect(g); g.connect(out(c));
  o.start(c.currentTime + start);
  o.stop(c.currentTime + start + dur + 0.05);
}
function sfxHiss() {
  if (state.sound !== "on") return;
  const c = audio(); if (!c) return;
  noiseBurst(c, 1.2, 3500, 0.35);
}
function sfxChomp() {
  if (state.sound !== "on") return;
  const c = audio(); if (!c) return;
  noiseBurst(c, 0.25, 800, 0.5);
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(160, c.currentTime);
  o.frequency.exponentialRampToValueAtTime(45, c.currentTime + 0.25);
  g.gain.setValueAtTime(0.7, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.3);
  o.connect(g); g.connect(out(c));
  o.start(); o.stop(c.currentTime + 0.35);
}
function sfxWin() {
  if (state.sound !== "on") return;
  const c = audio(); if (!c) return;
  [523, 659, 784, 1047].forEach((f, i) => tone(c, f, i * 0.09, 0.25, 0.22, "triangle"));
}
function sfxClick() {
  if (state.sound !== "on") return;
  const c = audio(); if (!c) return;
  tone(c, 880, 0, 0.05, 0.12, "square");
}
function sfxTick() {
  if (state.sound !== "on") return;
  const c = audio(); if (!c) return;
  tone(c, 1500, 0, 0.03, 0.15, "square");
}
function sfxCoin() {
  if (state.sound !== "on") return;
  const c = audio(); if (!c) return;
  tone(c, 988, 0, 0.1, 0.22, "square");
  tone(c, 1319, 0.09, 0.4, 0.22, "square");
}
function sfxLevel() {
  if (state.sound !== "on") return;
  const c = audio(); if (!c) return;
  [392, 523, 659, 784, 1047, 1319].forEach((f, i) => tone(c, f, i * 0.1, 0.35, 0.22, "triangle"));
  tone(c, 2093, 0.65, 0.8, 0.12, "sine");
}
function sfxSlither() {                  // the snake sliding into the question screen
  if (state.sound !== "on") return;
  const c = audio(); if (!c) return;
  noiseBurst(c, 1.6, 2500, 0.12);
  noiseBurst(c, 1.2, 1200, 0.08);
}
// every button gets a small click sound
document.addEventListener("click", (e) => { if (e.target.closest("button, .nav, .opt, .chip, select")) sfxClick(); }, true);

// ================= Background music (made with the browser, no files) =================
const midiF = (m) => 440 * Math.pow(2, (m - 69) / 12);
function mTone(c, dest, f, at, dur, type, vol, cutoff) {
  const o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.value = f;
  let node = o;
  if (cutoff) { const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = cutoff; o.connect(lp); node = lp; }
  g.gain.setValueAtTime(0.0001, at);
  g.gain.linearRampToValueAtTime(vol, at + Math.min(0.03, dur * 0.3));
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  node.connect(g); g.connect(dest);
  o.start(at); o.stop(at + dur + 0.05);
}
function mHat(c, dest, at, vol) {
  const len = Math.floor(c.sampleRate * 0.05), buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
  s.buffer = buf; f.type = "highpass"; f.frequency.value = 7000; g.gain.value = vol;
  s.connect(f); f.connect(g); g.connect(dest); s.start(at);
}
function mKick(c, dest, at, vol) {
  const o = c.createOscillator(), g = c.createGain();
  o.frequency.setValueAtTime(140, at); o.frequency.exponentialRampToValueAtTime(45, at + 0.12);
  g.gain.setValueAtTime(vol, at); g.gain.exponentialRampToValueAtTime(0.0001, at + 0.18);
  o.connect(g); g.connect(dest); o.start(at); o.stop(at + 0.2);
}
// every track: bpm and play(c, dest, at, step, dur); step counts 16th notes, 64 = 4 bars
const TRACKS = {
  chill: { bpm: 78, play(c, d, at, s, dur) {
    const roots = [57, 53, 48, 55], chords = [[0, 3, 7], [0, 4, 7], [0, 4, 7], [0, 4, 7]];
    const bar = (s >> 4) & 3, st = s & 15, r = roots[bar], ch = chords[bar];
    if (st === 0) ch.forEach((n) => mTone(c, d, midiF(r + 12 + n), at, dur * 15, "sine", 0.08, 1400));
    if (st === 0 || st === 8) mTone(c, d, midiF(r - 12), at, dur * 7, "sine", 0.2);
    if (st % 2 === 0) { const pat = [0, 1, 2, 1, 2, 1, 0, 1][(st / 2) % 8]; mTone(c, d, midiF(r + 24 + ch[pat % 3]), at, dur * 3, "triangle", 0.09, 2400); }
  } },
  arcade: { bpm: 126, play(c, d, at, s, dur) {
    const roots = [60, 57, 53, 55], bar = (s >> 4) & 3, st = s & 15, r = roots[bar];
    const arp = [0, 4, 7, 12, 7, 4, 0, 4, 7, 12, 16, 12, 7, 4, 7, 12][st];
    mTone(c, d, midiF(r + 12 + arp), at, dur * 0.9, "square", 0.06, 3200);
    if (st % 2 === 0) mTone(c, d, midiF(r - 12 + (st % 4 ? 12 : 0)), at, dur * 1.6, "sawtooth", 0.07, 700);
    if (st % 4 === 2) mHat(c, d, at, 0.12);
    if (st % 8 === 0) mKick(c, d, at, 0.35);
  } },
  night: { bpm: 60, play(c, d, at, s, dur) {
    const roots = [50, 46, 53, 48], bar = (s >> 4) & 3, st = s & 15, r = roots[bar];
    if (st === 0) [0, 7, 12, 15].forEach((n) => mTone(c, d, midiF(r + n), at, dur * 16, "sawtooth", 0.035, 650));
    if (st === 0) mTone(c, d, midiF(r - 12), at, dur * 15, "sine", 0.18);
    const bell = { 0: 0, 6: 7, 10: 12, 13: 10 }[st];
    if (bell !== undefined && (bar % 2 === 0 || st !== 13)) mTone(c, d, midiF(r + 24 + bell), at, dur * 6, "sine", 0.07);
  } },
  focus: { bpm: 92, play(c, d, at, s, dur) {
    const roots = [53, 52, 50, 48], bar = (s >> 4) & 3, st = s & 15, r = roots[bar];
    if (st === 0 || st === 10) [0, 4, 7, 11].forEach((n) => mTone(c, d, midiF(r + 12 + n), at, dur * 5, "triangle", 0.06, 1500));
    if (st === 0 || st === 10) mTone(c, d, midiF(r - 12), at, dur * 5, "sine", 0.18);
    if (st === 0 || st === 8) mKick(c, d, at, 0.3);
    if (st % 4 === 2) mHat(c, d, at, 0.08);
    if (st === 12) mTone(c, d, midiF(r + 24), at, dur * 3, "sine", 0.05);
  } },
};
const Music = {
  id: load("pyshow_music", "chill"),
  mvol: Number(load("pyshow_mvol", "50")),
  timer: null, step: 0, nextT: 0, cur: null,
  gain(c) {
    if (!c._mus) {                          // a soft limiter keeps the music from ever clipping
      const lim = c.createDynamicsCompressor();
      lim.threshold.value = -10; lim.ratio.value = 8; lim.attack.value = 0.01; lim.release.value = 0.2;
      c._mus = c.createGain(); c._mus.connect(lim); lim.connect(c.destination);
    }
    // measured: the tracks peak around 0.35 and sit near -28 dB; x1.5 keeps them clearly quieter than the sound effects
    c._mus.gain.value = (Math.max(0, Math.min(100, state.vol)) / 100) * (this.mvol / 100) * 1.5;
    return c._mus;
  },
  sync() {                                   // start, switch or stop so it matches the settings
    const want = state.sound === "on" && TRACKS[this.id] && actx && actx.state !== "closed" ? this.id : null;
    if (!want) { this.stop(); return; }
    if (this.cur === want && this.timer) return;
    this.stop();
    const c = audio(); if (!c) return;
    this.cur = want; this.step = 0; this.nextT = c.currentTime + 0.1;
    const tick = () => {
      const tr = TRACKS[this.cur]; if (!tr) return;
      const dest = this.gain(c), dur = 60 / tr.bpm / 4;
      if (this.nextT < c.currentTime) this.nextT = c.currentTime + 0.05;   // woke up after the tab slept
      while (this.nextT < c.currentTime + 0.3) { tr.play(c, dest, this.nextT, this.step, dur); this.nextT += dur; this.step = (this.step + 1) % 64; }
    };
    tick(); this.timer = setInterval(tick, 100);
  },
  stop() { if (this.timer) clearInterval(this.timer); this.timer = null; this.cur = null; },
  set(id) { this.id = id; save("pyshow_music", id); this.sync(); },
  setVol(v) { this.mvol = v; save("pyshow_mvol", String(v)); if (actx) this.gain(actx); },
};
// browsers only allow sound after a click: the first click starts the music
document.addEventListener("click", () => { audio(); Music.sync(); }, true);

