/**
 * Created by xuezhiyu on 2016/05/11.
 */
var checkToken = function(token){
    var token = $.cookie("token");
    if(token == undefined || token == null || token == ""){
        $.messager.alert('提示', "登陆失效，请重新登陆", "error");
        window.location.href = "/";
    }
}
