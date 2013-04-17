/**
 * Created with JetBrains WebStorm.
 * User: JK
 * Date: 13. 1. 9
 * Time: 오후 6:31
 * To change this template use File | Settings | File Templates.
 */

var crypto = require("crypto");

function AesCryptModule()
{
    this.key = "vanilla!vanilla!";
}



AesCryptModule.prototype.encrypt = function(utf8String) {
    var key = new Buffer(this.key,"utf8").toString("binary");
    var cipher =  crypto.createCipheriv('aes-128-cbc',key,key);

    var output = cipher.update(utf8String,'utf8','base64');
    output +=cipher.final('base64');
    return output;
}


AesCryptModule.prototype.decrypt = function(base) {
    var keyd = new Buffer(this.key,"utf8").toString('binary');
    var cipher =  crypto.createDecipheriv('aes-128-cbc',keyd,keyd);
    var output = cipher.update(base,'base64','utf8');
    output +=cipher.final('utf8');
    return output;

}


module.exports.AesCryptModule = new AesCryptModule;
