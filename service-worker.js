const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "/MyMusic/index.html",
  "/MyMusic/style.css",
  "/MyMusic/JavaScript.js",
  "/MyMusic/manifest.json",
  "/MyMusic/offline.html",
  "/MyMusic/pic/favicon.ico",
  "/MyMusic/nav.html",
  "/MyMusic/pic/icon-192.png",
  "/MyMusic/pic/icon-512.png",
  "/MyMusic/pic/icon-192-maskable.png",
  "/MyMusic/pic/icon-512-maskable.png",
  "/MyMusic/videos.json",
  "/MyMusic/y_flute.html",
  "/MyMusic/y_LuSongs.html",
  "/MyMusic/y_LuSongs.json"
];


// Install Event
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch Event
self.addEventListener("fetch", event => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
          return response;
        })
        .catch(() => caches.match(event.request).then(res => res || caches.match("/MyMusic/offline.html")))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          caches.open(CACHE_NAME).then(cache =>
            cache.put(event.request, networkResponse.clone())
          );
          return networkResponse;
        });
        return cachedResponse || fetchPromise;
      })
    );
  }
});
