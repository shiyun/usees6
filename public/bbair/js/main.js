$(function(){
 
	resize();
	$(window).resize(function(event) {
		resize();
	});
	 
	  

	 
    

});

/*main*/
//

/*call*/
//
function resize(){
	var ht=$(window).height();
	$(".flht").height(ht);
}


function GetDate(y, m, d) {
    var num1 = WeekDay(new Date(y + "/" + m + "/1").getDay()); //当前月1号坐标
    var str = "";
    var num2 = getDaysInMonth(y, m - 1);//上个月有几天
    var sum = 0; //统计条数
    for (var i = num1 ; i > 0; i--) {
        str += "<li class='disabled'><span>" + (num2 - i + 1) + "</span></li>";
        sum++;
    }
    var t = false;
    if (y == new Date().getFullYear() && m == new Date().getMonth() + 1) { t = true; } else t = false;
    for (var i = 1; i < getDaysInMonth(y, m) + 1; i++) {
        for (var c in d) {
            if (t && i == new Date().getDate()) { str += "<li onclick=\"GetDates(this)\" class='in on'><span class='on'>" + i + "</span></li>"; sum++; i++; }
            else if (i == d[c]) { str += "<li onclick=\"GetDates(this)\"><span class='on'>" + i + "</span></li>"; sum++; i++; }
        }
        if (t && i == new Date().getDate()) {
            str += "<li onclick=\"GetDates(this)\"  class='in on'><span>" + i + "</span></li>";
        }
        else {
            str += "<li onclick=\"GetDates(this)\"><span>" + i + "</span></li>";
        }
        sum++;
    }
    var col = Math.ceil(sum / 7) * 7;
    var len = parseInt(col) - sum;
    for (var i = 1; i <= len; i++) {
        str += "<li class='disabled'><span>" + i + "</span></li>";
    }
    $(".day ul").html("").append(str);

    $(".span_time").html(y + "." + m + "." + new Date().getDate() + WeekDay2(new Date().getDay()));

}
function GetDates(obj) {
    $(obj).parent("ul").find("li").removeClass("on");
    $(obj).addClass("on");
    $(".span_time").html($(".year").find("span").text() + "." + $(".month").find("span").text() + "." + $(obj).html() + WeekDay2(new Date($(".year").find("span").text() + "/" + $(".month").find("span").text() + "/" + $(obj).find("span").html()).getDay()));

    /*
    <section class="list"><section class="li-tit"><span>记录时间：13:50</span></section><section class="sec-num"><ul><li><div><span>PM2.5<label>43</label></span></div></li><li><div><span>PM2.5<label>78</label></span></div></li><li><div><span>PM10<label>128</label></span></div></li></ul><p class="p_tips"><span>轻微哮喘</span><span>咳嗽</span></p></section></section>
    */
    var str = "";

    if ($(obj).find("span").hasClass("on")) {
        str = '<section class="list"><section class="li-tit"><span>记录时间：13:50</span></section><section class="sec-num"><ul><li><div><span>PM2.5<label>43</label></span></div></li><li><div><span>PM2.5<label>78</label></span></div></li><li><div><span>PM10<label>128</label></span></div></li></ul><p class="p_tips"><span>轻微哮喘</span><span>咳嗽</span></p></section></section>';
    }
    else
    str = "<div class='div-tips'>当前没有健康记录</div>";
    $(".jk-list-cont").html("").append(str);


}
//判断一个月有多少天
function getDaysInMonth(year, month) {
    month = parseInt(month, 10);
    var temp = new Date(year, month, 0);;
    return temp.getDate();
}
//指定日期是星期几  找坐标
function WeekDay(day) {
    switch (day) {
        case 0: return 6;
        case 1: return 0;
        case 2: return 1;
        case 3: return 2;
        case 4: return 3;
        case 5: return 4;
        case 6: return 5;
    }
}
//指定日期是星期几  找星期
function WeekDay2(day) {
    switch (day) {
        case 0: return "星期日";
        case 1: return "星期一";
        case 2: return "星期二";
        case 3: return "星期三";
        case 4: return "星期四";
        case 5: return "星期五";
        case 6: return "星期六";
    }
}

