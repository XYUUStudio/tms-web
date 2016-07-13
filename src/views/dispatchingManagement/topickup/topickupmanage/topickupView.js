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
    $("#senderCompanyReDispatch").html(pram[0].senderCompany);
    $("#receiverCompanyReDispatch").html(pram[0].receiverCompany);
    $("#reqDeliveryDateReDispatch").html(pram[0].reqDeliveryDate+" "+"前送达");
    $("#senderContactNameReDispatch").html(pram[0].senderContactName);
    $("#senderMobileReDispatch").html(pram[0].senderMobile);
    $("#senderCompanyReDispatchView").html(pram[0].senderCompany);
    $("#senderAddressReDispatch").html(pram[0].senderprovincename+" "+pram[0].sendercityname+" "+pram[0].senderdistrictname+" "+pram[0].senderAddress);
    $("#receiverContactNameReDispatch").html(pram[0].receiverContactName);
    $("#receiverMobileReDispatch").html(pram[0].receiverMobile);
    $("#receiverCompanyReDispatchView").html(pram[0].receiverCompany);
    $("#receiverAddressReDispatch").html(pram[0].senderprovincename+" "+pram[0].sendercityname+" "+pram[0].senderdistrictname+" "+pram[0].senderAddress);
    $("#reqDeliveryDateReDispatchView").html(pram[0].reqDeliveryDate);
    $("#remarkReDispatch").html(pram[0].remark)
    $("#pickupdriverbynameReDispatchOrigin").html(pram[0].pickupdriverbyname)
}
var userOrgcode = $.cookie("userOrgcode");
var getPickupDriverId=function () {
    //基本信息赋值
    $("#consignmentNoReDispatch").html(pram[0].consignmentNo+" "+ pram[0].statusname);
    $("#ceorgnameReDispatch").html(pram[0].ceorgname);
    $("#lcorgnameReDispatch").html(pram[0].lcorgname);
    $("#createDateReDispatch").html(pram[0].createDate);
    $("#pickupdriverbynameReDispatch").html(pram[0].pickupdriverbyname);
    $("#dispatchbynameReDispatch").html(pram[0].dispatchbyname);
    $("#submitbynameReDispatch").html(pram[0].submitbyname)

    var URL = ApiPath.TMSApi.dictionary.getPickupDriverList;
    var requestData = {
        orgCode:userOrgcode
    };
    ajaxHelp.AjaxPost(URL,requestData,successGetPickupDriverId,null);
}
var successGetPickupDriverId=function (data) {
    console.log(data)
    $.each(data,function (index,item) {
        $("#pickupDriverIdReDispatch").append(" <option value='"+item.userId+"' >"+item.lCName+"</option>")
    })
    getVuleToPickup();
}
var verification=function () {
    var result=true;
    if($("#pickupDriverIdReDispatch").val()==""){
        alert("请选择取件司机")
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
var successReDispatchSubmitAdd=function (data) {
    alert("提交成功！")
    $("#tabs").tabs('close','改派');
    loadToPickupList();
}
getPickupDriverId();

