

module.exports.QUERY_LOGIN = 'call login( ? , ?) ';  //id , name
module.exports.QUERY_ROOM_INFO_SELECT = 'call select_room_info( ? , ?, ? ) '; //id ,otherid,room_index 
module.exports.QUERY_ROOM_LIST_SELECT = 'call select_room_list( ? ) ';   //id
module.exports.QUERY_ROOM_INFO_UPDATE = 'call update_room_info( ? , ? , ? , ?) ';  //room_index, id, ,otherid, room_data
module.exports.QUERY_ROOM_INFO_UPDATE_WINNER = 'call update_room_info_winner( ? , ? ) ';  //room_index,winner

module.exports.QUERY_SYNC_FRIEND_LIST= 'call sync_friend_list( ? ) ';  //room_index, id, ,otherid, room_data
