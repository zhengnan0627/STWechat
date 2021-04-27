<template>
	<view class="container">
		<view class="u-form-box">
			<u-cell-group>
				<u-cell-item title="切换医院" :center="true" :value="yiyuanText" @click="qiehuan"></u-cell-item>
			</u-cell-group>
			<u-form >
				<u-form-item :label-position="labelPosition" label="调货类型" prop="qyType" label-width="200">
					<u-input  type="select" :select-open="selectShow" v-model="diaohuoType" :placeholder="diaohuoType || '请选择类型'" input-align="right" @click="selectShow = true"></u-input>
				</u-form-item>
				<u-select mode="single-column" :default-value="selectDefault" :list="selectList" v-model="selectShow" title="请选择类型" @confirm="selectConfirm1" ></u-select>
				<u-form-item :label-position="labelPosition" label="选择货位" prop="qyType" label-width="200">
					<u-input  type="select" :select-open="huoweiselectShow" v-model="huoweiType" :placeholder="huoweiType || '请选择货位'" input-align="right" @click="huoweiselectShow = true"></u-input>
				</u-form-item>
				<u-select mode="single-column" :default-value="huoweiselectDefault" value-name="hw" label-name="huowname" :list="huoweiselectList" v-model="huoweiselectShow" title="请选择货位" @confirm="huoweiselectConfirm" ></u-select>
				<u-form-item :label-position="labelPosition" label="手术时间" prop="shoushuTime" label-width="200" placeholder="请输入手术时间">
					<u-input  type="select" :select-open="timeShow" v-model="shoushuTime" placeholder="请输入手术时间" input-align="right" @click="timeShow = true"></u-input>
				</u-form-item>
				<u-picker mode="time" v-model="timeShow" @confirm="timesure" style="z-index: 99;"title="请选择手术时间"></u-picker>
			</u-form>	
		</view>
		<view class="diaohuo-line-box" @click="taocan">
			<view class="">
				选择手术套餐
			</view>
			<view class="">
				<u-icon name="arrow-right" size="28"></u-icon>
			</view>
		</view>
		<view class="diaohuo-container" v-if="taocanList">
			<view class="diaohuo-box" v-for="(item,index) in taocanList" :key="item.pkg_id">
				<view class="diaohuo-box-line diaohuo-box-flex diaohuo-box-padding" @click="openPupup(item)">
					<view class="" >
						{{item.pkg_name}}
					</view>
					<view class="" @click.stop="opendeleteshow(item,index)">
						<u-icon name="close-circle" size="36"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="diaohuo-line-box" @click="danpin">
			<view class="">
				选择单个商品
			</view>
			<view class="">
				<u-icon name="arrow-right" size="28"></u-icon>
			</view>
		</view>
		<view class="diaohuo-container" v-if="danpinList">
			<view class="diaohuo-box" v-for="(item,index) in danpinList" :key="item.g_id">
				<view class="diaohuo-box-line diaohuo-box-flex">
					<view class="diaohuo-line-name">
						{{item.g_name}}
					</view>
					<view class="">
						{{item.g_xh}}
					</view>
				</view>
				<view class="diaohuo-box-line diaohuo-box-flex">	
					<view class="" >
						{{item.g_factory}}
					</view>
					<view class="" @click.stop="opendeleteshow(item,index)">
						<u-icon name="close-circle" size="36"></u-icon>
					</view>
				</view>
				<view class="diaohuo-box-line diaohuo-box-flex">
					<view class="">
						{{item.g_property}}
					</view>
					<view class="" style="display: flex;">
						调货数量:
						<view class="" style="margin-left: 8rpx;">
							<u-number-box v-model="item.g_number" :index="index" @change="valChange($event,item)" bg-color="#ffffff"></u-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="zhanwei"style="width: 100vw;height: 160rpx;"></view>
		<view class="commit-box">
			<view class="commit" @click="commit">
				提交调货申请
			</view>
		</view>
		<u-modal v-model="modalShow" title="填写备注"confirm-text="确认提交" show-cancel-button @confirm="confirm" @cancel="cancel">
			<view class="slot-content">
				<u-form>
					<u-form-item  label-position="left"  prop="zhendaunjieguo">
						<u-input  placeholder="请输入备注信息" v-model="remark" type="text"></u-input>
					</u-form-item>
				</u-form>
			</view>
		</u-modal>
		<u-popup v-model="bottomshow" mode="bottom" border-radius="14" height="50%" :mask-close-able="false">
			<view>
				<view class="popup-title" style="display: flex; padding:5px 5px 0 0;">
					<view class="popup-kehu">
						套餐详情
					</view>
					<uni-icons type="close" size="20" color="#b4b4b4" @click="bottomshow = false"></uni-icons>
				</view>
				<view class="popup-text-line-box" v-for="(item,index) in danpindetail":key="index">
					<view class="popup-text-line">
						<text class="popup-text">商品编号:</text>{{item.g_code}}
					</view>
					<view class="popup-text-line">
						<text class="popup-text">商品名称:</text>{{item.g_name}}
					</view>
					<view class="popup-text-line">
						<text class="popup-text">商品规格:</text>{{item.g_property}}
					</view>
					<view class="popup-text-line">
						<text class="popup-text">商品型号:</text>{{item.g_xh}}
					</view>
					<view class="popup-text-line">
						<text class="popup-text">生产厂家:</text>{{item.g_factory}}
					</view>
				</view>	
			</view>
		</u-popup>
		<u-modal v-model="deleteshow" content="是否确认删除" show-cancel-button @confirm="deleteItem"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yiyuanselectShow:false,
				yiyuanDefault:[0],//医院默认选择项
				selectShow: false,//医院弹出值
				huoweiselectShow:false,//货位弹出值
				timeShow:false,//手术时间弹出值
				selectDefault:[0],//调货类型默认选择项
				huoweiselectDefault:[0],//调货货位默认选择项
				bottomshow:false,//底部弹出层控制值
				deleteshow:false,//单品
				deleteItemInfo:{},//要删除的item信息
				labelPosition: 'left',
				yiyuanText:uni.getStorageSync('address')||'',//选择医院文本
				diaohuoType:'',//调货类型文本
				huoweiType:'',//调货货位type
				shoushuTime:'',//手术时间
				huoweiTypeId:'',//调货货位type的ID
				modalShow:false,//备注模态框控制值
				remark:'',//备注
				yiyaunList:[],//选择医院数据项
				//-----------------------选择调货类型数据项----------------
				selectList: [
					{
						value: 0,
						label: '补货'
					},
					{
						value: 1,
						label: '手术调货'
					}
				],
				huoweiselectList:[],//调货货位数据项
				danpindetail:[],//套餐详情数据列表
				taocanList:[],//套餐数据列表	
				danpinList:[]//单品数据列表
			}
		},
		onLoad() {
			console.log('diaohuoonLoad');
			this.$request({
				data:{
					type:'调货类型'
				}
			}).then(res => {
				if(res.code != 0){
					this.selectList = []
					return this.$u.toast(res.data[0].msg_info)
				}
				if(res.data.length == 0){
					this.selectList = []
					return 
				}
				this.selectList = res.data
			})
			this.$request({
				data:{
					type:'调货获取货位',
					userid:uni.getStorageSync('userid'),
					clientid:uni.getStorageSync('clientid'),
				}
			}).then(addres => {
				if(addres.code == 0 ){
					this.huoweiselectList = addres.data
				}
			})
		},
		onShow() {
			if( this.yiyuanText != uni.getStorageSync('address')){
				this.diaohuoType = ''
			}
			this.yiyuanText = uni.getStorageSync('address')
			this.taocanRequest()
			this.danpinRequest()
			this.initTime(1, '-')
		},
		methods: {
			//选择医院回调方法不再使用，换成跳转页面操作
			qiehuan(){
				uni.navigateTo({
					url:'../mine/qiehuan/qiehuan'
				})
			},
			// 选择医院回调
			yiyaunselectConfirm(e) {	
				if(this.yiyuanText == e[0].label) return
				// console.log(e);
				this.yiyuanText = '';	
				this.yiyuanText = e[0].label;
				// console.log(this.yiyuanText);
				this.yiyaunList.forEach((item,index)=>{
					// console.log(item,index);
					if (this.yiyuanText == item.client_name) this.yiyuanDefault[0] = index
				})
				
				uni.setStorageSync('clientid', e[0].value)
				uni.setStorageSync('address', e[0].label)
				this.diaohuoType = '';
				this.taocanRequest()
				this.danpinRequest()
			},
			// 选择商品类型回调
			selectConfirm1(e) {
				this.diaohuoType = '';			
				this.diaohuoType = e[0].label
				this.selectDefault[0] = e[0].value
				console.log(this.diaohuoType);
			},
			// 选择货位回调
			huoweiselectConfirm(e) {
				console.log(e);
				this.huoweiType = '';			
				this.huoweiType = e[0].label
				this.huoweiTypeId = e[0].value
				this.huoweiselectList.forEach((item,index)=>{
					console.log(item,index);
					if (this.huoweiType == item.huowname) this.huoweiselectDefault[0] = index
				})
				console.log(this.huoweiType);
			},
			//初始化时间
			initTime(num, str){
				var today = new Date();
				var nowTime = today.getTime();
				var ms = 24*3600*1000*num;
				today.setTime(parseInt(nowTime + ms));
				var oYear = today.getFullYear();
				var oMoth = (today.getMonth() + 1).toString();
				if (oMoth.length <= 1) oMoth = '0' + oMoth;
				var oDay = today.getDate().toString();
				if (oDay.length <= 1) oDay = '0' + oDay;
				// return oYear + str + oMoth + str + oDay;
				this.shoushuTime = oYear + str + oMoth + str + oDay
				console.log(this.shoushuTime);
			},
			// 选择时间回调
			timesure(e) {
				console.log(e);
				this.shoushuTime = e.year + '-' + e.month + '-' + e.day;
			},
			valChange(e,item){
				// console.log(e);
				// console.log(item);
			},
			taocan(){
				this.$type = 'taocan'
				uni.setStorageSync('type', '套餐分类');
				setTimeout(()=>{
					uni.$emit('diaohuoemit','套餐分类');
				},100)
				uni.switchTab({
					url:'../shangpin/shangpin'
				})	
			},
			danpin(){
				this.$type = 'danpin'
				uni.setStorageSync('type', '单品分类');
				setTimeout(()=>{
					uni.$emit('diaohuoemit','单品分类');
				},100)
				
				// console.log(this.$type);
				uni.switchTab({
					url:'../shangpin/shangpin'
				})
			},
			//套餐详情弹出层数据请求方法
			openPupup(item){
				this.bottomshow = true
				this.$request({
					data:{
						type:'套餐详情',
						userid:uni.getStorageSync('userid'),
						clientid:uni.getStorageSync('clientid'),
						pkg_id:item.pkg_id
					}
				}).then(res => {
					console.log(res);
					if(res.code != 0){
						this.danpindetail = []
						return this.$u.toast(res.data[0].msg_info)
					}
					if(res.data.length == 0){
						this.danpindetail = []
						return 
					}
					this.danpindetail = res.data
				})
			},
			//打开删除确认弹出层
			opendeleteshow(item,index){
				this.deleteItemInfo = item
				this.deleteshow = true
			},
			//删除单个item方法
			deleteItem(){	
				this.$request({
					data:{
						type:'未提交调货申请删除',
						userid:uni.getStorageSync('userid'),
						clientid:uni.getStorageSync('clientid'),
						pkg_id:this.deleteItemInfo.pkg_id||'',
						g_id:this.deleteItemInfo.g_id||''
					}
				}).then(res => {
					console.log(res);
					if(res.code != 0){
						return this.$u.toast(res.data[0].msg_info)
					}
					this.$u.toast(res.data[0].note)
					if(this.deleteItemInfo.g_type == '套餐'){
						this.taocanRequest()
					}else{
						this.danpinRequest()
					}
				})
			},
			commit(){
				this.modalShow = true
				console.log(this.danpinList);	
			},
			confirm(){
				uni.showLoading({
					title:'加载中',
					mask:true
				})
				console.log(this.remark);
				if(this.danpinList.length == 0 && this.taocanList.length == 0)	return this.$u.toast('申请列表为空')
				if(this.diaohuoType == '')return this.$u.toast('请选择调货类型')
				if(this.huoweiType == '')return this.$u.toast('请选择调货货位')
				let good_list = []
				if(this.taocanList){
					this.taocanList.forEach(item => {
						let pushitem = {}
						pushitem.g_id = item.g_id
						pushitem.g_number = item.g_number * 1
						good_list.push(pushitem)
						// console.log(pushitem);
					})
				}
				if(this.danpinList){
					this.danpinList.forEach(item => {
						let pushitem = {}
						pushitem.g_id = item.g_id
						pushitem.g_number = item.g_number * 1
						good_list.push(pushitem)
						// console.log(pushitem);
					})
				}
				// console.log(good_list);
				this.$request({
					data:{
						type:'提交调货申请',
						userid:uni.getStorageSync('userid'),
						clientid:uni.getStorageSync('clientid'),
						class_name:this.diaohuoType,
						hw:this.huoweiTypeId,
						operation_date:this.shoushuTime,
						remark:this.remark,
						data:{
							good_list:good_list
						}	
					}
				}).then(res => {
					uni.hideLoading()
					if(res.code != 0){
						return this.$u.toast(res.data[0].msg_info)
					}
					if(res.data.length == 0){
						this.danpinList = []
						return 
					}
					this.$u.toast(res.data[0].note,'success')
					this.danpinList = []
					this.taocanList = []
					this.remark = ''
					this.diaohuoType = ''
				})
			},
			cancel(){
				this.remark = ''
			},
			taocanRequest(){
				this.$request({
					data:{
						type:'调货申请列表',
						userid:uni.getStorageSync('userid'),
						clientid:uni.getStorageSync('clientid'),
						sub_type:'套餐'
					}
				}).then(res => {
					if(res.code != 0){
						return this.$u.toast(res.data[0].msg_info)
					}
					if(res.data.length == 0){
						this.taocanList = []
						return 
					}
					this.taocanList = res.data
				})
			},
			danpinRequest(){
				this.$request({
					data:{
						type:'调货申请列表',
						userid:uni.getStorageSync('userid'),
						clientid:uni.getStorageSync('clientid'),
						sub_type:'单品'
					}
				}).then(res => {
					if(res.code != 0){
						return this.$u.toast(res.data[0].msg_info)
					}
					if(res.data.length == 0){
						this.danpinList = []
						return 
					}
					this.danpinList = res.data
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #EEEEEE !important;
	}
	.container{
		width: 100vw;
	}
	.u-form-box{
		background-color: #FFFFFF;
		margin-top: 10rpx;
	}
	.diaohuo-line-box{
		box-sizing: border-box;
		padding: 0 20rpx;
		margin-top: 10rpx;
		width: 100vw;
		height: 110rpx;
		line-height: 110rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
	}
	.diaohuo-container:nth-last-of-type(2){
		margin-bottom: 160rpx;
	}
	.diaohuo-box{
		box-sizing: border-box;
		padding: 10rpx 20rpx;
		margin-bottom: 4rpx;
		background-color: rgba(255,255,255,0.7);
	}
	.diaohuo-box-line{
		height: 50rpx;
		line-height: 50rpx;
		font-size: 28rpx;
	}
	.diaohuo-box-flex{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.diaohuo-box-padding{
		padding: 20rpx 0;
		height: 70rpx;
		line-height: 70rpx;
	}
	.diaohuo-line-name{
		max-width: 70%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.popup-title{
		position: sticky;
		top: 0;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 999;
	}
	.popup-kehu{
		flex: 1;
		max-width: 90vw;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		padding-left: 10px;
		font-size: 16px;
		text-align: center;
	}
	.popup-text-line-box{
		box-sizing: border-box;
		border-bottom: 1px solid #CCCCCC;
	}
	.popup-text-line-box:last-of-type{
		border: none;
	}
	.popup-text-line{
		padding: 5px 10px;
	}
	.popup-text{
		color: #909399;
		margin-right: 8rpx;
	}
	.commit-box{
		position: fixed;
		bottom: 40rpx;
		width: 100vw;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
	}
	.commit{
		margin: 0rpx auto;
		width: 50vw;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background-color: #1296DB;
		color: #FFFFFF;
		border-radius: 10px;
	}
</style>
