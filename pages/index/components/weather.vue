<template>
	<view class="container">
		<view class="tui-flex ">
			<view class="tui-left  ">
				<image src="../../../static/images/dingwei@2x.png" mode="aspectFit" class="dingwei"></image>
				<text class="city" style="font-size: 24rpx;" v-if="address&& ApproveStatus === 1">配送至{{address}}</text>
				<text class="city" v-if="ApproveStatus !== 1">配送至</text>
				<view class="tui-class" v-if="ApproveStatus !== 1" :class="{ active: isActive, 'text-danger': hasError }">
				</view>
				<view class="tui-class2" v-if="ApproveStatus !== 1" :class="{ active: isActive, 'text-danger': hasError }">
					请认证店铺信息
				</view>
			</view>
			<view class="tui-right ">
				<image src="../../../static/images/tianqi@2x.png" mode="aspectFit" class="yun-icon"></image>
				<!-- <text class="iconfont icon-yun city"></text> -->
				<text>30℃</text>
			</view>
		</view>
	</view>
</template>

<script>
	//高德SDKjs

	export default {
		props: ["city", "citys", "weath", "address", "ApproveStatus"],
		data() {
			return {
				isActive: false,
				hasError: true
			};
		},
		methods: {
			Handleclick() {
				this.isActive = true
				this.hasError = false

			}

		},
	}
</script>

<style scoped>
	.tui-class {
		position: absolute;
		width: 20rpx;
		height: 20rpx;
		left: 60rpx;
		top: 36rpx;
		transform: rotate(40deg);
		-o-transform: rotate(40deg);
		-webkit-transform: rotate(40deg);
		-moz-transform: rotate(40deg);
		background-color: rgba(0, 0, 0, 0.9);

	}

	.tui-class2 {
		position: absolute;
		left: 30rpx;
		top: 44rpx;
		background-color: rgba(0, 0, 0, 0.9);
		font-size: 24rpx;
		color: #fff;
		border-radius: 24rpx;
		padding: 10rpx 20rpx;

	}

	.active {
		display: none;
	}

	.text-danger {
		display: block;
	}

	.container {
		margin-top: 50rpx;
	}

	.tui-flex {
		position: relative;
		top: 46px;

		margin: 0 20rpx;
		display: flex;
		font-size: 28rpx;
		color: #fff;
	}

	.tui-left {
		flex: 3;
		display: flex;
		align-items: center;

	}

	.tui-right {
		display: flex;
		position: relative;
		flex: 1;
		text-align: right;
		justify-content: flex-end;
	}

	.city {
		margin-right: 10rpx;
		margin-left: 10rpx;
		font-size: 32rpx;
	}

	.yun-icon {
		position: absolute;
		right: 76rpx;
		top: -2rpx;
		width: 52rpx;
		height: 40rpx;
		display: block;
	}

	.dingwei {
		width: 30rpx;
		height: 40rpx;
		display: block;
		top: -6rpx;
	}

	.tui-right text {
		font-size: 32rpx;
	}
</style>
