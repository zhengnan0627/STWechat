<template>
	<view class="container">
		<view class="logo-box">
			<image src="../../../static/logo.jpg" mode="aspectFit"></image>
		</view>
		<u-form class="u-form" >
			<u-form-item :label-position="labelPosition" label="账号" prop="user" left-icon="account-fill" :leftIconStyle="{color: '#888', fontSize: '32rpx'}"  label-width="140" >
				<u-input :border="border" placeholder="请输入账号" v-model="user" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="密码" prop="password" left-icon="lock-fill" :leftIconStyle="{color: '#888', fontSize: '32rpx'}"  label-width="140" >
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
				user:'',
				password:'',
				border: false,
				labelPosition: 'left',
				errorType: ['message'],
			}
		},
		onLoad() {
			uni.hideHomeButton()
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
				// console.log(this.$u.test.mobile(this.user));//验证是否是手机号
				// console.log('dl');
				// console.log(this.user);
				// console.log(this.password);
				this.$request({
					data:{
						type:'登录',
						user:this.user,
						password:this.password
					}
				}).then(res => {
					if(res.code != 0) return this.$u.toast(res.data[0].msg_info)
					console.log(res);
					uni.setStorageSync('user', this.user);
					uni.setStorageSync('password', this.password);
					uni.setStorageSync('userid', res.data[0].userid);
					uni.setStorageSync('username', res.data[0].username);
					this.$u.toast('登录成功','success')
					setTimeout(()=>{
						uni.switchTab({
						    url: '/pages/index/index'
						})
						this.$request({
							data:{
								type:'客户列表',
								userid:uni.getStorageSync('userid')
							}
						}).then(addres => {
							if(addres.code == 0 && addres.data.length == 1){
								 uni.setStorageSync('address', addres.data[0].client_name)
								 uni.setStorageSync('clientid', addres.data[0].clientid)
							}
						})
					},1000)
				})
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
