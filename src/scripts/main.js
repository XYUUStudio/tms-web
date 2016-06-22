'use strict';

/**
 * 初始化导航菜单
 */
var initLeftMenu = function(){
    $.ajax({
        type:"GET",
        url:"data/left-menu.json",
        dataType: "json",
        success: function( result ) {
            if( result ){
                var data = result;
                var accd ='';
                $.each( data,function( i, item ){
                    var group = item.group ;
                    var gorupData = item.data;
                    var iconCls = item.icon;
                    accd = '<ul>';

                    $.each( gorupData,function( i, item ){
                        var title = item.title;
                        var icon = item.icon;
                        var url = item.url;
                        var type = item.type;
                        var closableValue = true;
                        if(item.jsPathList != undefined && item.jsPathList.length != 0){
                            var jsPathList = item.jsPathList;
                        }

                        accd += '<li><div ><a href="javascript:void(0);" class="easyui-linkbutton" plain="true" ';
                        accd += 'onclick="javascript:addTab('+type+',\''+title+'\',\''+url+'\','+closableValue+',\''+jsPathList+'\');return false;">';
                        accd += '<img src="' + icon + '" />'+ title+' </a></div></li>';

                    });

                   accd += '</ul>';

                    $("#left_menu_content_id").accordion('add', {
                        title: group,
                        content: accd,
                        iconCls:iconCls
                    });

                });

                $('#left_menu_content_id').accordion('select', 0);
            }

        },
        error: function() {
            alert.show('失败');
        }
    });
};


var getDateTime = function () {
    //获取当地时间
    var weekArray = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var today = new Date();
    var week = weekArray[today.getDay()];
    var dateime = today.format('yyyy-MM-dd hh:mm:ss');
    $('#dateime_id').html(week + ' ' + dateime);
};

/**
 * 加载Tabs
 * type:0以 Content形式加载,1以Url 形式加载
 */
var addTab = function (type,title, url, closableValue,jsPathList) {
    if (type === 0) {
        addTabContent(title, url, closableValue);
    } else if (type === 1) {
        addTabHref(title, url, closableValue);
        //动态加载js
        if(jsPathList != "undefined" && jsPathList != ""){
            var addJsPathlist = jsPathList.split(",");
            $.each(addJsPathlist,function(i,item){
                $.getScript(item);
            });
        }
    }
};
/**
 * Tabs  以  Content形式加载
 * @param closableValue 是指是否关闭窗口
 */
var addTabContent = function (title, url, closableValue) {
    if ($('#tabs').tabs('exists', title)) {
        $('#tabs').tabs('select', title);
    } else {
        if ("undefined" === typeof arguments[2]) {
            closableValue = true;
        }

       // ajaxLoading('数据加载中...');
        var iframe = document.createElement("iframe");
        iframe.src = url;
        iframe.scrolling = 'auto';
        iframe.frameBorder = 0;
        iframe.height = '100%';
        iframe.width = '100%';

        if (iframe.attachEvent){
            iframe.attachEvent("onload", function(){
                ajaxLoadEnd();
            });
        } else {
            iframe.onload = function(){
                ajaxLoadEnd();
            };
        }

        $('#tabs').tabs('add',{
            title:title,
            content:iframe,
            closable:closableValue
        });

    }

    tabClose();

};

/**
 * Tabs  以  Url 形式加载
 * @param closableValue 是指是否关闭窗口
 */
var addTabHref = function (title, url, closableValue) {
    if ($('#tabs').tabs('exists', title)) {
        $('#tabs').tabs('select', title);
    } else {
        if ("undefined" === typeof arguments[2]) {
            closableValue = true
        }
        $('#tabs').tabs('add', {
            title: title,
            href: url,
            closable: closableValue
        });
    }

   tabClose();
};

/**
 * Tabs 监听添加 tab事件
 */
var onAddTab = function() {
    $('#tabs').tabs({
        onAdd: function(title,index){
            ajaxLoading('数据加载中...');
        }
    });
};

/**
 * Tabs 监听更新 tab事件
 */
var onUpdateTab = function() {
    $('#tabs').tabs({
        onUpdate: function(panel){
            ajaxLoading('数据加载中...');
        }
    });
};

/**
 * Tabs 监听加载 tab完成事件
 */
var onLoadTab = function() {
    $('#tabs').tabs({
        onLoad: function(panel){
            ajaxLoadEnd();
        }
    });
};
function tabClose()
{
    /*双击关闭TAB选项卡*/
    $(".tabs-inner").dblclick(function(){
        var subtitle = $(this).children(".tabs-closable").text();
        $('#tabs').tabs('close',subtitle);
    });
    /*为选项卡绑定右键*/
    $(".tabs-inner").bind('contextmenu',function(e){
        $('#tab-memu-id').menu('show', {
            left: e.pageX,
            top: e.pageY
        });

        var subtitle =$(this).children(".tabs-closable").text();

        $('#tab-memu-id').data("currtab",subtitle);
        $('#tabs').tabs('select',subtitle);
        return false;
    });
}
//绑定右键菜单事件
function tabCloseEven()
{
    //刷新
    $('#tab-menu-update').click(function(){
        var currTab = $('#tabs').tabs('getSelected');
        var tab = currTab.panel('options').tab;
        var url = $(currTab.panel('options').content).attr('src');
        $('#tabs').tabs('update',{
            tab:currTab,
            options:{
                url:url
            }
        });
        currTab.panel('refresh',url);
    });
    //关闭当前
    $('#tab-menu-close').click(function(){
        var currtabTitle = $('#tab-memu-id').data("currtab");
        $('#tabs').tabs('close',currtabTitle);
    });
    //全部关闭
    $('#tab-menu-closeall').click(function(){
        $('.tabs-inner span').each(function(i,n){
            var t = $(n).text();
            $('#tabs').tabs('close',t);
        });
    });
    //关闭除当前之外的TAB
    $('#tab-menu-closeother').click(function(){
        $('#mm-tabcloseright').click();
        $('#mm-tabcloseleft').click();
    });
    //关闭当前右侧的TAB
    $('#tab-menu-closeright').click(function(){
        var nextall = $('.tabs-selected').nextAll();
        if(nextall.length===0){
            //msgShow('提示','后边没有啦~~');
            return false;
        }
        nextall.each(function(i,n){
            var t=$('a:eq(0) span',$(n)).text();
            $('#tabs').tabs('close',t);
        });
        return false;
    });
    //关闭当前左侧的TAB
    $('#tab-menu-closeleft').click(function(){
        var prevall = $('.tabs-selected').prevAll();
        if(prevall.length===0){
            //msgShow('提示','到头了，前边没有啦~~');
            return false;
        }
        prevall.each(function(i,n){
            var t=$('a:eq(0) span',$(n)).text();
            $('#tabs').tabs('close',t);
        });
        return false;
    });

    //退出
    $("#tab-menu-exit").click(function(){
        $('#tab-memu-id').menu('hide');
    });
}


$(document).ready(function () {

    //定时更新时间
    $(function () {
        setInterval('getDateTime()', 1000);
    });

    initLeftMenu();

    //换肤
    $(function(){
        $('#theme_id').tooltip({
            content: $('<div></div>'),
            showEvent: 'click',
            onUpdate: function(content){
                content.panel({
                    width: 200,
                    border: false,
                    title: '更换皮肤',
                    href: 'views/theme/index.html'
                });
            },
            onShow: function(){
                var t = $(this);
                t.tooltip('tip').unbind().bind('mouseenter', function(){
                    t.tooltip('show');
                }).bind('mouseleave', function(){
                    t.tooltip('hide');
                });
            }
        });
    });
    /**
     * 监听tab 事件
     */
    $(function(){
        tabClose();
        tabCloseEven();
        onAddTab();
        onLoadTab();
        onUpdateTab();
    })

});
