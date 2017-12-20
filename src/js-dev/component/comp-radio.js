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


+(function($){
	
	$(".comp-radio-item").on("tap",function(){
		var p=$(this).parents(".comp-radio");
		$(".comp-radio-item",p).removeClass("active");
		$(this).addClass("active");
		
		//点击触发自定义事件
		$(this).trigger("radio_click",[this]);
	});
	

	
	
	
})(window.jQuery||window.Zepto)
