/**
 * Created by medlog on 2016/7/5.
 */
var ajaxHelp = new AjaxHelp();
var rowData = getUserData();


//用户详情
var getUserDetail = function () {
    var URL = ApiPath.TMSApi.businessData.userDetail;
    var requestData = {
        userId: rowData[0].userId
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetUserDetail, null);
};
var successGetUserDetail = function (responseData) {
    //赋值
    $("#accountNameUserDetail").html(responseData.loginName);//账户名
    $("#companyUserDetail").html(responseData.orgName);//所属公司
    $("#nameUserDetail").html(responseData.userName);//姓名
    $("#identifyNumberUserDetail").html(responseData.userIDCard);//身份证号
    $("#phoneNumberUserDetail").html(responseData.userMobile);//手机号
    $("#emailUserDetail").html(responseData.userEmail);//邮箱
    $("#educationUserDetail").html(responseData.userEducationName);//学历
    $("#postUserDetail").html(responseData.userJobDesc);//岗位
};


//用户详情-获取用户数据
getUserDetail();
