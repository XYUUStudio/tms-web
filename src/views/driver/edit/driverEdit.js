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

};
//getInfoDriverEdit();

//司机编辑-获取省下拉框
var getProvinceDriverEdit = function () {
    var URL = ApiPath.TMSApi.dictionary.admDivisionInfoSearch;
    var requestData = {
        level: 1,
        parentDivCode: ""
    };
    ajaxHelp.AjaxPost(URL, requestData, successGetProvinceDriverEdit, null);
};
var successGetProvinceDriverEdit = function (data) {
    console.log(data);
    $.each(data, function (index, item) {
        $("#provinceDriverEdit").append("<option value='" + item.divCode + "' >" + item.divName + "</option>")
    })
};
//司机编辑-获取市下拉框
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
    $("#cityDriverEdit").prepend("<option value=''>请选择</option>");//为Select插入一个Option(第一个位置)
    $("#districtDriverEdit").empty();
    $("#districtDriverEdit").prepend("<option value=''>请选择</option>");//为Select插入一个Option(第一个位置)
    $.each(data, function (index, item) {
        $("#cityDriverEdit").append("<option value='" + item.divCode + "' >" + item.divName + "</option>")
    })
};
//司机编辑-获取区下拉框
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
    $("#districtDriverEdit").prepend("<option value=''>请选择</option>");//为Select插入一个Option(第一个位置)
    $.each(data, function (index, item) {
        $("#districtDriverEdit").append("<option value='" + item.divCode + "' >" + item.divName + "</option>")
    })
};
getProvinceDriverEdit();


//司机编辑-身份证上传
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
var successUploadIDDriverEdit = function (data) {
    iDPositiveURL = data.url;
};


//司机编辑-驾驶证上传
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
var successUploadDriverLicDriverEdit = function (data) {
    driverLicPositiveURL = data.url;
};


//司机编辑-行驶证上传
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
var successUploadVehicleLicDriverEdit = function (data) {
    vehicleLicPositiveURL = data.url;
};


//司机编辑-交保险保单上传
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
var successUploadCompulsoryInsuranceDriverEdit = function (data) {
    compulsoryInsurancePositiveURL = data.url;
};


//司机编辑-商业险保单上传
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
var successUploadCommercialInsuranceDriverEdit = function (data) {
    commercialInsurancePositiveURL = data.url;
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
        provinceCodeDefault: $("#provinceDriverEdit").val(),
        cityCodeDefault: $("#cityDriverEdit").val(),
        districtCodeDefault: $("#districtDriverEdit").val(),
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
        commercialInsuranceAmt: $("#commercialInsuranceAmtDriverEdit").val(),
        //图片上传
        iDPositive: [{url: iDPositiveURL}],
        driverLicPositive: [{url: driverLicPositiveURL}],
        vehicleLicPositive: [{url: vehicleLicPositiveURL}],
        compulsoryInsurancePositive: [{url: compulsoryInsurancePositiveURL}],
        commercialInsurancePositive: [{url: commercialInsurancePositiveURL}]
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
