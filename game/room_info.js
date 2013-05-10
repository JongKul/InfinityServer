var constMysql = require('../const/mysql_query');
var express = require('express');
var app = module.exports = express();



// 방정보 가지고 오기  없으면  방을 만든다.
app.post('/room_info', function(req, res,next) {
	var id = req.body.id;		
	var otherid = req.body.other_id;
	var room_index = req.body.room_index;
	
	//data : 1은 백색 , 0는 흑색 , -1 없는거
	//turn : 1은 내턴 0은 상대방턴 
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