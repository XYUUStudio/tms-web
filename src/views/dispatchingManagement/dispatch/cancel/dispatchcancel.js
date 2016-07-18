/**
 * Created by medlog-dev-2 on 2016/7/7.
 */
var ajaxHelp = new AjaxHelp();
var pram=dispatchList();
var userOrgcode = $.cookie("userOrgcode");
console.log(pram)
var  getVuleDispatchCancel=function () {
    $("#senderCompanyDispatchCancel").html(pram[0].senderCompany);
    $("#receiverCompanyDispatchCancel").html(pram[0].receiverCompany);
    $("#reqDeliveryDateDispatchCancel").html(pram[0].reqDeliveryDate);
    $("#senderContactNameDispatchCancel").html(pram[0].senderContactName);
    $("#senderMobileDispatchCancel").html(pram[0].senderMobile);
    $("#senderCompanyDispatchCancelView").html(pram[0].senderCompany);
    $("#senderAddressDispatchCancel").html(pram[0].senderprovincename+" "+pram[0].sendercityname+" "+pram[0].senderdistrictname+" "+pram[0].senderAddress);
    $("#receiverContactNameDispatchCancel").html(pram[0].receiverContactName);
    $("#receiverMobileDispatchCancel").html(pram[0].receiverMobile);
    $("#receiverCompanyDispatchCancelView").html(pram[0].receiverCompany);
    $("#receiverAddressDispatchCancel").html(pram[0].senderprovincename+" "+pram[0].sendercityname+" "+pram[0].senderdistrictname+" "+pram[0].senderAddress);
    $("#reqDeliveryDateDispatchCancelView").html(pram[0].reqDeliveryDate);
    $("#remarkDispatchCancel").html(pram[0].remark);
    $("#pickupdriverbynameDispatchCancelOrigin").html(pram[0].pickupdriverbyname);
    $("#consignmentNoDispatchCancel").html(pram[0].consignmentNo+" "+ pram[0].statusname);
    $("#ceorgnameDispatchCancel").html(pram[0].ceorgname);
    $("#lcorgnameDispatchCancel").html(pram[0].lcorgname);
    $("#createDateDispatchCancel").html(pram[0].createDate);
    $("#pickupdriverbynameDispatchCancel").html(pram[0].pickupdriverbyname);
    $("#dispatchbynameDispatchCancel").html(pram[0].dispatchbyname);
    $("#submitbynameDispatchCancel").html(pram[0].submitbyname)
    $("#customerSpecialNoteDispatchCancel").html(pram[0].customerSpecialNote)
}
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
    getVuleDispatchCancel();
}
var verification=function () {
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
}
var changeRemarkDispatchCancel=function () {
    $("#remarkDispatchCancel").val($("#cancelReasonDispatchCancel").find("option:selected").text());
}
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
}
var DispatchCancelSubmitClose=function () {
    //关闭取消页
    $("#tabs").tabs('close','取消');
}
var successDispatchCancelSubmitAdd=function (data) {
    ds.dialog({
        title : '消息提示',
        content : '提交成功！',
        icon : "success.png",
        width:'200',
        height:'50',
        timeout:2
    });
    setTimeout(function(){
        $("#tabs").tabs('close','取消');
        loadDispatchList();
    },2000)
}

var getDispatchCancelDetail=function () {
    var URL = ApiPath.TMSApi.dispatchingManagement.consignmentDetail;
    var requestData = {
        consignmentNo:pram[0].consignmentNo
    };
    ajaxHelp.AjaxPost(URL,requestData,successGetDispatchCancelDetail,null);
}
var successGetDispatchCancelDetail=function (data) {
    if(data.cgodRec){
        $("#recordDispatchCancel").attr('src',data.cgodRec.url)
    }else {
        $("#recordDispatchCancel").hide()
    }
}
getDispatchCancelDetail()
getDispatchCancel();
