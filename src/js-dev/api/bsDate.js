/*
 * 默认js
 * 添加 class="bs-date " 
	<input type="text" class="form-control bs-date " value="" placeholder="订单开始时间" />
 * 
 */

var bsDate = (function($) {

	var _init = function() {
		// bs 日历插件
		$('.bs-date').datetimepicker({

			format: "yyyy-mm-dd  ", //'yyyy-mm-dd hh:ii'
			showMeridian: true,
			autoclose: true,
			todayBtn: true,
			minView: 3, //选择日期
			//forceParse :true  //转换格式

		});

		//日期不准输入
		$('.bs-date').focus(function() {

			$(this).blur();
		});

	}

	return {
		init: _init
	}

})(window.jQuery);