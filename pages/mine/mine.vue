<template>
	<view class="container">
		<view class="header">
			<view class="header-contont">
				<view class="header-icon">
					<image src="../../static/logo.png" mode=""></image>
				</view>
				<view class="header-mine">
					<view class="mine-name">
						{{userName}}
					</view>
					<view class="mine-name">
						{{userDept}}
					</view>
					<!-- <view   style="text-align: right; width: 60vw; display: flex; flex-direction: row-reverse;">
						<view class="mine-qiehuan" @click="changerole">
							切换账户
						</view>
					</view> -->
				</view> 
			</view>	
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="map-fill" title="切换门店" :center="true" :value="mendianInfo" @click="qiehuan"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item :icon="item.icon" :title="item.title" @click="cellClick(item)" v-for="(item,index) in cellList" :key="index"></u-cell-item>
				
			</u-cell-group>
		</view>
		<view class="commit" @click="tuichu">
			退出登录
		</view>
		<!-- <view class="content">
			<navigator url="../../pages/mine/item/integral" hover-class="none">
				<view class="content-item" style="display: flex;">
					<view class="icon-font">
						<image src="../../static/image/jifen.png" mode=""></image>
					</view>
					<view class="item-title">
						积分记录
					</view>
				</view>
			</navigator>
			<navigator url="../../pages/mine/item/earnings" hover-class="none">
				<view class="content-item" style="display: flex;">
					<view class="icon-font">
						<image src="../../static/image/shouyi.png" mode=""></image>
					</view>
					<view class="item-title">
						提成收益
					</view>
				</view>
			</navigator>
			<view class="content-item" style="display: flex;" @click="ERPorderList">
				<view class="icon-font">
					<image src="../../static/image/dingdan.png" mode=""></image>
				</view>
				<view class="item-title">
					我的订单
				</view>
			</view>	
			<navigator url="../../pages/mine/item/news" hover-class="none">
				<view class="content-item" style="display: flex;">
					<view class="icon-font"> 
						<image src="../../static/image/xiaoxi.png" mode=""></image>
					</view>
					<view class="item-title">
						消息中心
					</view>
				</view>
			</navigator> 
			
			
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName:'名称',
				userDept:'部门',
				mendianInfo:'顺天测试门店地址医院信息顺天测试门店地址医院信息',
				cellList:[
					{icon:'phone-fill',title:'通讯目录',url:'tongxunlu/tongxunlu'},
					{icon:'bell-fill',title:'新闻列表',url:'../index/notice/notice'},
					{icon:'server-fill',title:'联系客服',url:'kefu/kefu'},
					{icon:'lock-fill',title:'修改密码',url:'mima/mima'},
					{icon:'info-circle',title:'关于我们',url:'guanyu/guanyu'},
					
				]
				
			}
		},
		methods: {
			tuichu(){
				console.log('退出');
				uni.navigateTo({
					url:'login/login'
				})
			},
			qiehuan(){
				uni.navigateTo({
					url:'qiehuan/qiehuan'
				})
			},
			cellClick(item){
				uni.navigateTo({
					url:item.url
				})
			},
			tongxu(){
				this.$logo()
				uni.navigateTo({
					url:'tongxunlu/tongxunlu'
				})
				console.log('通讯录');
			},
			xinwen(){
				console.log('xinwen');
				uni.navigateTo({
					url:'../index/notice/notice'
				})
			},
			kefu(){
				uni.navigateTo({
					url:'kefu/kefu'
				})
				console.log('kefu');
			},
			mima(){
				uni.navigateTo({
					url:'mima/mima'
				})
				console.log('kefu');
			},
			guanyu(){
				console.log('guanyu');
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
		/* height:calc(100vh - 100rpx); */
		/* padding-bottom: 100rpx; */
		overflow: hidden;
		background-color: #EEEEEE;
	}
	.header {
		width: 100vw;
		height: 300rpx;
		line-height: 300rpx;
		background-color: #55aaff;
		/* border-radius:0 0 30% 30%; */
		/* position: relative; */
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.header-contont {
		/* position: absolute;
		top: 150rpx;
		left: 3vw; */
		width: 94vw;
		padding: 10px 0;
		display: flex;
		align-items: center;
		border-radius: 10px;
		background-color: #ffffff;
		color: #000000;
	}
	.header-icon {
		width: 22vw;
		height: 22vw;
		margin-left: 40rpx;
		border-radius: 20px;
		overflow: hidden;
		text-align: center;
	}
	.header-icon image {
		width: 22vw;
		height: 22vw;
		/* position: relative;
		top: -2.5vw;
		left: -2vw; */
		overflow: hidden;
		border-radius: 50%;
	}
	.header-mine{
		width: 50vw;
		margin-left: 40rpx;
		font-size: ;
		color: #000000;
	}
	.mine-name {
		width: 60vw;
		height: 50rpx;
		font-size: 28rpx;
		line-height: 50rpx;
	}
	.mine-qiehuan {
		margin-right: 3vw;
		font-size: 28rpx;
		width: 20vw;
		height: 20px;
		line-height: 20px;
		text-align: center;
		padding: 2px 5px;
		border-radius: 10px;
		/* border: 1px solid #00DC00 ; */
		color: #00DC00;
	}
	.commit{
		width: 50vw;
		margin: 0 auto;
		margin-top: 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background-color: #1296DB;
		color: #FFFFFF;
		border-radius: 10px;
	}
	.content {
		width: 94vw;
		margin: 0 3vw;
		margin-top: 30rpx;
		background-color: #FFFFFF;
		border-radius: 10px;
	}
	.content .content-item {
		width: 100%;
		height: 90rpx;
		line-height:90rpx;
		vertical-align: middle;
		font-size: 36rpx;
		color: #000000;
		border-radius: 10px;
		
	}
	.icon-font {
		margin-left: 10rpx;
		position: relative;
		top: 22rpx;
		width: 60rpx;
		height: 55rpx;
		line-height: 55rpx;
	}
	.icon-font image {
		width: 100%;
		height: 100%;
	}	
	.item-title {
		margin-left: 10rpx;
		width: 100%;
		border-bottom: 1px solid #EEEEEE;
	}
</style>
