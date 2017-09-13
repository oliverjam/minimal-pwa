const CACHE_NAME = 'mpwa-cache-v1';
const urlsToCache = [
  '/',
  '/assets/style.css',
  '/assets/index.js',
  '/assets/prism.js',
  '/assets/img/pwa-stats.png',
  '/assets/img/bing-store.jpg',
];

// Listen for the install event, which fires when the service worker is installing
self.addEventListener('install', event => {
  // Ensures the install event doesn't complete until after the cache promise resolves
  // This is so we don't move on to other events until the critical initial cache is done
  event.waitUntil(
    // Open a named cache, then add all the specified URLs to it
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Listen for the activate event, which is fired after installation
// Activate is when the service worker actually takes over from the previous
// version, which is a good time to clean up old caches
self.addEventListener('activate', event => {
  console.log('Finally active. Ready to serve!');
  event.waitUntil(
    // Get the keys of all the old caches
    caches
      .keys()
      // Ensure we don't resolve until all the promises do (i.e. each key has been deleted)
      .then(keys =>
        Promise.all(
          keys
            // Remove any cache that matches the current cache name
            .filter(key => key !== CACHE_NAME)
            // Map over the array of old cache names and delete them all
            .map(key => caches.delete(key))
        )
      )
  );
});

// Listen for browser fetch events. These fire any time the browser tries to load
// any outside resources
self.addEventListener('fetch', function(event) {
  // This lets us control the response
  // We pass in a promise that resolves with a response object
  event.respondWith(
    // Check whether we have a matching response for this request in our cache
    caches.match(event.request).then(response => {
      // It's in the cache! Serve the response straight from there
      if (response) {
        console.log('Serving response from the cache');
        return response;
      }
      // If it's not in the cache we make a fetch request for the resource
      return (
        fetch(event.request)
          // Then we open our cache
          .then(response => caches.open(CACHE_NAME))
          // Then we put the request into the cache, so we have it offline next time
          .then(cache => {
            // We have to clone the response as response streams can only be read once
            // This way we can put one copy in the cache and return the other to the browser
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(response => {
            console.log('Fetch failed, sorry.');
          })
      );
    })
  );
});
