<template>
	<view class="container">
		<view class="" @click="btn">
			aaa
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
			btn(){
				uni.navigateTo({
					url:'shenqingchaxun/shenqingchaxun'
				})
			}
		}
	}
</script>

<style>
 .container{
	 width: 100vw;
	 height: 100vh;
 }
</style>
