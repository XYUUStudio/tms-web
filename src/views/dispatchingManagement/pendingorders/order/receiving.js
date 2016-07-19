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
    $("#receiverAddressDispatch").html(pram[0].receiverprovincename+" "+pram[0].receivercityname+" "+pram[0].receiverdistrictname+" "+pram[0].receiverAddress);
    $("#reqDeliveryDateDispatchView").html(pram[0].reqDeliveryDate);
    $("#remarkDispatch").html(pram[0].remark);
    $("#customerSpecialNoteDispatch").html(pram[0].customerSpecialNote)
    $("#consignmentNoDispatch").html(pram[0].consignmentNo+" "+ pram[0].statusname);
    $("#ceorgnameDispatch").html(pram[0].ceorgname);
    $("#lcorgnameDispatch").html(pram[0].lcorgname);
    $("#submitbynameDispatch").html(pram[0].submitbyname)

};
var userOrgcode = $.cookie("userOrgcode");
var getPickupDriverId=function () {
    //寄件人详情赋值

    var URL = ApiPath.TMSApi.dictionary.getPickupDriverList;
    var requestData = {
        orgCode:userOrgcode
    };
    ajaxHelp.AjaxPost(URL,requestData,successGetPickupDriverId,null);
};
var successGetPickupDriverId=function (data) {
     $.each(data.rows,function (index,item) {
         $("#pickupDriverIdDispatch").append(" <option value='"+item.userId+"' >"+item.userName+"</option>")
     });
    getVulereceiving();
};
var getReceivingDetail=function () {
    //获取订单详情
    var URL = ApiPath.TMSApi.dispatchingManagement.consignmentDetail;
    var requestData = {
        consignmentNo:pram[0].consignmentNo
    };
    ajaxHelp.AjaxPost(URL,requestData,successGetReceivingDetail,null);
};
var successGetReceivingDetail=function (data) {
    // 获取录音URL
    if(data.cgodRec){
        $("#recordOrderDispatch").attr('src',data.cgodRec.url)
    }else {
        $("#recordOrderDispatch").hide()
    }
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
var DispatchSubmitClose=function () {
    //关闭派单页面
    $("#tabs").tabs('close','派单');
}
var successDispatchSubmitAdd=function () {
    ds.dialog({
        title : '消息提示',
        content : '提交成功！',
        icon : "success.png",
        width:'200',
        height:'50',
        timeout:1
    });
    setTimeout(function(){
        $("#tabs").tabs('close','派单');
        loadPendingordersList()
    },2000);
};
var loadReceiving=function () {
     //
    getPickupDriverId();
    getReceivingDetail();
}
loadReceiving();
