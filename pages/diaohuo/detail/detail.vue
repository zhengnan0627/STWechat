<template>
	<view class="container">
		<view class="detail-info-box">
			<view class="detail-info-state">
				状态:&nbsp&nbsp{{info.type}}
			</view>
			<view class="detail-info-dingdan">
				<view class="detailinfo-box-line">
					<text class="list-box-line-text">调货单号:</text>{{info.danhao}}
				</view>
				<view class="detailinfo-box-line list-box-flex">
					<view class="">
						<text class="list-box-line-text">类型:</text>{{info.type}}
					</view>
				</view>
				<view class="detailinfo-box-line">
					<text class="list-box-line-text">日期:</text>{{info.date}}
				</view>
			</view>
		</view>
		<view class="detail-list-box" v-for="(item,index) in detailList" :key="item.bianhao">
			<view class="list-box-line list-box-flex">
				<view class="" style="flex: 1;">
					{{item.name}}
				</view>
				<view class=""style="flex: 1;">
					<text class="list-box-line-text">商品编号:</text>{{item.bianhao}}
				</view>	
			</view>
			<view class="list-box-line">
				<view class="">
					<text class="list-box-line-text">规格:</text>{{item.guige}}
				</view>
			</view>
			<view class="list-box-line list-box-flex">
				<view class="" style="flex: 1;">
					<text class="list-box-line-text">厂家:</text>{{item.cj}}
				</view>
				<view class=""style="flex: 1;">
					<text class="list-box-line-text">数量:</text>{{item.num}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{},
				detailList:[
					{name:'LJ.ID金属头',bianhao:'LKJI28843',guige:'生物型-LK.RNGLS+CPKDM',cj:'陕西纳薇',num:'1'},
					{name:'LJ.ID金属头',bianhao:'LKJI43123',guige:'生物型-LK.RNGLS+CPKDM',cj:'陕西纳薇',num:'1'},
					{name:'LJ.ID金属头',bianhao:'LK2311843',guige:'生物型-LK.RNGLS+CPKDM',cj:'陕西纳薇',num:'1'},
					{name:'LJ.ID金属头',bianhao:'LKJ765443',guige:'生物型-LK.RNGLS+CPKDM',cj:'陕西纳薇',num:'1'},
					{name:'LJ.ID金属头',bianhao:'LKJ543343',guige:'生物型-LK.RNGLS+CPKDM',cj:'陕西纳薇',num:'1'},
					{name:'LJ.ID金属头',bianhao:'LK8765843',guige:'生物型-LK.RNGLS+CPKDM',cj:'陕西纳薇',num:'1'}
				]
			}
		},
		onLoad(option) {
			this.info = JSON.parse(option.info) 
			console.log(this.info);
		},
		methods: {
			
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
	.detail-info-box{
		width: 100vw;
		height: 400rpx;
		background-color: #FFFFFF;
		margin-bottom: 10rpx;
	}
	.detail-info-state{
		box-sizing: border-box;
		padding: 0rpx 20rpx;
		width: 100%;
		height: 200rpx;
		line-height: 200rpx;
		background-color: #1296DB;
		font-size: 32rpx;
		color: #FFFFFF;
	}
	.detail-info-dingdan{
		box-sizing: border-box;
		height: 200rpx;
		padding: 10rpx 20rpx;
		background-color: #FFFFFF;
		overflow: hidden;
		font-size: 28rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.detailinfo-box-line{
		box-sizing: border-box; 
		padding: 6rpx 0;
	}
	.detail-list-box{
		box-sizing: border-box;
		padding: 10rpx 20rpx;
		background-color: #FFFFFF;
		overflow: hidden;
		font-size: 28rpx;
		border-bottom: 1px solid #EEEEEE;
	}
	.detail-list-box:nth-of-type(2){
		margin-top: 20rpx;
		/* background-color: #007AFF; */
	}
	.list-box-line{
		box-sizing: border-box; 
		padding: 6rpx 0;
	}
	.list-box-line-text{
		color: #999999;
		margin-right: 10rpx;
	}
	.list-box-flex{
		display: flex;
		min-height: 60rpx;
		justify-content: space-between;
		align-items: center;
	}
</style>
