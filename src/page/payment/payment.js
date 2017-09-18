// 订单支付页JS

// 引入样式
require('./payment.css');
// 引入顶部导航
require('page/common/nav/index.js');
// 引入头部搜索框
require('page/common/header/index.js');
// 引入侧边导航
var navSide = require('page/common/nav-side/index.js');
// 引入通用工具类
var _mall = require('util/mall.js');
// 引入用户service
var _payment = require('service/payment-service.js');
// 引入渲染页面
var templateIndex = require('./payment.string');

// 页面逻辑部分
var page = {
	data : {
		orderNo : _mall.getUrlParam('orderNo')
	},
	// 初始化页面
	init : function() {
		this.onLoad();
	},
	// 加载页面
	onLoad : function() {
		// 加载订单支付信息
		this.loadPaymentInfo();
	},
	// 加载订单详情信息
	loadPaymentInfo : function() {
		var _this 			= this,
			paymentHtml 	= '',
			$pageWrap 		= $('.page-wrap');

		// 加载loading图标
		$pageWrap.html('<div class="loading"></div>');
		_payment.getPaymentInfo(this.data.orderNo, function(res) {
			paymentHtml = _mall.renderHtml(templateIndex, res);
			$pageWrap.html(paymentHtml);
			_this.listenerOrderStatus();
		}, function(errMsg) {
			$pageWrap.html('<p class="err-tip">' + errMsg + '</p>');
		});
	},
	// 轮询监听订单状态
	listenerOrderStatus : function() {
		var _this = this;
		this.paymentTimer = window.setInterval(function() {
			_payment.getPaymentStatus(_this.data.orderNo, function(res) {
				if (res == true) {
					window.location.href = './result.html?type=payment&orderNo=' + _this.data.orderNo;
				}
			}, function(errMsg) {

			});
		}, 5e3);// 每5秒执行一次function方法
	}
};

// 页面加载时进行初始化
$(function() {
	page.init();
});
