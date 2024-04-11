// service-worker.js

// Nombre del caché
const CACHE_NAME = 'adercode-cache-v1';

// Lista de recursos a precargar en el caché
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/logo.png',
];

// Evento de instalación del service worker
self.addEventListener('install', event => {
  // Precarga los recursos en caché
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de activación del service worker
self.addEventListener('activate', event => {
  // Elimina cachés antiguos
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Evento fetch para interceptar las solicitudes de recursos
self.addEventListener('fetch', event => {
  event.respondWith(
    // Busca en caché primero y devuelve la respuesta si está disponible
    caches.match(event.request)
      .then(response => {
        // Devuelve la respuesta desde caché o realiza una solicitud de red
        return response || fetch(event.request);
      })
  );
});
