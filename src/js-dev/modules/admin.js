/**admin**/
var admin = (function($) {

	var _init = function() {

		// 左边菜单高度
		setMenuHeight();

		$(window).resize(function() {
			setMenuHeight();
		});

		function setMenuHeight() {
			var w_big = $(window).height();
			var w_head = $(".head-logo").outerHeight();
			var w_ttl_1 = $(".admin-left .ttl-1").outerHeight();
			var w_footer = $(".footer").outerHeight();
			var ul_h = w_big - w_head - w_footer - w_ttl_1;
			$(".admin-left .box-big").height(ul_h);

		}


		// 菜单选中的样式
		$(".admin-left .nemu-1>li").mouseenter(function(e) {
			e.preventDefault();
			e.stopPropagation();
			$(".admin-left .nemu-2").hide();
			$(".admin-left .nemu-1>li").removeClass("active");
			$(this).addClass("active");
			var _top = $(this).position().top; // 当前项的top
			//	alert(_top)
			var _nemu2 = $(this).find(".nemu-2");
			_nemu2.show();

			// setheight
			var w_big = $(window).height();
			var w_head = $(".head-logo").outerHeight();
			var w_ttl_1 = $(".admin-left .ttl-1").outerHeight();
			var w_footer = $(".footer").outerHeight();
			var ul_h = w_big - w_head - w_footer - w_ttl_1; //大框高度

			var menu2_h = _nemu2.outerHeight(); // 子菜单高度
			var _top2 = $(this).offset().top - w_head - w_ttl_1; // 当前项的top
			if((_top2 + menu2_h) > ul_h) {
				_nemu2.css({
					"top": _top - menu2_h + $(this).outerHeight()
				});

			} else {
				_nemu2.css({
					"top": _top
				});
			}

		});

		$(".admin-left ").mouseleave(function() {
			$(".admin-left .nemu-2").hide();
		})

		// 二级菜单
		$(".admin-left .nemu-2 li a").on("click", function(e) {
			e.preventDefault();
			$(".admin-left .nemu-2  li").removeClass("active");
			$(this).closest("li").addClass("active");
		});
		
		
		// 添加二级菜集合项 
		 var srcLists=[];
		$(".admin-left .nemu-2 li a").on("click", function(e) {
			e.preventDefault();
			var _text=$(this).text();
			var _href=$(this).attr("href");
			
			var obj={};
			obj.text=_text;
			obj.href=_href;
			srcLists.push(obj);
			addmenu();
		});
		
		// 删除 添加二级菜集合项 
		$(".admin-right .ttl-1 ").delegate("li","click",function(){
			
			var $this= $(this);
			var _index=$(".admin-right .ttl-1 ").index($this);
			$this.remove();
			 srcLists.splice(_index,1);
			
			
		});
		
		
		// foreach
		function addmenu(){
			var $ul=$(".admin-right .ttl-1");
		//	<li>产品档案 <span class="close">&times;</span></li>
			$ul=$(".admin-right .ttl-1").empty();
			for(var i in srcLists){
				
			var li =document.createElement("li");
			var span =document.createElement("span");
			span.classList.add("txt");
			span.innerText=srcLists[i].text;
			var span2 =document.createElement("span");
			span2.classList.add("close");
			span2.innerHTML="&times;";
			li.appendChild(span);
			li.appendChild(span2);
			$ul.append(li);
			}
		}
		

	}

	return {
		init: _init
	}

})(window.jQuery);