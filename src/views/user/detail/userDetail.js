/**
 * Created by medlog on 2016/7/5.
 */
var ajaxHelp = new AjaxHelp();

var param = getUserData();
console.log(param[0]);
var getUserDetail = function () {
    var URL = ApiPath.TMSApi.user.userDetail;
    var requestData = {
        userId: pram[0].enterpriseOrgCode
    };
    ajaxHelp.AjaxPost(URL, requestData, successUserDetail, null);
};
var successUserDetail = function (data) {
    $("#companyUserDetail").html(data.orgCode);
    $("#nameUserDetail").html(data.userName);
    $("#identifyNumberUserDetail").html(data.userIDCard);
    $("#phoneNumberUserDetail").html(data.userMobile);
    $("#emailUserDetail").html(data.userEmail);
    $("#educationUserDetail").html(data.userEducation);
};

getUserDetail();
