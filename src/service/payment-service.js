// 请求后台-订单支付

var _mall = require('util/mall.js');

var _payment = {
	// 获取支付信息
	getPaymentInfo : function(orderNo, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/order/pay.do'),
			data 	: {
				orderNo : orderNo
			},
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	// 获取订单状态
	getPaymentStatus : function(orderNo, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/order/query_order_pay_status.do'),
			data 	: {
				orderNo : orderNo
			},
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	}
};

module.exports = _payment;