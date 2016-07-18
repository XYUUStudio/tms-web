/**
 * Created by medlog on 2016/7/5.
 */
var ajaxHelp = new AjaxHelp();
//获取用户信息(userId)
var rowData = $("#userList").datagrid("getSelections");
var userDetail = new Object();


//获取用户详情
var getDetailUserEdit = function () {
    var URL = ApiPath.TMSApi.businessData.userDetail;
    var requestData = {
        userId: rowData[0].userId
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetDetailUserEdit, null);
};
var successGetDetailUserEdit = function (resultInfo) {
    userDetail = resultInfo;
    //赋值
    $("#loginNameUserEdit").html(resultInfo.loginName);//账户名
    $("#companyUserEdit").html(resultInfo.orgName);//所属公司
    $("#userNameUserEdit").val(resultInfo.userName);//姓名
    $("#userIDCardUserEdit").val(resultInfo.userIDCard);//身份证号
    $("#userMobileUserEdit").val(resultInfo.userMobile);//手机
    $("#userEmailUserEdit").val(resultInfo.userEmail);//邮箱
    getEducationUserEdit();//学历
    $("#postUserEdit").val(resultInfo.userJobDesc);//岗位
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
        if (userDetail.userEducation == item.dictValueCode) {
            $("#educationUserEdit").find("option[value='" + item.dictValueCode + "']").attr("selected", true)
        }
    });
};


//用户提交
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
        ds.dialog({
            title: "消息提示",
            content: "请输入姓名！",
            icon: "info.png",
            onyes: true
        });
        return;
    }
    if (requestData.userIDCard == null || requestData.userIDCard == "") {
        ds.dialog({
            title: "消息提示",
            content: "请输入身份证号！",
            icon: "info.png",
            onyes: true
        });
        return;
    }
    if (requestData.userIDCard.length != 18) {
        ds.dialog({
            title: "消息提示",
            content: "请输入18位身份证号！",
            icon: "info.png",
            onyes: true
        });
        return;
    }
    if (requestData.userMobile == null || requestData.userMobile == "") {
        ds.dialog({
            title: "消息提示",
            content: "请输入手机号！",
            icon: "info.png",
            onyes: true
        });
        return;
    }
    if (requestData.userMobile.length != 11) {
        ds.dialog({
            title: "消息提示",
            content: "请输入11位手机号！",
            icon: "info.png",
            onyes: true
        });
        return;
    }
    if (requestData.userEducation == null || requestData.userEducation == "") {
        ds.dialog({
            title: "消息提示",
            content: "请选择学历！",
            icon: "info.png",
            onyes: true
        });
        return;
    }
    ajaxHelp.AjaxPost(URL, requestData, successSubmitUserEdit, null);
};
var successSubmitUserEdit = function () {
    ds.dialog({
        title: "消息提示",
        content: "编辑成功！",
        icon: "success.png",
        width: "200",
        height: "50",
        timeout: 2
    });
    setTimeout(function () {
        $("#tabs").tabs("close", "用户编辑");
        loadUserList();
    }, 2000)
};


//返回点击
var returnUserEdit = function () {
    $("#tabs").tabs("close", "用户编辑");
};


//获取用户详情
getDetailUserEdit();
