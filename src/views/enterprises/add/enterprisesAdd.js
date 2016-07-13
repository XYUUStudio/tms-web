/**
 * Created by medlog-dev-2 on 2016/7/4.
 */
var ajaxHelp = new AjaxHelp();

//获取省市区
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
        $("#corpRegProvinceCodeEnterprisesAdd").append(" <option value='"+item.divCode+"' >"+item.divName+"</option>")
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
        $("#corpRegCityCodeEnterprisesAdd").append(" <option value='"+item.divCode+"' >"+item.divName+"</option>")
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
        $("#corpRegDistrictCodeEnterprisesAdd").append(" <option value='"+item.divCode+"' >"+item.divName+"</option>")
    })
}
  function  aaa(imgData) {
      var file = imgData.files[0]; //选择上传的文件
      var r = new FileReader();
      r.readAsDataURL(file); //Bas e64
          $(r).load(function () {
              $('#imgListCO').attr("src", r.result)
              $('#imgListCOa').attr("href", r.result)
              var URL= ApiPath.TMSApi.dictionary.upload;
              var requestData={
                  file:r.result
              }
              ajaxHelp.AjaxForm(URL,requestData,successImgListCO,null);
          });
      return true;
  }
function  bbb(imgData) {
    var file = imgData.files[0]; //选择上传的文件
    var r = new FileReader();
    r.readAsDataURL(file); //Base64
    $(r).load(function () {
        $('#imgListCC').attr("src", r.result)
        $('#imgListCCa').attr("href", r.result)
        var URL= ApiPath.TMSApi.dictionary.upload;
        var requestData={
            file:r.result
        }
        ajaxHelp.AjaxForm(URL,requestData,successImgListCC,null);
    });
}
var deleteattachmentCO=function () {
    $('#imgListCO').attr("src","../images/fujianimg.png");
     $('#imgListCOa').removeAttr("href");
    attachmentCOURL=""
}
var deleteattachmentCC=function () {
    $('#imgListCC').attr("src","../images/fujianimg.png");
    $('#imgListCCa').removeAttr("href");
    attachmentCCURL=""
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
var verification=function () {
    var resule=true;
    if($("#cECodeEnterprisesAdd").val()==""){
        resule=false;
        $.messager.alert('提示', "请输入该企业客户编号！", "error");
    }
    else  if($("#corpRegNoEnterprisesAdd").val()==""){
        resule=false;
        $.messager.alert('提示', "请输入该企业营业执照证号！", "error");
    }
    else  if($("#cENameEnterprisesAdd").val()==""){
        resule=false;
        $.messager.alert('提示', "请输入该企业名称！", "error");
    }
    else  if($("#corpRegProvinceCodeEnterprisesAdd").val()==""||$("#corpRegCityCodeEnterprisesAdd").val()==""||
        $("#corpRegDistrictCodeEnterprisesAdd").val()==""||$("#corpRegAddressEnterprisesAdd").val()==""){
        resule=false;
        $.messager.alert('提示', "请输入该企业注册地址！", "error");
    }
    else  if($("#corpRegLegalRep").val()==""){
        resule=false;
        $.messager.alert('提示', "请输入该企业法人姓名！", "error");
    }
    else  if($("#corpRegBizStartDateEnterprisesAdd").datebox('getValue')==""){
        resule=false;
        $.messager.alert('提示', "请选择营业期限开始时间！", "error");
    }
    else  if($("#corpRegBizEndDateEnterprisesAdd").datebox('getValue')==""){
        resule=false;
        $.messager.alert('提示', "请选择营业期限截止时间！", "error");
    }
    return resule;
}
var EnterprisesSubmitAdd=function () {
    //赋值
    if(verification()){
        var corpRegBizStartDate=$("#corpRegBizStartDateEnterprisesAdd").datebox('getValue')+" 00:00:00";
        var corpRegBizEndDate=$("#corpRegBizEndDateEnterprisesAdd").datebox('getValue')+" 23:59:59";
        var URL = ApiPath.TMSApi.businessData.enterprisesRegister;
        var requestData = {
            cECode:$("#cECodeEnterprisesAdd").val(),
            corpRegNo:$("#corpRegNoEnterprisesAdd").val(),
            cEName:$("#cENameEnterprisesAdd").val(),
            corpRegProvinceCode :$("#corpRegProvinceCodeEnterprisesAdd").val(),
            corpRegCityCode:$("#corpRegCityCodeEnterprisesAdd").val(),
            corpRegDistrictCode:$("#corpRegDistrictCodeEnterprisesAdd").val(),
            corpRegAddress:$("#corpRegAddressEnterprisesAdd").val(),
            corpRegLegalRep:$("#corpRegLegalRepEnterprisesAdd").val(),
            corpRegBizStartDate:corpRegBizStartDate,
            corpRegBizEndDate :corpRegBizEndDate,
            //图片附件上传
            attachmentCC:[{url:attachmentCCURL}],
            attachmentCO:[{url:attachmentCOURL}]
        };
        ajaxHelp.AjaxPost(URL,requestData,successEnterprisesSubmitAdd,null);
    }
}
var successEnterprisesSubmitAdd=function () {
    alert("提交成功")
    $("#tabs").tabs('close','企业新增');
    loadEnterprisesList();
}
getAdmDivision();
