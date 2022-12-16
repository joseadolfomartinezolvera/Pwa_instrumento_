const CACHE_NAME_DYNAMIC = 'dynamic-v1';

const CACHE_NAME_CORE = 'cache-v2';
const CACHE_FILES_CORE = [
    'https://gerbo67.github.io/Divisas/img/logo.png',
    'https://gerbo67.github.io/Divisas/img/flechas.png',
    'https://gerbo67.github.io/Divisas/index.html',
];

const CACHE_NAME_INMUTABLE = 'inmutable-v1';
const CACHE_FILES_INMUTABLE = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'
];

self.addEventListener('install', (event) => {
    const guardandoCache = caches.open(CACHE_NAME_CORE)
        .then(cache => cache.addAll(CACHE_FILES_CORE))
        .catch(err => console.error(err.message));

    const guardandoCacheInmutable = caches.open(CACHE_NAME_INMUTABLE)
        .then(cache => cache.addAll(CACHE_FILES_INMUTABLE))
        .catch(err => console.error(err.message));

    self.skipWaiting();
    event.waitUntil(Promise.all([guardandoCache, guardandoCacheInmutable]));
});

self.addEventListener('activate', (event) => {
    // Eliminando caches obsoletos
    const obtenerCaches = caches.keys()
        .then(allCaches => allCaches.filter(cache => ![CACHE_NAME_CORE, CACHE_NAME_INMUTABLE, CACHE_NAME_DYNAMIC].includes(cache)).filter(cacheName => caches.delete(cacheName)))
        .catch(err => console.error(err.message))
    console.info('[SW]: Cache limpiado exitosamente...');
    event.waitUntil(obtenerCaches);
});

self.addEventListener('fetch', (event) => {
    if (!(event.request.url.indexOf('http') === 0)) {
        return;
    }
    const cacheLuegoRed = caches.open(CACHE_NAME_DYNAMIC)
        .then(cache => {
            return fetch(event.request)
                .then(response => {
                    if (![].concat(CACHE_FILES_CORE, CACHE_FILES_INMUTABLE).indexOf(event.request.url)) {
                        cache.put(event.request, response.clone());
                    }
                    return response;
                })
        });
    event.respondWith(cacheLuegoRed);
});