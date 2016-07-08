/**
 * Created by medlog-dev-2 on 2016/7/6.
 */
/**
 * Created by medlog-dev-2 on 2016/7/6.
 */
/**
 * Created by medlog-dev-2 on 2016/7/6.
 */
/**
 * Created by medlog-dev-2 on 2016/7/4.
 */
var ajaxHelp = new AjaxHelp();
//获取分页信息值
//首次列表加载、翻页、更改页面大小都会触发

var loadDispatchList = function(pageNumber, pageSize){
    // 定义post  请求页地址
    var URL = ApiPath.TMSApi.dispatchingManagement.searchDispatchingList;
    if(pageNumber == undefined || pageNumber == 0 ){pageNumber = 1;}
    if(pageSize == undefined || pageSize == 0 ){pageSize = 20;}
    var requestData = {
        page:pageNumber,
        rows:pageSize,
        lcOrgCode:userOrgcode
    };
    ajaxHelp.AjaxPost(URL,requestData,successToPickupList,null);
}
var successToPickupList = function (resultInfo) {
    $("#dispatchList").datagrid('loadData', resultInfo);
    // var pager = $("#enterprisesList").datagrid('getPager');
    $("#dispatchListPagination").pagination({
        pageList:[10,20,30],
        pageSize:resultInfo.pageSize,
        total:resultInfo.total,
        selected:true,
        onSelectPage:function(pageNumber, pageSize){
            loadData(pageNumber, pageSize);
        },
        onChangePageSize:function(pageNumber, pageSize){
            var pageSize= $("#dispatchListPagination").combobox('getValues')
            pageNumber=resultInfo.pageNumber;
            pageSize=resultInfo.pageSize;
            loadData(pageNumber, pageSize);
        },
    });
}
//排序回调函数
var doSort = function(sort, order){
    var URL = ApiPath.TMSApi.dispatchingManagement.searchDispatchingList;
    var options = $("#dispatchList").datagrid('getPager').data("pagination").options;
    var currPage = options.pageNumber;
    var pageSize = options.pageSize;
    var requestData = {page:currPage, rows:pageSize,sort:sort,order:order};
    ajaxHelp.AjaxPost(URL,requestData,successPendingordersListDoSearch,null);
}
//查询
var searchToPickup = function(){
    var URL = ApiPath.TMSApi.dispatchingManagement.searchDispatchingList;
    var requestData = {
        consignmentNo: $('#consignmentNoToPicku').val(),
        status:"CGSTS00060",
        lcOrgCode:userOrgcode
    };
    ajaxHelp.AjaxPost(URL,requestData,successToPickupListDoSearch,null);
}
//成功后回调函数

// 按钮页面跳转

var dispatchList=function () {
    var row = $("#dispatchList").datagrid('getSelections');
    return (row)
}
var dispatchCancel=function () {
    //取消订单
    var row = $("#dispatchList").datagrid('getSelections');
    if(!row||row==""){
        $.messager.alert('提示', "请选择需要取消的订单！", "error");
    }else {
        addTabHref('取消','views/dispatchingManagement/dispatch/cancel/dispatchcancel.html');
    }
}
var dispatchReassign=function () {
    //改派订单
    var row = $("#dispatchList").datagrid('getSelections');
    if(!row||row==""){
        $.messager.alert('提示', "请选择需要修改的订单！", "error");
    }else {
        addTabHref('改单','views/dispatchingManagement/dispatch/reassign/dispatchreassign.html');
    }
}
var dispatchView=function () {
    //运单详情
    addTabHref('运单详情','views/dispatchingManagement/dispatch/view/dispatchview.html');
}
$("#dispatchList").datagrid({
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
    onDblClickCell:dispatchView,
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
var getEnterprisesSelect=function () {
        //获取寄件企业下拉框
    var URL = ApiPath.TMSApi.businessData.enterprisesList;
    var requestData = {
    };
    ajaxHelp.AjaxPost(URL,requestData,successEnterprisesSelect,null);
}
var successEnterprisesSelect=function (data) {
    $.each(data.rows, function (index,item ) {
        $("#ceOrgNameDispatchList").append(" <option value='"+item.cECode+"' >"+item.cEName+"</option>")
    })
}
var getAppendTimeDispatchSelect=function () {
    //获取追加时间段
    var URL = ApiPath.TMSApi.dictionary.GetDictionary;
    var requestData = {
        dictTypeCode:"DLRQTM"
    };
    ajaxHelp.AjaxPost(URL,requestData,successAppendTimeDispatchSelect,null);
}
var successAppendTimeDispatchSelect=function (data) {
        console.log(data)
    $.each(data.dictValueList, function (index,item ) {
        $("#appendTimeDispatchList").append(" <option value='"+item.dictValueCode+"' >"+item.dictValueName+"</option>")
    })
}
var  gerStatusDispatchSelect=function () {
    //获取状态下拉框
    var URL = ApiPath.TMSApi.systemData.queryType;
    var requestData = {};
    ajaxHelp.AjaxPost(URL,requestData,successStatusDispatchSelect,null);
}
var successStatusDispatchSelect=function (data) {
    $.each(data, function (index,item ) {
        $("#statusDispatchList").append(" <option value='"+item.statusCode+"' >"+item.statusName+"</option>")
    })
}
var getConsignmentSourceDispatchSelect=function () {
      //获取订单来源下拉框
    var URL = ApiPath.TMSApi.dictionary.GetDictionary;
    var requestData = {
        dictTypeCode:"CSGNSR"
    };
    ajaxHelp.AjaxPost(URL,requestData,successConsignmentSourceDispatchSelect,null);
}
var successConsignmentSourceDispatchSelect=function (data) {
    $.each(data.dictValueList, function (index,item ) {
        $("#consignmentSourceDispatchList").append(" <option value='"+item.dictValueCode+"' >"+item.dictValueName+"</option>")
    })
}
var getSelectDispatchList=function () {
    getEnterprisesSelect();
    gerStatusDispatchSelect();
    getAppendTimeDispatchSelect();
    getConsignmentSourceDispatchSelect()
}
var searchDispatchList=function () {
    //查询按钮
    var  reqDeliveryDateFrom="";
    var  createDateFrom="";
    var  createDateEnd="";
    if($("#createDateFromDispatchList").datebox('getValue')){
        var createDateFrom=$("#createDateFromDispatchList").datebox('getValue')+" 00:00:00";
    }
    if($("#createDateFromDispatchList").datebox('getValue')){
        var createDateEnd=$("#createDateFromDispatchList").datebox('getValue')+" 23:59:59";
    }
    if($("#reqDeliveryDateFromDispatchList").datebox('getValue')){
        var appendTimeDispatchList=$("#appendTimeDispatchList").val();
        var reqDeliveryDateFrom=$("#reqDeliveryDateFromDispatchList").datebox('getValue')+""+$("#appendTimeDispatchList").find("option:selected").text()+":00"
    }
    var URL = ApiPath.TMSApi.dispatchingManagement.searchDispatchingList;
    var requestData = {
        page:1,
        rows:20,
        consignmentNo:$("#consignmentNoDispatchList").val(),
        senderCompany:$("#senderCompanyDispatchList").val(),
        receiverCompany:$("#receiverCompanyDispatchList").val(),
        ceOrgCode:$("#ceOrgNameDispatchList").val(),
        senderContactName:$("#senderContactNameDispatchList").val(),
        status:$("#statusDispatchList").val(),
        createDateFrom:createDateFrom,
        createDateEnd:createDateEnd,
        reqDeliveryDateFrom:reqDeliveryDateFrom,
        consignmentSource:$("#consignmentSourceDispatchList").val(),
        lcOrgCode:userOrgcode
    };
    ajaxHelp.AjaxPost(URL,requestData,successToPickupList,null);
}
getSelectDispatchList();
loadDispatchList();

