<template>

	<view class="">
		<!--header-->
		<view class="tui-header-box" :style="{paddingTop: statusHeight+ 'px',height: boxHeight+ 'px'}">
			<view class="tui-icon-box" @tap="back">
				<tui-icon name="arrowleft" :size="30" color="#333"></tui-icon>
			</view>
			<view class="tui-header">商务合作</view>
		</view>
		<!--header-->
		<view class="content">
			<image class="logo" src="../../static/images/selection2.png"></image>
			<view class="text-area">
				<text class="title">开放</text>
				<text class="title">融合</text>
				<text class="title">发展</text>
				<text class="title">共享</text>
				<text class="title">共赢</text>
			</view>

		</view>
		<view class="text-area-box">
			<view class="text-area2">
				<image src="../../static/images/email.png" mode="" class="email"></image>

				<text class="title-em">圈果邮箱</text>
				<text class="title">zgqgpt@163.com</text>
			</view>
			<view class="text-area2">
				<image src="../../static/images/phone.png" mode="" class="phone"></image>

				<text class="title-em">果叔电话</text>
				<text class="title">13978860880</text>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				statusHeight: 20,
				boxHeight: 44
			}
		},
		onLoad() {
			const res = uni.getSystemInfoSync();
			let {
				statusBarHeight
			} = res
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			let info = uni.getMenuButtonBoundingClientRect()
			let {
				top,
				bottom
			} = info
			this.statusHeight = statusBarHeight
			let buttonHeight = (bottom - statusBarHeight) + (top - statusBarHeight)
			let navHeight = statusBarHeight + buttonHeight + top - statusBarHeight
			this.boxHeight = navHeight - statusBarHeight
			
			console.log(statusBarHeight,navHeight, buttonHeight)
			// #endif
			
		},
		methods: {
			back: function() {
				uni.navigateBack();
			},
		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}

	.tui-header-box {
		display: flex;
		align-items: center;
		background: #fff;
		font-size: 32rpx;
		color: #393939;
		padding: 0 30rpx;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.email {
		height: 48rpx;
		width: 48rpx;

	}

	.phone {
		height: 48rpx;
		width: 34rpx;
		margin: 0 7rpx;


	}

	.logo {
		height: 340rpx;
		width: 340rpx;
		margin-top: 100rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 12rpx;
	}

	.text-area-box {
		margin-left: 110rpx;
		margin-top: 128rpx;

	}

	.text-area {
		display: flex;
		justify-content: start;
	}

	.text-area2 {
		display: flex;
		justify-content: start;
		margin-top: 50rpx;
	}

	.title-em {
		font-size: 32rpx;
		font-weight: bold;
		color: #393939;
		margin: 0 36rpx;
	}

	.title {
		margin-right: 10rpx;
		font-size: 32rpx;
		color: #393939;
		font-weight: 400;
	}
</style>
