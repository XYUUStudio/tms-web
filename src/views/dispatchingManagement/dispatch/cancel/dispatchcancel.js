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
    $("#senderAddressDispatchCancel").html(pram[0].senderprovincename+" "+pram[0].sendercityname+" "+pram[0].senderdistrictname+" "+pram[0].senderAddress);
    $("#receiverContactNameDispatchCancel").html(pram[0].receiverContactName);
    $("#receiverMobileDispatchCancel").html(pram[0].receiverMobile);
    $("#receiverCompanyDispatchCancelView").html(pram[0].receiverCompany);
    $("#receiverAddressDispatchCancel").html(pram[0].senderprovincename+" "+pram[0].sendercityname+" "+pram[0].senderdistrictname+" "+pram[0].senderAddress);
    $("#reqDeliveryDateDispatchCancelView").html(pram[0].reqDeliveryDate);
    $("#remarkDispatchCancel").html(pram[0].remark)
    $("#pickupdriverbynameDispatchCancelOrigin").html(pram[0].pickupdriverbyname)
}
var userOrgcode = $.cookie("userOrgcode");
var getDispatchCancel=function () {
    //基本信息赋值
    $("#consignmentNoDispatchCancel").html(pram[0].consignmentNo+" "+ pram[0].statusname);
    $("#ceorgnameDispatchCancel").html(pram[0].ceorgname);
    $("#lcorgnameDispatchCancel").html(pram[0].lcorgname);
    $("#createDateDispatchCancel").html(pram[0].createDate);
    $("#pickupdriverbynameDispatchCancel").html(pram[0].pickupdriverbyname);
    $("#dispatchbynameDispatchCancel").html(pram[0].dispatchbyname);
    $("#submitbynameDispatchCancel").html(pram[0].submitbyname)



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
    console.log(data)
    $("#remarkDispatchCancel").val(data.dictValueList[0].dictValueName)
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
var successDispatchCancelSubmitAdd=function (data) {
    alert("提交成功！")
    $("#tabs").tabs('close','取消');
    loadDispatchList();
}
getDispatchCancel();
