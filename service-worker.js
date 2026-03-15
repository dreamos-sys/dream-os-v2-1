/* ════════════════════════════════════════════
   DREAM OS v2.1 - SERVICE WORKER
   Fixed Paths for GitHub Pages
   ════════════════════════════════════════════ */

const VERSION = 'v2.1.0-ghost';
const STATIC_CACHE = `dreamos-static-${VERSION}`;
const DYNAMIC_CACHE = `dreamos-dynamic-${VERSION}`;

// Fixed paths for GitHub Pages
const CRITICAL_ASSETS = [
  './',
  './index.html',
  './shell.js',
  './manifest.json',
  './offline.html'
];

// Install
self.addEventListener('install', (event) => {
  console.log('🌙 [SW] Bismillah: Installing Dream OS Engine...');
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(CRITICAL_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
            .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
  console.log('✅ [SW] Dream OS v2.1 Active & Sovereign.');
});

// Fetch
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API requests - Network First
  if (url.hostname.includes('supabase.co') || url.hostname.includes('cloudflare.com')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Static assets - Cache First
  event.respondWith(
    caches.match(request).then((response) => {
      return response || fetch(request).then((networkRes) => {
        return caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(request, networkRes.clone());
          return networkRes;
        });
      });
    }).catch(() => caches.match('./offline.html'))
  );
});

// Network First Helper
async function networkFirst(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  try {
    const networkRes = await fetch(request);
    cache.put(request, networkRes.clone());
    return networkRes;
  } catch (err) {
    const cachedRes = await cache.match(request);
    return cachedRes || new Response(JSON.stringify({ error: 'Offline Mode active' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Push Notification
self.addEventListener('push', (event) => {
  const data = event.data?.json() || { title: 'Dream OS', body: 'Bismillah' };
  const options = {
    body: data.body,
    icon: './assets/icons/icon-192x192.png',
    badge: './assets/icons/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: { url: './index.html' }
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});
