<template>
	<view class="container">
		<view class="fixed" style="position: fixed; width: 100vw; z-index: 9;">
			<view class="" style="display: flex; width: 100vw;border-bottom: 1px solid #EEEEEE;">
				<view class="" style="width: 100%;">
					<uni-search-bar placeholder="请输入手术类型进行搜索"  @confirm="search" @cancel="cancle"/>
				</view>
			</view>
		</view>
		<view class="zhanwei" style="height: 114rpx;"></view>
		<u-popup v-model="rightshow" mode="right" border-radius="10">
			<view class="popup-box">
				<view class="popup-item">
					筛选条件
				</view>
				<view class="popup-item" v-for="(item,index) in danpinshaixuanList" :key="index" @click="shaixuanClick(item)">
					{{item.fl_name}}
				</view>
			</view>
		</u-popup>	
		<view class="sp-box" v-for="(item,index) in shangpinList" :key="index" @click="openPupup(item)">
			<view class="spbox-lineflex">
				<view class="">
					{{item.g_barcode}}
				</view>
			</view>
			<view class="spbox-lineflex">
				<view class="">
					{{item.g_name}}
				</view>
				<view class="">
					{{item.g_xh}}
				</view>
			</view>			
			<view class="spbox-lineflex">
				<view class="">
					{{item.g_property}}
				</view>
				
				<view class=""@click.stop="AddGood(item,index)">
					<view class="plus-box">			
						<view class="">
							<u-icon name="plus" color="#ff0000" size="36"></u-icon>
						</view>		
					</view>	
				</view>
			</view>
			<view class="spbox-lineflex">
				<view class="">
					{{item.g_factory}}
				</view>
			</view>
		</view>
		<view class="" v-if="shangpinList.length < 1">
			<u-empty  text="没有搜索结果" mode="search" :marginTop="300"></u-empty>
		</view>	
		<u-back-top :scroll-top="scrollTop" :top="1200"></u-back-top>
		<u-loadmore :status="status" v-if="shangpinList.length > 9"/>	
		<u-popup v-model="bottomshow" mode="bottom" border-radius="14" height="50%" :mask-close-able="false">
			<view>
				<view class="popup-title" style="display: flex; padding:5px 5px 0 0;">
					<view class="popup-kehu">
						商品详情
					</view>
					<uni-icons type="close" size="20" color="#b4b4b4" @click="bottomshow = false"></uni-icons>
				</view>
				<view class="popup-text-line">
					<text class="popup-text">商品条码:</text>{{danpindetail.g_barcode}}
				</view>
				<view class="popup-text-line">
					<text class="popup-text">商品编号:</text>{{danpindetail.g_code}}
				</view>
				<view class="popup-text-line">
					<text class="popup-text">商品名称:</text>{{danpindetail.g_name}}
				</view>
				<view class="popup-text-line">
					<text class="popup-text">通用名称:</text>{{danpindetail.g_tongym}}
				</view>
				<view class="popup-text-line">
					<text class="popup-text">商品规格:</text>{{danpindetail.g_property}}
				</view>
				<view class="popup-text-line">
					<text class="popup-text">商品型号:</text>{{danpindetail.g_xh}}
				</view>
				<view class="popup-text-line">
					<text class="popup-text">生产厂家:</text>{{danpindetail.g_factory}}
				</view>
				<view class="popup-text-line">
					<text class="popup-text">库存:</text>{{danpindetail.kc_count}}
				</view>
				<view class="popup-text-line">
					<text class="popup-text">商品类别:</text>{{danpindetail.g_leibie}}
				</view>			
				<view class="popup-text-line">
					<text class="popup-text">批准文号:</text>{{danpindetail.g_pizhwh}}
				</view>
				<view class="popup-text-line">
					<text class="popup-text">批准文号效期:</text>{{danpindetail.g_pizhwhyxq}}
				</view>
				<view class="popup-text-line">
					<text class="popup-text">生产许可证号:</text>{{danpindetail.g_scqyxkz}}
				</view>
				<view class="popup-text-line">
					<text class="popup-text">商品说明:</text>{{danpindetail.introduction}}
				</view>
				<view class="popup-text-line">
					<!-- <text class="popup-text">商品图片:</text> -->
					<view class="popup-img">
						<image :src="danpindetail.imageurl || '/static/logo.jpg'" mode="aspectFit"></image>
					</view>	
				</view>
			</view>
		</u-popup>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				danpininfo:{},//上级页面传入的单品信息item
				rightshow:false,
				//购物车数字角标
				badge:4, 
				bottomshow:false,//顶部弹出层控制值
				danpinshaixuanList:[],//单品筛选条件列表
				shangpinList:[],//单品数据列表
				danpindetail:{},//单品详情数据
				status: 'loadmore',//加载更多组件：加载前值为loadmore，加载中为loading，没有数据为nomore
				scrollTop: 0,//页面滚动高度
				pageindex:1,//当前分页数
				total_page:null,//总分页数
				key:'',//搜索key
				key_bh:''//筛选条件
			}
		},
		onLoad(option) {
			// console.log(option);
			if(option.danpininfo)this.danpininfo = JSON.parse(option.danpininfo)
			console.log(this.danpininfo);
			// this.request()
			this.$request({
				data:{
					type:'筛选条件',
					sub_type:'单品',
					userid:uni.getStorageSync('userid'),
					fl_bh:this.danpininfo.fl_bh					
				}
			}).then(res => {
				if(res.code != 0){
					this.danpinshaixuanList = []
					return this.$u.toast(res.data[0].msg_info)
				}
				if(res.data.length == 0){
					this.danpinshaixuanList = []
					return 
				}
				this.danpinshaixuanList.push(...res.data)
			})
		},
		onPageScroll(e) {
				this.scrollTop = e.scrollTop;
		},
		onReachBottom(){
			if(this.pageindex >= this.total_page){
				this.status = 'nomore'
			}else{
				// console.log('到底了');
				this.status = 'loading';
				this.pageindex += 1;
				this.request()
			}
			
		},
		methods: {
			//搜索方法
			search(e){ //点击键盘确定
				// console.log(e.value);
				this.pageindex = 1
				this.key = e.value
				this.shangpinList = []
				this.request()
			},
			cancle(e){	//点击搜索二字
				console.log(e.value);
				this.pageindex = 1
				this.key = e.value
				this.shangpinList = []
				this.request()
			},
			//顶部右侧图标点击右侧弹出层方法
			topiconclick(){
				this.rightshow = true
			},
			//调货申请商品添加
			AddGood(item,index) {
				this.$request({
					data:{
						type:'调货商品添加',
						userid:uni.getStorageSync('userid'),
						clientid:uni.getStorageSync('clientid'),
						sub_type:'单品',
						g_id:item.g_id,
						g_number:1,
					}
				}).then(res => {
					if(res.code != 0){
						return this.$u.toast(res.data[0].msg_info)
					}
					this.$u.toast(res.data[0].note,'success')
				})
			},
			openPupup(item){
				this.bottomshow = true
				this.$request({
					data:{
						type:'单品详情',
						userid:uni.getStorageSync('userid'),
						clientid:uni.getStorageSync('clientid'),
						g_id:item.g_id
					}
				}).then(res => {
					console.log(res);
					if(res.code != 0){
						this.danpindetail = {}
						return this.$u.toast(res.data[0].msg_info)
					}
					if(res.data.length == 0){
						this.danpindetail = {}
						return 
					}
					this.danpindetail = res.data[0]
				})
			},
			//单品列表数据请求
			request(){
				this.$request({
					data:{
						type:'单品列表',
						userid:uni.getStorageSync('userid'),
						fl_bh:this.danpininfo.fl_bh || '',
						key_bh:this.key_bh,
						key:this.key,
						current_page:this.pageindex
					}
				}).then(res => {
					if(res.code != 0){
						this.shangpinList = []
						return this.$u.toast(res.data[0].msg_info)
					}
					if(res.data.length == 0){
						this.shangpinList = []
						return 
					}
					this.shangpinList.push(...res.data)
					this.pageindex = res.data[0].current_page * 1
					this.total_page = res.data[0].total_page * 1
					this.status = 'loadmore'
				})
			},
			//单品筛选查询
			shaixuanClick(item){
				this.pageindex = 1
				this.key_bh = item.fl_bh
				this.shangpinList = []
				this.request()
				this.rightshow = false
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
	/* 悬浮购物车按钮 */
	.XF-cart {
		width: 50px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		position: fixed;
		bottom: 60px;
		right: 20px;
		z-index: 99;
		background-color:#ffaa00;
		border-radius: 50px;
	}
	.badge {
			position: absolute;
			right: -5px;
			top: 3px;
			width: auto !important;
			display: inline !important;
		
	}
	.popup-box{
		height: 100%;
		background-color: #EEEEEE;
	}
	.popup-item{
		box-sizing: border-box;
		padding: 20rpx 60rpx;
		width: 100%;
		font-size: 28rpx;
		text-align: center;
		background-color: #FFFFFF;
		border-bottom: 1px solid #EEEEEE;
	}
	.popup-item:first-of-type{
		background-color: #EEEEEE;
		font-size: 32rpx;
		position: sticky;
		top: 0;
	}
	.sp-box:nth-of-type(1){
		margin-top: 10rpx;
		
	}
	.sp-box{
		box-sizing: border-box;
		width: 100vw;
		padding: 10rpx 20rpx;
		background-color: #FFFFFF;
		border-bottom: 1px solid #EEEEEE;
	}
	.spbox-lineflex{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 0;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.spbox-lineflex:first-child view{
		/* flex: 1; */
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.plus-box{
		/* width: 28rpx;
		height: 28rpx; */
		box-sizing: border-box;
		/* padding: 4rpx 4rpx; */
		margin: 0 40rpx;
		padding-top: 4rpx;
		border: 1px solid #ff0000;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.popup-title{
		position: sticky;
		top: 0;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 999;
	}
	.popup-kehu{
		flex: 1;
		max-width: 90vw;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		padding-left: 10px;
		font-size: 16px;
		text-align: center;
	}
	.popup-text-line{
		padding: 8rpx 10px;
	}
	.popup-text{
		color: #909399;
		margin-right: 8rpx;
	}
	.popup-img{
		margin: 0 auto;
		width: 600rpx;
		height: 600rpx;
	}
	.popup-img image{
		width: 600rpx;
		height: 600rpx;
	}
</style>
