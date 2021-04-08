<template>
	<view class="container">
		<view class="u-form-box">
			<u-form >
				<u-form-item :label-position="labelPosition" label="调货类型" prop="qyType" label-width="200">
					<u-input  type="select" :select-open="selectShow" v-model="diaohuoType" :placeholder="diaohuoType || '请选择类型'" input-align="right" @click="selectShow = true"></u-input>
				</u-form-item>
				<u-select mode="single-column" :list="selectList" v-model="selectShow" title="请选择类型" @confirm="selectConfirm1" ></u-select>
			</u-form>	
		</view>
		<view class="diaohuo-line-box">
			<view class="">
				选择手术套餐
			</view>
			<view class="">
				<text style="margin-right: 10rpx;font-size: 40rpx;">{{taocanList.length}}</text>
				<u-icon name="arrow-right" size="28" @click="taocan"></u-icon>
			</view>
		</view>
		<view class="diaohuo-container" v-if="taocanList">
			<view class="diaohuo-box" v-for="(item,index) in taocanList" :key="index">
				<view class="diaohuo-box-line diaohuo-box-flex">
					<view class="">
						{{item.name}}
					</view>
					<view class="">
						{{item.bianhao}}
					</view>
				</view>
				<view class="diaohuo-box-line diaohuo-box-flex">
					{{item.leixing}}
				</view>
				<view class="diaohuo-box-line diaohuo-box-flex">
					<view class="">
						{{item.factory}}
					</view>
					<view class="" style="display: flex;">
						调货数量:
						<view class="" style="margin-left: 8rpx;">
							<u-number-box v-model="item.num" @change="valChange" bg-color="#ffffff"></u-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="diaohuo-line-box">
			<view class="">
				选择单个商品
			</view>
			<view class="">
				<text style="margin-right: 10rpx;font-size: 40rpx;">{{danpinList.length}}</text>
				<u-icon name="arrow-right" size="28" @click="danpin"></u-icon>
			</view>
		</view>
		<view class="diaohuo-container" v-if="danpinList">
			<view class="diaohuo-box" v-for="(item,index) in danpinList" :key="index">
				<view class="diaohuo-box-line diaohuo-box-flex">
					<view class="">
						{{item.name}}
					</view>
					<view class="">
						{{item.bianhao}}
					</view>
				</view>
				<view class="diaohuo-box-line diaohuo-box-flex">
					{{item.leixing}}
				</view>
				<view class="diaohuo-box-line diaohuo-box-flex">
					<view class="">
						{{item.factory}}
					</view>
					<view class="" style="display: flex;">
						调货数量:
						<view class="" style="margin-left: 8rpx;">
							<u-number-box v-model="item.num" @change="valChange" bg-color="#ffffff"></u-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="zhanwei"style="width: 100vw;height: 160rpx;">
			
		</view>
		<view class="commit-box">
			<view class="commit" @click="commit">
				提交调货申请
			</view>
		</view>
		<u-modal v-model="modalShow" title="填写备注"confirm-text="确认提交" show-cancel-button @confirm="confirm" @cancel="cancel">
			<view class="slot-content">
				<u-form>
					<u-form-item  label-position="left" label="备注" prop="zhendaunjieguo">
						<u-input  placeholder="请输入备注信息" v-model="remark" type="text"></u-input>
					</u-form-item>
				</u-form>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectShow: false,
				labelPosition: 'left',
				diaohuoType:'',
				modalShow:false,//备注模态框控制值
				remark:'',//备注
				//-----------------------选择企业类型数据项----------------
				selectList: [
					{
						value: '补货',
						label: '补货'
					},
					{
						value: '手术调货',
						label: '手术调货'
					}
				],
				taocanNum:'2',
				taocanList:[
					{name:"LK.LCU金属头",bianhao:"LKJHF96562",leixing:"生物型-LK.RibMS+Combicup",factory:"陕西纳薇",num:10},
					{name:"LK.LCU金属头",bianhao:"LKJHF96562",leixing:"生物型-LK.RibMS+Combicup",factory:"陕西纳薇",num:10},
					{name:"LK.LCU金属头",bianhao:"LKJHF96562",leixing:"生物型-LK.RibMS+Combicup",factory:"陕西纳薇",num:10},
					{name:"LK.LCU金属头",bianhao:"LKJHF96562",leixing:"生物型-LK.RibMS+Combicup",factory:"陕西纳薇",num:10},
				],
				danpinNum:'3',
				danpinList:[
					{name:"LK.LCU金属头",bianhao:"LKJHF96562",leixing:"生物型-LK.RibMS+Combicup",factory:"陕西纳薇",num:10},
					{name:"LK.LCU金属头",bianhao:"LKJHF96562",leixing:"生物型-LK.RibMS+Combicup",factory:"陕西纳薇",num:10},
					{name:"LK.LCU金属头",bianhao:"LKJHF96562",leixing:"生物型-LK.RibMS+Combicup",factory:"陕西纳薇",num:10},
					{name:"LK.LCU金属头",bianhao:"LKJHF96562",leixing:"生物型-LK.RibMS+Combicup",factory:"陕西纳薇",num:10},
				]
			}
		},
		onLoad() {
				console.log('diaohuoonLoad');
		},
		methods: {
			// 选择商品类型回调
			selectConfirm1(e) {
				this.diaohuoType = '';
				e.map((val, index) => {
					this.diaohuoType += this.diaohuoType == '' ? val.label : '-' + val.label;
				})
				console.log(this.diaohuoType);
			},
			valChange(){
				
			},
			taocan(){
				this.$type = 'taocan'
				uni.setStorageSync('type', 'taocan');
				uni.switchTab({
					url:'../shangpin/shangpin'
				})
				
			},
			danpin(){
				this.$type = 'danpin'
				uni.setStorageSync('type', 'danpin');
				// console.log(this.$type);
				uni.switchTab({
					url:'../shangpin/shangpin'
				})
			},
			commit(){
				this.modalShow = true
				console.log(this.taocanList);
			},
			confirm(){
				console.log(this.remark);
			},
			cancel(){
				this.remark = ''
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
