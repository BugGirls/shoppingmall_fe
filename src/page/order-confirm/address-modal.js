// 收货地址弹出层

// 引入通用工具类
var _mall = require('util/mall.js');
// 引入城市选择
var _city = require('util/city/index.js');
// 引入收货地址service
var _address = require('service/address-service.js');
// 引入渲染页面
var templateAddressModal = require('./address-modal.string');

var addressModal = {
	// 显示弹窗
	show : function(option) {
		// option参数的绑定
		this.option = option;
		this.option.data = option.data || {};
		this.$modalWrap = $('.modal-wrap');
		// 渲染页面
		this.loadModal();
		// 绑定事件
		this.bindEvent();
	},
	// 加载Modal页面
	loadModal : function() {
		var addressModalHtml = _mall.renderHtml(templateAddressModal, {
			isUpdate	: this.option.isUpdate,
            data		: this.option.data
		});
		this.$modalWrap.html(addressModalHtml);

		// 加载省份
		this.loadProvince();
	},
	// 加载省份
	loadProvince : function() {
		var proviences 		= _city.getProvinces() || [];// 获取所有省份
		var	$provinceSelect = this.$modalWrap.find('#receiver_province');// 获取省份选择框
		$provinceSelect.html(this.getSelectOption(proviences));

		// 如果是修改地址，并且有省份信息，做省份的回填
        if(this.option.isUpdate && this.option.data.receiverProvince){
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCity(this.option.data.receiverProvince);
        }
	},
	// 加载城市
	loadCity : function(provinceName) {
		var city 		= _city.getCities(provinceName) || [];// 获取当前省份的所有城市
		var $citySelect = this.$modalWrap.find('#receiver_city');// 获取城市选择框
		$citySelect.html(this.getSelectOption(city));

		// 如果是修改地址，并且有城市信息，做城市的回填
        if(this.option.isUpdate && this.option.data.receiverCity){
            $citySelect.val(this.option.data.receiverCity);
        }
	},
	// 获取选择框的选项，传入一个数组，返回一个html
	getSelectOption : function(optionArray) {
		var html = '<option value="">请选择</option>';
		for (var i = 0, length = optionArray.length; i < length; i++) {
			html += '<option value="'+ optionArray[i] + '">' + optionArray[i] + '</option>';
		}
		return html;
	},
	// 绑定事件
	bindEvent : function() {
		var _this = this;
		// 省份选择框事件的绑定
		this.$modalWrap.find('#receiver_province').change(function() {
			var selectedProvince = $(this).val();// 获取选择的省份
			// 通过选择的省份加载城市信息
			_this.loadCity(selectedProvince);
		});
		// 提交收货地址
		this.$modalWrap.find('.address-btn').click(function() {
			var receiverInfo 	= _this.getReceiverInfo();// 获取表单信息
			var isUpdate 		= _this.option.isUpdate;// 是否为修改收货地址
			if (!isUpdate && receiverInfo.status) {// 添加收货地址且表单验证通过
				_address.saveAddress(receiverInfo.data, function(data, msg) {
					_this.hide();
					_mall.successTips(msg);
					typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(data, msg);
				}, function(errMsg) {
					_mall.errorTips(errMsg);
				});
			} else if (isUpdate && receiverInfo.status) {// 修改收货地址且表单验证通过
				_address.updateAddress(receiverInfo.data, function(msg) {
					_this.hide();
					_mall.successTips(msg);
					typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(msg);
				}, function(errMsg) {
					_mall.errorTips(errMsg);
				});
			} else {// 验证不通过
				_mall.errorTips(receiverInfo.errMsg || '好像哪里出错了');
			}
		});
		// 保证点击modal内容区的时候，不关闭弹窗
        this.$modalWrap.find('.modal-container').click(function(e){
            e.stopPropagation();// 当点击弹窗时，不让向上冒泡，因此不会关闭弹窗
        });
        // 点击叉号或者蒙版区域，关闭弹窗
        this.$modalWrap.find('.close').click(function(e){
            _this.hide();
        });
	},
	// 获取表单信息，并作表单的验证
	getReceiverInfo : function() {
		var receiverInfo = {};// 存放获取的表单信息
		var	result = {
				status : false
			};// 返回信息

		// 获取表单信息并存入receiverInfo中
		receiverInfo.receiverName 		= $.trim(this.$modalWrap.find('#receiver_name').val());
		receiverInfo.receiverProvince 	= this.$modalWrap.find('#receiver_province').val();
		receiverInfo.receiverCity 		= this.$modalWrap.find('#receiver_city').val();
		receiverInfo.receiverAddress 	= $.trim(this.$modalWrap.find('#receiver_address').val());
		receiverInfo.receiverMobile 	= $.trim(this.$modalWrap.find('#receiver_mobile').val());
		receiverInfo.receiverZip 		= $.trim(this.$modalWrap.find('#receiver_zip').val());

		if(this.option.isUpdate) {
            receiverInfo.id             = this.$modalWrap.find('#receiver_id').val();
        }

		// 验证字段信息
		if (!_mall.validate(receiverInfo.receiverName, 'require')) {
			result.errMsg = '请输入收件人姓名';
		} else if (!_mall.validate(receiverInfo.receiverProvince, 'require')) {
			result.errMsg = '请选择所在省份';
		} else if (!_mall.validate(receiverInfo.receiverCity, 'require')) {
			result.errMsg = '请选择所在城市';
		} else if (!_mall.validate(receiverInfo.receiverAddress, 'require')) {
			result.errMsg = '请填写详细地址';
		} else if (!_mall.validate(receiverInfo.receiverMobile, 'require')) {
			result.errMsg = '请填写手机号';
		} else if (!_mall.validate(receiverInfo.receiverMobile, 'phone')) {
			result.errMsg = '请填写正确的手机号';
		} else if (_mall.validate(receiverInfo.receiverZip, 'require') && receiverInfo.receiverZip.length != 6) {
			result.errMsg = '请填写正确的邮政编码';
		} else {// 所有验证都通过
			result.status = true;
			result.data = receiverInfo;
		}

		return result;
	},
	// 关闭弹窗
	hide : function() {
		this.$modalWrap.empty();
	}
};

module.exports = addressModal;