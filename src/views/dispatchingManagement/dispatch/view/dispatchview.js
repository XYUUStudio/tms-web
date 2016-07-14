/**
 * Created by medlog-dev-2 on 2016/7/7.
 */

var ajaxHelp = new AjaxHelp();
var pram=dispatchList();// 单个订单号
var orderView=new Object(); //订单详情
var rackRecordList=new  Object();  //跟踪记录详情
 var trackRecordShow=function () {
     //切换跟踪记录
    $("#orderDetail").css("background","#f5f5f5");
    $("#trackRecord").css("background","#f79449");
    $("#assessmentDetails").css("background","#f5f5f5");
    $("#orderPassBox").css("background","#f5f5f5");
    $("#trackRecord_Span").css("color","#fff");
    $("#orderDetail_Span").css("color","#999");
    $("#assessmentDetails_Span").css("color","#999");
    $("#orderPassBox_Span").css("color","#999");
    $("#trackRecordShow").show();
    $("#orderDetailShow").hide();
    $("#assessmentDetailsShow").hide();
    $("#orderPassBoxShow").hide();
     $("#trackRecordList").datagrid('loadData',rackRecordList)
}
var assessmentDetailsShow=function () {
    $("#assessmentDetails").css("background","#f79449");
    $("#orderDetail").css("background","#f5f5f5");
    $("#trackRecord").css("background","#f5f5f5");
    $("#orderPassBox").css("background","#f5f5f5");
    $("#assessmentDetails_Span").css("color","#fff");
    $("#trackRecord_Span").css("color","#999");
    $("#orderDetail_Span").css("color","#999");
    $("#orderPassBox_Span").css("color","#999");
    $("#assessmentDetailsShow").show();
    $("#trackRecordShow").hide();
    $("#orderDetailShow").hide();
    $("#orderPassBoxShow").hide();
}
var orderPassBox=function () {
    //切换周转箱
    $("#orderPassBox").css("background","#f79449");
    $("#orderDetail").css("background","#f5f5f5");
    $("#trackRecord").css("background","#f5f5f5");
    $("#assessmentDetails").css("background","#f5f5f5");
    $("#orderPassBox_Span").css("color","#fff");
    $("#trackRecord_Span").css("color","#999");
    $("#orderDetail_Span").css("color","#999");
    $("#assessmentDetails_Span").css("color","#999");
    $("#orderPassBoxShow").show();
    $("#trackRecordShow").hide();
    $("#orderDetailShow").hide();
    $("#assessmentDetailsShow").hide();
    $("#orderPassBoxList").datagrid('loadData',orderView.consignmentLgCtnViewList)
}
var orderDetailShow=function () {
    $("#orderDetail").css("background","#f79449");
    $("#trackRecord").css("background","#f5f5f5");
    $("#assessmentDetails").css("background","#f5f5f5");
    $("#orderPassBox").css("background","#f5f5f5");
    $("#orderDetail_Span").css("color","#fff");
    $("#trackRecord_Span").css("color","#999");
    $("#assessmentDetails_Span").css("color","#999");
    $("#orderPassBox_Span").css("color","#999");
    $("#orderDetailShow").show();
    $("#assessmentDetailsShow").hide();
    $("#orderPassBoxShow").hide();
    $("#trackRecordShow").hide();

}
var getOrderDetail=function () {
    var URL = ApiPath.TMSApi.dispatchingManagement.consignmentDetail;
    var requestData = {
        consignmentNo:pram[0].consignmentNo
    };
    ajaxHelp.AjaxPost(URL,requestData,successGetOrderDetail,null);
}

var successGetOrderDetail=function (data) {
    orderView=data;
    $("#ceorgnameOrderDetail").html(data.ceorgname);
    $("#lcorgnameOrderDetail").html(data.lcorgname);
    $("#submitbynameOrderDetail").html(data.submitbyname);
    $("#pickupdriverbynameOrderDetail").html(data.pickupdriverbyname);
    $("#dispatchbynameOrderDetail").html(data.dispatchbyname);
    $("#updatebynameOrderDetail").html(data.updatebyname);
    $("#deliverySignaturePasswordOrderDetail").html(data.deliverySignaturePassword);
    $("#createDateOrderDetail").html(data.createDate);
    $("#updateDateOrderDetail").html(data.updateDate);
    $("#senderContactNameOrderDetail").html(data.senderContactName);
    $("#senderMobileOrderDetail").html(data.senderMobile);
    $("#senderCompanyOrderDetail").html(data.senderCompany);
    $("#senderAddressOrderDetail").html(data.senderprovincename+" "+data.sendercityname+" "+data.senderdistrictname+" "+data.senderAddress);
    $("#receiverContactNameOrderDetail").html(data.receiverContactName);
    $("#receiverMobileOrderDetail").html(data.receiverMobile);
    $("#receiverCompanyOrderDetail").html(data.receiverCompany);
    $("#receiverAddressOrderDetail").html(data.receiverprovincename+" "+data.receivercityname+" "+data.receiverdistrictname+" "+data.receiverCityCode);
    $("#patientNameOrderDetail").html(data.patientName);
    $("#patientHPBedNoOrderDetail").html(data.patientHPBedNo);
    $("#patientHPNoOrderDetail").html(data.patientHPNo);
    $("#remarkOrderDetail").html(data.customerSpecialNote)

}
var getConsignmentEventDetail=function () {
    // 获取运单跟踪记录API
    var URL = ApiPath.TMSApi.dispatchingManagement.consignmentConsignmentEventDetail;
    var requestData = {
        consignmentNo:pram[0].consignmentNo
    };
    ajaxHelp.AjaxPost(URL,requestData,successGetConsignmentEventDetail,null);
}
var successGetConsignmentEventDetail=function (data) {
    rackRecordList=data;
}
var getAssessmentDetailsDetail=function () {
    //获取评价详情API
    var URL = ApiPath.TMSApi.dispatchingManagement.consignmentQueryEvaluate;
    console.log(pram[0].consignmentNo)
    var requestData = {
        consignmentNo:pram[0].consignmentNo
    };
    ajaxHelp.AjaxPost(URL,requestData,successGetAssessmentDetailsDetail,null);
}
var successGetAssessmentDetailsDetail=function (data) {
     //赋值
     $("#dvvcode1nameOrderDetail").html(data.evaluationItemValueName1);
     $("#EvaluationItemRemark1OrderDetail").html(data.evaluationItemRemark1);
    if(data.attachment.length!=0){
        $('.imgViewCO').html('<img src="' + data.attachment[0].url + '" alt="" width="150" height="150" />')
    }
    $("#dvvcode2nameOrderDetail").html(data.evaluationItemValueName2);
    $("#dvvcode3nameOrderDetail").html(data.evaluationItemValueName3);
    $("#dvvcode4nameOrderDetail").html(data.evaluationItemValueName4);
    $("#dvvcode5nameOrderDetail").html(data.evaluationItemValueName5);
}
var orderDetailLoad=function () {
    //获取运单详情
    orderDetailShow();
    getOrderDetail();
    getConsignmentEventDetail();
    getAssessmentDetailsDetail();
    $("#consignmentNoDetailsShow").html(pram[0].consignmentNo+" "+ pram[0].statusname)
}

$("#trackRecordList").datagrid({
    striped: true,
    nowrap: true,
    singleSelect:true,
    pagination:true,
    fitColumns:true,
    iconCls:"icon-save",
    loadMsg:"正在加载，请稍等。。。。。。",
    view: detailview,
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
$("#orderPassBoxList").datagrid({
    striped: true,
    nowrap: true,
    singleSelect:true,
    pagination:true,
    fitColumns:true,
    iconCls:"icon-save",
    loadMsg:"正在加载，请稍等。。。。。。",
    view: detailview,
    detailFormatter: function(rowIndex, rowData){//可以和onExpandRow合用
        return '<table><tr>' +
            '<td rowspan=2 style="border:0"></td>'+
            '<td style="border:0">' +
            '<p>sono: ' + rowData.sono + '</p>' +
            '<p>soTypeName: ' + rowData.soTypeName + '</p>' +
            '</td>' +
            '</tr></table>';
    }
});
orderDetailLoad();
