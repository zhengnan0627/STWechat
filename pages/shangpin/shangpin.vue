<template>
	<view class="container">
		<view class="" style="display: flex; width: 100vw;border-bottom: 1px solid #EEEEEE;">
			<view class="" style="width: 100%;" @click="searchclick">
				<uni-search-bar placeholder="请输入手术类型进行搜索" :disabled="true" @confirm="search" @cancel="cancle"/>
			</view>
			<view class="icon" @click="topiconclick" style="width: 80rpx;background-color: #FFFFFF;display: flex;align-items: center;">
				<uni-icons type="bars" size="26"></uni-icons>
			</view>	
		</view>
		<u-search placeholder="请输入手术类型进行搜索" :clearabled="true" v-if="false"></u-search>
		<u-tabs :list="tablist" name="fl_name"  :current="current" @change="change" bg-color="#EEEEEE"></u-tabs>
		<!-- <view class="XF-cart" @click="ToCart">
			<uni-icons type="cart" size="28" color="#ffffff"></uni-icons>
			<u-badge :count="badge"></u-badge>
		</view>	 -->
		<view class="goods-box" style="width: 100%; height: 100%;">
		<template v-if="true">
			<scroll-view
					scroll-y
					:scroll-with-animation="true"
					scroll-anchoring
					class="tab-view menu-scroll-view"
					:scroll-top="leftscrollTop"
					:style="{ height: height + 'px', top: top + 'px' }">
					<view
						v-if="goodList != []"
						:id="index"
						v-for="(item,index) in goodList"
						:key="item.fl_bh"
						class="tab-bar-item u-tab-item"
						:class="[currentTab == index ? 'active' : '']"
						:data-current="index"
						@tap.stop="swichNav(item,$event)">
						<text>{{item.fl_name}}</text>
					</view>
			</scroll-view>
			<scroll-view
				@scroll="scroll"
				scroll-anchoring
				scroll-y
				:scroll-top="scrollTop"
				class="right-box"
				@scrolltolower="scrolltolower(g_fenleiId)"
				:style="{ height: height + 'px', top: top + 'px' }">	
					<view class="page-view">
						<view class="class-box">
							<view class="class-item">
								<template v-for="(item,index) in rightgoodslist">
									<view class="g-container" :key="index">
										<view class="list-content">
											<view class="list-content-name"style="width: 90%;" @click="goodsItemClick(item,index)">
												{{item.fl_name}}
											</view>
											<view class="" style="flex: 1;">
												<view class="" v-if="type == '套餐分类'">
													<u-icon name="arrow-right" size="28" @click="taocanPlus(item,index)" ></u-icon>
												</view>	
												<view class="" v-else>
													<u-icon name="arrow-right" size="28" @click="danpinRight(item,index)"></u-icon>
												</view>
											</view>		
										</view>	
									</view>
								</template>
								<u-empty marginTop="250" text="没有搜索结果" mode="search" v-if="rightgoodslist.length == 0"></u-empty>
								<u-back-top :scroll-top="old.scrollTop" @scrollTop2="backscrollTop" :top="1200" :bottom="300"></u-back-top>
								<u-loadmore :status="status" v-if="rightgoodslist.length >= 15"/>		
							</view>
						</view>
					</view>
					<!--内容部分 end 自定义可删除-->
			</scroll-view>	
		</template>		
		</view>
		<u-popup v-model="rightshow" mode="right" border-radius="10">
			<view class="popup-box">
				<view class="popup-item">
					展示类型
				</view>
				<view class="popup-item" @click="popuptaocan">
					套餐
				</view>
				<view class="popup-item" @click="popupdanpin">
					单品
				</view>
			</view>
		</u-popup>	
		<u-popup v-model="bottomshow" mode="bottom" border-radius="14" height="50%" :mask-close-able="false">
			<view>
				<view class="popup-title" style="display: flex; padding:5px 5px 0 0;">
					<view class="popup-kehu">
						套餐详情
					</view>
					<uni-icons type="close" size="20" color="#b4b4b4" @click="bottomshow = false"></uni-icons>
				</view>
				<view class="" v-for="(item,index) in taocandetailList" :key="index">
					{{item.name}}
				</view>
			</view>
		</u-popup>			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:'套餐分类',//展示类型，缓存中取
				rightshow:false,//右侧弹出层控制值
				bottomshow:false,//底部弹出层控制值
				tablist: [],//tabs数据
				current: 0,//tabs当前选中下标
				//购物车数字角标
				badge:4,
				//scroll-view控制值
				isScroll: true,
				isTap: true,
				goodList:[],//左侧分类数据
				g_fenleiId:0,//分类id
				currentTab: 0, //左侧分类列表预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				leftscrollTop:0,//左侧tab标题的滚动条位置
				scrollTop:0,//商品列表右侧滚动高度
				height: 0, //scroll-view高度
				top: 0,
				pageindex:1,//商品列表当前数据分页数
				rightgoodslist:[],//右侧分类下列表数据
				taocandetailList:[],//套餐详情数据
				old: { //官方解决抖动办法,记录就高度 二次传值
				   scrollTop:0,//商品列表右侧滚动高度
				},
				status: 'loadmore',//加载更多组件：加载前值为loadmore，加载中为loading，没有数据为nomore 	
			}
		},
		onLoad() {
			// uni.setNavigationBarTitle({
			//     title: '新的标题'
			// });
			this.initFenleiRequest(this.type)
			console.log('shangpinonload');
			uni.$on('diaohuoemit',this.diaohuoEmit)
			setTimeout(() => {
				uni.getSystemInfo({
					success: res => {
						let header =184; //tabs组件高度变为40px(浏览器和小程序开发工具均出现，真机展示不一致，疑似bug未修复)
						// let header =174;
						let top = 0;
						console.log(res);
						this.height = res.windowHeight - uni.upx2px(header);
						this.top = top + uni.upx2px(header); 
						this.menuHeight = res.windowHeight - uni.upx2px(header);
						this.menuItemHeight = uni.upx2px(110)
						//#ifdef H5
						this.top = 44 + uni.upx2px(header); 
						//#endif
					}
				});
			}, 50);
		},
		onShow() {
			//uni.setNavigationBarTitle疑似有缓存 增加一次判断设置标题
			if(this.type == '套餐分类'){
				uni.setNavigationBarTitle({title: '商品展示-套餐'});
			}else{
				uni.setNavigationBarTitle({title: '商品展示-单品'});
			}
			//每次进入商品页面判断缓存值与当前页面type是否一致 一致的话不进行任何操作 不一致则进行type赋值并初始化所有数据
			if(this.type == uni.getStorageSync('type')) return //如果相等则不进行任何操作
			if(uni.getStorageSync('type') == '') return //第一次打开该小程序时uni.getStorageSync('type') == '' 不进行操作
			this.type = uni.getStorageSync('type');
			console.log(this.type);
			if(this.type == '套餐分类'){
				uni.setNavigationBarTitle({title: '商品展示-套餐'});
			}else{
				uni.setNavigationBarTitle({title: '商品展示-单品'});
			}
			this.current = 0
			this.currentTab = 0
			this.initFenleiRequest(this.type)
		},
		onHide(){
			// uni.setStorageSync('type', 'taocan');
			// this.type = uni.getStorageSync('type');
		},
		onUnload() {
			console.log('shangpinonUnloadonUnloadonUnload');
			uni.$off('diaohuoemit')
			uni.setStorageSync('type', '');
		},
		methods: {
			searchclick(){
				console.log('进入搜索页面');
				uni.navigateTo({
					url:'search/search'
				})
			},
			diaohuoEmit(diaohuoType){
				console.log(diaohuoType);
				if(diaohuoType == this.type) return
				
			},
			popuptaocan(){
				if(this.type == '套餐分类'){
					this.rightshow = false
					return
				}
				this.type = '套餐分类'
				this.rightshow = false
				uni.setStorageSync('type', '套餐分类');
				uni.setNavigationBarTitle({
				    title: '商品展示-套餐'
				});
				this.current = 0
				this.currentTab = 0
				this.initFenleiRequest(this.type)
			},
			popupdanpin(){
				if(this.type == '单品分类'){
					this.rightshow = false
					return
				}
				this.type = '单品分类'
				this.rightshow = false
				uni.setStorageSync('type', '单品分类');
				uni.setNavigationBarTitle({
				    title: '商品展示-单品'
				});
				this.current = 0
				this.currentTab = 0
				this.initFenleiRequest(this.type)
			},
			topiconclick(){
				this.rightshow = true
			},
			change(index) {
				if(this.current == index) return
				this.current = index;
				this.currentTab = 0
				this.$request({
					data:{
						type:this.type,
						userid:uni.getStorageSync('userid'),
						sub_type:'二级分类',
						fl_bh:this.tablist[index].fl_bh
					}
				}).then(res2 => {
					if(res2.code != 0){
						this.goodList = []
						return this.$u.toast(res2.data[0].msg_info)
					} 
					console.log(res2);
					this.goodList = res2.data
					this.$request({
						data:{
							type:this.type,
							userid:uni.getStorageSync('userid'),
							sub_type:'三级分类',
							fl_bh:this.goodList[0].fl_bh
						}
					}).then(res3 => {
						if(res3.code != 0){
							this.rightgoodslist = []
							return this.$u.toast(res3.data[0].msg_info)
						} 
						console.log(res3);
						this.rightgoodslist = res3.data
					})
				})
			},
			//购物车悬浮按钮方法
			ToCart() {
				// console.log(this.kehuinfo);
				// const kehuinfo = JSON.stringify(this.kehuinfo)
				// uni.navigateTo({
				// 	url:'cart?kehuinfo='+ kehuinfo
				// })
			},
			//底部popup弹出层方法
			goodsItemClick(item,index){
				if(this.type == '套餐分类'){
					uni.navigateTo({
						url:'taocanlist/taocanlist?danpininfo='+JSON.stringify(item)
					})
				}else{
					uni.navigateTo({
						url:'danpinlist/danpinlist?danpininfo='+JSON.stringify(item)
					})
				}	
			},
			//套餐商品添加购物车方法
			taocanPlus(item,index){
				uni.navigateTo({
					url:'taocanlist/taocanlist?danpininfo='+JSON.stringify(item)
				})
			},
			//单品商品arrow-right进入单品列表页面方法
			danpinRight(item,index){
				uni.navigateTo({
					url:'danpinlist/danpinlist?danpininfo='+JSON.stringify(item)
				})
			},
			// 点击标题切换当前页时改变样式
			async swichNav(item,e) {
				console.log(item);
				console.log(e);
				// console.log(e.currentTarget.id);
				this.g_fenleiId = e.currentTarget.id
				let cur = e.currentTarget.dataset.current;
				// this.fl_id = item.fl_id
				// this.rightgoodslist = []
				// this.pageindex = 1
				// this.rightRequest()	
				if (this.currentTab == cur) {
					// console.log(this.currentTab);
					return false;
				} else {
					this.currentTab = cur;
					console.log(this.currentTab);
				}
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
				     this.scrollTop = 0
				});
				console.log(item);
				console.log(e);
				// 如果为0，意味着尚未初始化
				if(this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.leftscrollTop = cur * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
				this.$request({
					data:{
						type:this.type,
						userid:uni.getStorageSync('userid'),
						sub_type:'三级分类',
						fl_bh:item.fl_bh
					}
				}).then(res3 => {
					if(res3.code != 0){
						this.rightgoodslist = []
						return this.$u.toast(res3.data[0].msg_info)
					} 
					console.log(res3);
					this.rightgoodslist = res3.data
				})
			},

			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({size: true},res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if(!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return ;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			},
			scroll(e) {
				//动画时长固定300ms
				
				if (!this.isScroll) {
					setTimeout(() => {
						this.isScroll = true;
					}, 150);
				} else {
					this.old.scrollTop = e.detail.scrollTop;//官方解决办法
					// this.scrollTop = e.detail.scrollTop;
					// console.log(   this.scrollTop ,   e.detail.scrollTop);
				}
			},
			//右侧商品列表回到顶部方法
			backscrollTop(){
				this.scrollTop = this.old.scrollTop
			    this.$nextTick(function() {
			         this.scrollTop = 0
			    });
			},
			//右侧滚动到底部方法
			scrolltolower(g_fenleiId) {
				console.log(this.pageindex, this.pageindex);
				if(this.pageindex >= this.total_page){
					this.status = 'nomore'
				}else{
					// console.log('到底了');
					this.status = 'loading';
					this.pageindex += 1;
					// this.rightRequest()
				}	
			},
			//跳转到商品详情页面方法
			goodsdetail(item,index){
				const kehuinfo = JSON.stringify(this.kehuinfo)
				uni.navigateTo({
					url:'goodsdetail?item='+JSON.stringify(item)+'&kehuinfo='+ kehuinfo
				})
			},
			//单品/套餐分类数据请求方法(优化为async await,待完善)
			async XXXXinitFenleiRequest(type){
				const tablistres = await	this.$request({
						data:{
							type:type,
							userid:uni.getStorageSync('userid'),
							sub_type:'一级分类',
							fl_bh:''
						}
					})
				this.tablist = tablistres.data	
				const goodListres = await	this.$request({
					data:{
						type:type,
						userid:uni.getStorageSync('userid'),
						sub_type:'二级分类',
						fl_bh:this.tablist[0].fl_bh
					}
				})
				this.goodList = goodListres.data
				const rightgoodslistres = await this.$request({
						data:{
							type:type,
							userid:uni.getStorageSync('userid'),
							sub_type:'三级分类',
							fl_bh:this.goodList[0].fl_bh
						}
					})
				this.rightgoodslist = rightgoodslistres.data
			},
			//单品/套餐分类数据请求方法
			initFenleiRequest(type){
					this.$request({
						data:{
							type:type,
							userid:uni.getStorageSync('userid'),
							sub_type:'一级分类',
							fl_bh:''
						}
					}).then(res => {
						if(res.code != 0) return this.$u.toast(res.data[0].msg_info)
						console.log(res);
						this.tablist = res.data
						this.$request({
							data:{
								type:type,
								userid:uni.getStorageSync('userid'),
								sub_type:'二级分类',
								fl_bh:this.tablist[0].fl_bh
							}
						}).then(res2 => {
							if(res2.code != 0) return this.$u.toast(res2.data[0].msg_info)
							console.log(res2);
							this.goodList = res2.data
							this.$request({
								data:{
									type:type,
									userid:uni.getStorageSync('userid'),
									sub_type:'三级分类',
									fl_bh:this.goodList[0].fl_bh
								}
							}).then(res3 => {
								if(res3.code != 0) return this.$u.toast(res3.data[0].msg_info)
								console.log(res3);
								this.rightgoodslist = res3.data
							})
						})
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
		/* height: 100vh; */
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
	.tab-view {
		/* height: 100%; */
		width: 200rpx;
		position: fixed;
		left: 0;
		z-index: 10;
		background-color: #EEEEEE;
	}
	.tab-bar-item {
		padding: 0 10rpx;
		width: 200rpx;
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
	}
	.active {
		position: relative;
		color: #000;
		font-size: 26rpx;
		font-weight: 600;
		background: #fcfcfc;
	}
	
	.active::before {
		content: '';
		position: absolute;
		border-left: 8rpx solid #e41f19;
		height: 30rpx;
		left: 0;
	}
	/* 左侧导航布局 end*/
	
	.right-box {
		width: 100%;
		background: #fff;
		position: fixed;
		padding-left: 200rpx;
		box-sizing: border-box;
		left: 0;
	}
	.page-view {
		width: 100%;
		overflow: hidden;
		/* padding-top: 20rpx; */
		/* padding-right: 20rpx; */
		box-sizing: border-box;
	}
	
	.pageview-item {
		background: #fff;
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 20rpx 20rpx 20rpx;
		/* margin-bottom: 20rpx; */
		border-radius: 12rpx;
	}
	
	.pageview-name {
		font-size: 34rpx;
		font-weight: bold;
	}
	
	.g-container {
		/* padding-top: 20rpx; */
		
	}
	.list-content {
		box-sizing: border-box;
		padding: 20rpx 20rpx;
		width: 100%;
		/* min-height: 40rpx; */
		border-bottom: 1px solid #EEEEEE;
		display: flex;
		font-size: 26rpx;
		justify-content: space-between;
		align-items: center;
	}
	.list-content-name{
		/* height: 40rpx;
		line-height: 40rpx; */
	}
	.spbox-lineflex{
		width: 100%;
		border-bottom: 1px solid #EEEEEE;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.plus-box{
		width: 32rpx;
		height: 32rpx;
		box-sizing: border-box;
		/* padding: 4rpx 4rpx; */
		border: 1px solid #ff0000;
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: space-around;
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
</style>
