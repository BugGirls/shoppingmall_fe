// 用户中心JS

// 引入样式
require('./user-center.css');
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
var templateIndex = require('./user-center.string');

// 页面逻辑部分
var page = {
	init : function() {
		this.onLoad();
	},
	// 事件绑定，提交登录
	onLoad : function() {
		// 初始化侧边导航
		navSide.init({
			name : 'user-center'
		});
		// 加载用户信息
		this.loadUserInfo();
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
	}
};

// 页面加载时进行初始化
$(function() {
	page.init();
});
