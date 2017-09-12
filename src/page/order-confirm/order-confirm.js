// 订单确认页JS

// 引入样式
require('./order-confirm.css');
// 引入顶部导航
var nav = require('page/common/nav/index.js');
// 引入头部搜索框
require('page/common/header/index.js');
// 引入通用工具类
var _mall = require('util/mall.js');
// 引入订单service
var _order = require('service/order-service.js');
// 引入收货地址service
var _address = require('service/address-service.js');
// 引入渲染页面
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');
// 引入收货地址弹出框Modal
var addressModal = require('./address-modal.js');

var page = {
	data : {
		selectedAddressId : null// 选中的收货地址id
	},
	// 初始化页面
	init : function() {
		this.onLoad();
		this.bindEvent();
	},
	// 加载页面数据
	onLoad : function() {
		// 加载收货地址列表信息
		this.loadAddressList();
		// 加载商品清单信息
		this.loadProductList();
	},
	// 页面事件的绑定
	bindEvent : function() {
		var _this = this;
		// 收货地址的选择
		$(document).on('click', '.address-item', function() {
			// 为选择的收货地址加上active样式
			$(this).addClass('active').siblings('.address-item').removeClass('active');
			// 保存选中收货地址的id
			_this.data.selectedAddressId = $(this).data('id');
		});
		// 提交订单，生成订单和订单中单个商品的详细信息
		$(document).on('click', '.order-submit', function() {
			var shippingId = _this.data.selectedAddressId;
			// 判断是否选择了收货地址
			if (shippingId) {
				_order.createOrder(shippingId, function(res) {
					window.location.href = "./payment.html?orderNo=" + res.orderNo;
				}, function(errMsg) {
					_mall.errorTips(errMsg);
				});
			} else {
				_mall.errorTips("请选择收货地址");
			}
		});
		// 添加收货地址
		$(document).on('click', '.address-add', function() {
			addressModal.show({
				isUpdate : false,// 是否为修改收货地址
				onSuccess : function() {// 地址添加成功后的回调函数
					_this.loadAddressList();
				}
			});
		});
		// 修改收货地址
		$(document).on('click', '.address-update', function(e) {
			e.stopPropagation();
			var shippingId = $(this).parents('.address-item').data('id');// 获取需要修改的收货地址ID
			// 通过ID获取该收货地址信息
			_address.getAddress(shippingId, function(data){
                addressModal.show({
					isUpdate : true,// 是否为修改收货地址
					data : data,
					onSuccess : function() {// 地址添加成功后的回调函数
						_this.loadAddressList();
					}
				});
            }, function(errMsg){
                _mall.errorTips(errMsg);
            });
		});
		// 删除收货地址
		$(document).on('click', '.address-delete', function(e) {
			e.stopPropagation();
			var shippingId = $(this).parents('.address-item').data('id');// 获取需要删除的收货地址ID
			if(window.confirm('确认要删除该地址？')){
				// 通过ID删除该收货地址信息
				_address.delete(shippingId, function(res){
	               _mall.successTips(res);
	               _this.loadAddressList();
	            }, function(errMsg){
	                _mall.errorTips(errMsg);
	            });
           	}
		});
	},
	// 加载收货地址列表信息
	loadAddressList : function() {
		var _this = this;

		// 加载loading图标
		$('.address-con').html('<div class="loading"></div>');
		// 获取收货地址列表
		_address.getAddressList(function(res) {
			_this.addressFilter(res);
			// 后台返回的数据为分页信息，但前台并没有用分页，而是设置了pageSize=50，即只显示50条数据
			var addressListHtml = _mall.renderHtml(templateAddress, res);
			$('.address-con').html(addressListHtml);
		}, function(errMsg) {
			$('.address-con').html('<p class="err-tip">收货地址加载失败，请刷新后重试</p>');
		});
	},
	// 处理地址列表中选中状态：当选中一个收货地址时，如果需要重新加载收货地址列表，需要回填选中状态
	addressFilter : function(data) {
		if (this.data.selectedAddressId) {
			var selectedAddressIdFlag = false;// 定义选中的收货地址是否有效

			for (var i = 0, length = data.list.length; i < length; i++) {
				if (data.list[i].id === this.data.selectedAddressId) {
					data.list[i].isActive = true;
					selectedAddressIdFlag = true;
				}
			};
			// 如果selectedAddressIdFlag为false，则说明选中的收货地址已经被删除
			if (!selectedAddressIdFlag) {
				this.data.selectedAddressId = null;
			}
		}
	},
	// 加载商品清单信息
	loadProductList : function() {
		var _this = this;

		// 加载loading图标
		$('.product-con').html('<div class="loading"></div>');
		// 获取商品清单列表
		_order.getOrderProductList(function(res) {
			var productListHtml = _mall.renderHtml(templateProduct, res);
			$('.product-con').html(productListHtml);
		}, function(errMsg) {
			$('.product-con').html('<p class="err-tip">'+ errMsg +'</p>');
		});
	},
	// 将传入的数据进行过滤处理
	filter : function(data) {
		// 判断返回的cartProductVoList是否为空
		// !!表示将后面的数据转换成boolean类型
		data.notEmpty = !!data.cartProductVoList.length;
	},
};

$(function() {
	page.init();
});