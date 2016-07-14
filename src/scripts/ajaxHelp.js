/**
 * Created by xuezhiyu on 2016/05/11.
 */

var AjaxException = function(){
    AjaxException.prototype.TokenException = function(){
        ds.dialog({
            title : '消息提示',
            content :'登陆失效，请重新登陆！',
            onyes:true,
            icon : "info.png"
        });
        window.location.href = "index.html";
    }

    AjaxException.prototype.ResponseException = function(data, callback) {
        /// <summary>请求异常处理</summary>
        switch (data.code) {
            case 1001:
            case "1001":
                ds.dialog({
                    title : '消息提示',
                    content :'服务异常,错误编码：'+data.msg+"！",
                    onyes:true,
                    icon : "info.png"
                });
                break;
            case 2001:
            case "2001":
                ds.dialog({
                    title : '消息提示',
                    content :'您没有访问的权限！',
                    onyes:true,
                    icon : "info.png"
                })
                break;
            case 3001:
            case "3001":
                ds.dialog({
                    title : '消息提示',
                    content :'请确认您的必输项是否完整！',
                    onyes:true,
                    icon : "info.png"
                });
                break;
            case 5001:
            case "5001":
                ds.dialog({
                    title : '消息提示',
                    content :'数据已经存在！',
                    onyes:true,
                    icon : "info.png"
                });
                break;
            case 4001:
            case "4001":
                ds.dialog({
                    title : '消息提示',
                    content :'用户信息失效，请重新登录',
                    onyes:true,
                    icon : "info.png"
                });
                break;
            case 0:
            case "0":
                callback(data.info);
                break;
            case 1:
            case "1":
                ds.dialog({
                    title : '消息提示',
                    content : data.info,
                    onyes:true,
                    icon : "info.png"
                });
                break;
            default:
                ds.dialog({
                    title : '消息提示',
                    content :"未知异常"+" "+data.msg,
                    onyes:true,
                    icon : "info.png"
                });
        }
    }

    AjaxException.prototype.HttpEorr = function(data, callback) {
        /// <summary>报错处理</summary>
        $.messager.alert('提示', "请求失败:"+data.status, "error");
        if (callback) {
            callback(data);
        }
    }
};
// class AjaxException {
//     constructor() { //构造函数
//     }
//
//     TokenException(){
//         $.messager.alert('提示', "登陆失效，请重新登陆", "error");
//         window.location.href = "/";
//     }
//
//     ResponseException(data, callback) {
//         /// <summary>请求异常处理</summary>
//         switch (data.code) {
//             case 1001:
//             case "1001":
//                 $.messager.alert('提示', "服务异常,错误编码：" + data.code + "！", "error");
//                 break;
//             case 2001:
//             case "2001":
//                 $.messager.alert('提示', "您没有访问的权限！", "error");
//                 break;
//             case 3001:
//             case "3001":
//                 $.messager.alert('提示', "请确认您的必输项是否完整！", "error");
//                 break;
//             case 5001:
//             case "5001":
//                 $.messager.alert('提示', "数据已经存在！", "error");
//                 break;
//             case 4001:
//             case "4001":
//                 $.messager.alert('提示', "用户信息失效，请重新登录！", "error");
//                 break;
//             case 0:
//             case "0":
//                 callback(data.info);
//                 break;
//             default:
//                 $.messager.alert('提示', "未知异常：" + data.code + "|" + data.info + "！", "error");
//         }
//     }
//
//     HttpEorr(data, callback) {
//         /// <summary>报错处理</summary>
//         $.messager.alert('提示', "请求失败:"+data.status, "error");
//         if (callback) {
//             callback(data);
//         }
//     }
// }
var AjaxHelp = function(){
    AjaxHelp.prototype.AjaxPost = function(url, data, success, error) {
        /// <summary>POST的形式请求接口</summary>
        var exception = new AjaxException();
        if(url!=ApiPath.TMSApi.UP.pcLogin){
            var token = $.cookie("token");
            if(token == undefined || token == null || token == ""){
                exception.TokenException();
            }else{
                url = url + "?token=" + token;
            }
        }

        var param = JSON.stringify(data);
        $.ajax({
            type: 'POST',
            url: url,
            data: param,
            dataType: 'json',
            crossDomain: false,
            async: false,
            headers: {"Accept": "application/json", "Content-Type": "application/json"},
            success: function (responseData) {
                /// <summary>请求完毕</summary>
                exception.ResponseException(responseData, success);
            },
            error: function (responseData) {
                /// <summary>请求失败</summary>
                exception.HttpEorr(responseData, error);
            }
        });

    }

    AjaxHelp.prototype.AjaxGet = function(url, data, success, error) {
        /// <summary>Get的形式请求接口</summary>
        var token = $.cookie("token");
        var exception = new AjaxException();
        if(token == undefined || token == null || token == ""){
            exception.TokenException();
        }else{
            url = url + "?token=" + token;
        }
        $.ajax({
            type: "GET",
            crossDomain: false,
            url: url,
            dataType: 'json',
            async: false,
            data: JSON.stringify(data),
            headers: {"Accept": "application/json", "Content-Type": "application/json"},
            success: function (responseData) {
                /// <summary>请求完毕</summary>
                exception.ResponseException(responseData, success);
            },
            error: function (responseData) {
                /// <summary>请求失败</summary>
                exception.HttpEorr(responseData, error);
            }
        });
    }

    AjaxHelp.prototype.AjaxForm = function(url, data, success, error) {
        /// <summary>附件上传</summary>
        var token = $.cookie("token");
        var exception = new AjaxException();
        if(token == undefined || token == null || token == ""){
            exception.TokenException();
        }else{
            url = url + "?token=" + token;
        }
        $.ajax({
            type: "POST",
            url: url,
            dataType: 'json',
            data: data,
            crossDomain: true,
            success: function (responseData) {
                /// <summary>请求完毕</summary>
                exception.ResponseException(responseData, success);
            },
            error: function (responseData) {
                /// <summary>请求失败</summary>
                exception.HttpEorr(responseData, error);
            }
        });
    }
}
// class AjaxHelp{
//     AjaxPost (url, data, success, error) {
//         /// <summary>POST的形式请求接口</summary>
//         var exception = new AjaxException();
//         // var token = $.cookie("token");
//         // if(token == undefined || token == null || token == ""){
//         //     exception.TokenException();
//         // }else{
//         //     url = url + "?token=" + token;
//         // }
//
//         var param = JSON.stringify(data);
//         $.ajax({
//             type: 'POST',
//             url: url,
//             data: param,
//             dataType: 'json',
//             crossDomain: false,
//             async: false,
//             headers: {"Accept": "application/json", "Content-Type": "application/json"},
//             success: function (responseData) {
//                 /// <summary>请求完毕</summary>
//                 exception.ResponseException(responseData, success);
//             },
//             error: function (responseData) {
//                 /// <summary>请求失败</summary>
//                 exception.HttpEorr(responseData, error);
//             }
//         });
//
//     }
//
//     AjaxGet(url, data, success, error) {
//         /// <summary>Get的形式请求接口</summary>
//         var token = $.cookie("token");
//         var exception = new AjaxException();
//         if(token == undefined || token == null || token == ""){
//             exception.TokenException();
//         }else{
//             url = url + "?token=" + token;
//         }
//         $.ajax({
//             type: "GET",
//             crossDomain: false,
//             url: url,
//             dataType: 'json',
//             async: false,
//             data: JSON.stringify(data),
//             headers: {"Accept": "application/json", "Content-Type": "application/json"},
//             success: function (responseData) {
//                 /// <summary>请求完毕</summary>
//                 exception.ResponseException(responseData, success);
//             },
//             error: function (responseData) {
//                 /// <summary>请求失败</summary>
//                 exception.HttpEorr(responseData, error);
//             }
//         });
//     }
//
//     AjaxForm(url, data, success, error) {
//         /// <summary>附件上传</summary>
//         var token = $.cookie("token");
//         var exception = new AjaxException();
//         if(token == undefined || token == null || token == ""){
//             exception.TokenException();
//         }else{
//             url = url + "?token=" + token;
//         }
//
//         $.ajax({
//             type: "POST",
//             url: url,
//             dataType: 'json',
//             data: data,
//             crossDomain: true,
//             success: function (responseData) {
//                 /// <summary>请求完毕</summary>
//                 exception.ResponseException(responseData, success);
//             },
//             error: function (responseData) {
//                 /// <summary>请求失败</summary>
//                 exception.HttpEorr(responseData, error);
//             }
//         });
//     }
// }


