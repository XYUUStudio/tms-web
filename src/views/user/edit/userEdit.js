/**
 * Created by medlog on 2016/7/5.
 */
var ajaxHelp = new AjaxHelp();
//选中获取用户数据集合
var rowData = $("#userList").datagrid("getSelections");
var userInfo = new Object();


//获取用户信息
var getUserInfo = function () {
    var URL = ApiPath.TMSApi.businessData.userDetail;
    var requestData = {
        userId: rowData[0].userId
    };
    ajaxHelp.AjaxPost(URL, requestData, successUserEdit, null);
};
var successUserEdit = function (responseData) {
    userInfo = responseData;
    //赋值
    $("#loginNameUserEdit").html(responseData.loginName);//账户名
    $("#companyUserEdit").html(responseData.orgName);//所属公司
    $("#userNameUserEdit").val(responseData.userName);//姓名
    $("#userIDCardUserEdit").val(responseData.userIDCard);//身份证号
    $("#userMobileUserEdit").val(responseData.userMobile);//手机
    $("#userEmailUserEdit").val(responseData.userEmail);//邮箱
    getEducationUserEdit();//学历
    $("#postUserEdit").val(responseData.userJobDesc);//岗位
};


//获取学历下拉框
var getEducationUserEdit = function () {
    var URL = ApiPath.TMSApi.dictionary.GetDictionary;
    var requestData = {
        dictTypeCode: "PRNEDU"
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetEducationUserEdit, null);
};
var successGetEducationUserEdit = function (data) {
    $.each(data.dictValueList, function (index, item) {
        $("#educationUserEdit").append("<option value='" + item.dictValueCode + "' >" + item.dictValueName + "</option>")
        if (userInfo.userEducation == item.dictValueCode) {
            $("#educationUserEdit").find("option[value='" + item.dictValueCode + "']").attr("selected", true)
        }
    });
};


//用户编辑-提交
var submitUserEdit = function () {
    var URL = ApiPath.TMSApi.businessData.userEdit;
    var requestData = {
        userId: rowData[0].userId,
        userName: $("#userNameUserEdit").val(),//姓名
        userIDCard: $("#userIDCardUserEdit").val(),//身份证号
        userMobile: $("#userMobileUserEdit").val(),//手机
        userEmail: $("#userEmailUserEdit").val(),//邮箱
        userEducation: $("#educationUserEdit").val(),//学历
        userJobDesc: $("#postUserEdit").val()//岗位
    };
    if (requestData.userName == null || requestData.userName == "") {
        $.messager.alert("提示", "请输入姓名！", "error");
        return;
    }
    if (requestData.userIDCard == null || requestData.userIDCard == "") {
        $.messager.alert("提示", "请输入身份证号！", "error");
        return;
    }
    if (requestData.userIDCard.length != 18) {
        $.messager.alert("提示", "请输入18位身份证号！", "error");
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
    if (requestData.userEducation == null || requestData.userEducation == "") {
        $.messager.alert("提示", "请选择学历！", "error");
        return;
    }
    ajaxHelp.AjaxPost(URL, requestData, successSubmitUserEdit, null);
};
var successSubmitUserEdit = function () {
    alert("编辑成功!");
    $("#tabs").tabs("close", "用户编辑");
    loadUserList();
};


//点击返回
var returnUserEdit = function () {
    $("#tabs").tabs("close", "用户编辑");
};


//获取用户信息
getUserInfo();
