self.addEventListener('push', function(event) {
	self.registration.showNotification('Hello', {body: 'World'});
});