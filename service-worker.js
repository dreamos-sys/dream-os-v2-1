/* ============================================
   🕌 DREAM OS v2.1 - SERVICE WORKER
   Ghost Architect Sovereign Edition
   ISO 27001 & 9001 Compliant
   Bismillah bi idznillah
   ============================================ */

const VERSION = 'v2.1.0-ghost';
const STATIC_CACHE = `dreamos-static-${VERSION}`;
const DYNAMIC_CACHE = `dreamos-dynamic-${VERSION}`;

// Assets diperbaiki menggunakan path relatif (./) agar aman di GitHub Pages
const CRITICAL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './shell.js',
  './js/dream-core.js',
  './shared/services/index.js',
  './assets/icons/logo_haa.svg',
  './assets/icons/icon-192x192.png',
  './assets/icons/icon-512x512.png'
];

// ============================================
// INSTALL - Membangun Benteng Cache Awal
// ============================================
self.addEventListener('install', (event) => {
  console.log('🌙 [SW] Bismillah: Installing Dream OS Engine...');
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(CRITICAL_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// ============================================
// ACTIVATE - Pembersihan Cache Lama (ISO 9001)
// ============================================
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

// ============================================
// FETCH - Strategi Cerdas Ghost Architect
// ============================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. API & Database (Supabase/Cloudflare) -> Network First
  if (url.hostname.includes('supabase.co') || url.hostname.includes('cloudflare.com')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // 2. Modul Dinamis (Folder /modules/) -> Stale While Revalidate
  // Ini agar saat My Bro update module ghost, user dapet versi terbaru setelah refresh
  if (url.pathname.includes('/modules/')) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // 3. Static Assets -> Cache First
  event.respondWith(
    caches.match(request).then((response) => {
      return response || fetch(request).then((networkRes) => {
        return caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(request, networkRes.clone());
          return networkRes;
        });
      });
    }).catch(() => caches.match('./index.html')) // Fallback ke Home
  );
});

// --- STRATEGY HELPERS ---

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

async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedRes = await cache.match(request);
  
  const fetchPromise = fetch(request).then((networkRes) => {
    cache.put(request, networkRes.clone());
    return networkRes;
  });

  return cachedRes || fetchPromise;
}

// ============================================
// PUSH NOTIFICATION (Shalawat Reminder)
// ============================================
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
