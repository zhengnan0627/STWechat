<template>
	<view class="container">
		<view class="fixed" style="position: fixed; width: 100vw; z-index: 9;">
			<view class="height-box" style="border-bottom: 1px solid #EEEEEE;">
				<uni-search-bar placeholder="请输入手术类型进行搜索"  @confirm="search" @cancel="cancle"/>
				<view class="fromitem-box" style="background-color: #FFFFFF;border-top: 2px solid #EEEEEE;">
					<u-form >
						<u-form-item :label-position="labelPosition" label="货位选择" prop="qyType" label-width="200">
							<u-input  type="select" :select-open="selectShow" v-model="huoweiType" :placeholder="huoweiType || '请选择货位'" input-align="right" @click="selectShow = true"></u-input>
						</u-form-item>
						<u-select mode="single-column" :list="selectList" v-model="selectShow" title="请选择货位" @confirm="selectConfirm1" ></u-select>
					</u-form>
				</view>
			</view>
		</view>
		<view class="zhanwei"  :style="{'height':height+'px'}"></view>
		<view class="list-box" v-for="(item,index) in kucunList" :key="key">
			<view class="list-box-absolute" v-if="item.sy_num   < 5">
				库存不足
			</view>
			<view class="list-box-line">
				{{item.name}}
			</view>
			<view class="list-box-flex list-box-line">
				<view class="listbox-flex-flexitem">
					{{item.goods}}
				</view>
				<view class="listbox-flex-flexitem">
					剩余库存:<text :style="{'color':item.sy_num   < 5 ? '#FF0000' : ''}">{{item.sy_num}}</text>
				</view>
			</view>
			<view class="list-box-flex list-box-line">
				<view class="listbox-flex-flexitem">
					{{item.cj}}
				</view>
				<view class="listbox-flex-flexitem">
					库存上下限:<text >{{item.xianzhi}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height:null,//站位view高度，通过uni.createSelectorQuery().select('.height-box').boundingClientRect
				selectShow: false,
				labelPosition: 'left',
				huoweiType:'',
				//-----------------------选择企业类型数据项----------------
				selectList: [
					{
						value: '山西分仓',
						label: '山西分仓'
					},
					{
						value: '陕西分仓',
						label: '陕西分仓'
					},
					{
						value: '河南分仓',
						label: '河南分仓'
					},
					{
						value: '河北分仓',
						label: '河北分仓'
					},
					{
						value: '其他',
						label: '其他'
					}
				],
				kucunList:[
					{name:'LK.LCU金属头',bianhao:'LKHJ1545',goods:'生物型-LK.RIBMS+JDAL',sy_num:'1',cj:'陕西纳薇',xianzhi:'5-10'},
					{name:'LK.LCU金属头',bianhao:'LKHJ1545',goods:'生物型-LK.RIBMS+JDAL',sy_num:'2',cj:'陕西纳薇',xianzhi:'5-10'},
					{name:'LK.LCU金属头',bianhao:'LKHJ1545',goods:'生物型-LK.RIBMS+JDAL',sy_num:'3',cj:'陕西纳薇',xianzhi:'5-10'},
					{name:'LK.LCU金属头',bianhao:'LKHJ1545',goods:'生物型-LK.RIBMS+JDAL',sy_num:'8',cj:'陕西纳薇',xianzhi:'5-10'},
					{name:'LK.LCU金属头',bianhao:'LKHJ1545',goods:'生物型-LK.RIBMS+JDAL',sy_num:'11',cj:'陕西纳薇',xianzhi:'5-10'},
					{name:'LK.LCU金属头',bianhao:'LKHJ1545',goods:'生物型-LK.RIBMS+JDAL',sy_num:'6',cj:'陕西纳薇',xianzhi:'5-10'},
				]
			}
		},
		onReady() {
			let obj = uni.createSelectorQuery().select('.height-box')
			obj.boundingClientRect(data => {
					// console.log(data);
						this.height = data.height
			}).exec()
		},
		methods: {
			//搜索方法
			search(e){ //点击键盘确定
				// console.log(e.value);
				// this.pageindex = 1
				// this.key = e.value
				// this.orderList = []
				// this.request()
			},
			cancle(e){	//点击搜索二字
				console.log(e.value);
				// this.pageindex = 1
				// this.key = e.value
				// this.orderList = []
				// this.request()
			},
			// 选择商品类型回调
			selectConfirm1(e) {
				this.huoweiType = '';
				e.map((val, index) => {
					this.huoweiType += this.huoweiType == '' ? val.label : '-' + val.label;
				})
				console.log(this.huoweiType);
			},
		}
	}
</script>

<style>
	page{
		background-color: #EEEEEE !important;
	}
	.container {
		width: 100vw;
		overflow: hidden;
		background-color: #EEEEEE;
	}
	.list-box{
		position: relative;
		box-sizing: border-box;
		padding: 10rpx 20rpx;
		margin: 10rpx 0;
		background-color: #FFFFFF;
		overflow: hidden;
		font-size: 28rpx;
	}
	.list-box:first-of-type{
		margin-top: 20rpx;
	}
	.list-box-absolute{
		position: absolute;
		right: 0;
		top: 0;
		font-size: 16rpx;
		background-color: #FF0000;
		color: #FFFFFF;
		padding: 6rpx 30rpx;
	}
	.list-box-line{
		padding: 4rpx 0;
	}
	.list-box-flex{
		display: flex;
		justify-content: space-between;
	}
	.listbox-flex-flexitem{
		flex: 1;
	}
</style>
