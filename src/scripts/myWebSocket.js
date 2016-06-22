var token = $.cookie("token");
// alert("token is "+token);
var websocket;
if(token != null){
    if ('WebSocket' in window) {
        websocket = new WebSocket(ApiPath.TMSSocket.webSocket + "?token="+token);
    } else if ('MozWebSocket' in window) {
        websocket = new MozWebSocket(ApiPath.TMSSocket.webSocket + "?token="+token);
    } else {
        websocket = new SockJS(ApiPath.TMSApi.socket.socketJs + "?token="+token);
    }

    websocket.onopen = function (evnt) {
        console.log('open');
    }
    websocket.onmessage = function (evnt) {
        console.log(evnt.data);
        var data = eval('(' + evnt.data + ')');
        if(data.code == 0){
            if(data.info.newNotificationCount != null){
                $('#msg_count').text(data.info.newNotificationCount);
            }else{
                $('#msg_count').text("0");
            }
        }
    }
    websocket.onerror = function (evnt) {
        console.log('error');

    }
    websocket.onclose = function (evnt) {
        console.log('close');
    }
}