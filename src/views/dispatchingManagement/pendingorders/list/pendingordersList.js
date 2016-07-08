/**
 * Created by medlog-dev-2 on 2016/7/6.
 */
/**
 * Created by medlog-dev-2 on 2016/7/4.
 */
var ajaxHelp = new AjaxHelp();
//获取分页信息值
//首次列表加载、翻页、更改页面大小都会触发

var loadPendingordersList = function(pageNumber, pageSize){
    // 定义post  请求页地址
    var URL = ApiPath.TMSApi.dispatchingManagement.searchDispatchingList;
    if(pageNumber == undefined || pageNumber == 0 ){pageNumber = 1;}
    if(pageSize == undefined || pageSize == 0 ){pageSize = 20;}
    var requestData = {
        page:pageNumber,
        rows:pageSize,
        status:"CGSTS00050",
        lcOrgCode:userOrgcode
    };
    ajaxHelp.AjaxPost(URL,requestData,successPendingordersListDoSearch,null);
}
//排序回调函数
var doSort = function(sort, order){
    var URL = ApiPath.TMSApi.dispatchingManagement.searchDispatchingList;
    var options = $("#pendingOrdersList").datagrid('getPager').data("pagination").options;
    var currPage = options.pageNumber;
    var pageSize = options.pageSize;
    var requestData = {page:currPage, rows:pageSize,sort:sort,order:order};
    ajaxHelp.AjaxPost(URL,requestData,successPendingordersListDoSearch,null);
}
//查询
var searchPendingOrders = function(){
    var URL = ApiPath.TMSApi.dispatchingManagement.searchDispatchingList;
    var requestData = {
        consignmentNo: $('#consignmentNoPendingOrders').val(),
        lcOrgCode:userOrgcode,
        status:"CGSTS00050",
    };
    ajaxHelp.AjaxPost(URL,requestData,successPendingordersListDoSearch,null);
}
//成功后回调函数
var successPendingordersListDoSearch = function (resultInfo) {
    console.log(resultInfo)
    $("#pendingOrdersList").datagrid('loadData', resultInfo);
    // var pager = $("#enterprisesList").datagrid('getPager');
    $("#pendingOrdersPagination").pagination({
        pageList:[10,20,30],
        pageSize:resultInfo.pageSize,
        total:resultInfo.total,
        selected:true,
        onSelectPage:function(pageNumber, pageSize){
            searchPendingOrders(pageNumber, pageSize);
        },
        onChangePageSize:function(pageNumber, pageSize){
            var pageSize= $("#pendingOrdersPagination").combobox('getValues')
            pageNumber=resultInfo.pageNumber;
            pageSize=resultInfo.pageSize;
            searchPendingOrders(pageNumber, pageSize);
        },
    });
}
// 按钮页面跳转

var getPendingOrdersDate=function () {
    var row = $("#pendingOrdersList").datagrid('getSelections');
    return (row)
}
var sendOrders=function () {
    //编辑数据
    var row = $("#pendingOrdersList").datagrid('getSelections');
    if(!row||row==""){
        $.messager.alert('提示', "请选择需要派单的订单！", "error");
    }else {
        addTabHref('派单','views/dispatchingManagement/pendingorders/order/receiving.html');
    }
}
$("#pendingOrdersList").datagrid({
    striped: true,
    checkOnSelect:true,
    rownumbers:true,
    nowrap: true,
    singleSelect:true,
    pagination:true,
    fitColumns:true,
    iconCls:"icon-save",
    loadMsg:"正在加载，请稍等。。。。。。",
    onSortColumn:doSort,
    view: detailview,
    onDblClickCell:sendOrders,
    detailFormatter: function(rowIndex, rowData){//可以和onExpandRow合用
        return '<table><tr>' +
            '<td rowspan=2 style="border:0"></td>' +
            '<td style="border:0">' +
            '<p>sono: ' + rowData.sono + '</p>' +
            '<p>soTypeName: ' + rowData.soTypeName + '</p>' +
            '</td>' +
            '</tr></table>';
    }
});
//载入页执行  列表、时间函数
var userOrgcode = $.cookie("userOrgcode");

loadPendingordersList();

