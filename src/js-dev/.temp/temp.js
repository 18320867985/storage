var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 *	公共类库
*/

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d H:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.format = function (fmt) {
	//author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"H+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	}return fmt;
};

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
			var txts = apidate.replace("/Date(", "").replace(")/");
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

	//三联地址选择
	var _selectAddr = function selectAddr(selector) {
		mui.init();

		// 级联示例

		var _getParam = function _getParam(obj, param) {
			return obj[param] || '';
		};
		var cityPicker3 = new mui.PopPicker({
			layer: 3
		});

		cityPicker3.setData(cityData3);

		var showCityPickerButton = document.querySelector(selector);
		//var cityResult3 = doc.getElementById('cityResult3');

		showCityPickerButton.addEventListener('tap', function (event) {

			//this.blur();
			cityPicker3.show(function (items) {

				showCityPickerButton.value = _getParam(items[0], 'text') + "-" + _getParam(items[1], 'text') + "-" + _getParam(items[2], 'text');
				//返回 false 可以阻止选择框的关闭
				//return false;
				selectVal = showCityPickerButton.value;
			});
		}, false);
	};

	/*返回对象*/
	return {

		url: url_fn,
		lazy: {
			jqlazy: jqlazy_fn
		},
		selectAddr: _selectAddr
	};
}(window.jQuery || window.Zepto);

/*
 * requireJs amd 模块加载
 */

if (typeof define === "function" && define.amd) {
	define("common", [], function () {
		return common;
	});
}

/*
 * es6 模块加载
 */
//
if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined') {

	module.exports.common = common;
}

mui.init({
	swipeBack: true //启用右滑关闭功能
});

//页脚链接跳转
$(".mui-bar.mui-bar-tab .mui-tab-item").on("tap", function () {

	window.location.href = $(this).attr("href");
});

///*****置顶组件start*********/
//	$(window).scroll(function(){
//			
//			if($(window).scrollTop()>=500){
//				$(".zhiding").show();
//			}else{
//				$(".zhiding").hide();
//			}
//			
//			});
//		
//		//置顶点击
//		$(".zhiding").on("tap",function(){
//		mui.scrollTo(0,300);
//	});
//	
///*****置顶组件end*********/


/*
 *	公共类库
*/

var compt = function ($, mui) {

	//左边菜单sroll组件
	var _srollLeftMenu = function _srollLeftMenu() {

		setHeight();

		//改变大小
		$(window).resize(function () {
			setHeight();
		});

		function setHeight() {

			//获取head高度
			var top_h = $(".left-sroll-menu-top").height() + 1;
			//获取底部高度
			var bottom_h = $(".left-sroll-menu-bottom").height() + 1;
			//获取windown高度
			var windown_h = $(window).height();

			//设置srollMenu的高度
			var menu_h = windown_h - top_h - bottom_h;
			$(".left-sroll-menu").css({
				"height": menu_h,
				"top": top_h
			});
		}

		//选择的样式
		$(".left-sroll-menu-ttl .menu li").on("tap", function () {

			$(".left-sroll-menu-ttl  .menu li").removeClass("active");
			$(this).addClass('active');

			//点击触发自定义事件
			$(this).trigger("compt_srollLeftMenu_click", [this]);
		});
	};

	//confirm组件
	var _confirm = function _confirm(title, fn, btnsArr) {
		var btnArr2 = ["确认", "取消"];
		if (arguments[2]) {
			btnArr2 = btnsArr;
		}
		mui.confirm("<span class='iconfont icon-jinggao1 text-danger'></span> " + title, " ", btnArr2, function (e) {
			if (e.index === 0) {
				fn();
			}
		});
	};

	//alert组件框
	var _alert = function _alert(title) {

		mui.alert(title, " ");
	};

	/*返回对象*/
	return {

		srollLeftMenu: _srollLeftMenu,
		confirm: _confirm,
		alert: _alert

	};
}(window.jQuery || window.Zepto, window.mui);

/*
 * requireJs amd 模块加载
 */

if (typeof define === "function" && define.amd) {
	define("compt", [], function () {
		return compt;
	});
}

/*
 * es6 模块加载
 */
//
if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined') {

	module.exports.compt = compt;
}

/*
 * h5文件上传插件
 * var file=document.getElementById("fileUp").files[0];
			
           	h5File.upload({
           		data:file,
           		url:"",
           		outTime:30000,
           		el:$(this),
           		size:10000000, //1m=1000000
           		seccess:function(){},//成功回调
           		error:function(){} //错误回调
           	
           	});//调用上传接口

 <div class="progress-box">
	<!-- 点击提交按钮-->	
	<input type="button" name="up" id="up" value="上传" />	
	<input class="v-hide" type="file" name="" 
	id="fileUp" value=""   accept="image/*" />
	<!--进度条-->
	<div class="progress-all">
		<div class="progress-now"></div>
		<div class="progress-num">0%</div>
	</div>
			
</div>
 * 
 * 
 * */

var h5File = function ($, mui) {

	var fileUpload = function fileUpload(option) {

		if ((typeof option === "undefined" ? "undefined" : _typeof(option)) !== 'object') {
			alert("参数有误！");
			return;
		}

		if (option.size) {
			if (option.data.size > option.size) {
				mui.alert("文件大于" + option.size / 1000000 + "M");
				return;
			}
		} else {
			mui.alert("参数没有设置文件大小值[size]");
			return;
		}

		var data = new FormData();

		data.append('myFiles', option.data);

		$.ajax({
			url: option.url,
			data: data,
			type: "post",
			timeout: option.outTime,
			cache: false,
			processData: false,
			contentType: false,
			xhrFields: {
				withCredentials: true
			},
			xhr: function xhr() {
				//获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数
				var myXhr = $.ajaxSettings.xhr();
				if (myXhr.upload) {
					//检查upload属性是否存在
					//绑定progress事件的回调函数
					myXhr.upload.onprogress = progressFunction;
				}
				return myXhr; //xhr对象返回给jQuery或zepto使用
			},
			success: option.seccess,
			error: option.error
		});

		//progress事件的回调函数
		function progressFunction(evt) {

			var p = $(option.el).parents(".progress-box");
			var widthAll = $(".progress-all", p).width();
			var progressBar = $(".progress-all", p);
			var percentageDiv = $(".progress-now", p);
			var percentageNum = $(".progress-num", p);

			if (evt.lengthComputable) {
				progressBar.max = evt.total;
				progressBar.value = evt.loaded;
				$(percentageDiv).css("width", Math.round(evt.loaded / evt.total * widthAll) + "px");
				$(percentageNum).text(Math.ceil(evt.loaded / evt.total * 100) + "%");
				//          if (evt.loaded == evt.total) {
				//            //  console.log("上传完成100%");
				//          }
			}
		}
	};

	return {
		upload: fileUpload

	};
}(window.Zepto, window.mui);

/*
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

;(function ($) {

	//minus
	$(".minus").on("tap", function (e) {
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
	$(".plus").on("tap", function (e) {
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
})(window.jQuery || window.Zepto);

/*****数字框组件end******/

//单选按钮

;(function ($) {

	$(".comp-radio-item").on("tap", function () {
		var p = $(this).parents(".comp-radio");
		$(".comp-radio-item", p).removeClass("active");
		$(this).addClass("active");

		//点击触发自定义事件
		$(this).trigger("radio_click", [this]);
	});
})(window.jQuery || window.Zepto)

/*****置顶组件start*********/
;(function ($, mui) {
	$(window).scroll(function () {

		if ($(window).scrollTop() >= 500) {
			$(".zhiding").show();
		} else {
			$(".zhiding").hide();
		}
	});

	//置顶点击
	$(".zhiding").on("tap", function () {
		mui.scrollTo(0, 300);
	});
})(window.Zepto, mui);

/*****置顶组件end*********/

;(function () {

	$(".select-btn-item").on("tap", function () {

		var p = $(this).parents(".select-btn");
		$(".select-btn-item", p).removeClass("active");
		$(this).addClass("active");

		////点击触发自定义事件
		$(this).trigger("select_btn_click", [this]);
	});
})(window.jQuery || window.Zepto);

/*我要报修*/
var baoxiu = function ($) {

	var _init = function _init() {

		var btns = mui('#select-date');

		btns.each(function (i, btn) {

			btn.addEventListener('tap', function () {
				var optionsJson = this.getAttribute('data-options') || '{}';
				var options = JSON.parse(optionsJson);
				var id = this.getAttribute('id');
				/*
     * 首次显示时实例化组件
     * 示例为了简洁，将 options 放在了按钮的 dom 上
     * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
     */
				var picker = new mui.DtPicker(options);
				picker.show(function (rs) {

					document.querySelector("#select-date").value = rs.text;

					//	alert( rs.text);

					picker.dispose();
				});
			}, false);
		});
	};

	return {
		init: _init
	};
}(window.Zepto);
var login = function ($) {

	var _init = function _init() {

		//change 验证
		$(".login-list input").on("keyup", function () {
			var ck = true;

			$(".login-list  input").each(function () {
				if ($(this).val() == "" || !$(this).val()) {
					ck = false;
				}
			});

			if (ck) {

				$(".login-submit .btn").addClass("active").removeAttr("disabled");
			} else {
				$(".login-submit .btn").removeClass("active").attr("disabled", "disabled");
			}
		});
	};

	return {
		init: _init
	};
}(window.Zepto);

/*
 * requireJs amd 模块加载
 */

if (typeof define === "function" && define.amd) {
	define("login", [], function () {
		return login;
	});
}

/*
 * es6 模块加载
 */
//
if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined') {

	module.exports.login = login;
}
/*重置密码*/
var repwd = function ($) {

	var _init = function _init() {

		repwd.pwd1 = false;
		repwd.pwd2 = false;

		//验证新密码
		$(".reg-list .pwd").on("keyup", function () {

			ch1(this);
		});

		//验证确认密码
		$(".reg-list .pwd2").on("keyup", function () {
			ch2(this);
		});

		//ff1
		function ch1(obj) {
			var p = $(obj).parents(".reg-list");
			var v = $(obj).val().trim();
			var v2 = $(".pwd2", p).val().trim();
			if (v === "") {
				isPwd(false);
				$(".reg-error").addClass("is-show");
				$(".reg-error .error-txt").text("密码不能为空！");
				return repwd.pwd1 = false;
			}
			if (v.length >= 8) {
				repwd.pwd1 = true;
				$(".reg-error").removeClass("is-show");

				//比较两次密码是否相同
				if (v2.length > 0) {

					if (v == v2) {
						repwd.pwd2 = repwd.pwd1 = true;
						$(".reg-error").removeClass("is-show");
					} else {
						repwd.pwd1 = true;
						repwd.pwd2 = false;

						$(".reg-error").addClass("is-show");
						$(".reg-error .error-txt").text("两次密码不相同！");
					}
				}
			} else {
				repwd.pwd1 = false;
				$(".reg-error").addClass("is-show");
				$(".reg-error .error-txt").text("密码长度不能少于8位！");
			}

			var bl = repwd.pwd1 && repwd.pwd2;

			isPwd(bl);
		}

		//ff2
		function ch2(obj) {
			var p = $(obj).parents(".reg-list");
			var v = $(obj).val().trim();
			var v2 = $(".pwd", p).val().trim();

			if (v == "") {
				isPwd(false);
				return repwd.pwd2 = false;
			}
			if (v == v2) {
				repwd.pwd2 = true;
			} else {
				repwd.pwd2 = false;
			}

			var bl = repwd.pwd1 && repwd.pwd2;
			if (bl) {
				$(".reg-error").removeClass("is-show");
			} else {
				$(".reg-error").addClass("is-show");
				$(".reg-error .error-txt").text("两次密码不相同！");
			}

			isPwd(bl);
		}

		//检测两次密码是否相同
		function isPwd(bl) {
			if (typeof bl === 'boolean') {

				if (bl) {
					$(".reg-submit .btn").addClass("active").removeAttr("disabled");
				} else {
					$(".reg-submit .btn").removeClass("active").attr("disabled", "disabled");
				}
			}
		}
	};

	return {
		init: _init
	};
}(window.Zepto);

/*
 * requireJs amd 模块加载
 */

if (typeof define === "function" && define.amd) {
	define("repwd", [], function () {
		return repwd;
	});
}

/*
 * es6 模块加载
 */
//
if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined') {

	module.exports.repwd = repwd;
}

var wf = function wf(a, b) {
	return a + b;
};