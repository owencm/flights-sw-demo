self.addEventListener('push', function(event) {
	self.registration.showNotification('Ticketmeister update', {body: 'Metric are playing in San Francisco on May 28th. Tickets now on sale.', icon: 'metric.png', tag: 'static'});
});

self.addEventListener('notificationclick', function(event) {
	clients.openWindow('/book.html');
});