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

	var scroll = (function($) {

		var obj = {

			init: function(top) {

				var _top = Number(top);
				_top = isNaN(_top) ? 0 : _top;

				this.offsetTop = _top;
				this.bindEvent(this.offsetTop);
				this.onLoad();
				this.onReset();

			},

			offsetTop: 0,

			setOffsetTop: function(top) {
				this.offsetTop = typeof top === "number" ? top : 0;

			},

			onReset: function() {

				$(window).resize(function() {
					this.scrollList();
					this.scroll(this.offsetTop);
				}.bind(this));

			},
			onLoad: function() {

				$(window).load(function() {
					this.scrollList();
					this.scroll(this.offsetTop);

				}.bind(this));

			},

			selector: function() {
				var _tagget = $("[data-spy=spy]").attr("data-target");
				return $(_tagget);

			},

			bindEvent: function(top) {

				var p = this.selector();
				this.selector().find(" ul li  a").click(function() {

					// animation
					var $this = $(this);
					var _top = Math.floor($($this.attr("href")).offset().top) - parseInt(top);
					$("body,html").stop().animate({
						scrollTop: _top
					}, 500);

				});

			},

			scroll: function(top) {

				var ff = this.getScrollList;
				var p = this.selector();
				$(window).on("scroll", function() {

					var arrs = ff || [];

					arrs.forEach(function(item) {

						var m1 = parseInt(item.top); //- parseInt(top);
						var m2 = parseInt(item.maxTop); //- parseInt(top);
						if($(window).scrollTop() >= (m1) && $(window).scrollTop() < (m2)) {
							//alert(item.selector)
							p.find("ul li").removeClass("active");
							$("[href=" + item.selector + "]").parent().addClass("active");
							return false;
						}
					});

				});

			},

			scrollList: function() {

				var objs = [];

				var _offsetTop = this.offsetTop;
				var els = this.selector().find("li");
				for(var i = 0; i < els.length; i++) {

					var _el = $(els[i]).find("a").attr("href");

					if(_el) {

						var obj = {}
						var _top = Math.floor($(_el).offset().top) - _offsetTop;

						var maxTop = 0;
						if(i < (els.length - 1)) {
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

		}

		return {
			init: function(top) {
				obj.init(top);
			},
			setOffsetTop: function(top) {
				obj.setOffsetTop(top);
			}
		}

	})(window.jQuery || window.Zepto);