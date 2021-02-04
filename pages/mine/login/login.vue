<template>
	<view class="container">
		<view class="logo-box">
			<image src="../../../static/logo.png" mode="aspectFit"></image>
		</view>
		<u-form class="u-form" >
			<u-form-item :label-position="labelPosition" label="账号" prop="name" left-icon="account-fill" :leftIconStyle="{color: '#888', fontSize: '32rpx'}"  label-width="140" >
				<u-input :border="border" placeholder="请输入账号" v-model="name" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="密码" prop="name" left-icon="lock-fill" :leftIconStyle="{color: '#888', fontSize: '32rpx'}"  label-width="140" >
				<u-input :border="border" placeholder="请输入密码" v-model="password" type="password"></u-input>
			</u-form-item>
		</u-form>
		<view class="commit" @click="denglu">
			登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				password:'',
				border: false,
				labelPosition: 'left',
				errorType: ['message'],
			}
		},
		methods: {
			// // #ifdef MP
			// wx.enableAlertBeforeUnload({  
			//     message:"message",  
			//     complete:(e)=>{  
			//         console.log(e);  
			//     }                 
			// }),
			// // #endif
			denglu(){
				console.log('dl');
				console.log(this.name);
				console.log(this.password);
			}
			
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF !important;
	}
	.container {
		width: 100vw;
		/* height: 100vh; */
		overflow: hidden;
		background-color: #FFFFFF;
	}
	.logo-box{
		margin-top: 20rpx;
		width: 100vw;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}
	.logo-box image {
		width: 300rpx;
		height: 300rpx;
	}
	.u-form{
		box-sizing: border-box;
		padding-left: 40rpx;
		/* width: 80vw; */
		margin: 20rpx auto;
		background-color: #FFFFFF;
	}
	.commit{
		width: 50vw;
		margin: 0 auto;
		margin-top: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background-color: #1296DB;
		color: #FFFFFF;
		border-radius: 10px;
	}
</style>
