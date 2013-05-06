/**
 *
 * User: JK
 * Date: 12. 10. 17
 */


var appNotifyInfo = require("./app_notify_info").info;



module.exports.process = function(request, response) {
    switch (request.url) {
        case '/notice':

            appNotifyInfo.accountDB.query ( "call vanilla_noti_select_device_table "
                ,[]
                ,undefined
                ,function(error, result ){
                    for(var i = 0 ; i < result.length ; i++ ) {
                        var os_type = result[i]["os_type"];
                        var device_id = result[i]["device_id"];
                        var locale = result[i]["locale"];
                        var message = appNotifyInfo.getMessage(locale)["notice"];

                        if(os_type == 1) {
                            appNotifyInfo.apns.sendNotifyMessage(device_id,message,1,undefined);
                        }
                        else if(os_type == 2) {
                            appNotifyInfo.gcm.sendNotifyMessage(device_id,message,undefined);
                        }
                    }
                }
            );



            response.writeHead(200, "");
            response.end("","utf8");
            break;
        default :
            response.writeHead(404, "");
            response.end("","utf8");
            break;

    }
}
