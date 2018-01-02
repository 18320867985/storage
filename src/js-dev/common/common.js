/*
 *	公共类库
 */

(function($) {

	// 冲突common兼容
	var _common = window.common = window.Common;

	/**创建Common对象**/
	window.common = window.Common = function Common() {};

	// 添加扩展extend
	Common.extend = function(obj) {

		if(typeof obj === "object") {

			for(var i in obj) {
				this[i] = obj[i];
			}
		}

		return this;
	}

	/**url对象**/
	Common.extend({

		url: {
			//采用正则表达式获取地址栏参数：（ 强烈推荐，既实用又方便！）
			GetQueryString: function GetQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
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

		}
	});

	/**延迟加载**/
	Common.extend({
		/**
		 * 延迟加载
		 *  * <img class="load-lazy"
		 * 	src="images/Home/lazy.jpg"
		 * alt="新品上市图片"
		 * data-src="images/Home/板块图片1.png"
		 * > 
		 * */
		lazy: function() {

			var window_h = $(window).height();

			$(window).scroll(function() {

				setTimeout(function() {

					$(".load-lazy").each(function() {

						var img_h = parseInt($(this).offset().top) - parseInt(window_h);
						var img_h2 = parseInt($(this).offset().top) + $(this).height();
						if($(document).scrollTop() >= img_h && $(document).scrollTop() < img_h2) {

							$(this).attr("src", $(this).attr("data-src"));

							/*ie8 不支持
							 * .animate({
							"opacity":0.2
							}).animate({
							"opacity": 1
							}, 500);
									
							* */

						}

					})
				}, 100)
			})
		}

	});

	/**绑定自定义事件**/
	Common.extend({
		events: {
			events: {},

			// bind events
			on: function(eventName, fn) {
				this.events[eventName] = this.events[eventName] || [];
				this.events[eventName].push(fn);

			},
			off: function(eventName, fn) {
				if(arguments.length === 1) {

					this.events[eventName] = [];

				} else if(arguments.length === 2) {
					var $events = this.events[eventName] || [];
					for(var i = 0; i < $events.length; i++) {
						if($events[i] === fn) {
							$events.splice(i, 1);
							break;
						}

					}

				}

			},
			emit: function(eventName, data) {

				if(this.events[eventName]) {
					for(var i = 0; i < this.events[eventName].length; i++) {
						this.events[eventName][i](data);
					}

				}
			}
		}
	});

	/**array的扩展方法**/
	Common.extend({
		list: {

			// min value
			min: function(data) {
				data = data || [];
				if(data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				var _array_min = 0;
				var isOne = true;
				for(var i = 0; i < data.length; i++) {
					var _temp = 0;

					if(typeof data[i] !== "number") {

						//  is not a number
						var _num = Number(data[i]);
						_temp = isNaN(_num) ? 0 : _num;

					} else {

						//  is a number
						_temp = data[i];
					}

					if(isOne) {
						_array_min = _temp;
						isOne = false;

					} else {
						// set value number
						if(_temp < _array_min) {
							_array_min = _temp;
						}

					}

				}

				return _array_min;
			},

			// max value
			max: function(data) {
				data = data || [];
				if(data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				var _array_max = 0;

				var isOne = true;
				for(var i = 0; i < data.length; i++) {
					var _temp = 0;

					if(typeof data[i] !== "number") {

						//  is not a number
						var _num = Number(data[i]);
						_temp = isNaN(_num) ? 0 : _num;

					} else {

						//  is a number
						_temp = data[i];
					}

					if(isOne) {
						_array_max = _temp;
						isOne = false;

					} else {
						// set value number
						if(_temp > _array_max) {
							_array_max = _temp;
						}

					}

				}

				return _array_max;
			},
			
			// data where
			where: function(data, fn) {
				data = data || [];
				if(data.constructor !== Array) {
					throw new Error("第一个参数必须是个数组，第二是回调函数");
				}
				var _arrs = [];
				if(data.constructor === Array) {

					if(typeof fn !== "function") {
						return data;
					}
					for(var i = 0; i < data.length; i++) {

						if(fn(data[i])) {
							_arrs.push(data[i]);
						}

					}

				}

				return _arrs
			},
			
			// data map
			map: function(data, fn) {
				data = data || [];
				if(data.constructor !== Array) {
					throw new Error("第一个参数必须是个数组，第二是回调函数");
				}

				if(data.constructor === Array) {

					if(typeof fn !== "function") {
						return data;
					}

					for(var i = 0; i < data.length; i++) {

						data[i] = fn(data[i])|| data[i];
						
					}

				}

				return data;

			},
			
			//  data first
			first:function(data){
				data = data || [];
				if(data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				if(data.length>0){
					return data[0];
				}else{
				 return null;
				}
			},
			
			//  data last
			last:function(data){
				data = data || [];
				if(data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				if(data.length>0){
					return data[data.length-1];
				}else{
				 return null;
				}
			},
			
			//  data  slice
			slice:function(data,startIndex,endIndex){
				data = data || [];
				
				if(data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				if(data.length>0){
					startIndex=typeof startIndex==="number"?startIndex:0;
					endIndex=typeof endIndex==="number"?endIndex:0;
					var _arrs=[];
					 for(var i=startIndex;i<data.length;i++){
					 	
					 	if(i<endIndex){
					 		_arrs.push(data[i]);
					 	}
					 	
					 } 
					 
					 return _arrs;
					 
					 
				}else{
				 return null;
				}
			},

		}

	});

})(window.jQuery || window.Zepto);