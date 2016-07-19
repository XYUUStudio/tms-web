/**
 * Created by medlog-dev-2 on 2016/7/6.
 */
/**
 * Created by medlog-dev-2 on 2016/7/4.
 */
var pageNumberInfo="";
var pageSizeInfo="";
//获取页面查询条件
var getPendingOrdersList=function (pageNumber, pageSize) {
    if(pageNumber == undefined || pageNumber == 0|| pageNumber==""){pageNumber = 1;}
    if(pageSize == undefined || pageSize == 0|| pageSize=="" ){pageSize = 20;}
    var requestData = {
        consignmentNo: $('#consignmentNoPendingOrders').val(),
        lcOrgCode:userOrgcode,
        status:"CGSTS00050",
        page:pageNumber,
        rows:pageSize,
        sort:"reqDeliveryDate",
        order:"asc"
    };
    return requestData;
}

var loadPendingordersList = function(pageNumber, pageSize){
    // 定义post  请求页地址
    pageNumber= pageNumberInfo;
    pageSize=pageSizeInfo;
    var URL = ApiPath.TMSApi.dispatchingManagement.searchDispatchingList;
    var requestData = getPendingOrdersList(pageNumber, pageSize);
    ajaxHelp.AjaxPost(URL,requestData,successPendingordersListDoSearch,null);
}
// //查询
// var searchPendingOrders = function(){
//     var URL = ApiPath.TMSApi.dispatchingManagement.searchDispatchingList;
//     var requestData = getPendingOrdersList();
//     ajaxHelp.AjaxPost(URL,requestData,successPendingordersListDoSearch,null);
// }
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
            pageNumberInfo=pageNumber;
            pageSizeInfo=pageSize;
            loadPendingordersList(pageNumber, pageSize);
        }
    });
}
// 按钮页面跳转

var getPendingOrdersDate=function () {
    var row = $("#pendingOrdersList").datagrid('getSelections');
    return (row)
}
var sendClose=function () {
    //关闭菜单
    $("#tabs").tabs('close','待接单');
}
var sendOrders=function () {
    //编辑数据
    var row = $("#pendingOrdersList").datagrid('getSelections');
    if(!row||row==""){
        ds.dialog({
            title : '消息提示',
            content : '请选择需要派单的订单！',
            onyes:true,
            icon : "info.png"
        });
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
    view: detailview,
    onDblClickCell:sendOrders,
    detailFormatter: function(rowIndex, rowData){//可以和onExpandRow合用
        return  false;
    }
});
//载入页执行  列表、时间函数
loadPendingordersList();

