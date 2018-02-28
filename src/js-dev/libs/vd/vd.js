/* 	
   作者：724485868@qq.com
   时间：2017-10-08
   描述：表单验证    
 version:1.0.0
*/

var vd = (function($) {

	var Obj = function(formName) {

		this.formName = typeof formName === "undefined" ? ".form" : formName,

			this.init = function() {

				this.addErrorStyle(false, true);
				this.checkObj(this.formName);
				this.addVidation();
			},

			this.disabled = function(obj) {

				$(obj).attr("disabled", "disabled");

			},

			this.enabled = function(obj) {

				$(obj).removeAttr("disabled");
			},

			this.arrs = [],

			this.compareEmit = function(pName, compareName, value) {
				var el = $("" + pName + " [name=" + compareName + "]");
				if($.trim(el.val()) === "") {
					return;
				}
				for(var i = 0; i < this.arrs.length; i++) {
					if($.trim(this.arrs[i].elName) === $.trim(compareName)) {
						$(el).trigger("keyup");
						break;
					}

				}

			},

			this.oldRemoteValue = "",

			this.checkObj = function(formName) {
				if(typeof formName === "undefined") {
					formName = ".form";
				};

				this.arrs = [];
				$this = this;

				$("" + formName + " .vd-item").each(function() {
					var name = $(this).attr("name");
					var v = $(this).val();
					var req_msg = $(this).attr("vd-req-msg");
					var pattern = $(this).attr("vd-pattern");
					var pattern_msg = $(this).attr("vd-pattern-msg");

					// type=radio 单选框
					var _rd = $(this).attr("vd-rd");
					var _rd_ok = typeof $(this).attr("vd-rd-ok") !== "undefined" ? true : false;

					// type=checkbox 复选框
					var _ck = $(this).attr("vd-ck");
					var _ck_ok = typeof $(this).attr("vd-ck-ok") !== "undefined" ? true : false;

					var errorMsg = "";
					if(typeof req_msg !== "undefined" && v === "") {
						errorMsg = req_msg;
					} else if(typeof pattern_msg !== "undefined") {
						var reg = new RegExp(pattern, "i");
						if(!reg.test(v)) {
							errorMsg = pattern_msg;
						}

					} else {
						errorMsg = "";

					}

					if(name !== "" && name !== "vd-btn") {
						var obj = {};
						obj.pName = formName; //表单name
						obj.elName = name; // 元素name
						obj.errorMsg = errorMsg; // 验证错误提示信息
						obj.val = v;
						obj.el = this; // document.forms[formName][name];
						obj.bl = false;
						if(typeof _rd !== "undefined") {
							obj.rd = "rd"; // type=radio 单选框标记属性
							obj.bl = _rd_ok;
						}
						if(typeof _ck !== "undefined") {

							obj.bl = _ck_ok;
						}

						$this.arrs.push(obj);

					}
				});

			},

			this.addVidation = function() {

				for(var i = 0; i < this.arrs.length; i++) {
					var _obj = this.arrs[i];
					var el = _obj.el; // document.forms[_obj.pName][_obj.elName];
					var $this = this;
					$(el).on("keyup", _obj, function(event) {
						$this.checkElement(event.data, event.target, true, true);
						$this.addVdBtnStyle(el);
					});

					var remote = el.getAttribute("vd-remote");
					if(remote === null) {
						$(el).on("change", _obj, function(event) {
							$this.checkElement(event.data, event.target, true, true);
							$this.addVdBtnStyle(el);
						});
					}

				}

			},

			this.checkElement = function(_obj2, el, isRemote, isRadio) {

				// not vd 不做验证
				var _vd_not = el.getAttribute("vd-ck-not");

				// req
				var _req = el.getAttribute("vd-req");
				var _req_msg = el.getAttribute("vd-req-msg");

				// pattern
				var _pattern = el.getAttribute("vd-pattern");
				var _pattern_msg = el.getAttribute("vd-pattern-msg");

				// remote
				var _remote = el.getAttribute("vd-remote");
				var _remote_msg = el.getAttribute("vd-remote-msg");
				var _remote_length = el.getAttribute("vd-remote-length");

				// compare 
				var _compare = el.getAttribute("vd-compare");
				var _compare_msg = el.getAttribute("vd-compare-msg");
				var _compare_emit = el.getAttribute("vd-compare-emit"); // 触发目标对象

				// type=checkbox 复选框
				var _ck = el.getAttribute("vd-ck");

				var _ck_true = el.getAttribute("vd-ck-true"); // 选中的值
				var _ck_false = el.getAttribute("vd-ck-false"); // 没选中的值
				var _ck_msg = el.getAttribute("vd-ck-msg");

				// type=radio 单选框
				var _rd = el.getAttribute("vd-rd");
				var _rd_ok = el.getAttribute("vd-ck-ok") ? true : false;
				var _rd_msg = el.getAttribute("vd-rd-msg");

				// 当前的值
				var v = $.trim(el.value);

				// 单选
				if(_rd !== null) {
					var _rd_name = $(el).attr("name");
					var _re_length = $("" + _obj2.pName + "  [name=" + _rd_name + "]:checked").length;

					// 没有选择
					if(_re_length <= 0) {

						var p = $(el).parents(".vd-box");
						$(p).addClass("vd-error vd-rd ");
						$(p).removeClass("vd-ok");
						$(el).addClass("vd-error");

						// 遍历选择项 设为false
						for(var i = 0; i < this.arrs.length; i++) {
							if($.trim(this.arrs[i].elName) === $.trim(_obj2.elName)) {
								this.arrs[i].rd_req = false; // radio组是否为空  false为空
								_obj2.bl = false;
								_obj2.val = v;
								_obj2.errorMsg = _rd_msg;
							}
						}
						//  流程终止
						return;
					} else {

						_obj2.val = v;
						var p = $(el).parents(".vd-box");
						$(p).removeClass("vd-error vd-rd ");
						$(el).removeClass("vd-error");
						$(p).addClass("vd-ok");

						// 选择了 流程以下走
					}

					// false 点击提交不触发
					if(isRadio) {

						// 遍历选择项 设为false
						for(var i = 0; i < this.arrs.length; i++) {
							if($.trim(this.arrs[i].elName) === $.trim(_obj2.elName)) {
								this.arrs[i].bl = false;
								this.arrs[i].rd_req = true; // radio组是否为空 true不为空
							}
						}

						// 当前项设置为true
						_obj2.bl = true;
						//_obj2.val=v;
						_obj2.errorMsg = "";
					}

					return;
				}

				// 非空验证
				if(_req !== null) {
					if(v === "") {
						_obj2.bl = false;
						_obj2.val = v;
						_obj2.errorMsg = _req_msg;
						var p = $(el).parents(".vd-box");
						$(p).removeClass("vd-pattern vd-remote vd-compare").addClass("vd-error  ");

						$(p).find(".vd-req,.vd-pattern,.vd-remote,.vd-compare").removeClass("vd-error");
						$(p).find(".vd-req").addClass("vd-error").text(_req_msg);
						$(el).addClass("vd-error");
						$(p).removeClass("vd-ok ");

						$(".vd-dep-btn", p).addClass("vd-error").removeClass("vd-ok"); //依赖按钮

						return;
					} else {

						if(isRemote && (!_remote)) { //远程不去比较
							_obj2.errorMsg = "";
							_obj2.val = v;
							_obj2.bl = true;
							var p = $(el).parents(".vd-box");
							$(p).removeClass("vd-error ");

							$(p).find(".vd-req").removeClass("vd-error").text("");
							$(el).removeClass("vd-error");
							$(p).addClass("vd-ok");
							$(".vd-dep-btn", p).removeClass("vd-error").addClass("vd-ok"); //依赖按钮

						}

					}
				}

				// 触发比较对象
				if(_compare_emit !== null) {
					this.compareEmit(_obj2.pName, _compare_emit, v);
				}

				// 正则验证
				if(_pattern !== null && v != "") {

					var reg = new RegExp(_pattern, "i");
					if(!reg.test(v)) {
						_obj2.errorMsg = _pattern_msg;
						_obj2.bl = false;
						_obj2.val = v;
						var p = $(el).parents(".vd-box");
						$(p).addClass("vd-error");

						$(p).find(".vd-req,.vd-pattern,.vd-remote,.vd-compare").removeClass("vd-error");

						$(p).find(".vd-pattern").addClass("vd-error").text(_pattern_msg);
						$(el).addClass("vd-error");
						$(p).removeClass("vd-ok");
						$(".vd-dep-btn", p).addClass("vd-error").removeClass("vd-ok"); //依赖按钮

						return;
					} else {
						_obj2.errorMsg = "";
						_obj2.val = v;
						_obj2.bl = true;
						var p = $(el).parents(".vd-box");
						$(p).removeClass("vd-error ");

						$(p).find(".vd-pattern").removeClass("vd-error").text("");
						$(el).removeClass("vd-error");
						$(p).addClass("vd-ok");
						$(".vd-dep-btn", p).removeClass("vd-error").addClass("vd-ok"); //依赖按钮

					}

				} else {

					if(!_remote) { //远程不去比较

						_obj2.errorMsg = "";
						_obj2.val = v;
						_obj2.bl = true;
						var p = $(el).parents(".vd-box");
						$(p).removeClass("vd-error ");

						$(p).find(".vd-pattern").removeClass("vd-error").text("");
						$(el).removeClass("vd-error");
						$(p).addClass("vd-ok");
						$(".vd-dep-btn", p).removeClass("vd-error").addClass("vd-ok"); //依赖按钮
					}
				}

				// 比较验证
				if(_compare !== null) {

					var _compare_obj = $("" + _obj2.pName + "  [name=" + _compare + "]");

					//var _compare_obj = document.forms[_obj2.pName][_compare];
					if(v !== $(_compare_obj).val()) {
						_obj2.bl = false;
						_obj2.val = v;
						_obj2.errorMsg = _compare_msg;
						var p = $(el).parents(".vd-box");
						$(p).addClass("vd-error");

						$(p).find(".vd-req,.vd-pattern,.vd-remote,.vd-compare").removeClass("vd-error");
						$(p).find(".vd-compare").addClass("vd-error").text(_compare_msg);
						$(p).removeClass("vd-ok");
						$(el).addClass("vd-error");
						$(".vd-dep-btn", p).addClass("vd-error").removeClass("vd-ok");; //依赖按钮

						return;
					} else {

						_obj2.errorMsg = "";
						_obj2.val = v;
						_obj2.bl = true;
						var p = $(el).parents(".vd-box");
						$(p).removeClass("vd-error vd-compare ");

						$(p).find(".vd-compare").removeClass("vd-error").text("");
						$(el).removeClass("vd-error");
						$(p).addClass("vd-ok");
						$(".vd-dep-btn", p).removeClass("vd-error").addClass("vd-ok"); //依赖按钮

					}

				}

				if(_remote != null) {

					var _index = _remote_length != null ? _remote_length : 0;
					if(v.length < _index) {
						_obj2.errorMsg = _remote_msg;
						_obj2.bl = false;
						_obj2.val = v;
						_obj2.remote_bl = _obj2.bl;

						var p = $(el).parents(".vd-box");
						$(p).addClass("vd-error ");

						$(p).find(".vd-req,.vd-pattern,.vd-remote,.vd-compare").removeClass("vd-error");
						$(p).find(".vd-remote").addClass("vd-error").text(_remote_msg);
						$(el).addClass("vd-error");
						$(p).removeClass("vd-ok");
						$(".vd-dep-btn", p).removeClass("vd-ok").addClass("vd-error"); //依赖按钮
					
						return;
					}

					var $remote = this;

					if(isRemote) {

						$.ajax({
							url: _remote + "?rand=" + Math.random() + "&" + el.name + "=" + v,
							type: "get",
							timeout: 10000,
							success: function(data) {
								data = data || false;

								if(typeof data !== "number") {
									var _num = Number(data);
									data = isNaN(_num) ? false : _num;
								}

								if(!data) {

									$remote.remoteFunError(_obj2, el, _remote_msg);
									$remote.addVdBtnStyle(el);
									return;
								} else {

									$remote.remoteFunOk(_obj2, el);
									$remote.addVdBtnStyle(el);

								}
							},
							error: function(data) {
								$remote.remoteFunError(_obj2, el, _remote_msg);

								return;
							}

						});

					} else {

						if(_obj2.bl) {
							$remote.remoteFunOk(_obj2, el);
							$remote.addVdBtnStyle(el);
						} else {
							$remote.remoteFunError(_obj2, el, _remote_msg);
							$remote.addVdBtnStyle(el);
						}
					}

				}

				// 复选框
				if(_ck !== null) {
					if(el.checked) {
						_obj2.errorMsg = "";
						_obj2.val = _ck_true !== null ? _ck_true : 0;
						_obj2.bl = true;
						if(_vd_not===null) {
							
							var p = $(el).parents(".vd-box");
							$(p).removeClass("vd-error  ");
							$(el).removeClass("vd-error");
							$(p).addClass("vd-ok");
							$(".vd-dep-btn", p).removeClass("vd-error").addClass("vd-ok"); //依赖按钮
						}else{
							_obj2.bl = true;
						}

					} else {
						_obj2.bl = false;
						_obj2.val = _ck_false !== null ? _ck_false : 0;
						_obj2.errorMsg = _ck_msg;
						if(_vd_not ===null) {
							
							var p = $(el).parents(".vd-box");
							$(p).addClass("vd-error vd-ck ");
							$(p).removeClass("vd-ok");
							$(el).addClass("vd-error");
							$(".vd-dep-btn", p).addClass("vd-error").removeClass("vd-ok"); //依赖按钮	
						}else{
						_obj2.bl = true;	
						}

						return;

					}

				}

			},

			this.isSuccess = function(successFun, errorFun) {

				// 添加错误样式
				this.addErrorStyle(false, false);

				// 是否全部验证成功
				var baseBl = true;
				var arr_rd = {};
				for(var i = 0; i < this.arrs.length; i++) {
					var _obj = this.arrs[i];

					// 单选按钮
					if(_obj.rd) {

						if(_obj.rd_req === false) {
							errorFun(_obj);
							return baseBl = false;
						}

					}
					// 非单选按钮
					else {

						if(_obj.bl === false) {

							errorFun(_obj);
							return baseBl = false;
						}
					}

				}

				if(baseBl) {
					var newObj = this.getNewObjs();
					successFun(newObj);
				}
				return true;
			},

			this.getNewObjs = function() {

				// 是否全部验证成功
				var newObj = {};
				for(var i = 0; i < this.arrs.length; i++) {
					var obj = this.arrs[i];
					if(obj.bl) {
						newObj[obj.elName] = obj.val;
					}

				}

				return newObj;

			},

			this.getObj = function(name) {

				// 是否全部验证成功
				var obj = {}
				for(var i = 0; i < this.arrs.length; i++) {

					if($.trim(name) === $.trim(this.arrs[i].elName)) {

						obj = this.arrs[i];
						break;
					}

				}

				return obj;

			},

			this.addErrorStyle = function(isRemote, isRadio) {

				for(var i = 0; i < this.arrs.length; i++) {
					var obj = this.arrs[i];
					var el = obj.el;
					this.checkElement(obj, el, isRemote, isRadio); // false 不去remote验证    isRadio不做比较
					this.addVdBtnStyle(el); // 添加vd-btn提交按钮样式
				}
			},

			this.remoteFunOk = function(_obj2, el) {
				_obj2.errorMsg = "";
				_obj2.bl = true;
				_obj2.val = $(el).val();
				_obj2.remote_bl = _obj2.bl;

				var p = $(el).parents(".vd-box");
				$(p).removeClass("vd-error ");

				$(p).find(".vd-remote").removeClass("vd-error").text("");
				$(el).removeClass("vd-error");
				$(p).addClass("vd-ok");
				$(".vd-dep-btn", p).removeClass("vd-error").addClass("vd-ok"); //依赖按钮

			},

			this.remoteFunError = function(_obj2, el, _remote_msg) {
				_obj2.errorMsg = _remote_msg;
				_obj2.bl = false;
				_obj2.val = $(el).val();
				_obj2.remote_bl = _obj2.bl;

				var p = $(el).parents(".vd-box");
				$(p).addClass("vd-error ");

				$(p).find(".vd-req,.vd-pattern,.vd-remote,.vd-compare").removeClass("vd-error");
				$(p).find(".vd-remote").addClass("vd-error").text(_remote_msg);
				$(el).addClass("vd-error");
				$(p).removeClass("vd-ok");
				$(".vd-dep-btn", p).removeClass("vd-ok").addClass("vd-error"); //依赖按钮

			},

			this.vdIsOk = function() {

				// 是否全部验证成功
				var baseBl = true;
				for(var i = 0; i < this.arrs.length; i++) {
					var _obj = this.arrs[i];

					// 单选按钮
					if(_obj.rd) {

						if(_obj.rd_req === false) {
							return baseBl = false;
						}

					}

					// 非单选按钮
					else {

						if(_obj.bl === false) {
							return baseBl = false;
						}
					}

				}

				return baseBl;
			},

			this.addVdBtnStyle = function(el) {

				// 提交按钮
				var p = $(el).parents(this.formName);
				var $vd_btn = $(".vd-btn", p);
				if($vd_btn.length > 0) {

					if(this.vdIsOk()) {
						$vd_btn.removeClass("vd-error").addClass("vd-ok");
					} else {

						$vd_btn.removeClass("vd-ok").addClass("vd-error");
					}
				}
			}

	}

	return {
		create: function(formName) {
			return new Obj(formName);
		}
	};

})(window.Zepto || window.jQuery);