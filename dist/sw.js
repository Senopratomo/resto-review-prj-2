const version = "0.0.1";
const cacheName = `resto-review-${version}`;
self.addEventListener('install', e => {
    const timeStamp = Date.now();
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                `/`,
                `/index.html`,
                `/css/styles.css`,
                `/js/dbhelper.js`,
                `/js/idb.js`,
                `/js/main.js`,
                `/js/restaurant_info.js`,
                `/img/1.jpg`,
                `/img/2.jpg`,
                `/img/3.jpg`,
                `/img/4.jpg`,
                `/img/5.jpg`,
                `/img/6.jpg`,
                `/img/7.jpg`,
                `/img/8.jpg`,
                `/img/9.jpg`,
                `/img/10.jpg`,
                `http://localhost:1337/restaurants/`,
                `https://fonts.googleapis.com/css?family=Roboto:300,400,500,700`

            ])
            .then(() => self.skipWaiting());
        })
    );
});

// Removing old cache
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cacheName) => {
                    return cacheName.startsWith('resto-reviews-') &&
                        cacheName != staticCacheName;
                }).map((cacheName) => {
                    return caches.delete(cacheName);
                })
            );

        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName).then((cache) => {
            return cache.match(event.request).then((response) => {
                if (response) {
                    return response;
                }
                else {
                    return fetch(event.request).then((networkResponse) => {
                        return networkResponse;
                    }).catch((error) => console.log("Unable to fetch data from network", event.request.url, error));
                }
            });
        }).catch((error) => console.log("Issue occurred with Service Worker fetch intercept", error))
    );
});