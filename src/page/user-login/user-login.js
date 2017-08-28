// 用户登录页JS

// 引用样式
require('./user-login.css');
// 引入简单导航页
require('page/common/nav-simple/index.js');
// 引入通用工具类
var _mall = require('util/mall.js');
// 引入用户service
var _user = require('service/user-service.js');

// 页面逻辑部分
var page = {
	init : function() {
		this.bindEvent();
	},
	// 事件绑定，提交登录
	bindEvent : function() {
		var _this = this;
		// 登录按钮的点击事件
		$('#submit').click(function() {
			_this.submit();
		});
		// 按下回车时，也提交表单
		$('.user-content').keyup(function(e) {
			if (e.keyCode === 13) {
				_this.submit();
			}
		});
	},
	// 提交表单，在页面中并没有表单，而是使用js伪造一个表单
	submit : function() {
		var formData = {
			username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
		};
		var validateResult = this.formValidate(formData);
		if (validateResult.status) {// 验证成功
			// 提交
			_user.login(formData, function(result) {
				formError.hide();
				window.location.href = _mall.getUrlParam('redirect') || './index.html';
			}, function(errMsg) {
				formError.show(errMsg);
			});
		} else {// 验证失败
			// 错误提示
			formError.show(validateResult.msg);
		}
	},
	// 表单验证，如果合法则返回正确的提示信息，如果不合法则返回错误的提示信息
	formValidate : function(formData) {
		var result = {
			status 	: false,
			msg		: ''
		};
		if (!_mall.validate(formData.username, 'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		if (!_mall.validate(formData.password, 'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		// 验证通过，返回正确结果
		result.status = true;
		result.msg    = '验证通过';
		return result;
	}
};

// 表单里的错误提示
var formError = {
	show : function(errMsg) {
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide : function() {
		$('.error-item').hide().find('.err-msg').text('');
	}
};

// 页面加载时进行初始化
$(function() {
	page.init();
});
