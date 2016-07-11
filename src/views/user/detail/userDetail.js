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

//用户详情成功回调函数
var successGetUserDetail = function (responseData) {
    $("#accountNameUserDetail").html(responseData.loginName);
    $("#companyUserDetail").html(responseData.orgCode);
    $("#nameUserDetail").html(responseData.userName);
    $("#identifyNumberUserDetail").html(responseData.userIDCard);
    $("#phoneNumberUserDetail").html(responseData.userMobile);
    $("#emailUserDetail").html(responseData.userEmail);
    $("#educationUserDetail").html(responseData.userEducation);
    $("#postUserDetail").html(responseData.userJobDesc);
};

//用户详情
getUserDetail();
