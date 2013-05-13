


var constMysql = require('../const/mysql_query');
var app = require('../server');

module.exports.process = function(req, res,next) {

	
	var id = req.body.user_id;
	var nick = req.body.user_name;
	
	app.db.query(constMysql.QUERY_LOGIN , [id, nick ], undefined , function(error, result, object) {	
	
		if(error != undefined) {
			console.log("error")
			return;	
		}
	
		if(result.length  <= 0 ) {
			next(new Error('No User'));			
			return;
		} 
		res.send(result[0]);
	});
};
