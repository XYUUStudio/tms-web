/**
 * Created by medlog-dev-2 on 2016/7/6.
 */
var ajaxHelp = new AjaxHelp();
var pram=getPendingOrdersDate();
console.log(pram[0])
var  getVulereceiving=function () {
      $("#senderCompanyDispatch").html(pram[0].senderCompany);
    $("#receiverCompanyDispatch").html(pram[0].receiverCompany);
    $("#reqDeliveryDateDispatch").html(pram[0].reqDeliveryDate);
    $("#senderContactNameDispatch").html(pram[0].senderContactName);
    $("#senderMobileDispatch").html(pram[0].senderMobile);
    $("#senderCompanyDispatchView").html(pram[0].senderCompany);
    $("#senderAddressDispatch").html(pram[0].senderAddress);
    $("#receiverContactNameDispatch").html(pram[0].receiverContactName);
    $("#receiverMobileDispatch").html(pram[0].receiverMobile);
    $("#receiverCompanyDispatchView").html(pram[0].receiverCompany);
    $("#receiverAddressDispatch").html(pram[0].receiverAddress);
    $("#reqDeliveryDateDispatchView").html(pram[0].reqDeliveryDate);
    $("#remarkDispatch").html(pram[0].remark)
}
var userOrgcode = $.cookie("userOrgcode");
var getPickupDriverId=function () {
    var URL = ApiPath.TMSApi.dictionary.getPickupDriverList;
    var requestData = {
        orgCode:userOrgcode
    };
    ajaxHelp.AjaxPost(URL,requestData,successGetPickupDriverId,null);
}
var successGetPickupDriverId=function (data) {
    console.log(data)
     $.each(data.rows,function (index,item) {
         $("#pickupDriverIdDispatch").append(" <option value='"+item.userId+"' >"+item.userName+"</option>")
     })
    getVulereceiving();
}
var verification=function () {
    var result=true;
     if($("#pickupDriverIdDispatch").val()==""){
          alert("请选择取件司机")
         result=false
     }
    return  result;
}
var DispatchSubmitAdd=function () {
    if(verification()){
        var URL = ApiPath.TMSApi.dispatchingManagement.dispatch;
        var requestData={
            consignmentNo:pram[0].consignmentNo,
            pickupDriverId:$("#pickupDriverIdDispatch").val()
        }
        ajaxHelp.AjaxPost(URL,requestData,successDispatchSubmitAdd,null);
    }
}
var successDispatchSubmitAdd=function (data) {
     alert("提交成功！")
    loadtoPickupList()
}
getPickupDriverId();

