/**
 * Created by medlog on 2016/7/5.
 */
var ajaxHelp = new AjaxHelp();

//首次列表加载、翻页、更改页面大小都会触发
var loadUserList = function (pageNumber, pageSize) {
    // 定义post  请求页地址
    var URL = ApiPath.TMSApi.businessData.enterprisesList;
    if (pageNumber == undefined || pageNumber == 0) {
        pageNumber = 1;
    }
    if (pageSize == undefined || pageSize == 0) {
        pageSize = 20;
    }
    var requestData = {
        page: pageNumber,
        rows: pageSize,
    };
    ajaxHelp.AjaxPost(URL, requestData, successDoSearch, null);
}

//成功后回调函数
var successDoSearch = function (resultInfo) {
    console.log(resultInfo)
    $("#userList").datagrid("loadData", resultInfo);
    $("#pp").pagination({
        pageList: [10, 20, 30],
        pageSize: resultInfo.pageSize,
        total: resultInfo.total,
        selected: true,
        onSelectPage: function (pageNumber, pageSize) {
            loadData(pageNumber, pageSize);
        },
        onChangePageSize: function (pageNumber, pageSize) {
            var pageSize = $("#pp").combobox("getValues")
            pageNumber = resultInfo.pageNumber;
            pageSize = resultInfo.pageSize;
            loadData(pageNumber, pageSize);
        },
    });
}

//用户新增
var addUser = function () {
    addTabHref("用户新增", "views/user/add/userAdd.html");
}

//用户编辑
var editUser = function () {
    addTabHref("用户编辑", "views/user/edit/userEdit.html");
}

loadUserList();
