/**
 * Created by xuezhiyu on 16/5/24.
 */


demoCreatePrinterList();

function demoCreatePrinterList(){
    CLODOP.Create_Printer_List(document.getElementById('Select01'));
    demoCreatePagSizeList();
}

function demoCreatePagSizeList(){
    var oSelect=document.getElementById('Select02');
    var iPrintIndex=document.getElementById("Select01").value;
    CLODOP.Create_PageSize_List(oSelect,iPrintIndex);
}

function demoSetClodopJS(strSrc){
    $("script[src*='CLodopfuncs']").remove();
    var oscript=document.createElement("script");
    oscript.src=strSrc;
    var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    head.insertBefore(oscript,head.firstChild);
    $.getScript(strSrc,function(response,status){
        if(status == 'success'){
            demoCreatePrinterList();
        }
    });
}

function prn1_preview() {
    CreateOneFormPage();
    LODOP.PREVIEW();
}
function prn1_print() {
    CreateOneFormPage();
    LODOP.PRINT();
}
function prn1_design() {
    LODOP.PRINT_INIT("表单设计功能_表单一");
    LODOP.ADD_PRINT_HTM(88,200,350,600,document.getElementById("form1").innerHTML);
    LODOP.PRINT_DESIGN();
}
function prn1_printA() {
    CreateOneFormPage();
    LODOP.PRINTA();
}
function CreateOneFormPage(){
    LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_表单一");
    LODOP.SET_PRINT_STYLE("FontSize",18);
    LODOP.SET_PRINT_STYLE("Bold",1);
    LODOP.ADD_PRINT_TEXT(50,231,260,39,"打印页面部分内容");
    LODOP.ADD_PRINT_HTM(88,200,350,600,document.getElementById("form1").innerHTML);
}
function prn2_preview() {
    LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_表单二");
    LODOP.ADD_PRINT_HTM(87,355,285,187,document.getElementById("form2").innerHTML);
    LODOP.PREVIEW();
}
function prn2_manage() {
    CreateTwoFormPage();
    LODOP.PRINT_SETUP();
}
function CreateTwoFormPage(){
    LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_表单二");
    LODOP.ADD_PRINT_RECT(70,27,634,242,0,1);
    LODOP.ADD_PRINT_TEXT(29,236,279,38,"页面内容改变布局打印");
    LODOP.SET_PRINT_STYLEA(2,"FontSize",18);
    LODOP.SET_PRINT_STYLEA(2,"Bold",1);
    LODOP.ADD_PRINT_HTM(88,40,321,185,document.getElementById("form1").innerHTML);
    LODOP.ADD_PRINT_HTM(87,355,285,187,document.getElementById("form2").innerHTML);
    LODOP.ADD_PRINT_TEXT(319,58,500,30,"注：其中《表单一》按显示大小，《表单二》在程序控制宽度(285px)内自适应调整");
}
function prn3_preview(){
    LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_全页");
    LODOP.ADD_PRINT_HTM(0,0,"100%","100%",document.documentElement.innerHTML);
    LODOP.PREVIEW();
}

var demoPrint = function(isView){
    LODOP.PRINT_INIT("打印控件功能演示");
    LODOP.ADD_PRINT_HTM(88,40,321,185,document.getElementById("form1").innerHTML);
    LODOP.ADD_PRINT_HTM(87,355,285,187,document.getElementById("form2").innerHTML);
    if(isView){
        LODOP.PREVIEW();
    }else{
        LODOP.PRINT();
    }
}
