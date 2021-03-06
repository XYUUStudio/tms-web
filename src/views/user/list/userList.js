/**
 * Created by medlog on 2016/7/5.
 */
var pageNumberInfo = "";
var pageSizeInfo = "";


//用户详情界面跳转
var detailUserList = function () {
    addTabHrefUpdate("用户详情", "views/user/detail/userDetail.html")
};


//加载用户列表和查询
var loadUserList = function (pageNumber, pageSize) {
    pageNumber = pageNumberInfo;
    pageSize = pageSizeInfo;
    var URL = ApiPath.TMSApi.businessData.userList;
    if (pageNumber == undefined || pageNumber == 0 || pageNumber == "") {
        pageNumber = 1;
    }
    if (pageSize == undefined || pageSize == 0 || pageSize == "") {
        pageSize = 20;
    }
    var requestData = {
        page: pageNumber,
        rows: pageSize,
        searchValue: $("#searchValueUserList").val()
        //validStatus: $("#validStatusUserList").val()
    };
    ajaxHelp.AjaxPost(URL, requestData, successLoadUserList, null);
};
var successLoadUserList = function (resultInfo) {
    console.log(resultInfo);
    $("#userList").datagrid("loadData", resultInfo);
    $("#paginationUserList").pagination({
        pageList: [10, 20, 30],
        pageSize: resultInfo.pageSize,
        total: resultInfo.total,
        selected: true,
        onSelectPage: function (pageNumber, pageSize) {
            pageNumberInfo = pageNumber;
            pageSizeInfo = pageSize;
            loadUserList(pageNumber, pageSize);
        }
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
        return false;
    }
});


//重置密码
var resetPwdUserList = function () {
    var rowData = $("#userList").datagrid("getSelections");
    $("#resetPwdUserList").val("");
    $("#confirmPwdUserList").val("");
    if (!rowData || rowData == "") {
        ds.dialog({
            title: "消息提示",
            content: "请选择用户！",
            icon: "info.png",
            onyes: true
        });
    } else {
        $("#dialog_resetPwdUserList").dialog("open");
        $("#dialog_resetPwdUserList").window("center");
    }
};
//重置密码Dialog初始化
$("#dialog_resetPwdUserList").dialog({
    title: "",
    closable: true,
    width: 300,
    height: 200,
    closed: true,
    cache: false,
    modal: true,
    loadingMessage: "正在加载..."
});
//重置密码提交
var submitResetPwdUserList = function () {
    var URL = ApiPath.TMSApi.businessData.userReset;
    var rowData = $("#userList").datagrid("getSelections");
    var resetPwd = $("#resetPwdUserList").val();
    var loginPassword = $("#confirmPwdUserList").val();
    var requestData = {
        userId: rowData[0].loginID,
        loginPassword: loginPassword
    };
    if (resetPwd == null || resetPwd == "") {
        $.messager.alert("提示", "请输入重置密码！", "error");
        //ds.dialog({
        //    title: "消息提示",
        //    content: "请输入重置密码！",
        //    icon: "info.png",
        //    onyes: true
        //});
        return;
    }
    if (requestData.loginPassword == null || requestData.loginPassword == "") {
        $.messager.alert("提示", "请输入确认密码！", "error");
        //ds.dialog({
        //    title: "消息提示",
        //    content: "请输入确认密码！",
        //    icon: "info.png",
        //    onyes: true
        //});
        return;
    }
    if (resetPwd != requestData.loginPassword) {
        $.messager.alert("提示", "重置密码和确认密码必须一致！", "error");
        //ds.dialog({
        //    title: "消息提示",
        //    content: "重置密码和确认密码必须一致！",
        //    icon: "info.png",
        //    onyes: true
        //});
        return;
    }
    ajaxHelp.AjaxPost(URL, requestData, successSubmitResetPwd, null);
};
var successSubmitResetPwd = function () {
    $("#dialog_resetPwdUserList").dialog("close");
    ds.dialog({
        title: "消息提示",
        content: "重置密码成功！",
        icon: "success.png",
        onyes: true,
        timeout: 2
    });
};


//重置密码取消
var cancelResetPwdUserList = function () {
    $("#dialog_resetPwdUserList").dialog("close");
};


//用户新增界面跳转
var addUserList = function () {
    addTabHref("用户新增", "views/user/add/userAdd.html");
};


//用户编辑界面跳转
var editUserList = function () {
    var rowData = $("#userList").datagrid("getSelections");
    if (!rowData || rowData == "") {
        ds.dialog({
            title: "消息提示",
            content: "请选择用户！",
            icon: "info.png",
            onyes: true
        });
    } else {
        addTabHref("用户编辑", "views/user/edit/userEdit.html");
    }
};


//加载用户列表
loadUserList();
