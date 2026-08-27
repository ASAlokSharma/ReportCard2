/* Ythaen Academic Portal — service worker.
   Deliberately does NOT cache anything.
   This portal shows real student names, parents' names, and marks,
   so nothing about it should ever be served from an offline cache —
   every request must go to the network so the middleware's auth
   and cache-control checks are always re-evaluated.
   The only job this worker does is clean up any caches a *previous*
   version of the site may have left behind on a returning visitor's
   device. */

self.addEventListener("install", (event) => {
  // Take over immediately instead of waiting for old tabs to close.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.clients.claim();
    })()
  );
});

// Intentionally no "fetch" handler: every request falls straight through
// to the network. Do not add a cache-first or stale-while-revalidate
// strategy here without re-checking it against the auth/session model —
// a cached admin dashboard response is a data leak.
