  
  var bd_map=(function($){
  	
  
    var _init=function(id,_l,_r,_gsname,_gsaddr){
    	
	    	var map = new BMap.Map(id);
	
	    var point = new BMap.Point(_l,_r );
	    map.centerAndZoom(point, 14);
	    // 添加带有定位的导航控件
	    var navigationControl = new BMap.NavigationControl({
	        // 靠左上角位置
	        anchor: BMAP_ANCHOR_TOP_LEFT,
	        // LARGE类型
	        type: BMAP_NAVIGATION_CONTROL_LARGE,
	        // 启用显示定位
	        enableGeolocation: true
	    });
	
	    map.addControl(navigationControl);
	
	    var mapType1 = new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP] });
	    var mapType2 = new BMap.MapTypeControl({ anchor: BMAP_ANCHOR_TOP_RIGHT });
	
	    var marker = new BMap.Marker(point);  // 创建标注
	    map.addOverlay(marker);              // 将标注添加到地图中
	
	    var overView = new BMap.OverviewMapControl();
	    var overViewOpen = new BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT });
	
	    map.addControl(mapType1);          //2D图，卫星图
	    map.addControl(mapType2);          //左上角，默认地图控件
	    // map.setCurrentCity("北京");        //由于有3D图，需要设置城市哦
	    //  map.addControl(overView);          //添加默认缩略地图控件
	    ///map.addControl(overViewOpen);
	
	    //$().mouseleave
	
	    var opts = {
	        width: 200,     // 信息窗口宽度
	        height: 60,     // 信息窗口高度
	        title:"名称:"+_gsname, // 信息窗口标题
	        enableMessage: true, //设置允许信息窗发送短息
	        message: "有什么问题请联系我们，我们会用心帮你解决...."
	    }
	    var infoWindow = new BMap.InfoWindow("地址:"+_gsaddr, opts);  // 创建信息窗口对象 
	    marker.addEventListener("click", function () {
	        map.openInfoWindow(infoWindow, point); //开启信息窗口
	    });
	
	    map.openInfoWindow(infoWindow, point); //开启信息窗口
	    map.enableScrollWheelZoom(false); //自动缩放
	
	
	
	    //    function showInfo(e) {
	
	    //        if (confirm("纬度:"+e.point.lng + ", " + "经度:"+e.point.lat+", 是否重新设置地图中心点？")) {
	
	
	    //            document.getElementById("l_point").value = e.point.lng;
	    //            document.getElementById("r_point").value = e.point.lat;
	    //            $("#Button1").click();
	    //        }
	    //    }
	    //  map.addEventListener("click", showInfo);
    
    }
    
    
	return {
		init:_init
	}


  })(window.jQuery);