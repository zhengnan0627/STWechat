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
		<u-swiper :list="swiperlist" indicator-pos="bottomCenter"></u-swiper>
		<u-notice-bar :list="noticList" @click="noticetext" @close="listclick"></u-notice-bar>
		<view class="module-title">
			功能模块
		</view>
		<u-grid :col="3">
			<u-grid-item v-for="(item,index) in list" :key="index" @click="griditemclick" :index="item">
				<!-- <u-icon name="photo" :size="46"></u-icon> -->
				<image :src="item.image" mode="scaleToFill" class="grid-image"></image>
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
				noticList: [
					{
						text: '寒雨连江夜入吴寒雨连江夜入吴寒雨连江夜入吴寒雨连江夜入吴',
						id: 0,
						name:'下账单',
						url:'xiazhang/xiazhang',
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
					},
				],
				list: [
					{
						id: 0,
						name:'下账单',
						url:'xiazhang/xiazhang',
						image:'../../static/xiazhangdan.png'
					},
					{
						id: 1,
						name:'盘点',
						url:'pandian/pandian',
						image:'../../static/pandian.png'
					},
					{
						id: 2,
						name:'库存查询',
						url:'kucun/kucun',
						image:'../../static/kucunchaxun.png'
					},
					{
						id: 0,
						name:'下账单查询',
						url:'xiazhangchaxun/xiazhangchaxun',
						image:'../../static/xiazhangdanchaxun.png'
					},
					{
						id: 1,
						name:'盘点查询',
						url:'pandian/pandianlist',
						image:'../../static/pandainchaxun.png'
					},
					{
						id: 2,
						name:'调货查询',
						url:'diaohuochaxun/shenqingchaxun/shenqingchaxun',
						image:'../../static/diaohuochaxun.png'
					}
				],
				
			};
		},
		onLoad() {
			// this.$request({
			// 	data:{
			// 		type:'网络测试'
			// 	}
			// }).then(res => {
			// 	if(res.code != 0) return this.$u.toast(res.data.msg_info)
			// 	const resdata = res.data
			// 	console.log(res);
			// })
			// this.$request({
			// 	data:{
			// 		type:'公司名称'
			// 	}
			// }).then(res => {
			// 	if(res.code != 0) return this.$u.toast(res.data.msg_info)
			// 	console.log(res);
			// 	uni.setStorageSync('companyName', res.data[0].company_name);
			// 	// uni.setNavigationBarTitle({
			// 	//     title: res.data[0].company_name
			// 	// });
			// })
			// uni.showModal({
			//     title: '登录提示',
			//     content: '当前未登录,请前往登录',
			//     success: function (res) {
			//         if (res.confirm) {
			// 			// uni.redirectTo({
			// 			// 	url:'/pages/mine/login/login'
			// 			// })
			// 			console.log('用户点击确定');
			//         } else if (res.cancel) {
			//             console.log('用户点击取消');
			//         }
			//     } 
			// });
			//进行登录状态检测
			// this.$logo()
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
		width: 160rpx !important;
		height: 160rpx !important;
		padding: 10rpx 10rpx;
	} 
	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}
</style>
