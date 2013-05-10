/**
 *
 * User: JK
 * Date: 12. 10. 23
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter;
var apns = require('apn');


util.inherits(ApnsModule, EventEmitter);

function ApnsModule(){
    this.connection = undefined;
    EventEmitter.call(this);
}


ApnsModule.prototype.create = function(option){
    var self = this;
    option.errorCallback = function apnsErrorCallback (status, notify){
        this.errorCallback(status,notify);

    };
    this.connection = new apns.Connection(option);
}

ApnsModule.prototype.errorCallback = function(status, notify ) {
    var obj  = notify.temp;
    delete notify.temp;
    this.emit("error", status ,notify,obj);
}
ApnsModule.prototype.sendNotifyMessage = function( deviceId,message, badgeCount , obj ){
    var notification = new apns.Notification;
    notification.alert = message;
    notification.badge = parseInt(badgeCount);
    notification.device = new apns.Device(deviceId);
    notification.temp = obj
    this.emit("send", notification,obj);
    this.connection.sendNotification(notification);
}

module.exports = ApnsModule;