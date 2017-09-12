// 订单列表JS

// 引入样式
require('./order-list.css');
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
var templateIndex = require('./order-list.string');
// 引入通用分页
var Pagination = require('util/pagination/pagination.js');

// 页面逻辑部分
var page = {
	data : {
		listParam : {
			pageNum : 1,
			pageSize : 10
		}
	},
	// 初始化页面
	init : function() {
		this.onLoad();
	},
	// 加载页面
	onLoad : function() {
		// 初始化侧边导航
		navSide.init({
			name : 'order-list'
		});
		// 加载订单列表
		this.loadOrderList();
	},
	// 加载订单列表
	loadOrderList : function() {
		var _this 			= this;
		var orderListHtml 	= '';
		var $listCon 		= $('.order-list-con');

		// 加载loading图标
		$listCon.html('<div class="loading"></div>');
		// 请求接口，获取订单列表
		_order.getOrderList(this.data.listParam, function(res) {
			// 处理数据
			_this.dataFilter(res);
			// 渲染html
            orderListHtml = _mall.renderHtml(templateIndex, res);
            $listCon.html(orderListHtml);
            // 加载分页信息
            _this.loadPagination({
            	hasPreviousPage : res.hasPreviousPage,
            	prePage 		: res.prePage,
            	hasNextPage 	: res.hasNextPage,
            	nextPage 		: res.nextPage,
            	pageNum 		: res.pageNum,
            	pages 			: res.pages
            });
		}, function(errMsg) {
			$listCon.html('<p class="err-tip">加载订单失败，请刷新后重试</p>');
		});
	},
	// 处理数据
	dataFilter : function(data) {
		// 判断返回的分页信息中list列表是否有数据
		data.isEmpty = !data.list.length;// 如果list列表没有值，则isEmpty为true
	},
	// 加载分页信息
	loadPagination : function(pageInfo) {
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination());
		this.pagination.render($.extend({}, pageInfo, {
			container : $('.pagination'),
			onSelectPage : function(pageNum) {
				_this.data.listParam.pageNum = pageNum;
				_this.loadOrderList();
			}
		}));
	}
};

// 页面加载时进行初始化
$(function() {
	page.init();
});
