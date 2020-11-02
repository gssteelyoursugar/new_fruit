<template>
	<view>
		<!--header-->

		<!--header-->
		<view class="tui-mybg-box">
			<image :src="imageUrl" class="tui-my-bg" mode="aspectFill"></image>
			<view class="tui-header-center">
				<image :src="usering.avatarUrl" class="tui-avatar" mode="aspectFill" v-if="wxlogin"></image>
				<image src="../../static/images/default_avatar.png" class="tui-avatar" mode="aspectFill" v-if="!wxlogin"></image>
				<!-- 已登录个人信息状态wxlogin -->
				<view class="tui-info" v-if="wxlogin">
					<view class="tui-explain">{{usering.nickName}}</view>
					<view class="tui-user-phone" v-if="wxlogin && ApproveStatus === 1">
						<image src="../../static/images/cellphone.png" mode="aspectFill"></image>
						<text>{{user_phone}}</text>
					</view>
				</view>
				<!-- 未登录个人信息状态!wxlogin-->
				<view class="tui-info2" v-if="!wxlogin">
					<view class="tui-nickname">
						<button plain="true" type="primary" :text="loginText" open-type="getUserInfo" @getuserinfo="getUserInfo">点击登录</button>
					</view>
					<view class="tui-explain">
					</view>
				</view>
				<!-- 未提交审核 => 去认证店铺-->
				<view class="tui-set-box3" v-if="wxlogin && ApproveStatus === undefined ||ApproveStatus ==='' ||ApproveStatus === null">
					<view class="tui-icon-box ">
						<view class="tui-icon-box " @tap="tendShop">
							<text class="tui-icon-text3">{{logMsg}}</text>
						</view>
					</view>
				</view>
				<!-- 未提交审核 => 去认证店铺 -->
				<!-- 提交审核并等待通过 => 查看店铺信息-->
				<view class="tui-set-box3" v-if="wxlogin && ApproveStatus === 0">
					<view class="tui-icon-box">
						<view class="tui-icon-box " @tap="tendShop1">
							<text class="tui-icon-text3">{{logMsg}}<text style="margin-left: 6rpx;"> ></text></text>
						</view>
					</view>
				</view>
				<!-- 提交审核并等待通过 => 查看店铺信息-->
				<!-- 提交审核并通过 -->
				<view class="tui-set-box" v-if="wxlogin && ApproveStatus === 1">
					<view class="tui-icon-box ">
						<image src="../../static/images/dianpu@2x.png" mode="aspectFill" class="tui-icon-shop"></image>
					</view>
					<view class="tui-icon-box " @tap="tendShop1">
						<text class="tui-icon-text">{{logMsg}}</text>
					</view>
				</view>
				<!-- 提交审核并通过 -->
				<!-- 拒绝 -->
				<view class="tui-set-box3" v-if="wxlogin && ApproveStatus === 2">
					<view class="tui-icon-box ">
						<view class="tui-icon-box " @tap="tendShop1">
							<text class="tui-icon-text3">{{logMsg}}</text>
						</view>
					</view>
				</view>
				<!-- 拒绝 -->
			</view>
		</view>
		<view class="tui-content-box">
			<!-- 订单 -->
			<view class="tui-box tui-order-box">
				<tui-list-cell padding="0" :unlined="true" :arrow="true" :lineLeft="false" @click="myOrder">
					<view class="tui-cell-header">
						<view class="tui-cell-title">我的订单</view>
						<view class="tui-cell-sub">查看全部订单</view>
					</view>
				</tui-list-cell>
				<view class="tui-order-list tui-order-list-wrap">
					<view class="tui-order-item" @tap="ToBeDelivered">
						<view class="tui-icon-box">
							<image src="/static/images/daifahuo@3x.png" class="tui-order-icon"></image>
						</view>
						<view class="tui-order-text">待发货<text v-if="wxlogin &&fahuoList !== ''&&fahuoList!== 0">{{fahuoList}}</text></view>
					</view>
					<view class="tui-order-item" @tap="ToBeReceived">
						<view class="tui-icon-box">
							<image src="/static/images/daishouhuo@3x.png" style="width:52rpx;" class="tui-order-icon"></image>
						</view>
						<view class="tui-order-text">待收货<text v-if="wxlogin &&shouhuoList !== ''&&shouhuoList!==0">{{shouhuoList}}</text></view>
					</view>
					<view class="tui-order-item" @tap="ToBePaid">
						<view class="tui-icon-box">
							<image src="/static/images/done.png" style="width:40rpx;" class="tui-order-icon"></image>
						</view>
						<view class="tui-order-text">已完成</view>
					</view>
					<view class="tui-order-item" @tap="gotoAfter">
						<view class="tui-icon-box">
							<image src="/static/images/shouhou@3x.png" class="tui-order-icon"></image>
						</view>
						<view class="tui-order-text">退款/售后<text v-if="wxlogin &&tuikuanList !== ''&&tuikuanList!==0">{{tuikuanList}}</text></view>
					</view>
				</view>
			</view>

			<!-- 常用工具 -->
			<view class="tui-box tui-tool-box">
				<tui-list-cell :unlined="true" padding="0" :lineLeft="false">
					<view class="tui-cell-header">
						<view class="tui-cell-title">常用工具</view>
						<!-- <view class="tui-cell-sub">查看更多</view> -->
					</view>
				</tui-list-cell>
				<view class="tui-order-list tui-flex-wrap">
					<view class="tui-tool-item" @tap="href(1)">
						<view class="tui-icon-box">
							<image src="/static/images/order@2x.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">订单统计</view>
					</view>
					<view class="tui-tool-item" @tap="href(2)">
						<view class="tui-icon-box">
							<image src="/static/images/pingjia@3x.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">评价管理</view>
					</view>
					<view class="tui-tool-item" @tap="href(3)">
						<view class="tui-icon-box">
							<image src="/static/images/shoucang@3x.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">我的收藏</view>
					</view>
					<view class="tui-tool-item" @tap="href(4)">
						<view class="tui-icon-box">
							<image src="/static/images/kefu@3x.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">联系客服
						</view>
					</view>
					<view class="tui-tool-item" @tap="href(5)">
						<view class="tui-icon-box">
							<image src="/static/images/msg.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">资讯信息</view>
					</view>
					<view class="tui-tool-item" @tap="href(6)">
						<view class="tui-icon-box">
							<image src="/static/images/guize@3x.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">规则说明</view>
					</view>
					<view class="tui-tool-item" @tap="href(7)">
						<view class="tui-icon-box">
							<image src="/static/images/hezuo@3x.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">商务合作</view>
					</view>
					<view class="tui-tool-item" @tap="href(8)">
						<view class="tui-icon-box">
							<image src="/static/images/shezhi@3x.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">设置</view>
					</view>
					<!-- <view class="tui-tool-item">
						<view class="tui-icon-box">

						</view>
						<view class="tui-tool-text"></view>
					</view>
 -->
				</view>
			</view>

			<!--为你推荐-->
			<!-- <button open-type="contact" type="primary" >打开会话</button> -->
			<!-- <view v-if="!wxlogin">
				<button plain="true" type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>
			</view> -->
			<!-- <button type='default' session-from='{"kefu":["kefuID"]}' open-type="contact"> 指定客服</button> -->

			<view class="divider-text">
				<image src="../../static/images/qaunlog@3x.png" mode="aspectFill" class="tui-log-div"></image>
			</view>
		</view>

	</view>
</template>

<script>
	var setuserdata = uni.getStorageSync('userIN') //用户信息
	let setdata = uni.getStorageSync('usermen') //Token
	let {
		log
	} = console
	let logins = require('../../login/login.js')

	import {
		publicing2,
		listing,
		publicing
	} from '../../api/api.js'
	import {
		loginis,
		getClient,
		getMyOrder
	} from '../../api/request.js'

	export default {
		onLoad: function(options) {
			console.log(123)
			this.getOrderData()
			// this.getMerchants()
			// this.getWxdata()
			let obj = {};
			// #ifdef MP-WEIXIN
			// obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			// obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			// my.hideAddToDesktopMenu();
			// #endif
			uni.getSystemInfo({
				success: (res) => {
					this.width = obj.left || res.windowWidth;
					this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
					this.top = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
					this.scrollH = res.windowWidth * 0.6
				}
			})
		},
		data() {
			return {
				lists: [],
				modaishow: false,
				show: true,
				wxlogin: true,
				usering: {},
				imageUrl: "/static/images/wode.png",
				kefuID: '',
				loadding: false,
				pullUpOn: true,
				ApproveStatus: undefined,
				loginText: '',
				logMsg: "去认证我的店铺", //店铺状态信息展示
				showBtn: false, //已登录未认证
				user_phone: "",
				fukuanList: '',
				fahuoList: '',
				shouhuoList: "",
				tuikuanList: ''
			}
		},
		methods: {
			onPullDownRefresh() {
				this.getMerchants()
				this.getOrderData()
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000);
			},
			//获取头像昵称
			getUserInfo(event) {
				log(event)
				this.usering = event.detail.userInfo
				uni.setStorageSync('userIN', event.detail.userInfo) //把头像存在本地，小程序提供如同浏览器cookie
				let userING = uni.setStorageSync('userIN', event.detail.userInfo)
				if (event.detail.userInfo) {
					let wxing = event.detail.userInfo
					this.wxCode(wxing.avatarUrl, wxing.nickName)
				}
				// wx.startPullDownRefresh()
				this.ifUser()
			},
			//获取code
			wxCode(avatarUrl, nickName) {
				wx.login({
					success: (res) => {
						// log(res)
						let code = res.code
						console.log(res)
						this.wxLoging(code)
					},
					fail: (err) => {
						log(err)
					}
				})
			},
			//发code给后台换取token
			wxLoging(code) {
				log(code)
				let data = {
					code
				}
				uni.showLoading({
					title: '加载中',
					icon: 'none',
					duration: 2000
					// mask:true
				})
				publicing2(loginis, data) //发送请求携带参数
					.then((res) => {
						if (res.statusCode == 500) {
							uni.showModal({
								title: '提示',
								content: '登录出错，请重新登录获取信息',
								success: function(res) {
									if (res.confirm) {
										uni.hideLoading();
									} else if (res.cancel) {
										uni.hideLoading();
									}
								}
							});
							return
						} else if (res.statusCode == 200) {
							this.getOrderData()
						}
						// log(res) //获得token
						uni.setStorageSync('usermen', res.data.token) //把token存在本地，小程序提供如同浏览器cookie
						uni.hideLoading();
						this.getOrderData()
						this.getMerchants()
					})
					.catch((err) => {
						uni.showToast({
							title: `${err}`
						})
						log(err)
					})

			},
			//一、认证店铺首先判断是否登录
			// ifLogin() {
			// 	var value = this.ApproveStatus
			// 	if (!setdata) { //判断有无token，没有就显示去认证店铺
			// 		log('没有token信息请点击登录')
			// 		// log(this.logMsg)
			// 	} else if (value == 0) {
			// 		this.Goauth2 = true
			// 		//状态为0时证明已经认证
			// 		// this.logMsg = '审核中待通过'
			// 	} else if (value == 1) {
			// 		// this.logMsg = '我的店铺已认证'
			// 		this.Goauth3 = true
			// 	} else if (value == 2) {
			// 		// this.logMsg = '未认证'
			// 		// this.Goauth4 = true
			// 	} else if (value == undefined) {
			// 		this.Goauth = false
			// 		this.Goauth2 = false
			// 		this.Goauth3 = false
			// 		this.logMsg = '去认证我的店铺'
			// 	}
			// },
			//获取申请店铺状态信息
			getMerchants() {
				let setdata = uni.getStorageSync('usermen') //Token
				let data = {
					token: setdata
				}
				if (!setdata) {
					return
				}
				listing(getClient, data)
					.then((res) => {
						///登录成功后显示去认证店铺，如果已认证，显示已认证店铺
						this.ApproveStatus = res.data.data.approveStatus //获取状态码，0未认证，1已认证，2拒绝
						uni.setStorageSync('StoreStatus', res.data.data.approveStatus)
						let setStore = uni.getStorageSync('StoreStatus') //状态码
						this.user_phone = res.data.data.phone
						let valu2 = this.ApproveStatus
						if (valu2 === undefined || valu2 === null ||  valu2 === '') { //判断如果请求返回为空说明未申请过店铺认证
							this.logMsg = '去认证我的店铺'
						} else if (valu2 === 0) {
							this.logMsg = '审核中待通过'
						} else if (valu2 === 1) {
							this.logMsg = '我的店铺已认证'
						} else if (valu2 === 2) {
							this.logMsg = '未通过,请重新提交'
						}
					})
					.catch((err) => {
						log(err)
					})

			},
			
			// 获取订单
			getOrderData() {
				let setdata = uni.getStorageSync('usermen')
				if (!setdata) {
					return
				}
				let data = {
					token: setdata,
					pageNo: 1,
					pageSize: 10000,
				}
				listing(getMyOrder, data)
					.then((res) => {
						let list = res.data.data
						if (list.length === 0) return
						let fukuanList = []
						let fahuoList = []
						let shouhuoList = []
						let tuikuanList = []
						list.forEach(item => {
							if (item.payStatus == 0) {
								fukuanList.push(item)
							}
							if (item.tradeStatus == "1"||item.tradeStatus == "2" || item.tradeStatus == "3") {
								fahuoList.push(item)
							}
							if (item.payStatus == '1' && (item.tradeStatus == '4'||item.tradeStatus == '8')) {  
								shouhuoList.push(item)
							}
							if (item.tradeStatus == '7') {  // 只要 待确定的 3
								if(item.afterStatus == '3') { 
									tuikuanList.push(item)
								}
							}
						})
						this.fukuanList = fukuanList.length
						this.fahuoList = fahuoList.length
						this.shouhuoList = shouhuoList.length
						this.tuikuanList = tuikuanList.length
						this.$forceUpdate()
					})
					.catch((err) => {
						log(err)
					})
			},
			ifUser() {
				let setuserdata = uni.getStorageSync('userIN')
				if (!setuserdata) {
					this.wxlogin = false
				} else {
					this.wxlogin = true
					this.usering = setuserdata
				}
			},
			//去认证店铺
			tendShop() {
				let setdata = uni.getStorageSync('usermen')
				if (!setdata) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					this.modaishow = true
				} else {
					uni.navigateTo({
						url: '../../pagesII/tendShop/tendShop'
					})
				}
			},
			// 已经申请了/审核中 （无论通不通过）查看提交的店铺资料
			tendShop1() {
				uni.navigateTo({
					url: '../../pagesII/StoreInformation/StoreInformation'
				})
			},
			gotoAfter() {
				if (!this.wxlogin) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: '../../pagesIII/navbar/navbar'
					})
				}
			},
			//我的全部订单
			myOrder() {
				if (!this.wxlogin) {
					uni.showToast({
						title: "请先登录",
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: '../../pagesII/myOrder/myOrder?index=0'
					})
				}
			},
			//跳转到待发货
			ToBeDelivered() {
				if (!this.wxlogin) {
					uni.showToast({
						title: "请先登录",
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: '../../pagesII/myOrder/myOrder?index=1'
					})
				}
			},
			//跳转到待收货
			ToBeReceived() {
				if (!this.wxlogin) {
					uni.showToast({
						title: "请先登录",
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: '../../pagesII/myOrder/myOrder?index=2'
					})
				}
			},
			//跳转到已完成
			ToBePaid() {
				if (!this.wxlogin) {
					uni.showToast({
						title: "请先登录",
						icon: 'none'
					})
			
				} else {
					uni.navigateTo({
						url: '../../pagesII/myOrder/myOrder?index=3'
					})
				}
			
			},
			
			// getWxdata(){
			// 	uni.request({
			// 	    url: 'https://api.weixin.qq.com/cgi-bin/customservice/getkflist?access_token=36_S2bdqu6Yy3WdGlcPmw0UH9fMGV6H0SjujlM0t6R7rVkn2ESWoiQ346FUz0mEI2GsDKOoAzUwnQNah7G5dzANuNzuXnudm0S-JONDlp6kn58nnqNKA-apYL1vcz7nwR_l5Ubn6HqnOLUAY0brVRQgAIAZVU', //仅为示例，并非真实接口地址。

			// 	    success: function(res) {
			// 	        // let kefuid = res.data.kf_list[0].kf_id

			// 	    }
			// 	});

			// },
			href(page) {
				const urlList = {
					0: "",
					1: "../../pagesII/OrderStatistics/OrderStatistics",
					2: "../../pagesII/Evaluate/Evaluate",
					3: "../../pagesII/myCollection/myCollection",
					4: "../../pagesII/customerService/customerService",
					5: "../../pagesII/message/message",
					6: "../../pagesII/ruleDescription/ruleDescription",
					7: "../../pagesII/cooperation/cooperation",
					8: "../../pagesII/SetUp/SetUp"
				}
				if (page == 5 || page == 6 || page == 7) {
					uni.navigateTo({
						url: urlList[page]
					})
					return
				}
				if (!this.wxlogin) {
					uni.showToast({
						title: '请先登录',
						icon: "none"
					})
				} else {
					uni.navigateTo({
						url: urlList[page]
					})
				}
			},
			detail: function() {
				uni.navigateTo({
					url: '../productDetail/productDetail'
				})
			},
			back() {
				uni.navigateBack();
			}
		},
		onShow() {
			this.getMerchants()
			this.getOrderData()
			this.ifUser()
		},
		// onPageScroll(e) {
		// 	this.scrollTop = e.scrollTop;
		// },
		onPullDownRefresh() {
			this.getOrderData()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 200)
		}
	}
</script>

<style>
	.tui-icon-box button {
		border: none !important;
		font-size: 20rpx !important;
		color: rgba(182, 182, 182, 1) !important;
		padding: 0;
		margin-left: 40rpx;
	}

	.tui-header-box {
		width: 100%;
		padding: 0 30rpx 0 20rpx;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 32px;
		transform: translateZ(0);
		z-index: 9999;
	}

	.divider-text {
		text-align: center;
		width: 100%;

		margin-top: 50rpx;
	}

	.tui-log-div {
		width: 300rpx;
		height: 50rpx;

		text-align: center;
	}

	/* #ifndef MP */
	.tui-header-icon {
		min-width: 120rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/* #endif */
	/* #ifdef MP */
	/* 渐变 */
	/* 已认证 */
	.tui-set-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-image: linear-gradient(to right, #FF943D, #FF5600);
		width: 250rpx;
		height: 70rpx;
		position: absolute;
		line-height: 70rpx;
		right: 0;
		bottom: -12rpx;
		text-align: center;
		justify-content: center;
		border-radius: 60rpx 0 0 60rpx;
	}

	/* 未认证 */
	.tui-set-box2 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: rgba(245, 245, 245, 1);
		width: 230rpx;
		height: 70rpx;
		position: absolute;
		line-height: 70rpx;
		right: 0;
		border-radius: 60rpx 0 0 60rpx;
	}

	/* 审核中/未通过 */
	.tui-set-box3 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: rgba(245, 245, 245, 1);
		width: 250rpx;
		height: 70rpx;
		position: absolute;
		line-height: 70rpx;
		right: 0;
		bottom: -12rpx;
		border-radius: 60rpx 0 0 60rpx;
	}

	.tui-set-box3 .tui-icon-box {
		position: relative;
		width: 100%;
		text-align: center;
	}

	.tui-set-box3 .tui-icon-box .tui-icon-text3 {
		margin: 0;
		font-size: 24rpx;
		color: #b6b6b6;
	}



	/* #endif */
	.tui-icon-box {
		position: relative;

	}

	.tui-icon-shop {
		height: 32rpx;
		width: 32rpx;
		display: block;
		margin-left: 20rpx;
	}

	/* 已认证 */
	.tui-icon-text {
		font-size: 20rpx;
		color: #fff;
		margin-left: 4rpx;
	}

	/* 未认证 */
	.tui-icon-text2 {
		font-size: 20rpx;
		color: rgba(182, 182, 182, 1);
		margin-right: 20rpx;
	}

	/* 去认证店铺 */
	.tui-icon-text3 {
		font-size: 20rpx;
		color: rgba(182, 182, 182, 1);
		margin-left: 40rpx;
	}


	.tui-icon-setup {
		margin-left: 8rpx;
	}

	.tui-badge {
		position: absolute;
		font-size: 24rpx;
		height: 32rpx;
		min-width: 20rpx;
		padding: 0 6rpx;
		border-radius: 40rpx;
		right: 10rpx;
		top: -5rpx;
		transform: scale(0.8) translateX(60%);
		transform-origin: center center;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.tui-badge-red {
		background: #F74D54;
		color: #fff;
	}

	.tui-badge-white {
		background: #fff;
		color: #F74D54;
	}

	.tui-badge-dot {
		position: absolute;
		height: 12rpx;
		width: 12rpx;
		border-radius: 50%;
		right: -12rpx;
		top: 0;
		background: #F74D54;
	}

	.tui-mybg-box {
		width: 100%;
		height: 360rpx;
		position: relative;
	}

	.tui-my-bg {
		width: 100%;
		height: 360rpx;
		display: block;
	}

	.tui-header-center {
		position: absolute;
		width: 100%;
		height: 130rpx;
		left: 0;
		top: 130rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-avatar {
		flex-shrink: 0;
		width: 130rpx;
		height: 130rpx;
		display: block;
		border-radius: 50%;

	}

	.tui-info {
		width: 60%;
		padding-left: 16rpx;

	}

	.tui-info2 {}

	.tui-nickname {
		font-size: 30rpx;
		font-weight: 500;
		color: #fff;
		display: flex;
		align-items: center;
	}

	.tui-img-vip {
		width: 56rpx;
		height: 24rpx;
		margin-left: 18rpx;
	}

	.tui-explain {
		width: 80%;
		font-size: 38rpx;
		font-weight: 500;
		color: #fff;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-user-phone {
		display: flex;
		align-items: center;

	}

	.tui-user-phone image {
		width: 30rpx;
		height: 30rpx;
	}

	.tui-user-phone text {
		margin-left: 4rpx;
		font-size: 24rpx;
		font-weight: 500;
		color: #fff;
	}

	.tui-nickname button {
		border: none !important;
		color: #fff !important;
		margin: 0 auto;
		padding: 0 auto;

	}

	.tui-btn-edit {
		flex-shrink: 0;
		padding-right: 22rpx;
	}

	.tui-header-btm {
		/* border-top: 1rpx solid #ccc; */
		width: 98%;
		padding: 15rpx 30rpx;
		margin: 0 1%;
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 345rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #fff;
	}

	.tui-btm-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

	}

	.tui-btm-num {
		font-size: 32rpx;
		font-weight: 600;
		position: relative;
	}

	.tui-btm-text {
		font-size: 24rpx;
		opacity: 0.85;
		padding-top: 4rpx;
	}

	.tui-content-box {
		width: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;
		position: relative;
		top: 20rpx;
		z-index: 10;
		background-color: rgba(247, 247, 247, 1);
	}

	.tui-box {
		width: 100%;
		background: #fff;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-order-box {
		height: 248rpx;
	}

	.tui-cell-header {
		width: 100%;
		height: 74rpx;
		padding: 0 26rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-cell-title {
		font-size: 32rpx;
		line-height: 32rpx;
		font-weight: bold;
		color: #333;
	}

	.tui-cell-sub {
		font-size: 26rpx;
		font-weight: 400;
		color: #999;
		padding-right: 28rpx;
	}

	.tui-order-list {
		width: 100%;
		height: 180rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-order-list-wrap .tui-order-item image {
		width: 48rpx;
		height: 48rpx;
	}

	.tui-order-list-wrap .tui-order-item:last-child image {
		width: 40rpx;
	}

	.tui-order-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tui-order-text,
	.tui-tool-text {
		font-size: 24rpx;
		font-weight: 400;
		color: #555;
		padding-top: 12rpx;
	}

	.tui-order-text {
		position: relative;
		z-index: 2;
	}

	.tui-order-text text {
		display: block;
		position: absolute;
		top: -72rpx;
		right: -18rpx;
		background: #f93b3f;
		width: 30rpx;
		text-align: center;
		height: 30rpx;
		z-index: 1;
		border: 1px solid #f93b3f;
		color: #fff;
		font-weight: 500;
		-webkit-border-radius: 50%;
		border-radius: 50%;
		line-height: 30rpx;
		z-index: -1;
		font-size: 22rpx;

	}

	.tui-tool-text {
		font-size: 24rpx;
	}

	.tui-order-icon {
		width: 56rpx;
		height: 56rpx;
		display: block;
	}

	.tui-assets-box {
		height: 178rpx;
		margin-top: 20rpx;
	}

	.tui-assets-list {
		height: 84rpx;
	}

	.tui-assets-num {
		font-size: 32rpx;
		font-weight: 500;
		color: #333;
		position: relative;
	}

	.tui-assets-text {
		font-size: 24rpx;
		font-weight: 400;
		color: #666;
		padding-top: 6rpx;
	}

	.tui-tool-box {
		margin-top: 20rpx;
	}

	.tui-flex-wrap {
		flex-wrap: wrap;
		height: auto;
		padding-bottom: 30rpx;
	}

	.tui-tool-item {
		width: 25%;
		display: flex;
		align-items: center;
		/* justify-content: center; */
		flex-direction: column;
		padding-top: 30rpx;
	}

	.tui-tool-icon {
		width: 70rpx;
		height: 70rpx;
		display: block;
	}

	.tui-badge-icon {
		width: 66rpx;
		height: 30rpx;
		position: absolute;
		right: 0;
		transform: translateX(88%);
		top: -15rpx;
	}

	/*为你推荐*/

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
		height: 200upx;
		background: #FFFFFF;
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
		margin-top: 30upx;
		font-size: 34upx;
		color: #666666;
	}

	.warp-flex {
		display: flex;
		justify-content: space-around;
		border-top: 1upx solid #EEEEEE;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80upx;
		line-height: 80upx;
	}

	.warp-flex button {
		border: none;
		font-size: 30upx;
	}

	/*end  */
</style>
