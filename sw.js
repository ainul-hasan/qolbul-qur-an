// ============================================
// QOLBUL QUR'AN - SERVICE WORKER
// ============================================

const CACHE_NAME = 'qolbul-quran-v1.0.0';

const ASSETS = [
  './',
  './index.html',
  './offline.html',
  './manifest.json',
  './css/style.css',
  './js/data.js',
  './js/app.js',
  './js/dashboard.js',
  './js/semua.js',
  './js/favorid.js',
  './js/selesai.js',
  './js/pengaturan.js',
  './js/detail.js',
  './html/dashboard.html',
  './html/semua.html',
  './html/favorid.html',
  './html/selesai.html',
  './html/pengaturan.html',
  './html/detail.html',
  './icons/72x72.png',
  './icons/96x96.png',
  './icons/128x128.png',
  './icons/144x144.png',
  './icons/152x152.png',
  './icons/192x192.png',
  './icons/384x384.png',
  './icons/512x512.png'
];

// ============================================
// INSTALL
// ============================================

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching assets...');
        return cache.addAll(ASSETS)
          .then(() => {
            console.log('[SW] All assets cached');
            return self.skipWaiting();
          })
          .catch(err => {
            console.log('[SW] Cache failed:', err);
          });
      })
  );
});

// ============================================
// ACTIVATE
// ============================================

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => {
      console.log('[SW] Activated');
      return self.clients.claim();
    })
  );
});

// ============================================
// FETCH
// ============================================

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    event.respondWith(fetch(request));
    return;
  }

  // Handle same-origin requests
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request)
        .then(cached => {
          if (cached) {
            // Refresh cache in background
            fetch(request).then(response => {
              if (response && response.status === 200) {
                caches.open(CACHE_NAME).then(cache => {
                  cache.put(request, response.clone());
                });
              }
            }).catch(() => {});
            return cached;
          }
          return fetch(request)
            .then(response => {
              if (response && response.status === 200) {
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                  cache.put(request, clone);
                });
              }
              return response;
            })
            .catch(() => {
              // Fallback untuk HTML
              if (url.pathname.includes('/html/')) {
                return caches.match('./html/dashboard.html');
              }
              return caches.match('./offline.html');
            });
        })
    );
    return;
  }

  // Handle external requests (fonts, CDN)
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, clone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});