/**
 * Created by medlog on 2016/7/8.
 */
var ajaxHelp = new AjaxHelp();
//获取司机信息(userId)
var rowData = $("#driverList").datagrid("getSelections");


//司机详情
var getDriverDetail = function () {
    var URL = ApiPath.TMSApi.businessData.driverDetail;
    var requestData = {
        userId: rowData[0].userId
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetDriverDetail, null);
};
var successGetDriverDetail = function (resultInfo) {
    //赋值
    $("#loginNameDriverDetail").html(resultInfo.loginName);//账户名
    $("#lCNameDriverDetail").html(resultInfo.lCName);//所属物流中心
    $("#userNameDriverDetail").html(resultInfo.userName);//姓名
    $("#userIDCardDriverDetail").html(resultInfo.userIDCard);//身份证号
    $("#userMobileDriverDetail").html(resultInfo.userMobile);//手机号
    $("#userEmailDriverDetail").html(resultInfo.userEmail);//邮箱
    $("#driverLicNoDriverDetail").html(resultInfo.driverLicNo);//驾驶证号
    $("#roadFrtQCertNoDriverDetail").html(resultInfo.roadFrtQCertNo);//驾驶证从业资格证号
    $("#plateNoDriverDetail").html(resultInfo.plateNo);//车牌号
    $("#vehicleLicSpecificationDriverDetail").html(resultInfo.vehicleLicSpecification);//车型
    $("#vehicleCapacityDriverDetail").html(resultInfo.vehicleCapacity);//车辆容量
    $("#vehicleOPCertNoDriverDetail").html(resultInfo.vehicleOPCertNo);//行驶证营运证号
    $("#vehicleLengthDriverDetail").html(resultInfo.vehicleLength);//长
    $("#vehicleWidthDriverDetail").html(resultInfo.vehicleWidth);//宽
    $("#vehicleHeightDriverDetail").html(resultInfo.vehicleHeight);//高
    $("#vehicleOwnerTypeDriverDetail").html(resultInfo.vehicleOwnerTypeName);//车辆所属
    $("#compulsoryInsuranceCompanyDriverDetail").html(resultInfo.compulsoryInsuranceCompanyName);//交强险公司
    $("#compulsoryInsuranceDocNoDriverDetail").html(resultInfo.compulsoryInsuranceDocNo);//交强险单号
    $("#compulsoryInsuranceAmtDriverDetail").html(resultInfo.compulsoryInsuranceAmt);//交强险金额
    $("#commercialInsuranceCompanyDriverDetail").html(resultInfo.commercialInsuranceCompanyName);//商业险公司
    $("#commercialInsuranceDocNoDriverDetail").html(resultInfo.commercialInsuranceDocNo);//商业险单号
    $("#commercialInsuranceAmtDriverDetail").html(resultInfo.commercialInsuranceAmt);//商业险金额
    //地址
    $("#provinceDriverDetail").html(resultInfo.residentProvinceCodeName);//省
    $("#cityDriverDetail").html(resultInfo.residentCityCodeName);//市
    $("#districtDriverDetail").html(resultInfo.residentDistrictCodeName);//区
    $("#addressDriverDetail").html(resultInfo.residentAddress);//详细地址
    //日期
    $("#driverLicEffectiveDateEndDriverDetail").html(resultInfo.driverLicEffectiveDateEnd);//驾驶证有效期
    $("#driverLicIssueDateDriverDetail").html(resultInfo.driverLicIssueDate);//驾驶证发证日期
    $("#vehicleLicIssueDateDriverDetail").html(resultInfo.vehicleLicIssueDate);//行驶证发证日期
    $("#vehicleLicLastestInspEffEndDateDriverDetail").html(resultInfo.vehicleLicLastestInspEffEndDate);//行驶证年检有效日期
    $("#compulsoryInsuranceEffectiveEndDateDriverDetail").html(resultInfo.compulsoryInsuranceEffectiveEndDate);//交强险有效期
    $("#commercialInsuranceEffectiveEndDateDriverDetail").html(resultInfo.commercialInsuranceEffectiveEndDate);//商业险有效期
    //图片
    if (resultInfo.iDPositive != null) {
        //身份证正面
        $("#iDPositiveDriverDetail").html('<img src="' + resultInfo.iDPositive.url + '" alt="" width="150" height="80" />')
    }
    if (resultInfo.iDInverse != null) {
        //身份证反面
        $("#iDInverseDriverDetail").html('<img src="' + resultInfo.iDInverse.url + '" alt="" width="150" height="80" />')
    }
    if (resultInfo.driverLicPositive != null) {
        //驾驶证
        $("#driverLicPositiveDriverDetail").html('<img src="' + resultInfo.driverLicPositive.url + '" alt="" width="150" height="80" />')
    }
    if (resultInfo.vehicleLicPositive != null) {
        //行驶证
        $("#vehicleLicPositiveDriverDetail").html('<img src="' + resultInfo.vehicleLicPositive.url + '" alt="" width="150" height="80" />')
    }
    if (resultInfo.compulsoryInsurancePositive != null) {
        //交强险保单正面
        $("#compulsoryInsurancePositiveDriverDetail").html('<img src="' + resultInfo.compulsoryInsurancePositive.url + '" alt="" width="150" height="80" />')
    }
    if (resultInfo.compulsoryInsuranceInverse != null) {
        //交强险保单反面
        $("#compulsoryInsuranceInverseDriverDetail").html('<img src="' + resultInfo.compulsoryInsuranceInverse.url + '" alt="" width="150" height="80" />')
    }
    if (resultInfo.commercialInsurancePositive != null) {
        //商业险保单正面
        $("#commercialInsurancePositiveDriverDetail").html('<img src="' + resultInfo.commercialInsurancePositive.url + '" alt="" width="150" height="80" />')
    }
    if (resultInfo.commercialInsuranceInverse != null) {
        //商业险保单反面
        $("#commercialInsuranceInverseDriverDetail").html('<img src="' + resultInfo.commercialInsuranceInverse.url + '" alt="" width="150" height="80" />')
    }
};


//司机详情
getDriverDetail();
