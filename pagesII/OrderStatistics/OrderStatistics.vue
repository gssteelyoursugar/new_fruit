<template>
	<view style="padding-top: 224rpx;padding-bottom: 50rpx;">
		<view class="box-title">
			<view class="title-time" @click="toggleShow" style="color: #333;font-size: 32rpx;">
				<text>{{ orderTime || '请选择时间' }}</text>
				<tui-icon :name="isShow ? 'turningup' : 'turningdown'" :fontSize="iconSize" :unit="iconUnit" color="#696969"></tui-icon>
			</view>
			<tui-datetime ref="dateTime" :type="3" :startYear="startYear" :endYear="endYear" :setDateTime="dateTime" @confirm="bindChange"
			 @cancel="bindCancel"></tui-datetime>
			<view class="title-price">
				<view class="title-price1">
					<text>订单金额￥</text>
					<text style="font-weight: 500;">{{totalGoodsPirce||0}}</text>
				</view>
				<view class="title-price1">
					<text>订单数量</text>
					<text style="font-weight: 500;margin: 0 10rpx;">{{totalGoodsNumber||0}}</text><text style="font-weight: 400; font-size: 28rpx;">件</text>
				</view>
			</view>
		</view>
		<view class="empty-img" v-if="orderList.length=== 0">
			<image src="../../static/images/orderBMG.png" mode="widthFix"></image>
			<text class="color-text">{{orderTime ? '本月没有订单哦～': '没有数据哦～' }}</text>
			<!-- <view class="color-border" @tap="goIndex"><text>去逛逛</text></view> -->
		</view>
		<view class="tui-tab-rank" v-for="(item, index) in orderList" :key="index">
			<view class="tui-time-title"><text class="title-time-left">{{item.time}}</text></view>
			<view class="tui-tab-rank-cent">
				<!--  -->
				<image :src="item.url" mode="aspectFill" class="img-rink"></image>
				<view class="tui-pro-tit">
					<text class="tag-tit">{{item.labelName}}</text>
					<text class="tag-tit-text">{{item.name}}</text>
					<view class="tag-tit2">
						<view class="">
							<view class="tag-tit2-price"></view>
							<view class="tag-tit2-text">
								<text style="font-size: 20rpx;margin-right:4rpx;">¥</text>
								{{item.platformClinetPrice}}
								<text style="font-size: 20rpx;margin-left:4rpx;">元</text>
								<text class="price2">/件</text>
							</view>
							<view style="font-size: 24rpx;color: #666;">
								实付:
								<text style="font-size: 28rpx;color: #333;">{{item.platformClinetPrice}}</text>
								（含运费）
							</view>
						</view>
						<view style="color: #333333;font-size: 24rpx;">X {{item.goodsNumber}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex';
	import {
		orderCount
	} from "../../api/request.js"
	import {
		listing
	} from "../../api/api.js"
	export default {
		data() {
			return {
				isShow: false,
				type: 3,
				unitTop: true,
				radius: true,
				startYear: 2000,
				endYear: 2020,
				dateTime: '',
				result: '',
				iconSize: '28',
				iconUnit: 'rpx',
				orderList: [],
				totalGoodsNumber: 0,
				totalGoodsPirce: 0,

			};
		},
		onLoad(options) {
			let userToken = uni.getStorageSync('usermen')
			// 初始化时间选择器默认时间
			if(this.orderTime) {
				console.log('有时间')
				let arr = this.orderTime.split()
				arr.push("01日")
				console.log()
				console.log(this.dataTime,this.orderTime)
				this.dataTime = arr.join('')
			} else {
				console.log('没有时间')
				let curDate = new Date()
				let year = curDate.getFullYear()
				let month = curDate.getMonth() + 1
				let day = curDate.getDay()
				this.dataTime = `${year}年${month}月${day}日`
				console.log(this.dataTime)
			}
			console.log(userToken)
			this.getOrderCount()
		},
		computed: {
			...mapState(['orderTime','paramTime'])
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
				let date = e.year + '-' + e.month
				console.log(date)
				// return
				this.setOrderTime({
					data: e.result, //渲染数据的日期格式
					paramTime: date,//发送请求的日期格式
					
				});
				this.getOrderCount()
				console.log("看看我的订单呗")
			},
			bindCancel() {
				this.isShow = !this.isShow;
			},
			getOrderCount() {
				let userToken = uni.getStorageSync('usermen')
				if (!this.orderTime) {
					let curDate = new Date()
					let year = curDate.getFullYear()
					let month = curDate.getMonth() + 1
					let day = curDate.getDay()
					let date = year+ '-'+ month
					this.setOrderTime({
						data: year+ '年'+ month+'月', //渲染数据的日期格式
						paramTime: date,//发送请求的日期格式
						
					});
					this.dataTime = `${year}年${month}月${day}日`
					let data = {
						time: this.paramTime,
						token: userToken,
						pageNo: 1,
						pageSize: 10
					}
					listing(orderCount, data).then(res => {
						console.log(res)
						this.orderList = res.data.data.list
						this.totalGoodsNumber = res.data.data.totalGoodsNumber
						this.totalGoodsPirce = res.data.data.totalGoodsPirce
					
					})
				} else {
					let data = {
						time: this.paramTime,
						token: userToken,
						pageNo: 1,
						pageSize: 10
					}
					listing(orderCount, data).then(res => {
						console.log(res)
						this.orderList = res.data.data.list
						this.totalGoodsNumber = res.data.data.totalGoodsNumber
						this.totalGoodsPirce = res.data.data.totalGoodsPirce
					
					})
				}
				
			}

		}
	};
</script>

<style>
	.box-title {
		background-color: #fff;
		padding: 0 40rpx;
		position: fixed;
		left: 0;
		right: 0;
		width: 100%;
		box-sizing: border-box;
		height: 224rpx;
		top: 0;
		border-top: 20rpx solid #f5f5f5;

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
		/* background: #eee; */
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
	
	.empty-img {
		/* margin-top: 150rpx; */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.color-text {
		font-size: 32rpx;
		color: rgba(112, 112, 112, 1);
	}
	
	.color-border {
		width: 300rpx;
		height: 80rpx;
		line-height: 80rpx;
		border: 1rpx solid rgba(0, 197, 42, 1);
		border-radius: 60rpx;
		text-align: center;
		color: rgba(0, 197, 42, 1);
		margin-top: 60rpx;
	}
	/* end */
</style>
