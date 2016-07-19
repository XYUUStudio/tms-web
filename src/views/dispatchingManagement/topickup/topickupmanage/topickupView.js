/**
 * Created by medlog-dev-2 on 2016/7/6.
 */
/**
 * Created by medlog-dev-2 on 2016/7/6.
 */
var ajaxHelp = new AjaxHelp();
var pram=getToPickup();
console.log(pram)
var  getVuleToPickup=function () {

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
    $.each(data,function (index,item) {
        $("#pickupDriverIdReDispatch").append(" <option value='"+item.userId+"' >"+item.userName+"</option>")
    })
    getVuleToPickup();
}
var getPickupDetail=function () {
    //获取订单详情
    var URL = ApiPath.TMSApi.dispatchingManagement.consignmentDetail;
    var requestData = {
        consignmentNo:pram[0].consignmentNo
    };
    ajaxHelp.AjaxPost(URL,requestData,successGetPickupDetail,null);
}
var successGetPickupDetail=function (data) {
    //详情赋值
    if(data.cgodRec){
        $("#recordReDispatch").attr('src',data.cgodRec.url)
    }else {
        $("#recordReDispatch").hide()
    }
    $("#senderCompanyReDispatch").html(data.senderCompany);
    $("#receiverCompanyReDispatch").html(data.receiverCompany);
    $("#reqDeliveryDateReDispatch").html(data.reqDeliveryDate+" "+"前送达");
    $("#senderContactNameReDispatch").html(data.senderContactName);
    $("#senderMobileReDispatch").html(data.senderMobile);
    $("#senderCompanyReDispatchView").html(data.senderCompany);
    $("#senderAddressReDispatch").html(data.senderprovincename+" "+data.sendercityname+" "+data.senderdistrictname+" "+data.senderAddress);
    $("#receiverContactNameReDispatch").html(data.receiverContactName);
    $("#receiverMobileReDispatch").html(data.receiverMobile);
    $("#receiverCompanyReDispatchView").html(data.receiverCompany);
    $("#receiverAddressReDispatch").html(data.receiverprovincename+" "+data.receivercityname+" "+data.receiverdistrictname+" "+data.receiverAddress);
    $("#reqDeliveryDateReDispatchView").html(data.reqDeliveryDate);
    $("#remarkReDispatch").html(data.remark);
    $("#pickupdriverbynameReDispatchOrigin").html(data.pickupdriverbyname);
    $("#customerSpecialNoteReDispatch").html(data.customerSpecialNote)
    $("#consignmentNoReDispatch").html(data.consignmentNo+" "+ data.statusname);
    $("#ceorgnameReDispatch").html(data.ceorgname);
    $("#lcorgnameReDispatch").html(data.lcorgname);
    $("#createDateReDispatch").html(data.createDate);
    $("#pickupdriverbynameReDispatch").html(data.pickupdriverbyname);
    $("#dispatchbynameReDispatch").html(data.dispatchbyname);
    $("#submitbynameReDispatch").html(data.submitbyname)
}
var verification=function () {
    var result=true;
    if($("#pickupDriverIdReDispatch").val()==""){
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
var ReDispatchSubmitAdd=function () {
    if(verification()){
        var URL = ApiPath.TMSApi.dispatchingManagement.modifyDispatch;
        var requestData={
            consignmentNo:pram[0].consignmentNo,
            pickupDriverId:$("#pickupDriverIdReDispatch").val(),
            remark:$("#remarkReDispatch").val()
        }
        ajaxHelp.AjaxPost(URL,requestData,successReDispatchSubmitAdd,null);
    }
}
var ReDispatchSubmitClose=function () {
    $("#tabs").tabs('close','改派');
}
var successReDispatchSubmitAdd=function (data) {
    ds.dialog({
        title : '消息提示',
        content : '提交成功！',
        icon : "success.png",
        width:'200',
        height:'50',
        timeout:1
    });
    setTimeout(function(){
        $("#tabs").tabs('close','改派');
        loadToPickupList();
    },2000)
};
var loadToPickup=function () {
    getPickupDriverId();
    getPickupDetail();
};
loadToPickup();
