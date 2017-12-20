/*
 *	公共类库
*/

 common=(function($){
	
	/***url对象***/
	var url_fn={
			//采用正则表达式获取地址栏参数：（ 强烈推荐，既实用又方便！）
			GetQueryString:function GetQueryString(name) {
			    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			    var r = window.location.search.substr(1).match(reg);
			    if (r != null) return unescape(r[2]); return null;
			},
			
			
			//从WebAPI获取日期json数据 转换成日期时间戳
			jsonToDate:function jsonToDate(apidate) {
	  		  var txts = apidate.replace("/Date(", "").replace(")/","");
	   		 return parseInt(txts.trim());
	
			},
			
			
			// 取当前页面名称(不带后缀名)
   			getPageName:function getPageName() {
	  		  var a = location.href;
	  		  var b = a.split("/");
	 		  var c = b.slice(b.length - 1, b.length).toString(String).split(".");
	  		  return c.slice(0, 1);
			},

			//取当前页面名称(带后缀名)
			getPageNameExention:function getPageNameExention() {
	  		  var strUrl = location.href;
	  		  var arrUrl = strUrl.split("/");
	  		  var strPage = arrUrl[arrUrl.length - 1];
	  		  return strPage;
			},
			
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
	var jqlazy_fn=function(){
		
		var window_h = $(window).height();
				
				$(window).scroll(function() {
				
					setTimeout(function() {
						
						$(".load-lazy").each(function() {
						
							var img_h = parseInt($(this).offset().top) - parseInt(window_h);
							var img_h2 = parseInt($(this).offset().top)+$(this).height();
							if($(document).scrollTop() >= img_h&&$(document).scrollTop()<img_h2) {

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
			};
	

	/*返回对象*/
	 return{
	 	
	 	url:url_fn,
		lazy:{
			jqlazy:jqlazy_fn
		}
		
		}
	 
	
})(window.jQuery||window.Zepto);






