<template>
	<view class="weather-container" style="margin: 10rpx 0 20rpx;" :style="{opcity: iconOpcity}">
		<view class="weather-tui-flex ">
			<view class="weather-tui-left ">
				<image src="../../../static/images/dingwei@2x.png" mode="aspectFit" class="weather-dingwei"></image>
				<text class="weather-city" style="font-size: 24rpx;" v-if="address&& ApproveStatus === 1">配送至{{address}}</text>
				<text class="weather-city" v-if="ApproveStatus !== 1">配送至</text>
				<view class="weather-tui-class" v-if="ApproveStatus !== 1" :class="{ 'weather-active': isActive, 'weather-text-danger': hasError }">
				</view>
				<view class="weather-tui-class2" v-if="ApproveStatus !== 1" :class="{ 'weather-active': isActive, 'weather-text-danger': hasError }">
					请认证店铺信息
				</view>
			</view>
			<view class="weather-tui-right ">
				<image src="../../../static/images/tianqi@2x.png" mode="aspectFit" class="weather-yun-icon"></image>
				<!-- <text class="iconfont icon-yun city"></text> -->
				<text>30℃</text>
			</view>
		</view>
	</view>
</template>

<script>
	//高德SDKjs

	export default {
		// props: ["city", "citys", "weath", "address", "ApproveStatus"],
		props: {
			city: {
				type: String
			},
			citys: {
				type: String
			},
			weath: {
				type: String
			},
			address: {
				type: String
			},
			ApproveStatus: {
				type: Number
			},
			canSee: {
				type: Number
			}
		},
		data() {
			return {
				isActive: false,
				hasError: true
			};
		},
		mounted() {
			console.log("进来了",this.canSee)
		},
		methods: {
			Handleclick() {
				this.isActive = true
				this.hasError = false

			}

		},
		watch: {
			canSee (o,n) {
				console.log(o,n)
			}
		}
	}
</script>

<style scoped>
	.weather-tui-class {
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

	.weather-tui-class2 {
		position: absolute;
		left: 30rpx;
		top: 44rpx;
		background-color: rgba(0, 0, 0, 0.9);
		font-size: 24rpx;
		color: #fff;
		border-radius: 24rpx;
		padding: 10rpx 20rpx;

	}

	.weather-active {
		display: none;
	}

	.weather-text-danger {
		display: block;
	}

	.weather-container {
		transition: all .3s;
	}

	.weather-tui-flex {
		position: relative;
		/* top: 46px; */
		margin: 0 20rpx;
		display: flex;
		font-size: 28rpx;
		color: #fff;
	}

	.weather-tui-left {
		flex: 3;
		display: flex;
		align-items: center;

	}

	.weather-tui-right {
		display: flex;
		position: relative;
		flex: 1;
		text-align: right;
		justify-content: flex-end;
	}

	.weather-city {
		margin-right: 10rpx;
		margin-left: 10rpx;
		font-size: 32rpx;
	}

	.weather-yun-icon {
		position: absolute;
		right: 76rpx;
		top: -2rpx;
		width: 52rpx;
		height: 40rpx;
		display: block;
	}

	.weather-dingwei {
		width: 30rpx;
		height: 40rpx;
		display: block;
		top: -6rpx;
	}

	.weather-tui-right text {
		font-size: 32rpx;
	}
</style>
