//  table 鼠标hover样式tooltip
//
//$("table").on("mouseenter", ".hover-tooltip", function(e) {
//	$(this).css("text-align", "center");
//	var div = document.createElement("div");
//	div.className = "tooltip-cont";
//	div.innerText = $(this).text();
//	div.style.border = "1px solid #ddd";
//	div.style.borderRadius = "5px";
//	div.style.position = "absolute";
//	//div.style.marginLeft=,$(this).outerWidth()/2+"px";		
//	div.style.background = "#fff";
//	div.style.padding = "3px 10px ";
//	div.style.lineHeight = "30px";
//	div.style.boxShadow = "2px 2px 5px #ddd,-2px 0px 5px #ddd";
//	div.style.zIndex = "99999";
//	div.style.width = "auto";
//	
//	$(this).append(div);
//	
//	return false;
//
//});
//
//$("table").on("mouseleave", ".hover-tooltip", function() {
//
//	$(this).find(".tooltip-cont").remove();
//});