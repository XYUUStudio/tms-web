/**
 * Created by medlog-dev-2 on 2016/7/4.
 */
var ajaxHelp = new AjaxHelp();
//获取分页信息值
var GetPegin=function () {
    var Pegin={
        page:$(".pagination-page-list").combobox('getValue'),

    }
}
//首次列表加载、翻页、更改页面大小都会触发
var loadEnterprisesList = function(pageNumber, pageSize){
    // 定义post  请求页地址
    var URL = ApiPath.TMSApi.businessData.enterprisesList;
    if(pageNumber == undefined || pageNumber == 0 ){pageNumber = 1;}
    if(pageSize == undefined || pageSize == 0 ){pageSize = 20;}
    var requestData = {
        page:pageNumber,
        rows:pageSize,
    };
    ajaxHelp.AjaxPost(URL,requestData,successDoSearch,null);
}
//排序回调函数
var doSort = function(sort, order){
    var URL = ApiPath.OMSApi.searchQMSMasterList;
    var options = $("#enterprisesList").datagrid('getPager').data("pagination").options;
    var currPage = options.pageNumber;
    var pageSize = options.pageSize;
    var requestData = {page:currPage, rows:pageSize,sort:sort,order:order};
    ajaxHelp.AjaxPost(URL,requestData,successDoSearch,null);
}
//搜索数据方式一
var SearchEnterprises = function(){
    var URL = ApiPath.TMSApi.businessData.enterprisesList;
    var requestData = {
        searchValue: $('#searchValueEnterprises').val(),
        validStatus:$('#validStatusEnterprises').val(),
    };
    ajaxHelp.AjaxPost(URL,requestData,successDoSearch,null);
}
//成功后回调函数
var successDoSearch = function (resultInfo) {
    console.log(resultInfo)
    $("#enterprisesList").datagrid('loadData', resultInfo);

    // var pager = $("#enterprisesList").datagrid('getPager');
    $("#pp").pagination({
        pageList:[10,20,30],
        pageSize:resultInfo.pageSize,
        total:resultInfo.total,
        selected:true,
        // beforePageText: '第',//页数文本框前显示的汉字
        // afterPageText: '页    共 {pages} 页',
        // displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',
        onSelectPage:function(pageNumber, pageSize){
            loadData(pageNumber, pageSize);
        },
        onChangePageSize:function(pageNumber, pageSize){
            var pageSize= $("#pp").combobox('getValues')
            pageNumber=resultInfo.pageNumber;
            pageSize=resultInfo.pageSize;
            loadData(pageNumber, pageSize);
        },
    });
}
//搜索数据方式二
$('#searchbox').searchbox({
    searcher:function(value,name){
        alert(value + "," + name)
    },
    menu:'#search-single-cloumn',
    prompt:'Please Input Value'
});
// 按钮页面跳转
var AddEnterprises=function () {
    //新增数据
    addTabHref('企业新增','views/enterprises/add/enterprisesAdd.html')
}

var Viewenterprises=function(){
    //详情页面
    addTabHref('企业详情','views/enterprises/view/enterprisesView.html')
}
var getEnterprisesDate=function () {
    var row = $("#enterprisesList").datagrid('getSelections');
    return (row)
}
var editenterprises=function () {
    //编辑数据
    var row = $("#enterprisesList").datagrid('getSelections');
    if(!row||row==""){
        $.messager.alert('提示', "请选择需要编辑的报台！", "error");
    }else {
        addTabHref('企业编辑','views/enterprises/edit/enterprisesEdit.html')

    }
}
$("#enterprisesList").datagrid({
    striped: true,
    checkOnSelect:true,
    rownumbers:true,
    nowrap: true,
    singleSelect:true,
    pagination:true,
    fitColumns:true,
    iconCls:"icon-save",
    loadMsg:"正在加载，请稍等。。。。。。",
    onSortColumn:doSort,
    view: detailview,
    onDblClickCell:Viewenterprises,
    detailFormatter: function(rowIndex, rowData){//可以和onExpandRow合用
        return '<table><tr>' +
            '<td rowspan=2 style="border:0"></td>' +
            '<td style="border:0">' +
            '<p>sono: ' + rowData.sono + '</p>' +
            '<p>soTypeName: ' + rowData.soTypeName + '</p>' +
            '</td>' +
            '</tr></table>';
    }
});

//载入页执行  列表、时间函数
loadEnterprisesList();


