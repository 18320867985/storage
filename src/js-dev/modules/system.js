var system= (function($){
		
		
		var   _init=function(){
			// 全选
				$(".ck-all").on("ifChecked",function(){
					
					$p=$(this).closest(".table");
					$(".list-item input[type=checkbox]",$p).iCheck('check'); //— 将输入框的状态设置为checked
					
				})
				
				// 取消全选
				$(".ck-all").on("ifUnchecked",function(){
						
					$(".list-item input[type=checkbox]",$p).iCheck('uncheck'); //— 将输入框的状态设置为checked
				})
				
				
		
		}
		
		return {
			init:_init
		}
	
})(window.jQuery)
