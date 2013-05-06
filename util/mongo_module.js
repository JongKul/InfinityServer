/**
 * an instance to manage mongoose Driver
 * User: JK
 * Date: 12. 7. 16
 */


var url = require('url');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var mongodb = require("mongodb");


var rgxProtocol = /^(?:.)+:\/\//;

util.inherits(MongoModule, EventEmitter);

function MongoModule() {
    this.db = null;
    this.serverConfig = null;
    this.database = null;
    this.user = null;
    this.pass = null;

    EventEmitter.call(this);
}



MongoModule.prototype.connect = function(connectionString) {
    var  self = this;
    if (!rgxProtocol.test(connectionString)) {
        connectionString = 'mongodb://' + connectionString;
    }
    var uri = url.parse(connectionString);
    var host = uri.hostname;
    var port = uri.port || 27017;
    this.database = uri.pathname && uri.pathname.replace(/\//g, '');

    // handle authentication
    if (uri && uri.auth) {
        var auth = uri.auth.split(':');
        self.user = auth[0];
        self.pass = auth[1];

    // Check hostname for user/pass
    } else if (/@/.test(host) && /:/.test(host.split('@')[0])) {
        host = host.split('@');
        var auth = host.shift().split(':');
        host = host.pop();
        self.user = auth[0];
        self.pass = auth[1];
    }

    self.serverConfig = new mongodb.Server(host,parseInt(port),{auto_reconnect : true  } ) ;
    self.db  = new mongodb.Db(self.database, self.serverConfig , { native_parser : false , safe : false } );

    _open(self);
};

function _open(self) {
    self.db.open(function(err,data){
        if(err) {
            self.emit("connect",err);
        }
        else {
            data.authenticate(self.user, self.pass,
                function(err2,data2) {
                    self.emit("connect");
                }
            )
        }
    });
}


MongoModule.prototype.disconnect = function(cb) {
    var  self = this;
   this.db.close(false ,function(){
       self.emit("disconnect");
       cb();
   });
};

MongoModule.prototype.commonExecute = function(err,result,query,params,obj,cb) {

    var self = this;
    if(err){
        self.emit("error",err,query,params,obj,cb);
        if(cb) {
            cb(err,undefined,obj);
        }
    }
    else {
        self.emit("success",result,query, params ,obj);
        if(cb) {
           cb(undefined,result,obj);
        }
    }
};

MongoModule.prototype.isConnected = function(){
    return this.db.serverConfig.isConnected()
}

module.exports = MongoModule;
