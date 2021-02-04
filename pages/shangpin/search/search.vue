<template>
	<view class="container">
		<view class="fixed" style="position: fixed; width: 100vw; z-index: 9;">
			<view class="" style="display: flex; width: 100vw;border-bottom: 1px solid #EEEEEE;">
				<view class="" style="width: 100%;" @click.self="searchclick">
					<uni-search-bar placeholder="请输入手术类型进行搜索" :disabled="true" @confirm="search" @cancel="cancle"/>
				</view>
				<view class="icon" @click="topiconclick" style="width: 80rpx;height: 104rpx;background-color: #FFFFFF;display: flex;align-items: center;">
					<uni-icons type="bars" size="26"></uni-icons>
				</view>	
			</view>
		</view>
		<view class="zhanwei" style="height: 114rpx;"></view>
		<view class="XF-cart" @click="ToCart">
			<uni-icons type="cart" size="28" color="#ffffff"></uni-icons>
			<u-badge :count="badge"></u-badge>
			<!-- <uni-badge v-if="badge != 0" :text="badge" type="error" size="small" ></uni-badge> -->
		</view>
		<u-popup v-model="rightshow" mode="right" border-radius="10">
			<view class="popup-box">
				<view class="popup-item">
					筛选条件
				</view>
				<view class="popup-item">
					135型半髋器械
				</view>
				<view class="popup-item">
					BE型半髋器械
				</view>
			</view>
		</u-popup>	
		<view class="sp-box" v-for="(item,index) in shangpinList" :key="index">
			<view class="spbox-lineflex">
				<view class="">
					{{item.name}}
				</view>
				<view class="">
					{{item.id}}
				</view>
			</view>
			<view class="spbox-lineflex">
				<view class="">
					{{item.guige}}
				</view>
				<view class="">
					<view class="plus-box">
						<u-icon name="plus" color="#ff0000"></u-icon>
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
				rightshow:false,
				//购物车数字角标
				badge:4, 
				shangpinList:[
					{name:'微创压杯器',id:'LK.15-403/06',guige:'28mm+10.1'},
					{name:'微创压杯器',id:'LK.15-403/06',guige:'28mm+10.1'},
					{name:'微创压杯器',id:'LK.15-403/06',guige:'28mm+10.1'},
					{name:'微创压杯器',id:'LK.15-403/06',guige:'28mm+10.1'},
					{name:'微创压杯器',id:'LK.15-403/06',guige:'28mm+10.1'},
					{name:'微创压杯器',id:'LK.15-403/06',guige:'28mm+10.1'},
					{name:'微创压杯器',id:'LK.15-403/06',guige:'28mm+10.1'},
					{name:'微创压杯器',id:'LK.15-403/06',guige:'28mm+10.1'},
					{name:'微创压杯器',id:'LK.15-403/06',guige:'28mm+10.1'},
					{name:'微创压杯器',id:'LK.15-403/06',guige:'28mm+10.1'}
				]
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
			//顶部右侧图标点击右侧弹出层方法
			topiconclick(){
				this.rightshow = true
			},
			//购物车悬浮按钮方法
			ToCart() {
				console.log(this.kehuinfo);
				const kehuinfo = JSON.stringify(this.kehuinfo)
				uni.navigateTo({
					url:'cart?kehuinfo='+ kehuinfo
				})
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
	/* 悬浮购物车按钮 */
	.XF-cart {
		width: 50px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		position: fixed;
		bottom: 60px;
		right: 20px;
		z-index: 99;
		background-color:#ffaa00;
		border-radius: 50px;
	}
	.badge {
			position: absolute;
			right: -5px;
			top: 3px;
			width: auto !important;
			display: inline !important;
		
	}
	.popup-box{
		height: 100%;
		background-color: #EEEEEE;
	}
	.popup-item{
		box-sizing: border-box;
		padding: 20rpx 60rpx;
		width: 100%;
		font-size: 28rpx;
		text-align: center;
		background-color: #FFFFFF;
		border-bottom: 1px solid #EEEEEE;
	}
	.popup-item:first-of-type{
		background-color: #EEEEEE;
		font-size: 32rpx;
	}
	.sp-box:nth-of-type(1){
		margin-top: 10rpx;
	}
	.sp-box{
		box-sizing: border-box;
		width: 100vw;
		padding: 10rpx 20rpx;
		background-color: #FFFFFF;
		border-bottom: 1px solid #EEEEEE;
	}
	.spbox-lineflex{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 0;
	}
	.plus-box{
		/* width: 28rpx;
		height: 28rpx; */
		box-sizing: border-box;
		/* padding: 4rpx 4rpx; */
		border: 1px solid #ff0000;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
</style>
