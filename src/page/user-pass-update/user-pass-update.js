// 修改个人密码JS

// 引入样式
require('./user-pass-update.css');
// 引入顶部导航
require('page/common/nav/index.js');
// 引入头部搜索框
require('page/common/header/index.js');
// 引入侧边导航
var navSide = require('page/common/nav-side/index.js');
// 引入通用工具类
var _mall = require('util/mall.js');
// 引入用户service
var _user = require('service/user-service.js');

// 页面逻辑部分
var page = {
	init : function() {
		this.onLoad();
		this.bindEvent();
	},
	// 加载初始化信息
	onLoad : function() {
		// 初始化侧边导航
		navSide.init({
			name : 'pass-update'
		});
		// 加载用户信息
		this.loadUserInfo();
	},
	// 提交按钮的事件绑定
	bindEvent : function() {
		var _this = this;
		// 点击提交按钮后的动作
		$('.btn-submit').on('click', function() {
			var passInfo = {
				password 	 	 : $.trim($('#password').val()),
				passwordNew 	 : $.trim($('#password-new').val()),
				passwordConfirm  : $.trim($('#password-confirm').val())
			};
			var validateResult = _this.formValidate(passInfo);
			if (validateResult.status) {
				_user.updatePass({
					passwordOld : passInfo.password,
					passwordNew : passInfo.passwordNew
				}, function(res, msg) {
					_mall.successTips(msg);
					window.location.href = './user-center.html';
				}, function(errMsg) {
					_mall.errorTips(errMsg);
				});
			} else {
				_mall.errorTips(validateResult.msg);
			}
		});
	},
	// 加载用户信息
	loadUserInfo : function() {
		var userHtml = '';
		_user.getUserInfo(function(res) {
			// nothing to do
		}, function(errMsg) {
			_mall.errTips(errMsg);
		});
	},
	// 表单验证，如果合法则返回正确的提示信息，如果不合法则返回错误的提示信息
	formValidate : function(formData) {
		var result = {
			status 	: false,
			msg		: ''
		};
		if (!_mall.validate(formData.password, 'require')) {
			result.msg = '原密码不能为空';
			return result;
		}
		if (!_mall.validate(formData.passwordNew, 'require')) {
			result.msg = '新密码不能为空';
			return result;
		}
		if (formData.passwordNew.length < 6) {
			result.msg = "新密码的长度不能少于6位";
			return result;
		}
		if (formData.passwordNew !== formData.passwordConfirm) {
			result.msg = '两次输入的密码不一致';
			return result;
		}
		// 验证通过，返回正确结果
		result.status = true;
		result.msg    = '验证通过';
		return result;
	}
};

// 页面加载时进行初始化
$(function() {
	page.init();
});
