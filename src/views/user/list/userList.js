/**
 * Created by medlog on 2016/7/5.
 */
var ajaxHelp = new AjaxHelp();


//双击列表项获取数据集
var getUserData = function () {
    var rowData = $("#userList").datagrid("getSelections");
    return rowData;
};
//用户管理-详情
var detailUserList = function () {
    addTabHref("用户详情", "views/user/detail/userDetail.html")
};


//用户列表-加载页面
var loadUserList = function (pageNumber, pageSize) {
    var URL = ApiPath.TMSApi.businessData.userList;
    if (pageNumber == undefined || pageNumber == 0) {
        pageNumber = 1;
    }
    if (pageSize == undefined || pageSize == 0) {
        pageSize = 20;
    }
    var requestData = {
        page: pageNumber,
        rows: pageSize
    };
    ajaxHelp.AjaxPost(URL, requestData, successLoadUserList, null);
};
var successLoadUserList = function (resultInfo) {
    $("#userList").datagrid("loadData", resultInfo);
    $("#paginationUserList").pagination({
        pageList: [10, 20, 30],
        pageSize: resultInfo.pageSize,
        total: resultInfo.total,
        selected: true
    });
};
$("#userList").datagrid({
    striped: true,//设置为true将交替显示行背景
    checkOnSelect: true,//true:点击行选中或取消复选框;false:点击复选框选中或取消复选框
    rownumbers: true,//当true时显示行号;默认false
    nowrap: true,//设置为true,当数据长度超出列宽时将会自动截取
    singleSelect: true,//设置为true将只允许选择一行
    pagination: true,//设置true将在数据表格底部显示分页工具栏
    fitColumns: true,//设置为true将自动使列适应表格宽度以防止出现水平滚动
    iconCls: "icon-save",
    loadMsg: "正在加载，请稍等。。。。。。",//当从远程站点载入数据时，显示的一条快捷信息
    view: detailview,//定义数据表格的视图
    onDblClickCell: detailUserList,//当用户双击单元格时触发
    detailFormatter: function (rowIndex, rowData) {//可以和onExpandRow合用
        return "<table><tr>" +
            "<td rowspan=2 style='border:0'></td>" +
            "<td style='border:0'>" +
            "<p>soNO: " + rowData.soNO + "</p>" +
            "<p>soTypeName: " + rowData.soTypeName + "</p>" +
            "</td>" +
            "</tr></table>";
    }
});
loadUserList();


//用户列表-查询
var queryUserList = function () {
    var URL = ApiPath.TMSApi.businessData.userList;
    var requestData = {
        searchValue: $("#searchValueUserList").val(),
        validStatus: $("#validStatusUserList").val()
    };
    ajaxHelp.AjaxPost(URL, requestData, successLoadUserList, null);
};


//用户列表-重置密码
var resetPwdUserList = function () {
    var rowData = $("#userList").datagrid("getSelections");
    if (!rowData || rowData == "") {
        $.messager.alert("提示", "请选择用户!", "error");
        return;
    }
    $("#dialog_resetPwdUserList").dialog("open");
    $("#dialog_resetPwdUserList").window("center");
};
//用户列表-重置密码Dialog初始化
$("#dialog_resetPwdUserList").dialog({
    title: "",
    closable: true,
    width: 350,
    height: 230,
    closed: true,
    cache: false,
    modal: true,
    resizable: true,
    loadingMessage: '正在加载...'
});
//用户列表-重置密码提交
var submitResetPwdUserList = function () {
    var URL = ApiPath.TMSApi.businessData.userReset;
    var rowData = $("#userList").datagrid("getSelections");
    //console.log(rowData[0].userId);
    var resetPwd = $("#resetPwdUserList").val();
    var loginPassword = $("#confirmPwdUserList").val();
    var requestData = {
        loginPassword: loginPassword,
        userId: rowData[0].loginID
    };
    if (resetPwd == null || resetPwd == "") {
        $.messager.alert("提示", "请输入重置密码!", "error");
        return;
    }
    if (requestData.loginPassword == null || requestData.loginPassword == "") {
        $.messager.alert("提示", "请输入确认密码!", "error");
        return;
    }
    if (resetPwd != requestData.loginPassword) {
        $.messager.alert("提示", "重置密码和确认密码必须一致!", "error");
        return;
    }
    ajaxHelp.AjaxPost(URL, requestData, successSubmitResetPwd, null);
};
var successSubmitResetPwd = function () {
    alert("重置密码成功!");
    $("#dialog_resetPwdUserList").dialog("close");
};


//用户管理-新增
var addUserList = function () {
    addTabHref("用户新增", "views/user/add/userAdd.html");
};


//用户管理-编辑
var editUserList = function () {
    var rowData = $("#userList").datagrid("getSelections");
    if (!rowData || rowData == "") {
        $.messager.alert("提示", "请选择需要编辑的用户", "error");
    } else {
        addTabHref("用户编辑", "views/user/edit/userEdit.html");
    }
};

