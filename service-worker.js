const CACHE_NAME = 'v1';
const cacheAssets = [
    './',
    '/PWA_Imanolito/index.html',
    '/PWA_Imanolito/style.css',
    '/PWA_Imanolito/Iconos/16x16.png',
    '/PWA_Imanolito/Iconos/32.png',
    '/PWA_Imanolito/Iconos/64.png',
    '/PWA_Imanolito/Iconos/96.png',
    '/PWA_Imanolito/Iconos/128.png',
    '/PWA_Imanolito/Iconos/192.png',
    '/PWA_Imanolito/Iconos/256.png',
    '/PWA_Imanolito/Iconos/384.png',
    '/PWA_Imanolito/Iconos/512.png'
];

// Evento de instalación
self.addEventListener('install', (e) => {
    console.log('Service Worker: Instalación');
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Archivos cacheados');
            return Promise.all(
                cacheAssets.map(asset => 
                    cache.add(asset).catch(err => console.error(`Error al cachear ${asset}:`, err))
                )
            );
        })
        .then(() => self.skipWaiting())
        .catch(error => console.error('Error al abrir el caché:', error))
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
        .catch(() => console.error('Error de red, archivo no encontrado'))
    );
});
