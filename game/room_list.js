var constMysql = require('../const/mysql_query');
var express = require('express');
var app = module.exports = express();



//���� �����  parameter�� ������ �����ϸ�. �´°� ������.
app.post('/room_list', function(req, res,next) {
	var id = req.body.id;
	
	//turn : 1�� ���� 0�� ������ 
	var result = {array :[	
	{room_index : 1, id : "568652209" ,nick :"����ȣ����" ,turn : 1 }		
	]};
	
	
	
	var sendObj = { user_index : 1 };
	res.send(result);
})
