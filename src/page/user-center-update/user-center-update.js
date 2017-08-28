// 修改个人信息JS

// 引入样式
require('./user-center-update.css');
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
// 引入渲染页面
var templateIndex = require('./user-center-update.string');

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
			name : 'user-center'
		});
		// 加载用户信息
		this.loadUserInfo();
	},
	// 修改按钮的事件绑定
	bindEvent : function() {
		var _this = this;
		// 点击提交按钮后的动作
		$(document).on('click', '.btn-submit', function() {
		// $('.btn-submit').click(function() {
			// 获取修改的信息
			var userInfo = {
				phone 	 : $.trim($('#phone').val()),
				email 	 : $.trim($('#email').val()),
				question : $.trim($('#question').val()),
				answer 	 : $.trim($('#answer').val())
			};
			var validateResult = _this.formValidate(userInfo);
			if (validateResult.status) {
				_user.updateInfo(userInfo, function(res, msg) {
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
			userHtml = _mall.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
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
		if (!_mall.validate(formData.phone, 'require')) {
			result.msg = '手机号不能为空';
			return result;
		}
		if (!_mall.validate(formData.phone, 'phone')) {
			result.msg = '手机号格式不正确';
			return result;
		}
		if (!_mall.validate(formData.email, 'require')) {
			result.msg = '邮箱不能为空';
			return result;
		}
		if (!_mall.validate(formData.email, 'email')) {
			result.msg = '邮箱格式不正确';
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

// 页面加载时进行初始化
$(function() {
	page.init();
});
