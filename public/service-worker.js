// const VERSION = '1.0.28';
// const CACHE_NAME = `BL-cache-${VERSION}`;

// const ASSETS = [
//   '/favicon.ico',
//   '/icons/android-chrome-192x192.png',
//   '/icons/android-chrome-512x512.png',
//   '/b8c277d8a1c9b0d28afd.png',
//   '/75d37cba851487f6e6cc.woff',
// ];

// self.addEventListener('install', (domEvent) => {
//   console.log('[service-worker] install');

//   domEvent.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(ASSETS);
//     }),
//   );
// });

// self.addEventListener('fetch', (domEvent) => {
//   console.log('[service-worker] fetch');

//   if (
//     domEvent.request.url.startsWith('chrome-extension:') ||
//     domEvent.request.url.startsWith('file:')
//   ) {
//     // If the request is unsupported, do nothing
//     return;
//   }

//   domEvent.respondWith(
//     fetch(domEvent.request)
//       .then((response) => {
//         return caches.open(CACHE_NAME).then((cache) => {
//           cache.put(domEvent.request, response.clone());
//           return response;
//         });
//       })
//       .catch(() => {
//         return caches.match(domEvent.request);
//       }),
//   );
// });

self.addEventListener('activate', (event) => {
  console.log('[service-worker] activate');
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
