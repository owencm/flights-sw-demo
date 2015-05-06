navigator.serviceWorker.register('./sw.js').then(function(registration) {
  // Registration was successful
  console.log('ServiceWorker registration successful with scope: ', registration.scope);
});

var readyToBook = false;

document.body.addEventListener('click', function () {
  if (!readyToBook) {
    readyToBook = true;
    setTimeout(function() {
      document.querySelector('img').src = 'screen2.png';
    }, 400);
  } else {
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
      var overlay = document.querySelector('#overlay');
      overlay.style.display = 'block';
      overlay.offsetHeight;
      overlay.className += 'visible'
      setTimeout(function() {
        serviceWorkerRegistration.pushManager.subscribe()
          .then(function(subscription) {
            overlay.style.display = 'none';
            console.log('subscribed successfully', subscription)
            // The subscription was successful
            sendSubscriptionToServer(subscription);
          })
          .catch(function(e) {
            alert('An unexpected error occurred');
          });
      }, 350);
    });
  }
});

function sendSubscriptionToServer(subscription) {
  // Tried using fetch but encountered bugs :'(
  var xhr = new XMLHttpRequest();
  xhr.open('post', '/subscription');
  xhr.onreadystatechange = function () {
    if (this.status !== 200) {
      alert('An unexpected error occurred');
    }
  }; 
  xhr.send(JSON.stringify(subscription));
}