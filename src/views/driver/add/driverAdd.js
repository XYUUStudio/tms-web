/**
 * Created by medlog on 2016/7/8.
 */
//司机管理-注册成功提示点击是跳转编辑页面
var submitRegPromptDriverAdd = function () {
    $("#regPromptDriverAdd").dialog("close");
    addTabHref("司机编辑", "views/driver/edit/driverEdit.html")
};
