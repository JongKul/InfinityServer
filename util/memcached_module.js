/**
 * Created with JetBrains WebStorm.
 * User: JK
 * Date: 12. 12. 7
 * Time: 오전 11:31
 * To change this template use File | Settings | File Templates.
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter;
var Memcached = require('memcached');

util.inherits(MemcachedModule, EventEmitter);

function MemcachedModule() {
    this.client = null;
    this.options= null;
    this.host= null;
    EventEmitter.call(this);
}

MemcachedModule.prototype.connect = function(hosts ,options)
{
    options = options || {};
    this.client = new Memcached(hosts, options);
}

MemcachedModule.prototype.get = function(obj ,key,callback )
{
    var self = this;
    this.client.get(key, function(error, data){
        try {
            if(error !=undefined ) {
                self.emit("error",error,"get" ,key,obj,callback);
                callback(error , undefined, key);
                return;
            }
            var data =  JSON.parse(data.toString());

            self.emit("success",data,"get",key,obj,callback);
            if(callback) {
                callback(undefined,data,obj);
            }

        } catch (error) {
            self.emit("error",error,"get",key,obj,callback);
            callback(error , undefined, key);
            return;
        }

    });
}
MemcachedModule.prototype.set = function(obj, key , value, callback)
{
    this.client.set(key,this.options.lifeTime,function(error, result)
    {
        if(error != undefined) {
            self.emit("error",error,"set" ,key,obj,callback);
            callback(error , undefined, key);
            return;
        }
        if(callback) {
            self.emit("success",result,"set" ,key,obj,callback);
            callback(undefined,result,obj);
        }

    });
}

module.exports = MemcachedModule;






