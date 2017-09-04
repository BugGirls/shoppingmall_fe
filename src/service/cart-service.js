// 请求后台-购物车

var _mall = require('util/mall.js');

var _cart = {
	// 获取购物车数量
	getCartCount : function(resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/cart/get_cart_product_count.do'),
			success : resolve,
			error	: reject
		});
	},
	// 加入购物车
	addToCart : function(productInfo, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/cart/add.do'),
			data 	: productInfo,
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	}
};

module.exports = _cart;