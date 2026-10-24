// PyShow service worker: keeps the site files so it opens fast and works offline.
// (Python for the "Write code" mode still needs the internet the first time.)
const CACHE = "pyshow-v1";
const FILES = ["./", "index.html", "style.css", "flags.js", "core.js", "snake.js", "sound.js", "python.js", "game.js", "ui.js", "main.js", "i18n.js", "bank.js", "problems.js", "content_i18n.js", "icon.svg", "manifest.webmanifest"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  // network first (so updates show up), the saved copy when offline
  e.respondWith(fetch(e.request).then((r) => { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request)));
});
