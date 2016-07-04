/**
 * Created by medlog-dev-2 on 2016/7/4.
 */
var ajaxHelp = new AjaxHelp();
var EnterprisesSubmitAdd=function () {
    //赋值
    var URL = ApiPath.TMSApi.businessData.enterprisesRegister;
    var requestData = {
        cECode:$("#cECodeEnterprisesAdd").val(),
        cEName:$("#cENameEnterprisesAdd").val(),
        corpRegProvinceCode :$("#corpRegProvinceCodeEnterprisesAdd").val(),
        corpRegCityCode:$("#corpRegCityCodeEnterprisesAdd").val(),
        corpRegDistrictCode:$("#corpRegDistrictCodeEnterprisesAdd").val(),
        corpRegAddress:$("#corpRegAddressEnterprisesAdd").val(),
        corpRegLegalRep:$("#corpRegLegalRepEnterprisesAdd").val(),
        corpRegBizStartDate:$("#corpRegBizStartDateEnterprisesAdd").val(),
        corpRegBizEndDate :$("#corpRegBizEndDateEnterprisesAdd").val(),
        //图片附件上传


    };
    ajaxHelp.AjaxPost(URL,requestData,successEnterprisesSubmitAdd,null);

}
var successEnterprisesSubmitAdd=function () {
    alert("提交成功")
}
