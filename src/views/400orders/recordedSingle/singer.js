/**
 * Created by medlog-dev-2 on 2016/7/7.
 */
var ajaxHelp = new AjaxHelp();
var SendAddressInfo=new Array();
var SendAddressInto=new Array();
var ceOrgCodeSingerSelect=function () {
    //客户公司下拉框
    var URL = ApiPath.TMSApi.businessData.enterprisesList;
    var requestData = {
    };
    ajaxHelp.AjaxPost(URL,requestData,successCeOrgCodeSingerSelect,null);
}
var successCeOrgCodeSingerSelect=function (data) {
    $.each(data.rows, function (index,item ) {
        $("#ceOrgCodeSinger").append(" <option value='"+item.enterpriseOrgCode+"' >"+item.cEName+"</option>")
    })
};
var getAppendTimeSingerSelect=function () {
    //获取追加时间段
    var URL = ApiPath.TMSApi.dictionary.GetDictionary;
    var requestData = {
        dictTypeCode:"DLRQTM"
    };
    ajaxHelp.AjaxPost(URL,requestData,successAppendTimeSingerSelec,null);
};
var successAppendTimeSingerSelec=function (data) {
    $.each(data.dictValueList, function (index,item ) {
        $("#appendTimeSinger").append(" <option value='"+item.dictValueCode+"' >"+item.dictValueName+"</option>")
    })
};
var senderProvinceCodeSingerSelect=function () {
    //寄件省份下拉框
    var URL = ApiPath.TMSApi.dictionary.getAdmdivisionValidatedSearch;
    var requestData = {
        level:1,
        parentDivCode:""
    };
    ajaxHelp.AjaxPost(URL,requestData,successProvinceCodeSingerSelect,null);
}
var successProvinceCodeSingerSelect=function (data) {
    SendAddressInfo=data;
    $.each(data, function (index,item ) {
        $("#senderProvinceCodeSinger").append(" <option value='"+item.divCode+"' >"+item.divName+"</option>")
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
        $("#receiverProvinceCodeSinger").append(" <option value='"+item.divCode+"' >"+item.divName+"</option>")
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
        $("#receiverCityCodeSinger").append(" <option value='"+item.divCode+"' >"+item.divName+"</option>")
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
        $("#receiverDistrictCodeSinger").append(" <option value='"+item.divCode+"' >"+item.divName+"</option>")
    })
}
//发件省份修改
var changeSenderProvince=function (data) {
    SendAddressInto=new Array();
    if(data==""){
        $("#senderCityCodeSinger").empty();
        $("#senderCityCodeSinger").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
        $("#senderDistrictCodeSinger").empty();
        $("#senderDistrictCodeSinger").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
    }
    $.each(SendAddressInfo,function (index,item) {
        //获取有效地址过滤
         if(data==item.divCode){
             $("#senderCityCodeSinger").empty();
             $("#senderCityCodeSinger").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
             $("#senderDistrictCodeSinger").empty();
             $("#senderDistrictCodeSinger").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
             $.each(item.nextLevelDivision,function (index,city) {
                 SendAddressInto.push(city)
                 $("#senderCityCodeSinger").append(" <option value='"+city.divCode+"' >"+city.divName+"</option>")
             })
         }
    })
}
//发件市区修改
var changeSenderCity=function (data) {
   if(data==""){
       $("#senderDistrictCodeSinger").empty();
       $("#senderDistrictCodeSinger").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
   }
    $.each(SendAddressInto,function (index,item) {
        //获取有效地址过滤
        if(data==item.divCode){
            $("#senderDistrictCodeSinger").empty();
            $("#senderDistrictCodeSinger").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
            $.each(item.nextLevelDivision,function (index,city) {
                $("#senderDistrictCodeSinger").append(" <option value='"+city.divCode+"' >"+city.divName+"</option>")
            })
        }
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
     console.log($("#ceOrgCodeSinger").val())
     if($("#ceOrgCodeSinger").val()=="") {
         ds.dialog({
             title : '消息提示',
             content : '请选择客户公司！',
             onyes:true,
             icon : "info.png",
         });
         result = false;
     }else  if ($("#senderContactNameSinger").val()==""){
         ds.dialog({
             title : '消息提示',
             content : '请输入寄件人姓名！',
             onyes:true,
             icon : "info.png",
         });
         result = false;
     }else  if ($("#senderMobileSinger").val()==""){
         ds.dialog({
             title : '消息提示',
             content : '请输入寄件人手机号码！',
             onyes:true,
             icon : "info.png",
         });
         result = false;
     }
     else  if ($("#senderCompanySinger").val()==""){
         ds.dialog({
             title : '消息提示',
             content : '请输入寄件人所在单位！',
             onyes:true,
             icon : "info.png",
         });
         result = false;
     }else  if($("#senderProvinceCodeSinger").val()==""||$("#senderCityCodeSinger").val()==""||$("#senderDistrictCodeSinger").val()==""||$("#senderAddressSinger").val()==""){
         ds.dialog({
             title : '消息提示',
             content : '请输入寄件人所在地址！',
             onyes:true,
             icon : "info.png",
         });
         result = false;
     }else if ($("#receiverContactNameSinger").val()==""){
         ds.dialog({
             title : '消息提示',
             content : '请输入收件人姓名！',
             onyes:true,
             icon : "info.png",
         });
         result = false;
     }else if($("#receiverMobileSinger").val()==""){
         ds.dialog({
             title : '消息提示',
             content : '请输入收件人手机号码！',
             onyes:true,
             icon : "info.png",
         });
         result = false;
     }else if($("#receiverCompanySinger").val()==""){
         ds.dialog({
             title : '消息提示',
             content : '请输入收件人所在单位！',
             onyes:true,
             icon : "info.png",
         });
         result = false;
     }else if($("#receiverProvinceCodeSinger").val()==""||$("#receiverCityCodeSinger").val()==""||$("#receiverDistrictCodeSinger").val()==""||$("#receiverAddressSinger").val()==""){
         ds.dialog({
             title : '消息提示',
             content : '请输入收件人所在地址！',
             onyes:true,
             icon : "info.png",
         });
         result = false;
     }else  if($("#reqDeliveryDateSinger").datebox('getValue')==""){
         ds.dialog({
             title : '消息提示',
             content : '请选择最晚送达时间！',
             onyes:true,
             icon : "info.png",
         });
         result = false;
     }
    return result;
}
var SingerSubmitAdd=function () {
   //录单提交
    if(verification()){
        var URL = ApiPath.TMSApi.dispatchingManagement.consignmentCommit;
        var reqDeliveryDate=$("#reqDeliveryDateSinger").datebox('getValue')+" "+$("#appendTimeSinger").find("option:selected").text()+":00";
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
            patientHPNo:$("#patientHPNoSinger").val(),
            consignmentSource:"TEL"
        };
        ajaxHelp.AjaxPost(URL,requestData,successSingerSubmitAdd,null);
    }
}
var SingerSubmitClose=function () {
    //电话下单关闭
    ds.dialog({
        title : '消息提示',
        content : '确认关闭当前页面吗？',
        yesText : '确定',
        onyes:function(){
            $("#tabs").tabs('close','电话录单');
            return false;
        },
        noText : '取消',
        onno : function(){
            this.close();
        },
        icon : "question.gif",
    });
};
var successSingerSubmitAdd=function (data) {
    ds.dialog({
        title : '消息提示',
        content : data,
        icon : "success.png",
        width:'200',
        height:'50',
        timeout:2
    });
    setTimeout(function(){
        $("#tabs").tabs('close','电话录单');
        loadDispatchList();
    },2000)
}
loadSing();
