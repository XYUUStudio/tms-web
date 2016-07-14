/**
 * Created by medlog on 2016/7/8.
 */
var ajaxHelp = new AjaxHelp();
var rowData = $("#driverList").datagrid("getSelections");//选中获取司机数据集合
var driverInfo = "";//接口返回的司机详情
var iDPositiveURL = "";//身份证正面URL
var iDInverseURL = "";//身份证反面URL
var driverLicPositiveURL = "";//驾驶证URL
var vehicleLicPositiveURL = "";//行驶证URL
var compulsoryInsurancePositiveURL = "";//交强险保单正面URL
var compulsoryInsuranceInverseURL = "";//交强险保单反面URL
var commercialInsurancePositiveURL = "";//商业险保单正面URL
var commercialInsuranceInverseURL = "";//商业险保单反面URL


//获取司机信息
var getInfoDriverEdit = function () {
    var URL = ApiPath.TMSApi.businessData.driverDetail;
    var requestData = {
        userId: rowData[0].userId
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetInfoDriverEdit, null);
};
var successGetInfoDriverEdit = function (responseData) {
    //赋值
    getProvinceDriverEdit();//获取省下拉框
    driverInfo = responseData;
    $("#loginNameDriverEdit").html(responseData.loginName);//账户名
    $("#logCenterDriverEdit").html(responseData.lCName);//所属物流中心
    $("#userNameDriverEdit").val(responseData.userName);//姓名
    $("#userIDCardDriverEdit").val(responseData.userIDCard);//身份证号
    $("#userMobileDriverEdit").val(responseData.userMobile);//手机号
    $("#userEmailDriverEdit").val(responseData.userEmail);//邮箱
    $("#driverLicNoDriverEdit").val(responseData.driverLicNo);//驾驶证号
    $("#roadFrtQCertNoDriverEdit").val(responseData.roadFrtQCertNo);//从业资格证号
    $("#plateNoDriverEdit").val(responseData.plateNo);//车牌号
    $("#vehicleLicSpecificationDriverEdit").val(responseData.vehicleLicSpecification);//车型
    $("#vehicleCapacityDriverEdit").val(responseData.vehicleCapacity);//车辆容积
    $("#vehicleOPCertNoDriverEdit").val(responseData.vehicleOPCertNo);//营运证号
    $("#vehicleLengthDriverEdit").val(responseData.vehicleLength);//长
    $("#vehicleWidthDriverEdit").val(responseData.vehicleWidth);//宽
    $("#vehicleHeightDriverEdit").val(responseData.vehicleHeight);//高
    getVehicleOwnerDriverEdit();//车辆所属
    getCompulsoryInsuranceCompanyDriverEdit();//交强险公司
    $("#compulsoryInsuranceDocNoDriverEdit").val(responseData.compulsoryInsuranceDocNo);//交强险单号
    $("#compulsoryInsuranceAmtDriverEdit").val(responseData.compulsoryInsuranceAmt);//交强险金额
    getCmmercialInsuranceCompanyDriverEdit();//商业险公司
    $("#commercialInsuranceDocNoDriverEdit").val(responseData.commercialInsuranceDocNo);//商业险单号
    $("#commercialInsuranceAmtDriverEdit").val(responseData.commercialInsuranceAmt);//商业险金额
    //地址
    getProvinceDriverEdit();
    //$("#provinceDriverEdit").val(responseData.residentProvinceCodeName);//省
    //$("#cityDriverEdit").val(responseData.residentCityCodeName);//市
    //$("#districtDriverEdit").val(responseData.residentDistrictCodeName);//区
    $("#addressDriverEdit").val(responseData.residentAddress);//详细地址
    //日期
    $("#driverLicEffectiveDateEndDriverEdit").val(responseData.driverLicEffectiveDateEnd);//驾驶证有效期
    $("#driverLicIssueDateDriverEdit").val(responseData.driverLicIssueDate);//驾驶证发证日期
    $("#vehicleLicIssueDateDriverEdit").val(responseData.vehicleLicIssueDate);//行驶证发证日期
    $("#vehicleLicLastestInspEffEndDateDriverEdit").val(responseData.vehicleLicLastestInspEffEndDate);//行驶证年检有效日期
    $("#compulsoryInsuranceEffectiveEndDateDriverEdit").val(responseData.compulsoryInsuranceEffectiveEndDate);//交强险有效期
    $("#commercialInsuranceEffectiveEndDateDriverEdit").val(responseData.commercialInsuranceEffectiveEndDate);//商业险有效期
    //图片
    if (responseData.iDPositive.url != "") {
        //身份证正面
        iDPositiveURL = responseData.iDPositive.url;
        $("#img_iDPositiveDriverEdit").attr("src", responseData.iDPositive.url)
    }
    if (responseData.iDInverse.url != "") {
        //身份证反面
        iDInverseURL = responseData.iDInverse.url;
        $("#img_iDInverseDriverEdit").attr("src", responseData.iDInverse.url)
    }
    if (responseData.driverLicPositive.url != "") {
        //驾驶证
        driverLicPositiveURL = responseData.driverLicPositive.url;
        $("#img_driverLicPositiveDriverEdit").attr("src", responseData.driverLicPositive.url)
    }
    if (responseData.vehicleLicPositive.url != "") {
        //行驶证
        vehicleLicPositiveURL = responseData.vehicleLicPositive.url;
        $("#img_vehicleLicPositiveDriverEdit").attr("src", responseData.vehicleLicPositive.url)
    }
    if (responseData.compulsoryInsurancePositive.url != "") {
        //交强险保单正面
        compulsoryInsurancePositiveURL = responseData.compulsoryInsurancePositive.url;
        $("#img_compulsoryInsurancePositiveDriverEdit").attr("src", responseData.compulsoryInsurancePositive.url)
    }
    if (responseData.compulsoryInsuranceInverse.url != "") {
        //交强险保单反面
        compulsoryInsuranceInverseURL = responseData.compulsoryInsuranceInverse.url;
        $("#img_compulsoryInsuranceInverseDriverEdit").attr("src", responseData.compulsoryInsuranceInverse.url)
    }
    if (responseData.commercialInsurancePositive.url != "") {
        //商业险保单正面
        commercialInsurancePositiveURL = responseData.commercialInsurancePositive.url;
        $("#img_commercialInsurancePositiveDriverEdit").attr("src", responseData.commercialInsurancePositive.url)
    }
    if (responseData.commercialInsuranceInverse.url != "") {
        //商业险保单反面
        commercialInsuranceInverseURL = responseData.commercialInsuranceInverse.url;
        $("#img_commercialInsuranceInverseDriverEdit").attr("src", responseData.commercialInsuranceInverse.url)
    }
};


//获取省下拉框
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
        $("#provinceDriverEdit").append("<option value='" + item.divCode + "' >" + item.divName + "</option>");
        if (driverInfo.residentProvinceCode == item.divCode) {
            $("#provinceDriverEdit").find("option[value='" + item.divCode + "']").attr("selected", true)
        }
    });
    getCityDriverEdit();
};
//获取市下拉框
var getCityDriverEdit = function () {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level: 2,
        parentDivCode: driverInfo.residentProvinceCode
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetCityDriverEdit, null);
};
var successGetCityDriverEdit = function (data) {
    $.each(data, function (index, item) {
        $("#cityDriverEdit").append("<option value='" + item.divCode + "' >" + item.divName + "</option>")
        if (driverInfo.residentCityCode == item.divCode) {
            $("#cityDriverEdit").find("option[value='" + item.divCode + "']").attr("selected", true)
        }
    });
    getDistrictDriverEdit();
};
//获取区下拉框
var getDistrictDriverEdit = function () {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level: 3,
        parentDivCode: driverInfo.residentCityCode
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetDistrictDriverEdit, null);
};
var successGetDistrictDriverEdit = function (data) {
    $.each(data, function (index, item) {
        $("#districtDriverEdit").append("<option value='" + item.divCode + "' >" + item.divName + "</option>")
        if (driverInfo.residentDistrictCode == item.divCode) {
            $("#districtDriverEdit").find("option[value='" + item.divCode + "']").attr("selected", true)
        }
    });
    //changeProvinceDriverEdit();
};
//修改市
var changeProvinceDriverEdit = function (data) {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level: 2,
        parentDivCode: data
    };
    ajaxHelp.AjaxPost(URL, requestData, successChangeProvinceDriverEdit, null);
};
var successChangeProvinceDriverEdit = function (data) {
    $("#cityDriverEdit").empty();
    $("#cityDriverEdit").prepend("<option value=''>请选择市</option>"); //为Select插入一个Option(第一个位置)
    $("#districtDriverEdit").empty();
    $("#districtDriverEdit").prepend("<option value=''>请选择区</option>"); //为Select插入一个Option(第一个位置)
    $.each(data, function (index, item) {
        $("#cityDriverEdit").append("<option value='" + item.divCode + "' >" + item.divName + "</option>")
    })
};
//修改区
var changeCityDriverEdit = function (data) {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level: 3,
        parentDivCode: data
    };
    ajaxHelp.AjaxPost(URL, requestData, successChangeCityDriverEdit, null);
};
var successChangeCityDriverEdit = function (data) {
    $("#districtDriverEdit").empty();
    $("#districtDriverEdit").prepend("<option value=''>请选择区</option>"); //为Select插入一个Option(第一个位置)
    $.each(data, function (index, item) {
        $("#districtDriverEdit").append("<option value='" + item.divCode + "' >" + item.divName + "</option>")
    })
};


//获取车辆所属下拉框
var getVehicleOwnerDriverEdit = function () {
    var URL = ApiPath.TMSApi.systemData.vehicleOwner;
    var requestData = {
        dictTypeCode: "VHOWTP"
    };
    ajaxHelp.AjaxPost(URL, requestData, successVehicleOwnerDriverEdit, null);
};
var successVehicleOwnerDriverEdit = function (responseData) {
    $.each(responseData.dictValueList, function (index, item) {
        $("#vehicleOwnerTypeDriverEdit").append("<option value='" + item.dictValueCode + "' >" + item.dictValueName + "</option>")
        if (driverInfo.vehicleOwnerType == item.dictValueCode) {
            $("#vehicleOwnerTypeDriverEdit").find("option[value='" + item.dictValueCode + "']").attr("selected", true)
        }
    });
};


//获取交强险保险公司下拉框
var getCompulsoryInsuranceCompanyDriverEdit = function () {
    var URL = ApiPath.TMSApi.systemData.insuranceCompany;
    var requestData = {
        dictTypeCode: "INSCMP"
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetCompulsoryInsuranceCompanyDriverEdit, null);
};
var successGetCompulsoryInsuranceCompanyDriverEdit = function (responseData) {
    $.each(responseData.dictValueList, function (index, item) {
        $("#compulsoryInsuranceCompanyDriverEdit").append("<option value='" + item.dictValueCode + "' >" + item.dictValueName + "</option>")
        if (driverInfo.compulsoryInsuranceCompany == item.dictValueCode) {
            $("#compulsoryInsuranceCompanyDriverEdit").find("option[value='" + item.dictValueCode + "']").attr("selected", true)
        }
    });
};


//获取商业险保险公司下拉框
var getCmmercialInsuranceCompanyDriverEdit = function () {
    var URL = ApiPath.TMSApi.systemData.insuranceCompany;
    var requestData = {
        dictTypeCode: "INSCMP"
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetCmmercialInsuranceCompanyDriverEdit, null);
};
var successGetCmmercialInsuranceCompanyDriverEdit = function (responseData) {
    $.each(responseData.dictValueList, function (index, item) {
        $("#commercialInsuranceCompanyDriverEdit").append("<option value='" + item.dictValueCode + "' >" + item.dictValueName + "</option>")
        if (driverInfo.commercialInsuranceCompany == item.dictValueCode) {
            $("#commercialInsuranceCompanyDriverEdit").find("option[value='" + item.dictValueCode + "']").attr("selected", true)
        }
    });
};


//身份证正面上传
var uploadIDPositiveDriverEdit = function (imgData) {
    var file = imgData.files[0];//选择上传的文件
    var fr = new FileReader();
    fr.readAsDataURL(file);
    $(fr).load(function () {
        $("#img_iDPositiveDriverEdit").attr("src", fr.result);
        $("#a_iDPositiveDriverEdit").attr("href", fr.result);
        var URL = ApiPath.TMSApi.dictionary.upload;
        var requestData = {
            file: fr.result
        };
        ajaxHelp.AjaxForm(URL, requestData, successUploadIDPositiveDriverEdit, null);
    });
    return true;
};
var successUploadIDPositiveDriverEdit = function (responseData) {
    iDPositiveURL = responseData.url;
};
//删除身份证正面
var delIDPositiveDriverEdit = function () {
    $("#img_iDPositiveDriverEdit").attr("src", "../images/fujianimg.png");
    $("#a_iDPositiveDriverEdit").removeAttr("href");
    iDPositiveURL = ""
};


//身份证反面上传
var uploadIDInverseDriverEdit = function (imgData) {
    var file = imgData.files[0];//选择上传的文件
    var fr = new FileReader();
    fr.readAsDataURL(file);
    $(fr).load(function () {
        $("#img_iDInverseDriverEdit").attr("src", fr.result);
        $("#a_iDInverseDriverEdit").attr("href", fr.result);
        var URL = ApiPath.TMSApi.dictionary.upload;
        var requestData = {
            file: fr.result
        };
        ajaxHelp.AjaxForm(URL, requestData, successUploadIDInverseDriverEdit, null);
    });
    return true;
};
var successUploadIDInverseDriverEdit = function (responseData) {
    iDInverseURL = responseData.url;
};
//删除身份证反面
var delIDInverseDriverEdit = function () {
    $("#img_iDInverseDriverEdit").attr("src", "../images/fujianimg.png");
    $("#a_iDInverseDriverEdit").removeAttr("href");
    iDInverseURL = ""
};


//驾驶证上传
var uploadDriverLicPositiveDriverEdit = function (imgData) {
    var file = imgData.files[0];//选择上传的文件
    var fr = new FileReader();
    fr.readAsDataURL(file);
    $(fr).load(function () {
        $("#img_driverLicPositiveDriverEdit").attr("src", fr.result);
        $("#a_driverLicPositiveDriverEdit").attr("href", fr.result);
        var URL = ApiPath.TMSApi.dictionary.upload;
        var requestData = {
            file: fr.result
        };
        ajaxHelp.AjaxForm(URL, requestData, successUploadDriverLicPositiveDriverEdit, null);
    });
    return true;
};
var successUploadDriverLicPositiveDriverEdit = function (responseData) {
    driverLicPositiveURL = responseData.url;
};
//删除驾驶证
var delDriverLicPositiveDriverEdit = function () {
    $("#img_driverLicPositiveDriverEdit").attr("src", "../images/fujianimg.png");
    $("#a_driverLicPositiveDriverEdit").removeAttr("href");
    driverLicPositiveURL = ""
};


//行驶证上传
var uploadVehicleLicPositiveDriverEdit = function (imgData) {
    var file = imgData.files[0];//选择上传的文件
    var fr = new FileReader();
    fr.readAsDataURL(file);
    $(fr).load(function () {
        $("#img_vehicleLicPositiveDriverEdit").attr("src", fr.result);
        $("#a_vehicleLicPositiveDriverEdit").attr("href", fr.result);
        var URL = ApiPath.TMSApi.dictionary.upload;
        var requestData = {
            file: fr.result
        };
        ajaxHelp.AjaxForm(URL, requestData, successUploadVehicleLicPositiveDriverEdit, null);
    });
    return true;
};
var successUploadVehicleLicPositiveDriverEdit = function (responseData) {
    vehicleLicPositiveURL = responseData.url;
};
//删除行驶证
var delVehicleLicPositiveDriverEdit = function () {
    $("#img_vehicleLicPositiveDriverEdit").attr("src", "../images/fujianimg.png");
    $("#a_vehicleLicPositiveDriverEdit").removeAttr("href");
    vehicleLicPositiveURL = ""
};


//交强险保单正面上传
var uploadCompulsoryInsurancePositiveDriverEdit = function (imgData) {
    var file = imgData.files[0];//选择上传的文件
    var fr = new FileReader();
    fr.readAsDataURL(file);
    $(fr).load(function () {
        $("#img_compulsoryInsurancePositiveDriverEdit").attr("src", fr.result);
        $("#a_compulsoryInsurancePositiveDriverEdit").attr("href", fr.result);
        var URL = ApiPath.TMSApi.dictionary.upload;
        var requestData = {
            file: fr.result
        };
        ajaxHelp.AjaxForm(URL, requestData, successUploadCompulsoryInsurancePositiveDriverEdit, null);
    });
    return true;
};
var successUploadCompulsoryInsurancePositiveDriverEdit = function (responseData) {
    compulsoryInsurancePositiveURL = responseData.url;
};
//删除交强险保单正面
var delCompulsoryInsurancePositiveDriverEdit = function () {
    $("#img_compulsoryInsurancePositiveDriverEdit").attr("src", "../images/fujianimg.png");
    $("#a_compulsoryInsurancePositiveDriverEdit").removeAttr("href");
    compulsoryInsurancePositiveURL = ""
};


//交强险保单反面上传
var uploadCompulsoryInsuranceInverseDriverEdit = function (imgData) {
    var file = imgData.files[0];//选择上传的文件
    var fr = new FileReader();
    fr.readAsDataURL(file);
    $(fr).load(function () {
        $("#img_compulsoryInsuranceInverseDriverEdit").attr("src", fr.result);
        $("#a_compulsoryInsuranceInverseDriverEdit").attr("href", fr.result);
        var URL = ApiPath.TMSApi.dictionary.upload;
        var requestData = {
            file: fr.result
        };
        ajaxHelp.AjaxForm(URL, requestData, successUploadCompulsoryInsuranceInverseDriverEdit, null);
    });
    return true;
};
var successUploadCompulsoryInsuranceInverseDriverEdit = function (responseData) {
    compulsoryInsuranceInverseURL = responseData.url;
};
//删除交强险保单反面
var delCompulsoryInsuranceInverseDriverEdit = function () {
    $("#img_compulsoryInsuranceInverseDriverEdit").attr("src", "../images/fujianimg.png");
    $("#a_compulsoryInsuranceInverseDriverEdit").removeAttr("href");
    compulsoryInsuranceInverseURL = ""
};


//商业险保单正面上传
var uploadCommercialInsuranceDriverEdit = function (imgData) {
    var file = imgData.files[0];//选择上传的文件
    var fr = new FileReader();
    fr.readAsDataURL(file);
    $(fr).load(function () {
        $("#img_commercialInsurancePositiveDriverEdit").attr("src", fr.result);
        $("#a_commercialInsurancePositiveDriverEdit").attr("href", fr.result);
        var URL = ApiPath.TMSApi.dictionary.upload;
        var requestData = {
            file: fr.result
        };
        ajaxHelp.AjaxForm(URL, requestData, successUploadCommercialInsurancePositiveDriverEdit, null);
    });
    return true;
};
var successUploadCommercialInsurancePositiveDriverEdit = function (responseData) {
    commercialInsurancePositiveURL = responseData.url;
};
//删除商业险保单正面
var delCommercialInsurancePositiveDriverEdit = function () {
    $("#img_commercialInsurancePositiveDriverEdit").attr("src", "../images/fujianimg.png");
    $("#a_commercialInsurancePositiveDriverEdit").removeAttr("href");
    commercialInsurancePositiveURL = ""
};


//商业险保单反面上传
var uploadCommercialInsuranceInverseDriverEdit = function (imgData) {
    var file = imgData.files[0];//选择上传的文件
    var fr = new FileReader();
    fr.readAsDataURL(file);
    $(fr).load(function () {
        $("#img_commercialInsuranceInverseDriverEdit").attr("src", fr.result);
        $("#a_commercialInsuranceInverseDriverEdit").attr("href", fr.result);
        var URL = ApiPath.TMSApi.dictionary.upload;
        var requestData = {
            file: fr.result
        };
        ajaxHelp.AjaxForm(URL, requestData, successUploadCommercialInsuranceInverseDriverEdit, null);
    });
    return true;
};
var successUploadCommercialInsuranceInverseDriverEdit = function (responseData) {
    commercialInsuranceInverseURL = responseData.url;
};
//删除商业险保单反面
var delCommercialInsuranceInverseDriverEdit = function () {
    $("#img_commercialInsuranceInverseDriverEdit").attr("src", "../images/fujianimg.png");
    $("#a_commercialInsuranceInverseDriverEdit").removeAttr("href");
    commercialInsuranceInverseURL = ""
};


//司机编辑-提交
var submitDriverEdit = function () {
    var URL = ApiPath.TMSApi.businessData.driverEdit;
    //时间对象格式化
    var driverLicEffectiveDate = $("#driverLicEffectiveDateEndDriverEdit").datebox("getValue");//驾驶证有效期
    if ($("#driverLicEffectiveDateEndDriverEdit").datebox("getValue") != "") {
        driverLicEffectiveDate = driverLicEffectiveDate + " " + "23:59:59";
    }
    var driverLicIssueDate = $("#driverLicIssueDateDriverEdit").datebox("getValue");//驾驶证发证日期
    if ($("#driverLicIssueDateDriverEdit").datebox("getValue") != "") {
        driverLicIssueDate = driverLicIssueDate + " " + "23:59:59";
    }
    var vehicleLicIssueDate = $("#vehicleLicIssueDateDriverEdit").datebox("getValue");//行驶证发证日期
    if ($("#vehicleLicIssueDateDriverEdit").datebox("getValue") != "") {
        vehicleLicIssueDate = vehicleLicIssueDate + " " + "23:59:59";
    }
    var vehicleLicLastestInspEffDate = $("#vehicleLicLastestInspEffEndDateDriverEdit").datebox("getValue");//行驶证年检有效日期
    if ($("#vehicleLicLastestInspEffEndDateDriverEdit").datebox("getValue") != "") {
        vehicleLicLastestInspEffDate = vehicleLicLastestInspEffDate + " " + "23:59:59";
    }
    var compulsoryInsuranceEffectiveDate = $("#compulsoryInsuranceEffectiveEndDateDriverEdit").datebox("getValue");//交强险有效期
    if ($("#compulsoryInsuranceEffectiveEndDateDriverEdit").datebox("getValue") != "") {
        compulsoryInsuranceEffectiveDate = compulsoryInsuranceEffectiveDate + " " + "23:59:59";
    }
    var commercialInsuranceEffectiveDate = $("#commercialInsuranceEffectiveEndDateDriverEdit").datebox("getValue");//商业险有效期
    if ($("#commercialInsuranceEffectiveEndDateDriverEdit").datebox("getValue") != "") {
        commercialInsuranceEffectiveDate = commercialInsuranceEffectiveDate + " " + "23:59:59";
    }
    var requestData = {
        userId: rowData[0].userId,
        userName: $("#userNameDriverEdit").val(),//姓名
        userIDCard: $("#userIDCardDriverEdit").val(),//身份证号
        userMobile: $("#userMobileDriverEdit").val(),//手机号
        userEmail: $("#userEmailDriverEdit").val(),//邮箱
        driverLicNo: $("#driverLicNoDriverEdit").val(),//驾驶证号
        roadFrtQCertNo: $("#roadFrtQCertNoDriverEdit").val(),//从业资格证号
        plateNo: $("#plateNoDriverEdit").val(),//车牌号
        vehicleLicSpecification: $("#vehicleLicSpecificationDriverEdit").val(),//车型
        vehicleCapacity: $("#vehicleCapacityDriverEdit").val(),//车辆容量
        vehicleOPCertNo: $("#vehicleOPCertNoDriverEdit").val(),//行驶证营运证号
        vehicleLength: $("#vehicleLengthDriverEdit").val(),//长
        vehicleWidth: $("#vehicleWidthDriverEdit").val(),//宽
        vehicleHeight: $("#vehicleHeightDriverEdit").val(),//高
        vehicleOwnerType: $("#vehicleOwnerTypeDriverEdit").val(),//车辆所属
        compulsoryInsuranceCompany: $("#compulsoryInsuranceCompanyDriverEdit").val(),//交强险公司
        compulsoryInsuranceDocNo: $("#compulsoryInsuranceDocNoDriverEdit").val(),//交强险单号
        compulsoryInsuranceAmt: $("#compulsoryInsuranceAmtDriverEdit").val(),//交强险金额
        commercialInsuranceCompany: $("#commercialInsuranceCompanyDriverEdit").val(),//商业险公司
        commercialInsuranceDocNo: $("#commercialInsuranceDocNoDriverEdit").val(),//商业险单号
        commercialInsuranceAmt: $("#commercialInsuranceAmtDriverEdit").val(),//商业险金额
        //地址
        residentProvinceCode: $("#provinceDriverEdit").val(),//省
        residentCityCode: $("#cityDriverEdit").val(),//市
        residentDistrictCode: $("#districtDriverEdit").val(),//区
        residentAddress: $("#addressDriverEdit").val(),//详细地址
        //日期
        driverLicEffectiveDateEnd: driverLicEffectiveDate,//驾驶证有效期
        driverLicIssueDate: driverLicIssueDate,//驾驶证发证日期
        vehicleLicIssueDate: vehicleLicIssueDate,//行驶证发证日期
        vehicleLicLastestInspEffEndDate: vehicleLicLastestInspEffDate,//行驶证年检有效日期
        compulsoryInsuranceEffectiveEndDate: compulsoryInsuranceEffectiveDate,//交强险有效期
        commercialInsuranceEffectiveEndDate: commercialInsuranceEffectiveDate,//商业险有效期
        //图片上传
        iDPositive: {url: iDPositiveURL, attachmentDesc: ""},
        iDInverse: {url: iDInverseURL, attachmentDesc: ""},
        driverLicPositive: {url: driverLicPositiveURL, attachmentDesc: ""},
        vehicleLicPositive: {url: vehicleLicPositiveURL, attachmentDesc: ""},
        compulsoryInsurancePositive: {url: compulsoryInsurancePositiveURL, attachmentDesc: ""},
        compulsoryInsuranceInverse: {url: compulsoryInsuranceInverseURL, attachmentDesc: ""},
        commercialInsurancePositive: {url: commercialInsurancePositiveURL, attachmentDesc: ""},
        commercialInsuranceInverse: {url: commercialInsuranceInverseURL, attachmentDesc: ""}
    };
    if (requestData.userName == null || requestData.userName == "") {
        ds.dialog({
            title: "消息提示",
            content: "请输入姓名！",
            icon: "info.png",
            onyes: true
        });
        return;
    }
    if (requestData.userIDCard == null || requestData.userIDCard == "") {
        ds.dialog({
            title: "消息提示",
            content: "请输入身份证号！",
            icon: "info.png",
            onyes: true
        });
        return;
    }
    if (requestData.userIDCard.length != 18) {
        ds.dialog({
            title: "消息提示",
            content: "请输入18位身份证号！",
            icon: "info.png",
            onyes: true
        });
        return;
    }
    if (requestData.userMobile == null || requestData.userMobile == "") {
        ds.dialog({
            title: "消息提示",
            content: "请输入手机号！",
            icon: "info.png",
            onyes: true
        });
        return;
    }
    if (requestData.userMobile.length != 11) {
        ds.dialog({
            title: "消息提示",
            content: "请输入11位手机号！",
            icon: "info.png",
            onyes: true
        });

        return;
    }
    if (requestData.userEmail == null || requestData.userEmail == "") {
        ds.dialog({
            title: "消息提示",
            content: "请输入邮箱！",
            icon: "info.png",
            onyes: true
        });
        return;
    }
    if (requestData.residentProvinceCode == null || requestData.residentProvinceCode == "") {
        ds.dialog({
            title: "消息提示",
            content: "请输入省！",
            icon: "info.png",
            onyes: true
        });
        return;
    }
    if (requestData.residentCityCode == null || requestData.residentCityCode == "") {
        ds.dialog({
            title: "消息提示",
            content: "请输入市！",
            icon: "info.png",
            onyes: true
        });
        return;
    }
    if (requestData.residentDistrictCode == null || requestData.residentDistrictCode == "") {
        ds.dialog({
            title: "消息提示",
            content: "请输入区！",
            icon: "info.png",
            onyes: true
        });
        return;
    }
    if (requestData.residentAddress == null || requestData.residentAddress == "") {
        ds.dialog({
            title: "消息提示",
            content: "请输入地址！",
            icon: "info.png",
            onyes: true
        });
        return;
    }
    if (iDPositiveURL == "") {
        ds.dialog({
            title: "消息提示",
            content: "请上传身份证！",
            icon: "info.png",
            onyes: true
        });
        return;
    }
    if (requestData.driverLicNo == null || requestData.driverLicNo == "") {
        ds.dialog({
            title: "消息提示",
            content: "请输入驾驶证号！",
            icon: "info.png",
            onyes: true
        });
        return;
    }
    if (requestData.plateNo == null || requestData.plateNo == "") {
        ds.dialog({
            title: "消息提示",
            content: "请输入车牌号！",
            icon: "info.png",
            onyes: true
        });
        return;
    }
    //if (requestData.vehicleCapacity.isNaN) {
    //    ds.dialog({
    //        title: "消息提示",
    //        content: "车辆容积必须为数字！",
    //        icon: "info.png",
    //        onyes: true
    //    });
    //    return;
    //}
    //if (requestData.vehicleLength.isNaN || requestData.vehicleWidth.isNaN || requestData.vehicleHeight.isNaN) {
    //    ds.dialog({
    //        title: "消息提示",
    //        content: "车辆尺寸必须为数字！",
    //        icon: "info.png",
    //        onyes: true
    //    });
    //    return;
    //}
    //if (requestData.commercialInsuranceAmt.isNaN) {
    //    ds.dialog({
    //        title: "消息提示",
    //        content: "交强险金额必须为数字！",
    //        icon: "info.png",
    //        onyes: true
    //    });
    //    return;
    //}
    //if (requestData.commercialInsuranceAmt.isNaN) {
    //    ds.dialog({
    //        title: "消息提示",
    //        content: "商业险金额必须为数字！",
    //        icon: "info.png",
    //        onyes: true
    //    });
    //    return;
    //}
    ajaxHelp.AjaxPost(URL, requestData, successSubmitDriverAdd, null);
};
var successSubmitDriverAdd = function () {
    ds.dialog({
        title: "消息提示",
        content: "编辑成功！",
        icon: "success.png",
        width: "200",
        height: "50",
        timeout: 2
    });
    setTimeout(function () {
        $("#tabs").tabs("close", "司机编辑");
        loadDriverList();
    }, 2000)
};


//司机编辑-关闭
var closeDriverEdit = function () {
    alert("关闭");
    $("#tabs").tabs("close", "司机编辑");
};


getInfoDriverEdit();//获取司机信息

//getVehicleOwnerDriverEdit();//获取车辆所属下拉框
//getCompulsoryInsuranceCompanyDriverEdit();//获取交强险保险公司下拉框
//getCmmercialInsuranceCompanyDriverEdit();//获取商业险保险公司下拉框

//if (requestData.roadFrtQCertNo == null || requestData.roadFrtQCertNo == "") {
//    $.messager.alert("提示", "请输入从业资格证号！", "error");
//    return;
//}
//if (requestData.driverLicEffectiveDateEnd.trim() == "23:59:59") {
//    $.messager.alert("提示", "请输入驾驶证有效期！", "error");
//    return;
//}
//if (requestData.driverLicIssueDate.trim() == "23:59:59") {
//    $.messager.alert("提示", "请输入驾驶证发证日期！", "error");
//    return;
//}
//if (driverInfo.driverLicPositive == null || driverInfo.driverLicPositive == "") {
//    $.messager.alert("提示", "请上传驾驶证！", "error");
//    return;
//}

//if (requestData.vehicleLicSpecification == null || requestData.vehicleLicSpecification == "") {
//    $.messager.alert("提示", "请输入车型！", "error");
//    return;
//}
//if (requestData.vehicleLicIssueDate.trim() == "23:59:59") {
//    $.messager.alert("提示", "请输入行驶证发证日期！", "error");
//    return;
//}
//if (requestData.vehicleLicLastestInspEffEndDate.trim() == "23:59:59") {
//    $.messager.alert("提示", "请输入行驶证年检有效日期！", "error");
//    return;
//}
//if (requestData.vehicleCapacity == null || requestData.vehicleCapacity == "") {
//    $.messager.alert("提示", "请输入车辆容积！", "error");
//    return;
//}
//if (requestData.vehicleOPCertNo == null || requestData.vehicleOPCertNo == "") {
//    $.messager.alert("提示", "请输入营运证号！", "error");
//    return;
//}
//if (requestData.vehicleLength == null || requestData.vehicleLength == "" ||
//    requestData.vehicleWidth == null || requestData.vehicleWidth == "" ||
//    requestData.vehicleHeight == null || requestData.vehicleHeight == "") {
//    $.messager.alert("提示", "请输入车辆尺寸！", "error");
//    return;
//}
//if (requestData.vehicleOwnerType == null || requestData.vehicleOwnerType == "") {
//    $.messager.alert("提示", "请输入车辆所属！", "error");
//    return;
//}
//if (driverInfo.vehicleLicPositive == null || requestData.vehicleLicPositive == "") {
//    $.messager.alert("提示", "请上传行驶证！", "error");
//    return;
//}
//if (requestData.compulsoryInsuranceCompany == null || requestData.compulsoryInsuranceCompany == "") {
//    $.messager.alert("提示", "请输入交强险公司！", "error");
//    return;
//}
//if (requestData.compulsoryInsuranceDocNo == null || requestData.compulsoryInsuranceDocNo == "") {
//    $.messager.alert("提示", "请输入交强险单号！", "error");
//    return;
//}
//if (requestData.compulsoryInsuranceEffectiveEndDate.trim() == "23:59:59") {
//    $.messager.alert("提示", "请输入交强险有效期！", "error");
//    return;
//}
//if (requestData.compulsoryInsuranceAmt == null || requestData.compulsoryInsuranceAmt == "") {
//    $.messager.alert("提示", "请输入交强险金额！", "error");
//    return;
//}
//if (driverInfo.compulsoryInsurancePositive == null || driverInfo.compulsoryInsurancePositive == "") {
//    $.messager.alert("提示", "请上传交强险保单！", "error");
//    return;
//}
//if (requestData.commercialInsuranceCompany == null || requestData.commercialInsuranceCompany == "") {
//    $.messager.alert("提示", "请输入商业险公司！", "error");
//    return;
//}
//if (requestData.commercialInsuranceDocNo == null || requestData.commercialInsuranceDocNo == "") {
//    $.messager.alert("提示", "请输入商业险单号！", "error");
//    return;
//}
//if (requestData.commercialInsuranceEffectiveEndDate.trim() == "23:59:59") {
//    $.messager.alert("提示", "请输入商业险有效期！", "error");
//    return;
//}
//if (requestData.commercialInsuranceAmt == null || requestData.commercialInsuranceAmt == "") {
//    $.messager.alert("提示", "请输入商业险金额！", "error");
//    return;
//}
//if (driverInfo.commercialInsurancePositive == null || driverInfo.commercialInsurancePositive == "") {
//    $.messager.alert("提示", "请上传商业险保单！", "error");
//    return;
//}
