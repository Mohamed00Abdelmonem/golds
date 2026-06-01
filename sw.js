const CACHE_NAME = 'goldtech-pwa-v2';
const CORE_ASSETS = [
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800;900&display=swap',
  'landing.html',
  'index.html',
  'offline.html',
  'manifest.json',
  'assets/css/style.css',
  'assets/js/components.js',
  'assets/js/i18n.js',
  'assets/golds-logo.png',
  'assets/logo-app.png',
  'achievements.html',
  'blog-details.html',
  'blogs.html',
  'classes.html',
  'coach-dashboard.html',
  'coach.html',
  'coaches.html',
  'community.html',
  'crowd.html',
  'dashboard.html',
  'exercise.html',
  'inbody.html',
  'login.html',
  'machines.html',
  'membership.html',
  'notifications.html',
  'nutrition.html',
  'product.html',
  'profile.html',
  'programs.html',
  'qr.html',
  'register.html',
  'settings.html',
  'smart-attendance.html',
  'smart-test.html',
  'store.html',
  'stories.html',
  'support.html',
  'timer.html',
  'workout.html'
];

const addToCache = async (cache, request) => {
  try {
    const response = await fetch(request);
    if (response && (response.ok || response.type === 'opaque')) {
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    return null;
  }
};

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(CORE_ASSETS.map((asset) => addToCache(cache, asset)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const isNavigation = event.request.mode === 'navigate';

  if (isNavigation) {
    event.respondWith((async () => {
      try {
        const networkResponse = await fetch(event.request);
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, networkResponse.clone());
        return networkResponse;
      } catch {
        const cachedPage = await caches.match(event.request, { ignoreSearch: true });
        if (cachedPage) return cachedPage;
        return caches.match('offline.html');
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(event.request, { ignoreSearch: true });
    if (cachedResponse) return cachedResponse;

    const networkResponse = await addToCache(cache, event.request);
    if (networkResponse) return networkResponse;

    return cachedResponse || Response.error();
  })());
});