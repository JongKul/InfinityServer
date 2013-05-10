var constMysql = require('../const/mysql_query');
var express = require('express');
var app = module.exports = express();



// 턴 진행 (게임) ->  응답은 game_info와 동일
app.post('/turn', function(req, res,next) {

	var id = req.body.id;	
	var otherid = req.body.other_id;
	var room_index = req.body.room_index;
	var x = req.body.x;
	var y = req.body.y;	
	
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
		,-1,-1,-1, 1, 0, 1,-1,-1
		,-1,-1,-1,-1,-1,-1,-1,-1
		,-1,-1,-1,-1,-1,-1,-1,-1
		,-1,-1,-1,-1,-1,-1,-1,-1
		]	
	}
	
	
	console.log('response ');
	res.send(result);
})