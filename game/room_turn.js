var constMysql = require('../const/mysql_query');
var roomDataInfo = require('./data/room_data_Info');
var app = require('../server');



// 턴 진행 (게임) ->  응답은 game_info와 동일
module.exports.process =function(req, res,next) {

	var id = req.body.user_id;	
	var otherid = req.body.other_user_id;
	var room_index = req.body.room_index;
	var x = req.body.x;
	var y = req.body.y;	

	app.db.query(constMysql.QUERY_ROOM_INFO_SELECT , [id ,otherid, room_index], undefined , function(error, result, object) {	
	
		if(error != undefined) {
			console.log("error")
			return;	
		}
		
		if(result.length <=  0 ) {
			next(new Error('No data'));
			return;
		}
		
		
		if(result[0].turn != id) {
			next(new Error('Not your turn'));
			return;
		}
		
		var color = result[0].white == id ? 1 :0;
		console.log(color);
		var dataInfo = new roomDataInfo();
		dataInfo.parse(result[0].room_data);			
		var err = dataInfo.turn (x,y,color) ;
		dataInfo.print();		
		if(err!= undefined) {			
			next(err);
			return;
		} 
		
		if(dataInfo.isFull()) 	{
			var winner ;
			if(dataInfo.getWinner() == 1) {
				winner = result[0].white;
			}
			else {
				winner = result[0].black;
			}
			app.db.query(constMysql.QUERY_ROOM_INFO_UPDATE_WINNER , [room_index,winner], undefined , function(error, result2, object) {
				if(error != undefined) {
					console.log("error")
					return;	
				}							
				updateRoomInfo();
			});
			
		}
		else {
			updateRoomInfo();			
		}		
		
		function updateRoomInfo() {
			var ret = dataInfo.toString();		
			app.db.query(constMysql.QUERY_ROOM_INFO_UPDATE , [room_index,id ,otherid,ret ], undefined , function(error, result2, object) {
				if(error != undefined) {
					console.log("error")
					return;	
				}
				
				if(result2.length <=  0 ) {
					next(new Error('No data'));
					return;
				}
				res.send(result2[0]);
			});
		};		
	});	
	
}