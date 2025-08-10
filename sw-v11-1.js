
const CACHE = 'martyscoolapp-v11-1';
const ASSETS = ['/', '/index.html', '/200.html', '/manifest.webmanifest?v=11.1'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))).then(self.clients.claim()));
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin === location.origin) {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request).then(r => r).catch(() => caches.match('/index.html'))));
  }
});
