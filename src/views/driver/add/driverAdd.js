/**
 * Created by medlog on 2016/7/8.
 */
var ajaxHelp = new AjaxHelp();


//司机新增-获取物流中心
var getLogCenterDriverAdd = function () {
    var URL = ApiPath.TMSApi.businessData.logisticsCenter;
    var requestData = {};
    ajaxHelp.AjaxPost(URL, requestData, successGetLogisticsCenter, null);
};
var successGetLogisticsCenter = function (data) {
    $.each(data, function (index, item) {
        $("#logCenterDriverAdd").append("<option value='" + item.id + "' >" + item.name + "</option>")
    });
};
getLogCenterDriverAdd();


//司机新增-提交
var submitDriverAdd = function () {
    var URL = ApiPath.TMSApi.businessData.userAdd;
    var initialPwd = $("#initialPwdDriverAdd").val();
    var requestData = {
        isDriverUser: "Y",
        loginName: $("#loginNameDriverAdd").val(),
        loginPassword: $("#confirmPwdDriverAdd").val(),
        userName: $("#userNameDriverAdd").val(),
        loginMobileNo: "3123123"
    };
    if (requestData.loginName == null || requestData.loginName == "") {
        $.messager.alert("提示", "账户名不能为空!", "error");
        return;
    }
    if (initialPwd == null || initialPwd == "") {
        $.messager.alert("提示", "初始密码不能为空!", "error");
        return;
    }
    if (requestData.loginPassword == null || requestData.loginPassword == "") {
        $.messager.alert("提示", "确认密码不能为空!", "error");
        return;
    }
    if (requestData.userName == null || requestData.userName == "") {
        $.messager.alert("提示", "姓名不能为空!", "error");
        return;
    }
    if (initialPwd != requestData.loginPassword) {
        $.messager.alert("提示", "初始密码和确认密码必须一致!", "error");
        return;
    }
    ajaxHelp.AjaxPost(URL, requestData, successSubmitUserAdd, null);
};
var successSubmitUserAdd = function () {
    $("#dialog_regPromptDriverAdd").dialog("open");
    $("#dialog_regPromptDriverAdd").window("center");
};


//司机新增-初始化注册成功提示Dialog
$("#dialog_regPromptDriverAdd").dialog({
    title: "",
    closable: true,
    width: 350,
    height: 230,
    closed: true,
    cache: false,
    modal: true,
    resizable: true,
    loadingMessage: '正在加载...',
});


//司机新增-注册成功提示点击是跳转新增(续)页面
var submitRegPromptDriverAdd = function () {
    $("#dialog_regPromptDriverAdd").dialog("close");
    addTabHref("用户编辑", "views/driver/edit/driverEdit.html")
};
