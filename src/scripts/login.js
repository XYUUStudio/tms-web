/**
 * Created by xuezhiyu on 2016/05/11.
 */
$(function () {
    //得到焦点
    $("#password").focus(function () {
        $("#left_hand").animate({
            left: "150",
            top: " -38"
        }, {
            step: function () {
                if (parseInt($("#left_hand").css("left")) > 140) {
                    $("#left_hand").attr("class", "left_hand");
                }
            }
        }, 2000);
        $("#right_hand").animate({
            right: "-64",
            top: "-38px"
        }, {
            step: function () {
                if (parseInt($("#right_hand").css("right")) > -70) {
                    $("#right_hand").attr("class", "right_hand");
                }
            }
        }, 2000);
    });
    //失去焦点
    $("#password").blur(function () {
        $("#left_hand").attr("class", "initial_left_hand");
        $("#left_hand").attr("style", "left:100px;top:-12px;");
        $("#right_hand").attr("class", "initial_right_hand");
        $("#right_hand").attr("style", "right:-112px;top:-12px");
    });

    // 登录验证
    var verification = function () {
        var getLoginInfomation = {
            loginName: new Object(),
            password: new Object(),
        }
        getLoginInfomation.loginName = $("#username").val();
        getLoginInfomation.password = $("#password").val();
        var result = true;
        if (getLoginInfomation.loginName == "" || getLoginInfomation.password == null || getLoginInfomation.password == "" || getLoginInfomation.password == null) {
            $.messager.alert('提示', "请输入账号密码！", "error");
            result = false;
        }
        return result;
    }
    var ajaxHelp = new AjaxHelp();
    Login = function () {
        //登录页绑定事件
        //ajax 请求   调用登录接口
        if (verification()) {
            var getLoginInfomation = {
                loginName: new Object(),
                loginPassword: new Object(),
            }
            getLoginInfomation.loginName = $("#username").val();
            getLoginInfomation.loginPassword = $("#password").val();
            var URL = ApiPath.TMSApi.UP.pcLogin;
            var requestData = getLoginInfomation;
            ajaxHelp.AjaxPost(URL, requestData, success, null);
        }


    }
    var success = function (data) {
        console.log(data);
        var bb=data.toString();
        console.log(bb)
        // //请求成功跳转登录页面
        $.cookie('token', data.token,{expires:data.excessTime/3600/24});
        $.cookie('userOrgcode', data.loginUserInfo.orgCode);
        $.cookie('userId', data.loginUserInfo.userId);
        window.location.href = "main.html";
    }
    keyLogin = function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            Login();
        }
    }
});
