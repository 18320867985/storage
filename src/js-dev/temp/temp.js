/*
 *	公共类库
*/

common = function ($) {

	/***url对象***/
	var url_fn = {
		//采用正则表达式获取地址栏参数：（ 强烈推荐，既实用又方便！）
		GetQueryString: function GetQueryString(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]);return null;
		},

		//从WebAPI获取日期json数据 转换成日期时间戳
		jsonToDate: function jsonToDate(apidate) {
			var txts = apidate.replace("/Date(", "").replace(")/", "");
			return parseInt(txts.trim());
		},

		// 取当前页面名称(不带后缀名)
		getPageName: function getPageName() {
			var a = location.href;
			var b = a.split("/");
			var c = b.slice(b.length - 1, b.length).toString(String).split(".");
			return c.slice(0, 1);
		},

		//取当前页面名称(带后缀名)
		getPageNameExention: function getPageNameExention() {
			var strUrl = location.href;
			var arrUrl = strUrl.split("/");
			var strPage = arrUrl[arrUrl.length - 1];
			return strPage;
		}

		/**
   * 延迟加载
   *  * <img class="load-lazy"
   * 	src="images/Home/lazy.jpg"
   * alt="新品上市图片"
   * data-src="images/Home/板块图片1.png"
   * > 
   * */
		// 延迟加载
	};var jqlazy_fn = function jqlazy_fn() {

		var window_h = $(window).height();

		$(window).scroll(function () {

			setTimeout(function () {

				$(".load-lazy").each(function () {

					var img_h = parseInt($(this).offset().top) - parseInt(window_h);
					var img_h2 = parseInt($(this).offset().top) + $(this).height();
					if ($(document).scrollTop() >= img_h && $(document).scrollTop() < img_h2) {

						$(this).attr("src", $(this).attr("data-src"));

						/*ie8 不支持
       * .animate({
      "opacity":0.2
      }).animate({
      "opacity": 1
      }, 500);
      
      * */
					}
				});
			}, 100);
		});
	};

	/*返回对象*/
	return {

		url: url_fn,
		lazy: {
			jqlazy: jqlazy_fn
		}

	};
}(window.jQuery || window.Zepto);
/*
 * 默认js
 * 添加 class="bs-date " 
	<input type="text" class="form-control bs-date " value="" placeholder="订单开始时间" />
 * 
 */

var bsDate = function ($) {

	var _init = function _init() {
		// bs 日历插件
		$('.bs-date').datetimepicker({

			format: "yyyy-mm-dd  ", //'yyyy-mm-dd hh:ii:ss'
			showMeridian: true,
			autoclose: true,
			todayBtn: true,
			minView: 3 //选择日期
			//forceParse :true  //转换格式

		});

		//日期不准输入
		$('.bs-date').focus(function () {

			$(this).blur();
		});
	};

	return {
		init: _init
	};
}(window.jQuery);
/**
 * iframe
 * **/

var iframe = function ($) {

	// 设置iframe 高度
	var _setHeight = function _setHeight() {
		var windows_h = $(document).height() + 50;
		$(window.parent.document).find(".parent-window").css("height", windows_h);
	};

	return {
		setHeight: _setHeight
	};
}(window.jQuery || window.Zepto);

/*
					 滚动监听
					 <body data-spy="spy" data-target="#scroll_ttl">
						 
						 <aside id="scroll_ttl">

							<ul>
								<li class="active">
									<a href="#banner_1">1</a>
								</li>
								<li>
									<a href="#banner_2">2</a>
								</li>
								<li>
									<a href="#banner_3">3</a>
								</li>
							</ul>

						</aside>
					 </body>
				 */

var scroll = function ($) {

	var obj = {

		init: function init(top) {

			var _top = Number(top);
			_top = isNaN(_top) ? 0 : _top;

			this.offsetTop = _top;
			this.bindEvent(this.offsetTop);
			this.onLoad();
			this.onReset();
		},

		offsetTop: 0,

		setOffsetTop: function setOffsetTop(top) {
			this.offsetTop = typeof top === "number" ? top : 0;
		},

		onReset: function onReset() {

			$(window).resize(function () {
				this.scrollList();
				this.scroll(this.offsetTop);
			}.bind(this));
		},
		onLoad: function onLoad() {

			$(window).load(function () {
				this.scrollList();
				this.scroll(this.offsetTop);
			}.bind(this));
		},

		selector: function selector() {
			var _tagget = $("[data-spy=spy]").attr("data-target");
			return $(_tagget);
		},

		bindEvent: function bindEvent(top) {

			var p = this.selector();
			this.selector().find(" ul li  a").click(function () {

				// animation
				var $this = $(this);
				var _top = Math.floor($($this.attr("href")).offset().top) - parseInt(top);
				$("body,html").stop().animate({
					scrollTop: _top
				}, 500);
			});
		},

		scroll: function scroll(top) {

			var ff = this.getScrollList;
			var p = this.selector();
			$(window).on("scroll", function () {

				var arrs = ff || [];

				arrs.forEach(function (item) {

					var m1 = parseInt(item.top); //- parseInt(top);
					var m2 = parseInt(item.maxTop); //- parseInt(top);
					if ($(window).scrollTop() >= m1 && $(window).scrollTop() < m2) {
						//alert(item.selector)
						p.find("ul li").removeClass("active");
						$("[href=" + item.selector + "]").parent().addClass("active");
						return false;
					}
				});
			});
		},

		scrollList: function scrollList() {

			var objs = [];

			var _offsetTop = this.offsetTop;
			var els = this.selector().find("li");
			for (var i = 0; i < els.length; i++) {

				var _el = $(els[i]).find("a").attr("href");

				if (_el) {

					var obj = {};
					var _top = Math.floor($(_el).offset().top) - _offsetTop;

					var maxTop = 0;
					if (i < els.length - 1) {
						var _el2 = $(els[i + 1]).find("a").attr("href");
						maxTop = Math.floor($(_el2).offset().top) - _offsetTop;
					} else {
						maxTop = Math.floor($(document).height());
					}

					obj.selector = _el;
					obj.top = _top;
					obj.maxTop = maxTop;
					objs.push(obj);
				}
			}

			return this.getScrollList = objs;
		},

		getScrollList: []

	};

	return {
		init: function init(top) {
			obj.init(top);
		},
		setOffsetTop: function setOffsetTop(top) {
			obj.setOffsetTop(top);
		}
	};
}(window.jQuery || window.Zepto);

/*单个按钮组件
 * 
 * 
 * 
 * <ul>
 * 	<li class="comp-btn"> 
 * 		<a class="comp-btn-item">技术牛逼</a>
 * 	</li>
 * 	<li class="comp-btn"> 
 * 		<a class="comp-btn-item">信息大师</a>
 * 	</li>
 * </ul>
 * 
 * 		
 * 
 * 选中点击事件
		$(".comp-btn").on("comp_btn_select",function(event,element){			
			
			// element 当前点击的元素
			alert($(element));
		});
		
		// 取消点击事件
		$(".comp-btn").on("comp_btn_unselect",function(event,element){			
			
			// element 当前点击的元素
			alert($(element));
		});
 * 
 * */

+function ($) {

	$(".comp-btn-item").on("click", function () {

		if (typeof $(this).attr("data-bl") === "undefined") {
			$(this).addClass("active");
			$(this).attr("data-bl", "true");

			//点击触发自定义事件
			$(this).trigger("comp_btn_select", [this]);
		} else {
			//点击触发自定义事件
			$(this).trigger("comp_btn_unselect", [this]);
			$(this).removeClass("active");
			$(this).removeAttr("data-bl");
		}
	});
}(window.jQuery || window.Zepto);
/*****单选按钮组件**
 * 
 * 
 * <div class="comp-radio">             
   <div class="comp-radio-item active">盆</div>
   <div class="comp-radio-item">箱</div>
   <div class="comp-radio-item">斤</div>
   <div class="comp-radio-item">米</div>
   </div>
 * 
 * 
 * ****/

+function ($) {

	$(".comp-radio-item").on("tap", function () {
		var p = $(this).parents(".comp-radio");
		$(".comp-radio-item", p).removeClass("active");
		$(this).addClass("active");

		//点击触发自定义事件
		$(this).trigger("radio_click", [this]);
	});
}(window.jQuery || window.Zepto);

/*
  
<div class="number" >
    <button class="plus btn" type="button">+</button>
  <input class="num" type="number" value="1"data-min="0" data-max="9999" data-step="1" />
   <button class="minus btn" type="button">-</button>
  
 </div>

 * 数字框组件start
 * 事件：number_click
 *
 * 点击事件
	$(".number").on("number_click",function(event,element){			
		//element 当前点击的元素	
		var p=$(element).parents(".number");
		alert($(p).find(".num").val());
							
	});
 * */

+function ($) {

	//minus
	$(".minus").on("click", function (e) {
		e.stopPropagation();
		e.preventDefault();

		var p = $(this).parents(".number");

		//步长
		var step = Number($(".num", p).attr("data-step"));
		step = window.isNaN(step) ? 1 : step;

		//最大值
		//			var max=Number($(".num",p).attr("data-max"));
		//				max=window.isNaN(max)?9999:max;
		//最小值
		var min = Number($(".num", p).attr("data-min"));
		min = window.isNaN(min) ? 0 : min;

		var v = Number($(".num", p).val());
		v = window.isNaN(v) ? min : v;

		//计算
		v = v > min ? v - step : min;

		if (v <= min) {
			v = min;
		}

		$(".num", p).val(v);

		//点击触发自定义事件
		$(this).trigger("number_click", [this]);
	});

	//plus
	$(".plus").on("click", function (e) {
		e.stopPropagation();
		e.preventDefault();
		var p = $(this).parents(".number");

		//步长
		var step = Number($(".num", p).attr("data-step"));
		step = window.isNaN(step) ? 1 : step;

		//最大值
		var max = Number($(".num", p).attr("data-max"));
		max = window.isNaN(max) ? 9999 : max;
		//最小值
		var min = Number($(".num", p).attr("data-min"));
		min = window.isNaN(min) ? 0 : min;

		var v = Number($(".num", p).val());
		v = window.isNaN(v) ? min : v;

		//计算
		v = v < max ? v + step : max;

		if (v >= max) {
			v = max;
		}

		$(".num", p).val(v);
		//点击触发自定义事件
		$(this).trigger("number_click", [this]);
	});
}(window.jQuery || window.Zepto);

/*****数字框组件end******/
/*
 * 标签选项卡
 * 
 * <div class="tab-big">
 * 
	 <div class="tab-ttl">
         <a class="tab-item active" data-target="#form_a">
                            塑胶原料
             </a>
           <a class="tab-item"  data-target="#form_b">
                            改性塑料
            </a>
          <a class=" tab-item"  data-target="#form_c">
                            环保再生
            </a>
            <a class="tab-item"  data-target="#form_d">
                            塑料助剂
         </a>

    </div>
      
     <div class="fabu-form tab-content ">
                
           <!--塑胶原料-->
           <div class="form tab-content-item active" id="form_a">-塑胶原料</div>
              <!--塑胶原料2-->
           <div class="form tab-content-item " id="form_b">-塑胶原料2</div>
              <!--塑胶原料3-->
           <div class="form tab-content-item " id="form_c">-塑胶原料3</div>
              <!--塑胶原料4-->
           <div class="form tab-content-item " id="form_d">-塑胶原料4</div>
 *          
 *    </div>
 * 
 * </div>
 * 
 * 
 * 		//点击事件
		$(".tab-item").on("tab_select",function(event,element){			
			//element 当前点击的元素	
			
		});
 * 
 * */

+function ($) {

  // 选项卡tag-box click 新的
  $(".tab-big .tab-ttl .tab-item").on("click", function (e) {

    e.preventDefault();
    var p = $(this).parents(".tab-big");
    p.find(".tab-ttl .tab-item").removeClass("active");
    $(this).addClass("active");

    var target = $(this).attr("data-target");
    $(".tab-content", p).find(".tab-content-item").removeClass("active");
    $(".tab-content", p).find(target).addClass("active");

    // 点击触发自定义事件 
    $(this).trigger("tab_select");
  });

  // 选项卡tag-box tap 新的
  $(".tab-big .tab-ttl .tab-item").on("tap", function (e) {

    e.preventDefault();
    var p = $(this).parents(".tab-big");
    p.find(".tab-ttl .tab-item").removeClass("active");
    $(this).addClass("active");

    var target = $(this).attr("data-target");
    $(".tab-content", p).find(".tab-content-item").removeClass("active");
    $(".tab-content", p).find(target).addClass("active");

    // 点击触发自定义事件 
    $(this).trigger("tab_select");
  });
}(window.jQuery || window.Zepto);
/**
 * 
 * 缩略图
 * 
 * <div class=" clearfix  thumbnail-slider">
		<!--btn-->
		<div class="pull-left   ">
			<span class="glyphicon glyphicon-menu-left  thumbnail-btn-l"></span>
		</div>
		<div class=" pull-left thumbnail-content ">

			<div class="thumbnail-allitems">

				<ul class=" thumbnail-item">
					<li class="clearfix">
						<a href="javascript:">
							<img src="images/youhui-1.png" alt="优选好货 图片 160*160" />
							<div class="caption">
								<p>
									Nutrilon诺优能 幼儿配方奶粉 3段 12-36月个月800克/罐
								</p>

								<div class="price">
									<span class=" iconfont  renminbi "></span>
									<span>150</span>
								</div>
							</div>
						</a>
					</li>

				</ul>
	
			</div>
			
			<div class="thumbnail-num">
				<span class="l">1</span>
				<span>/</span>
				<span class="r">4</span>
				
			</div>

		</div>
		<div class="pull-left">
			<span class="glyphicon glyphicon-menu-right thumbnail-btn-r"></span>
		</div>
	</div>

 * **/

+function ($) {

	//
	//	$.fn.thumbnail=function(){
	//			
	//			var $content= $(this).find(".thumbnail-content");
	//			var $allitems= $(this).find(".thumbnail-allitems");
	//			var $btn_l= $(this).find(".thumbnail-btn-l");
	//			var $btn_r= $(this).find(".thumbnail-btn-r");
	//			var $item= $(this).find(".thumbnail-item");
	//			var $num= $(this).find(".thumbnail-num");
	//			var $num_r=$num.find(".r");
	//			var $num_l=$num.find(".l");
	//			
	//		
	//			var size= parseInt($item.length);
	//			var width= parseInt($item.outerWidth(true));
	//			var index=0;
	//			$num_r.text(size);
	//			$num_l.text(1);
	//			
	//			// 设置width
	//			$allitems.width(size*width);
	//				
	//			 $btn_r.click(function(){
	//			 	index=index>=0&&index<size-1?++index:size-1;
	//			 	
	//			 	$allitems.animate({left:-index*width},400)
	//			 	$num_l.text(index+1);
	//			 })
	//			 
	//			  $btn_l.click(function(){
	//			 	index=index>0&&index<size?--index:0;
	//			 	$num_l.text(index+1);
	//			 	$allitems.animate({left:-index*width},400)
	//			 	
	//			 })
	//				
	//			return this;
	//			
	//			
	//		}
	//		
	//	
	//	


	$(".thumbnail-slider").each(function () {

		var $content = $(this).find(".thumbnail-content");
		var $allitems = $(this).find(".thumbnail-allitems");
		var $btn_l = $(this).find(".thumbnail-btn-l");
		var $btn_r = $(this).find(".thumbnail-btn-r");
		var $item = $(this).find(".thumbnail-item");
		var $num = $(this).find(".thumbnail-num");
		var $num_r = $num.find(".r");
		var $num_l = $num.find(".l");

		var size = parseInt($item.length);
		var width = parseInt($item.outerWidth(true));
		var index = 0;
		$num_r.text(size);
		var curIndex = size <= 0 ? 0 : 1;
		$num_l.text(curIndex);
		if (size <= 0) {
			$num.hide();
			$btn_l.hide();
			$btn_r.hide();
		}
		// 设置width
		$allitems.width(size * width);

		$btn_r.click(function () {
			index = index >= 0 && index < size - 1 ? ++index : size - 1;

			$allitems.animate({ left: -index * width }, 400);
			$num_l.text(index + 1);
		});

		$btn_l.click(function () {
			index = index > 0 && index < size ? --index : 0;
			$num_l.text(index + 1);
			$allitems.animate({ left: -index * width }, 400);
		});
	});
}(window.jQuery || window.Zepto);
/**admin**/
var admin = function ($) {

	var _init = function _init() {

		// 左边菜单高度
		setMenuHeight();

		$(window).resize(function () {
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
		$(".admin-left .nemu-1>li").mouseenter(function (e) {
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
			if (_top2 + menu2_h > ul_h) {
				_nemu2.css({
					"top": _top - menu2_h + $(this).outerHeight()
				});
			} else {
				_nemu2.css({
					"top": _top
				});
			}
		});

		$(".admin-left .box-big ").mouseleave(function () {
			$(".admin-left .nemu-2").hide();
			$(".admin-left .nemu-1>li").removeClass("active");
		});

		// 二级菜单
		$(".admin-left .nemu-2 li a").on("click", function (e) {
			e.preventDefault();
			$(".admin-left .nemu-2  li").removeClass("active");
			$(this).closest("li").addClass("active");
		});

		// 添加二级菜集合项 
		var srcLists = [];
		$(".admin-left .nemu-2 li a").on("click", function (e) {
			e.preventDefault();
			var _text = $(this).text();
			var _href = $(this).attr("href");

			// 最大的个数
			var _max_count = parseInt($(".admin-left .nemu-1").attr("data-maxcount"));
			_max_count = _max_count || 8;
			if (srcLists.length >= _max_count) {
				alert("最多能添加" + _max_count + "项");
				return;
			}

			// 检查是否有重复项
			if (checkCF(_href)) {

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

		// 删除 添加二级菜集合项 
		$(".admin-right .ttl-1 ").delegate(".close", "click", function () {

			var $this = $(this).parents("li");
			var _index = $(".admin-right .ttl-1 li").index($this);
			$this.remove();
			srcLists.splice(_index, 1);
			delIframe(_index);

			// 判断 是否有active	
			var has_len = $(".admin-right .ttl-1").has(".active");
			if (has_len.length == 0) {
				addmenu(0);
				showIframe(0);
			}
			return false;
		});

		// 点击 li 
		$(".admin-right .ttl-1 ").on("click", "li", function () {

			var $this = this;
			var _index = $(".admin-right .ttl-1 li").index($this);
			addmenu(_index);
			showIframe(_index);
			return false;
		});

		// foreach
		function addmenu(index) {
			var $ul = $(".admin-right .ttl-1");
			//	<li>产品档案 <span class="close">&times;</span></li>
			$ul = $(".admin-right .ttl-1").empty();

			for (var i in srcLists) {

				var li = document.createElement("li");

				if (i == index) {
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
		}

		// 检查重复项
		function checkCF(href) {

			for (var i in srcLists) {
				if (srcLists[i].href == href) {
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
	};

	// 刷新子页面
	$(".admin-right").find(".btn-refresh").on("click", function () {

		$(".admin-right  .iframe-box.active")[0].contentWindow.location.reload();
		$(this).blur();
	});

	$("[data-toggle=tooltip]").tooltip();

	function _showIframeActive() {

		$(".box-big .nemu-2 li.active a").trigger("click"); // 第一次显示页面
	}

	return {
		init: _init,
		showIframeActive: _showIframeActive
	};
}(window.jQuery);
///**admin**/
//var admin2 = (function($) {
//
//
//	var _init = function() {
//
//		// 左边菜单高度
//		setMenuHeight();
//
//		$(window).resize(function() {
//			setMenuHeight();
//		});
//
//		function setMenuHeight() {
//			var w_big = $(window).height();
//			var w_head = $(".head-logo").outerHeight();
//			var w_ttl_1 = $(".admin-left .ttl-1").outerHeight();
//			var w_footer = $(".footer").outerHeight();
//			var ul_h = w_big - w_head - w_footer - w_ttl_1;
//			$(".admin-left .box-big").height(ul_h);     // ttl
//			$(".admin-right .iframe-box").height(ul_h); // iframe-big
//			
//
//		}
//
//		// 菜单选中的样式
//		$(".admin-left .nemu-1>li").mouseenter(function(e) {
//			e.preventDefault();
//			e.stopPropagation();
//			$(".admin-left .nemu-2").hide();
//			$(".admin-left .nemu-1>li").removeClass("active");
//			$(this).addClass("active");
//			var _top = $(this).position().top; // 当前项的top
//			//	alert(_top)
//			var _nemu2 = $(this).find(".nemu-2");
//			_nemu2.show();
//
//			// setheight
//			var w_big = $(window).height();
//			var w_head = $(".head-logo").outerHeight();
//			var w_ttl_1 = $(".admin-left .ttl-1").outerHeight();
//			var w_footer = $(".footer").outerHeight();
//			var ul_h = w_big - w_head - w_footer - w_ttl_1; //大框高度
//
//			var menu2_h = _nemu2.outerHeight(); // 子菜单高度
//			var _top2 = $(this).offset().top - w_head - w_ttl_1; // 当前项的top
//			if((_top2 + menu2_h) > ul_h) {
//				_nemu2.css({
//					"top": _top - menu2_h + $(this).outerHeight()
//				});
//
//			} else {
//				_nemu2.css({
//					"top": _top
//				});
//			}
//
//		});
//
//		$(".admin-left .box-big ").mouseleave(function() {
//			$(".admin-left .nemu-2").hide();
//			$(".admin-left .nemu-1>li").removeClass("active");
//		})
//
//		// 二级菜单
//		$(".admin-left .nemu-2 li a").on("click", function(e) {
//			e.preventDefault();
//			$(".admin-left .nemu-2  li").removeClass("active");
//			$(this).closest("li").addClass("active");
//		});
//
//		// 添加二级菜集合项 
//		var srcLists = [];
//		$(".admin-left .nemu-2 li a").on("click", function(e) {
//			e.preventDefault();
//			var _text = $(this).text();
//			var _href = $(this).attr("href");
//
//			// 最大的个数
//			var _max_count = parseInt($(".admin-left .nemu-1").attr("data-maxcount"));
//			_max_count = _max_count || 8;
//			if(srcLists.length >= _max_count) {
//				alert("最多能添加" + _max_count + "项");
//				return;
//			}
//
//			// 检查是否有重复项
//			if(checkCF(_href)) {
//
//				return;
//
//			}
//
//			var obj = {};
//			obj.text = _text;
//			obj.href = _href;
//			srcLists.push(obj);
//			addmenu(srcLists.length - 1);
//		});
//
//		// 删除 添加二级菜集合项 
//		$(".admin-right .ttl-1 ").delegate(".close", "click", function() {
//
//			var $this = $(this).parents("li");
//			var _index = $(".admin-right .ttl-1 li").index($this);
//			$this.remove();
//			srcLists.splice(_index, 1);
//
//			// 判断 是否有active	
//			var has_len = $(".admin-right .ttl-1").has(".active");
//			if(has_len.length == 0) {
//				addmenu(0);
//			}
//			return false;
//
//		});
//
//		// 点击 li 
//		$(".admin-right .ttl-1 ").on("click", "li", function() {
//
//			var $this = this;
//			var _index = $(".admin-right .ttl-1 li").index(($this));
//			addmenu(_index);
//			return false;
//		});
//
//		// foreach
//		function addmenu(index) {
//			var $ul = $(".admin-right .ttl-1");
//			//	<li>产品档案 <span class="close">&times;</span></li>
//			$ul = $(".admin-right .ttl-1").empty();
//			$iframe_big = $(".admin-right .iframe-big").empty();
//			for(var i in srcLists) {
//
//				var li = document.createElement("li");
//				var iframe = document.createElement("iframe");
//				$(iframe).addClass("iframe-box");
//				$(iframe).attr("src",srcLists[i].href)
//				if(i == index) {
//					$(li).addClass("active");
//					$(iframe).addClass("active");
//				}
//				var span = document.createElement("span");
//				// span.classList.add("txt");  // ie9
//				$(span).addClass("txt");
//				span.innerText = srcLists[i].text;
//				var span2 = document.createElement("span");
//				// span2.classList.add("close"); // ie9
//				$(span2).addClass("close");
//				span2.innerHTML = "&times;";
//				li.appendChild(span);
//				li.appendChild(span2);
//				$ul.append(li);
//				
//				// iframe item
//				$iframe_big.append(iframe);
//				
//			}
//			
//			setMenuHeight();
//		}
//
//		// 检查重复项
//		function checkCF(href) {
//
//			for(var i in srcLists) {
//				if(srcLists[i].href == href) {
//					addmenu(i);
//					return true;
//				}
//			}
//
//			return false;
//		}
//
//	}
//
//	return {
//		init: _init
//	}
//
//})(window.jQuery);
var system = function ($) {

	var _check = function _check() {

		// 全选
		$(".ck-all").on("ifChecked", function () {

			$p = $(this).parents(".table");
			$(".list-item input[type=checkbox]", $p).iCheck('check'); //— 将输入框的状态设置为checked
		});

		// 取消全选
		$(".ck-all").on("ifUnchecked", function () {

			$(".list-item input[type=checkbox]", $p).iCheck('uncheck'); //— 将输入框的状态设置为checked
		});
	};

	return {
		check: _check
	};
}(window.jQuery);