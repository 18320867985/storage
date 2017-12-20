;(function() {

	obj = {
		// 头部菜单折叠
		setMenu: function setMenu() {

			$(".navbar-toggle").click(function(e) {
				e.stopPropagation();
				if($(this).attr("data-bl")) {

					$(this).removeAttr("data-bl");
					slide_l(false);

				} else {

					$(this).attr("data-bl", true);
					slide_l(true);

					if($(window).width() < 768) {
						$(document).one("click", function() {
							$(".navbar-toggle").removeAttr("data-bl");
							slide_l(false);
						});
					}
				}

			});

			// 张开菜单
			function slide_l(bl) {

				if(bl) {

					$("body").css("background", "#ccc");
					$(".menu-slide").stop().animate({
						right: 0

					}, 600);
				} else {
					$("body").css("background", "#fff");
					$(".menu-slide").stop().animate({
						right: "-" + $(".menu-slide").outerWidth()

					}, 400);
				}

			}

			// 点击doucment关闭 菜单

			$(".menu-slide .dropdown-menu  a").on("click", function(event) {
				event.stopPropagation();

			});

		},

		/*
		 <!--视频播放器-->
			<div class="v-temp" id="v-temp">
				<span class="glyphicon glyphicon-remove-circle  v-close"></span>

				<video class="v-video" id="v-video" width="400" height="300" controls="controls">

				</video>

			</div>
			<div class=" ">
				<!--视频-->
				<div class="video-temp">
					<!--hidden-->
					<div class="video-content v-hide">
						<source src="video/test.mp4" type="video/mp4"></source>
						<source src="myvideo.ogv" type="video/ogg"></source>
						<source src="myvideo.webm" type="video/webm"></source>
						<object width="" height="" type="application/x-shockwave-flash" data="myvideo.swf">
					 		<param name="movie" value="myvideo.swf" />
					 		<param name="flashvars" value="autostart=true&amp;file=myvideo.swf" />
			 			</object>
	
						<p>当前浏览器不支持 video直接播放，<br />点击这里下载视频：
							<a href="video/test.mp4">下载视频</a>
						</p>
					</div>
					<img src="images/场景系列01.png" alt="当前浏览器不支持html5的 video元素,请升级你的浏览器" />
				</div>
			
				<div class="v-desc">
					<h2>ALHAMBRA</h2>
					<p class="p1">1837年以来 Tirffan & CO蒂芙尼</p>
					<p class="p2">传奇杰作引领风格 见证着世间无数至臻至美 爱情故事</p>
	
				</div>
				<img class="v-play" src="images/icon--播放按钮.png" alt="play" />
	
			</div>
		 
		 */
		// open video
		htmlVideo: function htmlVideo() {

			// 打开视频
			$(".v-play").click(function() {
				var video = document.getElementById("v-video");
				if(!video.canPlayType) {
					alert("当前浏览器不支持html5的 video元素,请升级你的浏览器");
					return;
				}
				$(".v-temp").show();
				var v = $(this).parent().find(".video-content").html();
				video.innerHTML = v;
				video.load();
				video.play();

			});

			// 关闭视频
			$(".v-temp  .v-close").click(function() {
				var video = document.getElementById("v-video")

				video.pause();
				$(this).closest(".v-temp").hide();
			});

		},
	
		zhiding:function(){
			
			$(window).scroll(function(){
				
				if($(window).scrollTop()>500){
					$(".zhiding").show();
				}else{
					$(".zhiding").hide();
				}
			});
			
			
			//
			$(".zhiding").click(function(){
				$("body,html").animate({
					scrollTop:0
				},500);
			});
			
		}
	}


	// exec
	obj.setMenu();
	obj.htmlVideo();
	obj.zhiding();

})(window.jQuery || window.Zepto)