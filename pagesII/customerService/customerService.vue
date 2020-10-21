<template>
	<view>
		<view class="tui-box tui-order-box">

			<view class="tui-order-list">
				<view class="tui-order-item" @tap="goTell(4)">
					<view class="tui-icon-box">
						<view>客服服务热线</view>
					</view>
					<view class="tui-icon-box">
						<image src="../../static/images/tell.png" mode="" class="icon-img"></image>
					</view>
					<view class="tui-order-text">0771-5633659</view>
				</view>
				<view class="tui-order-item" open-type="contact">

					<view class="tui-icon-box">
						<view>在线客服</view>

					</view>
					<view class="tui-icon-box">
						<button open-type="contact" type="primary" hover-class='none' class="icon-img3">
							<image src="../../static/images/server.png" mode="" class="icon-img2"></image>
						</button>

					</view>
					<view class="tui-order-text text-center"> <text class="text-center">电话无法接通 \n请试试在线客服</text></view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			goTell() {
				uni.makePhoneCall({
					// 手机号
					phoneNumber: '0771-5633659',
					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}

				});
			}
		}
	}
</script>

<style>
	button::after {
		border: none;

	}

	.tui-icon-box {
		color: rgba(51, 51, 51, 1);
		font-size: 28rpx;
		font-weight: 600;
	}

	.icon-img {
		width: 100rpx;
		height: 100rpx;
		display: block;
		margin: 20rpx 0;

	}

	.icon-img2 {
		width: 100rpx;
		height: 100rpx;
		background-color: #fff;
	}

	.icon-img3 {
		background-color: #fff;
		width: 100rpx;
		height: 100rpx;
		padding: 0;
		margin: 20rpx;
	}

	.tui-box {
		width: 100%;
		background: #fff;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-order-box {
		/* height: 208rpx; */
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
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: 600;
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
		height: 400rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;

	}

	.tui-order-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tui-order-text,
	.tui-tool-text {
		font-size: 26rpx;
		font-weight: 400;
		color: rgba(188, 188, 188, 1);
		/* padding-top: 22rpx; */
		height: 100rpx;
	}

	.text-center {
		text-align: center;
		color: rgba(188, 188, 188, 1);
		font-size: 28rpx;
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

		margin-top: 20rpx;
	}

	.tui-assets-list {
		height: 204rpx;
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
		justify-content: center;
		flex-direction: column;
		padding-top: 30rpx;
	}

	.tui-tool-icon {
		width: 64rpx;
		height: 64rpx;
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
</style>
