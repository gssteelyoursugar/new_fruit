<template>
	<view class="container">
		<tui-tabs :tabs="tabs" :isFixed="true" :currentTab="currentTab" selectedColor="#00C52A" sliderBgColor="#00C52A"
		 @change="change" itemWidth="50%">
		 </tui-tabs>
		<!--选项卡全部订单-->
		<view :class="[currentTab === 0 ? 'actineclass' : 'errorclass']">
				<view class="tui-order-item" v-for="(item,index) in AfterSaleData" :key="index">
					<tui-list-cell :hover="false" :lineLeft="false">
						<view class="tui-goods-title">
							<view>服务单号：{{item.after_sale_number}} <text class="iconfont icon-lujing182" @click="clipboard(item.after_sale_number)"></text></view>
							<view class="tui-order-status" v-if="item.after_sale_status ==0 ">处理中</view>
							<view class="tui-order-status" v-if="item.after_sale_status ==1 ">同意</view>
							<view class="tui-order-status" v-if="item.after_sale_status ==2 ">拒绝</view>
							<view class="tui-order-status" v-if="item.after_sale_status ==3 ">待确认</view>
							<view class="tui-order-status" v-if="item.after_sale_status ==4 ">已确认</view>
							<view class="tui-order-status" v-if="item.after_sale_status ==5 ">已取消</view>
							<view class="tui-order-status" v-if="item.after_sale_status ==11 ">处理完成</view>
							
						</view>
					</tui-list-cell>
					
						<tui-list-cell padding="0" @click="detail">
							<view class="tui-goods-item">
								<image :src="item.url" class="tui-goods-img"></image>
								<view class="tui-goods-center">
									<view class="tui-goods-name"><text class="tag-tit">采手精选</text>{{item.name}}</view>
									<view class="tui-goods-attr">{{item.specification}}×{{item.goods_number}}</view>
									<view class="tui-goods-flex">
										<view class="tui-goods-attr1"><text class="iconyuan">￥</text> <text class="yuanText">{{item.platform_price}} </text><text class="yuanPrice">元</text> </view>
										<view class="tui-goods-attr">实付: <text class="yuan-tui"> {{item.order_total_price}}</text> (免运费)</view>
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
						<view class="tui-btn-ml" v-if="item.after_sale_status ==0 ||item.after_sale_status ==3 ">
							<button  type="primary"  hover-class='none' class="icon-img3"  @tap="goAfterCancel(item.order_item_id,item.id)">取消申请</button>
							
						</view>
						<view class="tui-btn-ml" v-if="item.after_sale_status ==5 ">

							<button  type="primary"  hover-class='none' class="icon-img3"   @tap="goAfter(item.order_item_id)">重新申请</button>

							

							
						</view>
						<view class="tui-btn-ml" v-if="item.after_sale_status ==0||item.after_sale_status ==1||item.after_sale_status ==3||item.after_sale_status ==5 ">
							<button  type="primary"  hover-class='none' class="icon-img3"  @tap="goAfterDetail(item.id)">申请详情</button>
						</view>
						<view class="tui-btn-ml" v-if="item.after_sale_status ==11 ">
							<button  type="primary"  hover-class='none' class="icon-img3" @tap="goAfterSaleDetail(item.id)">售后详情</button>
							
						</view>
						<view class="tui-btn-ml" v-if="item.after_sale_status ==3 ">
							
							<button type="primary"   class="icon-img3" @tap="goAfterConfirm(item.id)" >去确认</button>
						</view>
					</view>
				</view>
		</view>
		<!--选项卡待确认-->
		<view  :class="[currentTab === 1 ? 'actineclass' : 'errorclass']">
			<view class="tui-order-item" v-for="(item,index) in AfterSaleData" :key="index">
				<tui-list-cell :hover="false" :lineLeft="false">
					<view class="tui-goods-title">
						<view>服务单号：{{item.after_sale_number}} <text class="iconfont icon-lujing182" @click="clipboard(item.after_sale_number)"></text></view>
						<view class="tui-order-status">待确认</view>
					</view>
				</tui-list-cell>
				
					<tui-list-cell padding="0" @click="detail">
						<view class="tui-goods-item">
							<image :src="item.url"  class="tui-goods-img"></image>
							<view class="tui-goods-center">
								<view class="tui-goods-name"><text class="tag-tit">采手精选</text>{{item.name}}</view>
								<view class="tui-goods-attr">{{item.specification}}×{{item.goods_number}}</view>
								<view class="tui-goods-flex">
									<view class="tui-goods-attr1"><text class="iconyuan">￥</text> <text class="yuanText">{{item.platform_price}} </text><text class="yuanPrice">元</text> </view>
									<view class="tui-goods-attr">实付: <text class="yuan-tui"> {{item.order_total_price}}.00</text> (免运费)</view>
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
					<view class="tui-btn-ml" v-if="item.after_sale_status ==0 ||item.after_sale_status ==3 ">
						<button type="primary"   class="icon-img3"  @tap="goAfterCancel(item.order_item_id,item.id)" >取消申请</button>
					</view>
					<view class="tui-btn-ml" v-if="item.after_sale_status ==0||item.after_sale_status ==1||item.after_sale_status ==3 ">
						<button type="primary"   class="icon-img3"  @tap="goAfterDetail(item.id)" >申请详情</button>
					</view>
					<view class="tui-btn-ml" v-if="item.after_sale_status ==3 ">
						<button type="primary"   class="icon-img3" @tap="goAfterConfirm(item.id)">去确认</button>
					</view>
				</view>
			</view>
		</view>
		<view class="warp" v-if="modaishow">
			<view class="warp-view">
				<view class="warp-text1">温馨提示</view>
				<view class="warp-text">确定要取消申请?</view>
				<view class="warp-flex">
					<button @click="goBack" plain="true" class="color-green"> 否</button>
					<button @click="Goyes" plain="true"  class="color-green">是</button>
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
	import {posAfterSaleList,postAfterCen,getBeConfirmed} from '../../api/request.js'
	var setdata = uni.getStorageSync('usermen')
	var {log} = console
	const thorui = require("@/common/tui-clipboard/tui-clipboard.js")
	export default {
		data() {
			return {
				tabs: [
					{
						name: "全部"
					}, 
					{
						name: "待确认"
					},
				],
				count:0,
				currentTab: 0,
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				scrollTop: 0,
				AfterSaleData:[],//列表数据
				modaishow:false,
				flag:false,
				itemid:'',
				idNum:''
				
			}
		},
		methods: {
			//确定取消
			Goyes(){
					var setdata = uni.getStorageSync('usermen')
					let data ={
						token:setdata,
						orderItemId:this.itemid,
						id:this.idNum
					}
					log(data)
					publicing(postAfterCen,data)
					.then((res)=>{
						log(res)
						this.postAfterSalelist()
						this.messcancel()
					})
					.catch((err)=>{
						log(err)
					})
			},
			//获取待确认
			getBeConfirmedData(){
				
				var setdata = uni.getStorageSync('usermen')
				let data ={
					token:setdata
				}
				listing(getBeConfirmed,data)
				.then((res)=>{
					log(res)
					this.count = res.data.data.count
					log(this.count)
					
					this.$set (this.tabs, 1, {name:`待确认(${this.count})`})
					
				})
				.catch((err)=>{
					log(err)
				})
			},
			//点击取消
			goBack(){
				this.messcancel()
			},
			
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
			//重新申请售后
			goAfter(id){
				uni.navigateTo({
					url:'../../pagesIII/applyAfter/applyAfter?id=' + id
				})
			},			
			//复制
			//event 当需要异步请求返回数据再进行复制时，需要传入此参数，或者异步方法转为同步方法（H5端）
			clipboard(event) {
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
				
				// 显示
				init(){
					this.modaishow = true
				},
				// 取消
				messcancel(){
					this.modaishow = false
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
			goAfterCancel(order_id,id){
				this.init()
				this.itemid = order_id
				this.idNum = id
				log(this.itemid)
				
				
				
				// this.Goyes(id)
			},
			//去确认售后/售后反馈
			goAfterConfirm(id){
				log(id)
				uni.navigateTo({
					url:'../../pagesIII/confirmAfter/confirmAfter?id='+id
				})
			},
			change(e) {
				this.currentTab = e.index
				if(this.currentTab === 0  ){//全部默认0
					this.postAfterSalelist()
					this.getBeConfirmedData()
				}else if (this.currentTab === 1 ){//待确认
					this.postAfterSalelist()
					this.getBeConfirmedData()
				}
			},
			detail() {
				uni.navigateTo({
					url: '../orderDetail/orderDetail'
				})
			}
		},
		onLoad(options) {
			this.id = options.id
			this.postAfterSalelist()
			this.getBeConfirmedData()
			// this.getGoods()
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, );
		},
		// onReachBottom() {
		// 	//只是测试效果，逻辑以实际数据为准
		// 	this.loadding = true
		// 	this.pullUpOn = true
		// 	setTimeout(() => {
		// 		this.loadding = false
		// 		this.pullUpOn = false
		// 	}, 200)
		// }
		
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
		margin-left: 12rpx;
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
		padding: 0rpx 8rpx;
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
		font-size: 12px;
		color: rgba(102, 102, 102, 1);
		line-height: 32rpx;
		padding-top: 20rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.yuan-tui{
		color: rgba(51, 51, 51, 1);
		font-size: 14px;
		font-weight: bold;

	}
	.tui-goods-attr1 {
		
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
	.iconyuan{
		font-size: 8px;
		color: rgba(255, 86, 0, 1);
	}
	.yuanText{
		font-size: 16px;
		font-weight: bold;
	}
	.yuanPrice{
		font-size: 12px;
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
	.tui-btn-ml:last-child >>>.icon-img3{
		background-image: linear-gradient(to right, #00C94A , #00AC3F);
		color: #fff!important;
		border: none!important;
		
	}
	.icon-img3{
		background-color: #fff!important;
		color: #333!important;
		width: 152rpx!important;
		height: 56rpx!important;
		line-height: 56rpx;
		font-size: 26rpx!important;
		border-radius: 50rpx!important;
		border: 1rpx solid #929292!important;
		
		
	
	}
	.green-btn{
		background-image: linear-gradient(to right, rgba(0, 197, 42, 1) , rgba(0, 188, 69, 1));
	}
	/* 去除button默认样式 */
	
	button::after {
	border: none;
	
	}
	
	button {
	background-color: transparent;
	
	padding-left: 0;
	
	padding-right: 0;
	
	line-height:inherit;
	border-radius:0;
	
	}
	
	


/* 模态弹窗布局 */
	.warp{position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background: rgba(0,0,0,0.6);
	z-index: 9999;}
	.warp-view{width: 500upx;
			height: 260upx;
			background: #FFFFFF;
			margin: auto;
			position: absolute;
			-webkit-position:absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			border-radius: 8upx;
			overflow: hidden;
			}
	.warp-text{
		text-align: center;
		margin-top: 34upx;
		font-size: 34upx;
		color: #666666;
			}
	.warp-text1{
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 34upx;
		color: #fff;
		background-color: rgba(0, 197, 42, 1);
			}		
	.warp-flex{ display: flex;
		justify-content: space-around;
		border-top: 1upx solid #EEEEEE;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80upx;
		line-height: 80upx;
		}
		.color-green{
			color: rgba(0, 197, 42, 1);
		}
	.warp-flex button{border: none;
	font-size: 30upx;
	}
		.warp-flex button:nth-child(2){
			color: rgba(0, 197, 42, 1);
		}
	/*end  */
</style>
