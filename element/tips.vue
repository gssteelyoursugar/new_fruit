<template>
	<view class="container-img" v-if="modaishow">
		<image src="../static/images/orderBMG.png" mode="widthFix"></image>
		<text class="color-text">{{tips}}</text>
		<view class="btnbox">
			<button class="btn" type="default" open-type="getUserInfo" @getuserinfo="getUserInfo">去登录</button>
		</view>

	</view>
</template>

<script>
	//请求
	import {
		publicing2
	} from '../api/api.js'
	//请求地址
	import {
		loginis
	} from '../api/request.js'
	var {
		log
	} = console
	export default {
		data() {
			return {
				tips: '',
				modaishow: false
			}
		},
		methods: {
			init(bull, tips) {
				this.modaishow = bull
				this.tips = tips
			},

			//获取头像昵称
			getUserInfo(event) {
				// log(event)
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
						// log(res)
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
				// log(code)

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
										// console.log('用户点击确定');
										uni.hideLoading();
									} else if (res.cancel) {
										// console.log('用户点击取消');
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




					})
					.catch((err) => {
						uni.showToast({
							title: `${err}`
						})

						log(err)
					})

			},
		}
	}
</script>

<style scoped>
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
		height: 50rpx;
		width: 30%;
		background-color: #FFFFFF;
		border: 1rpx solid rgba(0, 197, 42, 1);
		color: rgba(0, 197, 42, 1) !important;
		padding: 3rpx 0;
		font-size: 30rpx;
	}
</style>
