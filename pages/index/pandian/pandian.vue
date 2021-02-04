<template>
	<view class="container">
		<view class="fixed" style="position: fixed; width: 100vw; z-index: 9;">
			<view class="height-box" style="border-bottom: 1px solid #EEEEEE;">
				<uni-search-bar placeholder="请输入搜索关键字"  @confirm="search" @cancel="cancle"/>
			</view>
		</view>
		<view class="zhanwei"  :style="{'height':height+'px'}"></view>
		<view class="list-box" v-for="(item,index) in pandianList" :key="item.bianhao">
			<view class="list-box-absolute" :style="{'backgroundColor':item.is_status == 1 ? '#00aaff' : '#FF0000'}">
				{{item.is_status == 1? '已盘':'未盘'}}
			</view>
			<view class="list-box-line">
				{{item.name}}
			</view>
			<view class="list-box-flex list-box-line">
				<view class="listbox-flex-flexitem">
					{{item.goods}}
				</view>
				<view class="listbox-flex-flexitem">
					库存数量:<text style="margin-left: 10rpx;">{{item.sy_num}}</text>
				</view>
			</view>
			<view class="list-box-flex list-box-line">
				<view class="listbox-flex-flexitem">
					{{item.cj}}
				</view>
				<view class="listbox-flex-flexitem">
					<view class="">
						盘点数量:
					</view>
					
					<view class="listbox-flex-input"style="margin-left: 10rpx;">
						<!-- <u-input v-model="item.xianzhi" type="number" :border="true" :clearable="false" :key="item.bianhao"/> -->
						<input type="number" v-model="item.xianzhi" @blur="inputBlur($event,item,index)"/>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height:53,//站位view高度，通过uni.createSelectorQuery().select('.height-box').boundingClientRect

				huoweiType:'',
				pandianList:[
					{name:'LK.LCU金属头',bianhao:'LKHJ1511',goods:'生物型-LK.RIBMS+JDAL',sy_num:'1',cj:'陕西纳薇',xianzhi:'1',is_status:'0'},
					{name:'LK.LCU金属头',bianhao:'LFHJ1542',goods:'生物型-LK.RIBMS+JDAL',sy_num:'2',cj:'陕西纳薇',xianzhi:'2',is_status:'0'},
					{name:'LK.LCU金属头',bianhao:'LSHJ1325',goods:'生物型-LK.RIBMS+JDAL',sy_num:'3',cj:'陕西纳薇',xianzhi:'2',is_status:'0'},
					{name:'LK.LCU金属头',bianhao:'LXHJ1425',goods:'生物型-LK.RIBMS+JDAL',sy_num:'8',cj:'陕西纳薇',xianzhi:'3',is_status:'0'},
					{name:'LK.LCU金属头',bianhao:'LQHJ1145',goods:'生物型-LK.RIBMS+JDAL',sy_num:'11',cj:'陕西纳薇',xianzhi:'4',is_status:'1'},
					{name:'LK.LCU金属头',bianhao:'LNHJ1125',goods:'生物型-LK.RIBMS+JDAL',sy_num:'6',cj:'陕西纳薇',xianzhi:'5',is_status:'1'},
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
		onBackPress(event) {
			console.log(event);
			return true
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
			inputBlur(event,item,index){
				console.log(event);
				console.log(item);
				console.log(index);
				this.pandianList[index].is_status = 1
			}
			
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
		display: flex;
		align-items: center;
	}
	.listbox-flex-input{
		box-sizing: border-box;
		padding: 4rpx 10rpx;
		display: inline-block;
		flex: 1;
		max-width: 160rpx;
		height: 40rpx;
		border: 1px solid #dcdfe6;
		display: flex;
		align-items: center;
		text-align: center;
		border-radius: 6rpx;
	}
</style>
