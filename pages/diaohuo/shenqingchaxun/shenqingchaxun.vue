<template>
	<view class="container">
		<view class="fixed height-box" style="position: fixed; width: 100vw; z-index: 9;">
			<u-tabs :list="tablist"  :current="current" @change="change" bg-color="#ffffff" :is-scroll="false"></u-tabs>
		</view>
		<view class="zhanwei"  :style="{'height':height+'px'}"></view>
		<view class="list-box" v-for="(item,index) in List" :key="item.danhao">
			<view class="list-box-line">
				<text class="list-box-line-text">调货单号:</text>{{item.danhao}}
			</view>
			<view class="list-box-line list-box-flex">
				<view class="">
					<text class="list-box-line-text">类型:</text>{{item.type}}
				</view>
				<view class="" style="display: flex; align-items: center;">
					<view class="list-box-queren" v-if="current == 1" @click="confirm(item,index)">
						确认收货
					</view>
					<uni-icons type="arrowright" size="24" @click="detail(item,index)"></uni-icons>
				</view>
			</view>
			<view class="list-box-line">
				<text class="list-box-line-text">日期:</text>{{item.date}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height:35,//站位view高度，通过uni.createSelectorQuery().select('.height-box').boundingClientRect
				current: 0,//tabs当前选中下标
				tablist: [
					{
					name: '待确认'
					}, {
						name: '已发货'
					}, {
						name: '已完成',	
					},
				],
				List:[
					{danhao:'1102389456',type:'补货',date:'2020-04-12'},
					{danhao:'1102312332',type:'补货',date:'2020-04-12'},
					{danhao:'1101331256',type:'补货',date:'2020-04-12'},
					{danhao:'1154689456',type:'补货',date:'2020-04-12'},
					{danhao:'1104559456',type:'补货',date:'2020-04-12'},
					{danhao:'1111111456',type:'补货',date:'2020-04-12'},
					{danhao:'1764439456',type:'补货',date:'2020-04-12'},
					{danhao:'1107669456',type:'补货',date:'2020-04-12'},
					{danhao:'1109773456',type:'补货',date:'2020-04-12'}
				]
			}
		},
		onReady() {
			let obj = uni.createSelectorQuery().select('.height-box')
			obj.boundingClientRect(data => {
					console.log(data);
						this.height = data.height
			}).exec()
		},
		methods: {
			change(index) {
				this.current = index;
			},
			confirm(item,index){
				console.log(item);
			},
			detail(item,index){
				console.log(item);
				uni.navigateTo({
					url:'../detail/detail?info='+JSON.stringify(item)
				})
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
	.fixed{
		width: 100vw;
	}
	.list-box{
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
	.list-box-line-text{
		color: #999999;
		margin-right: 10rpx;
	}
	.list-box-line{
		box-sizing: border-box; 
		padding: 6rpx 0;
	}
	.list-box-flex{
		display: flex;
		min-height: 60rpx;
		justify-content: space-between;
		align-items: center;
	}
	.list-box-queren{
		box-sizing: border-box;
		margin-right: 20rpx;
		padding: 4rpx 10rpx;
		background-color: #1296DB;
		color: #FFFFFF;
		border-radius: 10rpx;
		/* font-size: 24rpx; */
	}
</style>
