'use strict';


var userOrgcode = $.cookie("userOrgcode");
var userName = $.cookie("userName");
var userorgname = $.cookie("userorgname");
var userJobDesc = $.cookie("userJobDesc");
var ajaxHelp = new AjaxHelp();
/**
 * 初始化导航菜单
 */
var initLeftMenu = function () {
    $.ajax({
        type: "GET",
        url: "data/left-menu.json",
        dataType: "json",
        success: function (data) {
            getMeunList(data)

        },
        error: function () {
            alert.show('失败');
        }
    });
};
var getMeunList=function (result) {
    //获取菜单列表
        var data = result;
        var accd = '';
        $.each(data, function (i, item) {
            var group = item.group;
            var groupData = item.data;
            //var iconCls = item.icon;
            accd = '<ul>';
            $.each(groupData, function (i, item) {
                var title = item.title;
                // var icon = item.icon;
                var url = item.url;
                var type = item.type;
                var closableValue = true;
                // if (item.jsPathList != undefined && item.jsPathList.length != 0) {
                //     var jsPathList = item.jsPathList;
                // }
                accd += '<li><div ><a href="javascript:void(0);" class="easyui-linkbutton" plain="true" ';
                accd += 'onclick="javascript:addTab(' + type + ',\'' + title + '\',\'' + url + '\',' + closableValue + ');return false;">';
                accd += '' + title + ' </a></div></li>'
            });
            accd += '</ul>';
            $("#left_menu_content_id").accordion('add', {
                title: group,
                content: accd,
                iconCls: iconCls
            });
        });
        $('#left_menu_content_id').accordion('select', 0);
}
var getDateTime = function () {
    //获取当地时间
    var weekArray = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var today = new Date();
    var week = weekArray[today.getDay()];
    var dateime = today.format('yyyy-MM-dd hh:mm:ss');
    $('#dateime_id').html(week + ' ' + dateime);
};
var GetServerSearchFunction=function () {
    //对接数据库菜单
    var ajaxHelp = new AjaxHelp();
    var URL = ApiPath.TMSApi.UP.searchFunction;
    var requestData = {}
    ajaxHelp.AjaxPost(URL,requestData,SuccessFunction,null);
}
var SuccessFunction=function (data) {

    getMeunList(data)
}
/**
 * 加载Tabs
 * type:0以 Content形式加载,1以Url 形式加载
 */
var addTab = function (type, title, url, closableValue) {
    if (type === 0) {
        addTabContent(title, url, closableValue);
    } else if (type === 1) {
        if ($('#tabs').tabs('exists', title)) {
            $('#tabs').tabs('select', title);
            if(url=="views/400orders/recordedSingle/singer.html"){
                ds.dialog({
                    title : '消息提示',
                    content : "【"+title+"】页面已打开，为了保证你的数据不丢失，请提交或关闭您已打开的【"+title+"】页面！",
                    onyes:true,
                    width:280,
                    icon : "info.png",
                });
            }
        }
        else {
            addTabHref(title, url, closableValue);
        }
    }
};
/**
 * Tabs  以  Content形式加载
 * @param closableValue 是指是否关闭窗口
 */
var addTabContent = function (title, url, closableValue) {
    if ($('#tabs').tabs('exists', title)) {
        ds.dialog({
            title : '消息提示',
            content : "【"+title+"】页面已打开，为了保证你的数据不丢失，\n 请提交或关闭您已打开的【"+title+"】页面！",
            onyes:true,
            width:280,
            icon : "info.png",
        });
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
        if (iframe.attachEvent) {
            iframe.attachEvent("onload", function () {
                ajaxLoadEnd();
            });
        } else {
            iframe.onload = function () {
                ajaxLoadEnd();
            };
        }
        $('#tabs').tabs('add', {
            title: title,
            content: iframe,
            closable: closableValue
        });
    }
    tabClose();
};

/**
 * Tabs  以  Url 形式加载
 * @param closableValue 是指是否关闭窗口
 */
var addTabHref = function (title, url, closableValue) {
    //  加载新的tabs 页面
    if ($('#tabs').tabs('exists', title)) {
        ds.dialog({
            title : '消息提示',
            content : "【"+title+"】页面已打开，为了保证你的数据不丢失，请提交或关闭您已打开的【"+title+"】页面！",
            onyes:true,
            width:280,
            icon : "info.png",
        });
        $('#tabs').tabs('select', title);

    } else {
        if ("undefined" === typeof arguments[2]) {
            closableValue = true
        }
        $('#tabs').tabs('add', {
            title: title,
            href: url,
            closable: closableValue,
        });
    }
    tabClose();
};

var addTabHrefUpdate = function (title, url, closableValue) {
    //  加载新的tabs 页面
    if ($('#tabs').tabs('exists', title)) {
        // alert("已有相同页面打开！")
        $('#tabs').tabs('close', title);
        $('#tabs').tabs('add', {
            title: title,
            href: url,
            closable: closableValue,
        });
    } else {
        if ("undefined" === typeof arguments[2]) {
            closableValue = true
        }
        $('#tabs').tabs('add', {
            title: title,
            href: url,
            closable: closableValue,
        });
    }
    tabClose();
};

//个人信息
var personal = function () {
    addTabHref('个人设置', 'views/personal/index.html', 'views/personal/index.js')
}
/**
 * Tabs 监听添加 tab事件
 */
var onAddTab = function () {
    $('#tabs').tabs({
        onAdd: function (title, index) {
            ajaxLoading('数据加载中...');
        }
    });
};

/**
 * Tabs 监听更新 tab事件
 */
var onUpdateTab = function () {
    $('#tabs').tabs({
        onUpdate: function (panel) {
            ajaxLoading('数据加载中...');
        }
    });
};

/**
 * Tabs 监听加载 tab完成事件
 */
var onLoadTab = function () {
    $('#tabs').tabs({
        onLoad: function (panel) {
            ajaxLoadEnd();
        }
    });
};

function tabClose() {
    /*双击关闭TAB选项卡*/
    $(".tabs-inner").dblclick(function () {
        var subtitle = $(this).children(".tabs-closable").text();
        $('#tabs').tabs('close', subtitle);
    });
    /*为选项卡绑定右键*/
    $(".tabs-inner").bind('contextmenu', function (e) {
        $('#tab-memu-id').menu('show', {
            left: e.pageX,
            top: e.pageY
        });
        var subtitle = $(this).children(".tabs-closable").text();
        $('#tab-memu-id').data("currtab", subtitle);
        $('#tabs').tabs('select', subtitle);
        return false;
    });
}
//绑定右键菜单事件
function tabCloseEven() {
    //刷新
    $('#tab-menu-update').click(function () {
        var currTab = $('#tabs').tabs('getSelected');
        var tab = currTab.panel('options').tab;
        var url = $(currTab.panel('options').content).attr('src');
        $('#tabs').tabs('update', {
            tab: currTab,
            options: {
                url: url
            }
        });
        currTab.panel('refresh', url);
    });
    //关闭当前
    $('#tab-menu-close').click(function () {
        var currtabTitle = $('#tab-memu-id').data("currtab");
        $('#tabs').tabs('close', currtabTitle);
    });
    //全部关闭
    $('#tab-menu-closeall').click(function () {
        $('.tabs-inner span').each(function (i, n) {
            var t = $(n).text();
            $('#tabs').tabs('close', t);
        });
    });
    //关闭除当前之外的TAB
    $('#tab-menu-closeother').click(function () {
        $('#mm-tabcloseright').click();
        $('#mm-tabcloseleft').click();
    });
    //关闭当前右侧的TAB
    $('#tab-menu-closeright').click(function () {
        var nextall = $('.tabs-selected').nextAll();
        if (nextall.length === 0) {
            //msgShow('提示','后边没有啦~~');
            return false;
        }
        nextall.each(function (i, n) {
            var t = $('a:eq(0) span', $(n)).text();
            $('#tabs').tabs('close', t);
        });
        return false;
    });
    //关闭当前左侧的TAB
    $('#tab-menu-closeleft').click(function () {
        var prevall = $('.tabs-selected').prevAll();
        if (prevall.length === 0) {
            //msgShow('提示','到头了，前边没有啦~~');
            return false;
        }
        prevall.each(function (i, n) {
            var t = $('a:eq(0) span', $(n)).text();
            $('#tabs').tabs('close', t);
        });
        return false;
    });

    //退出
    $("#tab-menu-exit").click(function () {
        $('#tab-memu-id').menu('hide');
    });
}

$(document).ready(function () {
    //定时更新时间
    $(function () {
        setInterval('getDateTime()', 1000);
    });
    if(AppConfig.development){
        initLeftMenu()
    }else {
        GetServerSearchFunction();
    }

    $("#MainUserInfo").html(userorgname+" "+userJobDesc+" "+userName)
    //换肤
    // $(function () {
    //     $('#theme_id').tooltip({
    //         content: $('<div></div>'),
    //         showEvent: 'click',
    //         onUpdate: function (content) {
    //             content.panel({
    //                 width: 200,
    //                 border: false,
    //                 title: '更换皮肤',
    //                 href: 'views/theme/feedbacklist.html'
    //             });
    //         },
    //         onShow: function () {
    //             var t = $(this);
    //             t.tooltip('tip').unbind().bind('mouseenter', function () {
    //                 t.tooltip('show');
    //             }).bind('mouseleave', function () {
    //                 t.tooltip('hide');
    //             });
    //         }
    //     });
    // });
    /**
     * 监听tab 事件
     */
    $(function () {
        tabClose();
        tabCloseEven();
        onAddTab();
        onLoadTab();
        onUpdateTab();
    })
});
//退出事件
var Loginout = function () {
    var ajaxHelp = new AjaxHelp();
    var URL = ApiPath.TMSApi.UP.pcLogout;
    var requestData = {}
    ajaxHelp.AjaxPost(URL,requestData,SuccessLoginout,null);
};
var SuccessLoginout=function () {
    window.location.href = "index.html";
}
var changePwd = {
    show: function () {
        $('#changePassword').dialog('open');
        //使Dialog居中显
        $('#changePassword').window('center');
    },
    // verification: function () {
    // },
    save: function () {
        var URL = ApiPath.TMSApi.UP.pcResetPwd;
        var requestData = {
            oldPwd: $("#oldPwd").val(),
            newPwd: $("#newPwd").val(),
            resetPwd:$("#resetPwd").val()
        };
        if(requestData.oldPwd==null||requestData.oldPwd==""){
            $.messager.alert("提示", "请输入初始密码!", "error");
            return;
        }
        if(requestData.newPwd==null||requestData.newPwd==""){
            $.messager.alert("提示", "请输入新密码!", "error");
            return;
        }
        if(requestData.resetPwd==null||requestData.resetPwd==""){
            $.messager.alert("提示", "请输入确认密码!", "error");
            return;
        }
        if(requestData.newPwd!=requestData.resetPwd){
            $.messager.alert("提示", "请输入和确认密码必須一致!", "error");
            return;
        }
       ajaxHelp.AjaxPost(URL,requestData,changePwd.saveSuccess(),null);
        //请求修改
    },
    saveSuccess: function () {
        // 回调成功
        $('#changePassword').dialog('close')
    }
};

$('#changePassword').dialog({
    title: '修改密码',
    // collapsible: true,
    // minimizable: true,
    // maximizable: true,
    closable: false,
    width: 480,
    height: 270,
    closed: true,
    cache: false,
    // href: 'get_content.php',
    modal: true,
    resizable: true,
    loadingMessage: '正在加载...',
    buttons: [{
        text: '保存',
        handler: function () {
            changePwd.save()
        }
    }]
});
