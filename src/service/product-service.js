// 请求后台-商品

var _mall = require('util/mall.js');

var _product = {
	// 通过关键字或商品分类id搜索商品信息列表
	getProductList : function(listParam, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/product/list.do'),
			data 	: listParam,
			method	: 'POST',
			success	: resolve,
			error 	: reject
		});
	},
	// 通过productId获取商品详情信息
	getProductDetail : function(productId, resolve, reject) {
		_mall.request({
			url : _mall.getServerUrl('/product/detail.do'),
			data : {
				productId : productId
			},
			method : 'POST',
			success : resolve,
			error : reject
		})
	}
};

module.exports = _product;