/**
 * iframe
 * **/


var iframe = (function($) {
	
	// 设置iframe 高度
	var _setHeight = function() {
		var windows_h=$(document).height()+50;
		$(window.parent.document).find(".parent-window").css("height",windows_h);
	
	
	}
		
	return {
		setHeight:_setHeight
	}

})(window.jQuery|| window.Zepto);