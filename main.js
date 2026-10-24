// PyShow – Resize, start-up and copy protection.
// The files share one global scope and are loaded in this order: i18n, bank, problems, core, snake, sound, python, game, ui, main.
// ================= Resize =================
let resizeTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (view === "home") layoutHero();
    if (view === "game") layoutFrame();
    renderAll(performance.now() / 1000);
  }, 120);
});

// ================= Start =================
applyTheme();
applyLang();
updateXpBar();
updateLives();
updateNavAvatar();
seedInbox();
document.documentElement.classList.toggle("no-anim", state.anim === "off");
layoutHero();
renderHero(0);

// ================= Copy and screenshot protection =================
// A website can not truly stop screenshots (phone cameras, Snipping Tool ...). This only makes copying and the usual screenshot ways harder.
(() => {
  const root = document.documentElement;
  const inField = (e) => { const n = e.target && (e.target.nodeType === 1 ? e.target : e.target.parentElement); return !!(n && n.closest && n.closest("textarea, input, select")); };
  ["copy", "cut", "contextmenu", "dragstart", "selectstart"].forEach((ev) => document.addEventListener(ev, (e) => { if (!inField(e)) e.preventDefault(); }));
  let hideTimer = null;
  const shield = (ms) => { root.classList.add("shielded"); clearTimeout(hideTimer); if (ms) hideTimer = setTimeout(() => root.classList.remove("shielded"), ms); };
  document.addEventListener("keydown", (e) => {
    const k = e.key.toLowerCase(), mod = e.ctrlKey || e.metaKey;
    if (mod && ["c", "x", "u", "s", "p", "a"].includes(k) && !inField(e)) e.preventDefault();
    if (e.key === "PrintScreen" || (e.metaKey && e.shiftKey && k === "s")) { shield(1500); try { navigator.clipboard.writeText(" "); } catch (x) {} }
  });
  document.addEventListener("keyup", (e) => { if (e.key === "PrintScreen") { shield(1500); try { navigator.clipboard.writeText(" "); } catch (x) {} } });
  window.addEventListener("blur", () => shield(0));
  window.addEventListener("focus", () => { clearTimeout(hideTimer); root.classList.remove("shielded"); });
})();

