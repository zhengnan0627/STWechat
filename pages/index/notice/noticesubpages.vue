<template>
	<view class="container">	
		<view class="notice">
			<view class="notice-title">
				{{n_title}}
			</view>
			<view class="notice-time">
				<text style="margin-right: 10px;">{{n_date}}</text>
				<text>{{n_author}}</text>
			</view>
		</view>
		<view class="notice-content">
			
				<!-- 富文本解析 -->
				<u-parse :html="content"></u-parse>	
			
		</view>
	</view>	
</template>

<script>
	export default {
		data() {
			return {
				n_id:null,//公告id,上级页面传参数过来
				userid:null,//用户id(从缓存中取)
				n_title:'',//公告标题
				n_author:'',//公告发布人
				n_date:'',//公告发布时间
				content: null,//公告内容(html格式富文本)
			}
		},
		onLoad:function(option){
			console.log(option);
			this.n_id = JSON.parse(option.n_id)
			this.userid = uni.getStorageSync('userid')
			this.$request({
				data:{
					type:'新闻详情',
					userid:this.userid,
					n_id:this.n_id
				}
			}).then(res => {
				if(res.code != 0) return this.$u.toast(res.data[0].msg_info)
				const resdata = res.data[0]
				console.log(res);
				// this.noticeList = resdata
				console.log(resdata);
				this.n_title = resdata.n_title
				this.n_author = resdata.n_author
				this.n_date = resdata.n_date
				this.content = resdata.htmlContent
			})
		},
		methods: {
			back(){
				uni.navigateBack({
					
				})
			},
		}
	}
</script>

<style>
	.container {
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
	
		text-overflow:ellipsis;
		white-space:wrap;
	}
	.notice {
		width: 100vw;
		margin: 5px 0;
		padding-left: 2.5vw;
		background-color: #FFFFFF;
	}
	.notice-title {
		width: 100vw;
		height: 50px;
		line-height: 50px;
		font-size: 20px;
	}
	.notice-time {
		width: 100vw;
		height: 30px;
		/* line-height: 50px; */
		color: #a7a7a7;
		font-size: 32rpx;
	}
	.notice-content {
		width: 95vw;
		margin: 0 auto;
		font-size: 34rpx;
		color: #4b4b4b;
	}
	
</style>
