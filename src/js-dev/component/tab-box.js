/*
 * 标签选项卡
 * 
 * <div class="tab-big">
 * 
	 <div class="tab-ttl">
         <a class="tab-item active" data-target="#form_a">
                            塑胶原料
             </a>
           <a class="tab-item"  data-target="#form_b">
                            改性塑料
            </a>
          <a class=" tab-item"  data-target="#form_c">
                            环保再生
            </a>
            <a class="tab-item"  data-target="#form_d">
                            塑料助剂
         </a>

    </div>
      
     <div class="fabu-form tab-content ">
                
           <!--塑胶原料-->
           <div class="form tab-content-item active" id="form_a">-塑胶原料</div>
              <!--塑胶原料2-->
           <div class="form tab-content-item " id="form_b">-塑胶原料2</div>
              <!--塑胶原料3-->
           <div class="form tab-content-item " id="form_c">-塑胶原料3</div>
              <!--塑胶原料4-->
           <div class="form tab-content-item " id="form_d">-塑胶原料4</div>
 *          
 *    </div>
 * 
 * </div>
 * 
 * 
 * 		//点击事件
		$(".tab-item").on("tab_select",function(event,element){			
			//element 当前点击的元素	
			
		});
 * 
 * */


+function($) {


	// 选项卡tag-box click 新的
	$(".tab-big .tab-ttl .tab-item").on("click", function(e) {
		
		e.preventDefault();
		var p=$(this).parents(".tab-big");
		p.find(".tab-ttl .tab-item").removeClass("active");
		$(this).addClass("active");

		var target = $(this).attr("data-target");
		$(".tab-content",p).find(".tab-content-item").removeClass("active");
		$(".tab-content",p).find(target).addClass("active");
		
		// 点击触发自定义事件 
		$(this).trigger("tab_select");

	});
	
	
	// 选项卡tag-box tap 新的
	$(".tab-big .tab-ttl .tab-item").on("tap", function(e) {
		
		e.preventDefault();
		var p=$(this).parents(".tab-big");
		p.find(".tab-ttl .tab-item").removeClass("active");
		$(this).addClass("active");

		var target = $(this).attr("data-target");
		$(".tab-content",p).find(".tab-content-item").removeClass("active");
		$(".tab-content",p).find(target).addClass("active");
		
		// 点击触发自定义事件 
		$(this).trigger("tab_select");

	});

}(window.jQuery || window.Zepto)