<template>
	<view>
		<u-swiper :list="swiperlist" indicator-pos="bottomCenter" name="urls" @click="swiperClick"></u-swiper>
		<u-notice-bar :list="noticeList" @click="noticetext" @close="listclick"></u-notice-bar>
		<view class="module-title">
			功能模块
		</view>
		<u-grid :col="3">
			<u-grid-item v-for="(item,index) in list" :key="index" @click="griditemclick" :index="item">
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
				swiperlist: [],//轮播图数据
				noticeList: [],
				list: [
					{
						id: 0,
						name:'调货查询',
						url:'diaohuochaxun/shenqingchaxun/shenqingchaxun',
						image:'../../static/diaohuochaxun.png'
					},
					{
						id: 1,
						name:'下账单',
						url:'xiazhang/xiazhang',
						image:'../../static/xiazhangdan.png'
					},
					{
						id: 2,
						name:'下账单查询',
						url:'xiazhangchaxun/xiazhangchaxun',
						image:'../../static/xiazhangdanchaxun.png'
						
					},
					{
						id: 3,
						name:'库存查询',
						url:'kucun/kucun',
						image:'../../static/kucunchaxun.png'
					},
					{
						id: 4,
						name:'盘点',
						url:'pandian/pandian',
						image:'../../static/pandian.png'	
					},
					{
						id: 5,
						name:'盘点查询',
						url:'pandian/pandianlist',
						image:'../../static/pandainchaxun.png'
					},
					{
						id: 6,
						name:'返库查询',
						url:'fankuchaxun/fankuchaxun',
						image:'../../static/fanku.png'
					}
				],
				
			};
		},
		onLoad() {
			this.$request({
				data:{
					type:'网络测试'
				}
			}).then(res => {
				if(res.code != 0) return this.$u.toast(res.data[0].msg_info)
				const resdata = res.data
				console.log(res);
			})
			this.$request({
				data:{
					type:'轮播',
					userid:uni.getStorageSync('userid')
				}
			}).then(res => {
				if(res.code != 0) return this.$u.toast(res.data[0].msg_info)
				const resdata = res.data
				console.log(res);
				this.swiperlist = resdata
			})
			this.$request({
				data:{
					type:'新闻',
					userid:uni.getStorageSync('userid')
				}
			}).then(res => {
				if(res.code != 0) return this.$u.toast(res.data[0].msg_info)
				const resdata = res.data
				console.log(res);
				this.noticeList = resdata
			})
			this.$request({
				data:{
					type:'公司名称'
				}
			}).then(res => {
				if(res.code != 0) return this.$u.toast(res.data[0].msg_info)
				console.log(res);
				uni.setStorageSync('companyName', res.data[0].company_name);
				uni.setNavigationBarTitle({
				    title: res.data[0].company_name
				});
			})
			this.$request({
				data:{
					type:'客户列表',
					userid:uni.getStorageSync('userid')
				}
			}).then(addres => {
				if(addres.code == 0 && addres.data.length > 1 &&  uni.getStorageSync('clientid') == ''){
					uni.navigateTo({url:'../mine/qiehuan/qiehuan'})
				}
			})
		},
		methods: {
			swiperClick(index){
				// console.log(index);
				if(this.swiperlist[index].type == '1'){
					const n_id = JSON.stringify(this.swiperlist[index].n_id)
					uni.navigateTo({
						url:'notice/noticesubpages?n_id='+ n_id
					})
				}
			},
			noticetext(index) {
				console.log(index);
				const n_id = JSON.stringify(index.n_id)
				uni.navigateTo({
					url:'notice/noticesubpages?n_id='+ n_id
				})
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
		font-size: 32rpx;
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
