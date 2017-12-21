//
//
//var pickerSelect=(function(mui){
//	
//	
//			// 	一级选择
//		var _oneSelect=	function oneSelect(selector, data) {
//
//				var userPicker = new mui.PopPicker();
//				userPicker.setData(data);
//
//				var showUserPickerButton = document.querySelector(selector);
//
//				showUserPickerButton.addEventListener('tap', function(event) {
//					userPicker.show(function(items) {
//						event.target.blur();
//						showUserPickerButton.value = items[0].text;
//						showUserPickerButton.setAttribute("data-value", items[0].value);
//						//返回 false 可以阻止选择框的关闭
//						//return false;
//					});
//				}, false);
//
//			}
//
//			// 省份-级联示例
//			var _getParam = function(obj, prop) {
//				return obj[prop] || '';
//			};
//
//			// 	二级选择
//	var _twoSelect=		function twoSelect(selector) {
//
//				//级联示例
//				var cityPicker = new mui.PopPicker({
//					layer: 2
//				});
//				cityPicker.setData(cityData);
//				var showCityPickerButton = document.querySelector(selector);
//
//				showCityPickerButton.addEventListener('tap', function(event) {
//					cityPicker.show(function(items) {
//						event.target.blur();
//						showCityPickerButton.value = _getParam(items[0], 'text') + "-" + _getParam(items[1], 'text');
//						//返回 false 可以阻止选择框的关闭
//						//return false;
//					});
//				}, false);
//
//			}
//
//			// 三级选择
//			var _threeSelect=function threeSelect(selector) {
//
//				//级联示例
//				var cityPicker = new mui.PopPicker({
//					layer: 3
//				});
//				cityPicker.setData(cityData3);
//				var showCityPickerButton = document.querySelector(selector);
//
//				showCityPickerButton.addEventListener('tap', function(event) {
//					cityPicker.show(function(items) {
//						event.target.blur();
//						showCityPickerButton.value = _getParam(items[0], 'text') + "-" + _getParam(items[1], 'text')+ "-" + _getParam(items[2], 'text');
//						//返回 false 可以阻止选择框的关闭
//						//return false;
//					});
//				}, false);
//
//			}
//
//			// 日期选择  class="mui-date" type="datetime,date ,time,month"
//		var _dateSelect=	function dateSelect(dateSelect) {
//
//				dateSelect = dateSelect || ".dateSelect";
//				var btns = $(dateSelect);
//
//				btns.each(function(i, btn) {
//
//					btn.addEventListener('tap', function(event) {
//						var _self = this;
//						this.blur();
//						if(_self.picker) {
//							_self.picker.show(function(rs) {
//								_self.value = rs.text;
//								_self.picker.dispose();
//								_self.picker = null;
//							});
//						} else {
//							var optionsJson = this.getAttribute('data-options') || '{}';
//							var options = JSON.parse(optionsJson);
//							var id = this.getAttribute('id');
//
//							_self.picker = new mui.DtPicker(options);
//							_self.picker.show(function(rs) {
//								_self.value = rs.text;
//
//								_self.picker.dispose();
//								_self.picker = null;
//							});
//						}
//
//					}, false);
//
//				});
//			}
//		
//		
//		return{
//			oneSelect:_oneSelect,
//			twoSelect:_twoSelect,
//			threeSelect:_threeSelect,
//			dateSelect:_dateSelect
//				
//		}
//	
//	
//})(mui);
