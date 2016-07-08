/**
 * Created by medlog-dev-2 on 2016/7/7.
 */
var ajaxHelp = new AjaxHelp();
var getAppendTimeSingerSelect=function () {
    //获取追加时间段
    var URL = ApiPath.TMSApi.dictionary.GetDictionary;
    var requestData = {
        dictTypeCode:"DLRQTM"
    };
    ajaxHelp.AjaxPost(URL,requestData,successAppendTimeSingerSelec,null);
}
var successAppendTimeSingerSelec=function (data) {
    $.each(data.dictValueList, function (index,item ) {
        $("#appendTimeSinger").append(" <option value='"+item.dictValueCode+"' >"+item.dictValueName+"</option>")
    })
}
var ceOrgCodeSingerSelect=function () {
    //客户公司下拉框
    var URL = ApiPath.TMSApi.businessData.enterprisesList;
    var requestData = {
    };
    ajaxHelp.AjaxPost(URL,requestData,successCeOrgCodeSingerSelect,null);
}
var successCeOrgCodeSingerSelect=function (data) {
    $.each(data.rows, function (index,item ) {
        $("#ceOrgCodeSinger").append(" <option value='"+item.cECode+"' >"+item.cEName+"</option>")
    })
}
var senderProvinceCodeSingerSelect=function () {
    //寄件省份下拉框
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:1,
        parentDivCode:""
    };
    ajaxHelp.AjaxPost(URL,requestData,successSenderCityCodeSinger,null);
}
var successSenderCityCodeSinger=function (data) {
    $.each(data, function (index,item ) {
        $("#senderProvinceCodeSinger").append(" <option value='"+item.id+"' >"+item.name+"</option>")
    })
}
var receiverProvinceCodeSingerSelect=function () {
    //收件省份
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:1,
        parentDivCode:""
    };
    ajaxHelp.AjaxPost(URL,requestData,successReceiverProvinceCodeSinger,null);
}
var successReceiverProvinceCodeSinger=function (data) {
    $.each(data, function (index,item ) {
        $("#receiverProvinceCodeSinger").append(" <option value='"+item.id+"' >"+item.name+"</option>")
    })
}
//修改收件省份
changeReceiveProvince=function (data) {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:2,
        parentDivCode:data
    };
    ajaxHelp.AjaxPost(URL,requestData,successReceiveProvince,null);
}

var successReceiveProvince=function (data) {
    $("#receiverCityCodeSinger").empty();
    $("#receiverCityCodeSinger").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
    $("#receiverDistrictCodeSinger").empty();
    $("#receiverDistrictCodeSinger").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
    $.each(data, function (index,item ) {
        $("#receiverCityCodeSinger").append(" <option value='"+item.id+"' >"+item.name+"</option>")
    })
}
//修改市区
var changeReceiveCity=function (data) {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:3,
        parentDivCode:data
    };
    ajaxHelp.AjaxPost(URL,requestData,successChangeReceiveCity,null);
}
var successChangeReceiveCity=function (data) {
    $("#receiverDistrictCodeSinger").empty();
    $("#receiverDistrictCodeSinger").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
    $.each(data, function (index,item ) {
        $("#receiverDistrictCodeSinger").append(" <option value='"+item.id+"' >"+item.name+"</option>")
    })
}
//发件省份修改
var changeSenderProvince=function (data) {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:2,
        parentDivCode:data
    };
    ajaxHelp.AjaxPost(URL,requestData,successChangeSenderProvince,null);
}
var successChangeSenderProvince=function (data) {
    $("#senderCityCodeSinger").empty();
    $("#senderCityCodeSinger").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
    $("#senderDistrictCodeSinger").empty();
    $("#senderDistrictCodeSinger").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
    $.each(data, function (index,item ) {
        $("#senderCityCodeSinger").append(" <option value='"+item.id+"' >"+item.name+"</option>")
    })
}
//发件市区修改
var changeSenderCity=function (data) {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:3,
        parentDivCode:data
    };
    ajaxHelp.AjaxPost(URL,requestData,successChangeSenderCity,null);
}
var successChangeSenderCity=function (data) {
    $("#senderDistrictCodeSinger").empty();
    $("#senderDistrictCodeSinger").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
    $.each(data, function (index,item ) {
        $("#senderDistrictCodeSinger").append(" <option value='"+item.id+"' >"+item.name+"</option>")
    })
}



var loadSing=function () {
    ceOrgCodeSingerSelect();
    senderProvinceCodeSingerSelect();
    receiverProvinceCodeSingerSelect();
    getAppendTimeSingerSelect();
}
var verification=function () {
    //验证
    //之后追加
      var result=true;
}
var SingerSubmitAdd=function () {
   //录单提交
    var URL = ApiPath.TMSApi.dispatchingManagement.consignmentCommit;
    var reqDeliveryDate=$("#reqDeliveryDateSinger").datebox('getValue')+" "+$("#appendTimeSinger").find("option:selected").text()+":00"
    var requestData = {
        ceOrgCode:$("#ceOrgCodeSinger").val(),
        senderContactName:$("#senderContactNameSinger").val(),
        senderMobile:$("#senderMobileSinger").val(),
        senderCompany:$("#senderCompanySinger").val(),
        senderProvinceCode:$("#senderProvinceCodeSinger").val(),
        senderCityCode:$("#senderCityCodeSinger").val(),
        senderDistrictCode:$("#senderDistrictCodeSinger").val(),
        senderAddress:$("#senderAddressSinger").val(),
        receiverContactName:$("#receiverContactNameSinger").val(),
        receiverMobile:$("#receiverMobileSinger").val(),
        receiverCompany:$("#receiverCompanySinger").val(),
        receiverProvinceCode:$("#receiverProvinceCodeSinger").val(),
        receiverCityCode:$("#receiverCityCodeSinger").val(),
        receiverDistrictCode:$("#receiverDistrictCodeSinger").val(),
        receiverAddress:$("#receiverAddressSinger").val(),
        reqDeliveryDate:reqDeliveryDate,
        patientName:$("#patientNameSinger").val(),
        patientHPBedNo:$("#patientHPBedNoSinger").val(),
        customerSpecialNote:$("#customerSpecialNoteSinger").val(),
        patientHPNo:$("#patientHPNoSinger").val()
    };
    ajaxHelp.AjaxPost(URL,requestData,successSingerSubmitAdd,null);
}
var successSingerSubmitAdd=function (data) {
    alert(data)
}
loadSing();
