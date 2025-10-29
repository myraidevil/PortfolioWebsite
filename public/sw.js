const CACHE_VERSION = 'v1';
const CACHE_NAME = `portfolio-${CACHE_VERSION}`;

// Assets to cache immediately
const PRECACHE_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/assets/fonts/gotham-book.woff2',
  '/assets/fonts/gotham-medium.woff2',
];

// Assets to cache on first use
const RUNTIME_ASSETS = [
  /\\.(?:js|css)$/, // All JS and CSS files
  /\\.(?:png|jpg|jpeg|gif|webp|svg)$/, // All image files
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(
            cacheName => cacheName.startsWith('portfolio-') && cacheName !== CACHE_NAME
          )
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  // Network-first strategy for navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
    return;
  }

  // Cache-first strategy for runtime assets
  if (RUNTIME_ASSETS.some(pattern => pattern.test(event.request.url))) {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) return response;

        return fetch(event.request).then(response => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
    );
    return;
  }
});
