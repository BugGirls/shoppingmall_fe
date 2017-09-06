// 请求后台-购物车

var _mall = require('util/mall.js');

var _cart = {
	// 获取购物车数量
	getCartCount : function(resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/cart/get_cart_product_count.do'),
			method	: 'POST',
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
	},
	// 获取购物车列表
	getCartList : function(resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/cart/list.do'),
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	// 设置该商品为选中状态
	selectProduct : function(productId, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/cart/select.do'),
			data 	: {
				productId : productId
			},
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	// 设置该商品为非选中状态
	unSelectProduct : function(productId, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/cart/un_select.do'),
			data 	: {
				productId : productId
			},
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	// 设置该商品为全选中状态
	selectAllProduct : function(resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/cart/all_select.do'),
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	// 设置该商品为全不选中状态
	unSelectAllProduct : function(resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/cart/all_un_select.do'),
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	// 更新购物车中商品的数量
	updatPruductQuantity : function(proudctInfo, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/cart/update_product_quantity.do'),
			data 	: proudctInfo,
			method	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	// 删除购物车中指定id的商品信息
	deleteCartProduct : function(productIds, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/cart/delete.do'),
			data 	: {
				productIds : productIds
			},
			method	: 'POST',
			success : resolve,
			error 	: reject
		});
	}
};

module.exports = _cart;