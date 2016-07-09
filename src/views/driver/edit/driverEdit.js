/**
 * Created by medlog on 2016/7/8.
 */
var ajaxHelp = new AjaxHelp();
var driverInfo = new Object();

//司机编辑-获取司机信息
var rowData = $("#driverList").datagrid("getSelections");
var getInfoDriverEdit = function () {
    var URL = ApiPath.TMSApi.businessData.driverDetail;
    var requestData = {
        userId: rowData[0].userId,
        userIDCard: rowData[0].userIDCard
    };
    console.log(rowData);
    ajaxHelp.AjaxPost(URL, requestData, successGetInfoDriverEdit, null);
};
var successGetInfoDriverEdit = function (data) {
    driverInfo = data;
    $("#loginNameDriverEdit").val(data.loginName);
    $("#lCNameDriverEdit").val(data.lCName);
    $("#userNameDriverEdit").val(data.userName);
    $("#userIDCardDriverEdit").val(data.userIDCard);
    $("#userMobileDriverEdit").val(data.userMobile);
    getProvinceDriverEdit();
};
getInfoDriverEdit();


//司机编辑-获取省
var getProvinceDriverEdit = function () {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level: 1,
        parentDivCode: ""
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetProvinceDriverEdit, null);
};
var successGetProvinceDriverEdit = function (data) {
    $.each(data, function (index, item) {
        $("#provinceDriverEdit").append("<option value='" + item.id + "' >" + item.name + "</option>");
        if (driverInfo.corpRegProvinceCode == item.id) {
            $("#provinceDriverEdit").find("option[value='" + item.id + "']").attr("selected", true)
        }
    });
    getCityDriverEdit()
};
//司机编辑-获取市
var getCityDriverEdit = function () {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level: 2,
        parentDivCode: driverInfo.corpRegProvinceCode
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetCityDriverEdit, null);
};
var successGetCityDriverEdit = function (data) {
    $.each(data, function (index, item) {
        $("#cityDriverEdit").append("<option value='" + item.id + "' >" + item.name + "</option>");
        if (driverInfo.corpRegCityCode == item.id) {
            $("#cityDriverEdit").find("option[value='" + item.id + "']").attr("selected", true)
        }
    });
    getDistrictDriverEdit();
};
//司机编辑-获取区
var getDistrictDriverEdit = function () {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level: 3,
        parentDivCode: driverInfo.corpRegCityCode
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetDistrictDriverEdit, null);
};
var successGetDistrictDriverEdit = function (data) {
    $.each(data, function (index, item) {
        $("#districtDriverEdit").append("<option value='" + item.id + "' >" + item.name + "</option>");
        if (driverInfo.corpRegDistrictCode == item.id) {
            $("#districtDriverEdit").find("option[value='" + item.id + "']").attr("selected", true)
        }
    })
};


//司机编辑-提交
var submitDriverEdit = function () {
    var URL = ApiPath.TMSApi.businessData.driverEdit;
    var requestData = {
        userId: rowData[0].userId,
        //isDriverUser: "Y",
        userName: $("#userNameDriverEdit").val(),
        userIDCard: $("#userIDCardDriverEdit").val(),
        userMobile: $("#userMobileDriverEdit").val(),
        address: $("#addressDriverEdit").val(),
        userEmail: $("#userEmailDriverEdit").val(),
        driverLicNo: $("#driverLicNoDriverEdit").val(),
        roadFrtQCertNo: $("#roadFrtQCertNoDriverEdit").val(),
        driverLicEffectiveDateEnd: $("#driverLicEffectiveDateEndDriverEdit").val(),
        driverLicIssueDate: $("#driverLicIssueDateDriverEdit").val(),
        plateNo: $("#plateNoDriverEdit").val(),
        vehicleLicSpecification: $("#vehicleLicSpecificationDriverEdit").val(),
        vehicleLicIssueDate: $("#vehicleLicIssueDateDriverEdit").val(),
        vehicleLicLastestInspEffEndDate: $("#vehicleLicLastestInspEffEndDateDriverEdit").val(),
        vehicleCapacity: $("#vehicleCapacityDriverEdit").val(),
        vehicleOPCertNo: $("#vehicleOPCertNoDriverEdit").val(),
        vehicleLength: $("#vehicleLengthDriverEdit").val(),
        vehicleWidth: $("#vehicleWidthDriverEdit").val(),
        vehicleHeight: $("#vehicleHeightDriverEdit").val(),
        vehicleOwnerType: $("#vehicleOwnerTypeDriverEdit").val(),
        compulsoryInsuranceCompany: $("#compulsoryInsuranceCompanyDriverEdit").val(),
        compulsoryInsuranceDocNo: $("#compulsoryInsuranceDocNoDriverEdit").val(),
        compulsoryInsuranceEffectiveEndDate: $("#compulsoryInsuranceEffectiveEndDateDriverEdit").val(),
        compulsoryInsuranceAmt: $("#compulsoryInsuranceAmtDriverEdit").val(),
        commercialInsuranceCompany: $("#commercialInsuranceCompanyDriverEdit").val(),
        commercialInsuranceDocNo: $("#commercialInsuranceDocNoDriverEdit").val(),
        commercialInsuranceEffectiveEndDate: $("#commercialInsuranceEffectiveEndDateDriverEdit").val(),
        commercialInsuranceAmt: $("#commercialInsuranceAmtDriverEdit").val()
    };
    ajaxHelp.AjaxPost(URL, requestData, successSubmitDriverAdd, null);
};
var successSubmitDriverAdd = function () {
    alert("提交成功");
};


//司机编辑-关闭
var closeDriverEdit = function () {
    alert("关闭");
};
