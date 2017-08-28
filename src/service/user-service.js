// 请求后台-用户

var _mall = require('util/mall.js');

var _user = {
	// 检查用户名是否存在
	checkUsername : function(username, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/user/check_valid.do'),
			data 	: {
				type : 'username',
				str	 : username
			},
			method	: 'POST',
			success	: resolve,
			error 	: reject
		});
	},
	// 校验邮箱是否存在
	checkEmail : function(email, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/user/check_valid.do'),
			data 	: {
				type : 'email',
				str : email
			},
			method 	: 'POST',
			success	:resolve,
			error 	:reject
		});
	},
	// 用户注册
	register : function(userInfo, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/user/register.do'),
			data 	: userInfo,
			method	: 'POST',
			success	: resolve,
			error 	: reject
		});
	},
	// 用户登录
	login : function(userInfo, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/user/login.do'),
			data	: userInfo,
			method	: 'POST',
			success	: resolve,
			error 	: reject
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
	},
	// 退出登录
	logout : function(resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/user/logout.do'),
			method 	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	// 通过用户名获取密码提示问题
	getQuestion : function(username, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/user/forget_get_question.do'),
			data	: {
				username : username
			},
			method	: 'POST',
			success	: resolve,
			error 	: reject
		});
	},
	// 检查输入的密码提示问题答案是否正确
	checkAnswer : function(userInfo, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/user/forget_check_answer.do'),
			data 	: userInfo,
			method 	: 'POST',
			success : resolve, 
			error 	: reject
		});
	},
	// 通过密码提示问题重置密码
	resetPassword : function(userInfo, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/user/forget_reset_password.do'),
			data 	: userInfo,
			method 	: 'POST',
			success : resolve, 
			error 	: reject
		});
	},
	// 获取当前登录的用户信息
	getUserInfo : function(resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/user/get_information.do'),
			method 	: 'POST',
			success : resolve, 
			error 	: reject
		});
	},
	// 修改用户信息
	updateInfo : function(userInfo, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/user/update_information.do'),
			data 	: userInfo,
			method 	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	// 修改密码
	updatePass : function(passInfo, resolve, reject) {
		_mall.request({
			url 	: _mall.getServerUrl('/user/update_password.do'),
			data 	: passInfo,
			method  : 'POST',
			success : resolve,
			error 	: reject
		})
	}
};

module.exports = _user;