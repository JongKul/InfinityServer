var constMysql = require('../const/mysql_query');
var app = require('../server');

module.exports.process = function(req, res,next) {

	var id = req.body.id;	
	
	app.db.query(constMysql.QUERY_ROOM_LIST_SELECT , [id], undefined , function(error, result, object) {	
	
		if(error != undefined) {
			console.log("error")
			return;	
		}
		res.send(result);
	});
	
			//turn : 1은 내턴 0은 상대방턴 
	/*var result = {array :[	
	{room_index : 1, id : "568652209" ,nick :"정기호개놈" ,turn : 1 }		
	]};
	
	var sendObj = { user_index : 1 };
	res.send(result);*/

})
