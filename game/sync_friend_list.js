

var constMysql = require('../const/mysql_query');
var express = require('express');
var app = module.exports = express();
/*
 input : {array : [1234,1234,123124,234234]}
{ id : id
   ,array : [{id : 123 , win : 1 , lose : 1, flag : true },
 {id : 123 , win : 1 , lose : 1, flag : true} ,
  {id : 123 , win : 1 , lose : 1, flag : true}] }*/
//  클라이언트 친구리스트 전송하면  클라이언트에. login_flag , 승,패
app.post('/sync_friend_list', function(req, res,next) {
	console.log('정기호 개');
	var id =  req.body.id;
	req.body.array.forEach(function(info){
		console.log(info.id);
		info.win = 1
		info.lose = 1
		info.login_flag = true;
		
	});
	
	//console.log('response ');
	
	
	res.send(req.body);
})
