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
    $("#vehicleLengthDriverDetail").html(responseData.vehicleLength + "×");//长
    $("#vehicleWidthDriverDetail").html(responseData.vehicleWidth + "×");//宽
    $("#vehicleHeightDriverDetail").html(responseData.vehicleHeight);//高
    $("#vehicleOwnerTypeDriverDetail").html(responseData.vehicleOwnerType);//车辆所属
    $("#compulsoryInsuranceCompanyDriverDetail").html(responseData.compulsoryInsuranceCompany);//交强险公司
    $("#compulsoryInsuranceDocNoDriverDetail").html(responseData.compulsoryInsuranceDocNo);//交强险单号
    $("#compulsoryInsuranceAmtDriverDetail").html(responseData.compulsoryInsuranceAmt);//交强险金额
    $("#commercialInsuranceCompanyDriverDetail").html(responseData.commercialInsuranceCompany);//商业险公司
    $("#commercialInsuranceDocNoDriverDetail").html(responseData.commercialInsuranceDocNo);//商业险单号
    $("#commercialInsuranceAmtDriverDetail").html(responseData.commercialInsuranceAmt);//商业险金额
    //地址
    var province = responseData.residentProvinceCodeName;//省
    var city = responseData.residentCityCodeName;//市
    var district = responseData.residentDistrictCodeName;//区
    var address = responseData.residentAddress;//详细地址
    $("#addressDriverDetail").html(province + city + district + address);
    //日期
    $("#driverLicEffectiveDateEndDriverDetail").html(responseData.driverLicEffectiveDateEnd);//驾驶证有效期
    $("#driverLicIssueDateDriverDetail").html(responseData.driverLicIssueDate);//驾驶证发证日期
    $("#vehicleLicIssueDateDriverDetail").html(responseData.vehicleLicIssueDate);//行驶证发证日期
    $("#vehicleLicLastestInspEffEndDateDriverDetail").html(responseData.vehicleLicLastestInspEffEndDate);//行驶证年检有效日期
    $("#compulsoryInsuranceEffectiveEndDateDriverDetail").html(responseData.compulsoryInsuranceEffectiveEndDate);//交强险有效期
    $("#commercialInsuranceEffectiveEndDateDriverDetail").html(responseData.commercialInsuranceEffectiveEndDate);//商业险有效期
    //图片
    if (responseData.iDPositive != null) {
        $("#iDPositiveDriverDetail").html('<img src="' + responseData.iDPositive.url + '" alt="" width="200" height="80" />')
    }//身份证正面
    //$("#iDInverseDriverDetail").html(responseData.iDInverse);
    if (responseData.driverLicPositive != null) {
        $("#driverLicPositiveDriverDetail").html('<img src="' + responseData.driverLicPositive.url + '" alt="" width="200" height="80" />')
    }//驾驶证正面
    if (responseData.vehicleLicPositive != null) {
        $("#vehicleLicPositiveDriverDetail").html('<img src="' + responseData.vehicleLicPositive.url + '" alt="" width="200" height="80" />')
    }//行驶证正面
    if (responseData.compulsoryInsurancePositive != null) {
        $("#compulsoryInsurancePositiveDriverDetail").html('<img src="' + responseData.compulsoryInsurancePositive.url + '" alt="" width="200" height="80" />')
    }//交强险保单正面
    if (responseData.commercialInsurancePositive != null) {
        $("#commercialInsurancePositiveDriverDetail").html('<img src="' + responseData.commercialInsurancePositive.url + '" alt="" width="200" height="80" />')
    }//商业险保单正面
};


//司机管理-详情
getDetailDriverDetail();
