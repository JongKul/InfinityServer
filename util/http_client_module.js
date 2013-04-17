/**
 *
 * User: JK
 * Date: 12. 10. 15
 */

var url = require('url');
var http = require("http");
var https = require("https");
var util = require('util');
var EventEmitter = require('events').EventEmitter;



util.inherits(HttpClientModule, EventEmitter);

function HttpClientModule() {
    EventEmitter.call(this);
}

HttpClientModule.prototype.request = function(urlString,obj, data, headers,cb  ) {

    if(typeof headers  == 'function') {
        cb = headers;
        headers =  {
            'Content-Type':'application/json'
        };
    }
    else if(typeof data == 'function') {
        cb = data;
        data = undefined;
        headers = undefined;
    }

    var rgxProtocol = /^(?:.)+:\/\//;
    if (!rgxProtocol.test(urlString)){
        urlString = 'http://' + urlString;
    }

    var requestMethod = http.request;
    var basePort = 80;
    if(urlString.search("https://") >= 0) {
        requestMethod = https.request;
        basePort = 443;
    }



    var self = this;
    var uri = url.parse(urlString);
    var host = uri.hostname;
    var port = uri.port || basePort;
    var path = uri.path;
    var method = 'POST';
    var sendObj = undefined;


    if(data == undefined) {
        method = 'GET'
        sendObj = undefined
    }
    else if( typeof data ==='object'){
        sendObj = JSON.stringify(data)
        headers['Content-Length'] = Buffer.byteLength(sendObj, 'utf-8');
    }
    else {
        sendObj = data
        headers['Content-Length'] = Buffer.byteLength(sendObj, 'utf-8');
    }



    var option = {
            host : host
            ,port : port
            ,path : path
            , method : method
            , headers : headers
        }


    var req = requestMethod(option,function(res){
        var buf = '';
        res.setEncoding('utf8');

        res.on('data', function(chunk){
            buf += chunk });
        res.on('end', function(){

            try {
                res.body = JSON.parse(buf);
             } catch (err){
                res.body = buf;
            }
            self.emit("success",res,urlString,data,obj);
            if(cb)
            cb(undefined,res,obj);

        });
    });
    req.on('error',function(e) {
        self.emit("error",e,urlString,data,obj);
        if(cb)
        cb(e,undefined,obj);
    });

    if(sendObj != undefined) {
        req.write(sendObj);
    }
    req.end();
}

module.exports.HttpClientModule = new HttpClientModule;