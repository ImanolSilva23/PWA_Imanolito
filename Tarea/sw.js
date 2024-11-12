const CACHE_NAME = "V1_cache_PWA";

var urlToCache = [
    "/",
    "images/habilidades/angular.webp",
    "images/habilidades/Csharp.png",
    "images/habilidades/dart.png",
    "images/habilidades/htmlcss.png",
    "images/habilidades/java.jpg",
    "images/habilidades/js.png",
    "images/habilidades/logo-CSharp.png",
    "images/habilidades/logo-dart.png",
    "images/habilidades/logo-java.png",
    "images/habilidades/node.png",
    "images/habilidades/python.png",
    "images/habilidades/react.png",
    "images/habilidades/ts.png",
    "images/habilidades/Icons/logo.png",
    "images/habilidades/Icons/logo16x16.jpeg",
    "images/habilidades/Icons/logo32x32.jpeg",
    "images/habilidades/Icons/logo64x64.jpeg",
    "images/habilidades/Icons/logo96x96.jpeg",
    "images/habilidades/Icons/logo128x128.jpeg",
    "images/habilidades/Icons/logo192x192.jpeg",
    "images/habilidades/Icons/logo256x256.jpeg",
    "images/habilidades/Icons/logo384x384.jpeg",
    "images/habilidades/Icons/logo512x512.jpeg",
    "images/habilidades/Icons/logo1024x1024.jpeg",
    "images/logoserare.png",
    "images/me.jpg",
    "images/nightride.webp",
    "index.html",
    "styes.css",
    "main.js",
    "sw.js",
    "manifest.json"
];
// Instalación del Service Worker
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log("Cache abierta");
                return cache.addAll(urlToCache)
                    .then(() => {
                        self.skipWaiting();
                    });
            })
            .catch(error => console.error("Error al abrir la cache:", error))
    );
});

// Activación del Service Worker
self.addEventListener('activate', e => {
    //añadimos todos los elementos en la cache
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWhiteList.indexOf(cacheName) === -1) {
                            //borrar los elementos que ya no esten en
                            //la cache o no se necesiten
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                //Activar cache en el dispositivo
                self.clients.claim();
            })
    );
});
