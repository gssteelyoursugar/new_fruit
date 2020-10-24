<template>
	<view class="content">
		<image class="logo" src="../../static/images/paysu.png" mode="widthFix"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view class="btnbox">
			<button class="btn" type="default" @tap="back">完成</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '支付成功'
			}
		},
		onLoad() {

		},
		methods: {
			back(){
				uni.reLaunch({
					url:'../../pagesII/myOrder/myOrder?index=0'
				})
			}

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 184rpx !important;
		width: 160rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 56rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
		position: relative;
		left: 10rpx;
	}

	.title {
		position: relative;
		right: 10rpx;
		font-size: 36rpx;
		font-weight: 600;
		color: rgba(51, 51, 51, 1);
	}
	.btnbox{
		position: relative;
		top: 116rpx;
		width: 100%;
	}
	button::after {
	
	border: none;
	
	}
	
	button {
	background-color: rgba(0, 197, 42, 1)!important;
	/* background-color: transparent; */
	
	padding-left: 0;
	
	padding-right: 0;
	
	line-height:inherit;
	
	}
	
	button {
	
	border-radius:0;
	
	}
	.btn{
		border-radius: 100rpx;
		height: 100rpx;
		width: 80%;
		background-color: rgba(0, 197, 42, 1);
		border: none;
		color: #fff!important;
		padding: 25rpx 0;
	}
</style>
