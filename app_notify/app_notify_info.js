/**
 *
 * User: JK
 * Date: 12. 10. 15
 */
var fs = require("fs");


function AppNotifyInfo() {
    this.accountDB = undefined;
    this.configPath = undefined;

    //ios
    this.apns = undefined;
    this.gcm= undefined;

}

AppNotifyInfo.prototype.ACCOUNT_DB = "account_mysql";


AppNotifyInfo.prototype.loadData = function() {
    var arguments = process.argv.splice(0);

    if ( arguments.length < 3 ) {
        return false;
    }

    this.configPath = arguments[2];

    //  "/var/log/vanilla/"
    var text =  fs.readFileSync(this.configPath,'utf8');
    try {
        this.config = JSON.parse(text);
    }catch(ex) {
        return false;
    }
    return true;
};

AppNotifyInfo.prototype.getGcmKey = function(){
    return this.config["gcm_key"];
};

AppNotifyInfo.prototype.getApnsConfigure = function() {
    return this.config["apns_configure"];
};

AppNotifyInfo.prototype.getServerPort = function() {
    return this.config["server_port"];
};

AppNotifyInfo.prototype.getLogConfigure = function(){
    return this.config["log_configure"];
};

AppNotifyInfo.prototype.getMessage = function(locale)  {
    return this.config["message"]["ko"];
};


AppNotifyInfo.prototype.getDBHost = function() {
    return this.config[this.ACCOUNT_DB].host;
};
AppNotifyInfo.prototype.getDBPort = function() {
    return this.config[this.ACCOUNT_DB].port;
};
AppNotifyInfo.prototype.getDatabase = function() {
    return this.config[this.ACCOUNT_DB].database;
};
AppNotifyInfo.prototype.getDBId = function() {
    return this.config[this.ACCOUNT_DB].id;
};
AppNotifyInfo.prototype.getDBPassword = function() {
    return this.config[this.ACCOUNT_DB].password;
};
AppNotifyInfo.prototype.getProcessInterval= function(){
    return this.config["process_interval"];
};






var appInfo = new AppNotifyInfo();
module.exports.info = appInfo;