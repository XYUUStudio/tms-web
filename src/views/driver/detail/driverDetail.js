/**
 * Created by medlog on 2016/7/8.
 */
var ajaxHelp = new AjaxHelp();
var rowData = getDetailDriverList();


//司机管理-详情
var getDetailDriverDetail = function () {
    var URL = ApiPath.TMSApi.businessData.driverDetail;
    var requestData = {
        userId: rowData[0].userId
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetDetailDriverDetail, null);
};
var successGetDetailDriverDetail = function (responseData) {
    //赋值
    $("#loginNameDriverDetail").html(responseData.loginName);//账户名
    $("#lCNameDriverDetail").html(responseData.lCName);//所属物流中心
    $("#userNameDriverDetail").html(responseData.userName);//姓名
    $("#userIDCardDriverDetail").html(responseData.userIDCard);//身份证号
    $("#userMobileDriverDetail").html(responseData.userMobile);//手机号
    $("#userEmailDriverDetail").html(responseData.userEmail);//邮箱
    $("#driverLicNoDriverDetail").html(responseData.driverLicNo);//驾驶证号
    $("#roadFrtQCertNoDriverDetail").html(responseData.roadFrtQCertNo);//驾驶证从业资格证号
    $("#plateNoDriverDetail").html(responseData.plateNo);//车牌号
    $("#vehicleLicSpecificationDriverDetail").html(responseData.vehicleLicSpecification);//车型
    $("#vehicleCapacityDriverDetail").html(responseData.vehicleCapacity);//车辆容量
    $("#vehicleOPCertNoDriverDetail").html(responseData.vehicleOPCertNo);//行驶证营运证号
    $("#vehicleLengthDriverDetail").html(responseData.vehicleLength);//长
    $("#vehicleWidthDriverDetail").html(responseData.vehicleWidth);//宽
    $("#vehicleHeightDriverDetail").html(responseData.vehicleHeight);//高
    $("#vehicleOwnerTypeDriverDetail").html(responseData.vehicleOwnerTypeName);//车辆所属
    $("#compulsoryInsuranceCompanyDriverDetail").html(responseData.compulsoryInsuranceCompanyName);//交强险公司
    $("#compulsoryInsuranceDocNoDriverDetail").html(responseData.compulsoryInsuranceDocNo);//交强险单号
    $("#compulsoryInsuranceAmtDriverDetail").html(responseData.compulsoryInsuranceAmt);//交强险金额
    $("#commercialInsuranceCompanyDriverDetail").html(responseData.commercialInsuranceCompanyName);//商业险公司
    $("#commercialInsuranceDocNoDriverDetail").html(responseData.commercialInsuranceDocNo);//商业险单号
    $("#commercialInsuranceAmtDriverDetail").html(responseData.commercialInsuranceAmt);//商业险金额
    //地址
    $("#provinceDriverDetail").html(responseData.residentProvinceCodeName);//省
    $("#cityDriverDetail").html(responseData.residentCityCodeName);//市
    $("#districtDriverDetail").html(responseData.residentDistrictCodeName);//区
    $("#addressDriverDetail").html(responseData.residentAddress);//详细地址
    //日期
    $("#driverLicEffectiveDateEndDriverDetail").html(responseData.driverLicEffectiveDateEnd);//驾驶证有效期
    $("#driverLicIssueDateDriverDetail").html(responseData.driverLicIssueDate);//驾驶证发证日期
    $("#vehicleLicIssueDateDriverDetail").html(responseData.vehicleLicIssueDate);//行驶证发证日期
    $("#vehicleLicLastestInspEffEndDateDriverDetail").html(responseData.vehicleLicLastestInspEffEndDate);//行驶证年检有效日期
    $("#compulsoryInsuranceEffectiveEndDateDriverDetail").html(responseData.compulsoryInsuranceEffectiveEndDate);//交强险有效期
    $("#commercialInsuranceEffectiveEndDateDriverDetail").html(responseData.commercialInsuranceEffectiveEndDate);//商业险有效期
    //图片
    if (responseData.iDPositive != null) {
        //身份证正面
        $("#iDPositiveDriverDetail").html('<img src="' + responseData.iDPositive.url + '" alt="" width="150" height="80" />')
    }
    if (responseData.iDInverse != null) {
        //身份证反面
        $("#iDInverseDriverDetail").html('<img src="' + responseData.iDInverse.url + '" alt="" width="150" height="80" />')
    }
    if (responseData.driverLicPositive != null) {
        //驾驶证
        $("#driverLicPositiveDriverDetail").html('<img src="' + responseData.driverLicPositive.url + '" alt="" width="150" height="80" />')
    }
    if (responseData.vehicleLicPositive != null) {
        //行驶证
        $("#vehicleLicPositiveDriverDetail").html('<img src="' + responseData.vehicleLicPositive.url + '" alt="" width="150" height="80" />')
    }
    if (responseData.compulsoryInsurancePositive != null) {
        //交强险保单正面
        $("#compulsoryInsurancePositiveDriverDetail").html('<img src="' + responseData.compulsoryInsurancePositive.url + '" alt="" width="150" height="80" />')
    }
    if (responseData.compulsoryInsuranceInverse != null) {
        //交强险保单反面
        $("#compulsoryInsuranceInverseDriverDetail").html('<img src="' + responseData.compulsoryInsuranceInverse.url + '" alt="" width="150" height="80" />')
    }
    if (responseData.commercialInsurancePositive != null) {
        //商业险保单正面
        $("#commercialInsurancePositiveDriverDetail").html('<img src="' + responseData.commercialInsurancePositive.url + '" alt="" width="150" height="80" />')
    }
    if (responseData.commercialInsuranceInverse != null) {
        //商业险保单反面
        $("#commercialInsuranceInverseDriverDetail").html('<img src="' + responseData.commercialInsuranceInverse.url + '" alt="" width="150" height="80" />')
    }
};


//司机管理-详情
getDetailDriverDetail();
