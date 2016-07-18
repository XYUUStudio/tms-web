/**
 * Created by medlog on 2016/7/5.
 */
var ajaxHelp = new AjaxHelp();
//获取用户信息(userId)
var rowData = $("#userList").datagrid("getSelections");


//用户详情
var getUserDetail = function () {
    var URL = ApiPath.TMSApi.businessData.userDetail;
    var requestData = {
        userId: rowData[0].userId
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetUserDetail, null);
};
var successGetUserDetail = function (resultInfo) {
    //赋值
    $("#accountNameUserDetail").html(resultInfo.loginName);//账户名
    $("#companyUserDetail").html(resultInfo.orgName);//所属公司
    $("#nameUserDetail").html(resultInfo.userName);//姓名
    $("#identifyNumberUserDetail").html(resultInfo.userIDCard);//身份证号
    $("#phoneNumberUserDetail").html(resultInfo.userMobile);//手机号
    $("#emailUserDetail").html(resultInfo.userEmail);//邮箱
    $("#educationUserDetail").html(resultInfo.userEducationName);//学历
    $("#postUserDetail").html(resultInfo.userJobDesc);//岗位
};


//用户详情
getUserDetail();
