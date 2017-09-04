// 商品列表页JS

// 引入样式
require('./list.css');
// 引入顶部导航
require('page/common/nav/index.js');
// 引入头部搜索框
require('page/common/header/index.js');
// 引入通用工具类
var _mall = require('util/mall.js');
// 引入商品service
var _product = require('service/product-service.js');
// 引入渲染页面
var templateIndex = require('./list.string');
// 引入通用分页
var Pagination = require('util/pagination/pagination.js');

var page = {
	// 获取URL中的参数
	data : {
		listParam : {
			keyword 	: _mall.getUrlParam('keyword') || '',
			categoryId 	: _mall.getUrlParam('categoryId') || '',
			orderBy 	: _mall.getUrlParam('orderBy') || 'default',
			pageNum 	: _mall.getUrlParam('pageNum') || 1,
			pageSize 	: _mall.getUrlParam('pageSize') || 3
		}
	},
	// 初始化页面
	init : function() {
		this.onLoad();
		this.bindEvent();
	},
	// 加载页面数据
	onLoad : function() {
		this.loadList();
	},
	// 页面事件的绑定
	bindEvent : function() {
		var _this = this;
		// 默认排序和价格排序按钮的点击事件
		$('.sort-item').click(function() {
			var $this = $(this);
			// 当点击排序按钮时，需要将当前页数置为第一页
			_this.data.listParam.pageNum = 1;
			if ($this.data('type') === 'default') {// 如果data-type的值为default，说明点击的是默认排序
				if ($this.hasClass('active')) {// 如果已经是active样式，则直接返回，不进行任何操作
					return;
				} else {// 不是active样式
					$this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
					// 重置传入后台数据中排序的方式
					_this.data.listParam.orderBy = 'default';
				}
			} else if ($this.data('type') === 'price') {// 如果data-type的值为price，说明点击的是价格排序
				$this.addClass('active').siblings('.sort-item').removeClass('active asc desc');

				// 对升序降序的处理
				if (!$this.hasClass('asc')) {
					$this.addClass('asc').removeClass('desc');
					_this.data.listParam.orderBy = 'price_asc';
				} else {
					$this.addClass('desc').removeClass('asc');
					_this.data.listParam.orderBy = 'price_desc';
				}
			}
			// 重新加载商品列表
			_this.loadList();
		});
	},
	// 加载list数据
	loadList : function() {
		var listParam = this.data.listParam;
		var listHtml = '';
		var _this = this;

		// 每次请求后台时加载loading图标
		$('.p-list-con').html('<div class="loading"></div>');
		// 如果categoryId不为空，则删除keyword参数只传categoryId参数到后台，反之亦然
		listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
		// 请求后台
		_product.getProductList(listParam, function(res) {// res为返回的分页信息
			// 渲染html，只传入res中的list数据
			listHtml = _mall.renderHtml(templateIndex, {
				list : res.list
			});
			$('.p-list-con').html(listHtml);
			// 加载分页信息
			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
			});
		}, function(errMsg) {
			_mall.errorTips(errMsg);
		});
	},
	// 加载分页信息
	loadPagination : function(pageInfo) {
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination());
		this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum) {
            	_this.data.listParam.pageNum = pageNum;
            	_this.loadList();
            }
        }));
	}
};

$(function() {
	page.init();
});