/**
 * Created by medlog-dev-2 on 2016/7/7.
 */
var ajaxHelp = new AjaxHelp();
var pram=dispatchList();
console.log(pram)
var  getVuleDispatchCancel=function () {
    $("#senderCompanyDispatchCancel").html(pram[0].senderCompany);
    $("#receiverCompanyDispatchCancel").html(pram[0].receiverCompany);
    $("#reqDeliveryDateDispatchCancel").html(pram[0].reqDeliveryDate);
    $("#senderContactNameDispatchCancel").html(pram[0].senderContactName);
    $("#senderMobileDispatchCancel").html(pram[0].senderMobile);
    $("#senderCompanyDispatchCancelView").html(pram[0].senderCompany);
    $("#senderAddressDispatchCancel").html(pram[0].senderAddress);
    $("#receiverContactNameDispatchCancel").html(pram[0].receiverContactName);
    $("#receiverMobileDispatchCancel").html(pram[0].receiverMobile);
    $("#receiverCompanyDispatchCancelView").html(pram[0].receiverCompany);
    $("#receiverAddressDispatchCancel").html(pram[0].receiverAddress);
    $("#reqDeliveryDateDispatchCancelView").html(pram[0].reqDeliveryDate);
    $("#remarkDispatchCancel").html(pram[0].remark)
    $("#pickupdriverbynameDispatchCancelOrigin").html(pram[0].pickupdriverbyname)
}
var userOrgcode = $.cookie("userOrgcode");
var getDispatchCancel=function () {
    var URL = ApiPath.TMSApi.dictionary.GetDictionary;
    var requestData = {
        dictTypeCode:"CGCLRS"
    };
    ajaxHelp.AjaxPost(URL,requestData,successGetPickupDriverId,null);
}
var successGetPickupDriverId=function (data) {
    console.log(data)
    $.each(data.dictValueList,function (index,item) {
        $("#cancelReasonDispatchCancel").append(" <option value='"+item.dictTypeCode+"' >"+item.dictValueName+"</option>")
    })
    getVuleDispatchCancel();
}
var verification=function () {
    var result=true;
    if($("#pickupDriverIdDispatchCancel").val()==""){
        alert("请选择取件司机")
        result=false
    }
    return  result;
}
var DispatchCancelSubmitAdd=function () {
    if(verification()){
        var URL = ApiPath.TMSApi.dispatchingManagement.consignmentCancel;
        var requestData={
            consignmentNo:pram[0].consignmentNo,
        }
        ajaxHelp.AjaxPost(URL,requestData,successDispatchCancelSubmitAdd,null);
    }
}
var successDispatchCancelSubmitAdd=function (data) {
    alert("提交成功！")
}
getDispatchCancel();
