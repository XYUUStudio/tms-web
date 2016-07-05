/**
 * Created by medlog on 2016/7/5.
 */
var ajaxHelp = new AjaxHelp();

//用户新增提交
var userAddSubmit = function () {
    alert("提交成功");
    //var URL = ApiPath.TMSApi.businessData.enterprisesRegister;
    //var requestData = {
    //    cECode: $("#cECodeEnterprisesAdd").val(),
    //    cEName: $("#cENameEnterprisesAdd").val(),
    //    corpRegProvinceCode: $("#corpRegProvinceCodeEnterprisesAdd").val(),
    //    corpRegCityCode: $("#corpRegCityCodeEnterprisesAdd").val(),
    //    corpRegDistrictCode: $("#corpRegDistrictCodeEnterprisesAdd").val(),
    //    corpRegAddress: $("#corpRegAddressEnterprisesAdd").val(),
    //    corpRegLegalRep: $("#corpRegLegalRepEnterprisesAdd").val(),
    //    corpRegBizStartDate: $("#corpRegBizStartDateEnterprisesAdd").val(),
    //    corpRegBizEndDate: $("#corpRegBizEndDateEnterprisesAdd").val(),
    //};
    //ajaxHelp.AjaxPost(URL, requestData, successUserAddSubmit, null);
}

var successUserAddSubmit = function () {
    alert("提交成功");
}
