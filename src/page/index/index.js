// 主页JS

// 引入主页样式
require('./index.css');
// 引入顶部导航
require('page/common/nav/index.js');
// 引入头部搜索框
require('page/common/header/index.js');
// 引入图片轮播插件
require('util/slider/index.js');
// 引入图片轮播模板
var templateBanner = require('./banner.string');
// 引入通用工具类
var _mall = require('util/mall.js');

$(function() {
	// 渲染banner的html
	var bannerHtml = _mall.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
	// 初始化banner
    var $slider = $('.banner').unslider({
    	dots: true,
    });
    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function() {
    	var forward = $(this).hasClass('prev') ? 'prev' : 'next';
    	$slider.data('unslider')[forward]();
    });
});