/**
 * webpack配置文件
 */

var webpack 			= require('webpack');
var ExtractTextPlugin 	= require("extract-text-webpack-plugin");
var HtmlWebpackPlugin 	= require('html-webpack-plugin');

// 环境变量配置，dev（开发） / online（线上）
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 处理html定义的方法
var getHtmlConfig = function(name, title) {
	return {
		template 	: './src/view/'+ name +'.html',
		filename 	: 'view/'+ name +'.html',
		inject 		: true,
		hash 		: true,
		title 		: title,
		chunks 		: ['common', name]
	};
}

// webpack config
var config = {
	entry 	: {
		'common'			: ['./src/page/common/index.js'],
		'index' 			: ['./src/page/index/index.js'],
		'user-register'		: ['./src/page/user-register/user-register.js'],
		'user-login'		: ['./src/page/user-login/user-login.js'],
		'user-pass-reset'	: ['./src/page/user-pass-reset/user-pass-reset.js'],
		'user-center'		: ['./src/page/user-center/user-center.js'],
		'user-center-update': ['./src/page/user-center-update/user-center-update.js'],
		'user-pass-update'	: ['./src/page/user-pass-update/user-pass-update.js'],
		'result'			: ['./src/page/result/index.js']
	},
	output 	: {
		path 		: './dist',
		filename 	: 'js/[name].js',
		publicPath 	: '/dist'
	},
	module : {
		loaders : [{
			test 	: /\.css$/,
			loader 	: ExtractTextPlugin.extract("style-loader","css-loader")
		},{
			test 	: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
			loader 	: 'url-loader?limit=100&name=resources/[name].[ext]'
		},{
			test 	: /\.string$/,
			loader 	: 'html-loader'
		}]
	},
	resolve : {// 配置别名
		alias : {// 配置路径
			node_modules 	: __dirname + '/node_modules',
			util 			: __dirname + '/src/util',
			page 			: __dirname + '/src/page',
			service 		: __dirname + '/src/service',
			image 			: __dirname + '/src/image'
		}
	},
	plugins : [
		// 独立通用模块到base.js
		new webpack.optimize.CommonsChunkPlugin({
			name : 'common',
			filename : 'js/base.js'
		}),
		// 把css单独打包到文件里
		new ExtractTextPlugin("css/[name].css"),
		// html模板的处理
		new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
		new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
		new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
		new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
		new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
		new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改个人密码')),
		new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果提示')),
	],
}

// 如果为dev（开发环境），则使用webpack-dev-server
if ('dev' === WEBPACK_ENV) {// 在common模块中追加一段字符串
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;