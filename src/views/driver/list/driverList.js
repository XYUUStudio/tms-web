/**
 * Created by medlog on 2016/7/7.
 */
var ajaxHelp = new AjaxHelp();


//司机详情界面跳转
var detailDriverList = function () {
    addTabHrefUpdate("司机详情", "views/driver/detail/driverDetail.html");
};


//加载司机列表
var loadDriverList = function (pageNumber, pageSize) {
    var URL = ApiPath.TMSApi.businessData.driverList;
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
    ajaxHelp.AjaxPost(URL, requestData, successLoadDriverList, null);
};
var successLoadDriverList = function (resultInfo) {
    $("#driverList").datagrid("loadData", resultInfo);
    $("#paginationDriverList").pagination({
        pageList: [10, 20, 30],
        pageSize: resultInfo.pageSize,
        total: resultInfo.total,
        selected: true,
        onSelectPage: function (pageNumber, pageSize) {
            loadDriverList(pageNumber, pageSize);
        }
    });
};
$("#driverList").datagrid({
    striped: true,//设置为true将交替显示行背景
    checkOnSelect: true,//true:点击行选中或取消复选框;false:点击复选框选中或取消复选框
    rownumbers: true,//当true时显示行号;默认false
    nowrap: true,//设置为true,当数据长度超出列宽时将会自动截取
    singleSelect: true,//设置为true将只允许选择一行
    pagination: true,//设置true将在数据表格底部显示分页工具栏
    fitColumns: true,//设置为true将自动使列适应表格宽度以防止出现水平滚动
    iconCls: "icon-save",
    loadMsg: "正在加载，请稍等。。。。。。",//当从远程站点载入数据时，显示的一条快捷信息
    onDblClickCell: detailDriverList,//当用户双击单元格时触发
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


//获取所属物流中心下拉框
var getLogCenterDriverList = function () {
    var URL = ApiPath.TMSApi.businessData.logisticsCenter;
    var requestData = {};
    ajaxHelp.AjaxPost(URL, requestData, successGetLogisticsCenter, null);
};
var successGetLogisticsCenter = function (responseData) {
    $.each(responseData, function (index, item) {
        $("#logCenterDriverList").append("<option value='" + item.id + "' >" + item.name + "</option>")
    });
};


//查询
var queryDriverList = function () {
    var URL = ApiPath.TMSApi.businessData.driverList;
    var requestData = {
        searchValue: $("#searchValueDriverList").val(),
        orgCode: $("#logCenterDriverList").val()
    };
    ajaxHelp.AjaxPost(URL, requestData, successLoadDriverList, null);
};


//重置密码
var resetPwdDriverList = function () {
    var rowData = $("#driverList").datagrid("getSelections");
    $("#resetPwdDriverList").val("");
    $("#confirmPwdDriverList").val("");
    if (!rowData || rowData == "") {
        ds.dialog({
            title: "消息提示",
            content: "请选择司机！",
            icon: "info.png",
            onyes: true
        });
    } else {
        $("#dialog_resetPwdDriverList").dialog("open");
        $("#dialog_resetPwdDriverList").window("center");
    }
};
//重置密码Dialog初始化
$("#dialog_resetPwdDriverList").dialog({
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
var submitResetPwdDriverList = function () {
    var URL = ApiPath.TMSApi.businessData.userReset;
    var rowData = $("#driverList").datagrid("getSelections");
    var resetPwd = $("#resetPwdDriverList").val();
    var requestData = {
        isDriverUser: "Y",
        loginPassword: $("#confirmPwdDriverList").val(),
        userId: rowData[0].loginID
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
    ajaxHelp.AjaxPost(URL, requestData, successSubmitResetPwdDriverList, null);
};
var successSubmitResetPwdDriverList = function () {
    $("#dialog_resetPwdDriverList").dialog("close");
    ds.dialog({
        title: "消息提示",
        content: "重置密码成功！",
        icon: "success.png",
        onyes: true,
        timeout: 2
    });
};


//重置密码取消
var cancelResetPwdDriverList = function () {
    $("#dialog_resetPwdDriverList").dialog("close");
};


//司机新增界面跳转
var addDriverList = function () {
    addTabHref("司机新增", "views/driver/add/driverAdd.html");
};


//司机编辑界面跳转
var editDriverList = function () {
    var rowData = $("#driverList").datagrid("getSelections");
    if (!rowData || rowData == "") {
        ds.dialog({
            title: "消息提示",
            content: "请选择司机！",
            icon: "info.png",
            onyes: true
        });
    } else {
        addTabHref("司机编辑", "views/driver/edit/driverEdit.html");
    }
};


//加载司机列表
loadDriverList();
//获取所属物流中心下拉框
getLogCenterDriverList();
