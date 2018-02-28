/**admin**/
var admin = (function($) {

	var _init = function() {

		// 左边菜单高度
		setMenuHeight();

		$(window).resize(function() {
			setMenuHeight();
		});

		function setMenuHeight() {
			var w_big = $(window).height();
			var w_head = $(".head-logo").outerHeight();
			var w_ttl_1 = $(".admin-left .ttl-1").outerHeight();
			var w_footer = $(".footer").outerHeight();
			var ul_h = w_big - w_head - w_footer - w_ttl_1;
			$(".admin-left .box-big").height(ul_h); // ttl
			$(".admin-right .iframe-box").height(ul_h); // iframe-big

		}

		// 菜单选中的样式
		$(".admin-left .nemu-1>li").mouseenter(function(e) {
			e.preventDefault();
			e.stopPropagation();
			$(".admin-left .nemu-2").hide();
			$(".admin-left .nemu-1>li").removeClass("active");
			$(this).addClass("active");
			var _top = $(this).position().top; // 当前项的top
			//	alert(_top)
			var _nemu2 = $(this).find(".nemu-2");
			_nemu2.show();

			// setheight
			var w_big = $(window).height();
			var w_head = $(".head-logo").outerHeight();
			var w_ttl_1 = $(".admin-left .ttl-1").outerHeight();
			var w_footer = $(".footer").outerHeight();
			var ul_h = w_big - w_head - w_footer - w_ttl_1; //大框高度

			var menu2_h = _nemu2.outerHeight(); // 子菜单高度
			var _top2 = $(this).offset().top - w_head - w_ttl_1; // 当前项的top
			if((_top2 + menu2_h) > ul_h) {
				_nemu2.css({
					"top": _top - menu2_h + $(this).outerHeight()
				});

			} else {
				_nemu2.css({
					"top": _top
				});
			}

		});

		$(".admin-left .box-big ").mouseleave(function() {
			$(".admin-left .nemu-2").hide();
			$(".admin-left .nemu-1>li").removeClass("active");
		})

		// 菜单hover show  左右的按钮
		$(".admin-right .wrap-ttl  .ttl-1").mouseenter(function() {

			// 设置菜单wrap-ttl 包裹器width
			var wrap_w = $(".admin-right .wrap-ttl ").width();

			// 设置菜单wrap-ttl 包裹器width
			var wrap_ul = $(".admin-right .wrap-ttl ul ").width();

			if(wrap_ul > wrap_w) {
				$(".admin-right .warp-left-btn,.admin-right .warp-right-btn").show();
			}
		})

		$(".admin-right .wrap-ttl").mouseleave(function() {

			$(".admin-right .warp-left-btn,.admin-right .warp-right-btn").hide();

		});

		//菜单右btn移动
		var wrarp_right_btn_id = 0;
		$(".admin-right .warp-right-btn").hover(function() {

			// 设置菜单wrap-ttl 包裹器width
			var wrap_w =Number( $(".admin-right .wrap-ttl ").width());

			// 设置菜单wrap-ttl 包裹器width
			var wrap_ul =Number( $(".admin-right .wrap-ttl ul ").width());

			if(wrap_ul > wrap_w) {

				wrarp_right_btn_id=setInterval(function() {
				var slide_left = wrap_ul - wrap_w;
				var val =Number( $(".admin-right .wrap-ttl .ttl-1").position().left);
				val=Math.abs(val) ;
				
					if(val>=slide_left){
						clearInterval(wrarp_right_btn_id);
						$(".admin-right .wrap-ttl ul ").animate({
							"left":"-"+slide_left
						});
						
					}else{
						$(".admin-right .wrap-ttl ul ").animate({
							"left":"-="+100
						});
					}
					
//		
				}, 500);

			}
			
			

		}, function() {
			
			clearInterval(wrarp_right_btn_id);
		});
		
		//菜单做btn移动
		var wrarp_left_btn_id = 0;
		$(".admin-right .warp-left-btn").hover(function() {

			// 设置菜单wrap-ttl 包裹器width
			var wrap_w =Number( $(".admin-right .wrap-ttl ").width());

			// 设置菜单wrap-ttl 包裹器width
			var wrap_ul =Number( $(".admin-right .wrap-ttl ul ").width());

			if(wrap_ul > wrap_w) {

				wrarp_left_btn_id=setInterval(function() {
				var slide_left = wrap_ul - wrap_w;
				var val =Number( $(".admin-right .wrap-ttl .ttl-1").position().left);
				
					if(val>=0){
						clearInterval(wrarp_left_btn_id);
						$(".admin-right .wrap-ttl ul ").animate({
							"left":0
						});
					
					}else{
						$(".admin-right .wrap-ttl ul ").animate({
							"left":"+="+100
						});
					}
					
//		
				}, 500);

			}
			
			

		}, function() {
			
			clearInterval(wrarp_left_btn_id);
		});


		// 二级菜单
		$(".admin-left .nemu-2 li a").on("click", function(e) {
			e.preventDefault();
			$(".admin-left .nemu-2  li").removeClass("active");
			$(this).closest("li").addClass("active");
		});

		// 添加二级菜集合项 
		var srcLists = [];
		$(".admin-left .nemu-2 li a").on("click", function(e) {
			e.preventDefault();
			var _text = $(this).text();
			var _href = $(this).attr("href");

			// 最大的个数
			var _max_count = parseInt($(".admin-left .nemu-1").attr("data-maxcount"));
			_max_count = _max_count || 8;
			if(srcLists.length >= _max_count) {
				alert("最多能添加" + _max_count + "项");
				return;
			}

			// 检查是否有重复项
			if(checkCF(_href)) {

				return;

			}

			var obj = {};
			obj.text = _text;
			obj.href = _href;
			srcLists.push(obj);
			addmenu(srcLists.length - 1);

			// add iframe
			addIframe(obj);	
			 
		});
		
		
		// 设置菜单大与wrap时的位置
		function setMenuLeft(index){
		
			// 设置菜单wrap-ttl 包裹器width
			var wrap_w =Number( $(".admin-right .wrap-ttl ").width());

			// 设置菜单wrap-ttl 包裹器width
			var wrap_ul =0;//Number( $(".admin-right .wrap-ttl ul ").width());
			for(var i=0;i< $(".admin-right .wrap-ttl ul li").length;i++){
				 var el=$(".admin-right .wrap-ttl ul li").eq(i);
				//if(i<=index){
					var w=	el.outerWidth();
					wrap_ul+=Number(w);
					if(el.hasClass("active")){
						break;
					}
				//}
			}
			
		
			if(wrap_ul>=wrap_w){
			var _left=	wrap_ul-wrap_w
				$(".admin-right .wrap-ttl ul ").animate({
				"left":"-"+_left
				},400);
			}else{
				$(".admin-right .wrap-ttl ul ").animate({
				"left":0
				},400);
			}

		}

		// 删除 添加二级菜集合项 
		$(".admin-right .ttl-1 ").delegate(".close", "click", function() {

			var $this = $(this).parents("li");
			var _index = $(".admin-right .ttl-1 li").index($this);
			$this.remove();
			srcLists.splice(_index, 1);
			delIframe(_index);
			
			// 判断 是否有active	
			var has_len = $(".admin-right .ttl-1").has(".active");
			if(has_len.length == 0) {
				addmenu(0);
				showIframe(0);
			}
			
			// 设置菜单大与wrap时的位置
			 setMenuLeft(_index);
			return false;

		});

		// 点击 li 
		$(".admin-right .ttl-1 ").on("click", "li", function() {

			var $this = this;
			var _index = $(".admin-right .ttl-1 li").index(($this));
			addmenu(_index);
			showIframe(_index)
			return false;
		});

		// foreach
		function addmenu(index) {
			var $ul = $(".admin-right .ttl-1");
			//	<li>产品档案 <span class="close">&times;</span></li>
			$ul = $(".admin-right .ttl-1").empty();

			for(var i in srcLists) {

				var li = document.createElement("li");

				if(i == index) {
					$(li).addClass("active");
					//$(iframe).addClass("active");
				}
				var span = document.createElement("span");
				// span.classList.add("txt");  // ie9
				$(span).addClass("txt");
				span.innerText = srcLists[i].text;
				var span2 = document.createElement("span");
				// span2.classList.add("close"); // ie9
				$(span2).addClass("close");
				span2.innerHTML = "&times;";
				li.appendChild(span);
				li.appendChild(span2);
				$ul.append(li);

				// iframe item
				//$iframe_big.append(iframe);

			}
			
			// 设置菜单大与wrap时的位置
			 setMenuLeft(index);
		}

		// 检查重复项
		function checkCF(href) {

			for(var i in srcLists) {
				if(srcLists[i].href == href) {
					addmenu(i);
					showIframe(i);
					return true;
				}
			}

			return false;
		}

		function addIframe(obj) {
			$(".admin-right .iframe-big .iframe-box").removeClass("active");

			$iframe_big = $(".admin-right .iframe-big");
			var iframe = document.createElement("iframe");
			$(iframe).addClass("iframe-box");
			$(iframe).attr("src", obj.href);
			$iframe_big.append(iframe);
			$(iframe).addClass("active");

			setMenuHeight();
		}

		function delIframe(index) {

			$(".admin-right .iframe-big .iframe-box").eq(index).remove();

		}

		function showIframe(index) {

			$(".admin-right .iframe-big .iframe-box").removeClass("active");
			$(".admin-right .iframe-big .iframe-box").eq(index).addClass("active");

		}

	}

	// 刷新子页面
	$(".admin-right").find(".btn-refresh").on("click", function() {

		try {
			var $el = $(".admin-right  .iframe-box.active");
			if($el.length > 0) {
				$(".admin-right  .iframe-box.active")[0].contentWindow.location.reload();
			}
		} catch(e) {
			//TODO handle the exception
		}

		$(this).blur();
	});

	// 第一次显示页面
	function _showIframeActive() {

		$(".box-big .nemu-2 li.active a").trigger("click");
	}

	return {
		init: _init,
		showIframeActive: _showIframeActive
	}

})(window.jQuery);