/* Service Worker — Tiệm Tarot Đêm Khuya
   Precache core files; runtime cache-first cho ảnh lá bài & font. */
const CACHE = "tiem-tarot-v3";
const CORE = [
  "./game.html",
  "./manifest.webmanifest",
  "./css/style.css",
  "./css/mystic.css",
  "./js/icons.js",
  "./js/shared.js",
  "./js/data.js",
  "./js/esoteric.js",
  "./js/cardart.js",
  "./js/app.js",
  "./js/tarot-story.js",
  "./js/chiemtinh.js",
  "./js/thanso.js",
  "./js/matran.js",
  "./js/solar.js",
  "./games/tarot.html",
  "./games/chiem-tinh.html",
  "./games/than-so.html",
  "./games/ma-tran.html",
  "./games/solar-return.html",
  "./img/icon-192.png",
  "./img/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;

  // Ảnh lá bài + icon: cache-first (không đổi bao giờ)
  if (url.origin === location.origin && url.pathname.includes("/img/")) {
    e.respondWith(
      caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }))
    );
    return;
  }

  // Còn lại: network-first, fallback cache khi offline
  e.respondWith(
    fetch(e.request).then(res => {
      if (res.ok && url.origin === location.origin) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match(e.request).then(hit => hit || caches.match("./game.html")))
  );
});
