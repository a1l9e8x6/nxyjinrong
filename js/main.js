/*
 * 自己的JS脚步
 * @Author: iceStone
 * @Date:   2015-12-12 10:59:26
 * @Last Modified by:   iceStone
 * @Last Modified time: 2015-12-13 15:19:19
 */

'use strict';

$(function (){
    //judge 大小屏
    var isSmall = $(window).width() < 768 ? true : false;
    //轮播图响应式 和 tab栏滚动条(最好写到resize里,偷懒的话可以不写)
    function resize_() {
        $("#main_ad > .carousel-inner > .item").each(function (i,ele) {
            var target_img = isSmall ? $(ele).data("img-xs") : $(ele).data("img-lg");
            $(ele).css("backgroundImage","url("+ target_img +")");
            if(isSmall){//小屏用小图(增加img标签 且需要添加width 100%)
                $(ele).css("backgroundImage","");
                $(ele).html("<img src='"+target_img+"'/>");
                $(ele).children("img").css("width","100%");
            }else{
                $(ele).css("backgroundImage","url("+ target_img +")");
                $(ele).empty();//大屏把img 干掉
            }
        });
    }
    $(window).on("resize",resize_).trigger("resize");
    // 初始化tooltips插件
    $("[data-toggle='tooltip']").tooltip();
    // 记录下原始的ul的宽度; 用于resize的时候还原;不过也可以不写,用户一般不会去拉窗口
    // var org_ul_width = $(".nav-tabs").width();

    //tab栏横向滚动
    var $ulTabs = $(".nav-tabs");
    var ul_width = 30; //因为 ul 有个 padding-left :20 ; 但是本身li 的之前还有间隙,所以多加一点
    $ulTabs.children().each(function (index,ele) {
        ul_width += $(ele).width();
    });

    // ul超过屏幕宽,则显示横向滚动条
    if(ul_width > $(window).width()) {
        $ulTabs.css("width", ul_width);
        $ulTabs.parent().css("overflow-x","scroll");
    }

    //选择不同的新闻模块
    var $news_title = $(".news-title");
    $("#news .nav-pills li").children().on("click",function () {
        var mtitle = $(this).data("title");
        $news_title.text(mtitle);
    })

    // 移动端轮播图左右滑动
    var startX = 0;
    var endX = 0;
    var offsetX = 50;
    // 判断页面上所有的轮播图;都添加滑动的事件
    $(".carousel").on("touchstart",function (e) {
        // 左上角0 0 点,记录初始的触摸坐标
        startX = e.originalEvent.touches[0].clientX;
         // console.log(e.originalEvent.touches[0].clientX);
    }).on("touchmove",function (e) {
        endX = e.originalEvent.touches[0].clientX;
        // console.log(e.originalEvent.touches[0].clientX);
    }).on("touchend",function (e) {
        if(endX - startX > offsetX){
            // 当前的轮播图move
            $(this).carousel("prev");
        }else if(endX - startX < -offsetX){
            $(this).carousel("next");
        }
    })





});