/*
 * 分页组件
 * */

var paging = (function($) {

	var page = {
		index: 0, //	当前页
		pageItem: 0, //  每页条数
		allItem: 0, //  总条数
		allPage: 0, //  总页数
		showCount: 0, //  显示的页码数目
		groupPage: 0, // 页码的分组数目
		selector: "", //分页元素的选择器
		isAnimation: false, //是否显示动画
		isShowSkip:false,  // 是否显示跳转页
		isShowCount:false,  // 是否显示总页数

		prevText: "上一页",
		nextText: "下一页",

		firstText: "第一页",
		lastText: "后一页",

		prevGroupText: "...",
		nextGroupText: "...",

		// 页码是否显示
		isShowNumber: true, //是否显示数字
		isShowPrevNext: true, // 是否显示上下页
		isShowFirstLast: true, // 是否显示第一页和后一页
		isShowPrevNextGroup: true, // 是否显示上下页组

	}

	function checkParameter(obj) {

		// 页码
		page.index = typeof obj.index === "number" ? obj.index : 0;
		page.pageItem = typeof obj.pageItem === "number" ? obj.pageItem : 0;
		page.allItem = typeof obj.allItem === "number" ? obj.allItem : 0;
		page.showCount = typeof obj.showCount === "number" ? obj.showCount : 0;
		page.selector = typeof obj.selector === "string" ? obj.selector : ".paning";
		page.isAnimation = typeof obj.isAnimation === "boolean" ? obj.isAnimation : false;
		page.isShowSkip = typeof obj.isShowSkip === "boolean" ? obj.isShowSkip : false;
		page.isShowCount = typeof obj.isShowCount === "boolean" ? obj.isShowCount : false;

		// 显示的文本
		page.prevText = typeof obj.prevText === "string" ? obj.prevText : page.prevText;
		page.nextText = typeof obj.nextText === "string" ? obj.nextText : page.nextText;
		page.firstText = typeof obj.firstText === "string" ? obj.firstText : page.firstText;
		page.lastText = typeof obj.lastText === "string" ? obj.lastText : page.lastText;
		page.prevGroupText = typeof obj.prevGroupText === "string" ? obj.prevGroupText : page.prevGroupText;
		page.nextGroupText = typeof obj.nextGroupText === "string" ? obj.nextGroupText : page.nextGroupText;

		// 是否显示项
		page.isShowNumber = typeof obj.isShowNumber === "boolean" ? obj.isShowNumber : page.isShowNumber;
		page.isShowPrevNext = typeof obj.isShowPrevNext === "boolean" ? obj.isShowPrevNext : page.isShowPrevNext;
		page.isShowFirstLast = typeof obj.isShowFirstLast === "boolean" ? obj.isShowFirstLast : page.isShowFirstLast;
		page.isShowPrevNextGroup = typeof obj.isShowPrevNextGroup === "boolean" ? obj.isShowPrevNextGroup : page.isShowPrevNextGroup;

	}
	// 初始化
	function _init(obj) {

		// 检测参数是否为对象
		if(typeof obj !== "object") {
			return "参数有误";
		}

		// 检查参数
		checkParameter(obj);

		// 设置总页数
		getAllPage();

		// 页码的分组数目
		getGroupPage()

		// 添加页码到页面元素里
		$(page.selector).html(_create(obj.index));

		// 点击触发事件
		$(page.selector).on("click", "a.item", function(e) {
				e.stopPropagation();
				e.preventDefault();
			
			var id = $(this).attr("data-id");
			$(page.selector).find(".skip-txt").val(id)
			//点击触发自定义事件
			$(this).trigger("paging_click", [id]);
			
			// 添加页码到页面元素里
			$(page.selector).html(_create(id));
			
			// 显示动画
			if(page.isAnimation) {
				$('html,body').animate({
					scrollTop: '0px'
				}, 400);
			}
		});
		
		
		
		// 点击跳转页 触发事件
		$(page.selector).on("click", ".skip-btn", function(e) {
				e.stopPropagation();
				e.preventDefault();
			var id=1;
			var v= $(page.selector).find(".skip-txt").val();
				v=v==""?1:v;
				if(!isNaN(Number(v))){
					id=v;
				}else{
					id=1;
				}
				// 检查最大值
				id=id>page.allPage?page.allPage:id;
				
			 $(page.selector).find(".skip-txt").val(id)
			//点击触发自定义事件
			$(this).trigger("paging_click", [id]);
			
			// 添加页码到页面元素里
			$(page.selector).html(_create(id));
			
			// 显示动画
			if(page.isAnimation) {
				$('html,body').animate({
					scrollTop: '0px'
				}, 400);
			}
		});

	}

	// 设置总页数
	function getAllPage() {
		if(page.pageItem > page.allItem) {

			page.allPage = 1;
		} else {
			if(page.allItem % page.pageItem === 0) {

				page.allPage = Math.floor(page.allItem / page.pageItem);
			} else {
				page.allPage = Math.floor(page.allItem / page.pageItem) + 1;
			}
		}
	}

	// 页码的分组数目
	function getGroupPage() {
		if(page.allPage > page.showCount) {
			if(page.allPage % page.showCount === 0) {
				page.groupPage = Math.floor(page.allPage / page.showCount);
			} else {
				page.groupPage = Math.floor(page.allPage / page.showCount) + 1;
			}

		} else {
			page.groupPage = 1;
		}

	}

	function _create(currentPage) {
		var num = "";
		var prev = "";
		var next = "";
		var first = "";
		var last = "";
		var prevGroup = "";
		var nextGroup = "";
		var skipBtn="";
		var CountNum="";
		currentPage=parseInt(currentPage);
		// 没有数据
		if(currentPage <= 0) {
			return "<span class='no-data'>没有相关数据</span>";
		}
		currentPage = currentPage > page.allPage ? page.allPage : currentPage;

		var setPageCount = 0; // 设置页码所在的数目
		if(currentPage > page.showCount) {
			setPageCount = Math.floor(currentPage / page.showCount);
			setPageCount = currentPage % page.showCount === 0 ? setPageCount - 1 : setPageCount;
		}

		page.tempId = 1;
		for(var i = (setPageCount * page.showCount) + 1; i <= page.allPage; i++) {
			if(i > page.allPage) {
				break;
			}
			if(page.tempId > page.showCount) {
				break;
			}

			// 当前页
			if(currentPage === i) {

				// 当前页样式
				var span = "<span class='item disabled num '>" + i + "</span>";
				num += span;

			} else {
				var a = "<a class='item active' data-id='" + i + "'>" + i + "</a>";
				num += a;
			}

			page.tempId++;
		}

		// 上一页
		if(currentPage === 1) {

			prev = "<span class='item disabled'>" + page.prevText + "</span>";
		} else {
			prev = "<a class='item active' data-id='" + (currentPage - 1) + "'>" + page.prevText + "</a>";
		}

		// 下一页
		if(currentPage === page.allPage) {

			next = "<span class='item disabled'>" + page.nextText + "</span>";
		} else {
			next = "<a class='item active' data-id='" + (currentPage + 1) + "'>" + page.nextText + "</a>";
		}

		// 第一页 
		if(currentPage === 1) {

			first = "<span class='item disabled'>" + page.firstText + "</span>";
		} else {
			first = "<a class='item active' data-id='" + 1 + "'>" + page.firstText + "</a>";
		}

		//  最后一页
		if(currentPage === page.allPage) {

			last = "<span class='item disabled'>" + page.lastText + "</span>";
		} else {
			last = "<a class='item active' data-id='" + page.allPage + "'>" + page.lastText + "</a>";
		}

		// 前一组
		if(setPageCount > 0) {
			var temp_prev_num = (setPageCount - 1) * page.showCount + 1;
			prevGroup = "<a class='item active' data-id='" + temp_prev_num + "'>" + page.prevGroupText + "</a>";

		} else {
			prevGroup = "";
		}

		// 下一组
		if((setPageCount + 1) < page.groupPage) {
			var temp_next_num = (setPageCount + 1) * page.showCount + 1;
			nextGroup = "<a class='item active ' data-id='" + temp_next_num + "'>" + page.nextGroupText + "</a>";

		} else {
			nextGroup = "";
		}
		
		// 跳转页
		if(page.isShowSkip){	
			skipBtn="<input type='text' class='skip-txt' value='"+currentPage+"' /> <input type='button' class='skip-btn' value='跳转' />";																
		}

		// 总页数
		if(page.isShowCount){
			CountNum="<span class='count-num'>总共<strong>"+page.allPage+"</strong>页</span>";
		}

		return GetAllText(first, prev, prevGroup, num, nextGroup, next, last,skipBtn,CountNum);
	}

	// 连接文本
	function GetAllText(first, prev, prevGroup, num, nextGroup, next, last,skipBtn,CountNum) {
		var allText = "";
		// 1
		if(page.isShowFirstLast) {
			allText += first;
		}

		// 2
		if(page.isShowPrevNext) {
			allText += prev;

		}

		// 3
		if(page.isShowPrevNextGroup) {
			allText += prevGroup;

		}

		// 4
		if(page.isShowNumber) {
			allText += num;

		}

		// 3
		if(page.isShowPrevNextGroup) {
			allText += nextGroup;

		}
		// 2
		if(page.isShowPrevNext) {
			allText += next;

		}
		// 1
		if(page.isShowFirstLast) {
			allText += last;
		}

		// 跳转页
		if(page.isShowSkip){
				allText += skipBtn;
		}
		
		// 总共页
		if(page.isShowCount){
				allText += CountNum;
		}
		
		return allText;
	}

	// 返回结果
	return {

		init: _init,
		pageObj: page,
		create: _create

	}

})(window.jQuery || window.Zepto);