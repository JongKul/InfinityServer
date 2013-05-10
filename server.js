<<<<<<< HEAD
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


=======
#!/bin/env node




var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var mysqlURL = process.env.OPENSHIFT_MYSQL_DB_URL || "mysql://adminx8aqD9X:UvG3tHLhH8sH@127.7.168.129:3306/infinity";





var express = require('express');
var fs = require('fs');
var mysqlModule = require('./module/mysql_module');
var app = module.exports = express();




void startMysql(){
	var db = new mysqlModule();
	db.connect()
}
   

void startServer(){
	console.log("Server running at http://" + ipaddr + ":" + port + "/");
	app.listen(port, ipaddr);
}


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
	{room_index : 1, id : "568652209" ,nick :"����ȣ����" ,turn : 1 }		
	]};
	
	
	
	var sendObj = { user_index : 1 };
	res.send(result);
})


// ������ ������ ����  ������  ���� �����.
app.post('/room_info', function(req, res,next) {
	var id = req.body.id;		
	var otherid = req.body.other_id;
	var room_index = req.body.room_index;
	
	//data : 1�� ��� , 0�� ��� , -1 ���°�
	//turn : 1�� ���� 0�� ������ 
	var result = {
		room_index : 1
		,white  : id
		,black : "568652209"  
		,turn : id  
		,finish_flag : false
		,winner : id //optional
		,data : [
		-1,-1,-1,-1,-1,-1,-1,-1
		,-1,-1,-1,-1,-1,-1,-1,-1
		,-1,-1,-1,-1,-1,-1,-1,-1
		,-1,-1,-1, 0, 1,-1,-1,-1
		,-1,-1,-1, 1, 0,-1,-1,-1
		,-1,-1,-1,-1,-1,-1,-1,-1
		,-1,-1,-1,-1,-1,-1,-1,-1
		,-1,-1,-1,-1,-1,-1,-1,-1
		]	
	}
	console.log('response ');
	res.send(result);
})

// �� ���� (����) ->  ������ game_info�� ����
app.post('/turn', function(req, res,next) {

	var id = req.body.id;	
	var otherid = req.body.other_id;
	var room_index = req.body.room_index;
	var x = req.body.x;
	var y = req.body.y;	
	
	//data : 1�� ��� , 0�� ��� , -1 ���°�
	//turn : 1�� ���� 0�� ������ 
	var result = {
		room_index : 1
		,white  : id
		,black : "568652209"  
		,turn : id  
		,finish_flag : false
		,winner : id //optional
		,data : [
		-1,-1,-1,-1,-1,-1,-1,-1
		,-1,-1,-1,-1,-1,-1,-1,-1
		,-1,-1,-1,-1,-1,-1,-1,-1
		,-1,-1,-1, 0, 1,-1,-1,-1
		,-1,-1,-1, 1, 0, 1,-1,-1
		,-1,-1,-1,-1,-1,-1,-1,-1
		,-1,-1,-1,-1,-1,-1,-1,-1
		,-1,-1,-1,-1,-1,-1,-1,-1
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

>>>>>>> bc3601f97ef60ac47e2c3345bbc8f9441bea2080
