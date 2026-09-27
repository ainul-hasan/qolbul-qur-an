// ============================================
// QOLBUL QUR'AN - SERVICE WORKER v2.0
// ============================================

const CACHE_NAME = 'qolbul-quran-v2.0.1';

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
  console.log('[SW] Installing v2.0.0...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching assets...');
        // Caching satu-satu agar kalau ada yang gagal, yang lain tetap lanjut
        return Promise.all(
          ASSETS.map(url => {
            return cache.add(url).catch(err => {
              console.warn('[SW] Failed to cache:', url, err.message);
            });
          })
        );
      })
      .then(() => {
        console.log('[SW] Install complete');
        return self.skipWaiting();
      })
  );
});

// ============================================
// ACTIVATE
// ============================================

self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      console.log('[SW] Activated');
      return self.clients.claim();
    })
  );
});

// ============================================
// FETCH - Cache First untuk same-origin, Network First untuk external
// ============================================

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET
  if (request.method !== 'GET') {
    event.respondWith(fetch(request));
    return;
  }

  // Skip chrome-extension
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // ===== SAME ORIGIN: Cache First =====
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request)
        .then(cached => {
          if (cached) {
            // Refresh cache di background
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
              // Fallback untuk HTML → offline page
              if (request.headers.get('accept') && request.headers.get('accept').includes('text/html')) {
                return caches.match('./offline.html');
              }
            });
        })
    );
    return;
  }

  // ===== EXTERNAL (fonts, CDN, API): Network First =====
  event.respondWith(
    fetch(request)
      .then(response => {
        // Cache font & CDN
        if (response && response.status === 200 && 
            (url.hostname.includes('fonts.googleapis') || 
             url.hostname.includes('fonts.gstatic') ||
             url.hostname.includes('cdnjs.cloudflare'))) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, clone);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback ke cache kalau offline
        return caches.match(request);
      })
  );
});

// ============================================
// MESSAGE - Handle skipWaiting dari client
// ============================================

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[SW] Qolbul Qur\'an SW loaded');
