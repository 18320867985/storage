;(function($) {

	var _check = function() {

		// 全选
		$(".ck-all").on("ifChecked", function() {

			$p = $(this).parents(".table");
			$(".list-item input[type=checkbox]", $p).iCheck('check'); //— 将输入框的状态设置为checked

		})

		// 取消全选
		$(".ck-all").on("ifUnchecked", function() {

			$(".list-item input[type=checkbox]", $p).iCheck('uncheck'); //— 将输入框的状态设置为checked
		})

	}

	window.system = {
		check: _check
	}

})(window.jQuery)