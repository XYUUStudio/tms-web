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

        $("#corpRegProvinceCodeEnterprisesAdd").append(" <option value='"+item.id+"' >"+item.name+"</option>")
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
  function  aaa(imgData) {
      var file = imgData.files[0]; //选择上传的文件
      var r = new FileReader();
      r.readAsDataURL(file); //Base64
      if (imgQuantity>=2){
          alert("最多允许添加两张图片")
      }if(imgQuantity==0){
          $(r).load(function () {
              imgQuantity++;
              $('.imgListCO').html('<img src="' + r.result + '" alt="" width="150" height="150" />')
              var URL= ApiPath.TMSApi.dictionary.upload;
              var requestData={
                  file:r.result
              }
              ajaxHelp.AjaxForm(URL,requestData,successImgListCO,null);
          });
      }if(imgQuantity==1){
          $(r).load(function () {
              imgQuantity++
              $('.imgListCC').html('<img src="' + r.result + '" alt="" width="150" height="150"  />');
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

var EnterprisesSubmitAdd=function () {
    //赋值
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
        corpRegBizStartDate:$("#corpRegBizStartDateEnterprisesAdd").val(),
        corpRegBizEndDate :$("#corpRegBizEndDateEnterprisesAdd").val(),
        //图片附件上传
        attachmentCC:[{url:attachmentCCURL}],
        attachmentCO:[{url:attachmentCOURL}]
    };
    ajaxHelp.AjaxPost(URL,requestData,successEnterprisesSubmitAdd,null);
}
var successEnterprisesSubmitAdd=function () {
    alert("提交成功")
}
getAdmDivision();
