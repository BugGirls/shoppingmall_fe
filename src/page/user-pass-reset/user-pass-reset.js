// 用户登录页JS

// 引用样式
require('./user-pass-reset.css');
// 引入简单导航页
require('page/common/nav-simple/index.js');
// 引入通用工具类
var _mall = require('util/mall.js');
// 引入用户service
var _user = require('service/user-service.js');

// 页面逻辑部分
var page = {
	// 存储数据
	data : {
		username 	: '',
		question 	: '',
		answer 		: '',
		token 		: ''
	},
	init : function() {
		this.onLoad();
		this.bindEvent();
	},
	// 初始化显示页面信息
	onLoad : function() {
		// 初始化显示输入用户名界面
		this.loadStepUsername();
	},
	// 事件绑定，提交登录
	bindEvent : function() {
		var _this = this;
		// "输入用户名后下一步"的点击事件
		$('#submit-username').click(function() {
			var username = $.trim($('#username').val());
			if (username) {
				// 点击下一步后"获取密码提示问题"并显示"输入密码提示问题答案"界面
				_user.getQuestion(username, function(res) {
					// 将用户名和密码提示问题暂存
					_this.data.username = username;
					_this.data.question = res;
					// 调用输入密码提示问题答案的一步
					_this.loadStepQuestion();
				}, function(errMsg) {
					formError.show(errMsg);
				});
			} else {
				formError.show('请输入用户名');
			}
		});
		// "输入密码提示问题答案后下一步"的点击事件
		$('#submit-question').click(function() {
			var answer = $.trim($('#answer').val());
			if (answer) {
				// 点击下一步后"获取密码提示问题答案"并显示"输入新密码答案"界面
				_user.checkAnswer({
					username : _this.data.username,
					question : _this.data.question,
					answer 	 : answer
				}, function(res) {
					// 将密码提示问题答案和token暂存
					_this.data.answer = answer;
					_this.data.token = res;
					// 调用输入新密码的一步
					_this.loadStepPassword();
				}, function(errMsg) {
					formError.show(errMsg);
				});
			} else {
				formError.show('请输入密码提示问题答案');
			}
		});
		// "输入新密码后下一步"的点击事件
		$('#submit-password').click(function() {
			var password = $.trim($('#password').val());
			if (password) {
				// 密码长度验证
				if (password.length < 6) {
					formError.show("密码不能少于6位");
					return;
				}
				// 点击"输入新密码"后更改密码
				_user.resetPassword({
					username 	: _this.data.username,
					newPassword : password,
					token 		: _this.data.token
				}, function(res) {
					// 跳转到结果提示页
					window.location.href = "./result.html?type=reset-password";
				}, function(errMsg) {
					formError.show(errMsg);
				});
			} else {
				formError.show('请输入新密码');
			}
		});
	},
	// 加载输入用户名的一步
	loadStepUsername : function() {
		// 隐藏之前提示的错误信息
		formError.hide();
		// 容器显示
		$('.step-username').show();
	},
	// 加载输入密码提示问题答案的一步
	loadStepQuestion : function() {
		// 隐藏之前提示的错误信息
		formError.hide();
		// 容器的切换
		$('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question);
	},
	// 加载输入密码的一步
	loadStepPassword : function() {
		// 隐藏之前提示的错误信息
		formError.hide();
		// 容器的切换
		$('.step-question').hide().siblings('.step-password').show();
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
