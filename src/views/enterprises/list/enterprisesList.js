/**
 * Created by medlog-dev-2 on 2016/7/4.
 */
var pageNumberInfo = "";
var pageSizeInfo = "";

//首次列表加载、翻页、更改页面大小都会触发
var loadEnterprisesList = function (pageNumber, pageSize) {
    // 定义post  请求页地址
    pageNumber = pageNumberInfo;
    pageSize = pageSizeInfo;
    var URL = ApiPath.TMSApi.businessData.enterprisesList;
    if (pageNumber == undefined || pageNumber == 0 || pageNumber == "") {
        pageNumber = 1;
    }
    if (pageSize == undefined || pageSize == 0 || pageSize == "") {
        pageSize = 20;
    }
    var requestData = {
        page: pageNumber,
        rows: pageSize,
        searchValue: $('#searchValueEnterprises').val(),
        validStatus: $('#validStatusEnterprises').val(),
    };
    ajaxHelp.AjaxPost(URL, requestData, successDoSearch, null);
}

//成功后回调函数
var successDoSearch = function (resultInfo) {
    $("#enterprisesList").datagrid('loadData', resultInfo);
    $("#enterprisesPagination").pagination({
        pageList: [10, 20, 30],
        pageSize: resultInfo.pageSize,
        total: resultInfo.total,
        selected: true,
        onSelectPage: function (pageNumber, pageSize) {
            pageNumber = pageNumberInfo;
            pageSize = pageSizeInfo;
            loadEnterprisesList(pageNumber, pageSize);
        }
    });
};
// 按钮页面跳转
var AddEnterprises = function () {
    //新增数据
    addTabHref('企业新增', 'views/enterprises/add/enterprisesAdd.html')
};

var Viewenterprises = function () {
    //详情页面
    addTabHrefUpdate('企业详情', 'views/enterprises/view/enterprisesView.html')
};
var getEnterprisesDate = function () {
    var row = $("#enterprisesList").datagrid('getSelections');
    return (row)
};
var Editenterprises = function () {
    //编辑数据
    var row = $("#enterprisesList").datagrid('getSelections');
    if (!row || row == "") {
        $.messager.alert('提示', "请选择需要编辑的报台！", "error");
    } else {
        addTabHref('企业编辑', 'views/enterprises/edit/enterprisesEdit.html');
    }
};
$("#enterprisesList").datagrid({
    striped: true,
    checkOnSelect: true,
    rownumbers: true,
    nowrap: true,
    singleSelect: true,
    pagination: true,
    fitColumns: true,
    iconCls: "icon-save",
    loadMsg: "正在加载，请稍等。。。。。。",
    view: detailview,
    onDblClickCell: Viewenterprises,
    detailFormatter: function (rowIndex, rowData) {//可以和onExpandRow合用
        return false
    }
});
$("#validStatusEnterprises").combobox({
    panelHeight: '70px'
});
//载入页执行  列表、时间函数
loadEnterprisesList();


