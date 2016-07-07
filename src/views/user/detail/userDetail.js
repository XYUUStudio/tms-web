/**
 * Created by medlog on 2016/7/5.
 */
var ajaxHelp = new AjaxHelp();

var param = getUserData();
console.log(param[0]);

//用户详情
var getUserDetail = function () {
    var URL = ApiPath.TMSApi.businessData.userDetail;
    var requestData = {
        userId: param[0].userId
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetUserDetail, null);
};

//用户详情成功回调函数
var successGetUserDetail = function (data) {
    $("#accountNameUserDetail").html(data.loginName);
    $("#companyUserDetail").html(data.orgCode);
    $("#nameUserDetail").html(data.userName);
    $("#identifyNumberUserDetail").html(data.userIDCard);
    $("#phoneNumberUserDetail").html(data.userMobile);
    $("#emailUserDetail").html(data.userEmail);
    $("#educationUserDetail").html(data.userEducation);
    $("#postUserDetail").html(data.userEducation);
};

//用户详情
getUserDetail();
