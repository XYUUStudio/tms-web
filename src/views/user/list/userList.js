/**
 * Created by medlog on 2016/7/5.
 */
var ajaxHelp = new AjaxHelp();

//首次列表加载、翻页、更改页面大小都会触发
var loadUserList = function (pageNumber, pageSize) {
    var URL = ApiPath.TMSApi.account.userList;
    if (pageNumber == undefined || pageNumber == 0) {
        pageNumber = 1;
    }
    if (pageSize == undefined || pageSize == 0) {
        pageSize = 20;
    }
    var requestData = {
        page: pageNumber,
        rows: pageSize,
    };
    ajaxHelp.AjaxPost(URL, requestData, successLoadUserList, null);
}

//成功回调函数
var successLoadUserList = function (resultInfo) {
    console.log(resultInfo);
    $("#userList").datagrid("loadData", resultInfo);
    $("#pp").pagination({
        pageList: [10, 20, 30],
        pageSize: resultInfo.pageSize,
        total: resultInfo.total,
        selected: true,
        onSelectPage: function (pageNumber, pageSize) {
            loadData(pageNumber, pageSize);
        },
        onChangePageSize: function (pageNumber, pageSize) {
            var pageSize = $("#pp").combobox("getValues")
            pageNumber = resultInfo.pageNumber;
            pageSize = resultInfo.pageSize;
            loadData(pageNumber, pageSize);
        },
    });
}

//查询
var searchUser = function () {
    var URL = ApiPath.TMSApi.account.userList;
    var requestData = {
        searchValue: $("#searchValueUser").val(),
        validStatusUser: $("#validStatusUser").val()
    };
    ajaxHelp.AjaxPost(URL, requestData, successDoSearch, null);
}

//用户新增
var addUser = function () {
    addTabHref("用户新增", "views/user/add/userAdd.html");
}

//用户编辑
var editUser = function () {
    var row = $("#userList").datagrid("getSelections");
    if (!row || row == "") {
        $.messager.alert("提示", "请选择需要编辑的用户", "error");
    } else {
        addTabHref("用户编辑", "views/user/edit/userEdit.html");
    }
}

//用户详情
var detailUser = function () {
    addTabHref("用户详情", "views/user/detail/userDetail.html")
}

//排序
var sortByColumn = function (sort, order) {
    var URL = ApiPath.OMSApi.searchQMSMasterList;
    var options = $("#userList").datagrid("getPager").data("pagination").options;
    var currentPage = options.pageNumber;
    var pageSize = options.pageSize;
    var requestData = {
        page: currentPage,
        rows: pageSize,
        sort: sort,
        order: order
    };
    ajaxHelp.AjaxPost(URL, requestData, successDoSearch, null);
}

var getUserEditData = function () {
    var row = $("#userList").datagrid('getSelections');
    return row;
}

//初始化用户注册管理列表
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
    onSortColumn: sortByColumn,//当用户对列排序时触发,参数如下:sort(排序字段名称);order(排序顺序)
    onDblClickCell: detailUser,//当用户双击单元格时触发
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