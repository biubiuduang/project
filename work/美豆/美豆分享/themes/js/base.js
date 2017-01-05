/**
 * Created by Jacky.Wang on 2016/12/1.
 */

/**
 * 一.全局参数 sd
 * 二.全局方法 base
 * 三.公共方法 sdFun
 * */
//一.全局参数
var sd = {
    u : navigator.userAgent,     //用户浏览器代理商
    ww : $(window).width(),     //用户窗口高度
    wh : $(window).height(),     //用户窗口高度
    st : 0,   //滚动条距离顶部的距离
    nTimer : null   //用户无操作的计时器
};
var browser = {
    versions: function () {
        return {//移动终端浏览器版本信息
            trident: sd.u.indexOf('Trident') > -1, //IE内核
            presto: sd.u.indexOf('Presto') > -1, //opera内核
            webKit: sd.u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: sd.u.indexOf('Gecko') > -1 && sd.u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!sd.u.match(/AppleWebKit.*Mobile.*/) || !!sd.u.match(/AppleWebKit/), //是否为移动终端
            ios: !!sd.u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: sd.u.indexOf('Android') > -1 || sd.u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: sd.u.indexOf('iPhone') > -1 || sd.u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: sd.u.indexOf('iPad') > -1, //是否iPad
            webApp: sd.u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }()
};
//二.全局方法
var base = {
    init : function(){
        var that = this;
        that.fontSizeRem();  //rem
        that.windowResize(); //浏览器大小改变

        //that.userUnclick(); //用户无操作 10秒后跳转下载地址;

        that.redPacketClick();//红包点击事件
        that.iconClick(); //上下icon点击事件
        that.J_shadeClick(); //弹窗点击事件

        that.gift();  //送礼物大幕演示
    },
    //屏幕改变大小的时候需要执行的js
    windowResize : function(){
        var that = this;
        $(window).resize(function(){
            sd.ww = $(window).width();
            sd.wh = $(window).height();
            that.fontSizeRem();
        });
    },
    //屏幕宽度小于 768px 长度单位使用rem , 1rem = 屏幕宽度/18;
    fontSizeRem : function(){
        if(sd.ww >=768){
            sd.ww = 768
        }
        var size = sd.ww/18;
        $("html").css("font-size",size);
    },
    //用户操作事件  1.无操作 2.点击红包  3.点击上下icon 4.主播状态事件
    showHide : function(){
        $(".shade").fadeToggle();
        $("#J_shade").fadeToggle().html("");
    },
    userUnclick : function(){
        if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad){
            sd.nTimer = setTimeout('window.location.href ="ios下载地址"',10000);
        }else{
            sd.nTimer = setTimeout('window.location.href ="android下载地址"',10000);
        }
    },
    redPacketClick : function(){
        var that = this;
        $(".red-packet-container").click(function(){
            clearTimeout(sd.nTimer);
            that.showHide();
            sdFun.includePage("#J_shade","redPacket.html");
        })
    },
    iconClick : function(){
        var that = this;

        $(".section-1,.section-6").children().click(function(){
            clearTimeout(sd.nTimer);
            that.showHide();
            sdFun.includePage("#J_shade","zbMore.html");
        })
    },
    zbUnload : function(){
        var that = this;
        clearTimeout(sd.nTimer);
        that.showHide();
        sdFun.includePage("#J_shade","zbUnload.html");
    },
    //弹窗操作  1.close  2.button
    J_shadeClick : function(){
        var that = this;
        $("#J_shade").delegate(".icon-close","click",function(){
            that.showHide();
            that.userUnclick();
        }).delegate(".button","click",function(){
            if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad){
                window.location.href ="ios下载地址";
            }else{
                window.location.href ="android下载地址";
            }
        });

    },

    //大幕礼物
    /**
     * listHtml 参数
     * num : 礼物数量
     * pic : 用户头像地址
     * userName : 用户名字
     * giftType : 礼物类型
     * giftPic : 礼物图片
     * */
    giftListHtml : function(num,pic,useName,giftType,giftPic){
        var list = '<div class="gift-list" data-num="'+ num +'">'+
                      '<div class="gift-host-head">'+
                         '<img src='+ pic +' alt="" />'+   //
                      '</div>'+
                      '<h2 class="gift-username">'+ useName +'</h2>'+
                      '<h2 class="gift-type">送出<span>'+ giftType +'</span></h2>'+
                      '<div class="gift-info">'+
                        '<img class="gift-pic" src='+ giftPic +' alt="">'+
                        '<span class="iconfont">&#xe605;</span>'+
                        '<img class="gift-sum" src="themes/img/'+ num +'.png" alt="">'+
                      '</div>'+
                    '</div>';
        return list;
    },
    gift : function(){
        var that = this;
        function rose(){
            $(".gift").prepend(that.giftListHtml(99,"themes/img/p-8.png","用户名","玫瑰","themes/img/rose.png"));
        }
        setTimeout(rose,1000);
    },
    //聊天框

    chattingListHtml : function(dataType){
        var list = null;
        var type = dataType;
        if(type == 1){

        }
    },
    chatting : function(){

    }

};



//三.公共方法 function

var sdFun = {}; //公共方法集合

/**
 * 1. include()
 * jQuery实现include方法
 * @param id 目标元素ID
 * @param path include文件路径
 */

sdFun.includePage = function( id, path ){
    $.get( path,function( data ){
        ( $( data ) ).appendTo( $( id ) );
    });
};

$(function(){
    sd.st = $(window).scrollTop();
    base.init();

    var video = document.getElementById("md-video");
    setTimeout(function(){
        video.play;
    },100);
});