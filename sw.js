const APP_VERSION = 'v2026-06-02-2';
const CACHE_PREFIX = 'goldtech-pwa';
const SHELL_CACHE = `${CACHE_PREFIX}-shell-${APP_VERSION}`;
const RUNTIME_CACHE = `${CACHE_PREFIX}-runtime-${APP_VERSION}`;
const OFFLINE_URL = 'offline.html';

const SHELL_ASSETS = [
  OFFLINE_URL,
  'manifest.json',
  'assets/css/style.css',
  'assets/js/components.js',
  'assets/js/i18n.js',
  'assets/golds-logo.png',
  'assets/logo-app.png'
];

const isSameOrigin = (url) => url.origin === self.location.origin;
const isHtmlRequest = (request) => request.mode === 'navigate' || request.destination === 'document';
const isCriticalAsset = (request) => ['script', 'style'].includes(request.destination);
const isManifestRequest = (url) => url.pathname.endsWith('/manifest.json') || url.pathname.endsWith('manifest.json');
const isCacheableResponse = (response) => response && (response.ok || response.type === 'opaque');

const putIfCacheable = async (cache, request, response) => {
  if (isCacheableResponse(response)) {
    await cache.put(request, response.clone());
  }
  return response;
};

const clearOldCaches = async () => {
  const keys = await caches.keys();
  await Promise.all(
    keys
      .filter((key) => key.startsWith(CACHE_PREFIX) && key !== SHELL_CACHE && key !== RUNTIME_CACHE)
      .map((key) => caches.delete(key))
  );
};

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    await cache.addAll(SHELL_ASSETS);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    await clearOldCaches();
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  const sameOrigin = isSameOrigin(requestUrl);

  if (!sameOrigin) return;

  // Keep app code fresh after deploys, but let non-critical assets stay fast.
  if (isHtmlRequest(event.request) || isCriticalAsset(event.request) || isManifestRequest(requestUrl)) {
    event.respondWith((async () => {
      const cacheName = isHtmlRequest(event.request) ? SHELL_CACHE : RUNTIME_CACHE;
      const cache = await caches.open(cacheName);
      try {
        const networkResponse = await fetch(event.request, { cache: 'no-store' });
        return await putIfCacheable(cache, event.request, networkResponse);
      } catch {
        const cached = await cache.match(event.request);
        if (cached) return cached;
        if (isHtmlRequest(event.request)) {
          return (await caches.match(OFFLINE_URL)) || Response.error();
        }
        return Response.error();
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(RUNTIME_CACHE);
    const cached = await cache.match(event.request);
    if (cached) return cached;

    try {
      const networkResponse = await fetch(event.request);
      return await putIfCacheable(cache, event.request, networkResponse);
    } catch {
      return Response.error();
    }
  })());
});
