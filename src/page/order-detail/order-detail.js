// 订单详情页JS

// 引入样式
require('./order-detail.css');
// 引入顶部导航
require('page/common/nav/index.js');
// 引入头部搜索框
require('page/common/header/index.js');
// 引入侧边导航
var navSide = require('page/common/nav-side/index.js');
// 引入通用工具类
var _mall = require('util/mall.js');
// 引入用户service
var _order = require('service/order-service.js');
// 引入渲染页面
var templateIndex = require('./order-detail.string');

// 页面逻辑部分
var page = {
	data : {
		orderNo : _mall.getUrlParam('orderNo')
	},
	// 初始化页面
	init : function() {
		this.onLoad();
		this.bindEvent();
	},
	// 加载页面
	onLoad : function() {
		// 初始化侧边导航
		navSide.init({
			name : 'order-list'
		});
		// 加载订单详情信息
		this.loadOrderDetail();
	},
	// 加载订单详情信息
	loadOrderDetail : function() {
		var _this 			= this;
		var orderDetailHtml = '';
		var $content			= $('.content');

		// 加载loading图标
		$content.html('<div class="loading"></div>');
		// 获取订单详情
		_order.getOrderDetail(this.data.orderNo, function(res) {
			// 返回结果的适配
			_this.dataFilter(res);
			// 渲染html
			orderDetailHtml = _mall.renderHtml(templateIndex, res);
			$content.html(orderDetailHtml);
		}, function(errMsg) {
			$content.html('<p class="err-tip>' + errMsg + '</p>');
		});
	},
	// 事件绑定
	bindEvent : function() {
		var _this = this;
		// 取消订单的事件绑定
		$(document).on('click', '.order-cancel', function() {
			if(window.confirm('确认要取消该订单？')){
				_order.cancelOrder(_this.data.orderNo, function(data, res) {
					_mall.successTips(res);
					_this.loadOrderDetail();
				}, function(errMsg) {
					_mall.errorTips(errMsg);
				});
			}
		});
	},
	// 返回结果的适配
	dataFilter : function(data) {
		data.needPay 		= data.status == 10;// status为10表示未支付，订单状态为10返回true，否则返回false
		data.isCancelable 	= data.status == 10;
	}
};

// 页面加载时进行初始化
$(function() {
	page.init();
});
