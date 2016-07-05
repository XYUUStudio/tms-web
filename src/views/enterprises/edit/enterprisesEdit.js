/**
 * Created by medlog-dev-2 on 2016/7/4.
 */
var ajaxHelp = new AjaxHelp();
var pram=getEnterprisesDate();
var EnterprisesInfo=new  Object();
var getEnterprisesInfo=function () {
    var URL = ApiPath.TMSApi.businessData.enterprisesDetail;
    var requestData={
        cEOrgCode:pram[0].enterpriseOrgCode
};
    ajaxHelp.AjaxPost(URL,requestData,successEnterprisesEdit,null);
}
var successEnterprisesEdit=function (data) {
      //赋值
    EnterprisesInfo=data;
    console.log(EnterprisesInfo)
        $("#cECodeEnterprisesEdit").val(data.cECode);
        $("#cENameEnterprisesEdit").val(data.cEName);
        $("#corpRegNoEnterprisesEdit").val(data.corpRegNo);
        $("#corpRegAddressEnterprisesEdit").val(data.corpRegAddress);
        $("#corpRegLegalRepEnterprisesEdit").val(data.corpRegLegalRep);
        $("#corpRegBizStartDateEnterprisesEdit").val(data.corpRegBizStartDate);
        $("#corpRegBizEndDateEnterprisesEdit").val(data.corpRegBizEndDate);
     if(data.attachmentCO.length!=0){
         if(data.attachmentCO[0].url!=""){
             $('.imgEditCO').html('<img src="' + data.attachmentCO[0].url + '" alt="" width="150" height="150" />')
         }
     }
     if(data.attachmentCC.length!=0){
         if(data.attachmentCC[0].url!=""){
             $('.imgEditCC').html('<img src="' + data.attachmentCC[0].url + '" alt="" width="150" height="150" />')
         }
     }
    getAdmDivision()
}


//获取选中省
var getAdmDivision=function () {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:1,
        parentDivCode:""
    };
    ajaxHelp.AjaxPost(URL,requestData,successAdmDivision,null);
}
var successAdmDivision=function (data) {
    $.each(data, function (index,item ) {
        $("#corpRegProvinceCodeEnterprisesEdit").append(" <option value='"+item.id+"' >"+item.name+"</option>")
        if(EnterprisesInfo.corpRegProvinceCode==item.id){
            $("#corpRegProvinceCodeEnterprisesEdit").find("option[value='"+item.id+"']").attr("selected",true)
        }
    })
    getCity()
}
//获取选中市
var getCity =function () {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:2,
        parentDivCode:EnterprisesInfo.corpRegProvinceCode
    };
    ajaxHelp.AjaxPost(URL,requestData,successgetCity,null);
}
var successgetCity=function (data) {
    $.each(data, function (index,item ) {
        $("#corpRegCityCodeEnterprisesEdit").append(" <option value='"+item.id+"' >"+item.name+"</option>")
        if(EnterprisesInfo.corpRegCityCode==item.id){
            $("#corpRegCityCodeEnterprisesEdit").find("option[value='"+item.id+"']").attr("selected",true)
        }
        District();
    })
}
//获取选中区
var District =function () {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:3,
        parentDivCode:EnterprisesInfo.corpRegCityCode
    };
    ajaxHelp.AjaxPost(URL,requestData,successDistrict,null);
}
var successDistrict=function (data) {
    $.each(data, function (index,item ) {
        $("#corpRegDistrictCodeEnterprisesEdit").append(" <option value='"+item.id+"' >"+item.name+"</option>")
        if(EnterprisesInfo.corpRegDistrictCode==item.id){
            $("#corpRegDistrictCodeEnterprisesEdit").find("option[value='"+item.id+"']").attr("selected",true)
        }
    })
}
//修改省份
changeProvince=function (data) {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:2,
        parentDivCode:data
    };
    ajaxHelp.AjaxPost(URL,requestData,successProvince,null);
}
var successProvince=function (data) {
    $("#corpRegCityCodeEnterprisesAdd").empty();
    $("#corpRegCityCodeEnterprisesAdd").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
    $("#corpRegDistrictCodeEnterprisesAdd").empty();
    $("#corpRegDistrictCodeEnterprisesAdd").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
    $.each(data, function (index,item ) {
        $("#corpRegCityCodeEnterprisesAdd").append(" <option value='"+item.id+"' >"+item.name+"</option>")
    })
}
//修改市区
var changeCity=function (data) {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:3,
        parentDivCode:data
    };
    ajaxHelp.AjaxPost(URL,requestData,successChangeCity,null);
}
var successChangeCity=function (data) {
    $("#corpRegDistrictCodeEnterprisesAdd").empty();
    $("#corpRegDistrictCodeEnterprisesAdd").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
    $.each(data, function (index,item ) {
        $("#corpRegDistrictCodeEnterprisesAdd").append(" <option value='"+item.id+"' >"+item.name+"</option>")
    })
}
var imgQuantity=0;
function  EnterprisesEditImg(imgData) {
    var file = imgData.files[0]; //选择上传的文件
    var r = new FileReader();
    r.readAsDataURL(file); //Base64
    if (imgQuantity>=2){
        alert("最多允许添加两张图片")
    }if(imgQuantity==0){
        $(r).load(function () {
            imgQuantity++;
            $('.imgEditCO').html('<img src="' + r.result + '" alt="" width="150" height="150"/>'+'<span class="imgCLose"></span>')
             $("#aaa").html('')
            var URL= ApiPath.TMSApi.dictionary.upload;
            var requestData={file:r.result}
            ajaxHelp.AjaxForm(URL,requestData,successImgListCO,null);
        });
    }if(imgQuantity==1){
        $(r).load(function () {
            imgQuantity++
            $('.imgEditCC').html('<img src="' + r.result + '" alt="" width="150" height="150"  />');
            var URL= ApiPath.TMSApi.dictionary.upload;
            var requestData={
                file:r.result
            }
            ajaxHelp.AjaxForm(URL,requestData,successImgListCC,null);
        });
    }
    return true;
}
var attachmentCCURL="";
var attachmentCOURL="";
var successImgListCO=function (data) {
    //主图
    attachmentCCURL=data.url;
}
var successImgListCC=function (data) {
    //附图
    attachmentCOURL=data.url
}
//编辑提交
var EnterprisesSubmitEdit=function () {
    var URL = ApiPath.TMSApi.businessData.enterprisesModify;
    var requestData={
        corpRegNo:$("#corpRegNoEnterprisesEdit").val(),
        cECode:$("#cECodeEnterprisesEdit").val(),
        cEName:$("#cENameEnterprisesEdit").val(),
        corpRegProvinceCode :$("#corpRegProvinceCodeEnterprisesEdit").val(),
        corpRegCityCode:$("#corpRegCityCodeEnterprisesEdit").val(),
        corpRegDistrictCode:$("#corpRegDistrictCodeEnterprisesEdit").val(),
        corpRegAddress:$("#corpRegAddressEnterprisesEdit").val(),
        corpRegLegalRep:$("#corpRegLegalRepEnterprisesEdit").val(),
        corpRegBizStartDate:$("#corpRegBizStartDateEnterprisesEdit").val(),
        corpRegBizEndDate :$("#corpRegBizEndDateEnterprisesEdit").val(),
        attachmentCC:[{url:attachmentCCURL}],
        attachmentCO:[{url:attachmentCOURL}],
        cEOrgCode:pram[0].enterpriseOrgCode
    }
    ajaxHelp.AjaxPost(URL,requestData,successEnterprisesSubmitEdit,null);
}
var successEnterprisesSubmitEdit=function () {
    alert("提交成功！")
}

getEnterprisesInfo();;


