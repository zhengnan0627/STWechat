<template>
	<view class="container">
		<view class="header">
			<view class="header-contont">
				<view class="header-icon">
					<image src="../../static/logo.jpg" mode=""></image>
				</view>
				<view class="header-mine">
					<view class="mine-name">
						{{userName}}
					</view>
				</view> 
			</view>	
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="map-fill" title="切换医院" :center="true" :value="mendianInfo" @click="qiehuan"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item :icon="item.icon" :title="item.title" @click="cellClick(item)" v-for="(item,index) in cellList" :key="index"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="commit" @click="tuichu">
			{{userName != '未登录'?'退出登录':'登录'}}
		</view>
		<view class="bottom-text">
			本小程序由河南觅云仓信息科技有限公司提供技术支持
		</view>
	</view>
</template>

<script>
	export default { 
		data() {
			return {
				userName:'退出登录',
				mendianInfo:'',
				cellList:[
					{icon:'phone-fill',title:'通讯目录',url:'tongxunlu/tongxunlu'},
					{icon:'bell-fill',title:'新闻列表',url:'../index/notice/notice'},
					{icon:'server-fill',title:'联系客服',url:'kefu/kefu'},
					{icon:'lock-fill',title:'修改密码',url:'mima/mima'},
					{icon:'info-circle',title:'关于我们',url:'guanyu/guanyu'},
					
				]
				
			}
		},
		onLoad() {
			uni.$on('login',(usnerinfo)=>{  
				   console.log(usnerinfo); 
				}) 
		},
		onShow() {
			this.userName = uni.getStorageSync('username') || '未登录';
			this.mendianInfo = uni.getStorageSync('address') || '';
		},
		methods: {
			tuichu(){
				if(this.userName == '未登录'){
					uni.reLaunch({
						url:'login/login'
					})
				}else{
					uni.setStorageSync('user', '');
					uni.setStorageSync('password', '');
					uni.setStorageSync('userid', '');
					uni.setStorageSync('username', '');
					uni.setStorageSync('address', '');
					uni.setStorageSync('clientid', '');
					this.userName = '未登录'
					this.mendianInfo = ''
					this.$u.toast('账号已注销,正在前往登录')
					setTimeout(()=>{
						uni.reLaunch({
							url:'login/login'
						})
					},1500)
				}
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
		/* height:calc(100vh - 100rpx); */
		/* padding-bottom: 100rpx; */
		overflow: hidden;
		background-color: #EEEEEE;
	}
	.header {
		width: 100vw;
		height: 300rpx;
		line-height: 300rpx;
		background-color: #1296DB;
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
	.bottom-text{
		box-sizing: border-box;
		margin: 20rpx 0;
		width: 100%;
		text-align: center;
		padding: 0 20rpx;
		font-size: 24rpx;
		color: #909399;
	}
</style>
