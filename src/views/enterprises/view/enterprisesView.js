/**
 * Created by medlog-dev-2 on 2016/7/4.
 */
/**
 * Created by medlog-dev-2 on 2016/7/4.
 */
var ajaxHelp = new AjaxHelp();
var pram=getEnterprisesDate();
console.log(pram[0])
var getEnterprisesView=function () {
    var URL = ApiPath.TMSApi.businessData.enterprisesDetail;
    var requestData={
        cEOrgCode:pram[0].enterpriseOrgCode
    };
    ajaxHelp.AjaxPost(URL,requestData,successEnterprisesView,null);
}
var successEnterprisesView=function (data) {
    //赋值
    data.corpRegBizStartDate=new Date().format('yyyy-MM-dd')
    data.corpRegBizEndDate=new Date().format('yyyy-MM-dd')
    $("#cECodeEnterprisesView").html(data.cECode);
    $("#cENameEnterprisesView").html(data.cEName);
    $("#corpRegNoEnterprisesView").html(data.corpRegNo);
    $("#corpRegAddressEnterprisesView").html(data.corpRegAddress);
    $("#corpRegLegalRepEnterprisesView").html(data.corpRegLegalRep);
    $("#corpRegBizStartDateEnterprisesView").html(data.corpRegBizStartDate);
    $("#corpRegBizEndDateEnterprisesView").html(data.corpRegBizEndDate);
    $("#corpRegProvinceCodeEnterprisesView").html(data.corpRegProvinceCodeName)
    $("#corpRegCityCodeEnterprisesView").html(data.corpRegCityCodeName)
    $("#corpRegDistrictCodeEnterprisesView").html(data.corpRegDistrictCodeName)
    if(data.attachmentCO[0].url!=""){
        $('.imgViewCO').html('<img src="' + data.attachmentCO[0].url + '" alt="" width="150" height="150" />')
    }
    if(data.attachmentCC[0].url!=""){
        $('.imgViewCC').html('<img src="' + data.attachmentCC[0].url + '" alt="" width="150" height="150" />')
    }
}
getEnterprisesView();
