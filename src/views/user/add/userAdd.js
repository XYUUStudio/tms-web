/**
 * Created by medlog on 2016/7/5.
 */
var ajaxHelp = new AjaxHelp();

//获取用户角色
var getUserRole = function () {

};


//获取所属公司
var getCompany = function () {

};

//修改用户角色
var changeUserRole = function () {

};

//修改所属公司
var changeCompany = function () {

}

//用户新增
var submitUserAdd = function () {
    var URL = ApiPath.TMSApi.user.userAdd;
    var requestData = {
        312: $("#accountNameUserAdd").val(),
        132: $("#initialPwdUserAdd").val(),
        13213: $("#confirmPwdUserAdd").val(),
        42: $("#userRoleUserAdd").val(),
        434: $("#nameUserAdd").val(),
        53453: $("#companyUserAdd").val()
    };
    ajaxHelp.AjaxPost(URL, requestData, successSubmitUserAdd, null);
};

//用户新增成功回调函数
var successSubmitUserAdd = function () {

};

getUserRole();

getCompany();
