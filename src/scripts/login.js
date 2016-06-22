/**
 * Created by xuezhiyu on 2016/05/11.
 */

$(function () {
    initTable();
});

function initTable() {
    $("#loginDialog").dialog({
        closable: false,
        title: "登陆界面",
        modal: true,
        width: 300,
        height: 200,
        buttons: [
            {
                text: "登录", //按钮名称
                iconCls: "icon-man", //按钮左侧显示的图片
                handler: function () {//按钮点击之后出发的方法
                    //JQuery的ajax异步后台提交
                    loginFunc();
                }
            }, {
                text: "注册",
                handler: function () {
                    //注册明天再写，将用easyui自带的form提交方式，以及自带的ValidateBox验证方式
                }
            }]
    });
}

function loginFunc() {
    // var res = $("#loginForm").serialize(); //将form表单的内容序列化,这里也可以使用原始的取值方法
    window.location.href = "main.html";
    // $.messager.alert('提示', "登陆失败", "error"); //这里使用easyui的message框架，弹出提示信息
}
