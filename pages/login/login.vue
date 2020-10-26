<template>
	<view class="container">
		<view class="intro">
			<image src="../../static/images/B@3x.png" mode="aspectFill" class="logo-img"></image>
			<view class="tips">

				<br>

			</view>
		</view>
		<view class="bottom">
			<!-- #ifdef H5 -->
			<button type="primary" size="default" class="login-btn" @tap="login">
				登录
			</button>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<button type="primary" size="default" class="login-btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">


				微信一键登录
			</button>
			<!-- #endif -->
			<view class="d-flex flex-column justify-content-evenly align-items-center text-center" style="height: 30vh;">
				<view class="w-100 font-size-base text-color-assist" style="text-align: center;margin-top: 50rpx;">请先登录使用本程序</view>



			</view>
		</view>
	</view>
</template>

<script>
	let {
		log
	} = console
	import {
		publicing
	} from '../../api/api.js'
	import {
		loginis
	} from '../../api/request.js'

	export default {
		data() {
			return {

			}
		},
		methods: {
			gotoindex() {},
			//获取头像昵称
			getUserInfo(event) {

				// log(event)
				this.userInfo = event.detail.userInfo
				log(this.userInfo)
				if (event.detail.userInfo) {
					let wxing = event.detail.userInfo
					this.wxCode(wxing.avatarUrl, wxing.nickName)
				}
			},
			//获取微信code
			wxCode(avatarUrl, nickName) {
				wx.login({
					success: (res) => {
						// log(res)
						let code = res.code
						this.wxLogin(avatarUrl, nickName, code)

					},
					fail: (err) => {
						log(err)

					}
				})

			},
			//发送给后台
			wxLogin(avatarUrl, nickName, code) {
				// let appid = wx.getAccountInfoSync().miniProgram.appId
				// let secret = "956f8c9345cbe06a42c6494f7bb53f7f"
				let data = {
					code,
				}

				publicing(loginis, data) //发送请求携带参数
					.then((res) => {
						// log(res.data.token) //获得token
						uni.setStorageSync('usermen', res.data.token) //把token存在本地，小程序提供如同浏览器cookie
						this.ifUser()

						// if(res.data.msg == 'success'){
						// 	//存入本地
						// 	uni.setStorageSync('usermen',res.data.datas)
						// 	this.ifUser()
						// }
					})
					.catch((err) => {
						log(err)
					})
			},
			ifUser() {
				let setdata = uni.getStorageSync('usermen')
				// log(setdata)
				if (!setdata) {

					uni.showToast({
						title: '请登录',
						duration: 2000
					});

					log('用户没有登录')
					this.wxlogin = false
				} else {

					uni.showToast({
						title: '已登录',
						duration: 2000
					});
					uni.switchTab({
						url: '../index/index'
					})
					this.gotoindex()

					log('用户已经登录')
					this.wxlogin = true
					this.usering = setdata
				}
			},
			// login() {
			// 	this.SET_MEMBER(Member)
			// 	uni.navigateBack()
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.intro {
		width: 100%;
		height: 60vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		font-size: 30rpx;
		color: #ccc;

		image {
			width: 250rpx;
			height: 200rpx;
		}

		.tips {
			line-height: 72rpx;
			text-align: center;
		}
	}

	.bottom {
		height: 40vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0 40rpx;

		.login-btn {
			width: 100%;
			border-radius: 50rem !important;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 10rpx 0;

			image {
				width: 36rpx;
				height: 30rpx;
				margin-right: 10rpx;
			}
		}

		.row {
			.grid {
				width: 20%;

				image {
					width: 60rpx;
					height: 60rpx;
					margin-bottom: 10rpx;
				}
			}
		}
	}
</style>
