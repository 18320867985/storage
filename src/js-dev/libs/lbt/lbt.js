
		 /*
		  * 首页图片轮播
		 * 				case "fade":
						case "fold":
						case "top":
						case "left":
						
		 * */
		
			$(function(){
				
				
			$(".index-cont-lbt-big").hover(function() {
				$(this).find(".prev,.next").fadeTo("show", 0.5);
			}, function() {
				$(this).find(".prev,.next").hide();
			})
		
			$(".prev,.next").hover(function() {
				$(this).fadeTo("show", 0.7);
			}, function() {
				$(this).fadeTo("show", 0.1);
			})
			$(".index-cont-lbt-big").slide({
				titCell: ".num ul",
				mainCell: ".lbt-items",
				effect: "fold",
				autoPlay: true,
				delayTime: 700,
				autoPage: true,
				interval:3000
				
			});
		});
		
