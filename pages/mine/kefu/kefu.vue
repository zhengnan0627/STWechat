<template>
	<view class="container">
		<view class="xonglu-box" v-for="(item,index) in tongxunList" :key="index">
			<view class="name">
				{{item.Customer_Servic}}
			</view>
			<view class="phone" style="display: flex;">
				{{item.phone}}
				<view class="icon" style="margin-left: 10rpx;">
					<uni-icons type="phone-filled" color="#57C87A" @click="phone(item)"></uni-icons>
				</view>
			</view>
		</view>
		<u-empty marginTop="200" v-if="tongxunList.length == 0"></u-empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tongxunList:[]
			}
		},
		onLoad() {
			this.$request({
				data:{
					type:'客服列表',
					userid:uni.getStorageSync('userid')
				}
			}).then(res => {
				if(res.code != 0) return this.$u.toast(res.data[0].msg_info)
				console.log(res);
				this.tongxunList = res.data
			})
		},
		methods: {
			phone(item){
				uni.makePhoneCall({
					phoneNumber:item.phone
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
