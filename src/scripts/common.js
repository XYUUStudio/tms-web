/**
 * Created by medlog-dev-2 on 2016/6/29.
 */
//时间格式转换
Date.prototype.format = function(format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}
// 日期控件
// prototype.getdata=function (dataid,datevalue) {
//     return(
//         datevalue=new Date().format('yyyy-MM-dd hh:ss'),
//         $('#dataid').datetimebox({
//             required: false,
//             showSeconds: false,
//             value: 'datevalue',
//             disabled:false,
//             // onSelect:function () {
//             //     //选中时间函数
//             //     console.log($('#operationDate').datetimebox('spinner'))
//             //     var time=$('#operationDate').datetimebox('spinner').spinner('getValue');
//             //     $('#operationDate').datetimebox('setText',time);
//             //     $('#operationDate').datetimebox('hidePanel');
//             // }
//         })
//     )
// }
//下拉样式

