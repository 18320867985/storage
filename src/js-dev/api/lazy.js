/**延迟加载**/

/**
 * 延迟加载
 *  * <img class="load-lazy"
 * 	src="images/Home/lazy.jpg"
 * alt="新品上市图片"
 * data-src="images/Home/板块图片1.png"
 * > 
 * */
var lazy = (function($) {

	var _init = function() {

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

				});
			}, 100);
		});
	}

	return {
		init: _init
	}

})(window.jQuery || window.Zepto);