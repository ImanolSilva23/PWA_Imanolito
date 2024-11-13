const CACHE_NAME = 'v1';
const cacheAssets = [
    '/PWA_Imanolito/',
    '/PWA_Imanolito/index.html',
    '/PWA_Imanolito/style.css',
    '/PWA_Imanolito/iconos/16x16.png',  // Solo los iconos que existen en tu repositorio
    '/PWA_Imanolito/iconos/32.png',
    '/PWA_Imanolito/iconos/64.png',
    // Agrega más iconos aquí solo si están disponibles
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
        // Opcional: Elimina esta línea si no tienes un archivo de fallback
        .catch(() => caches.match('/PWA_Imanolito/fallback.html'))
    );
});
