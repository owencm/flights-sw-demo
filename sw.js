caches.open('myapp-static-v1').then(function(cache) {
  return [
    '/boarding.html',
    '/main.js',
    '/header.png',
    '/qrcode.jpg'
  ].map(function(path) { cache.add(path); });
});

self.addEventListener('push', function(event) {
	self.registration.showNotification('virgoairways update', {body: 'Your boarding pass is available', icon: 'qrcode.jpg', tag: 'static'});
});

self.addEventListener('notificationclick', function(event) {
	clients.openWindow('/boarding.html');
});

self.addEventListener('fetch', function(event) {
	console.log('page requested ', event.request);
  	event.respondWith(
	    caches.match(event.request).then(function(response) {
	      	return response || fetch(event.request);
	    })
  	);
});