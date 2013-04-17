#!/bin/env node
//  OpenShift sample Node application

var express = require('express');
var fs = require('fs');
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



app.use(express.logger());
app.use(express.bodyParser());
app.get('/', function(req, res,next) {
	res.send("Hello World!");		
})

app.post('/login', function(req, res,next) {

	var id = req.body.id;
	var nick = req.body.nick;
	console.log('response ');
	
	var sendObj = { user_index : 1 };
	res.send(sendObj);

})

/*
 input : {array : [1234,1234,123124,234234]}


{ id : id
   ,array : [{id : 123 , win : 1 , lose : 1, flag : true },
 {id : 123 , win : 1 , lose : 1, flag : true} ,
  {id : 123 , win : 1 , lose : 1, flag : true}] }*/
//  Ŭ���̾�Ʈ ģ������Ʈ �����ϸ�  Ŭ���̾�Ʈ��. login_flag , ��,��
app.post('/sync_friend_list', function(req, res,next) {
	console.log('����ȣ ��');
	var id =  req.body.id;
	req.body.array.forEach(function(info){
		console.log(info.id);
		info.win = 1
		info.lose = 1
		info.login_flag = true;
		
	});
	
	//console.log('response ');
	
	
	res.send(req.body);
})



//���� �����  parameter�� ������ �����ϸ�. �´°� ������.
app.post('/room_list', function(req, res,next) {
	var id = req.body.id;
	
	//turn : 1�� ���� 0�� ������ 
	var result = {array :[	
	{room_index : 1, id : 568652209 ,nick :"����ȣ����" ,turn : 1 }		
	]};
	
	
	
	var sendObj = { user_index : 1 };
	res.send(result);
})


// ������ ������ ����  ������  ���� �����.
app.post('/room_info', function(req, res,next) {
	var id = req.body.id;	
	
	var room_index = req.body.room_index;
	//or	
	var otherid = req.body.other_id;
	
	//data : 1�� ��� , 0�� ��� , -1 ���°�
	//turn : 1�� ���� 0�� ������ 
	var result = {
		room_index : 1
		,white  : id
		,black : otherid  
		,turn : 1  
		,finish_flag : false
		,winner : id //optional
		,data : [
		[-1,-1,-1,-1,-1,-1,-1,-1]
		,[-1,-1,-1,-1,-1,-1,-1,-1]
		,[-1,-1,-1,-1,-1,-1,-1,-1]
		,[-1,-1,-1, 0, 1,-1,-1,-1]
		,[-1,-1,-1, 1, 0,-1,-1,-1]
		,[-1,-1,-1,-1,-1,-1,-1,-1]
		,[-1,-1,-1,-1,-1,-1,-1,-1]
		,[-1,-1,-1,-1,-1,-1,-1,-1]
		]	
	}
	console.log('response ');
	res.send(result);
})

// �� ���� (����) ->  ������ game_info�� ����
app.post('/turn', function(req, res,next) {

	var id = req.body.id;	
	var room_index = req.body.room_index;
	var x = req.body.x;
	var y = req.body.y;	
	
	//data : 1�� ��� , 0�� ��� , -1 ���°�
	//turn : 1�� ���� 0�� ������ 
	var result = {
		room_index : 1
		,white  : id
		,black : otherid  
		,turn : 1  
		,finish_flag : false
		,winner : id //optional
		,data : [
		[-1,-1,-1,-1,-1,-1,-1,-1]
		,[-1,-1,-1,-1,-1,-1,-1,-1]
		,[-1,-1,-1,-1,-1,-1,-1,-1]
		,[-1,-1,-1, 0, 1,-1,-1,-1]
		,[-1,-1,-1, 1, 0, 1,-1,-1]
		,[-1,-1,-1,-1,-1,-1,-1,-1]
		,[-1,-1,-1,-1,-1,-1,-1,-1]
		,[-1,-1,-1,-1,-1,-1,-1,-1]
		]	
	}
	
	
	console.log('response ');
	res.send(result);
})

// ���� ����Ȯ�� ����
app.post('/room_end', function(req, res,next) {

	var id = req.body.id;
	var nick = req.body.nick;
	console.log('response ');
	res.send(sendObj);
})



console.log("Server running at http://" + ipaddr + ":" + port + "/");
console.log("Server running at http://" + ipaddr + ":" + port + "/");

app.listen(port, ipaddr);
