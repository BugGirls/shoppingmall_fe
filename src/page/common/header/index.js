// 通用页面头部

// 引入样式
require('./index.css');
// 引入通用工具类
var _mall = require('util/mall.js');

var header = {
	init : function() {
		this.onLoad();
		this.bindEvent();	
	},
	// 当点击搜索按钮时，通过获取URL中的参数，将输入的商品名称进行回填
	onLoad : function() {
		var keyword = _mall.getUrlParam('keyword');
		if (keyword) {
			$('#search-input').val(keyword);
		}
	},
	bindEvent : function() {
		var _this = this;
		// 当输入商品名称后，点击搜索按钮后，做搜索的提交操作
		$('#search-btn').click(function() {
			_this.searchSubmit();
		});
		// 当输入商品名称后，点击回车按钮，也做提交操作
		$('#search-input').keyup(function(e) {
			if (e.keyCode === 13) {// 13是回车键的keyCode
				_this.searchSubmit();
			}
		});
	},
	// 搜索的提交
	searchSubmit : function() {
		var keyword = $.trim($('#search-input').val());
		if (keyword) {// 如果提交的时候keyword有值，正常跳转到list页面
			window.location.href = './list.html?keyword=' + keyword;
		} else {// 如果keyword为空，则跳转到主页
			_mall.goHome();
		}
	},
};

header.init();// 只是内部调用，不需要输出