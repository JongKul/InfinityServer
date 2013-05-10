#!/bin/env node




var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 19999;
var mysqlURL = process.env.OPENSHIFT_MYSQL_DB_URL || "mysql://adminx8aqD9X:UvG3tHLhH8sH@127.7.168.129:3306/infinity";


var express = require('express');
var fs = require('fs');
var mysqlModule = require('./util/mysql_module');

var app = module.exports = express();

var login = require('./game/login');
var room_end = require('./game/room_end');
var room_info = require('./game/room_info');
var room_list = require('./game/room_list');
var room_turn = require('./game/room_turn');
var sync_friend_list = require('./game/sync_friend_list');



function mysqlSuccessCallback(){
 	console.log("mysql success");
}
function mysqlErrorCallback(){
 	console.log("mysql error");
}


function startMysql(){
	var db = new mysqlModule();
	db.on('success',mysqlSuccessCallback);
	db.on('error',mysqlErrorCallback);
	db.connect(mysqlURL);
	app.db  = db;
}

function startServer(){
	console.log("Server running at http://" + ipaddr + ":" + port + "/");
	app.listen(port, ipaddr);
}


app.use(express.logger());
app.use(express.bodyParser());
app.get('/', function(req, res,next) {
	res.send("Hello World!");		
})



startMysql();
startServer();


