// 商品详情页JS

// 引入样式
require('./detail.css');
// 引入顶部导航
require('page/common/nav/index.js');
// 引入头部搜索框
require('page/common/header/index.js');
// 引入通用工具类
var _mall = require('util/mall.js');
// 引入商品service
var _product = require('service/product-service.js');
// 引入购物车service
var _cart = require('service/cart-service.js');
// 引入渲染页面
var templateIndex = require('./detail.string');

var page = {
	// 获取URL中的参数
	data : {
		productId : _mall.getUrlParam('productId') || ''
	},
	// 初始化页面
	init : function() {
		this.onLoad();
		this.bindEvent();
	},
	// 加载页面数据
	onLoad : function() {
		// 如果productId为空，则直接跳转到主页
		if (!this.data.productId) {
			_mall.goHome();
		}
		// 加载商品详情信息
		this.loadDetail();
	},
	// 页面事件的绑定
	bindEvent : function() {
		var _this = this;
		// 当鼠标移入图片列表时，替换对应的大图
		$(document).on('mouseenter', '.p-img-item', function() {
			var imageUrl = $(this).find('.p-img').attr('src');
			$('.main-img').attr('src', imageUrl);
		});
		// 商品数量的加减按钮操作
		$(document).on('click', '.p-count-btn', function() {
			var type = $(this).hasClass('plus') ? 'plus' : 'minus';// 获取点击类型
			var $pCount = $('.p-count');// 购买数量
			var currCount = parseInt($pCount.val());// 当前数量
			var minCount = 1;// 最小数量
			var maxCount = _this.data.detailInfo.stock || 1;// 最大数量

			if (type === 'plus') {// 如果点击的是'+'
				$pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
			} else if (type === 'minus') {// 如果点击的是'-'
				$pCount.val(currCount > minCount ? currCount - 1 : minCount);
			}
		});
		// 加入购物车按钮
		$(document).on('click', '.cart-add', function() {
			_cart.addToCart({
				productId : _this.data.productId,
				count : $('.p-count').val()
			}, function(res) {
				window.location.href = './result.html?type=cart-add';
			}, function(errMsg) {
				_mall.errorTips(errMsg);
			});
		});
	},
	// 加载商品详情
	loadDetail : function() {
		var html = '';
		var _this = this;
		// 加载loading
		$('.page-wrap').html('<div class="loading"></div>');
		// 请求后台数据
		_product.getProductDetail(_this.data.productId, function(res) {
			// 过滤数据
			_this.filter(res);
			// 将返回的数据进行缓存
			_this.data.detailInfo = res;
			// 渲染html
			html = _mall.renderHtml(templateIndex, res);
			$('.page-wrap').html(html);
		}, function(errMsg) {
			$('.page-wrap').html('<p class="err-tip">此商品没有找到</p>');
		});
	},
	// 将传入的数据进行过滤处理
	filter : function(data) {
		// subImags返回的是以','分割的数据，因此需要转换成数组才能使用hogan渲染
		data.subImages = data.subImages.split(',');
	}
};

$(function() {
	page.init();
});