<template>
	<view class="container">
		<view class="top-tabs">
			<tui-tabs :tabs="tabs" :isFixed="true" :currentTab="currentTab" selectedColor="#00C52A" sliderBgColor="#00C52A"
			 @change="change" itemWidth="25%"></tui-tabs>
		</view>
		<!--选项卡全部订单-->
		<view :class="[currentTab === 0 ? 'actineclass' : 'errorclass']">
			<wyb-slide-listener @slideUp="onSlide" @slideDown="onSlide" @slideLeft="onSlide" @slideRight="onSlide">
				<view class="container-img " v-if="myOrderData.length == 0">
					<!-- <image src="../../static/images/orderBMG.png" mode="widthFix"></image> -->
					<!-- <text class="color-text">您还没有相关的订单</text> -->
				</view>
				<view class="tui-order-item" v-for="(item,index) in myOrderData" :key="index">
					<tui-list-cell :hover="false" :lineLeft="false">
						<view class="tui-goods-title">
							<view class="font-size-color">订单号：{{item.orderNumber}} <text class="iconfont icon-lujing182" @click="clipboard(item.orderNumber)"></text></view>
							<view class="tui-order-status" v-if="item.payStatus == 2||item.tradeStatus == 5">已取消</view>
							<view class="tui-order-status" v-if="item.tradeStatus == 0  ">进行中</view>
							<!-- <view class="tui-order-status" v-if="item.payStatus == 0 ">待付款</view> -->
							<view class="tui-order-status" v-if="item.tradeStatus == 1 || item.tradeStatus == 2|| item.tradeStatus == 3">待发货</view>
							<!-- <view class="tui-order-status" v-if="item.tradeStatus == 2">已发货</view> -->
							<view class="tui-order-status" v-if="item.tradeStatus == 4">待收货</view>
							<view class="tui-order-status" v-if="item.tradeStatus == 6 || (item.tradeStatus == 7&&item.afterStatus == 11)">已完成</view>
							<!-- <view class="tui-order-status" v-if="item.afterStatus == '' && item.tradeStatus == 7">售后中</view> -->
							<view class="tui-order-status" v-if="item.tradeStatus == 7 && (item.afterStatus == '0'||item.afterStatus == '3')">售后中</view>
							<view class="tui-order-status" v-if="item.tradeStatus == 8">待确认</view>
							<!-- <view class="tui-order-status" v-if="item.tradeStatus == 9">已完成</view> -->
						</view>
					</tui-list-cell>

					<tui-list-cell padding="0" @click="detail(item.tradeStatus,item.id)">
						<view class="tui-goods-item">
							<image :src="item.url" class="tui-goods-img"></image>
							<view class="tui-goods-center">
								<view class="tui-goods-name"><text class="tag-tit">{{item.labelName}}</text> {{item.name}}</view>
								<view class="tui-goods-attr">
									<text>毛重约{{ item.kg1 || 0}}斤/件</text>
									<text class="goods-num">x{{item.goodsNumber}}</text>
								</view>
								<view class="tui-goods-shabi">
									<view class="total-price"><text>¥</text>
										<text>{{item.totalPrice}}</text>
										<text>元</text>
									</view>
									<view class="shifu-total">
										<text>实付:</text>
										<text>{{item.totalPrice}}</text>
										<text>(免运费)</text>
									</view>
								</view>
							</view>

						</view>
					</tui-list-cell>

					<view class="tui-order-btn">
						<view class="tui-btn-ml" v-if="item.tradeStatus == 1 || item.tradeStatus == 2 || item.tradeStatus == 3 || item.tradeStatus == 4 || item.tradeStatus == 7||item.afterStatus == 7 || item.afterStatus == 11">
							<button open-type="contact" type="primary" :openType="contactType" hover-class='none' class="icon-img3">联系客服</button>
							<!-- <tui-button type="black" plain width="152rpx" @click="toggleConfirm(item.id)" height="56rpx" :size="26" shape="circle">联系客服</tui-button> -->
						</view>
						<!-- <view class="tui-btn-ml" v-if="item.payStatus == 2">
							<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle" @tap="buyAgain(item.wx_goods_id)">再次下单</tui-button>
						</view> -->
						<!-- <view class="tui-btn-ml" v-if="item.tradeStatus == 6 || item.tradeStatus == 5">
							<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle"  @tap="goDel(item.id)">删除订单</tui-button>
						</view> -->
						<view class="tui-btn-ml" v-if="item.payStatus == 1 && (item.tradeStatus == 3  || item.tradeStatus == 6 || item.tradeStatus == 8) && item.afterStatus != 11">
							<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle" @tap="goAfter(item.id)">申请售后</tui-button>
						</view>
						<!-- <view class="tui-btn-ml" v-if="item.tradeStatus == 1 || item.tradeStatus == 2 ||   item.tradeStatus == 3 || item.tradeStatus == 4 ||item.tradeStatus == 6 ||item.tradeStatus == 8||item.tradeStatus == 9">
							<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle">查看物流</tui-button>
						</view> -->
						<!-- <view class="tui-btn-ml" v-if="item.payStatus == 0 || item.payStatus == 2 || item.tradeStatus == 5">
							<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle" @tap="goCancel(item.id)">取消订单</tui-button>
						</view> -->
						
						<view class="tui-btn-ml" v-if="item.payStatus == 2 || item.tradeStatus == 5|| item.tradeStatus == 6 || item.afterStatus == 11">
							<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle" @tap="buyAgain(item.wx_goods_id)">再次下单</tui-button><!--  -->
						</view>

						<view class="tui-btn-ml" v-if="item.tradeStatus == 7 && (item.afterStatus ==0||item.afterStatus ==1||item.afterStatus ==2||item.afterStatus ==3||item.afterStatus ==4 )">
							<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle" @tap="goAfterSaleDetail(item.afterSaleId)">售后详情</tui-button>
						</view>
						<view class="tui-btn-ml" v-if="item.payStatus == 1 && (item.tradeStatus == 4 ||item.tradeStatus == 8)">
							<!-- item.tradeStatus == 2 -->
							<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle" @tap="toggleConfirm(item.id)">确认收货</tui-button>
						</view>
					</view>
				</view>
			</wyb-slide-listener>
		</view>
		
		<!--选项卡待发货-->
		<view :class="[currentTab === 1 ? 'actineclass' : 'errorclass']">
			<wyb-slide-listener @slideUp="onSlide" @slideDown="onSlide" @slideLeft="onSlide" @slideRight="onSlide">
				<view class="container-img " v-if="myOrderData.length == 0">
					<!-- <image src="../../static/images/orderBMG.png" mode="widthFix"></image> -->
					<!-- <text class="color-text">您还没有相关的订单</text> -->
				</view>
				<view class="tui-order-item" v-for="(item,index) of myOrderData" :key="index">
					<tui-list-cell :hover="false" :lineLeft="false">
						<view class="tui-goods-title">
							<view class="font-size-color">订单号：{{item.orderNumber}} <text class="iconfont icon-lujing182" @click="clipboard(item.orderNumber)"></text></view>
							<view class="tui-order-status">待发货</view>
						</view>
					</tui-list-cell>
					<tui-list-cell padding="0" @click="detail(item.tradeStatus,item.id)">
						<view class="tui-goods-item">
							<image :src="item.url" class="tui-goods-img"></image>
							<view class="tui-goods-center">
								<view class="tui-goods-name"><text class="tag-tit">{{item.labelName}}</text> {{item.name}}</view>
								<view class="tui-goods-attr">
									<text>毛重约{{ item.kg1 || 0}}斤/件</text>
									<text class="goods-num">x{{item.goodsNumber}}</text>
								</view>
								<view class="tui-goods-shabi">
									<view class="total-price"><text>¥</text>
										<text>{{item.totalPrice}}</text>
										<text>元</text>
									</view>
									<view class="shifu-total">
										<text>实付:</text>
										<text>{{item.totalPrice}}</text>
										<text>(免运费)</text>
									</view>
								</view>
							</view>
						</view>
					</tui-list-cell>

					<!-- <tui-list-cell :hover="false" unlined>
						<view class="tui-goods-price">
							<view>共{{item.goodsNumber}}件商品 合计：</view>
							<view class="tui-size-24">￥</view>
							<view class="tui-price-large">{{item.totalPrice}}</view>
							<view class="tui-size-24">.00</view>
						</view>
					</tui-list-cell> -->
					<view class="tui-order-btn">
						<view class="tui-btn-ml">
							<button open-type="contact" type="primary" :openType="contactType" hover-class='none' class="icon-img3">联系客服</button>
							<!-- <tui-button type="black" plain width="152rpx" :openType="contactType" height="56rpx" :size="26" shape="circle">联系客服</tui-button> -->
						</view>
						<!-- <view class="tui-btn-ml">
							<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle">查看物流</tui-button>
						</view> -->
						<!-- <view class="tui-btn-ml">
						<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle">评价晒单</tui-button>
					</view> -->
						<!-- <view class="tui-btn-ml">
						<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle" @tap="buyAgain(item.wx_goods_id)">再次下单</tui-button>
					</view> -->
					</view>
				</view>
			</wyb-slide-listener>
		</view>
		<!--选项卡待收货-->
		<view :class="[currentTab === 2 ? 'actineclass' : 'errorclass']">
			<wyb-slide-listener @slideUp="onSlide" @slideDown="onSlide" @slideLeft="onSlide" @slideRight="onSlide">
				<view class="container-img " v-if="myOrderData.length == 0">
					<!-- <image src="../../static/images/orderBMG.png" mode="widthFix"></image> -->
					<!-- <text class="color-text">您还没有相关的订单</text> -->
				</view>
				<view class="tui-order-item" v-for="(item,index) in myOrderData" :key="index">
					<tui-list-cell :hover="false" :lineLeft="false">
						<view class="tui-goods-title">
							<view class="font-size-color">订单号：{{item.orderNumber}} <text class="iconfont icon-lujing182" @click="clipboard(item.orderNumber)"></text></view>
							<view class="tui-order-status" v-if="">待收货</view>
							<!-- <view class="tui-order-status" v-if="item.tradeStatus == 8">待确认</view> -->
						</view>
					</tui-list-cell>
					<tui-list-cell padding="0" @click="detail(item.tradeStatus,item.id)">
						<view class="tui-goods-item">
							<image :src="item.url" class="tui-goods-img"></image>
							<view class="tui-goods-center">
								<view class="tui-goods-name"><text class="tag-tit">{{item.labelName}}</text> {{item.name}}</view>
								<view class="tui-goods-attr">
									<text>毛重约{{ item.kg1 || 0}}斤/件</text>
									<text class="goods-num">x{{item.goodsNumber}}</text>
								</view>
								<view class="tui-goods-shabi">
									<view class="total-price"><text>¥</text>
										<text>{{item.totalPrice}}</text>
										<text>元</text>
									</view>
									<view class="shifu-total">
										<text>实付:</text>
										<text>{{item.totalPrice}}</text>
										<text>(免运费)</text>
									</view>
								</view>
							</view>

						</view>
					</tui-list-cell>
					<view class="tui-order-btn">
						<view class="tui-btn-ml" v-if="item.afterStatus != 11">
							<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle" @tap="goAfter(item.id)">申请售后</tui-button>
						</view>
						<!-- <view class="tui-btn-ml">
							<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle">查看物流</tui-button>
						</view> -->
						<view class="tui-btn-ml">
							<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle" @tap="toggleConfirm(item.id)">确认收货</tui-button>
						</view>
					</view>
				</view>
			</wyb-slide-listener>
		</view>
		<!--选项卡已完成-->
		<view :class="[currentTab === 3 ? 'actineclass' : 'errorclass']">
			<wyb-slide-listener @slideUp="onSlide" @slideDown="onSlide" @slideLeft="onSlide" @slideRight="onSlide">
				<view class="container-img " v-if="done.length == 0">
					<!-- <image src="../../static/images/orderBMG.png" mode="widthFix"></image> -->
					<!-- <text class="color-text">您还没有相关的订单</text> -->
				</view>
				<view class="tui-order-item" v-for="(item,index) in done" :key="index">
					<tui-list-cell :hover="false" :lineLeft="false">
						<view class="tui-goods-title">
							<view class="font-size-color">订单号：{{item.orderNumber}} <text class="iconfont icon-lujing182" @click="clipboard(item.orderNumber)"></text></view>
							<view class="tui-order-status">已完成</view>
						</view>
					</tui-list-cell>

					<tui-list-cell padding="0" @click="detail(item.tradeStatus,item.id)">
						<view class="tui-goods-item">
							<image :src="item.url" class="tui-goods-img"></image>
							<view class="tui-goods-center">
								<view class="tui-goods-name"><text class="tag-tit">{{item.labelName}}</text> {{item.name}}</view>
								<view class="tui-goods-attr">
									<text>毛重约{{ item.kg1 || 0}}斤/件</text>
									<text class="goods-num">x{{item.goodsNumber}}</text>
								</view>
								<view class="tui-goods-shabi">
									<view class="total-price"><text>¥</text>
										<text>{{item.totalPrice}}</text>
										<text>元</text>
									</view>
									<view class="shifu-total">
										<text>实付:</text>
										<text>{{item.totalPrice}}</text>
										<text>(免运费)</text>
									</view>
								</view>
							</view>

						</view>
					</tui-list-cell>
					<view class="tui-order-btn">
						<view class="tui-btn-ml">
							<button open-type="contact" type="primary" :openType="contactType" hover-class='none' class="icon-img3">联系客服</button>
						</view>
						<view class="tui-btn-ml" v-if="(item.tradeStatus == 6&& item.afterStatus != 11)|| (item.tradeStatus == 7 && item.afterStatus == 5) ">
							<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle" @tap="goAfter(item.id)">申请售后</tui-button>
						</view>
						<view class="tui-btn-ml" v-if="item.tradeStatus == 7 && item.afterStatus == 11">
							<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle" @tap="goAfterSaleDetail(item.afterSaleId)">售后详情</tui-button>
						</view>
						<view class="tui-btn-ml">
							<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle" @tap="buyAgain(item.wx_goods_id)">再次下单</tui-button>
						</view>
						<!-- <view class="tui-btn-ml" >
						<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle"  @tap="goDel(item.id)">删除订单</tui-button>
					</view> -->
					</view>
				</view>
			</wyb-slide-listener>
		</view>
		<uni-load-more iconType="snow" :status="loadStatus"></uni-load-more>
		<!-- <tui-loadmore v-if="loadding" type="red"></tui-loadmore>
		<tui-nomore v-if="!pullUpOn" backgroundColor="#fafafa"></tui-nomore> -->

		<!-- 确认收货提示框 -->
		<view class="warp"  v-if="isConfirm"><!-- :style="{top: navHeight + 'px'}" -->
			<view class="warp-view">
				<view class="warp-text1">温馨提示</view>
				<view class="warp-text">确定收货?</view>
				<view class="warp-flex">
					<button @click="toggleConfirm('cancel_btn')" plain="true">取消</button>
					<button plain="true" @click="goConfirm" class="color-green">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		listing,
		publicing
	} from '../../api/api.js'
	import {
		getMyOrder,
		imgurl,
		postAgainOrder,
		postOrderPay,
		postCancelOrder,
		postDelOrders,
		postConfirmOrder,
		postCancelPay
	} from '../../api/request.js'
	var setdata = uni.getStorageSync('usermen')
	var {
		log
	} = console
	const thorui = require("@/common/tui-clipboard/tui-clipboard.js")
	export default {
		data() {
			return {
				contactType: 'contact',
				coundDownTime: '30000',
				loadStatus: "loading",
				payStatus: '', //付款状态
				tradeStatus: '', //收货状态
				timeList: 300,
				tabs: [{
						name: "全部",
					},
					// {
					// 	name: "待付款"
					// },
					{
						name: "待发货"
					}, {
						name: "待收货"
					}, {
						name: "已完成"
					}
				],
				currentTab: null,
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				scrollTop: 0,
				myOrderData: [],
				url: '',
				countDown: 0,
				afterStatus: '',
				navHeight: 64,
				isConfirm: false,
				curConfirmId: '',
			}
		},
		onLoad(options) {
			if (options.index == 0) { //全部 pt
				this.currentTab = parseInt(options.index);
				this.payStatus = ''
				this.tradeStatus = ''
			} else if (options.index == 1) { //待发货p1t1
				this.currentTab = parseInt(options.index);
				this.payStatus = '1'
				this.tradeStatus = '1,2,3'
			} else if (options.index == 2) { //待收货p1t4,8 
				this.currentTab = parseInt(options.index);
				this.payStatus = '1'
				this.tradeStatus = '4,8'
			} else if (options.index == 3) { //已完成p1t6,7 afterStatus11
				this.currentTab = parseInt(options.index);
				this.payStatus = '1'
				this.tradeStatus = '6,7',
					this.afterStatus = '11'
			}
			this.getOrderData()

			const res = uni.getSystemInfoSync();
			let {
				statusBarHeight
			} = res

			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			let info = uni.getMenuButtonBoundingClientRect()
			let {
				top,
				height,
				bottom
			} = info
			let buttonHeight = (bottom - statusBarHeight) + (top - statusBarHeight)
			this.navHeight = statusBarHeight + buttonHeight + top - statusBarHeight
			// #endif

		},
		computed: {
			// 全部数据
			allData() {
				let data = this.myOrderData
				return data
			},
			// 待付款 (暂时废弃)
			waitPay() {
				let data = this.myOrderData
				let arr = []
				data.map(item => {
					if (item.payStatus == '0') {
						arr.push(item)
					}
				})
				return arr
			},
			// 待发货
			waitDeliver() {
				let data = this.myOrderData
				let arr = []
				data.map(item => {
					if (item.tradeStatus == "1" || item.tradeStatus == "2" || item.tradeStatus == "3") {
						arr.push(item)
					}
				})
				return arr
			},
			// 待确认
			waitConfirm() {
				let data = this.myOrderData
				let arr = []
				data.map(item => {
					if (item.payStatus == '1' && (item.tradeStatus == '4' || item.tradeStatus == '8')) {
						arr.push(item)
					}
				})
				return arr
			},
			done() {
				let data = this.myOrderData
				let arr = []
				data.map(item => {
					if (item.tradeStatus == '6' || (item.tradeStatus == '7' && item.afterStatus == '11')) {
						arr.push(item)
					}
				})
				return arr
			}

		},
		methods: {
			//手势
			onSlide(event) {
			},
			//支付倒计时
			endOfTime(id) {
				this.goCancel(id)
			},
			//删除订单
			goDel(id) {
				let data = {
					id: id,
					token: setdata,
				}
				publicing(postDelOrders, data)
					.then((res) => {
						this.getOrderData()
						this.$forceUpdate()
					})
					.catch((err) => {
						log(err)
					})
			},

			//取消支付
			goCancel(id) {
				let data = {
					id: id,
					token: setdata,
				}
				publicing(postCancelPay, data)
					.then((res) => {
						this.getOrderData()
						this.$forceUpdate()
					})
					.catch((err) => {
						log(err)
					})
			},

			//去付款
			payGo(orderNumber) {
				uni.showModal({
					title: '提示',
					content: '确认支付',
					success: (res) => {
						if (res.confirm) {
							let data = {
								orderNumber: orderNumber
							}
							publicing(postOrderPay, data)
								.then((res) => {
									uni.showToast({
										title: `${res.data.msg}`,
										icon: 'none',
										duration: 2000

									});
									this.getOrderData()
									this.$forceUpdate()
								})
								.catch((err) => {
									log(err)
								})
						} else if (res.cancel) {
							uni.showToast({
								title: '已取消支付',
								icon: 'none',
								duration: 2000
							})

							return
						}
					}
				});
			},
			toggleConfirm(id) {
				if (id != 'cancel_btn') {
					this.curConfirmId = id
				}
				this.isConfirm = !this.isConfirm
			},
			//确认收货
			goConfirm() {
				let setdata = uni.getStorageSync('usermen')
				let data = {
					id: this.curConfirmId,
					token: setdata,
				}
				publicing(postConfirmOrder, data)
					.then((res) => {
						if (res.data.code == 200) {
							uni.showToast({
								title: "收货成功",
								duration: 2000
							})
							this.isConfirm = !this.isConfirm
							this.getOrderData()
						} else {
							uni.showToast({
								title: res.data.msg,
								duration: 2000
							})
						}
						this.getOrderData()
						this.$forceUpdate()
						
					})
					.catch((err) => {
						log(err)
					})
			},
			//再次下单
			buyAgain(id) {
				uni.navigateTo({
					url: '../../pagesIII/productDetail/productDetail?id=' + id
				})
			},
			//请求订单数据
			getOrderData() {
				let data = {
					token: setdata,
					pageNo: this.pageIndex,
					pageSize: 1000,
					payStatus: this.payStatus,
					tradeStatus: this.tradeStatus,
					afterStatus: this.afterStatus
				}
				listing(getMyOrder, data)
					.then((res) => {
						if (res.data.code == 201) {
							this.loadStatus = "noMore"
							return
						}
						if (res.data.data.length === 0) {
							this.myOrderData = res.data.data
							setTimeout(() => {
								this.loadStatus = "noMore"
							}, 1000)
							// this.$set(this.loadStatus,dataLoad)
							this.$forceUpdate()
							return
						} else {
							this.myOrderData = res.data.data
							this.loadStatus = "noMore"
						}
						this.$forceUpdate()
					})
					.catch((err) => {
						log(err)
					})
			},

			// 联系客服
			clickToService() {
				uni.navigateTo({
					url: '../../pagesII/customerService/customerService'
				})
			},
			//event 当需要异步请求返回数据再进行复制时，需要传入此参数，或者异步方法转为同步方法（H5端）
			clipboard(event) {
				let data = event;
				thorui.getClipboardData(data, (res) => {
					// #ifdef H5 || MP-ALIPAY
					if (res) {
						this.tui.toast("复制成功")
					} else {
						this.tui.toast("复制失败")
					}
					// #endif
				}, event)
			},
			//申请售后
			goAfter(id) {
				uni.navigateTo({
					url: '../../pagesIII/applyAfter/applyAfter?id=' + id
				})
			},
			// 售后- 售后详情
			goAfterSaleDetail(id) {
				uni.navigateTo({
					url: '../../pagesIII/AfterSaleDetails/AfterSaleDetails?id=' + id
				})
			},
			// 售后- 申请详情
			goAfterDetails(id) {
				uni.navigateTo({
					url: '../../pagesIII/afterDetails/afterDetails?id=' + id
				})
			},
			change(options) {
				this.currentTab = options.index
				if (options.index == 0) { //全部 pt
					this.currentTab = parseInt(options.index);
					this.payStatus = ''
					this.tradeStatus = ''
				} else if (options.index == 1) { //待发货p1t1
					this.currentTab = parseInt(options.index);
					this.payStatus = '1'
					this.tradeStatus = '1,2,3'
				} else if (options.index == 2) { //待收货p1t4,8
					this.currentTab = parseInt(options.index);
					this.payStatus = '1'
					this.tradeStatus = '4,8'
				} else if (options.index == 3) { //已完成p1t6 afterStatus 11
					this.currentTab = parseInt(options.index);
					this.payStatus = '1'
					this.tradeStatus = '6,7'
					this.afterStatus = '11'
				}
				this.getOrderData()

			},
			detail(status, id) {
				if (status == 5) {
					return
				}
				uni.navigateTo({
					url: '../../pagesIII/orderDetail/orderDetail?id=' + id
				})
			}
		},
		onShow() {
			this.url = imgurl
			// this.getOrderData()
		},
		//

		onPullDownRefresh() {
			this.getOrderData()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 500)
		},


		onReachBottom() {
			// if (this.loadStatus === "noMore") {
			// 	return
			// }
			// this.pageIndex++
			// this.getOrderData()
			// this.loadding = true
			// this.pullUpOn = true
			// uni.hideLoading()
			// setTimeout(() => {
			// 	this.loadding = false
			// 	this.pullUpOn = false
			// }, 1000)
		},

	}
</script>

<style>
	.actineclass {
		display: block;
		margin-top: 100rpx;
	}

	.errorclass {
		display: none;
	}

	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-order-list {
		margin-top: 80rpx;
	}

	.tag-tit {
		/* 渐变色 */
		background-image: linear-gradient(to right, #00C94A, #00AC3F);
		margin-right: 10rpx;
		padding: 0 10rpx;
		border-radius: 15rpx 0 15rpx 0;
		color: #fff;
		font-size: 20rpx;
	}

	.top-tabs {
		position: relative;
		display: flex;

	}

	.filter-box {
		position: absolute;
		right: 0rpx;
		width: 76rpx;
		height: 80rpx;
		z-index: 9999;
		background: #fff;
		top: 0rpx;
		box-shadow: 0rpx 0 10rpx 6rpx #ddd;
		bottom: 0rpx;

	}

	.filter-box image {
		width: 40rpx;
		height: 40rpx;
		margin: 20rpx;

	}

	.tui-order-item {
		margin-top: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.container-img {
		margin-top: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.color-text {
		color: rgba(112, 112, 112, 1);
	}

	/* 隐藏 */
	.text-danger {
		display: none !important;
	}

	/* 显示 */
	.active {
		display: block;
	}

	.tui-goods-title {
		width: 100%;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.icon-lujing182 {
		font-size: 30rpx;
		color: rgba(182, 182, 182, 1);
		margin-left: 6rpx;
	}

	.font-size-color {
		color: rgba(85, 85, 85, 1);
	}

	.tui-order-status {
		color: #00C52A;
		font-size: 26rpx;
	}

	.tui-goods-item {
		width: 100%;
		padding: 20rpx 30rpx 0;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.tui-goods-img {
		width: 118rpx;
		height: 118rpx;
		display: block;
		flex-shrink: 0;
		border-radius: 6rpx;
		background: #eee;
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

	.tui-goods-attr {
		font-size: 24rpx;
		color: #888888;
		line-height: 32rpx;
		padding-top: 20rpx;
		/* word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2; */
		display: flex;
		justify-content: space-between;
	}
	
	.tui-goods-attr .goods-num {
		font-size: 28rpx;
	}

	.tui-goods-shabi {
		display: flex;
		margin: 20rpx 0;
		justify-content: space-between;
		align-items: baseline;
	}

	.total-price {
		color: #FF5600;
	}

	.total-price text:first-child {
		font-size: 16rpx;
		margin-right: 4rpx;
	}

	.total-price text:nth-child(2) {
		font-size: 32rpx;
		font-weight: bold;
	}

	.total-price text:last-child {
		font-size: 24rpx;
		margin-left: 4rpx;
	}

	.shifu-total {
		margin-top: 20rpx;
		color: FF5600;
	}

	.shifu-total text:first-child {
		font-size: 24rpx;
		color: #666666;
	}

	.shifu-total text:nth-child(2) {
		font-size: 28rpx;
		color: #333333;
		font-weight: bold;
	}

	.shifu-total text:last-child {
		font-size: 24rpx;
		color: #666666;
		margin-left: 4rpx;
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

	.tui-order-btn .tui-btn-ml:last-child button {
		background: #00C52A !important;
		color: #fff !important;
		border-color: #00C52A !important;
	}

	.tui-order-btn .tui-btn-ml:last-child button::after {

		border-color: #00C52A !important;
	}

	.tui-order-btn .tui-btn-ml:last-child .tui-btn {
		background: #00C52A !important;
		color: #fff !important;
		border-color: #00C52A !important;
	}

	.tui-order-btn .tui-btn-ml:last-child .tui-btn::after {

		border-color: #00C52A !important;
	}

	.icon-img3 {
		background-color: #fff !important;
		color: #333 !important;
		width: 152rpx !important;
		/* height: 56rpx!important; */
		line-height: 56rpx;
		font-size: 26rpx !important;
		border-radius: 50rpx !important;
		border: 1rpx solid #CCCCCC !important;


	}

	.tui-btn-ml {
		margin-left: 20rpx;
		overflow: hidden;
		border-radius: 40rpx;

	}

	.tui-btn-ml-pay {
		font-size: 26rpx;
		width: 220rpx;
		height: 56rpx;
		color: #333;
		border: 1rpx solid #929292;
		background-color: #fff;
		border-radius: 50rpx;
		line-height: 56rpx;
		text-align: center;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0rpx 30rpx;
	}

	/* 去除button默认样式 */

	button::after {
		border: none;

	}

	button {
		background-color: transparent;

		padding-left: 0;

		padding-right: 0;

		line-height: inherit;

	}

	button {
		border-radius: 0;

	}

	
	/* 模态弹窗布局 */
	.warp {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 9999;
	}
	
	.warp-view {
		width: 500upx;
		height: 260upx;
		background: #ffffff;
		margin: auto;
		position: absolute;
		-webkit-position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		border-radius: 8upx;
		overflow: hidden;
	}
	
	.warp-text {
		text-align: center;
		margin-top: 34upx;
		font-size: 34upx;
		color: #666666;
	}
	
	.warp-text1 {
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 34upx;
		color: #fff;
		background-color: rgba(0, 197, 42, 1);
	}
	
	.warp-flex {
		display: flex;
		justify-content: space-around;
		border-top: 1upx solid #eeeeee;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80upx;
		line-height: 80upx;
	}
	
	.color-green {
		color: rgba(0, 197, 42, 1);
	}
	
	.warp-flex button {
		border: none;
		font-size: 30upx;
	}
	
	.warp-flex button:nth-child(2) {
		color: rgba(0, 197, 42, 1);
	}
</style>
