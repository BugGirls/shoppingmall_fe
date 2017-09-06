// 购物车页面JS

// 引入样式
require('./cart.css');
// 引入顶部导航
var nav = require('page/common/nav/index.js');
// 引入头部搜索框
require('page/common/header/index.js');
// 引入通用工具类
var _mall = require('util/mall.js');
// 引入购物车service
var _cart = require('service/cart-service.js');
// 引入渲染页面
var templateIndex = require('./cart.string');

var page = {
	data : {
	},
	// 初始化页面
	init : function() {
		this.onLoad();
		this.bindEvent();
	},
	// 加载页面数据
	onLoad : function() {
		// 加载购物车信息
		this.loadCart();
	},
	// 页面事件的绑定
	bindEvent : function() {
		var _this = this;
		// 单个商品的选中或取消选中
		$(document).on('click', '.cart-select', function() {
			var $this = $(this);
			var productId = $this.parents('.cart-table').data('product-id');// 获取页面元素中存放的productId
			// 该商品为选中状态
			if ($this.is(':checked')) {
				_cart.selectProduct(productId, function(res) {
					// 渲染HTML
					_this.renderCart(res);
				}, function(errMsg) {
					_this.showCartError();
				});
			} else {// 该商品没有选中
				_cart.unSelectProduct(productId, function(res) {
					// 渲染HTML
					_this.renderCart(res);
				}, function(errMsg) {
					_this.showCartError();
				});
			}
		});
		// 商品的全选或取消全选
		$(document).on('click', '.cart-select-all', function() {
			var $this = $(this);
			// 全选按钮为选中状态
			if ($this.is(':checked')) {
				_cart.selectAllProduct(function(res) {
					// 渲染HTML
					_this.renderCart(res);
				}, function(errMsg) {
					$('.page-wrap').html('<p class="err-tip">哪里不对了</p>');
				});
			} else {// 全选按钮为非选中状态
				_cart.unSelectAllProduct(function(res) {
					// 渲染HTML
					_this.renderCart(res);
				}, function(errMsg) {
					_this.showCartError();
				});
			}
		});
		// 修改单个商品的数量
		$(document).on('click', '.count-btn', function() {
			var $this = $(this),
				$pCount = $this.siblings('.count-input'),// 获取商品数量输入框对象
				currentCount = parseInt($pCount.val()),// 获取当前输入框中的值
				type = $this.hasClass('plus') ? 'plus' : 'minus',// 获取当前点击的类型
				productId = $this.parents('.cart-table').data('product-id'),// 获取点击的商品id
				minCount = 1,// 商品数量最小值
				maxCount = parseInt($pCount.data('max')),// 商品数量最大值
				newCount = 0;// 需要改变的值

			if (type === 'plus') {// '+'按钮
				if (currentCount >= maxCount) {
					_mall.errorTips('该商品数量已达到上限');
					 return;
				}
				newCount = currentCount + 1;
			} else if (type === 'minus') {// '-'按钮
				if (currentCount <= minCount) {
					 return;
				}
				newCount = currentCount - 1;   
			}

			// 更新购物车中商品的数量
			_cart.updatPruductQuantity({
				productId 	: productId,
				count 		: newCount
			}, function(res) {
				// 渲染HTML
				_this.renderCart(res);
			}, function(errMsg) {
				_this.showCartError();
			});
		});
		// 删除单个商品
		$(document).on('click', '.cart-delete', function() {
			if (window.confirm('确认要删除该商品？')) {
				var productId = $(this).parents('.cart-table').data('product-id');
				_this.deleteCartProduct(productId);
			}
		});
		// 删除选中的商品（多个商品）
		$(document).on('click', '.delete-selected', function() {
			if (window.confirm('确认要删除选中的商品？')) {
				var arrProductIds = [];// 存放选中的商品ID
				var $selectedItem = $('.cart-select:checked');// 选中商品的item
				// 循环获取选中的productIds
				for (var i = 0; i < $selectedItem.length; i++) {
					arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
				}
				if (arrProductIds.length) {
					_this.deleteCartProduct(arrProductIds.join(','));
				} else {
					 _mall.errorTips('您还没有选中要删除的商品');
				}
			}
		});
		// 提交购物车
		$(document).on('click', '.btn-submit', function(){
			// 如果购物车中商品的总价大于0，则进行提交
			if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
				// window.location.href = './order-confirm.html';
				alert("已经提交");
			} else{
                _mall.errorTips('请选择商品后再提交');
            }
		});
	},
	// 加载购物车信息
	loadCart : function() {
		var _this = this;
		// 加载loading
		$('.page-wrap').html('<div class="loading"></div>');
		// 获取购物车信息列表
		_cart.getCartList(function(res) {
			// 渲染HTML
			_this.renderCart(res);
		}, function(errMsg) {
			_this.showCartError();
		});
	},
	// 渲染购物车
	renderCart : function(data) {
		// 过滤数据，判断data中的数据是否为空
		this.filter(data);
		// 缓存购物车信息
		this.data.cartInfo = data;
		// 生成html
		var cartHtml = _mall.renderHtml(templateIndex, data);
		$('.page-wrap').html(cartHtml);
		// 通知导航的购物车更新数量
        nav.loadCartCount();
	},
	// 删除指定商品，支持批量，productId用逗号分隔
	deleteCartProduct : function(productIds) {
		var _this = this;
		_cart.deleteCartProduct(productIds, function(res) {
			_this.renderCart(res);
		}, function(errMsg) {
			_this.showCartError();
		});
	},
	// 将传入的数据进行过滤处理
	filter : function(data) {
		// 判断返回的cartProductVoList是否为空
		// !!表示将后面的数据转换成boolean类型
		data.notEmpty = !!data.cartProductVoList.length;
	},
	// 显示错误信息
    showCartError: function(){
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>');
    }
};

$(function() {
	page.init();
});