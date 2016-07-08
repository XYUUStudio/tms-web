/**
 * Created by medlog on 2016/7/5.
 */
var ajaxHelp = new AjaxHelp();

//获取用户角色
var getUserRole = function () {
    var URL = ApiPath.TMSApi.businessData.userRole;
    var requestData = {
        orgType: "CE"
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetUserRole, null);
};

//获取用户角色-成功回调函数
var successGetUserRole = function (data) {
    console.log(data);
    $.each(data, function (index, item) {
        $("#userRoleUserAdd").append("<option value='" + item.id + "' >" + item.name + "</option>")
    });
};

//获取所属公司
var getCompany = function () {
    var URL = ApiPath.TMSApi.businessData.enterprisesList;
    var requestData = {};
    ajaxHelp.AjaxPost(URL, requestData, successGetCompany, null);
};

//获取所属公司-成功回调函数
var successGetCompany = function (data) {
    console.log(data);
    $.each(data.rows, function (index, item) {
        $("#companyUserAdd").append("<option value='" + item.cECode + "' >" + item.cEName + "</option>")
    });
};

//修改用户角色
var changeUserRole = function () {

};

//修改所属公司
var changeCompany = function () {

};

//用户新增
var submitUserAdd = function () {
    var URL = ApiPath.TMSApi.businessData.userAdd;
    var confirmPwd = $("#confirmPwdUserAdd").val();
    var requestData = {
        loginName: $("#accountNameUserAdd").val(),
        loginPassword: $("#initialPwdUserAdd").val(),
        role: $("#userRoleUserAdd").val(),
        userName: $("#nameUserAdd").val(),
        userMobile: $("#mobileNoUserAdd").val(),
        orgCode: $("#companyUserAdd").val(),
    };
    if (requestData.loginName == null || requestData.loginName == "") {
        $.messager.alert("提示", "账户名不能为空！", "error");
        return;
    }
    if (requestData.loginPassword == null || requestData == "") {
        $.messager.alert("提示", "初始密码不能为空！", "error");
        return;
    }
    if (confirmPwd == null || confirmPwd == "") {
        $.messager.alert("提示", "确认密码不能为空！", "error");
        return;
    }
    if (requestData.loginPassword != confirmPwd) {
        $.messager.alert("提示", "初始密码和确认密码必须一致！", "error");
        return;
    }
    if (requestData.userName == null || requestData.userName == "") {
        $.messager.alert("提示", "姓名不能为空！", "error");
        return;
    }
    if (requestData.userMobile.length != 11) {
        $.messager.alert("提示", "手机号有误,请重新输入！", "error");
        return;
    }
    if (requestData.userMobile == null || requestData.userMobile == "") {
        $.messager.alert("提示", "手机号不能为空！", "error");
        return;
    }
    ajaxHelp.AjaxPost(URL, requestData, successSubmitUserAdd, null);
};

//用户新增成功回调函数-弹窗
var successSubmitUserAdd = function () {
    regPromptUserAdd.show();
};

//用户注册成功弹窗提示
var regPromptUserAdd = {
    show: function () {
        $("#dialog_regPromptUserAdd").dialog("open");
        $("#dialog_regPromptUserAdd").window("center");
    }
};

//初始化Dialog
$("#dialog_regPromptUserAdd").dialog({
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

//用户注册成功提示点击是跳转新增(续)页面
var btn_regPromptUserAdd = function () {
    $("#dialog_regPromptUserAdd").dialog("close");
    addTabHref("用户编辑", "views/user/edit/userEdit.html")
};

getUserRole();

getCompany();
