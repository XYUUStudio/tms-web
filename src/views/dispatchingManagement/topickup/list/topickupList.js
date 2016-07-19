/**
 * Created by medlog-dev-2 on 2016/7/6.
 */
/**
 * Created by medlog-dev-2 on 2016/7/6.
 */
/**
 * Created by medlog-dev-2 on 2016/7/4.
 */
var pageNumberInfo="";
var pageSizeInfo="";
var loadToPickupList = function(pageNumber, pageSize){
    // 定义post  请求页地址
    pageNumber=pageNumberInfo;
    pageSize=pageSizeInfo;
    var URL = ApiPath.TMSApi.dispatchingManagement.searchDispatchingList;
    if(pageNumber == undefined || pageNumber == 0 ||pageNumber==""){pageNumber = 1;}
    if(pageSize == undefined || pageSize == 0||pageSize==""){pageSize = 20;}
    var requestData = {
        page:pageNumber,
        rows:pageSize,
        status:"CGSTS00060",
        sort:"reqDeliveryDate",
        order:"asc",
        lcOrgCode:userOrgcode,
        consignmentNo: $('#consignmentNoToPickup').val()
    };
    ajaxHelp.AjaxPost(URL,requestData,successToPickupList,null);
}
var successToPickupList = function (resultInfo) {
    $("#toPickupList").datagrid('loadData', resultInfo);
    // var pager = $("#enterprisesList").datagrid('getPager');
    $("#toPickupPagination").pagination({
        pageList:[10,20,30],
        pageSize:resultInfo.pageSize,
        total:resultInfo.total,
        selected:true,
        onSelectPage:function(pageNumber, pageSize){
            pageNumberInfo=pageNumber;
            pageSizeInfo=pageSize;
            loadToPickupList(pageNumber, pageSize);
        },
    });
}
var getToPickup=function () {
    var row = $("#toPickupList").datagrid('getSelections');
    return (row)
}
var ToPickupClose=function () {
    // 关闭当前页
    $("#tabs").tabs('close','待取件');
}


var ToPickupView=function () {
    //编辑数据
    var row = $("#toPickupList").datagrid('getSelections');
    if(!row||row==""){
        ds.dialog({
            title : '消息提示',
            content : '请选择需要派单的订单！',
            onyes:true,
            icon : "info.png",
        });
    }else {
        addTabHref('改派','views/dispatchingManagement/topickup/topickupmanage/topickupView.html');
    }
}
$("#toPickupList").datagrid({
    striped: true,
    checkOnSelect:true,
    rownumbers:true,
    nowrap: true,
    singleSelect:true,
    pagination:true,
    fitColumns:true,
    loadMsg:"正在加载，请稍等。。。。。。",
    view: detailview,
    onDblClickCell:ToPickupView,
    detailFormatter: function(rowIndex, rowData){//可以和onExpandRow合用
        return false;
    }
});
//载入页执行  列表、时间函数
loadToPickupList();

