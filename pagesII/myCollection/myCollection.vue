<template>
	<view>

		<view class="container-img" v-if="modaishow">
			<image src="../../static/images/quanguo.png" mode="widthFix" class="img-quanguo"></image>
			<!-- <text class="color-text">{{tips}}</text> -->
			<view class="btnbox">
				<button class="btn" type="default" open-type="getUserInfo" @getuserinfo="getUserInfo">去登录</button>
			</view>
		</view>

		<view class="container-img no-likes" v-if="!modaishow && likeDatas.length == 0">
			<image src="../../static/images/no_like.png" mode="widthFix"></image>
			<text class="color-text">最近没有收藏过商品~</text>
		</view>
		<view class="tui-tab-rank" v-if="!modaishow && likeDatas.length !== 0">
			<!-- <view class="tui-time-title">
				<text class="title-time-left">2020年9月6日</text> 
			</view> -->
			<view class="tui-tab-rank-cent" v-for="(item,index) in likeDatas" :key="index">
				<view class="img-mask">
					<image :src="item.url" mode="aspectFill" class="img-rink"></image>
					<view class="img-mask-item" v-if="item.number === 0">
						<view class="item-text">抢光了</view>
					</view>
				</view>
				<view class="tui-pro-tit">
					<text class="tag-tit">{{item.lableName}}</text> <text class="tag-tit-text">{{item.name}}</text>
					<view class="tag-tit2">
						<view class="">
							<view class="tag-tit2-price">
								{{item.kg1}}斤装
							</view>
							<view class="tag-tit2-text">
								<text class="price1">￥{{ApproveStatus===1?item.platformClientPrice:'***'}}元</text><text class="price2">/{{item.isGroup == '2'?'份':'件' }}</text>
							</view>
						</view>
						<image src="../../static/images/like1.png" mode="aspectFill" class="tui-shop-car" v-if="showLike" @tap="toggleTips(item.goodsId)"></image>
						<image src="../../static/images/like2.png" mode="aspectFill" class="tui-shop-car" v-if="!showLike"></image>
						<!-- <view>购物车</view> -->
					</view>
				</view>
			</view>
		</view>
		
		<view class="warp" v-if="showTips">
			<view class="warp-view">
				<view class="warp-text1">温馨提示</view>
				<view class="warp-text">取消收藏？</view>
				<view class="warp-flex">
					<view @click="unShowTips" plain="true">取消</view>
					<view @click="delLike" :data-id="11" class="color-green">确认</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	//请求方式
	import {
		listing,
		publicing,
		publicing2
	} from '../../api/api.js'
	//请求地址
	import {
		getLike,
		postDelLike,
		loginis,
		getClient
	} from '../../api/request.js'
	var setdata = uni.getStorageSync('usermen')
	var {
		log
	} = console
	export default {
		data() {
			return {
				showTips: false,
				tips: '',
				modaishow: false,
				isCollection: false,
				isActive: true, //显示
				hasError: false, //隐藏
				showLike: true,
				url: 'http://192.168.1.10:8980/',
				likeDatas: [],
				ApproveStatus: 0,
				curIds: ''

			}
		},
		methods: {
			getMerchants() {
				let setdata = uni.getStorageSync("usermen")
				if (!setdata) { 
					this.ApproveStatus = 0
					return
				}
				let data = {
					token: setdata
				};
				// log(data)
				listing(getClient, data)
					.then(res => {
						if (res.data.code && res.data.code != 200) {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
							uni.switchTab({
								url: "../../pages/my/my"
							})
							return
						}
						///登录成功后显示去认证店铺，如果已认证，显示已认证店铺
						this.ApproveStatus = res.data.data.approveStatus; //获取状态码，0未认证，1已认证，2拒绝
					})
					.catch(err => {
						log(err);
					});
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

			},
			//获取code
			wxCode(avatarUrl, nickName) {
				wx.login({
					success: (res) => {
						log(res)
						let code = res.code
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

				// let appid = wx.getAccountInfoSync().miniProgram.appId
				// let secret = "956f8c9345cbe06a42c6494f7bb53f7f"
				let data = {
					code,
				}
				uni.showLoading({
					title: '加载中',
					icon: 'none'
					// mask:true
				})
				publicing2(loginis, data) //发送请求携带参数
					.then((res) => {
						if (res.statusCode == 500) {
							uni.showModal({
								title: '提示',
								content: '服务器错误，请重新登录获取信息',
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

							log(res)
						}

						log(res) //获得token
						uni.setStorageSync('usermen', res.data.token) //把token存在本地，小程序提供如同浏览器cookie
						uni.hideLoading();
						this.modaishow = false
						this.getLikeData()
					})
					.catch((err) => {
						uni.showToast({
							title: `${err}`
						})
						log(err)
					})
			},
			//获取收藏列表
			getLikeData() {
				var setdata = uni.getStorageSync('usermen')
				let data = {
					token: setdata
				}
				listing(getLike, data)
					.then((res) => {
						if (res.data.code && res.data.code != 200) {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
							uni.switchTab({
								url: "../../pages/my/my"
							})
							return
						}
						this.likeDatas = res.data.data
					})
					.catch((err) => {
						log(err)
					})
			},
			
			unShowTips() {
				this.showTips = false
			},
			
			
			toggleTips (id) {
				this.curIds = id
				this.showTips = !this.showTips
			},
			
			//删除收藏
			delLike() {
				var setdata = uni.getStorageSync('usermen')
				let data = {
					goodsId: this.curIds,
					token: setdata
				}
				publicing(postDelLike, data)
					.then((res) => {
						if (res.data.code && res.data.code != 200) {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
							uni.switchTab({
								url: "../../pages/my/my"
							})
							return
						}
						this.showTips = !this.showTips
						uni.showToast({
							 title: `取消收藏` //${res.data.msg}
						})
						this.getLikeData()
					})
					.catch((err) => {
						log(err)
					})
			},

		},
		onShow() {
			this.getMerchants()
			let setdata = uni.getStorageSync('usermen')
			if (!setdata) {
			} else {
				this.getLikeData()
			}

		}
	}
</script>

<style>
	/* 隐藏 */
	.text-danger {
		display: none !important;
	}

	/* 显示 */
	.active {
		display: block;
	}

	.price1 {
		color: #FF5600;
		font-size: 24rpx;
		font-weight: 600;
	}

	.price2 {
		color: #B6B6B6;
		font-size: 24rpx;
	}

	.tui-tab-rank {
		background-color: #fff;
		margin: 20rpx 0;

	}

	.tui-time-title {
		height: 60rpx;
		line-height: 60rpx;
		border-bottom: 1rpx solid #F5F5F5;

	}

	.title-time-left {
		margin-left: 20rpx;
		color: #707070;
	}

	.tui-tab-rank-cent {
		display: flex;
		padding: 20rpx;
		align-items: center;
		border-bottom: 1px solid #f5f5f5;
	}
	
	.tui-tab-rank-cent:last-child {
		border-bottom: none;
	}
	
	
	.img-mask {
		position: relative;
		width: 180rpx;
		height: 180rpx;
		margin-right: 20rpx;
	}
	
	.img-mask-item {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(255, 255, 255, .5);
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: center;
	}
	.item-text {
		background: rgba(0, 0, 0, .6);
		color: #fff;
		font-size: 24rpx;
		padding: 0rpx 16rpx;
		border-radius: 40rpx;
	}
	
	.img-rink {
		width: 180rpx;
		height: 180rpx;
		display: block;
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

	.tag-tit2 {
		display: flex;
		justify-content: space-between;
	}

	.tag-tit2-price {
		color: #555555;
		font-size: 24rpx;
	}

	.tag-tit2-text {
		color: ##FF5600;
		font-size: 24rpx;
	}

	.tui-shop-car {
		width: 51rpx;
		height: 48rpx;
		display: block;
	}

	.tag-tit-text {
		font-size: 28rpx;
		color: #333;
	}

	/* ==== */
	.order-no {
		width: 400upx;
		height: 400upx;
		margin: 90upx auto 0 auto;
		text-align: center;
		font-size: 28upx;
	}

	.order-no image {
		display: block;
		width: 250upx;
		height: 250upx;
		margin: 0 auto;
		padding-bottom: 30upx;
	}


	.container-img {
		margin-top: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.no-likes {
		margin-top: 0;
	}
	.img-quanguo {
		height: 600rpx;
		width: 300rpx;

	}

	.color-text {
		color: rgba(112, 112, 112, 1);
	}

	.btnbox {
		position: relative;
		top: 100rpx;
		width: 100%;
	}

	button::after {

		/* border: 2rpx solid #00AC3F; */

	}

	button {
		background-color: #fff !important;
		/* background-color: transparent; */

		padding-left: 0;


		padding-right: 0;

		line-height: inherit;

	}

	button {

		border-radius: 0;

	}

	.btn {
		border-radius: 100rpx;
		height: 60rpx;
		width: 30%;
		background-color: #FFFFFF;
		border: 1rpx solid rgba(0, 197, 42, 1);
		color: rgba(0, 197, 42, 1) !important;
		padding: 10rpx 0;
		font-size: 30rpx;
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
		bottom: 20%;
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
	
	.warp-flex view {
		border: none;
		font-size: 30upx;
	}
	
	.warp-flex view:nth-child(2) {
		color: rgba(0, 197, 42, 1);
	}
</style>
