/**
 * Created by medlog-dev-2 on 2016/7/4.
 */
var ajaxHelp = new AjaxHelp();
var pram=getEnterprisesDate();
var EnterprisesInfo=new  Object();
var attachmentCCURL="";
var attachmentCOURL="";
var getEnterprisesInfo=function () {
    var URL = ApiPath.TMSApi.businessData.enterprisesDetail;
    var requestData={
        cEOrgCode:pram[0].enterpriseOrgCode
};
    ajaxHelp.AjaxPost(URL,requestData,successEnterprisesEdit,null);
};
var successEnterprisesEdit=function (data) {
      //赋值
    EnterprisesInfo=data;
    console.log(EnterprisesInfo)
        $("#cECodeEnterprisesEdit").val(data.cECode);
        $("#cENameEnterprisesEdit").val(data.cEName);
        $("#corpRegNoEnterprisesEdit").val(data.corpRegNo);
        $("#corpRegEditressEnterprisesEdit").val(data.corpRegEditress);
        $("#corpRegLegalRepEnterprisesEdit").val(data.corpRegLegalRep);
        $("#corpRegBizStartDateEnterprisesEdit").val(data.corpRegBizStartDate);
        $("#corpRegBizEndDateEnterprisesEdit").val(data.corpRegBizEndDate);
     if(data.attachmentCO.length!=0){
         if(data.attachmentCO[0].url!=""){
             attachmentCOURL=data.attachmentCO[0].url;
             $('.imgEditCO').html('<img src="' + data.attachmentCO[0].url + '" alt="" width="150" height="150" />')
         }
     }
     if(data.attachmentCC.length!=0){
         if(data.attachmentCC[0].url!=""){
             attachmentCCURL=data.attachmentCC[0].url;
             $('.imgEditCC').html('<img src="' + data.attachmentCC[0].url + '" alt="" width="150" height="150" />')
         }
     }
    getAdmDivision()
};


//获取选中省
var getAdmDivision=function () {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:1,
        parentDivCode:""
    };
    ajaxHelp.AjaxPost(URL,requestData,successAdmDivision,null);
};
var successAdmDivision=function (data) {
    $.each(data, function (index,item ) {
        $("#corpRegProvinceCodeEnterprisesEdit").append(" <option value='"+item.divCode+"' >"+item.divName+"</option>")
        if(EnterprisesInfo.corpRegProvinceCode==item.divCode){
            $("#corpRegProvinceCodeEnterprisesEdit").find("option[value='"+item.divCode+"']").attr("selected",true)
        }
    });
    getCity()
};
//获取选中市
var getCity =function () {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:2,
        parentDivCode:EnterprisesInfo.corpRegProvinceCode
    };
    ajaxHelp.AjaxPost(URL,requestData,successgetCity,null);
};
var successgetCity=function (data) {
    $.each(data, function (index,item ) {
        $("#corpRegCityCodeEnterprisesEdit").append(" <option value='"+item.divCode+"' >"+item.divName+"</option>")
        if(EnterprisesInfo.corpRegCityCode==item.divCode){
            $("#corpRegCityCodeEnterprisesEdit").find("option[value='"+item.divCode+"']").attr("selected",true)
        }
    });
    District();
};
//获取选中区
var District =function () {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:3,
        parentDivCode:EnterprisesInfo.corpRegCityCode
    };
    ajaxHelp.AjaxPost(URL,requestData,successDistrict,null);
};
var successDistrict=function (data) {
    $.each(data, function (index,item ) {
        $("#corpRegDistrictCodeEnterprisesEdit").append(" <option value='"+item.divCode+"' >"+item.divName+"</option>")
        if(EnterprisesInfo.corpRegDistrictCode==item.divCode){
            $("#corpRegDistrictCodeEnterprisesEdit").find("option[value='"+item.divCode+"']").attr("selected",true)
        }
    })
};
//修改市
var  changeProvince=function (data) {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:2,
        parentDivCode:data
    };
    ajaxHelp.AjaxPost(URL,requestData,successProvince,null);
};
var successProvince=function (data) {
    $("#corpRegCityCodeEnterprisesEdit").empty();
    $("#corpRegCityCodeEnterprisesEdit").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
    $("#corpRegDistrictCodeEnterprisesEdit").empty();
    $("#corpRegDistrictCodeEnterprisesEdit").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
    $.each(data, function (index,item ) {
        $("#corpRegCityCodeEnterprisesEdit").append(" <option value='"+item.divCode+"' >"+item.divName+"</option>")
    })
};
//修改市区
var changeCity=function (data) {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level:3,
        parentDivCode:data
    };
    ajaxHelp.AjaxPost(URL,requestData,successChangeCity,null);
};
var successChangeCity=function (data) {
    $("#corpRegDistrictCodeEnterprisesEdit").empty();
    $("#corpRegDistrictCodeEnterprisesEdit").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
    $.each(data, function (index,item ) {
        $("#corpRegDistrictCodeEnterprisesEdit").append(" <option value='"+item.divCode+"' >"+item.divName+"</option>")
    })
};
function  EnterprisesEditImg(imgData) {
    var file = imgData.files[0]; //选择上传的文件
    var r = new FileReader();
    r.readAsDataURL(file); //Base64
    $(r).load(function () {
        $('.imgEditCO').html('<img src="' + r.result + '" alt="" width="150" height="150" />')
        var URL= ApiPath.TMSApi.dictionary.upload;
        var requestData={
            file:r.result
        };
        ajaxHelp.AjaxForm(URL,requestData,successImgListCO,null);
    });
    return true;
}
function  EnterprisesEditCCImg(imgData) {
    var file = imgData.files[0]; //选择上传的文件
    var r = new FileReader();
    r.readAsDataURL(file); //Base64
    $(r).load(function () {
        $('.imgEditCC').html('<img src="' + r.result + '" alt="" width="150" height="150" />')
        var URL= ApiPath.TMSApi.dictionary.upload;
        var requestData={
            file:r.result
        };
        ajaxHelp.AjaxForm(URL,requestData,successImgListCC,null);
    });
    return true;
}
var delattachmentCO=function () {
    $('.imgEditCO').html('<img src="" alt="" width="150" height="150"  border="0px" />');
};
var delattachmentCC=function () {
    $('.imgEditCC').html('<img src="" alt="" width="150" height="150"  border="0px" />');
};
var successImgListCO=function (data) {
    //主图
    attachmentCOURL=data.url;
};
var successImgListCC=function (data) {
    //附图
    attachmentCCURL=data.url
};
//必填验证
var verification=function () {
    var resule=true;
    if($("#cECodeEnterprisesEdit").val()==""){
        resule=false;
        $.messager.alert('提示', "请输入该企业客户编号！", "error");
    }
    else  if($("#corpRegNoEnterprisesEdit").val()==""){
        resule=false;
        $.messager.alert('提示', "请输入该企业营业执照证号！", "error");
    }
    else  if($("#cENameEnterprisesEdit").val()==""){
        resule=false;
        $.messager.alert('提示', "请输入该企业名称！", "error");
    }
    else  if($("#corpRegProvinceCodeEnterprisesEdit").val()==""||$("#corpRegCityCodeEnterprisesEdit").val()==""||
        $("#corpRegDistrictCodeEnterprisesEdit").val()==""||$("#corpRegEditressEnterprisesEdit").val()==""){
        resule=false;
        $.messager.alert('提示', "请输入该企业注册地址！", "error");
    }
    else  if($("#corpRegLegalRep").val()==""){
        resule=false;
        $.messager.alert('提示', "请输入该企业法人姓名！", "error");
    }
    else  if($("#corpRegBizStartDateEnterprisesEdit").datebox('getValue')==""){
        resule=false;
        $.messager.alert('提示', "请选择营业期限开始时间！", "error");
    }
    else  if($("#corpRegBizEndDateEnterprisesEdit").datebox('getValue')==""){
        resule=false;
        $.messager.alert('提示', "请选择营业期限截止时间！", "error");
    }
    return resule;
};
//编辑提交
var EnterprisesSubmitEdit=function () {
    if(verification()){
        var URL = ApiPath.TMSApi.businessData.enterprisesModify;
        var corpRegBizStartDate=$("#corpRegBizStartDateEnterprisesEdit").datebox('getValue')+" 00:00:00";
        var corpRegBizEndDate=$("#corpRegBizEndDateEnterprisesEdit").datebox('getValue')+" 23:59:59";
        var requestData={
            corpRegNo:$("#corpRegNoEnterprisesEdit").val(),
            cECode:$("#cECodeEnterprisesEdit").val(),
            cEName:$("#cENameEnterprisesEdit").val(),
            corpRegProvinceCode :$("#corpRegProvinceCodeEnterprisesEdit").val(),
            corpRegCityCode:$("#corpRegCityCodeEnterprisesEdit").val(),
            corpRegDistrictCode:$("#corpRegDistrictCodeEnterprisesEdit").val(),
            corpRegEditress:$("#corpRegEditressEnterprisesEdit").val(),
            corpRegLegalRep:$("#corpRegLegalRepEnterprisesEdit").val(),
            corpRegBizStartDate:corpRegBizStartDate,
            corpRegBizEndDate :corpRegBizEndDate,
            attachmentCC:[{url:attachmentCCURL}],
            attachmentCO:[{url:attachmentCOURL}],
            cEOrgCode:pram[0].enterpriseOrgCode
        };
        ajaxHelp.AjaxPost(URL,requestData,successEnterprisesSubmitEdit,null);
    }
};
var successEnterprisesSubmitEdit=function () {
    alert("提交成功！")
    $("#tabs").tabs('close','企业编辑');
    loadEnterprisesList();
};
getEnterprisesInfo();


