const CACHE_NAME = 'goldtech-pwa-v1';
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
  'workout.html',
  'arabic/achievements.html',
  'arabic/blog-details.html',
  'arabic/blogs.html',
  'arabic/classes.html',
  'arabic/coach.html',
  'arabic/coaches.html',
  'arabic/community.html',
  'arabic/crowd.html',
  'arabic/dashboard.html',
  'arabic/exercise.html',
  'arabic/inbody.html',
  'arabic/index.html',
  'arabic/landing.html',
  'arabic/login.html',
  'arabic/machines.html',
  'arabic/membership.html',
  'arabic/notifications.html',
  'arabic/nutrition.html',
  'arabic/product.html',
  'arabic/profile.html',
  'arabic/programs.html',
  'arabic/qr.html',
  'arabic/register.html',
  'arabic/settings.html',
  'arabic/smart-test.html',
  'arabic/store.html',
  'arabic/stories.html',
  'arabic/support.html',
  'arabic/timer.html',
  'arabic/workout.html'
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
    await cache.addAll(CORE_ASSETS);
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

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;
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

  if (!isSameOrigin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(event.request, { ignoreSearch: true });
    if (cachedResponse) return cachedResponse;

    const networkResponse = await addToCache(cache, event.request);
    if (networkResponse) return networkResponse;

    return cachedResponse || Response.error();
  })());
});