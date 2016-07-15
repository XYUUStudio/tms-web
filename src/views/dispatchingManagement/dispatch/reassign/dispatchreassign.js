/**
 * Created by medlog-dev-2 on 2016/7/8.
 */
/**
 * Created by medlog-dev-2 on 2016/7/6.
 */
var ajaxHelp = new AjaxHelp();
var pram=dispatchList();
var  getValueDispatcheReassign=function () {
    console.log(pram[0])
    $("#formerPickupDriver").val(pram[0].pickupdriverbyname);
    $("#senderCompanyDispatchRe").html(pram[0].senderCompany);
    $("#receiverCompanyDispatchRe").html(pram[0].receiverCompany);
    $("#reqDeliveryDateDispatchReView").html(pram[0].reqDeliveryDate+" 前送达");
    $("#senderContactNameDispatchRe").val(pram[0].senderContactName);
    $("#senderMobileDispatchRe").val(pram[0].senderMobile);
    $("#senderCompanyDispatchReView").val(pram[0].senderCompany);
    $("#senderAddressDispatchRe").val(pram[0].senderAddress);
    $("#receiverContactNameDispatchRe").val(pram[0].receiverContactName);
    $("#receiverMobileDispatchRe").val(pram[0].receiverMobile);
    $("#receiverCompanyDispatchReView").val(pram[0].receiverCompany);
    $("#receiverAddressDispatchRe").val(pram[0].receiverAddress);
    $("#customerSpeciaNoteDispatchRe").val(pram[0].customerSpecialNote)
     $("#reqDeliveryDateDispatchRe").val(pram[0].reqDeliveryDate);
}
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
        $("#appendTimeDispatchRe").append(" <option value='"+item.dictValueCode+"' >"+item.dictValueName+"</option>")
    })
}
var senderProvinceCodeSingerSelect=function () {
    //发件省份下拉框
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:1,
        parentDivCode:""
    };
    ajaxHelp.AjaxPost(URL,requestData,successSenderProvinceCodeSinger,null);
}
var successSenderProvinceCodeSinger=function (data) {
    //获取发件省份
    $.each(data, function (index,item ) {
        $("#senderProvinceCodeDispatchRe").append(" <option value='"+item.divCode+"' >"+item.divName+"</option>")
        if(pram[0].senderProvinceCode==item.divCode){
            $("#senderProvinceCodeDispatchRe").find("option[value='"+item.divCode+"']").attr("selected",true)
        }
    })
   getSenderCity(pram[0].senderProvinceCode);
}
var getSenderCity=function (data) {
    //获取发件市区
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:2,
        parentDivCode:data
    };
    ajaxHelp.AjaxPost(URL,requestData,successGetSenderCity,null);
}
var successGetSenderCity=function (data) {
    //获取发件市区
    $.each(data, function (index,item ) {
        $("#senderCityCodeDispatchRe").append(" <option value='"+item.divCode+"' >"+item.divName+"</option>")
        if(pram[0].senderCityCode==item.divCode){
            $("#senderCityCodeDispatchRe").find("option[value='"+item.divCode+"']").attr("selected",true)
        }
    })
    getSenderDistrict(pram[0].senderCityCode);
}
var getSenderDistrict=function (data) {
    //获取发件区域
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:3,
        parentDivCode:data
    };
    ajaxHelp.AjaxPost(URL,requestData,successGetSenderDistrict,null);
}
var successGetSenderDistrict=function (data) {
    //获取区域
    $.each(data, function (index,item ) {
        $("#senderDistrictCodeDispatchRe").append(" <option value='"+item.divCode+"' >"+item.divName+"</option>")
        if(pram[0].senderDistrictCode==item.divCode){
            $("#senderDistrictCodeDispatchRe").find("option[value='"+item.divCode+"']").attr("selected",true)
        }
    })
}
var receiverProvinceCodeSingerSelect=function () {
    //获取寄件省份
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:1,
        parentDivCode:""
    };
    ajaxHelp.AjaxPost(URL,requestData,successReceiverProvinceCodeSinger,null);
}
var successReceiverProvinceCodeSinger=function (data) {
    //获取寄件省份
    $.each(data, function (index,item ) {
        $("#receiverProvinceCodeDispatchRe").append(" <option value='"+item.divCode+"' >"+item.divName+"</option>")
        if(pram[0].receiverProvinceCode==item.divCode){
            $("#receiverProvinceCodeDispatchRe").find("option[value='"+item.divCode+"']").attr("selected",true)
        }
    })
    getReceiveCity(pram[0].receiverProvinceCode);
};
var getReceiveCity=function (data) {
    //获取寄件市区
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:2,
        parentDivCode:data
    };
    ajaxHelp.AjaxPost(URL,requestData,successGetReceiveCity,null);
};
var successGetReceiveCity=function (data) {
    //获取寄件市区
    $.each(data, function (index,item ) {
        $("#receiverCityCodeDispatchRe").append(" <option value='"+item.divCode+"' >"+item.divName+"</option>")
        if(pram[0].receiverCityCode==item.divCode){
            $("#receiverCityCodeDispatchRe").find("option[value='"+item.divCode+"']").attr("selected",true)
        }
    })
    getReceiverDistrict(pram[0].receiverCityCode);
};
var getReceiverDistrict=function (data) {
    //获取寄件区域
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:3,
        parentDivCode:data
    };
    ajaxHelp.AjaxPost(URL,requestData,successGetReceiverDistrictre,null);
}
var successGetReceiverDistrictre=function (data) {
    //获取寄件区域
    $.each(data, function (index,item ) {
        $("#receiverDistrictCodeDispatchRe").append(" <option value='"+item.divCode+"' >"+item.divName+"</option>")
        if(pram[0].receiverDistrictCode==item.divCode){
            $("#receiverDistrictCodeDispatchRe").find("option[value='"+item.divCode+"']").attr("selected",true)
        }
    })
};

//发件省份修改
var changeSenderProvinceRe=function (data) {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:2,
        parentDivCode:data
    };
    ajaxHelp.AjaxPost(URL,requestData,successChangeSenderProvince,null);
}
var successChangeSenderProvince=function (data) {
    $("#senderCityCodeDispatchRe").empty();
    $("#senderCityCodeDispatchRe").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
    $("#senderDistrictCodeDispatchRe").empty();
    $("#senderDistrictCodeDispatchRe").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
    $.each(data, function (index,item ) {
        $("#senderCityCodeDispatchRe").append(" <option value='"+item.divCode+"' >"+item.divName+"</option>")
    })
}
//发件市区修改
var changeSenderCityRe=function (data) {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:3,
        parentDivCode:data
    };
    ajaxHelp.AjaxPost(URL,requestData,successChangeSenderCity,null);
}
var successChangeSenderCity=function (data) {
    $("#senderDistrictCodeDispatchRe").empty();
    $("#senderDistrictCodeDispatchRe").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
    $.each(data, function (index,item ) {
        $("#senderDistrictCodeDispatchRe").append(" <option value='"+item.divCode+"' >"+item.divName+"</option>")
    })
}

//修改收件省份
changeReceiveProvinceRe=function (data) {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:2,
        parentDivCode:data
    };
    ajaxHelp.AjaxPost(URL,requestData,successReceiveProvince,null);
};
var successReceiveProvince=function (data) {
    $("#receiverCityCodeDispatchRe").empty();
    $("#receiverCityCodeDispatchRe").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
    $("#receiverDistrictCodeDispatchRe").empty();
    $("#receiverDistrictCodeDispatchRe").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
    $.each(data, function (index,item ) {
        $("#receiverCityCodeDispatchRe").append(" <option value='"+item.divCode+"' >"+item.divName+"</option>")
    })
}
//修改市区
var changeReceiveCityRe=function (data) {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:3,
        parentDivCode:data
    };
    ajaxHelp.AjaxPost(URL,requestData,successChangeReceiveCity,null);
};
var successChangeReceiveCity=function (data) {
    $("#receiverDistrictCodeDispatchRe").empty();
    $("#receiverDistrictCodeDispatchRe").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
    $.each(data, function (index,item ) {
        $("#receiverDistrictCodeDispatchRe").append(" <option value='"+item.divCode+"' >"+item.divName+"</option>")
    })
};
var getAddressManage=function () {
    //获取收发件人地址管理
    getValueDispatcheReassign();
    senderProvinceCodeSingerSelect();
    receiverProvinceCodeSingerSelect();
    getAppendTimeSingerSelect();
    //寄件人详情赋值
    $("#consignmentNoDispatchRe").html(pram[0].consignmentNo+" "+ pram[0].statusname);
    $("#ceorgnameDisatchRe").html(pram[0].ceorgname);
    $("#lcorgnameDisatchRe").html(pram[0].lcorgname);
    $("#createDateDisatchRe").html(pram[0].createDate);
    $("#pickupdriverbynameDisatchRe").html(pram[0].pickupdriverbyname);
    $("#dispatchbynameDisatchRe").html(pram[0].dispatchbyname);
    $("#submitbynameDisatchRe").html(pram[0].submitbyname)
 }
var userOrgcode = $.cookie("userOrgcode");
var verification=function () {
    var result=true;
    if($("#senderContactNameDispatchRe").val()==""){
        ds.dialog({
            title : '消息提示',
            content : '请输入寄件人姓名！',
            onyes:true,
            icon : "info.png",
        });
        result=false;
    }
    else  if($("#senderMobileDispatchRe").val()==""){
        ds.dialog({
            title : '消息提示',
            content : '请输入寄件人手机号码！',
            onyes:true,
            icon : "info.png",
        });
        result=false;
    }
    else  if($("#senderCompanyDispatchReView").val()==""){
        ds.dialog({
            title : '消息提示',
            content : '请输入寄件人单位名称！',
            onyes:true,
            icon : "info.png",
        });
        result=false;
    }
    else  if($("#senderProvinceCodeDispatchRe").val()==""||$("#senderCityCodeDispatchRe").val()==""||$("#senderDistrictCodeDispatchRe").val()==""||$("#senderAddressDispatchRe").val()==""){
        ds.dialog({
            title : '消息提示',
            content : '请输入寄件人地址！',
            onyes:true,
            icon : "info.png",
        });
        result=false;
    }
    else  if($("#receiverContactNameDispatchRe").val()==""){
        ds.dialog({
            title : '消息提示',
            content : '请输入收件人姓名！',
            onyes:true,
            icon : "info.png",
        });
        result=false;
    }
    else  if($("#receiverMobileDispatchRe").val()==""){
        ds.dialog({
            title : '消息提示',
            content : '请输入收件人手机号码！',
            onyes:true,
            icon : "info.png",
        });
        result=false;
    }
    else  if($("#receiverCompanyDispatchReView").val()==""){
        ds.dialog({
            title : '消息提示',
            content : '请输入收件人单位名称！',
            onyes:true,
            icon : "info.png",
        });
        result=false;
    }
    else  if($("#receiverProvinceCodeDispatchRe").val()==""||$("#receiverCityCodeDispatchRe").val()==""||$("#receiverDistrictCodeDispatchRe").val()==""||$("#receiverAddressDispatchRe").val()==""){
        ds.dialog({
            title : '消息提示',
            content : '请输入收件人地址！',
            onyes:true,
            icon : "info.png",
        });
        result=false;
    }
    else  if($("#reqDeliveryDateDispatchRe").datebox('getValue')==""){
        ds.dialog({
            title : '消息提示',
            content : '请选择最晚送达时间！',
            onyes:true,
            icon : "info.png",
        });
        result=false;
    }
    return  result;
}
var DispatchReSubmitAdd=function () {
    if(verification()){
        var URL = ApiPath.TMSApi.dispatchingManagement.consignmentModify;
        var reqDeliveryDate="";
        if($("#reqDeliveryDateDispatchRe").datebox('getValue')){
            reqDeliveryDate=$("#reqDeliveryDateDispatchRe").datebox('getValue')+" "+$("#appendTimeDispatchRe").find("option:selected").text()+":00"
        }

        var requestData={
            consignmentNo:pram[0].consignmentNo,
            lcOrgCode:userOrgcode,
            senderContactName:$("#senderContactNameDispatchRe").val(),
            senderMobile:$("#senderMobileDispatchRe").val(),
            senderCompany:$("senderCompanyDispatchReView").val(),
            senderProvinceCode:$("#senderProvinceCodeDispatchRe").val(),
            senderCityCode:$("#senderCityCodeDispatchRe").val(),
            senderDistrictCode:$("#senderDistrictCodeDispatchRe").val(),
            senderAddress:$("#senderAddressDispatchRe").val(),
            receiverContactName:$("#receiverContactNameDispatchRe").val(),
            receiverMobile:$("#receiverMobileDispatchRe").val(),
            receiverCompanyDispatch:$("#receiverCompanyDispatchReView").val(),
            receiverProvinceCode:$("#receiverProvinceCodeDispatchRe").val(),
            receiverCityCode:$("#receiverCityCodeDispatchRe").val(),
            receiverDistrictCode:$("#receiverDistrictCodeDispatchRe").val(),
            receiverAddress:$("#receiverAddressDispatchRe").val(),
            reqDeliveryDate:reqDeliveryDate,
            customerSpecialNote:$("#customerSpeciaNoteDispatchRe").val()
        }
        ajaxHelp.AjaxPost(URL,requestData,successDispatchReSubmitAdd,null);
    }
};
var DispatchReSubmitClose=function () {
    $("#tabs").tabs('close','改单');
}
var successDispatchReSubmitAdd=function (data) {

    ds.dialog({
        title : '消息提示',
        content : '提交成功！',
        icon : "success.png",
        width:'200',
        height:'50',
        timeout:2
    });
    setTimeout(function(){
        $("#tabs").tabs('close','改单');
        loadDispatchList();
    },2000)
};
getAddressManage();

