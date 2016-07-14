/**
 * Created by medlog-dev-2 on 2016/7/6.
 */
var ajaxHelp = new AjaxHelp();
var pram=getPendingOrdersDate();
var  getVulereceiving=function () {
    $("#senderCompanyDispatch").html(pram[0].senderCompany);
    $("#receiverCompanyDispatch").html(pram[0].receiverCompany);
    $("#reqDeliveryDateDispatch").html(pram[0].reqDeliveryDate+" "+"前送达");
    $("#senderContactNameDispatch").html(pram[0].senderContactName);
    $("#senderMobileDispatch").html(pram[0].senderMobile);
    $("#senderCompanyDispatchView").html(pram[0].senderCompany);
    $("#senderAddressDispatch").html(pram[0].senderprovincename+" "+pram[0].sendercityname+" "+pram[0].senderdistrictname+" "+pram[0].senderAddress);
    $("#receiverContactNameDispatch").html(pram[0].receiverContactName);
    $("#receiverMobileDispatch").html(pram[0].receiverMobile);
    $("#receiverCompanyDispatchView").html(pram[0].receiverCompany);
    $("#receiverAddressDispatch").html(pram[0].senderprovincename+" "+pram[0].sendercityname+" "+pram[0].senderdistrictname+" "+pram[0].senderAddress);
    $("#reqDeliveryDateDispatchView").html(pram[0].reqDeliveryDate);
    $("#remarkDispatch").html(pram[0].remark)
};
var userOrgcode = $.cookie("userOrgcode");
var getPickupDriverId=function () {
    //寄件人详情赋值
    $("#consignmentNoDispatch").html(pram[0].consignmentNo+" "+ pram[0].statusname);
    $("#ceorgnameDispatch").html(pram[0].ceorgname);
    $("#lcorgnameDispatch").html(pram[0].lcorgname);
    $("#submitbynameDispatch").html(pram[0].submitbyname)

    var URL = ApiPath.TMSApi.dictionary.getPickupDriverList;
    var requestData = {
        orgCode:userOrgcode
    };
    ajaxHelp.AjaxPost(URL,requestData,successGetPickupDriverId,null);
};
var successGetPickupDriverId=function (data) {
     $.each(data,function (index,item) {
         $("#pickupDriverIdDispatch").append(" <option value='"+item.userId+"' >"+item.userName+"</option>")
     });
    getVulereceiving();
};
var verification=function () {
    var result=true;
     if($("#pickupDriverIdDispatch").val()==""){
          alert("请选择取件司机")
         result=false
     }
    return  result;
};
var DispatchSubmitAdd=function () {
    if(verification()){
        var URL = ApiPath.TMSApi.dispatchingManagement.dispatch;
        var requestData={
            consignmentNo:pram[0].consignmentNo,
            pickupDriverId:$("#pickupDriverIdDispatch").val(),
            remark:$("#remarkDispatch").val()
        };
        ajaxHelp.AjaxPost(URL,requestData,successDispatchSubmitAdd,null);
    }
};
var successDispatchSubmitAdd=function () {
    ds.dialog({
        title : '消息提示',
        content : '提交成功！',
        icon : "success.png",
        width:'200',
        height:'50',
        timeout:2
    });
    setTimeout(function(){
        $("#tabs").tabs('close','派单');
        loadPendingordersList()
    },2000);
};
getPickupDriverId();

