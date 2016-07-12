/**
 * Created by medlog on 2016/7/8.
 */
var ajaxHelp = new AjaxHelp();
//选中获取司机数据集合
var rowData = $("#driverList").datagrid("getSelections");
var driverInfo = new Object();


//获取司机信息
var getInfoDriverEdit = function () {
    var URL = ApiPath.TMSApi.businessData.driverDetail;
    var requestData = {
        userId: rowData[0].userId
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetInfoDriverEdit, null);
};
var successGetInfoDriverEdit = function (responseData) {
    driverInfo = responseData;
    $("#loginNameDriverEdit").html(responseData.loginName);//账户名
    $("#logCenterDriverEdit").html(responseData.lCName);//所属物流中心
    $("#userNameDriverEdit").val(responseData.userName);//姓名
    $("#userIDCardDriverEdit").val(responseData.userIDCard);//身份证号
    $("#userMobileDriverEdit").val(responseData.userMobile);//手机号
    $("#userEmailDriverEdit").val(responseData.userEmail);//邮箱
    $("#addressDriverEdit").val(responseData.address);//详细地址
    $("#driverLicNoDriverEdit").val(responseData.driverLicNo);//驾驶证号
    $("#roadFrtQCertNoDriverEdit").val(responseData.roadFrtQCertNo);//从业资格证号
    $("#driverLicEffectiveDateEndDriverEdit").val(responseData.driverLicEffectiveDateEnd);//有效期
    $("#driverLicIssueDateDriverEdit").val(responseData.driverLicIssueDate);//驾驶证发证日期
    //$("#driverLicPositiveDriverEdit").val(responseData.driverLicPositive.url);//驾驶证上传
    $("#plateNoDriverEdit").val(responseData.plateNo);//车牌号
    $("#vehicleLicSpecificationDriverEdit").val(responseData.vehicleLicSpecification);//车型
    $("#vehicleLicIssueDateDriverEdit").val(responseData.vehicleLicIssueDate);//行驶证发证日期
    $("#vehicleLicLastestInspEffEndDateDriverEdit").val(responseData.vehicleLicLastestInspEffEndDate);//年检有效日期
    $("#vehicleCapacityDriverEdit").val(responseData.vehicleCapacity);//车辆容积
    $("#vehicleOPCertNoDriverEdit").val(responseData.vehicleOPCertNo);//营运证号
    $("#vehicleLengthDriverEdit").val(responseData.vehicleLength);//长
    $("#vehicleWidthDriverEdit").val(responseData.vehicleWidth);//宽
    $("#vehicleHeightDriverEdit").val(responseData.vehicleHeight);//高
    $("#vehicleOwnerTypeDriverEdit").val(responseData.vehicleOwnerType);//车辆所属
    //$("#vehicleLicPositiveDriverEdit").val(responseData.);//行驶证上传
    $("#compulsoryInsuranceCompanyDriverEdit").val(responseData.compulsoryInsuranceCompany);//交保险-公司
    $("#compulsoryInsuranceDocNoDriverEdit").val(responseData.compulsoryInsuranceDocNo);//交保险-单号
    $("#compulsoryInsuranceEffectiveEndDateDriverEdit").val(responseData.compulsoryInsuranceEffectiveEndDate);//交保险-有效期
    $("#compulsoryInsuranceAmtDriverEdit").val(responseData.compulsoryInsuranceAmt);//交保险-金额
    //$("#compulsoryInsurancePositiveDriverEdit").val(responseData.);//交保险-保单
    $("#commercialInsuranceCompanyDriverEdit").val(responseData.commercialInsuranceCompany);//商业险-公司
    $("#commercialInsuranceDocNoDriverEdit").val(responseData.commercialInsuranceDocNo);//商业险-单号
    $("#commercialInsuranceEffectiveEndDateDriverEdit").val(responseData.commercialInsuranceEffectiveEndDate);//商业险-有效期
    $("#commercialInsuranceAmtDriverEdit").val(responseData.commercialInsuranceAmt);//商业险-金额
    //$("#commercialInsurancePositiveDriverEdit").val(responseData.);//商业险-保单
    getProvinceDriverEdit();//地址下拉框
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
        if (driverInfo.provinceCodeDefault == item.divCode) {
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
        parentDivCode: driverInfo.provinceCodeDefault
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetCityDriverEdit, null);
};
var successGetCityDriverEdit = function (data) {
    $.each(data, function (index, item) {
        $("#cityDriverEdit").append("<option value='" + item.divCode + "' >" + item.divName + "</option>");
        if (driverInfo.cityCodeDefault == item.divCode) {
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
        parentDivCode: driverInfo.cityCodeDefault
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetDistrictDriverEditt, null);
};
var successGetDistrictDriverEditt = function (data) {
    $.each(data, function (index, item) {
        $("#districtDriverEdit").append("<option value='" + item.divCode + "' >" + item.divName + "</option>");
        if (driverInfo.districtCodeDefault == item.divCode) {
            $("#districtDriverEdit").find("option[value='" + item.divCode + "']").attr("selected", true)
        }
    });
};
//修改市
changeCity = function (data) {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level: 2,
        parentDivCode: data
    };
    ajaxHelp.AjaxPost(URL, requestData, successChangeCity, null);
};
var successChangeCity = function (data) {
    $("#cityDriverEdit").empty();
    $("#cityDriverEdit").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
    $("#districtDriverEdit").empty();
    $("#districtDriverEdit").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
    $.each(data, function (index, item) {
        $("#cityDriverEdit").append("<option value='" + item.divCode + "' >" + item.divName + "</option>")
    });
};
//修改区
changeDistrict = function (data) {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level: 3,
        parentDivCode: data
    };
    ajaxHelp.AjaxPost(URL, requestData, successChangeDistrict, null);
};
var successChangeDistrict = function (data) {
    $("#districtDriverEdit").empty();
    $("#districtDriverEdit").prepend("<option value=''>请选择</option>"); //为Select插入一个Option(第一个位置)
    $.each(data, function (index, item) {
        $("#districtDriverEdit").append("<option value='" + item.divCode + "' >" + item.divName + "</option>")
    });
};


//身份证上传
function uploadIDDriverEdit(imgData) {
    var file = imgData.files[0];//选择上传的文件
    var fr = new FileReader();
    fr.readAsDataURL(file);
    $(fr).load(function () {
        var URL = ApiPath.TMSApi.dictionary.upload;
        var requestData = {
            file: fr.result
        };
        ajaxHelp.AjaxForm(URL, requestData, successUploadIDDriverEdit, null);
    });
    return true;
}
var iDPositiveURL = "";
var successUploadIDDriverEdit = function (responseData) {
    iDPositiveURL = responseData.url;
};
//驾驶证上传
function uploadDriverLicDriverEdit(imgData) {
    var file = imgData.files[0];//选择上传的文件
    var fr = new FileReader();
    fr.readAsDataURL(file);
    $(fr).load(function () {
        var URL = ApiPath.TMSApi.dictionary.upload;
        var requestData = {
            file: fr.result
        };
        ajaxHelp.AjaxForm(URL, requestData, successUploadDriverLicDriverEdit, null);
    });
    return true;
}
var driverLicPositiveURL = "";
var successUploadDriverLicDriverEdit = function (responseData) {
    driverLicPositiveURL = responseData.url;
};
//行驶证上传
function uploadVehicleLicDriverEdit(imgData) {
    var file = imgData.files[0];//选择上传的文件
    var fr = new FileReader();
    fr.readAsDataURL(file);
    $(fr).load(function () {
        var URL = ApiPath.TMSApi.dictionary.upload;
        var requestData = {
            file: fr.result
        };
        ajaxHelp.AjaxForm(URL, requestData, successUploadVehicleLicDriverEdit, null);
    });
    return true;
}
var vehicleLicPositiveURL = "";
var successUploadVehicleLicDriverEdit = function (responseData) {
    vehicleLicPositiveURL = responseData.url;
};
//交保险保单上传
function uploadCompulsoryInsuranceDriverEdit(imgData) {
    var file = imgData.files[0];//选择上传的文件
    var fr = new FileReader();
    fr.readAsDataURL(file);
    $(fr).load(function () {
        var URL = ApiPath.TMSApi.dictionary.upload;
        var requestData = {
            file: fr.result
        };
        ajaxHelp.AjaxForm(URL, requestData, successUploadCompulsoryInsuranceDriverEdit, null);
    });
    return true;
}
var compulsoryInsurancePositiveURL = "";
var successUploadCompulsoryInsuranceDriverEdit = function (responseData) {
    compulsoryInsurancePositiveURL = responseData.url;
};
//商业险保单上传
function uploadCommercialInsuranceDriverEdit(imgData) {
    var file = imgData.files[0];//选择上传的文件
    var fr = new FileReader();
    fr.readAsDataURL(file);
    $(fr).load(function () {
        var URL = ApiPath.TMSApi.dictionary.upload;
        var requestData = {
            file: fr.result
        };
        ajaxHelp.AjaxForm(URL, requestData, successUploadCommercialInsuranceDriverEdit, null);
    });
    return true;
}
var commercialInsurancePositiveURL = "";
var successUploadCommercialInsuranceDriverEdit = function (responseData) {
    commercialInsurancePositiveURL = responseData.url;
};


//验证邮箱
//var isEmail = function (str) {
//    var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
//    return reg.test(str);
//};


//司机编辑-提交
var submitDriverEdit = function () {
    var URL = ApiPath.TMSApi.businessData.driverEdit;
    //时间对象
    //var driverLicEffectiveDateEnd = $("#driverLicEffectiveDateEndDriverEdit").val();
    //var driverLicIssueDate = $("#driverLicIssueDateDriverEdit").datebox("getValue") + "23:59:59";
    //var vehicleLicIssueDate = $("#vehicleLicIssueDateDriverEdit").datebox("getValue") + "23:59:59";
    //var vehicleLicLastestInspEffEndDate = $("#vehicleLicLastestInspEffEndDateDriverEdit").datebox("getValue") + "23:59:59";
    //var compulsoryInsuranceEffectiveEndDate = $("#compulsoryInsuranceEffectiveEndDateDriverEdit").datebox("getValue") + "23:59:59";
    //var commercialInsuranceEffectiveEndDate = $("#commercialInsuranceEffectiveEndDateDriverEdit").datebox("getValue") + "23:59:59";
    var requestData = {
        userId: rowData[0].userId,
        userName: $("#userNameDriverEdit").val(),//姓名
        userIDCard: $("#userIDCardDriverEdit").val(),//身份证号
        userMobile: $("#userMobileDriverEdit").val(),//手机号
        provinceCodeDefault: $("#provinceDriverEdit").val(),//省
        cityCodeDefault: $("#cityDriverEdit").val(),//市
        districtCodeDefault: $("#districtDriverEdit").val(),//区
        address: $("#addressDriverEdit").val(),//详细住址
        userEmail: $("#userEmailDriverEdit").val(),//邮箱
        driverLicNo: $("#driverLicNoDriverEdit").val(),//驾驶证号
        roadFrtQCertNo: $("#roadFrtQCertNoDriverEdit").val(),//从业资格证号
        //driverLicEffectiveDateEnd: driverLicEffectiveDateEnd,//驾驶证有效期
        //driverLicIssueDate: driverLicIssueDate,//驾驶证发证日期
        plateNo: $("#plateNoDriverEdit").val(),//车牌号
        vehicleLicSpecification: $("#vehicleLicSpecificationDriverEdit").val(),//车型
        //vehicleLicIssueDate: vehicleLicIssueDate,//行驶证发证日期
        //vehicleLicLastestInspEffEndDate: vehicleLicLastestInspEffEndDate,//行驶证年检有效日期
        vehicleCapacity: $("#vehicleCapacityDriverEdit").val(),//车辆容量
        vehicleOPCertNo: $("#vehicleOPCertNoDriverEdit").val(),//行驶证营运证号
        vehicleLength: $("#vehicleLengthDriverEdit").val(),//长
        vehicleWidth: $("#vehicleWidthDriverEdit").val(),//宽
        vehicleHeight: $("#vehicleHeightDriverEdit").val(),//高
        vehicleOwnerType: $("#vehicleOwnerTypeDriverEdit").val(),//车辆所属
        compulsoryInsuranceCompany: $("#compulsoryInsuranceCompanyDriverEdit").val(),//交保险-公司
        compulsoryInsuranceDocNo: $("#compulsoryInsuranceDocNoDriverEdit").val(),//交保险-单号
        //compulsoryInsuranceEffectiveEndDate: compulsoryInsuranceEffectiveEndDate,//交保险-有效期
        compulsoryInsuranceAmt: $("#compulsoryInsuranceAmtDriverEdit").val(),//交保险-金额
        commercialInsuranceCompany: $("#commercialInsuranceCompanyDriverEdit").val(),//商业险-公司
        commercialInsuranceDocNo: $("#commercialInsuranceDocNoDriverEdit").val(),//商业险-单号
        //commercialInsuranceEffectiveEndDate: commercialInsuranceEffectiveEndDate,//商业险-有效期
        commercialInsuranceAmt: $("#commercialInsuranceAmtDriverEdit").val(),//商业险-金额
        //图片上传
        iDPositive: {url: iDPositiveURL, attachmentDesc: ""},
        driverLicPositive: {url: driverLicPositiveURL, attachmentDesc: ""},
        vehicleLicPositive: {url: vehicleLicPositiveURL, attachmentDesc: ""},
        compulsoryInsurancePositive: {url: compulsoryInsurancePositiveURL, attachmentDesc: ""},
        commercialInsurancePositive: {url: commercialInsurancePositiveURL, attachmentDesc: ""}
    };
    if (requestData.userMobile.length != 11) {
        $.messager.alert("提示", "请输入正确的手机号！", "error");
        return;
    }
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


//获取司机信息
getInfoDriverEdit();
