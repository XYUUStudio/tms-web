/**
 * Created by medlog-dev-2 on 2016/7/7.
 */
var pram=dispatchList();
console.log(pram)
var getDispatchCancel=function () {
    var URL = ApiPath.TMSApi.dictionary.GetDictionary;
    var requestData = {
        dictTypeCode:"CGCLRS"
    };
    ajaxHelp.AjaxPost(URL,requestData,successGetPickupDriverId,null);
}
var successGetPickupDriverId=function (data) {
    $.each(data.dictValueList,function (index,item) {
        $("#cancelReasonDispatchCancel").append(" <option value='"+item.dictTypeCode+"' >"+item.dictValueName+"</option>")
    });
    $("#remarkDispatchCancel").val(data.dictValueList[0].dictValueName)
};
var getDispatchCancelDetail=function () {
    //获取订单详情
    var URL = ApiPath.TMSApi.dispatchingManagement.consignmentDetail;
    var requestData = {
        consignmentNo:pram[0].consignmentNo
    };
    ajaxHelp.AjaxPost(URL,requestData,successGetDispatchCancelDetail,null);
}
var successGetDispatchCancelDetail=function (data) {
    // 赋值
    $("#senderCompanyDispatchCancel").html(data.senderCompany);
    $("#receiverCompanyDispatchCancel").html(data.receiverCompany);
    $("#reqDeliveryDateDispatchCancel").html(data.reqDeliveryDate);
    $("#senderContactNameDispatchCancel").html(data.senderContactName);
    $("#senderMobileDispatchCancel").html(data.senderMobile);
    $("#senderCompanyDispatchCancelView").html(data.senderCompany);
    $("#senderAddressDispatchCancel").html(data.senderprovincename+" "+data.sendercityname+" "+data.senderdistrictname+" "+data.senderAddress);
    $("#receiverContactNameDispatchCancel").html(data.receiverContactName);
    $("#receiverMobileDispatchCancel").html(data.receiverMobile);
    $("#receiverCompanyDispatchCancelView").html(data.receiverCompany);
    $("#receiverAddressDispatchCancel").html(data.senderprovincename+" "+data.sendercityname+" "+data.senderdistrictname+" "+data.senderAddress);
    $("#reqDeliveryDateDispatchCancelView").html(data.reqDeliveryDate);
    $("#remarkDispatchCancel").html(data.remark);
    $("#pickupdriverbynameDispatchCancelOrigin").html(data.pickupdriverbyname);
    $("#consignmentNoDispatchCancel").html(data.consignmentNo+" "+ data.statusname);
    $("#ceorgnameDispatchCancel").html(data.ceorgname);
    $("#lcorgnameDispatchCancel").html(data.lcorgname);
    $("#createDateDispatchCancel").html(data.createDate);
    $("#pickupdriverbynameDispatchCancel").html(data.pickupdriverbyname);
    $("#dispatchbynameDispatchCancel").html(data.dispatchbyname);
    $("#submitbynameDispatchCancel").html(data.submitbyname)
    $("#customerSpecialNoteDispatchCancel").html(data.customerSpecialNote)
    if(data.cgodRec){
        $("#recordDispatchCancel").attr('src',data.cgodRec.url)
    }else {
        $("#recordDispatchCancel").hide()
    }
};
var verification=function () {
    //验证
    var result=true;
    if($("#pickupDriverIdDispatchCancel").val()==""){
        ds.dialog({
            title : '消息提示',
            content : '请选择取件司机！',
            onyes:true,
            icon : "info.png",
        });
        result=false
    }
    return  result;
};
var changeRemarkDispatchCancel=function () {
    $("#remarkDispatchCancel").val($("#cancelReasonDispatchCancel").find("option:selected").text());
};
var DispatchCancelSubmitAdd=function () {
    //提交
    if(verification()){
        var URL = ApiPath.TMSApi.dispatchingManagement.consignmentCancel;
        var requestData={
            consignmentNo:pram[0].consignmentNo,
            eventReasonCode:$("#cancelReasonDispatchCancel").val(),
            eventReasonDesc:$("#cancelReasonDispatchCancel").find("option:selected").text(),
            remark:$("#remarkDispatchCancel").val()

        }
        ajaxHelp.AjaxPost(URL,requestData,successDispatchCancelSubmitAdd,null);
    }
};
var DispatchCancelSubmitClose=function () {
    //关闭取消页
    $("#tabs").tabs('close','取消');
};
var successDispatchCancelSubmitAdd=function (data) {
    ds.dialog({
        title : '消息提示',
        content : '提交成功！',
        icon : "success.png",
        width:'200',
        height:'50',
        timeout:1
    });
    setTimeout(function(){
        $("#tabs").tabs('close','取消');
        loadDispatchList();
    },2000)
};
getDispatchCancelDetail()
getDispatchCancel();
