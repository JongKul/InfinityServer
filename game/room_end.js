
var constMysql = require('../const/mysql_query');
var express = require('express');
var app = module.exports = express();



// ���� ����Ȯ�� ����
app.post('/room_end', function(req, res,next) {

	var id = req.body.id;
	var nick = req.body.nick;
	console.log('response ');
	res.send(sendObj);
})
