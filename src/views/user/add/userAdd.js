/**
 * Created by medlog on 2016/7/5.
 */
var ajaxHelp = new AjaxHelp();


//获取用户角色下拉框
var getUserRole = function () {
    var URL = ApiPath.TMSApi.businessData.userRole;
    var requestData = {
        orgType: "CE"
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetUserRole, null);
};
var successGetUserRole = function (responseData) {
    $.each(responseData, function (index, item) {
        $("#userRoleUserAdd").append("<option value='" + item.id + "' >" + item.name + "</option>")
    });
};
//修改用户角色
var changeUserRole = function () {
};


//获取所属公司下拉框
var getCompany = function () {
    var URL = ApiPath.TMSApi.businessData.enterprisesList;
    var requestData = {};
    ajaxHelp.AjaxPost(URL, requestData, successGetCompany, null);
};
var successGetCompany = function (responseData) {
    $.each(responseData.rows, function (index, item) {
        $("#companyUserAdd").append("<option value='" + item.enterpriseOrgCode + "' >" + item.cEName + "</option>")
    });
};
//修改所属公司
var changeCompany = function () {
};


//用户新增-提交
var submitUserAdd = function () {
    var URL = ApiPath.TMSApi.businessData.userAdd;
    var initialPwd = $("#initialPwdUserAdd").val();//初始密码
    var requestData = {
        loginName: $("#accountNameUserAdd").val(),//账户名
        loginPassword: $("#confirmPwdUserAdd").val(),//确认密码
        role: $("#userRoleUserAdd").val(),//用户角色
        userName: $("#nameUserAdd").val(),//姓名
        userMobile: $("#mobileNoUserAdd").val(),//手机号
        orgCode: $("#companyUserAdd").val()//单位
    };
    if (requestData.loginName == null || requestData.loginName == "") {
        $.messager.alert("提示", "请输入账户名！", "error");
        return;
    }
    if (initialPwd == null || initialPwd == "") {
        $.messager.alert("提示", "请输入初始密码！", "error");
        return;
    }
    if (requestData.loginPassword == null || requestData.loginPassword == "") {
        $.messager.alert("提示", "请输入确认密码！", "error");
        return;
    }
    if (initialPwd != requestData.loginPassword) {
        $.messager.alert("提示", "初始密码和确认密码必须一致！", "error");
        return;
    }
    if (requestData.role == null || requestData.role == "") {
        $.messager.alert("提示", "请选择用户角色！", "error");
        return;
    }
    if (requestData.userName == null || requestData.userName == "") {
        $.messager.alert("提示", "请输入姓名！", "error");
        return;
    }
    if (requestData.userMobile == null || requestData.userMobile == "") {
        $.messager.alert("提示", "请输入手机号！", "error");
        return;
    }
    if (requestData.userMobile.length != 11) {
        $.messager.alert("提示", "请输入11位手机号！", "error");
        return;
    }
    if (requestData.orgCode == null || requestData.orgCode == "") {
        $.messager.alert("提示", "请选择单位！", "error");
        return;
    }
    ajaxHelp.AjaxPost(URL, requestData, successSubmitUserAdd, null);
};
var successSubmitUserAdd = function () {
    //$("#dialog_regPromptUserAdd").dialog("open");
    //$("#dialog_regPromptUserAdd").window("center");
    alert("用户注册成功");
    $("#tabs").tabs("close", "用户新增");
    loadUserList();
};


//用户新增-初始化Dialog
//$("#dialog_regPromptUserAdd").dialog({
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


//用户新增-跳转编辑页面
//var btn_regPromptUserAdd = function () {
//    $("#dialog_regPromptUserAdd").dialog("close");
//    $("#tabs").tabs("close", "用户新增");
//    addTabHref("用户编辑", "views/user/edit/userEdit.html")
//
//};


//用户新增-注册成功提示点击否关闭页面刷新列表
//var closeUserAdd = function () {
//    $("#dialog_regPromptUserAdd").dialog("close");
//    loadUserList();
//};


//用户新增-取消
var returnUserAdd = function () {
    $("#tabs").tabs("close", "用户新增");
};


//用户添加-获取用户角色下拉框
getUserRole();
//用户添加-获取所属公司下拉框
getCompany();
