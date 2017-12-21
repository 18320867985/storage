

// 左边菜单高度
setMenuHeight() ;

$(window).resize(function(){
	setMenuHeight() ;
});

function setMenuHeight() {
	var w_big = $(window).height();
	var w_head = $(".head-logo").outerHeight();
	var w_ttl_1 = $(".admin-left .ttl-1").outerHeight();
	var w_footer = $(".footer").outerHeight();
	var ul_h = w_big - w_head - w_footer-w_ttl_1;
	$(".admin-left .box-big").height(ul_h);
}

$(".admin-left ul li").click(function(){
	$(".admin-left ul li").removeClass("active");
	$(this).addClass("active");
});
