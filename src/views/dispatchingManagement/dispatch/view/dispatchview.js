/**
 * Created by medlog-dev-2 on 2016/7/7.
 */
 var trackRecordShow=function () {
    $("#orderDetail").css("background","#f5f5f5");
    $("#trackRecord").css("background","#f79449");
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
var assessmentDetailsShow=function () {

}

var orderPassBox=function () {

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

var orderDetailLoad=function () {
    //获取运单详情
    orderDetailShow();
}
orderDetailLoad();
