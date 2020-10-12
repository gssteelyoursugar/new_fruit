<template>
	<view>
		<view class="box-title">
			<view class="title-time" @click="toggleShow" style="color: #333;font-size: 32rpx;">
				<text>{{ orderTime || '请选择时间' }}</text>
				<tui-icon :name="isShow ? 'turningup' : 'turningdown'" :fontSize="iconSize" :unit="iconUnit" color="#696969"></tui-icon>
			</view>
			<tui-datetime ref="dateTime" :type="3" :startYear="startYear" :endYear="endYear" :setDateTime="dateTime" @confirm="bindChange" @cancel="bindCancel"></tui-datetime>
			<view class="title-price">
				<view class="title-price1">
					<text>订单金额￥</text>
					<text style="font-weight: 500;">140,000.00</text>
				</view>
				<view class="title-price1">
					<text>订单数量</text>
					<text style="font-weight: 500;margin-left: 10rpx;">5000件</text>
				</view>
			</view>
		</view>
		<view class="tui-tab-rank" v-for="(item, index) in 10" :key="index">
			<view class="tui-time-title"><text class="title-time-left">2020-09-02 15:06:00</text></view>
			<view class="tui-tab-rank-cent">
				<!--  -->
				<image src="../../static/images/baixiangguo1.png" mode="aspectFill" class="img-rink"></image>
				<view class="tui-pro-tit">
					<text class="tag-tit">采手精选</text>
					<text class="tag-tit-text">葡萄回复的伤口缝合公司的讲课风格</text>
					<view class="tag-tit2">
						<view class="">
							<view class="tag-tit2-price"></view>
							<view class="tag-tit2-text">
								<text style="font-size: 20rpx;margin-right:4rpx;">¥</text>
								108
								<text style="font-size: 20rpx;margin-left:4rpx;">元</text>
								<text class="price2">/件</text>
							</view>
							<view style="font-size: 24rpx;color: #666;">
								实付:
								<text style="font-size: 28rpx;color: #333;">108</text>
								（含运费）
							</view>
						</view>
						<view style="color: #333333;font-size: 24rpx;">X 2</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
	data() {
		return {
			isShow: false,
			type: 3,
			unitTop: true,
			radius: true,
			startYear: 2000,
			endYear: 2020,
			dateTime: '2020-10-02 12:00',
			result: '',
			iconSize: '28',
			iconUnit: 'rpx'
		};
	},
	computed: {
		...mapState(['orderTime'])
	},
	methods: {
		...mapMutations(['setOrderTime']),
		toggleShow() {
			this.isShow = !this.isShow;
			setTimeout(() => {
				this.$refs.dateTime.show();
			}, 10);
		},
		bindChange(e) {
			console.log(e);
			this.setOrderTime({ data: e.result });
		},
		bindCancel(e) {
			console.log(e);
			this.isShow = !this.isShow;
		}
	}
};
</script>

<style>
.box-title {
	background-color: #fff;
	margin-top: 20rpx;
	padding: 0 40rpx;
}

.title-time {
	color: #333;
	padding: 30rpx 0 54rpx;
	font-size: 16px;
}

.title-price {
	display: flex;
	justify-content: space-between;
	padding-bottom: 44rpx;
}

.title-price1 {
	font-size: 36rpx;
	color: #333;
}

.title-price1 text:first-child {
	font-size: 28rpx;
}

/* start */
.price1 {
	color: #ff5600;
	font-size: 24rpx;
	font-weight: 600;
}

.price2 {
	color: #b6b6b6;
	font-size: 24rpx;
}

.tui-tab-rank {
	background-color: #fff;
	margin: 20rpx 0;
}

.tui-time-title {
	height: 60rpx;
	line-height: 60rpx;
	border-bottom: 1rpx solid #f5f5f5;
}

.title-time-left {
	margin-left: 40rpx;
	color: #555;
	font-size: 28rpx;
	padding: 14rpx 0;
}

.tui-tab-rank-cent {
	display: flex;
	padding: 20rpx;
}

.img-rink {
	width: 180rpx;
	height: 180rpx;
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
	background-image: linear-gradient(to right, #00c94a, #00ac3f);
	margin-right: 10rpx;
	padding: 0 10rpx;
	border-radius: 15rpx 0 15rpx 0;
	color: #fff;
	font-size: 24rpx;
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
	color: #ff5600;
	font-size: 36rpx;
	margin: 8rpx 0;
}

.tui-shop-car {
	width: 45rpx;
	height: 48rpx;
	display: block;
}

.tag-tit-text {
	font-size: 28rpx;
	color: #333;
}

/* end */
</style>
