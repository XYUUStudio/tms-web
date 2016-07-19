/**
 * Created by medlog-dev-2 on 2016/7/6.
 */
var ajaxHelp = new AjaxHelp();
var userOrgcode = $.cookie("userOrgcode");
var  reqDeliveryDateFrom="";
var  createDateFrom="";
var  createDateEnd="";
var pageNumberInfo="";
var pageSizeInfo="";
//载入页执行  列表、时间函数
var getEnterprisesSelect=function () {
    //获取寄件企业下拉框
    var URL = ApiPath.TMSApi.businessData.enterprisesList;
    var requestData = {
    };
    ajaxHelp.AjaxPost(URL,requestData,successEnterprisesSelect,null);
}
var successEnterprisesSelect=function (data) {
    console.log(data)
    $.each(data.rows, function (index,item ) {
        $("#ceOrgNameDispatchList").append(" <option value='"+item.enterpriseOrgCode+"' >"+item.cEName+"</option>")
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
//查询条件
var QueryDispatchList=function (pageNumber, pageSize) {
    if($("#createDateFromDispatchList").val()){
         createDateFrom=$("#createDateFromDispatchList").datebox('getValue')+" 00:00:00";
    }
    if($("#createDateFromDispatchList").val()){
         createDateEnd=$("#createDateEndDispatchList").datebox('getValue')+" 23:59:59";
    }
    if($("#reqDeliveryDateFromDispatchList").val()){
        var appendTimeDispatchList=$("#appendTimeDispatchList").val();
         reqDeliveryDateFrom=$("#reqDeliveryDateFromDispatchList").datebox('getValue')+""+$("#appendTimeDispatchList").find("option:selected").text()+":00"
    }
    if(pageNumber == undefined || pageNumber == 0||pageNumber=="" ){pageNumber = 1;}
    if(pageSize == undefined || pageSize == 0|| pageSize==""){pageSize = 20;}
    var requestData = {
        page:pageNumber,
        rows:pageSize,
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
        lcOrgCode:userOrgcode,
        sort:"updateDate",
        order:"desc"
    };
    return requestData;
}
var loadDispatchList = function(pageNumber, pageSize){
    // 定义post  请求页地址
    var URL = ApiPath.TMSApi.dispatchingManagement.searchDispatchingList;
    pageNumber=pageNumberInfo;
    pageSize=pageSizeInfo;
    var requestData = QueryDispatchList(pageNumber,pageSize)
    ajaxHelp.AjaxPost(URL,requestData,successDispatchList,null);
}
var successDispatchList = function (resultInfo) {
    console.log(resultInfo)
    $("#dispatchList").datagrid('loadData', resultInfo);
    $("#dispatchListPagination").pagination({
        pageList:[10,20,30],
        pageSize:resultInfo.pageSize,
        total:resultInfo.total,
        selected:true,
        onSelectPage:function(pageNumber, pageSize){
            // loadData(pageNumber, pageSize);
            pageNumberInfo=pageNumber;
            pageSizeInfo=pageSize;
            loadDispatchList(pageNumber, pageSize);
        },
    });
}

//查询
// var searchDispatchList=function () {
//     //查询按钮
//     var requestData =QueryDispatchList();
//     var URL = ApiPath.TMSApi.dispatchingManagement.searchDispatchingList;
//     ajaxHelp.AjaxPost(URL,requestData,successDispatchList,null);
// };
var dispatchList=function () {
    var row = $("#dispatchList").datagrid('getSelections');
    return (row)
}
var dispatchCancel=function () {
    //取消订单
    var row = $("#dispatchList").datagrid('getSelections');
    if(!row||row==""){
        ds.dialog({
            title : '消息提示',
            content : '请选择需要取消的订单！',
            onyes:true,
            icon : "info.png"
        });
    }else {
        addTabHref('取消','views/dispatchingManagement/dispatch/cancel/dispatchcancel.html');
    }
}
var dispatchClose=function () {
    $("#tabs").tabs('close','调度');
}
var dispatchReassign=function () {
    //改派订单
    var row = $("#dispatchList").datagrid('getSelections');
    if(!row||row==""){
        ds.dialog({
            title : '消息提示',
            content : '请选择需要修改的订单！',
            onyes:true,
            icon : "info.png"
        });
    }else {
        addTabHref('改单','views/dispatchingManagement/dispatch/reassign/dispatchreassign.html');
    }
}
var dispatchView=function () {
    //运单详情
    addTabHrefUpdate('运单详情','views/dispatchingManagement/dispatch/view/dispatchview.html');
}

var exportDispatchList=function () {
    //导出条件过滤
   var exportURL = ApiPath.TMSApi.dispatchingManagement.export;
    var exportInfo=GetExportVal()

    loadDispatchList();
    window.open(exportURL+"?"+exportInfo)
}
var GetExportVal =  function () {
        var string = "";
        string= "sort="+"updateDate";
        string= string+"&lcOrgCode="+userOrgcode;
        string= string+"&order="+"desc";
        if ($("#consignmentNoDispatchList").val()){
            string = string+"&consignmentNo="+$("#consignmentNoDispatchList").val();
        }
        if($("#senderCompanyDispatchList").val()){
            string= string+"&senderCompany="+$("#senderCompanyDispatchList").val();
        }
        if($("#receiverCompanyDispatchList").val()){
            string= string+"&receiverCompany="+$("#receiverCompanyDispatchList").val();
        }
        if($("#ceOrgNameDispatchList").val()){
            string= string+"&ceOrgCode="+$("#ceOrgNameDispatchList").val();
        }
        if($("#senderContactNameDispatchList").val()){
            string= string+"&senderContactName="+$("#senderContactNameDispatchList").val();
        }
        if($("#statusDispatchList").val()){
            string= string+"&status="+$("#statusDispatchList").val();
        }
        if($("#createDateFromDispatchList").val()){
            string= string+"&createDateFrom="+$("#createDateFromDispatchList").datebox('getValue')+" 00:00:00";
        }
        if($("#createDateFromDispatchList").val()){
            string= string+"&createDateEnd="+$("#createDateEndDispatchList").datebox('getValue')+" 23:59:59";
        }
        if($("#reqDeliveryDateFromDispatchList").val()){
            string= string+"&reqDeliveryDateFrom="+$("#reqDeliveryDateFromDispatchList").datebox('getValue')+""+$("#appendTimeDispatchList").find("option:selected").text()+":00";
        }
        if($("#consignmentSourceDispatchList").val()){
            string= string+"&consignmentSource="+$("#consignmentSourceDispatchList").val();
        }
      return string;
}
// datebox属性设置
$("#createDateFromDispatchList").datebox({
     width:'90px'
});
$("#createDateEndDispatchList").datebox({
    width:'90px'
});
var dispatchListLoad=function () {
    getEnterprisesSelect();
    gerStatusDispatchSelect();
    getAppendTimeDispatchSelect();
    getConsignmentSourceDispatchSelect()
    loadDispatchList();
};
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
    view: detailview,
    onDblClickCell:dispatchView,
    detailFormatter: function(rowIndex, rowData){//可以和onExpandRow合用
        return false;
    }
});
dispatchListLoad();


