/**
 * Created by medlog on 2016/7/8.
 */
var ajaxHelp = new AjaxHelp();
var rowData = getDetailDriverList();
console.log(rowData);


//司机管理-详情
var getDetailDriverDetail = function () {
    var URL = ApiPath.TMSApi.businessData.driverDetail;
    var requestData = {
        userId: rowData[0].userId
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetDetailDriverDetail, null);
};
var successGetDetailDriverDetail = function (responseData) {
    console.log(responseData.iDPositive.url);
    $("#loginNameDriverDetail").html(responseData.loginName);
    $("#lCNameDriverDetail").html(responseData.lCName);
    $("#userNameDriverDetail").html(responseData.userName);
    $("#userIDCardDriverDetail").html(responseData.userIDCard);
    $("#userMobileDriverDetail").html(responseData.userMobile);
    $("#userEmailDriverDetail").html(responseData.userEmail);
    $("#addressDriverDetail").html(responseData.address);
    //身份证正面
    if(responseData.iDPositive.url!=""){
        $("#iDPositiveDriverDetail").html('<img src="' + responseData.iDPositive.url + '" alt="" width="150" height="150" />')
    }
    //$("#iDPositiveDriverDetail").html(responseData.iDPositive);
    $("#iDInverseDriverDetail").html(responseData.iDInverse);
    $("#driverLicNoDriverDetail").html(responseData.driverLicNo);
    $("#roadFrtQCertNoDriverDetail").html(responseData.roadFrtQCertNo);
    $("#driverLicEffectiveDateEndDriverDetail").html(responseData.driverLicEffectiveDateEnd);
    $("#driverLicIssueDateDriverDetail").html(responseData.driverLicIssueDate);
    $("#driverLicPositiveDriverDetail").html(responseData.driverLicPositive);
    $("#plateNoDriverDetail").html(responseData.plateNo);
    $("#vehicleLicSpecificationDriverDetail").html(responseData.vehicleLicSpecification);
    $("#vehicleLicIssueDateDriverDetail").html(responseData.vehicleLicIssueDate);
    $("#vehicleLicLastestInspEffEndDateDriverDetail").html(responseData.vehicleLicLastestInspEffEndDate);
    $("#vehicleCapacityDriverDetail").html(responseData.vehicleCapacity);
    $("#vehicleOPCertNoDriverDetail").html(responseData.vehicleOPCertNo);
    $("#vehicleLengthDriverDetail").html(responseData.vehicleLength);
    $("#vehicleWidthDriverDetail").html(responseData.vehicleWidth);
    $("#vehicleHeightDriverDetail").html(responseData.vehicleHeight);
    $("#vehicleOwnerTypeDriverDetail").html(responseData.vehicleOwnerType);
    $("#vehicleLicPositiveDriverDetail").html(responseData.vehicleLicPositive);
    $("#compulsoryInsuranceCompanyDriverDetail").html(responseData.compulsoryInsuranceCompany);
    $("#compulsoryInsuranceDocNoDriverDetail").html(responseData.compulsoryInsuranceDocNo);
    $("#compulsoryInsuranceEffectiveEndDateDriverDetail").html(responseData.compulsoryInsuranceEffectiveEndDate);
    $("#compulsoryInsuranceAmtDriverDetail").html(responseData.compulsoryInsuranceAmt);
    $("#compulsoryInsurancePositiveDriverDetail").html(responseData.compulsoryInsurancePositive);
    $("#commercialInsuranceCompanyDriverDetail").html(responseData.commercialInsuranceCompany);
    $("#commercialInsuranceDocNoDriverDetail").html(responseData.commercialInsuranceDocNo);
    $("#commercialInsuranceEffectiveEndDateDriverDetail").html(responseData.commercialInsuranceEffectiveEndDate);
    $("#commercialInsuranceAmtDriverDetail").html(responseData.commercialInsuranceAmt);
    $("#commercialInsurancePositiveDriverDetail").html(responseData.commercialInsurancePositive);
};


//司机管理-详情
getDetailDriverDetail();
