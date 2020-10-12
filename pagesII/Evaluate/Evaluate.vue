<template>
	<view>
		<view class="tui-tab-rank">
			<view class="tui-time-title"><text class="title-time-left">2020年9月6日</text> </view>
			<view class="tui-tab-rank-cent">
				<image src="../../static/images/pingguo1.png" mode="aspectFill" class="img-rink"></image>
				<view class="tui-pro-tit">
					<text class="tag-tit">采手精选</text> <text class="tag-tit-text">葡萄回复的伤口缝合公司的讲课风格</text>
					<view class="tag-tit2">
						<view class="">
							<view class="tag-tit2-price">
								5斤装 × 1
							</view>
							<view class="tag-tit2-text">
								<text class="price1">
									<text style="font-size: 20rpx;margin-right:4rpx;">¥</text>108<text style="font-size: 20rpx;margin-left:4rpx;">元</text>
									<text class="price2">/件</text>
								</text>
							</view>
						</view>
						<image src="../../static/images/zan.png" mode="aspectFill" class="tui-shop-car"></image>
						<!-- <view>购物车</view> -->
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	//请求方式
	import {
		listing,
		publicing
	} from '../../api/api.js'
	//请求地址
	import {
		getLike,
		postCancelPraise
	} from '../../api/request.js'
	var setdata = uni.getStorageSync('usermen')
	var {
		log
	} = console
	export default {
		data() {
			return {

			}
		},
		methods: {
		},
		onPullDownRefresh() {
			this.getImportData()
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
	}
</script>

<style>
	.price1 {
		color: #FF5600;
		font-size: 36rpx;
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
		margin-left: 30rpx;
		color: #707070;
		padding: 14rpx 0;
		font-size: 28rpx;
		font-weight: 500;

	}

	.tui-tab-rank-cent {
		display: flex;
		padding: 20rpx;

	}

	.img-rink {
		width: 140rpx;
		height: 140rpx;
		display: block;
		margin-right: 10rpx;
		background: #eee;
		border-radius: 6rpx;

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
		font-size: 24rpx;
	}

	.tag-tit2 {
		display: flex;
		justify-content: space-between;
		margin: 8rpx 0;
		align-items: center;


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
		width: 44rpx;
		height: 46rpx;
		display: block;
	}

	.tag-tit-text {
		font-size: 28rpx;
		color: #333;
	}
</style>
