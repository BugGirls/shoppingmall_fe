// 请求后台-用户

var _mall = require('util/mall.js');

var _user = {
	// 退出登录
	logout : function(resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/user/logout.do'),
			method 	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	// 检查登录状态
	checkLogin : function(resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/user/get_user_info.do'),
			method 	: 'POST',
			success : resolve,
			error 	: reject
		});
	}
};

module.exports = _user;