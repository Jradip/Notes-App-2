import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ url }) => url.origin.startsWith('https://fonts.googleapis.com'),
  new CacheFirst({
    cacheName: 'google-fonts',
  })
);

registerRoute(
  ({ url }) => url.origin.includes('dicoding.dev') && url.pathname.includes('/stories'),
  new NetworkFirst({
    cacheName: 'story-api',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  })
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'images',
  })
);

self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    data = {
      title: 'CityCare',
      body: event.data?.text() || 'Ada notifikasi masuk!',
    };
  }

  const title = data.title || 'CityCare';
  const options = {
    body: data.body || 'Notifikasi baru dari CityCare!',
    icon: 'icons/icon-192.png',
    badge: 'icons/icon-192.png',
    vibrate: [100, 50, 100],
    tag: 'citycare-push',
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
