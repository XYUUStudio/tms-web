/**
 * Created by medlog on 2016/7/7.
 */
var ajaxHelp = new AjaxHelp();

//司机管理-加载页面
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

//司机管理-加载页面成功回调函数
var successLoadDriverList = function (resultInfo) {
    $("#driverList").datagrid("loadData", resultInfo);
    $("#paginationDriverList").pagination({
        pageList: [10, 20, 30],
        pageSize: resultInfo.pageSize,
        total: resultInfo.total,
        selected: true
    });
};

//获取物流中心
var getLogisticsCenter = function () {
    var URL = ApiPath.TMSApi.businessData.logisticsCenter;
    var requestData = {};
    ajaxHelp.AjaxPost(URL, requestData, successGetLogisticsCenter, null);
};

//获取物流中心-成功回调函数
var successGetLogisticsCenter = function (data) {
    console.log(data);
    $.each(data, function (index, item) {
        $("#logisticsCenterDriverList").append("<option value='" + item.id + "' >" + item.name + "</option>")
    });
};

//司机管理-查询
var queryDriverList = function () {
    var URL = ApiPath.TMSApi.businessData.driverList;
    var requestData = {
        searchValue: $("#searchValueDriverList").val(),
        //orgCode: $("#logisticsCenterDriverList").val()
    };
    ajaxHelp.AjaxPost(URL, requestData, successLoadDriverList, null);
};

//司机管理-重置密码
var resetPwdDriverList = function () {
    var rowData = $("#driverList").datagrid("getSelections");
    if (!rowData || rowData == "") {
        $.messager.alert("提示", "请选择司机!", "error");
        return;
    }
    $("#dialog_resetPwdDriverList").dialog("open");
    $("#dialog_resetPwdDriverList").window("center");
};

//司机管理-重置密码Dialog初始化
$("#dialog_resetPwdDriverList").dialog({
    title: "",
    closable: true,
    width: 350,
    height: 230,
    closed: true,
    cache: false,
    modal: true,
    resizable: true,
    loadingMessage: "正在加载..."
});

//司机管理-重置密码提交
var submitResetPwdDriverList = function () {
    var URL = ApiPath.TMSApi.businessData.userReset;
    var rowData = $("#driverList").datagrid("getSelections");
    var requestData = {
        loginPassword: $("#resetPwdDriverList").val(),
        userId: rowData[0].loginID,
        isDriverUser: "Y"
    };
    var confirmPwd = $("#confirmPwdDriverList").val();
    if (requestData.loginPassword == null || requestData.loginPassword == "") {
        $.messager.alert("提示", "请输入重置密码!", "error");
        return;
    }
    if (confirmPwd == null || confirmPwd == "") {
        $.messager.alert("提示", "请输入确认密码!", "error");
        return;
    }
    if (requestData.loginPassword != confirmPwd) {
        $.messager.alert("提示", "重置密码和确认密码必须一致!", "error");
        return;
    }
    ajaxHelp.AjaxPost(URL, requestData, successSubmitResetPwdDriverList, null);
};

//司机管理-重置密码提交成功回调函数
var successSubmitResetPwdDriverList = function () {
    alert("重置密码成功!");
    $("#dialog_resetPwdDriverList").dialog("close");
};

//司机管理-新增
var addDriverList = function () {
    addTabHref("司机新增", "views/driver/add/driverAdd")
};

//司机管理-编辑
var editDriverList = function () {
    addTabHref("司机编辑", "views/driver/edit/driverEdit")
};

//司机管理-详情
var detailDriverList = function () {
    addTabHref("司机详情", "views/driver/detail/driverDetail.html")
};

//司机管理-初始化列表
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
    //onSortColumn: sortByColumn,//当用户对列排序时触发,参数如下:sort(排序字段名称);order(排序顺序)
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

getLogisticsCenter();

loadDriverList();
