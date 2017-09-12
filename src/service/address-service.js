// 请求后台-收货地址

var _mall = require('util/mall.js');

var _address = {
	// 获取收货地址列表信息
	getAddressList : function(resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/shipping/list.do'),
			data 	: {
				pageSize : 50
			},
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	// 添加收货地址
	saveAddress : function(receiverInfo, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/shipping/add.do'),
			data 	: receiverInfo,
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	// 修改收货地址信息
	updateAddress : function(receiverInfo, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/shipping/update.do'),
			data 	: receiverInfo,
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	// 通过ID获取该收货地址信息
	getAddress : function(shippingId, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/shipping/select.do'),
			data 	: {
				shippingId : shippingId
			},
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	// 通过ID获取该收货地址信息
	delete : function(shippingId, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/shipping/delete.do'),
			data 	: {
				shippingId : shippingId
			},
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	}
};

module.exports = _address;