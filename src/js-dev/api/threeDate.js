/*
 三级地址
 * 
 * <div class="form-group form-inline">
 * 
	<label for="">year</label>

	<select class="form-control" name="" id="date-year" data-start="1970" data-text="==选择年份==">

	</select>
	<label for="">Month</label>

	<select class="form-control" name="" id="date-month" data-text="==选择月份==">

	</select>
	<label for="">date</label>

	<select class="form-control" name="" id="date-day" data-text="==选择天数==">

	</select>

	</div>
 * 
 * */

var threeDate = (function() {

	var _init = function() {

		var _year = document.getElementById("date-year");
		var _month = document.getElementById("date-month");
		var _day = document.getElementById("date-day");

		createYear();
		
		_year.onchange = function() {
			var v=_year.value||"";
			
			if(v==""){
				createMonth(0);
				createday(0);
			}else{
				createMonth(12);
				createday(0);
			}
			
		}

		_month.onchange = function() {
			var y = _year.value || "";
			if(y == "") {
				return;
			}
			var m = _month.value || "";
			if(m == "") {
					createday(0);
				return;
			}
			y = Number(y);
			m = Number(m);
			var d = 0;
			switch(m) {
				case 1:
					d = 31;
					break;
				case 2:
					d = 30;
					if(y % 400 == 0 || (y % 4 == 0 && y % 100 != 0)) {
						//document.write(num + "是闰年。");
						d = 29;
					} else {
						//document.write(num + "是平年。");
						d = 28;
					}

					break;
				case 3:
					d = 31;
					break;
				case 4:
					d = 30;
					break;
				case 5:
					d = 31;
					break;
				case 6:
					d = 30;
					break;
				case 7:
					d = 31;
					break;
				case 8:
					d = 31;
					break;
				case 9:
					d = 30;
					break;
				case 10:
					d = 31;
					break;
				case 11:
					d = 30;
					break;
				case 12:
					d = 31;
					break;
			}

			createday(d);
		

		}

		function createYear() {

			var fragment = document.createDocumentFragment();

			var startid = _year.getAttribute("data-start") || 1970;
			var _yearName= _year.getAttribute("data-text") || "==选择年份==";
			startid = Number(startid);
			startid = isNaN(startid) ? 1970 : startid;

			var fragment = document.createDocumentFragment();
			var endId = new Date().getFullYear();

			var _notOption = document.createElement("option");
			_notOption.innerText = _yearName;
			_notOption.value = "";
			_notOption.selected = "selected";
			fragment.appendChild(_notOption);

			for(; startid <= endId; endId--) {
				var _option = document.createElement("option");
				_option.innerText = endId;
				_option.value = endId;
				fragment.appendChild(_option);

			}
			_year.innerHTML = "";
			_year.appendChild(fragment);

		}
	
		function createMonth(max) {
			
			//max=max.constructor===Number?max:12;
			var fragment = document.createDocumentFragment();
			var _monthName= _month.getAttribute("data-text") || "==选择月份==";
			var _notOption = document.createElement("option");
			_notOption.innerText = _monthName;
			_notOption.value = "";
			_notOption.selected = "selected";
			fragment.appendChild(_notOption);
			for(var m = 0; m < max; m++) {
				var _option = document.createElement("option");
				_option.innerText = m + 1;
				_option.value = m + 1;
				fragment.appendChild(_option);

			}
			_month.innerHTML = "";
			_month.appendChild(fragment);

		}

		function createday(max) {

			var fragment = document.createDocumentFragment();
			var _dayName= _day.getAttribute("data-text") || "==选择天数==";
			var _notOption = document.createElement("option");
			_notOption.innerText = _dayName;
			_notOption.value = "";
			_notOption.selected = "selected";
			fragment.appendChild(_notOption);
			for(var d = 0; d < max; d++) {
				var _option = document.createElement("option");
				_option.innerText = d + 1;
				_option.value = d + 1;
				fragment.appendChild(_option);

			}
			_day.innerHTML = "";
			_day.appendChild(fragment);

		}

	}
	
	return {
		init:_init
	}
	
})();