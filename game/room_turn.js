var constMysql = require('../const/mysql_query');
var express = require('express');
var app = module.exports = express();



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