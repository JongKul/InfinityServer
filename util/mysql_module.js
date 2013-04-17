/**
 * an instance to manage MySql Driver
 * User: JK
 * Date: 12. 7. 16
 */

var mysql = require("mysql");
var util = require('util');
var EventEmitter = require('events').EventEmitter;


util.inherits(MySqlModule, EventEmitter);

function MySqlModule() {
    this.dbClient = null;
    EventEmitter.call(this);
}

MySqlModule.prototype.connect = function(host, port, id, password, database) {
    this.dbClient = mysql.createConnection({
        user: id
        ,password : password
        ,host :host
        ,port :port
        ,database: database
    });
   // this.dbClient.connect();
    this.handleDisconnect(this.dbClient);
};

MySqlModule.prototype.disconnect = function(cb){
    this.dbClient.end(function() {
       cb();
    });
};

MySqlModule.prototype.query = function(sql, params, obj,cb)
{
   var self = this;
    this.dbClient.query(sql,params,function(error, result) {
        if(error) {
            self.emit("error",error,sql, params ,obj);
            if(cb) {
                cb(error,undefined,obj);
            }
        }
        else {
            self.emit("success",result,sql, params ,obj);
            if(cb) {
                cb(undefined ,result[0],obj);
            }
        }
    });
};

MySqlModule.prototype.convertDateToTimeStamp= function( dateObj) {
    return dateObj.getFullYear() + "-"
        + (dateObj.getMonth() + 1) + "-"
        + dateObj.getDate() + " "
        + dateObj.getHours() + ":"
        + dateObj.getMinutes() + ":"
        + dateObj.getSeconds() ;
}

MySqlModule.prototype.convertDateFromTimeStamp = function(dateStr) {
    return new Date(dateStr.replace(/-/g,'/'));
}
MySqlModule.prototype.handleDisconnect= function(connection) {
    var self = this;
    connection.on('error', function(err) {
        if (!err.fatal) {
            return;
        }

        if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
            console.log('connection error : ' + err.stack);
            throw err;
        }
       // console.log('Re-connecting lost connection: ' + err.stack);

        self.dbClient = mysql.createConnection(connection.config);
        self.handleDisconnect(self.dbClient);
       // connection.connect();
    });
}


module.exports= MySqlModule;