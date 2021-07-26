<template>
	<view class="container">
		<view class="wrap">	
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :label-position="labelPosition" label="姓名" required prop="name" label-width="200">
				<u-input :border="border" placeholder="请输入姓名" :input-align="inputAlign" v-model="model.name" type="text" :disabled="true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="性别" required prop="sex" label-width="200">
				<u-input :border="border" type="select"  :select-open="selectShow2" :input-align="inputAlign" v-model="model.sex" placeholder="请选择性别" @click="selectShow2 = true"></u-input>
			</u-form-item>
			<u-select mode="single-column"  :list="selectList2" :default-value="selectDefault" v-model="selectShow2" title="请选择性别" @confirm="selectConfirm"></u-select>
			<u-form-item :label-position="labelPosition" label="身份证号" required prop="zhuyuanhao" label-width="200" placeholder="请输入身份证号">
				<u-input :border="border" type="text" v-model="model.zhuyuanhao" :input-align="inputAlign" placeholder="请输入身份证号"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="所在地区" prop="keshi" :leftIconStyle="{color: '#888', fontSize: '32rpx'}"  label-width="200" >
				<u-input :border="border" placeholder="请输入所在地区" v-model="model.keshi" :input-align="inputAlign" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="挂号医院" prop="yisheng" label-width="200">
				<u-input :border="border" placeholder="请输入挂号医院" v-model="model.yisheng" :input-align="inputAlign" type="text"></u-input>			
			</u-form-item>			
			<u-form-item :label-position="labelPosition" label="挂号科室" prop="name"  :leftIconStyle="{color: '#888', fontSize: '32rpx'}"  label-width="200" >
				<u-input :border="border" placeholder="请输入挂号科室" v-model="model.name" :input-align="inputAlign" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="就诊时间" prop="shoushuTime" label-width="200" placeholder="请选择就诊时间">
				<u-input :border="border" type="select" :select-open="timeShow" v-model="model.shoushuTime" :input-align="inputAlign" placeholder="请选择就诊时间" @click="timeShow = true"></u-input>
			</u-form-item>
			<u-picker mode="time" v-model="timeShow" @confirm="timesure" style="z-index: 99;"title="请选择就诊时间"></u-picker>
				
			
			<u-form-item :label-position="labelPosition" label="手机号" required prop="zhuyuanhao" label-width="200" placeholder="请输入手机号">
				<u-input :border="border" type="text" v-model="model.zhuyuanhao" :input-align="inputAlign" placeholder="请输入手机号"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="验证码" required prop="code" label-width="200">
				<u-input :border="border" placeholder=" "  v-model="model.code" :input-align="inputAlign" type="text"></u-input>
				<u-button slot="right" type="primary" size="mini" @click="getCode">{{codeTips}}</u-button>
			</u-form-item>
			<u-form-item label-position="top" label="请描述您的症状" prop="intro" >
				<u-input type="textarea" :custom-style="textareaClass" :border="border" input-align="left" placeholder="请填写备注信息" v-model="model.intro" />
			</u-form-item>
		</u-form>
		<u-button @click="submit"  type="primary"  style="margin:0 10px;">提交</u-button>
		</view>	
		<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
	</view>
</template>

<script>
export default {
	data() {
		let that = this;
		return {
			fileList:[],//(数组，元素为对象),显示预置的图片。其中元素的url属性为图片路径
			action: 'https://xcx.sxstyy.com:8082/upload.php',//图片上传配置地址
			model: {
				yiyuan:uni.getStorageSync('address') || '',//医院
				yisheng: '',//医生
				keshi: '',//科室
				name: '',//患者姓名
				sex:'',//性别
				patient_age:'',//年龄
				zhuyuanhao:'',//住院号
				chuanghao:'',//床号
				zhendaunjieguo: '',//诊断结果
				shoushuName: '',//手术名称
				shoushuTime: '',//手术时间
				code: '',//验证码
				money: '',//记账金额
				intro: '',//备注
			},
			codeTips: '',//验证码提示信息
			//-----------------------选择医院数据项----------------
			yiyuanList: [
				{
					value: '第一医院',
					label: '第一医院'
				},
				{
					value: '第二医院',
					label: '第二医院'
				}
			],
			//-----------------------选择医院数据项----------------
			yishengList: [
				{
					value: '张医生',
					label: '张医生'
				},
				{
					value: '王医生',
					label: '王医生'
				}
			],
			//-----------------------选择性别数据项----------------
			selectDefault:[0],//选择器默认值
			selectList2: [
				{
					value: 0,
					label: '男'
				},
				{
					value: 1,
					label: '女'
				}
			],
			//-----------------------表单验证数据项----------------
			rules: {	
				//医院名称校验
				yiyuan: [
					{
						required: false,
						message: '请输入医院名称',
						trigger: 'blur' ,
					},
				],
				//医生名称校验
				yisheng: [
					{
						required: false,
						message: '请输入医生名称',
						trigger: 'blur' ,
					},
				],
				//科室名称校验
				keshi: [
					{
						required: false,
						message: '请输入科室名称',
						trigger: 'blur' ,
					},
				],
				//患者姓名校验
				name: [
					{
						required: true,
						message: '请输入患者姓名',
						trigger: 'blur' ,
					},
				],
				//性别校验
				sex: [
					{
						required: false,
						message: '请选择性别',
						trigger: 'change',
					},
				],
				//年龄校验
				patient_age: [
					{
						required: false,
						message: '请输入年龄',
						trigger: 'blur' ,
					},
				],
				//住院号校验校验
				zhuyuanhao: [
					{
						required: false,
						message: '请输入住院号',
						trigger: 'blur' ,
					},
				],
				//床号校验
				chuanghao: [
					{
						required: false,
						message: '请输入床号',
						trigger: 'blur' ,
					},
				],
				//诊断结果校验
				zhendaunjieguo: [
					{
						required: false,
						message: '请输入诊断结果',
						trigger: 'blur' ,
					},
				],
				//手术名称校验
				shoushuName: [
					{
						required: false,
						message: '请输入手术名称',
						trigger: 'blur' ,
					},
				],
				//手术时间校验
				shoushuTime: [
					{
						required: true,
						message: '请输入手术时间',
						trigger: 'blur' ,
					},
				],
				//记账金额校验
				money: [
					{
						required: false,
						message: '请输入记账金额',
						trigger: 'blur' ,
					},
				],
				code: [
					{
						required: true,
						message: '请输入验证码',
						trigger: ['change','blur'],
					},
					{
						type: 'number',
						message: '验证码只能为数字',
						trigger: ['change','blur'],
					}
				],
				//备注项
				intro: [
					{
						required: false,
						message: '请填写简介'
					},
				],									
			},
			border: false,
			check: false,
			selectStatus: 'close',
			radioList: [
				{
					name: '药品经营许可证',
					checked: false,
					disabled: false,
					ref:'radio1'
				},
				{
					name: '医疗机构经营许可证',
					checked: false,
					disabled: false,
					ref:'radio2'
				}
			],
			radio: '',
			// actionSheetList: [
				
			// ],
			actionSheetShow: false,
			timeShow: false,
			selectShow2: false,
			labelPosition: 'left',
			inputAlign:'right',
			errorType: ['message'],
			textareaClass:{
				backgroundColor:'#eeeeee',
				borderRadius:'10rpx'
			}
		};
	},
	onLoad() {
		let datetime = new Date();
		let year = datetime.getFullYear();
		let month = datetime.getMonth()+1;//js从0开始取 
		let day = datetime.getDate();
		if(month<10){
		month = "0" + month;
		}
		if(day<10){
		day = "0" + day;
		}
		// this.starttime = year + '-' + month + '-01';
	},
	computed: {
		borderCurrent() {
			return this.border ? 0 : 1;
		}
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		liebiao(){
			uni.navigateTo({
				url:'xiazhanglist/xiazhanglist'
			})
		},
		//点击提交按钮方法
		submit() {
			const _this = this
			// this.$refs.uUpload1.upload();
			let files5 = _this.$refs.uUpload5.lists;
			_this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证通过');
					let iamge_url = '+' 
					files5.map(item => {
							// console.log(prev,cur);
								iamge_url += item.response.imageUrl + "+";
							});		
					console.log(iamge_url);
					iamge_url = iamge_url.substr(1, iamge_url.length - 2);
					console.log(iamge_url);
					_this.$request({
						data:{
							type:'提交下账单',
							userid:uni.getStorageSync('userid'),
							clientid:uni.getStorageSync('clientid'),
							bill_id:'',
							doctor:_this.model.yisheng,
							department:_this.model.keshi,
							patient_sex:_this.model.sex,
							patient_age:_this.model.patient_age,
							patient_name:_this.model.name,
							patient_no:_this.model.zhuyuanhao,
							patient_bedno:_this.model.chuanghao,
							diagnosis:_this.model.zhendaunjieguo,
							operation_name:_this.model.shoushuName,
							operation_date:_this.model.shoushuTime,
							amount:_this.model.money,
							image_urls:iamge_url,
							remark:_this.model.intro,
						}
					}).then(res => {
						if(res.code != 0){
							return this.$u.toast(res.data[0].msg_info)
						}
						this.$u.toast(res.data[0].note,'success')
						setTimeout(() => {
							uni.navigateBack({})
						},1500)
					})				  
				} else {
					uni.showToast({
						title:'请完善下账单信息',
						icon:'none'
					})
					console.log('验证失败');
				}
			});
		},
		// 选择性别回调
		selectConfirm(e) {
			this.model.sex = '';
			this.model.sex = e[0].label;
			this.selectDefault[0] = e[0].value
		},
		// 选择时间回调
		timesure(e) {
			console.log(e);
			this.model.shoushuTime = e.year + '-' + e.month + '-' + e.day;
		},
		codeChange(text) {
			this.codeTips = text;
		},
		// 获取验证码
		getCode() {
			if(this.$refs.uCode.canGetCode) {
				// 模拟向后端请求验证码
				uni.showLoading({
					title: '正在获取验证码',
					mask: true
				})
				setTimeout(() => {
					uni.hideLoading();
					// 这里此提示会被this.start()方法中的提示覆盖
					this.$u.toast('验证码已发送');
					// 通知验证码组件内部开始倒计时
					this.$refs.uCode.start();
				}, 2000);
			} else {
				this.$u.toast('倒计时结束后再发送');
			}
		},
	}
};
</script>

<style scoped lang="scss">
	@import "../../uview-ui/index.scss";

	.container {
		width: 100vw;
		
		background-color: #FFFFFF;
		text-overflow:ellipsis;
		white-space:wrap;
		overflow: hidden;
	}
	.wrap {
		// padding: 0 30rpx;
		// /deep/ .u-input__input{
		// 	text-align: right;
		// }
		// /deep/ .u-input__input::last-of-type{
		// 	text-align: left;
		// }
		/deep/ .u-btn{
			margin: 0 20rpx;
		}
	}

</style>
