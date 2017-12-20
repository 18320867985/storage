/**
 * 
 * 缩略图
 * 
 * <div class=" clearfix  thumbnail-slider">
		<!--btn-->
		<div class="pull-left   ">
			<span class="glyphicon glyphicon-menu-left  thumbnail-btn-l"></span>
		</div>
		<div class=" pull-left thumbnail-content ">

			<div class="thumbnail-allitems">

				<ul class=" thumbnail-item">
					<li class="clearfix">
						<a href="javascript:">
							<img src="images/youhui-1.png" alt="优选好货 图片 160*160" />
							<div class="caption">
								<p>
									Nutrilon诺优能 幼儿配方奶粉 3段 12-36月个月800克/罐
								</p>

								<div class="price">
									<span class=" iconfont  renminbi "></span>
									<span>150</span>
								</div>
							</div>
						</a>
					</li>

				</ul>
	
			</div>
			
			<div class="thumbnail-num">
				<span class="l">1</span>
				<span>/</span>
				<span class="r">4</span>
				
			</div>

		</div>
		<div class="pull-left">
			<span class="glyphicon glyphicon-menu-right thumbnail-btn-r"></span>
		</div>
	</div>

 * **/


+(function($){
	
//
//	$.fn.thumbnail=function(){
//			
//			var $content= $(this).find(".thumbnail-content");
//			var $allitems= $(this).find(".thumbnail-allitems");
//			var $btn_l= $(this).find(".thumbnail-btn-l");
//			var $btn_r= $(this).find(".thumbnail-btn-r");
//			var $item= $(this).find(".thumbnail-item");
//			var $num= $(this).find(".thumbnail-num");
//			var $num_r=$num.find(".r");
//			var $num_l=$num.find(".l");
//			
//		
//			var size= parseInt($item.length);
//			var width= parseInt($item.outerWidth(true));
//			var index=0;
//			$num_r.text(size);
//			$num_l.text(1);
//			
//			// 设置width
//			$allitems.width(size*width);
//				
//			 $btn_r.click(function(){
//			 	index=index>=0&&index<size-1?++index:size-1;
//			 	
//			 	$allitems.animate({left:-index*width},400)
//			 	$num_l.text(index+1);
//			 })
//			 
//			  $btn_l.click(function(){
//			 	index=index>0&&index<size?--index:0;
//			 	$num_l.text(index+1);
//			 	$allitems.animate({left:-index*width},400)
//			 	
//			 })
//				
//			return this;
//			
//			
//		}
//		
//	
//	
	
	
	$(".thumbnail-slider").each(function(){
				
			var $content= $(this).find(".thumbnail-content");
			var $allitems= $(this).find(".thumbnail-allitems");
			var $btn_l= $(this).find(".thumbnail-btn-l");
			var $btn_r= $(this).find(".thumbnail-btn-r");
			var $item= $(this).find(".thumbnail-item");
			var $num= $(this).find(".thumbnail-num");
			var $num_r=$num.find(".r");
			var $num_l=$num.find(".l");
			
			var size= parseInt($item.length);
			var width= parseInt($item.outerWidth(true));
			var index=0;
			$num_r.text(size);
			var curIndex=size<=0?0:1;
			$num_l.text(curIndex);
			if(size<=0){
				$num.hide();
				$btn_l.hide();
				$btn_r.hide();
				
				
			}
			// 设置width
			$allitems.width(size*width);
				
			 $btn_r.click(function(){
			 	index=index>=0&&index<size-1?++index:size-1;
			 	
			 	$allitems.animate({left:-index*width},400)
			 	$num_l.text(index+1);
			 });
			 
			  $btn_l.click(function(){
			 	index=index>0&&index<size?--index:0;
			 	$num_l.text(index+1);
			 	$allitems.animate({left:-index*width},400)
			 	
			 });
				
	});
	
	
	
})(window.jQuery||window.Zepto);
