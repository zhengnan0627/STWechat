<template>
	<view class="container">
		<uni-search-bar placeholder="客户名/客户地址/联系人/联系人电话" @confirm="search" @cancel="cancle" style="border-bottom: 1px solid #EEEEEE;"/>
		<view class="xonglu-box" v-for="item in 10" :key="item">
			<view class="name">
				张三
			</view>
			<view class="phone" style="display: flex;">
				12345678910
				<view class="icon" style="margin-left: 10rpx;">
					<uni-icons type="phone-filled" color="#57C87A"></uni-icons>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
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
	.xonglu-box{
		width: 100vw;
		padding: 20rpx 20rpx;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		background-color: #FFFFFF;
		border-bottom: 1px solid #EEEEEE;
	}
	.xonglu-box:first-of-type{
		margin-top: 10rpx;
	}
</style>
