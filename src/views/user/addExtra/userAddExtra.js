/**
 * Created by medlog on 2016/7/5.
 */
var ajaxHelp = new AjaxHelp();

//用户新增(续)-提交事件
var submitUserAddExtra = function () {
    var URL = ApiPath.TMSApi.businessData.userAdd;
    var requestData = {
        userName: $("#userNameUserAddExtra").val(),
        userIDCard: $("#userIDCardUserAddExtra").val(),
        userMobile: $("#userMobileUserAddExtra").val()
    };
    ajaxHelp.AjaxPost(URL, requestData, successSubmitUserAddExtra, null);
};

//提交事件成功回调函数
var successSubmitUserAddExtra = function () {
    alert("提交成功");
};
