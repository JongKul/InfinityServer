

var constMysql = require('../const/mysql_query');
var roomDataInfo = require('./data/room_data_Info');
var app = require('../server');

/*
 input : {array : [1234,1234,123124,234234]}
{ id : id
   ,array : [{id : 123 , win : 1 , lose : 1, flag : true },
 {id : 123 , win : 1 , lose : 1, flag : true} ,
  {id : 123 , win : 1 , lose : 1, flag : true}] }*/
//  Ŭ���̾�Ʈ ģ������Ʈ �����ϸ�  Ŭ���̾�Ʈ��. login_flag , ��,��
module.exports.process = function(req, res,next) {
	console.log('����ȣ ��');
	var ids =  req.body.array;
	var string = "";
	for(var i = 0 ; i < ids.length ; i++){
		if(i != 0) string = string.concat(",");
		string = string.concat(ids[i]);
	} 
	app.db.query(constMysql.QUERY_SYNC_FRIEND_LIST , [string ], undefined , function(error, result, object) {	
	
		if(error != undefined) {
			console.log("error")
			return;	
		}
		var  resultJson = {
			array: result
			
		};
		
		res.send(resultJson);
	});
	
}
