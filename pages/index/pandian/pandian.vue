<template>
	<view class="container">
		<view class="fixed" style="position: fixed; width: 100vw; z-index: 9;">
			<view class="height-box" style="border-bottom: 1px solid #EEEEEE;">
				<uni-search-bar placeholder="请输入商品名/助记码/编号等进行搜索"  @confirm="search" @cancel="cancle"/>
			</view>
		</view>
		<view class="zhanwei"  style="height: 106rpx;"></view>
		<view class="list-box" v-for="(item,index) in pandianList" :key="index">
			<view class="list-box-absolute" :style="{'backgroundColor':item.pd_type == 1 ? '#00aaff' : '#FF0000'}">
				{{item.pd_type == 1? '已盘':'未盘'}}
			</view>
			<view class="list-box-line">
				{{item.g_barcode}}
			</view>
			<view class="list-box-line">
				{{item.g_code}}
			</view>
			<view class="list-box-line">
				{{item.g_name}}
			</view>
			<view class="list-box-flex list-box-line">
				<view class="listbox-flex-flexitem">
					{{item.g_property}}
				</view>
				<view class="listbox-flex-flexitem">
					{{item.g_xh}}
				</view>
			</view>
			<view class="list-box-line">
				{{item.g_factory}}
			</view>
			<view class="list-box-line">
				{{item.g_pihao}}
			</view>
			<view class="list-box-flex list-box-line">
				<view class="listbox-flex-flexitem">
					库存数量:<text style="margin-left: 10rpx;">{{item.kc_count}}</text>
				</view>
				<view class="listbox-flex-flexitem">
					<view class="">
						盘点数量:
					</view>	
					<view class="listbox-flex-input"style="margin-left: 10rpx;">
						<!-- <u-input v-model="item.g_number" placeholder="" height="40" type="number" :border="true" :clearable="false" :key="item.g_id"/> -->
						<input type="number" :value="item.g_number" @input="input($event,item,index)" @blur="inputBlur($event,item,index)"/>
					</view>
				</view>
			</view>
		</view>
		<view class="" v-if="pandianList.length < 1">
			<u-empty  text="没有搜索结果" mode="search" :marginTop="300"></u-empty>
		</view>	
		<u-back-top :scroll-top="scrollTop" :top="1200"></u-back-top>
		<u-loadmore :status="status" v-if="pandianList.length > 9"/>	
		<view class="zhanwei"style="width: 100vw;height: 160rpx;">
			
		</view>
		<view class="commit-box">
			<view class="commit" @click="modalShow = true">
				提交盘点
			</view>
		</view>
		<u-modal v-model="modalShow" title="填写备注"confirm-text="确认提交" show-cancel-button @confirm="commit" @cancel="cancel">
			<view class="slot-content">
				<u-form>
					<u-form-item  label-position="left"  prop="zhendaunjieguo">
						<u-input  placeholder="请输入备注信息" v-model="remark" type="text"></u-input>
					</u-form-item>
				</u-form>
			</view>
		</u-modal>
		<u-modal v-model="pandianShow" title="提示"content="暂无盘点任务,是否生成新任务" confirm-text="确认" show-cancel-button @confirm="pandiancommit" @cancel="pandiancancel">
			
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height:53,//站位view高度，通过uni.createSelectorQuery().select('.height-box').boundingClientRect
				huoweiType:'',
				pandianShow:false,//盘点列表为空时的提示框控制值
				pandianList:[
					// {name:'LK.LCU金属头',bianhao:'LKHJ1511',goods:'生物型-LK.RIBMS+JDAL',sy_num:'1',cj:'陕西纳薇',xianzhi:'1',is_status:'0'}
				],
				status: 'loadmore',//加载更多组件：加载前值为loadmore，加载中为loading，没有数据为nomore
				scrollTop: 0,//页面滚动高度
				pageindex:1,//当前分页数
				total_page:null,//总分页数
				key:'',//搜索key
				modalShow:false,//备注模态框控制值
				remark:'',//备注
			}
		},
		onLoad() {
			const _this = this
			this.$request({
				data:{
					type:'盘点商品列表',
					userid:uni.getStorageSync('userid'),
					clientid:uni.getStorageSync('clientid'),
					current_page:this.pageindex
				}
			}).then(res => {
				if(res.code != 0){
					return _this.$u.toast(res.data[0].msg_info)
				}
				if(res.data.length == 0){
					_this.pandianShow = true
				}
				_this.pandianList.push(...res.data)
				_this.pageindex = res.data[0].current_page * 1
				_this.total_page = res.data[0].total_page * 1
				_this.status = 'loadmore'
				_this.key = ''
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
		onReady() {
			// let obj = uni.createSelectorQuery().select('.height-box')
			// obj.boundingClientRect(data => {
			// 		// console.log(data);
			// 			this.height = data.height
			// }).exec()
		},
		// onBackPress(event) {
		// 	console.log(event);
		// 	return true
		// },
		methods: {
			// dropdown(val){
			// 	console.log(val);
			// },
			request(){
				const _this = this
				_this.$request({
					data:{
						type:'盘点商品列表',
						userid:uni.getStorageSync('userid'),
						clientid:uni.getStorageSync('clientid'),
						current_page:_this.pageindex,
						key:_this.key
					}
				}).then(res2 => {
					if(res2.code != 0){
						return _this.$u.toast(res2.data[0].msg_info)
					}
					if(res2.data.length == 0){
						
					}
					_this.pandianList.push(...res2.data)
					_this.pageindex = res2.data[0].current_page * 1
					_this.total_page = res2.data[0].total_page * 1
					_this.status = 'loadmore'
					_this.key = ''
				})
			},
			//搜索方法
			search(e){ //点击键盘确定
				console.log(e.value);
				this.pageindex = 1
				this.key = e.value
				this.pandianList = []
				this.request()	
			},
			cancle(e){	//点击搜索二字
				console.log(e.value);
				this.pageindex = 1
				this.key = e.value
				this.pandianList = []
				this.request()
			},
			input(event,item,index){
				// console.log(item);
				// console.log(event);
				// item.g_number = event.target.value * 1
				// console.log(this);
			},
			inputBlur(event,item,index){
				console.log(event);
				console.log(item);
				console.log(index);
				this.$request({
					data:{
						type:'盘点数量修改',
						userid:uni.getStorageSync('userid'),
						clientid:uni.getStorageSync('clientid'),
						g_id:item.g_id,
						g_pihao:item.g_pihao,
						g_number:event.target.value	* 1					
					}
				}).then(res => {
					if(res.code != 0){
						return this.$u.toast(res.data[0].msg_info)
					}
					this.pandianList[index].pd_type = 1
					item.g_number = event.target.value * 1
					// this.$u.toast(res.data[0].note,'success')
				})
			},
			cancel(){
				this.remark = ''
			},
			pandiancancel(){
				uni.navigateBack({})
			},
			pandiancommit(){
				const _this = this
				_this.$request({
					data:{
						type:'生成盘点任务',
						userid:uni.getStorageSync('userid'),
						clientid:uni.getStorageSync('clientid'),
						current_page:_this.pageindex
					}
				}).then(res2 => {
					if(res2.code != 0){
						return _this.$u.toast(res2.data[0].msg_info)
					}
					if(res2.data.length == 0){
						
					}
					_this.pandianList.push(...res2.data)
					_this.pageindex = res2.data[0].current_page * 1
					_this.total_page = res2.data[0].total_page * 1
					_this.status = 'loadmore'
					_this.key = ''
				})
			},
			commit(){
				uni.showLoading({
					title:'加载中',
					mask:true
				})
				// let good_list = []
				// if(this.pandianList.length == 0) return this.$u.toast('盘点列表为空')
				// this.pandianList.forEach(item => {
				// 	let pushitem = {}
				// 	pushitem.g_id = item.g_id
				// 	pushitem.g_pihao = item.g_pihao
				// 	pushitem.g_number = item.g_number * 1
				// 	good_list.push(pushitem)
				// 	// console.log(pushitem);
				// })
				this.$request({
					data:{
						type:'盘点提交',
						userid:uni.getStorageSync('userid'),
						clientid:uni.getStorageSync('clientid'),
						remark:this.remark
					}
				}).then(res => {
					uni.hideLoading()
					if(res.code != 0){
						return this.$u.toast(res.data[0].msg_info)
					}
					this.$u.toast(res.data[0].note,'success')
					setTimeout(() => {
						uni.navigateBack({})
					},1500)
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
	.list-box{
		position: relative;
		box-sizing: border-box;
		padding: 10rpx 20rpx;
		margin: 10rpx 0;
		background-color: #FFFFFF;
		overflow: hidden;
		font-size: 28rpx;
	}
	.list-box:first-of-type{
		margin-top: 20rpx;
	}
	.list-box-absolute{
		position: absolute;
		right: 0;
		top: 0;
		font-size: 24rpx;
		background-color: #FF0000;
		color: #FFFFFF;
		padding: 6rpx 30rpx;
	}
	.list-box-line{
		padding: 4rpx 0;
	}
	.list-box-flex{
		display: flex;
		justify-content: space-between;
	}
	.listbox-flex-flexitem{
		flex: 1;
		display: flex;
		align-items: center;
	}
	.listbox-flex-input{
		box-sizing: border-box;
		padding: 4rpx 10rpx;
		display: inline-block;
		flex: 1;
		max-width: 160rpx;
		height: 40rpx;
		border: 1px solid #dcdfe6;
		display: flex;
		align-items: center;
		text-align: center;
		border-radius: 6rpx;
	}
	.commit-box{
		position: fixed;
		bottom: 40rpx;
		width: 100vw;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		z-index: 999;
	}
	.commit{
		margin: 0rpx auto;
		width: 30vw;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background-color: #1296DB;
		color: #FFFFFF;
		border-radius: 10px;
		z-index: 999;
	}
</style>
