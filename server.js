#!/bin/env node
//  OpenShift sample Node application

var express = require('express');
var app = module.exports = express();

//Get the environment variables we need.
var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 8080;

/*
http.createServer(function (req, res) {
	var addr = "unknown";
	var out = "";
	if (req.headers.hasOwnProperty('x-forwarded-for')) {
		addr = req.headers['x-forwarded-for'];
	} else if (req.headers.hasOwnProperty('remote-addr')){
		addr = req.headers['remote-addr'];
	}

	if (req.headers.hasOwnProperty('accept')) {
		if (req.headers['accept'].toLowerCase() == "application/json") {
			  res.writeHead(200, {'Content-Type': 'application/json'});
			  res.end(JSON.stringify({'ip': addr}, null, 4) + "\n");			
			  return ;
		}
	}
	
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write("Welcome to Node.js on OpenShift!\n\n");
  res.end("Your IP address seems to be " + addr + "\n");
}).listen(port, ipaddr);
*/


app.listen(port);
app.use(express.logger());
app.use(express.bodyParser());
app.get('/', function(req, res,next) {
	res.send("Hello World!");		
})

app.post('/login', function(req, res,next) {
// handle to login
	var id = req.body.id;
	var nick = req.body.nick;
	
	var sendObj = { user_index : 1 };
	
	res.send(sendObj);		
})
/*
app.get('/friend_list', function(req, res) {
// handle to get friend's list
})

app.get('/game_info', function(req,res){
 //handle to create room and get room info

})

app.get('/turn', function(req, res) {
	
})
*/



console.log("Server running at http://" + ipaddr + ":" + port + "/");
