


var constMysql = require('../const/mysql_query');
var app = require('../server');

app.post('/login', function(req, res,next) {

	console.log(JSON.stringify(req.body));
	var id = req.body.id;
	var nick = req.body.nick;
	
	server.db.query(constMysql.QUERY_LOGIN , [id, nick ], undefined , function(error, result, object) {
		if(error != undefined) {
		
			return;	
		}
		if(result.length  > 0 ) {
			
			return;
		} 
		res.send(result[0]);
	});
});

;