// 通用操作结果提示页JS

// 引用样式
require('./index.css');
// 引入简单导航页
var navSide = require('page/common/nav-simple/index.js');
// 引入通用工具类
var _mall = require('util/mall.js');

$(function() {
	var type = _mall.getUrlParam('type') || 'default';
	// 显示对应的提示信息
	var $element = $('.' + type + '-success');
	$element.show();
})