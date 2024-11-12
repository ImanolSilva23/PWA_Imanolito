const CACHE_NAME = 'v1';
const cacheAssets = [
    '/',
    '/index.html',
    '/style.css',
    '/iconos/16x16.png',
    '/iconos/32.png',
    '/iconos/64.png',
    '/iconos/96.png',
    '/iconos/128.png',
    '/iconos/144.png',
    '/iconos/192.png',
    '/iconos/256.png',
    '/iconos/384.png',
    '/iconos/512.png',
    '/iconos/1024.png'
];

// Evento de instalación
self.addEventListener('install', (e) => {
    console.log('Service Worker: Instalación');
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Archivos cacheados');
            return cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
        .catch(error => console.error('Error al cachear archivos:', error))
    );
});

// Evento de activación
self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activación');
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log(`Eliminando caché antigua: ${cache}`);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Evento de fetch
self.addEventListener('fetch', (e) => {
    console.log('Service Worker: Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request)
        .then(response => response || fetch(e.request))
        .catch(() => caches.match('/fallback.html')) // Opcionalmente, un archivo de fallback si lo necesitas
    );
});
