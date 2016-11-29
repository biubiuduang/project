/**
 * Created by Jacky.Wang on 2016/10/8.
 */
$(function(){

});

/****************************/
/******* 公共方法集合 *******/
/****************************/
var pm = {};
/*========================
  pm.include()
  jQuery实现include方法
  @param id 目标元素ID
  @param path include文件路径
 ==========================*/
pm.includePage = function( id, path ){
    $.get( path,function( data ){
        ( $( data ) ).appendTo( $( id ));
    });
};
