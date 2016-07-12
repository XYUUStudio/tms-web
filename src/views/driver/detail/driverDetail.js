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
    //console.log(responseData.iDPositive.url);
    $("#loginNameDriverDetail").html(responseData.loginName);//账户名
    $("#lCNameDriverDetail").html(responseData.lCName);//所属物流中心
    $("#userNameDriverDetail").html(responseData.userName);//姓名
    $("#userIDCardDriverDetail").html(responseData.userIDCard);//身份证号
    $("#userMobileDriverDetail").html(responseData.userMobile);//手机号
    $("#addressDriverDetail").html(responseData.address);//地址
    $("#userEmailDriverDetail").html(responseData.userEmail);//邮箱
    //身份证正面
    if (responseData.iDPositive.url != "") {
        $("#iDPositiveDriverDetail").html('<img src="' + responseData.iDPositive.url + '" alt="" width="150" height="150" />')
    }
    //$("#iDInverseDriverDetail").html(responseData.iDInverse);
    $("#driverLicNoDriverDetail").html(responseData.driverLicNo);//驾驶证号
    $("#roadFrtQCertNoDriverDetail").html(responseData.roadFrtQCertNo);//从业资格证号
    $("#driverLicEffectiveDateEndDriverDetail").html(responseData.driverLicEffectiveDateEnd);//驾驶证有效期
    $("#driverLicIssueDateDriverDetail").html(responseData.driverLicIssueDate);//驾驶证发证日期
    //驾驶证正面
    if (responseData.driverLicPositive.url != "") {
        $("#driverLicPositiveDriverDetail").html('<img src="' + responseData.driverLicPositive.url + '" alt="" width="150" height="150" />')
    }
    $("#plateNoDriverDetail").html(responseData.plateNo);//车牌号
    $("#vehicleLicSpecificationDriverDetail").html(responseData.vehicleLicSpecification);//车型
    $("#vehicleLicIssueDateDriverDetail").html(responseData.vehicleLicIssueDate);//行驶证发证日期
    $("#vehicleLicLastestInspEffEndDateDriverDetail").html(responseData.vehicleLicLastestInspEffEndDate);//行驶证年间有效日期
    $("#vehicleCapacityDriverDetail").html(responseData.vehicleCapacity);//车辆容量
    $("#vehicleOPCertNoDriverDetail").html(responseData.vehicleOPCertNo);//营运证号
    $("#vehicleLengthDriverDetail").html(responseData.vehicleLength);//长
    $("#vehicleWidthDriverDetail").html(responseData.vehicleWidth);//宽
    $("#vehicleHeightDriverDetail").html(responseData.vehicleHeight);//高
    $("#vehicleOwnerTypeDriverDetail").html(responseData.vehicleOwnerType);//车辆所属
    //行驶证正面
    if (responseData.vehicleLicPositive.url != "") {
        $("#vehicleLicPositiveDriverDetail").html('<img src="' + responseData.vehicleLicPositive.url + '" alt="" width="150" height="150" />')
    }
    $("#compulsoryInsuranceCompanyDriverDetail").html(responseData.compulsoryInsuranceCompany);//交保险公司
    $("#compulsoryInsuranceDocNoDriverDetail").html(responseData.compulsoryInsuranceDocNo);//交保险单号
    $("#compulsoryInsuranceEffectiveEndDateDriverDetail").html(responseData.compulsoryInsuranceEffectiveEndDate);//交保险有效期
    $("#compulsoryInsuranceAmtDriverDetail").html(responseData.compulsoryInsuranceAmt);//交保险金额
    //交保险保单正面
    if (responseData.compulsoryInsurancePositive.url != "") {
        $("#compulsoryInsurancePositiveDriverDetail").html('<img src="' + responseData.compulsoryInsurancePositive.url + '" alt="" width="150" height="150" />')
    }
    $("#commercialInsuranceCompanyDriverDetail").html(responseData.commercialInsuranceCompany);//商业险公司
    $("#commercialInsuranceDocNoDriverDetail").html(responseData.commercialInsuranceDocNo);//商业险单号
    $("#commercialInsuranceEffectiveEndDateDriverDetail").html(responseData.commercialInsuranceEffectiveEndDate);//商业险有效期
    $("#commercialInsuranceAmtDriverDetail").html(responseData.commercialInsuranceAmt);//商业险金额
    //商业险保单正面
    if (responseData.commercialInsurancePositive.url != "") {
        $("#commercialInsurancePositiveDriverDetail").html('<img src="' + responseData.commercialInsurancePositive.url + '" alt="" width="150" height="150" />')
    }
};


//司机管理-详情
getDetailDriverDetail();
