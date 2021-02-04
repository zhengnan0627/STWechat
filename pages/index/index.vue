<template>
	<view>
		<!-- <view class="swiper">
			<swiper autoplay="true" indicator-dots indicator-color="#ffffff" indicator-active-color="#ff0000" circular="true"
			 interval="2000" duration="1000" class="swiper_warp" style="height: 100%;">
				<block v-for="(item,i) in swiperlist" :key="i">
					<swiper-item>
						<view class="swiper-item">
							<image :src="item.image" mode="aspectFit"></image>
						</view>
					</swiper-item>
				</block>
			</swiper>
		</view> -->
		<u-swiper :list="swiperlist" :title="true"></u-swiper>
		<u-notice-bar :list="list" @click="noticetext" @close="listclick"></u-notice-bar>
		<view class="module-title">
			功能模块
		</view>
		<u-grid :col="3">
			<u-grid-item v-for="(item,index) in list" :key="index" @click="griditemclick" :index="item">
				<!-- <u-icon name="photo" :size="46"></u-icon> -->
				<image src="../../static/logo.png" mode="scaleToFill" class="grid-image"></image>
				<view class="grid-text">{{item.name}}</view>
			</u-grid-item>
		</u-grid>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickName: null,
				avatarUrl: null,
				isCanUse: uni.getStorageSync('isCanUse') || true, //默认为true
				swiperlist: [
					{
						image: '/static/logo.png',
						'title':'平明送客楚山孤'
					},
					{
						image: '/static/logo.png',
						'title':'寒雨连江夜入'
					},
					{
						image: '/static/logo.png',
						'title':'洛阳亲友如相问'
					},
				],
				list: [
					{
						text: '寒雨连江夜入吴寒雨连江夜入吴寒雨连江夜入吴寒雨连江夜入吴',
						id: 0,
						name:'下账单',
						url:'xiazhang/xiazhang'
					},
					{
						text: '平明送客楚山孤',
						id: 1,
						name:'盘点',
						url:'pandian/pandian'
					},
					{
						text: '洛阳亲友如相问',
						id: 2,
						name:'库存查询',
						url:'kucun/kucun'
					}
				],
				
			};
		},
		onLoad() {

		},
		methods: {
			noticetext(index) {
				console.log(index);
			},
			listclick() {
				console.log('查看更多被点击');
				uni.navigateTo({
					url:'./notice/notice'
				})
			},
			griditemclick(e) {
				console.log(e);
				uni.navigateTo({
					url:e.url
				})
			}
			
		},
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		/* background-color: #FFFFFF; */
	}

	.swiper {
		width: 100vw;
		height: 360rpx;
		border-top: 5px solid #D5D5D5;
	}

	.swiper .swiper-item {
		width: 100vw;
		height: 100%;
	}

	.swiper .swiper-item image {
		width: 100%;
		height: 100%;
	}
	.module-title {
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		font-weight: 600;
		padding-left: 20rpx;
		background-color: #FFFFFF;
		border-bottom: 1px solid #D5D5D5;
		border-top: 5px solid #D5D5D5;
	}
	.grid-image{
		width: 180rpx !important;
		height: 180rpx !important;
		padding: 20rpx 10rpx;
	} 
	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}
</style>
