


var constMysql = require('../const/mysql_query');
var app = require('../server');

module.exports.process = function(req, res,next) {

	
	var id = req.body.id;
	var nick = req.body.nick;
	
	app.db.query(constMysql.QUERY_LOGIN , [id, nick ], undefined , function(error, result, object) {	
	
		if(error != undefined) {
			console.log("error")
			return;	
		}
	
		if(result.length  <= 0 ) {
			console.log("reuslt length")
			return;
		} 
		res.send(result[0]);
	});
};
