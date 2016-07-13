/**
 * Created by medlog on 2016/7/8.
 */
var ajaxHelp = new AjaxHelp();


//获取物流中心下拉框
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


//司机新增-提交
var submitDriverAdd = function () {
    var URL = ApiPath.TMSApi.businessData.userAdd;
    var initialPwd = $("#initialPwdDriverAdd").val();//初始密码
    var requestData = {
        isDriverUser: "Y",
        loginName: $("#loginNameDriverAdd").val(),//账户名
        loginPassword: $("#confirmPwdDriverAdd").val(),//确认密码
        userName: $("#userNameDriverAdd").val(),//姓名
        userMobile: $("#userMobileDriverAdd").val(),//手机号
        orgCode: $("#logCenterDriverAdd").val()//所属物流中心
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
    if (initialPwd != requestData.loginPassword) {
        $.messager.alert("提示", "初始密码和确认密码必须一致!", "error");
        return;
    }
    if (requestData.userName == null || requestData.userName == "") {
        $.messager.alert("提示", "姓名不能为空!", "error");
        return;
    }
    if (requestData.userMobile == null || requestData.userMobile == "") {
        $.messager.alert("提示", "手机号不能为空!", "error");
        return;
    }
    if (requestData.userMobile.length != 11) {
        $.messager.alert("提示", "请输入正确的手机号!", "error");
        return;
    }
    if (requestData.orgCode == null || requestData.orgCode == "") {
        $.messager.alert("提示", "请选择所属物流中心！", "error");
        return;
    }
    ajaxHelp.AjaxPost(URL, requestData, successSubmitUserAdd, null);
};
var successSubmitUserAdd = function () {
    //$("#dialog_regPromptDriverAdd").dialog("open");
    //$("#dialog_regPromptDriverAdd").window("center");
    alert("司机注册成功");
    $("#tabs").tabs("close", "司机新增");
    loadDriverList();
};


//司机新增-初始化注册成功提示Dialog
//$("#dialog_regPromptDriverAdd").dialog({
//    title: "",
//    closable: true,
//    width: 350,
//    height: 230,
//    closed: true,
//    cache: false,
//    modal: true,
//    resizable: true,
//    loadingMessage: '正在加载...'
//});


//司机新增-注册成功提示点击是跳转新增(续)页面
//var submitRegPromptDriverAdd = function () {
//    $("#dialog_regPromptDriverAdd").dialog("close");
//    addTabHref("用户编辑", "views/driver/edit/driverEdit.html")
//};


//司机新增-取消
var returnDriverAdd = function () {
    $("#tabs").tabs("close", "司机新增");
};


//获取物流中心下拉框
getLogCenterDriverAdd();
