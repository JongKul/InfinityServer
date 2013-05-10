/**
 *
 * User: JK
 * Date: 12. 10. 17
 */

var appNotifyInfo = require("./app_notify_info").info;
var accountQuery = require("../db/query/query_account");

var log = require("../system/log");

module.exports.process = function(){

    var now = new Date;
    appNotifyInfo.accountDB.query ( accountQuery.QUERY_NOTI_SELECT_HAIR
        ,[appNotifyInfo.accountDB.convertDateToTimeStamp(now)]
        ,now
        ,selectNotificationInfoCallback
    );

}



function selectNotificationInfoCallback(error, result,now){
    if(error != undefined) {
        return;
    }
    if(result == null || result.length == undefined ||result.length ==0) {
        return;
    }
    log.info(result.length);
    for(var i = 0 ; i < result.length ; i++ ) {
        var os_type = result[i]["os_type"];
        var device_id = result[i]["device_id"];
        var locale = result[i]["locale"];
        var userIndex = result[i]["user_index"];
        var type = result[i]["notification_type"];

        var message = "";

        if(type == 0)
        {
            message = appNotifyInfo.getMessage(locale)["hair_schedule"]
        }
        else if(type == 1){
            message = appNotifyInfo.getMessage(locale)["hair_decayed"]
        }
        else if(type == 2){
            message = appNotifyInfo.getMessage(locale)["sofa_dirty"]
        }
        else if(type == 3){
            message = appNotifyInfo.getMessage(locale)["shelf_sold_out"]
        }
        else if(type == 4){
            message = appNotifyInfo.getMessage(locale)["pet"]
        }
        else if(type == 5){
            message = appNotifyInfo.getMessage(locale)["counter"]
        }
        else if(type == 6){
            message = appNotifyInfo.getMessage(locale)["trolley"]
        }



        if(os_type == 1) {
            appNotifyInfo.apns.sendNotifyMessage(device_id,message,1,result[i]);
        }
        else if(os_type == 2) {
            appNotifyInfo.gcm.sendNotifyMessage(device_id,message,result[i]);
        }
        else if(os_type ==3) {

        }
    }

    appNotifyInfo.accountDB.query ( accountQuery.QUERY_NOTI_DELETE_HAIR_BY_TIME
        ,[appNotifyInfo.accountDB.convertDateToTimeStamp(now)]
        ,undefined
        ,deleteHairByTimeCallback
    );
}

function deleteHairByTimeCallback(error,result, obj)
{

}





