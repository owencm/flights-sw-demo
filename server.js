var static = require('node-static');
var request = require('request');
var http = require('http');

var file = new static.Server('./');

console.log('Server started. Listening on port 8080');

http.createServer(function (req, response) {
	var body = '';
	req.on('data', function (chunk) {
		body += chunk;
	});
    req.addListener('end', function (e) {
    	if (req.url == '/subscription') {
    		console.log('Received a subscription');
    		response.end();
    		var subscription = JSON.parse(body);
    		console.log('Set subscriptionId to '+subscription.subscriptionId);
    		setTimeout(function() {
    			payload = {registration_ids: [subscription.subscriptionId]};
    			request({method: 'POST', url: subscription.endpoint, body: payload, json: true, headers: {'Authorization':'key=AIzaSyC8wnIpQAJbKIKWSEdo-wJMImP7TDPzyko'}}, function () {
    			});
    		}, 5000);
    	} else {
    		file.serve(req, response);
    	}
    }).resume();
}).listen(8080);