// 用户注册页JS

// 引用样式
require('./user-register.css');
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
	// 事件绑定，提交注册
	bindEvent : function() {
		var _this = this;
		// 当输入完成username时，验证username是否存在
		$('#username').blur(function() {
			var username = $.trim($(this).val());
			// 如果username为空，不验证
			if (!username) {
				return;
			}
			// 异步验证用户名是否存在
			_user.checkUsername(username, function(result) {
				formError.hide();
			}, function(errMsg) {
				formError.show(errMsg);
			});
		});
		// 当输入完成emial时，校验email是否存在
		$('#email').blur(function() {
			var email = $.trim($(this).val());
			// 如果email为空，不校验
			if (!email) {
				return;
			}
			// 异步校验邮箱是否存在
			_user.checkEmail(email, function(result) {
				formError.hide();
			}, function(errMsg) {
				formError.show(errMsg);
			});
		});
		// 注册按钮的点击事件
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
			username 		: $.trim($('#username').val()),
            password 		: $.trim($('#password').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),
            phone 			: $.trim($('#phone').val()),
            email 			: $.trim($('#email').val()),
            question 		: $.trim($('#question').val()),
            answer 			: $.trim($('#answer').val())
		};
		var validateResult = this.formValidate(formData);
		if (validateResult.status) {// 验证成功
			// 提交
			_user.register(formData, function(result) {
				formError.hide();
				window.location.href = './result.html?type=register';
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
		if (formData.password.length < 6) {
			result.msg = '密码长度不能少于6位';
			return result;
		}
		if (!_mall.validate(formData.passwordConfirm, 'require')) {
			result.msg = '确认密码不能为空';
			return result;
		}
		if (formData.password !== formData.passwordConfirm) {
			result.msg = '两次输入的密码不一致';
			return result;
		}
		if (!_mall.validate(formData.phone, 'require')) {
			result.msg = '手机号不能为空';
			return result;
		}
		if (!_mall.validate(formData.phone, 'phone')) {
			result.msg = '手机号格式错误';
			return result;
		}
		if (!_mall.validate(formData.email, 'require')) {
			result.msg = '邮箱不能为空';
			return result;
		}
		if (!_mall.validate(formData.email, 'email')) {
			result.msg = '邮箱格式错误';
			return result;
		}
		if (!_mall.validate(formData.question, 'require')) {
			result.msg = '密码提示问题不能为空';
			return result;
		}
		if (!_mall.validate(formData.answer, 'require')) {
			result.msg = '密码提示问题答案不能为空';
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
