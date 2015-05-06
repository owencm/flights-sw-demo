self.addEventListener('push', function(event) {
	self.registration.showNotification('ticketmeister update', {body: 'Metric is coming to San Francisco on May 28th. Tickets now on sale.', icon: 'metric.jpg', tag: 'static'});
});

self.addEventListener('notificationclick', function(event) {
	clients.openWindow('/book.html');
});