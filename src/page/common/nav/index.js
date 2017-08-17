
require('./index.css');

var _mall = require('util/mall.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

var nav = {
	init : function() {
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		return this;
	},
	// 登录、注册、退出的事件绑定
	bindEvent : function() {
		// 登录点击事件
		$('.js-login').click(function() {
			_mall.doLogin();
		});
		// 注册点击事件
		$('.js-register').click(function() {
			window.location.href = './register.html';
		});
		// 退出点击事件
		$('.js-logout').click(function() {
			_user.logout(function(res) {
				window.location.reload();
			}, function(errMsg) {
				_mall.errorTips(errMsg);
			});
		});
	},
	// 加载登录的用户信息
	// siblings：获取兄弟节点
	loadUserInfo : function() {
		_user.checkLogin(function(res) {
			$('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
		}, function(errMsg) {
			// do noting
		});
	},
	// 加载购物车中商品的数量信息
	loadCartCount : function() {
		_cart.getCartCount(function(res) {
			$('.nav .cart-count').text(res || 0);
		}, function(errMsg) {
			$('.nav .cart-count').text(0);
		});
	}
};

module.exports = nav.init();