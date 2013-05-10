/**
 *
 * User: JK
 * Date: 12. 10. 12
 */ 

var http = require("http");
var connect = require("connect");
var apnsModule = require("./apns_module");
var gcmModule = require("./gcm_module");
var global = require("./../system/global");
var log= require("./../system/log");

var mySqlModule = require("./../util/mysql_module");
var appNotifyInfo = require("./app_notify_info.js").info;
var appProcess = require("./app_notify_process.js");
var appIntervalProcess = require("./app_interval_process.js");

var intervalInstance = undefined;
function initApp() {
    log.info("start notify app")
    if(!appNotifyInfo.loadData())
    {
        log.error("fail to load configure File");
        process.exit();
    }
    log.configure(appNotifyInfo.getLogConfigure());

    startApnsConnection();
    startGcmConnection();

    if(intervalInstance != undefined ){
        clearInterval(intervalInstance);
    }
    intervalInstance = setInterval(function(){
        appIntervalProcess.process();
    },appNotifyInfo.getProcessInterval());
}


function startApnsConnection() {
    var option = appNotifyInfo.getApnsConfigure();
    log.info("start Apns  : " + JSON.stringify(option) );
    appNotifyInfo.apns = new apnsModule();
    appNotifyInfo.apns.create(option);

    appNotifyInfo.apns.on("send",apnsSendCallback);
    appNotifyInfo.apns.on("error",apnsErrorCallback);

}
function apnsSendCallback(notification,obj) {
    log.info("send apns : " + JSON.stringify(obj)  + "-"  +     JSON.stringify(notification));
}
function apnsErrorCallback(error,notification , obj)  {
    log.error("err apns : " + JSON.stringify(obj) + "-" +JSON.stringify(error)  + "-"  +     JSON.stringify(notification));
}

function startGcmConnection() {
    var key= appNotifyInfo.getGcmKey();
    log.info("start GCM" );
    appNotifyInfo.gcm = new gcmModule();
    appNotifyInfo.gcm.create(key);
    appNotifyInfo.gcm.on("send",gcmSendCallback);
    appNotifyInfo.gcm.on("error",gcmErrorCallback);
}

function gcmSendCallback(message, obj  ) {
    log.info("send gcm : " + JSON.stringify(obj)  + "-"  + JSON.stringify(message));
}

function gcmErrorCallback(error, message ,obj ) {
    log.error("err gcm : " + JSON.stringify(obj)  + "-" + JSON.stringify(error)  + "-"  +     JSON.stringify(message));
}


function startServer() {
    log.info("start vanilla notification server");
    log.info("LISTENING PORT : " + appNotifyInfo.getServerPort());
    var app = connect();
    app.use(connect.bodyParser());
    app.use(requestCallback);
    app.use(errorHandler);

    http.Server(app).listen(appNotifyInfo.getServerPort());


}
function errorHandler(err, request, response,next){
    log.error("connect module : "+"\""+request.url+"\" "+err.stack);
    response.writeHead(500, "");
    response.end(err.stack,"utf8");
}
function requestCallback (request, response,next) {
    log.info("request  : " + JSON.stringify(request.body) );
    if(request.method == "POST") {
        try {
            appProcess.process(request, response);
        }
        catch(error) {
            var err = {};
            err.stack = error.stack;
            response.writeHead(500, "");
            response.end(err.stack,"utf8");
        }
    }
    else {
        response.writeHead(405, "");
        response.end("","utf8");
    }
}

function startAccountMySql() {
    var accountDB = new mySqlModule();
    log.info("start to connect mysql database...");

    accountDB.connect(
        appNotifyInfo.getDBHost()
        ,appNotifyInfo.getDBPort()
        ,appNotifyInfo.getDBId()
        ,appNotifyInfo.getDBPassword()
        ,appNotifyInfo.getDatabase()
    );
    accountDB.on("error",accountQueryErrorCallback);
    accountDB.on("success",accountQuerySuccessCallback);
    appNotifyInfo.accountDB = accountDB;
}
function accountQuerySuccessCallback(result,sql,params,obj) {
    log.info("query Success :" + sql);
}
function accountQueryErrorCallback(error,sql,params,obj) {
    log.error("query error :" + sql + " " +error );
}


initApp() ;
startAccountMySql();
startServer();
