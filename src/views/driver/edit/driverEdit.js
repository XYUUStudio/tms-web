/**
 * Created by medlog on 2016/7/8.
 */
var ajaxHelp = new AjaxHelp();
var rowData = $("#driverList").datagrid("getSelections");//选中获取司机数据集合
var driverInfo = new Object();//接口返回的司机详情
var iDPositiveURL = new Object();//身份证URL
var driverLicPositiveURL = new Object();//驾驶证URL
var vehicleLicPositiveURL = new Object();//行驶证URL
var compulsoryInsurancePositiveURL = new Object();//交强险保单
var commercialInsurancePositiveURL = new Object();//商业险保单


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
    $("#vehicleOwnerTypeDriverEdit").val(responseData.vehicleOwnerType);//车辆所属
    $("#compulsoryInsuranceCompanyDriverEdit").val(responseData.compulsoryInsuranceCompany);//交强险公司
    $("#compulsoryInsuranceDocNoDriverEdit").val(responseData.compulsoryInsuranceDocNo);//交强险单号
    $("#compulsoryInsuranceAmtDriverEdit").val(responseData.compulsoryInsuranceAmt);//交强险金额
    $("#commercialInsuranceCompanyDriverEdit").val(responseData.commercialInsuranceCompany);//商业险公司
    $("#commercialInsuranceDocNoDriverEdit").val(responseData.commercialInsuranceDocNo);//商业险单号
    $("#commercialInsuranceAmtDriverEdit").val(responseData.commercialInsuranceAmt);//商业险金额
    //地址
    getProvinceDriverEdit();
    $("#provinceDriverEdit").val(responseData.residentProvinceCodeName);//省
    $("#cityDriverEdit").val(responseData.residentCityCodeName);//市
    $("#districtDriverEdit").val(responseData.residentDistrictCodeName);//区
    $("#addressDriverEdit").val(responseData.residentAddress);//详细地址
    //日期
    $("#driverLicEffectiveDateEndDriverEdit").val(responseData.driverLicEffectiveDateEnd);//驾驶证有效期
    $("#driverLicIssueDateDriverEdit").val(responseData.driverLicIssueDate);//驾驶证发证日期
    $("#vehicleLicIssueDateDriverEdit").val(responseData.vehicleLicIssueDate);//行驶证发证日期
    $("#vehicleLicLastestInspEffEndDateDriverEdit").val(responseData.vehicleLicLastestInspEffEndDate);//行驶证年检有效日期
    $("#compulsoryInsuranceEffectiveEndDateDriverEdit").val(responseData.compulsoryInsuranceEffectiveEndDate);//交强险有效期
    $("#commercialInsuranceEffectiveEndDateDriverEdit").val(responseData.commercialInsuranceEffectiveEndDate);//商业险有效期
    //图片
    if (responseData.iDPositive != null) {
        //$("#iDPositiveURLDriverEdit").val(responseData.iDPositive.url);
        $("#iDPositiveDriverEdit").html('<img src="' + responseData.iDPositive.url + '" alt="" width="200" height="80" />')
    }//身份证正面
    if (responseData.driverLicPositive != null) {
        $("#driverLicPositiveDriverEdit").html('<img src="' + responseData.driverLicPositive.url + '" alt="" width="200" height="80" />')
    }//驾驶证正面
    if (responseData.vehicleLicPositive != null) {
        $("#vehicleLicPositiveDriverEdit").html('<img src="' + responseData.vehicleLicPositive.url + '" alt="" width="200" height="80" />')
    }//行驶证正面
    if (responseData.compulsoryInsurancePositive != null) {
        $("#compulsoryInsurancePositiveDriverEdit").html('<img src="' + responseData.compulsoryInsurancePositive.url + '" alt="" width="200" height="80" />')
    }//交强险保单
    if (responseData.commercialInsurancePositive != null) {
        $("#commercialInsurancePositiveDriverEdit").html('<img src="' + responseData.commercialInsurancePositive.url + '" alt="" width="200" height="80" />')
    }//商业险保单
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
    changeProvinceDriverEdit();
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
    $("#districtDriverEdit").empty();

        $.each(data, function (index, item) {
            $("#cityDriverEdit").append("<option value='" + item.divCode + "' >" + item.divName + "</option>");
            //if (driverInfo.residentCityCode == item.divCode) {
            //    $("#cityDriverEdit").find("option[value='" + item.divCode + "']").attr("selected", true)
            //}
        });
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
    $("#districtDriverEdit").prepend("<option value='9999'>请选择</option>"); //为Select插入一个Option(第一个位置)
    $.each(data, function (index, item) {
        $("#districtDriverEdit").append("<option value='" + item.divCode + "' >" + item.divName + "</option>");
        //if (driverInfo.residentDistrictCode == item.divCode) {
        //    $("#districtDriverEdit").find("option[value='" + item.divCode + "']").attr("selected", true)
        //}
    });
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
        if (driverInfo.vehicleOwnerType == item.dictValueCode) {
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
        if (driverInfo.vehicleOwnerType == item.dictValueCode) {
            $("#commercialInsuranceCompanyDriverEdit").find("option[value='" + item.dictValueCode + "']").attr("selected", true)
        }
    });
};


//身份证上传
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
//删除身份证
var delIDPositiveDriverEdit = function () {
    $("#img_iDPositiveDriverEdit").attr("src", "../images/fujianimg.png");
    $("#a_iDPositiveDriverEdit").removeAttr("href");
    iDPositiveURL = ""
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


//交强险保单上传
var uploadCompulsoryInsuranceDriverEdit = function (imgData) {
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
        ajaxHelp.AjaxForm(URL, requestData, successUploadCompulsoryInsuranceDriverEdit, null);
    });
    return true;
};
var successUploadCompulsoryInsuranceDriverEdit = function (responseData) {
    compulsoryInsurancePositiveURL = responseData.url;
};
//删除行驶证
var delCompulsoryInsurancePositiveDriverEdit = function () {
    $("#img_compulsoryInsuranceInverseDriverEdit").attr("src", "../images/fujianimg.png");
    $("#a_compulsoryInsuranceInverseDriverEdit").removeAttr("href");
    compulsoryInsurancePositiveURL = ""
};


//商业险保单上传
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
        ajaxHelp.AjaxForm(URL, requestData, successUploadCommercialInsuranceDriverEdit, null);
    });
    return true;
};
var successUploadCommercialInsuranceDriverEdit = function (responseData) {
    commercialInsurancePositiveURL = responseData.url;
};
//删除商业险保单
var delCommercialInsurancePositiveDriverEdit = function () {
    $("#img_commercialInsurancePositiveDriverEdit").attr("src", "../images/fujianimg.png");
    $("#a_commercialInsurancePositiveDriverEdit").removeAttr("href");
    commercialInsurancePositiveURL = ""
};


//司机编辑-提交
var submitDriverEdit = function () {
    var URL = ApiPath.TMSApi.businessData.driverEdit;
    //时间对象格式化
    var driverLicEffectiveDate = $("#driverLicEffectiveDateEndDriverEdit").datebox("getValue");//驾驶证有效期
    if ($("#driverLicEffectiveDateEndDriverEdit").datebox("getValue") != "") {
        driverLicEffectiveDate = driverLicEffectiveDate +" "+ "23:59:59";
    }
    var driverLicIssueDate = $("#driverLicIssueDateDriverEdit").datebox("getValue");//驾驶证发证日期
    if ($("#driverLicIssueDateDriverEdit").datebox("getValue")!="") {
        driverLicIssueDate = driverLicIssueDate +" "+"23:59:59";
    }
    var vehicleLicIssueDate = $("#vehicleLicIssueDateDriverEdit").datebox("getValue");//行驶证发证日期
    if ($("#vehicleLicIssueDateDriverEdit").datebox("getValue") != "") {
        vehicleLicIssueDate = vehicleLicIssueDate+" "+ "23:59:59";
    }
    var vehicleLicLastestInspEffDate = $("#vehicleLicLastestInspEffEndDateDriverEdit").datebox("getValue");//行驶证年检有效日期
    if ($("#vehicleLicLastestInspEffEndDateDriverEdit").datebox("getValue") != "") {
        vehicleLicLastestInspEffDate = vehicleLicLastestInspEffDate+" "+ "23:59:59";
    }
    var compulsoryInsuranceEffectiveDate = $("#compulsoryInsuranceEffectiveEndDateDriverEdit").datebox("getValue");//交强险有效期
    if ($("#compulsoryInsuranceEffectiveEndDateDriverEdit").datebox("getValue") != "") {
        compulsoryInsuranceEffectiveDate = compulsoryInsuranceEffectiveDate +" "+ "23:59:59";
    }
    var commercialInsuranceEffectiveDate = $("#commercialInsuranceEffectiveEndDateDriverEdit").datebox("getValue");//商业险有效期
    if ($("#commercialInsuranceEffectiveEndDateDriverEdit").datebox("getValue")!="") {
        commercialInsuranceEffectiveDate = commercialInsuranceEffectiveDate +" "+ "23:59:59";
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
        driverLicPositive: {url: driverLicPositiveURL, attachmentDesc: ""},
        vehicleLicPositive: {url: vehicleLicPositiveURL, attachmentDesc: ""},
        compulsoryInsurancePositive: {url: compulsoryInsurancePositiveURL, attachmentDesc: ""},
        commercialInsurancePositive: {url: commercialInsurancePositiveURL, attachmentDesc: ""}
    };
    if (requestData.userName == null || requestData.userName == "") {
        $.messager.alert("提示", "请输入姓名！", "error");
        return;
    }
    if (requestData.userIDCard == null || requestData.userIDCard == "") {
        $.messager.alert("提示", "请输入身份证号！", "error");
        return;
    }
    if (requestData.userIDCard.length != 18) {
        $.messager.alert("提示", "请输入18位身份证号！", "error");
        return;
    }
    if (requestData.userMobile == null || requestData.userMobile == "") {
        $.messager.alert("提示", "请输入手机号！", "error");
        return;
    }
    if (requestData.userMobile.length != 11) {
        $.messager.alert("提示", "请输入11位手机号！", "error");
        return;
    }
    if (requestData.userEmail == null || requestData.userEmail == "") {
        $.messager.alert("提示", "请输入邮箱！", "error");
        return;
    }
    if (requestData.residentProvinceCode == null || requestData.residentProvinceCode == "") {
        $.messager.alert("提示", "请输入省！", "error");
        return;
    }
    if (requestData.residentCityCode == null || requestData.residentCityCode == "") {
        $.messager.alert("提示", "请输入市！", "error");
        return;
    }
    if (requestData.residentDistrictCode == null || requestData.residentDistrictCode == "") {
        $.messager.alert("提示", "请输入区！", "error");
        return;
    }
    if (requestData.residentAddress == null || requestData.residentAddress == "") {
        $.messager.alert("提示", "请输入地址！", "error");
        return;
    }
    if (iDPositiveURL == "") {
        $.messager.alert("提示", "请上传身份证！", "error");
        return;
    }
    if (requestData.driverLicNo == null || requestData.driverLicNo == "") {
        $.messager.alert("提示", "请输入驾驶证号！", "error");
        return;
    }

    if (requestData.plateNo == null || requestData.plateNo == "") {
        $.messager.alert("提示", "请输入车牌号！", "error");
        return;
    }

    console.log(requestData)
    ajaxHelp.AjaxPost(URL, requestData, successSubmitDriverAdd, null);
};
var successSubmitDriverAdd = function () {
    alert("编辑成功");
    $("#tabs").tabs("close", "司机编辑");
    loadDriverList();
};


//司机编辑-关闭
var closeDriverEdit = function () {
    alert("关闭");
    $("#tabs").tabs("close", "司机编辑");
};


getInfoDriverEdit();//获取司机信息

getVehicleOwnerDriverEdit();//获取车辆所属下拉框
getCompulsoryInsuranceCompanyDriverEdit();//获取交强险保险公司下拉框
getCmmercialInsuranceCompanyDriverEdit();//获取商业险保险公司下拉框

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
