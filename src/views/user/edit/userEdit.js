/**
 * Created by medlog on 2016/7/5.
 */
var ajaxHelp = new AjaxHelp();
var param = getUserData();
var userInfo = new Object();

//获取用户信息
var getUserInfo = function () {
    var URL = ApiPath.TMSApi.businessData.userDetail;
    var requestData = {
        userId: param[0].userId
    };
    ajaxHelp.AjaxPost(URL, requestData, successUserEdit, null);
};

//获取用户信息-成功回调函数
var successUserEdit = function (data) {
    userInfo = data;
    $("#loginNameUserEdit").val(data.loginName);
    $("#userNameUserEdit").val(data.userName);
    $("#userIDCardUserEdit").val(data.userIDCard);
    $("#userMobileUserEdit").val(data.userMobile);
    $("#userEmailUserEdit").val(data.userEmail);
};

//用户编辑提交
var submitUserEdit = function () {
    var URL = ApiPath.TMSApi.businessData.userEdit;
    var requestData = {
        userName: $("#userNameUserEdit").val(),
        userIDCard: $("#userIDCardUserEdit").val(),
        userMobile: $("#userMobileUserEdit").val(),
        userEmail: $("#userEmailUserEdit").val(),
        userId: param[0].userId
    };
    ajaxHelp.AjaxPost(URL, requestData, successSubmitUserEdit, null);
};

//用户编辑提交成功回调函数
var successSubmitUserEdit = function () {
    alert("提交成功!");
};

//获取用户信息
getUserInfo();
