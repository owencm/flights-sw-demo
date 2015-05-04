navigator.serviceWorker.register('./sw.js').then(function(registration) {
  // Registration was successful
  console.log('ServiceWorker registration successful with scope: ', registration.scope);
});

document.querySelector('#optInCheckbox').addEventListener('click', function () {
  this.innerHTML = 'x';
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
});

document.querySelector('#submit').addEventListener('click', function () {
  var xhr = new XMLHttpRequest();
  xhr.open('post', '/checkin');
  xhr.onreadystatechange = function () {
    if (this.status !== 200) {
      alert('An unexpected error occurred');
    }
  }
  xhr.send();
  document.querySelector('#preCheckin').style.display = 'none';
  document.querySelector('#postCheckin').style.display = 'block';
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