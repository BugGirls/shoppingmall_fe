// 通用侧边导航

// 引入样式
require('./index.css');
// 引入通用工具类
var _mall 			= require('util/mall.js');
// 引入渲染页面
var templateIndex 	= require('./index.string');

// 需要传入一个option对象
var navSide = {
	option : {
		name : '',// 当前所选择的导航名称
		navList : [// 导航列表
			{name: 'user-center', desc: '个人中心', href: './user-center.html'},
			{name: 'order-list', desc: '我的订单', href: './order-list.html'},
			{name: 'pass-update', desc: '修改密码', href: './user-pass-update.html'},
			{name: 'about', desc: '关于Empress', href: './about.html'}
		]
	},
	init : function(option) {
		// 合并选项，将传入的option的值替换成当前option的值
		$.extend(this.option, option);

		this.renderNav();
	},
	// 渲染导航菜单
	renderNav : function() {
		// 计算active数据
		for (var i = 0, iLength = this.option.navList.length; i < iLength; i++) {
			if (this.option.navList[i].name === this.option.name) {
				this.option.navList[i].isActive = true;
			}
		};
		// 渲染html数据
		var navHtml = _mall.renderHtml(templateIndex, {
			navList : this.option.navList
		});
		// 把HTML放入容器
		$('.nav-side').html(navHtml);
	}
};

module.exports = navSide;