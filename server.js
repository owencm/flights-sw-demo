var static = require('node-static');
var request = require('request');
var http = require('http');

var file = new static.Server('./');
var subscription;

http.createServer(function (req, response) {
	var body = '';
	req.on('data', function (chunk) {
		body += chunk;
	});
    req.addListener('end', function (e) {
    	if (req.url == '/subscription') {
    		console.log('Received a subscription');
    		response.end();
    		subscription = JSON.parse(body);
    		console.log('Set subscriptionId to '+subscription.subscriptionId);
    	} else if (req.url == '/checkin') {
    		response.end();
    		console.log('checked in');
    		setTimeout(function() {
    			payload = {registration_ids: [subscription.subscriptionId]};
    			request({method: 'POST', url: subscription.endpoint, body: payload, json: true, headers: {'Authorization':'key=AIzaSyC8wnIpQAJbKIKWSEdo-wJMImP7TDPzyko'}}, function (a, b, c) {
    				console.log(a, b, c);
    			});
    		}, 0);
    	} else {
    		file.serve(req, response);
    	}
    }).resume();
}).listen(8080);