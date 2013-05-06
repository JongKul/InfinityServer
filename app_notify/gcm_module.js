/**
 *
 * User: JK
 * Date: 12. 10. 23
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter;
var gcm= require("node-gcm");


util.inherits(GcmModule, EventEmitter);

function GcmModule(){
    this.connection = undefined;
    EventEmitter.call(this);
}


GcmModule.prototype.create = function(key) {
    this.connection = new gcm.Sender( key );
}

GcmModule.prototype.sendNotifyMessage = function( deviceId,msg,  obj ) {
    var message = new gcm.Message();
    var registerId = [];
    var self = this;
    message.collapseKey = "hairShop";
    message.delayWhileIdle = true;
    message.addData("alert",msg);
    registerId.push(deviceId);
    self.emit("send",message,obj);
    this.connection.send(message,registerId, 3,function(result){
        if(result === undefined) {
            self.emit("error","gcm error",message, obj);
        }
        else if(result.errorCode) {
            self.emit("error",result,message ,obj);
        }
    });

}

module.exports = GcmModule;