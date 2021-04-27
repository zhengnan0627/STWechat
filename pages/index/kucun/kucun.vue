<template>
	<view class="container">
		<view class="fixed" style="position: fixed; width: 100vw; z-index: 9;">
			<view class="height-box" style="border-bottom: 1px solid #EEEEEE;">
				<uni-search-bar placeholder="请输入商品名/助记码/编号等进行搜索"  @confirm="search" @cancel="cancle"/>
				<view class="fromitem-box" style="background-color: #FFFFFF;border-top: 2px solid #EEEEEE;">
					<u-form >
						<u-form-item :label-position="labelPosition" label="货位选择" prop="qyType" label-width="200">
							<u-input  type="select" :select-open="selectShow" v-model="huoweiType" :placeholder="huoweiType || '请选择货位'" input-align="right" @click="selectShow = true"></u-input>
						</u-form-item>
						<u-select mode="single-column" :default-value="selectDefault" value-name="hw" label-name="huowname" :list="selectList" v-model="selectShow" title="请选择货位" @confirm="selectConfirm1" ></u-select>
					</u-form>
				</view>
			</view>
		</view>
		<view class="zhanwei"  :style="{'height':height+'px'}"></view>
		<view class="list-box" v-for="(item,index) in kucunList" :key="index">
			<view class="list-box-absolute" v-if="item.kc_count < item.kc_min">
				库存不足
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
					{{item.g_xh}}
				</view>
				<view class="listbox-flex-flexitem">
					{{item.g_property}}
				</view>
			</view>
			<view class="list-box-flex list-box-line">
				<view class="listbox-flex-flexitem">
					剩余库存:<text :style="{'color':item.kc_count   < item.kc_min ? '#FF0000' : ''}">{{item.kc_count}}</text>
				</view>
				<view class="listbox-flex-flexitem">
					库存上下限:<text >{{item.kc_min}}-{{item.kc_max}}</text>
				</view>
			</view>
			<view class="list-box-flex list-box-line">
				<view class="listbox-flex-flexitem">
					{{item.g_factory}}
				</view>
			</view>
			<view class="list-box-flex list-box-line">
				<view class="listbox-flex-flexitem">
					调货信息:<text >{{item.dh_remark}}</text>
				</view>
			</view>
		</view>
		<view class="" v-if="kucunList.length < 1">
			<u-empty  text="没有搜索结果" mode="search" :marginTop="300"></u-empty>
		</view>	
		<u-back-top :scroll-top="scrollTop" :top="1200"></u-back-top>
		<u-loadmore :status="status" v-if="kucunList.length > 9"/>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height:110,//站位view高度，通过uni.createSelectorQuery().select('.height-box').boundingClientRect
				selectShow: false,
				labelPosition: 'left',
				huoweiType:'',
				//-----------------------选择库存数据项----------------
				selectList: [],
				selectDefault:[0],//选择器默认值
				hw:'',//货位主键
				kucunList:[],
				status: 'loadmore',//加载更多组件：加载前值为loadmore，加载中为loading，没有数据为nomore
				scrollTop: 0,//页面滚动高度
				pageindex:1,//当前分页数
				total_page:null,//总分页数
				key:'',//搜索key
			}
		},
		onLoad() {
			this.$request({
				data:{
					type:'货位列表',
					userid:uni.getStorageSync('userid'),
					clientid:uni.getStorageSync('clientid')
				}
			}).then(res => {
				if(res.code != 0){
					return this.$u.toast(res.data[0].msg_info)
				}
				if(res.data.length == 0){
					this.selectList = []
					return 
				}
				this.selectList=res.data
			})
		},
		onReady() {
			let obj = uni.createSelectorQuery().select('.height-box')
			obj.boundingClientRect(data => {
					// console.log(data);
						this.height = data.height
			}).exec()
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
				this.kucunList = []
				this.request()
			},
			cancle(e){	//点击搜索二字
				console.log(e.value);
				this.pageindex = 1
				this.key = e.value
				this.kucunList = []
				this.request()
			},
			// 选择商品类型回调
			selectConfirm1(e) {
				if(this.huoweiType == e[0].label) return
				console.log(e);
				this.huoweiType = '';
				this.huoweiType = e[0].label;
				this.selectList.forEach((item,index)=>{
					console.log(item,index);
					if (this.huoweiType == item.huowname) this.selectDefault[0] = index
				})
				console.log(this.huoweiType);
				this.hw = e[0].value
				this.kucunList = []
				this.key = ''
				this.request()
			},
			//单品列表数据请求
			request(){
				this.$request({
					data:{
						type:'库存列表',
						userid:uni.getStorageSync('userid'),
						clientid:uni.getStorageSync('clientid'),
						hw:this.hw,
						key:this.key,
						current_page:this.pageindex
					}
				}).then(res => {
					if(res.code != 0){
						this.kucunList = []
						return this.$u.toast(res.data[0].msg_info)
					}
					if(res.data.length == 0){
						this.kucunList = []
						return 
					}
					this.kucunList.push(...res.data)
					this.pageindex = res.data[0].current_page * 1
					this.total_page = res.data[0].total_page * 1
					this.status = 'loadmore'
					this.key = ''
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
		font-size: 16rpx;
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
	}
</style>
