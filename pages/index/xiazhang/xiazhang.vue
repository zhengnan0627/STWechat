<template>
	<view class="container">
		<view class="diaohuo-line-box" @click="liebiao">
			<view class="">
				下账商品列表
			</view>
			<view class="">
				<!-- <text style="margin-right: 10rpx;font-size: 40rpx;">{{4}}</text> -->
				<u-icon name="arrow-right" size="28"></u-icon>
			</view>
		</view>
		<view class="wrap">	
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :label-position="labelPosition" label="医院" prop="yiyuan" label-width="200">
				<u-input :border="border" placeholder="医院" v-model="model.yiyuan" type="text" :disabled="true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="科室" prop="keshi" :leftIconStyle="{color: '#888', fontSize: '32rpx'}"  label-width="200" >
				<u-input :border="border" placeholder="科室" v-model="model.keshi" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="医生" prop="yisheng" label-width="200">
				<u-input :border="border" placeholder="医生" v-model="model.yisheng" type="text"></u-input>			
			</u-form-item>			
			<u-form-item :label-position="labelPosition" label="患者姓名" prop="name"  :leftIconStyle="{color: '#888', fontSize: '32rpx'}"  label-width="200" >
				<u-input :border="border" placeholder="患者姓名" v-model="model.name" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="性别" prop="sex" label-width="200">
				<u-input :border="border" type="select"  :select-open="selectShow2" v-model="model.sex" placeholder="请选择性别" @click="selectShow2 = true"></u-input>
			</u-form-item>
			<u-select mode="single-column"  :list="selectList2" :default-value="selectDefault" v-model="selectShow2" title="请选择性别" @confirm="selectConfirm"></u-select>	
			<u-form-item :label-position="labelPosition" label="年龄" prop="patient_age"  :leftIconStyle="{color: '#888', fontSize: '32rpx'}"  label-width="200" >
				<u-input :border="border" placeholder="请输入年龄" v-model="model.patient_age" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="住院号" prop="zhuyuanhao" label-width="200" placeholder="请输入营业执照号">
				<u-input :border="border" type="text" v-model="model.zhuyuanhao" placeholder="请输入住院号"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="床号" prop="chuanghao" label-width="200" placeholder="请输入身份证号">
				<u-input :border="border" type="text" v-model="model.chuanghao" placeholder="请输入床号"></u-input>
			</u-form-item>
			<u-form-item label-width="200" :label-position="labelPosition" label="诊断结果" prop="zhendaunjieguo">
				<u-input :border="border" placeholder="请输入诊断结果" v-model="model.zhendaunjieguo" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="手术名称" prop="shoushuName" label-width="200" placeholder="请输入身份证号">
				<u-input :border="border" type="text" v-model="model.shoushuName" placeholder="请输入手术名称"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="手术时间" prop="shoushuTime" label-width="200" placeholder="请输入身份证号">
				<u-input :border="border" type="select" :select-open="timeShow" v-model="model.shoushuTime" placeholder="请输入手术时间" @click="timeShow = true"></u-input>
			</u-form-item>
			<u-picker mode="time" v-model="timeShow" @confirm="timesure" style="z-index: 99;"title="请选择手术时间"></u-picker>
			<u-form-item :label-position="labelPosition" label="记账金额" prop="money" label-width="200" placeholder="请输入身份证号">
				<u-input :border="border" type="digit" v-model="model.money" placeholder="请输入记账金额"></u-input>
			</u-form-item>
			<view class="" style="width: 100vw; height: 30px; line-height: 30px;padding-left: 10px;  background-color: #EEEEEE; font-size: 16px;">
				上传图片
			</view>
			<u-form-item style="display: flex;">
				<u-upload ref="uUpload5" :action="action" width="120" :show-progress="false" :max-count="4" :custom-btn="true" name="upload_file">
					<view class="" slot="addBtn">
						<view class="u-list-item u-add-wrap" style="width: 120prx;height: 120rpx;">
							<u-icon  name="plus" class="u-add-btn" size="60"></u-icon>
						</view>
					</view>
				</u-upload>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="备注" prop="intro" >
				<u-input type="textarea" :border="border" placeholder="请填写备注信息" v-model="model.intro" />
			</u-form-item>
		</u-form>
		<u-button @click="submit" style="margin:10px;">提交</u-button>
		</view>	
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
				money: '',//记账金额
				intro: '',//备注
			},
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
			errorType: ['message'],
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
	}
};
</script>

<style scoped lang="scss">
	@import "../../../uview-ui/index.scss";

	.container {
		width: 100vw;
		
		background-color: #FFFFFF;
		text-overflow:ellipsis;
		white-space:wrap;
		overflow: hidden;
	}
	.diaohuo-line-box{
		box-sizing: border-box;
		padding: 0 30rpx;
		margin-top: 10rpx;
		width: 100vw;
		height: 110rpx;
		line-height: 110rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		// font-size: 32rpx;
		border-bottom: 8rpx solid #EEEEEE;
	}
	.jindu {
		padding: 4px 8px;
		color: #00B800;
		font-size: 12px;
		border: 1px solid #000000;
		border-radius: 28rpx;
	}
	.wrap {
		// padding: 0 30rpx;
	}
.u-list-item {
	width: 120rpx;
	height: 120rpx;
	overflow: hidden;
	margin: 10rpx;
	background: rgb(244, 245, 246);
	position: relative;
	border-radius: 10rpx;
	display: inline-flex;
	align-items: center;
	justify-content: center;
}
.u-add-wrap {
	flex-direction: column;
	color: $u-content-color;
	font-size: 28rpx;
}
</style>
