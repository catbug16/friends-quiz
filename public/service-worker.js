const cacheName = 'v1';

self.addEventListener('install', (event) => {
    console.log('Installing service worker');
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/static/js/bundle.js', 
                '/static/css/main.css', 
                '/images/background.jpg', 
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activated');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('Fetching', event.request.url);
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
