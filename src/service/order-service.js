// 请求后台-订单

var _mall = require('util/mall.js');

var _order = {
	// 获取订单中的商品信息列表
	getOrderProductList : function(resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/order/get_order_cart_product.do'),
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	// 生成订单
	createOrder : function(shippingId, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/order/create.do'),
			data 	: {
				shippingId : shippingId
			},
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	// 获取订单列表
	getOrderList  : function(listParam, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/order/list.do'),
			data 	: listParam,
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	// 获取订单详情信息
	getOrderDetail : function(orderNo, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/order/detail.do'),
			data 	: {
				orderNo : orderNo
			},
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	// 取消订单
	cancelOrder : function(orderNo, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/order/cancel.do'),
			data 	: {
				orderNo : orderNo
			},
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	}
};

module.exports = _order;