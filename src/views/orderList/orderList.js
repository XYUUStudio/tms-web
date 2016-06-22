
// $('#MyOrdersTable').datagrid({
//     url:'http://localhost:8080/tms-api/order/search',
//     method:'POST',
//     dataType:"json",
//     columns:[[
//         {field:'rownum',title:'rownum',align:'center'},
//         {field:'sono',title:'sono',align:'center'},
//         {field:'soTypeName',title:'soTypeName',align:'center'},
//         {field:'statusName',title:'statusName',align:'center'}
//     ]]
// });

//添加右击菜单内容
var onRowContextMenu = function(e, rowIndex, rowData){
    e.preventDefault();
    var selected=$("#MyOrdersTable").datagrid('selectRow',rowIndex); //获取所有行集合对象
    $('#right-click-menu').menu('show', {
        left:e.pageX,
        top:e.pageY
    });
}

//右键菜单函数
var rightMenuFunction = {
    view:function(){
        var item = $('#MyOrdersTable').datagrid('getSelected');
        alert(item.sono);
    },
    add:function(){
        $('#win').window('open');
    }
}

var ajaxHelp = new AjaxHelp();
//首次加载、翻页、更改页面大小都会触发
var loadData = function(pageNumber, pageSize){
    var URL = ApiPath.TMSApi.orderSearch;
    if(pageNumber == undefined || pageNumber == 0 ){pageNumber = 1;}
    if(pageSize == undefined || pageSize == 0 ){pageSize = 20;}
    var requestData = {page:pageNumber, rows:pageSize};
    ajaxHelp.AjaxPost(URL,requestData,success,null);
}
//排序回调函数
var doSort = function(sort, order){
    var URL = ApiPath.TMSApi.orderSearch;
    var options = $("#MyOrdersTable").datagrid('getPager').data("pagination").options;
    var currPage = options.pageNumber;
    var pageSize = options.pageSize;
    var requestData = {page:currPage, rows:pageSize,sort:sort,order:order};
    ajaxHelp.AjaxPost(URL,requestData,success,null);
}

//搜索数据方式一
var doSearch = function(){
    var URL = ApiPath.TMSApi.orderSearch;
    var requestData = {sono: $('#sono').val(), soTypeName: $('#soTypeName').val()};
    ajaxHelp.AjaxPost(URL,requestData,success,null);
}

//成功后回调函数
var success = function (resultInfo) {
    $("#MyOrdersTable").datagrid('loadData', resultInfo);
    var pager = $("#MyOrdersTable").datagrid('getPager');
    $(pager).pagination({
        pageList:[10,20,30],
        pageSize:resultInfo.pageSize,
        onSelectPage:function(pageNumber, pageSize){
            loadData(pageNumber, pageSize);
        }
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

$("#MyOrdersTable").datagrid({
    idField: 'sono',
    striped: true,
    checkOnSelect:true,
    rownumbers:false,
    nowrap: true,
    singleSelect:true,
    pagination:true,
    fitColumns:true,
    iconCls:"icon-save",
    loadMsg:"正在加载，请稍等。。。。。。",
    onRowContextMenu: onRowContextMenu,
    onSortColumn:doSort,
    view: detailview,
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

loadData();
