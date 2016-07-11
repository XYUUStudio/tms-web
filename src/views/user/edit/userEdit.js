/**
 * Created by medlog on 2016/7/5.
 */
var ajaxHelp = new AjaxHelp();
var rowData = $("#userList").datagrid("getSelections");

//用户编辑-获取学历下拉框
var getEducationUserEdit = function () {
    var URL = ApiPath.TMSApi.dictionary.GetDictionary;
    var requestData = {
        dictTypeCode: "PRNEDU"
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetEducationUserEdit, null);
};
var successGetEducationUserEdit = function (data) {
    console.log(data);
    $.each(data.dictValueList, function (index, item) {
        $("#educationUserEdit").append("<option value='" + item.dictValueCode + "' >" + item.dictValueName + "</option>")
    });
};


//用户编辑-获取用户信息
var getUserInfo = function () {
    var URL = ApiPath.TMSApi.businessData.userDetail;
    var requestData = {
        userId: rowData[0].userId
    };
    ajaxHelp.AjaxPost(URL, requestData, successUserEdit, null);
};
//用户编辑-获取用户信息成功回调函数
var successUserEdit = function (data) {
    $("#loginNameUserEdit").val(data.loginName);
    $("#userNameUserEdit").val(data.userName);
    $("#userIDCardUserEdit").val(data.userIDCard);
    $("#userMobileUserEdit").val(data.userMobile);
    $("#userEmailUserEdit").val(data.userEmail);
};


//用户编辑-提交
var submitUserEdit = function () {
    var URL = ApiPath.TMSApi.businessData.userEdit;
    var requestData = {
        userId: rowData[0].userId,
        userName: $("#userNameUserEdit").val(),
        userIDCard: $("#userIDCardUserEdit").val(),
        userMobile: $("#userMobileUserEdit").val(),
        userEmail: $("#userEmailUserEdit").val()
    };
    ajaxHelp.AjaxPost(URL, requestData, successSubmitUserEdit, null);
};
//用户编辑-提交成功回调函数
var successSubmitUserEdit = function () {
    alert("提交成功!");
};


//获取用户信息
getUserInfo();


//获取学历
getEducationUserEdit();
