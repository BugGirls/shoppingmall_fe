// 通用分页JS

// 引入样式
require('./pagination.css');
// 引入通用工具类
var _mall = require('util/mall.js');
// 引入html模板
var templatePagination = require('./pagination.string');

var Pagination = function() {
	var _this = this;
	this.defaultOption = {
		container 	 : null,
		pageNum 	 : 1,
		pageRange 	 : 3,// 页码显示的范围（2 3 4 ~5~ 6 7 8）
		onSelectPage : null
	};
	// 事件的处理
	$(document).on('click', '.pg-item', function() {
		// 如果点击的为active和disabled的按钮，则直接返回
		if ($(this).hasClass('active') || $(this).hasClass('disabled')) {
			return;
		}
		// data() 方法向被选元素附加数据，或者从被选元素获取数据。
		typeof _this.option.onSelectPage == 'function' ? _this.option.onSelectPage($(this).data('value')) : null;
	});
};

// 渲染分页组件
// prototype 属性使您有能力向对象添加属性和方法，向Pagination对象中添加一个方法render
Pagination.prototype.render = function(userOption) {
	// 合并选项
	// 创建一个空对象{}的目的：先将defaultOption放入空对象，再将userOption放入空对象，
	// 这样不会影响defaultOption和userOption中的数据
	this.option = $.extend({}, this.defaultOption, userOption);
	// 判断option容器（container）是否为合法的jQuery对象
	if (!(this.option.container instanceof jQuery)) {
		return;
	}
	// 如果只有一页，则直接返回一个空对象，不需要显示分页信息
	if (this.option.pages <= 1) {
		return;
	}
	// 渲染分页内容
	// html() 方法返回或设置被选元素的内容 
	this.option.container.html(this.getPaginationHtml());
};

// 渲染分页的html
Pagination.prototype.getPaginationHtml = function() {
	var html = '';
	var pageArray = [];// 存放分页信息
	// start和end分别表示页码开始显示的数据与页码结束显示的数据
	var start  = this.option.pageNum - this.option.pageRange > 0 ? this.option.pageNum - this.option.pageRange : 1;
	var end = this.option.pageNum + this.option.pageRange < this.option.pages ? this.option.pageNum + this.option.pageRange : this.option.pages;
	// 上一页按钮的数据
	pageArray.push({
		name 		: '上一页',
		value 		: this.option.prePage,
		disabled 	: !this.option.hasPreviousPage
	});
	// 数字按钮的处理
	for (var i = start; i <= end; i++) {
		pageArray.push({
			name 	: i,
			value 	: i,
			active 	: (i === this.option.pageNum)
		});
	};
	// 下一页按钮的数据
	pageArray.push({
		name 		: '下一页',
		value 		: this.option.nextPage,
		disabled 	: !this.option.hasNextPage
	});
	// 渲染html模板
	html = _mall.renderHtml(templatePagination, {
		pageArray 	: pageArray,
		pageNum 	: this.option.pageNum,
		pages 		: this.option.pages
	});
	return html;
};

module.exports = Pagination;