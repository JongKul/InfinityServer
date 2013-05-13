var constMysql = require('../const/mysql_query');
var app = require('../server');

module.exports.process = function(req, res,next) {


	var id = req.body.user_id;		
	var otherid = req.body.other_user_id;
	var room_index = req.body.room_index;
	
	app.db.query(constMysql.QUERY_ROOM_INFO_SELECT , [id ,otherid, room_index], undefined , function(error, result, object) {	
	
		if(error != undefined) {
			console.log("error")
			return;	
		}
		res.send(result);
	});
	
	
	
	/*
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
	*/
};