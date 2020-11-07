<template>
	<view class="container">
		<view class="tui-box">
			<tui-list-cell :arrow="false" unlined :radius="true" @click="chooseAddr">
				<view class="tui-address">
					<view v-if="true">
						<view class="tui-userinfo">
							<text class="tui-name">{{extraUserInfo.merchantsName}}</text>
							<text class="tui-phone">{{extraUserInfo.phone}}</text>
						</view>
						<view class="tui-addr">
							<view class="tui-addr-tag">
								<image src="../../static/images/location.png" mode=""></image>
							</view>

							<view class="tui-maginRiht">
								<view><text>{{extraUserInfo.address}}{{extraUserInfo.addressDetails}}</text></view>
								<view><text>{{extraUserInfo.storeName}}</text></view>
							</view>
						</view>
					</view>
					<view class="tui-none-addr" v-else>
						<image src="/static/images/index/map.png" class="tui-addr-img" mode="widthFix"></image>
						<text>选择收货地址</text>
					</view>
				</view>
				<view class="tui-bg-img">
					<image src="../../static/images/line.png" mode=""></image>
				</view>
			</tui-list-cell>
			<view class="tui-top tui-goods-info">
				<view class=" tui-cell-view">
					<scroll-view scroll-x="true" class="scroll" scroll-with-animation="true">
						<view class="prefer-dis">
							<block v-for="(item, index) in goodsData" :key="index">
								<view class="prefer-view">
									<image :src="item.url" mode="aspectFill" class="tui-img"></image>
								</view>
							</block>
						</view>
					</scroll-view>
				</view>

				<tui-list-cell :arrow="true" :hover="false">
					<view class="tui-padding tui-flex tui-total-flex">
						<view style="font-size: 28rpx;color: #666666;margin-right: 12rpx;">共{{allGoodsNum}}件</view>
						<view style="color: #B6B6B6;font-size: 28rpx;padding-right:20rpx" @click="open">查看清单</view>
					</view>
				</tui-list-cell>
				<!-- <tui-list-cell :hover="false" :lineLeft="false" padding="0">
					<view class="tui-remark-box tui-padding tui-flex">
						<view>订单备注</view>
						<input type="text" class="tui-remark" placeholder="选填: 请先和商家协商一致" placeholder-class="tui-phcolor"></input>
					</view>
				</tui-list-cell> -->
			</view>
			<view class="tui-top">
				<tui-list-cell unlined :hover="insufficient" :radius="true" :arrow="insufficient">
					<view class="tui-flex">
						<view class="tui-balance">支付方式</text></view>
						<view class="tui-scale-small"> <text class="iconfont icon-weixin"></text> 微信支付</view>
						<view class="tui-pr-30 tui-light-dark" v-show="insufficient">余额不足, 去充值</view>
					</view>
				</tui-list-cell>
			</view>
		</view>
		<view class="tui-safe-area"></view>



		<view class="tui-tabbar">
			<view class="tui-flex-end tui-color-red tui-pr-20">
				<view class="tui-black">实付: </view>
				<view class="tui-size-24">￥</view>
				<view class="tui-price-large">{{extraData.orderAmount}}</view>
				<view class="tui-size-24"></view>
				<view class="tui-black">(含运费) </view>
			</view>
			<view class="tui-pr25">
				<tui-button width="200rpx" height="70rpx" :size="28" type="danger" shape="circle" @click="SubmitOrder">提交订单</tui-button>
			</view>
		</view>
		<!-- 弹出清单 -->
		<wyb-popup ref="popup" type="bottom" height="700" width="500" radius="6" mode="size-fixed" :showCloseIcon="true"
		 :scrollY="true" :showScrollbar="true" :isTop="isTop">
			<!-- 清单列表 -->
			<view class="tui-list-title">
				<text class="border-green">购买清单（共{{allGoodsNum}}件）</text>
				<view class="borderBottom"></view>
			</view>
			<view class="tui-rank-list">
				<view class="tui-tab-rank" v-for="(item,index) in goodsData" :key="index">
					<view class="tui-tab-rank-cent">
						<image :src="item.url" mode="aspectFill" class="img-rink"></image>
						<view class="tui-pro-tit">
							<text class="tag-tit">{{item.lableName}}</text> <text class="tag-tit-text">{{item.name}}</text>
							<view class="tag-tit2">
								<view class="">
									<view class="tag-tit2-price">
										{{item.specification}} x {{item.number}}
									</view>
									<view class="tag-tit2-text">
										&yen;{{item.totalPrice}}元
									</view>
								</view>

								<!-- <view>购物车</view> -->
							</view>

						</view>
					</view>
				</view>
			</view>
		</wyb-popup>


	</view>
</template>

<script>
	import {
		listing,
		publicing
	} from '../../api/api.js'
	import {
		postSettle,
		imgurl,
		postOrderPay,
		getSubmitOrder
	} from '../../api/request.js'
	var setdata = uni.getStorageSync('usermen')
	var {
		log
	} = console
	// var data ={id:this.ids,token:setdata}

	export default {
		components: {},
		data() {
			return {
				payUrl: '',
				isTop: true,
				ids: '', //order里面的ids
				goodsData: [], //结算的商品信息
				// imgUrl:'http://192.168.1.10:8980/js/userfiles/fileupload/202008/1295611300690604034.png',
				hasCoupon: true,
				insufficient: false,
				show: false,
				extraUserInfo: {},
				totalPrice: {},
				ids2: '', //order结算后的ids2
				orderNumber: '',
				extraData: {},
				idList: '',
				url: '',
				name: 'arrowright',
				unit: 'rpx',
				size: 32,
				color: '#000',
				margin: '0'


			}
		},
		computed: {
			allGoodsNum() {
				let list = this.goodsData
				let num = 0
				list.forEach(item => {
					num += item.number
				})
				return num
			}
		},
		methods: {

			clip() {
				uni.setClipboardData({
					data: this.payUrl,
					success: function() {
						uni.hideToast()
					}
				});
			},
			//立即购买
			gtePayORderTel() {
				var setdata = uni.getStorageSync('usermen')
				let data = {
					id: this.ids,
					token: setdata
				}

				// Promise.all([publicing(postSettle,data),publicing(postSubmitOrder,data2)])
				publicing(postSettle, data)
					.then((res) => {
						this.extraUserInfo = res.data.data.extraData.userInfo
						this.goodsData = res.data.data.data
						this.extraData = res.data.data.extraData
					})
					.catch((err) => {
						console.log(err)
					})
			},

			//进来页面请求结算获得一串id

			gtePayORder() {
				var setdata = uni.getStorageSync('usermen')
				let data = {
					id: this.ids,
					token: setdata
				}
				// Promise.all([publicing(postSettle,data),publicing(postSubmitOrder,data2)])
				publicing(postSettle, data)
					.then((res) => {
						this.extraUserInfo = res.data.data.extraData.userInfo
						this.goodsData = res.data.data.data
						this.extraData = res.data.data.extraData
						let new_arr = this.goodsData.map(obj => {
							return obj.id
						}) //提取数组里面的每一项里面的id
						// this.ids2 = new_arr
						//拼接字符串id
						let idList = "";
						for (let index in new_arr) {
							idList = idList + new_arr[index] + ",";
						}
						//去掉双引号
						//去除idList最后一个逗号
						idList = idList.substring(0, idList.length - 1);
						console.log("idList去除逗号后====", idList)
						log(idList)
						this.ids = idList
						// this.ids2 = idList
						// log(this.ids2)
						// this.SubmitOrder(idList)


					})
					.catch((err) => {
						console.log(err)
					})
			},

			getQueryString(str, key) {
				if (str) {
					var queryString = str.split('?')[1] || '';
					var arr = queryString.split('&') || [];
					for (var i = 0; i < arr.length; i++) {
						var keyString = decodeURIComponent(arr[i].split('=')[0]);
						var valueString = decodeURIComponent(arr[i].split('=')[1]);
						if (key === keyString) {
							return valueString;
						}
					}
					return;
				} else {
					return;
				}
			},

			//获得订单号，才能支付
			SubmitOrder() {
				let that = this
				var setdata = uni.getStorageSync('usermen')
				let data2 = {
					id: that.ids,
					token: setdata
				}
				listing(getSubmitOrder, data2)
					.then((res) => {
						let {
							payinfo
						} = res.data.data
						let tmp = JSON.parse(payinfo)
						console.log(tmp)
						uni.requestPayment({
							timeStamp: tmp.timeStamp,
							nonceStr: tmp.nonceStr,
							package: tmp.package,
							signType: tmp.signType,
							paySign: tmp.paySign,
							success(resovle) {
								uni.showToast({
									title:"支付成功"
								})
								uni.reLaunch({
									url: '../../pagesII/myOrder/myOrder?index=0'
								})
							},
							fail(reject) {
								uni.showToast({
									title:"取消支付",
									icon: 'none'
								})
								setTimeout(()=> {
									uni.reLaunch({
										url: '../../pagesII/myOrder/myOrder?index=0'
									})
								},500)
								return
							}
						})
						// let orderNumber = res.data.data.orderNumber
						// this.payUrl = res.data.data.payUrl
						// that.clip()
						// uni.showModal({
						// 	title: '提示',
						// 	content: '确认支付',
						// 	success: (res) => {
						// 		if (res.confirm) {
						// 			that.btnPay()
						// 		} else if (res.cancel) {
						// 			uni.showToast({
						// 				title: '订单已取消',
						// 				icon: 'none',
						// 				duration: 2000
						// 			})
						// 			uni.switchTab({
						// 				url: '../../pages/my/my'
						// 			})
						// 			return
						// 		}
						// 	}
						// });

					})
					.catch((err) => {
						log(err)
					})

			},
			open() {
				this.$refs.popup.show()
			},
			chooseAddr() {
				uni.navigateTo({
					url: "../address/address"
				})
			},
			//去支付
			btnPay(orderNumber) {
				uni.showLoading({
					title: '支付中',
					duration: 2000
				})
				uni.reLaunch({
					url: '../PayOK/PayOK'
				})

			},
			popupClose() {
				this.show = false
			}
		},
		onLoad(options) {
			this.url = imgurl
			this.ids = options.ids;
			this.gtePayORderTel()

			var pages = getCurrentPages();
			var curPage = pages[pages.length - 1]; // 当前页面路径
			var beforePage = pages[pages.length - 2]; // 前一个页面路径
			log(beforePage.$page.fullPath)
			if (beforePage.$page.fullPath === '/pages/order/order') {
				log('我执行了加购清单')
				this.gtePayORder(); //请求结算
			} else if (beforePage.$page.fullPath == '/pagesIII/productDetail/productDetail') {
				log('我执行了立即购买')
			}
		}

	}
</script>

<style>
	/* 弹层 */
	.tui-list-title {
		position: relative;
		height: 100rpx;
		width: 100%;
		text-align: center;
		padding-top: 20rpx;
	}

	.border-green {}

	.borderBottom {
		width: 280rpx;
		height: 10rpx;
		background-color: rgba(0, 197, 42, 0.5);
		position: absolute;
		right: 33%;
		top: 60rpx;
		border-radius: 20rpx;
	}

	/* 弹出列表 */
	.tui-rank-list {
		padding: 0 30rpx;
	}

	.tui-tab-rank {
		margin: 10rpx 0;
		border-bottom: 1rpx solid rgba(245, 245, 245, 1);
	}

	.tui-tab-rank-cent {
		display: flex;
		padding: 20rpx 0;

	}

	.img-rink {
		width: 180rpx;
		height: 180rpx;
		display: block;
		margin-right: 20rpx;
	}

	.tui-pro-tit {
		flex: 5;
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

	.tag-tit-text {
		font-size: 28rpx;
		color: #333;
	}

	.tag-tit2 {
		display: flex;
		justify-content: space-between;
	}

	.tag-tit2-price {
		color: rgba(85, 85, 85, 1);
		font-size: 24rpx;
	}

	.tag-tit2-text {
		color: rgba(255, 86, 0, 1);
		font-size: 24rpx;
	}

	.tui-shop-car {
		width: 80rpx;
		height: 80rpx;
		display: block;
	}

	/* end */
	.icon-weixin {
		color: #4CBF00;
		font-size: 50rpx;
		position: absolute;
		top: -6rpx;
		right: 114rpx;
	}

	.tui-cell-view {
		background-color: #fff;
	}

	.prefer-view {
		height: 200upx;
		padding: 40upx;
		display: flex;
	}

	.scroll {
		white-space: nowrap;
		width: 100%;
		height: 200rpx;
		border-bottom: 1px solid #f5f5f5;
	}

	.prefer-dis {
		display: flex;
		justify-content: start;
	}

	.container {
		padding-bottom: 98rpx;
	}

	.tui-img {
		width: 120rpx;
		height: 120rpx;
		border: 1px solid #f5f5f5;
		display: inline-block;
		margin: 0 8rpx;
		min-width: 120rpx;
		background: #eee;
		border-radius: 6rpx;
	}

	.tui-img:first-child {
		margin-left: 0;
	}

	.tui-img:last-child {
		margin-right: 0;
	}

	.tui-box {
		padding: 20rpx 0 118rpx;
		box-sizing: border-box;
	}

	.tui-address {
		min-height: 80rpx;
		padding: 10rpx 0;
		box-sizing: border-box;
		position: relative;
	}

	.tui-userinfo {
		font-size: 30rpx;
		font-weight: 500;
		line-height: 30rpx;
		padding-bottom: 12rpx;
	}

	.tui-name,
	.tui-name {
		padding-right: 16rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #000;
	}

	.tui-addr {
		font-size: 24rpx;
		word-break: break-all;
		display: flex;
		align-items: flex-start;

	}

	.tui-addr-tag image {
		width: 24rpx;
		height: 28rpx;
		margin-top: 8rpx;

	}

	.tui-maginRiht {
		font-size: 28rpx;
		color: #555555;
		margin-left: 10rpx;
	}


	.tui-bg-img image {
		width: 100%;
		height: 3rpx;

	}

	.tui-top {
		margin-top: 20rpx;
		overflow: hidden;
	}

	.tui-goods-title {
		font-size: 28rpx;
		display: flex;
		align-items: center;
	}

	.tui-padding {
		box-sizing: border-box;
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
		max-width: 310rpx;
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

	.tui-price-right {
		text-align: right;
		font-size: 24rpx;
		color: #888888;
		line-height: 30rpx;
		padding-top: 20rpx;
	}

	.tui-flex {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26rpx;
	}

	.tui-total-flex {
		justify-content: flex-end;
	}

	.tui-color-red,
	.tui-invoice-text {
		color: rgba(255, 101, 0, 1);
		padding-right: 30rpx;
	}

	.tui-balance {
		font-size: 28rpx;
		font-weight: 500;
	}

	.tui-black {
		color: #666;
		line-height: 30rpx;
	}

	.tui-gray {
		color: #888888;
		font-weight: 400;
	}

	.tui-light-dark {
		color: #666;
	}

	.tui-goods-price {
		display: flex;
		align-items: center;
		padding-top: 20rpx;
	}

	.tui-size-24 {
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-price-large {
		font-size: 34rpx;
		line-height: 32rpx;
		font-weight: 600;
	}

	.tui-flex-end {
		display: flex;
		align-items: flex-end;
		padding-right: 0;
	}

	.tui-phcolor {
		color: #B3B3B3;
		font-size: 26rpx;
	}

	/* #ifndef H5 */
	.tui-remark-box {
		padding: 22rpx 30rpx;
	}

	/* #endif */
	/* #ifdef H5 */
	.tui-remark-box {
		padding: 26rpx 30rpx;
	}

	/* #endif */

	.tui-remark {
		flex: 1;
		font-size: 26rpx;
		padding-left: 64rpx;
	}

	.tui-scale-small {
		font-size: 28rpx;
		font-weight: 500;
		position: relative;


	}

	.tui-scale-small .wx-switch-input {
		margin: 0 !important;
	}

	/* #ifdef H5 */
	>>>uni-switch .uni-switch-input {
		margin-right: 0 !important;
	}

	/* #endif */
	.tui-tabbar {
		width: 100%;
		height: 98rpx;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 26rpx;
		box-shadow: 0 0 1px rgba(0, 0, 0, .3);
		padding-bottom: env(safe-area-inset-bottom);
		/* z-index: 996; */
	}

	.tui-pr-30 {
		padding-right: 30rpx;
	}

	.tui-pr-20 {
		padding-right: 20rpx;
	}

	.tui-none-addr {
		height: 80rpx;
		padding-left: 5rpx;
		display: flex;
		align-items: center;
	}

	.tui-addr-img {
		width: 36rpx;
		height: 46rpx;
		display: block;
		margin-right: 15rpx;
	}


	.tui-pr25 {
		padding-right: 25rpx;
	}

	.tui-safe-area {
		height: 1rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
