<template>
	<view class="container">
		<tui-tabs :tabs="tabs" :isFixed="scrollTop>=0" :currentTab="currentTab" selectedColor="#00C52A" sliderBgColor="#00C52A"
		 @change="change" itemWidth="50%"></tui-tabs>
		<!--选项卡全部订单-->
		<view :class="[currentTab === 0 ? 'actineclass' : 'errorclass']">
				<view class="tui-order-item" v-for="(item,index) in AfterSaleData" :key="index">
					<tui-list-cell :hover="false" :lineLeft="false">
						<view class="tui-goods-title">
							<view>订单号：{{item.order_number}} <text class="iconfont icon-lujing182" @click="clipboard(item.order_number)"></text></view>
							<view class="tui-order-status" v-if="item.after_sale_status ==0 ">审核中</view>
							<view class="tui-order-status" v-if="item.after_sale_status ==1 ">同意</view>
							<view class="tui-order-status" v-if="item.after_sale_status ==2 ">拒绝</view>
							<view class="tui-order-status" v-if="item.after_sale_status ==3 ">待确认</view>
							<view class="tui-order-status" v-if="item.after_sale_status ==4 ">已确认</view>
							<view class="tui-order-status" v-if="item.after_sale_status ==5 ">已取消</view>
							
						</view>
					</tui-list-cell>
					
						<tui-list-cell padding="0" @click="detail">
							<view class="tui-goods-item">
								<image :src="item.url" class="tui-goods-img"></image>
								<view class="tui-goods-center">
									<view class="tui-goods-name"><text class="tag-tit">采手精选</text>{{item.name}}</view>
									<view class="tui-goods-attr">{{item.specification}}×{{item.goods_number}}</view>
									<view class="tui-goods-flex">
										<view class="tui-goods-attr1">￥{{item.platform_price}}元</view>
										<view class="tui-goods-attr">实付{{item.market_price}}元(含运费)</view>
									</view>
									
								</view>
								<!-- <view class="tui-price-right">
									<view>￥298.00</view>
									<view>x2</view>
								</view> -->
							</view>
						</tui-list-cell>
					
					<!-- <tui-list-cell :hover="false" unlined>
						<view class="tui-goods-price">
							<view>共4件商品 合计：</view>
							<view class="tui-size-24">￥</view>
							<view class="tui-price-large">1192</view>
							<view class="tui-size-24">.00</view>
						</view>
					</tui-list-cell> -->
					<view class="tui-order-btn">
						<view class="tui-btn-ml">
							<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle"  @tap="goAfterCancel(item.order_item_id)">取消申请</tui-button>
						</view>
						<view class="tui-btn-ml">
							<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle" @tap="goAfterDetail(item.id)">申请详情</tui-button>
						</view>
						<view class="tui-btn-ml">
							<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle" @tap="goAfterSaleDetail(item.id)">售后详情</tui-button>
						</view>
						<view class="tui-btn-ml" >
							<button type="primary"   class="icon-img3" @tap="goAfterConfirm(item.order_item_id)">去确认</button>
						</view>
					</view>
				</view>
		</view>
		<!--选项卡待确认-->
		<view  :class="[currentTab === 1 ? 'actineclass' : 'errorclass']">
			<view class="tui-order-item" v-for="(item,index) in AfterSaleData" :key="index">
				<tui-list-cell :hover="false" :lineLeft="false">
					<view class="tui-goods-title">
						<view>订单号：{{item.order_number}} <text class="iconfont icon-lujing182" @click="clipboard(item.order_number)"></text></view>
						<view class="tui-order-status">待处理</view>
					</view>
				</tui-list-cell>
				
					<tui-list-cell padding="0" @click="detail">
						<view class="tui-goods-item">
							<image :src="item.url"  class="tui-goods-img"></image>
							<view class="tui-goods-center">
								<view class="tui-goods-name"><text class="tag-tit">采手精选</text>{{item.name}}</view>
								<view class="tui-goods-attr">{{item.specification}}×{{item.goods_number}}</view>
								<view class="tui-goods-flex">
									<view class="tui-goods-attr1">￥{{item.platform_price}}元</view>
									<view class="tui-goods-attr">实付{{item.market_price}}元(含运费)</view>
								</view>
								
							</view>
							<!-- <view class="tui-price-right">
								<view>￥298.00</view>
								<view>x2</view>
							</view> -->
						</view>
					</tui-list-cell>
				
				<!-- <tui-list-cell :hover="false" unlined>
					<view class="tui-goods-price">
						<view>共4件商品 合计：</view>
						<view class="tui-size-24">￥</view>
						<view class="tui-price-large">1192</view>
						<view class="tui-size-24">.00</view>
					</view>
				</tui-list-cell> -->
				<view class="tui-order-btn">
					<view class="tui-btn-ml">
						<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle"  @tap="goAfterCancel(item.order_item_id)">取消申请</tui-button>
					</view>
					<view class="tui-btn-ml">
						<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle" @tap="goAfterDetail(item.id)">申请详情</tui-button>
					</view>
					<view class="tui-btn-ml" >
						<button type="primary"   class="icon-img3" @tap="goAfterConfirm(item.order_item_id)">去确认</button>
					</view>
				</view>
			</view>
		</view>
	
		
		
		<!--加载loadding-->
		<tui-loadmore v-if="loadding" :index="3" type="red"></tui-loadmore>
		<tui-nomore v-if="!pullUpOn" backgroundColor="#fafafa"></tui-nomore>
		<!--加载loadding-->

	</view>
</template>

<script>
	import {listing,publicing} from '../../api/api.js'
	import {posAfterSaleList} from '../../api/request.js'
	var setdata = uni.getStorageSync('usermen')
	var {log} = console
	const thorui = require("@/common/tui-clipboard/tui-clipboard.js")
	export default {
		data() {
			return {
				hamiguaPNG:'http://192.168.1.10:8980/js/userfiles/fileupload/202008/1299161489108729858.png',
				mangguoPNG:'http://192.168.1.10:8980/js/userfiles/fileupload/202008/1298932901905809410.png',
				tabs: [{
					name: "全部"
				}, {
					name: "待确认(1)"
				}],
				currentTab: 0,
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				scrollTop: 0,
				AfterSaleData:[],//列表数据
			}
		},
		methods: {
			//售后列表请求
			postAfterSalelist(){
				var setdata = uni.getStorageSync('usermen')
				let data ={
					token:setdata,
					afterSaleStatus:3
				
				}
				if(this.currentTab ===0 ){  //如果是默认全部不传afterSaleStatus参数
					delete data.afterSaleStatus
				}
				publicing(posAfterSaleList,data)
				.then((res)=>{
					log(res)
					this.AfterSaleData = res.data.data 
				})
				.catch((err)=>{
					log(err)
				})
			},
			//复制
			//event 当需要异步请求返回数据再进行复制时，需要传入此参数，或者异步方法转为同步方法（H5端）
			clipboard(event) {
				console.log(event);
				let data= event;
				thorui.getClipboardData(data, (res) => {
					// #ifdef H5 || MP-ALIPAY
					if (res) {
						this.tui.toast("复制成功")
					} else {
						this.tui.toast("复制失败")
					}
					// #endif
					},event)
				},
			
			//申请详情
			goAfterDetail(id){
				uni.navigateTo({
					url:'../../pagesIII/afterDetails/afterDetails?id='+id
				})
			},
			//售后详情
			goAfterSaleDetail(id){
				uni.navigateTo({
					url:'../../pagesIII/AfterSaleDetails/AfterSaleDetails?id='+id
				})
			},
			//取消申请
			goAfterCancel(id){
				log(id)
			},
			//去确认售后/售后反馈
			goAfterConfirm(id){
				log(id)
				uni.navigateTo({
					url:'../../pagesIII/confirmAfter/confirmAfter'
				})
			},
			change(e) {
				this.currentTab = e.index
				console.log(this.currentTab)
				if(this.currentTab === 0  ){//全部默认0
					this.postAfterSalelist()
				}else if (this.currentTab === 1 ){//待确认
					this.postAfterSalelist()
				}
			},
			detail() {
				uni.navigateTo({
					url: '../orderDetail/orderDetail'
				})
			}
		},
		onLoad(options) {
			// console.log(options.id)
			this.id = options.id
			this.postAfterSalelist()
			// this.getGoods()
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 200);
		},
		onReachBottom() {
			//只是测试效果，逻辑以实际数据为准
			this.loadding = true
			this.pullUpOn = true
			setTimeout(() => {
				this.loadding = false
				this.pullUpOn = false
			}, 1000)
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}
</script>

<style>
	.actineclass{display: block; margin-top: 100rpx; }
	 .errorclass{display: none;}
	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-order-list {
		margin-top: 80rpx;
	}

	.tui-order-item {
		margin-top: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-goods-title {
		width: 100%;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.icon-lujing182{
		font-size: 30rpx;
		color: rgba(182, 182, 182, 1);
		margin-left: 6rpx;
	}

	.tui-order-status {
		color: rgba(255, 119, 9, 1);
		font-size: 26rpx;
	}
	.tag-tit{
			/* 渐变色 */
			background-image: linear-gradient(to right, #00C94A , #00AC3F);
			margin-right: 10rpx;
			padding: 0 10rpx;
			border-radius: 15rpx 0 15rpx 0;
			color: #fff;
			font-size: 20rpx;
		}
	.tui-goods-item {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.tui-goods-img {
		width: 180rpx;
		height: 180rpx;
		display: block;
		flex-shrink: 0;
	}

	.tui-goods-center {
		flex: 1;
		padding: 20rpx 8rpx;
		box-sizing: border-box;
	}

	.tui-goods-name {
		/* max-width: 310rpx; */
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 26rpx;
		line-height: 32rpx;
	}
	.tui-goods-flex{
		display: flex;
		justify-content: space-between;
	}

	.tui-goods-attr {
		font-size: 22rpx;
		color: #888888;
		line-height: 32rpx;
		padding-top: 20rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.tui-goods-attr1 {
		font-size: 22rpx;
		color: rgba(255, 86, 0, 1);
		line-height: 32rpx;
		padding-top: 20rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-price-right {
		text-align: right;
		font-size: 24rpx;
		color: #888888;
		line-height: 30rpx;
		padding-top: 20rpx;
	}

	.tui-color-red {
		color: #E41F19;
		padding-right: 30rpx;
	}

	.tui-goods-price {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		font-size: 24rpx;
	}

	.tui-size-24 {
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-price-large {
		font-size: 32rpx;
		line-height: 30rpx;
		font-weight: 500;
	}

	.tui-order-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background: #fff;
		padding: 10rpx 30rpx 20rpx;
		box-sizing: border-box;
	}

	.tui-btn-ml {
		margin-left: 20rpx;
	}
	.icon-img3{
		background-image: linear-gradient(to right, rgba(0, 197, 42, 1) , rgba(0, 188, 69, 1));
		color: #fff!important;
		width: 152rpx!important;
		height: 56rpx!important;
		line-height: 56rpx;
		font-size: 26rpx!important;
		border-radius: 50rpx!important;
		/* border: 1rpx solid #929292!important; */
		
	
	}
	.green-btn{
		background-image: linear-gradient(to right, rgba(0, 197, 42, 1) , rgba(0, 188, 69, 1));
	}

</style>
