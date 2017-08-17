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
		'index' : ['./src/page/index/index.js'],
		'login' : ['./src/page/login/login.js'],
		'common': ['./src/page/common/index.js'],
		'result': ['./src/page/result/index.js']
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
		new HtmlWebpackPlugin(getHtmlConfig('login', '用户登录')),
		new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果提示')),
	],
}

// 如果为dev（开发环境），则使用webpack-dev-server
if ('dev' === WEBPACK_ENV) {// 在common模块中追加一段字符串
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;