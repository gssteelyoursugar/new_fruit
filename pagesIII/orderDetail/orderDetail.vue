<template>
	<view class="order-detail-container">
		<view class="address-wrap">
			<view class="user-phone-name">
				<view class="user-name">{{goodsData.userName}}</view>
				<view class="user-phone">{{goodsData.phone}}</view>
			</view>
			<view class="user-address">
				<view class="address-icon">
					<image src="../../static/images/location.png" mode=""></image>
				</view>
				<view class="address-info">
					<text>{{goodsData.address}}</text>
					<text class="info-detail">{{goodsData.addressDetails}}</text> 
				</view>
			</view>
		</view>
		<view class="order-info">
			<view class="order-info-wrap" >
				<view class="info-item" v-if="orderObj.order_number">
					<view class="info-item-left">订单编号：</view>
					<view class="info-item-right">
						<view>{{orderObj.order_number}}</view>
						<view class="clip" @click="clipNumber(orderObj.order_number)">复制</view>
					</view>
				</view>
				<view class="info-item" v-if="orderObj.logisticsNumber">
					<view class="info-item-left">物流单号：</view>
					<view class="info-item-right">
						<view>{{orderObj.logisticsNumber}}</view>
						<view class="clip" @click="clipNumber(orderObj.logisticsNumber)">复制</view>
					</view>
				</view>
			</view>
			<view class="order-info-wrap">
				<view class="info-item">
					<view class="info-item-left">支付方式：</view>
					<view class="info-item-right">
						<view>微信支付</view>
					</view>
				</view>
				<view class="info-item" v-if="orderObj.pay_time">
					<view class="info-item-left">支付时间：</view>
					<view class="info-item-right">
						<view>{{orderObj.pay_time | getTime}}</view>
					</view>
				</view>
			</view>
			<view class="order-info-wrap">
				<view class="info-item" v-if="orderObj.create_date">
					<view class="info-item-left">下单时间：</view>
					<view class="info-item-right">
						<view>{{orderObj.create_date | getTime}}</view>
					</view>
				</view>
				<view class="info-item"  v-if="orderObj.shipments_time">
					<view class="info-item-left">预计送达：</view>
					<view class="info-item-right">
						<view>{{orderObj.shipments_time }}</view>
					</view>
				</view>
				<view class="info-item" v-if="orderObj.printTime">
					<view class="info-item-left">发货时间：</view>
					<view class="info-item-right">
						<view>{{orderObj.printTime }}</view>
					</view>
				</view>
				<view class="info-item"  v-if="orderObj.delivery_time">
					<view class="info-item-left">收货时间：</view>
					<view class="info-item-right">
						<view>{{orderObj.delivery_time }}</view>
					</view>
				</view>
				
			</view>
		</view>
		<view class="order-snapshoot">
			<view class="snap-title">
				<view>商品快照</view>
				<view> <text>*</text> 核对交易细节时，可作为判断依据</view>
			</view>
			<view class="snap-goods">
				<view class="goods-item">
					<!-- v-for="item of 2" :key="item" -->
					<view class="item-img">
						<image :src="goodsData.url" mode=""></image>
					</view>
					<view class="item-info">
						<view class="info-title">
							<text v-for="(item,index) of goodsData.labelList" :key="index">{{item.name}}</text>
							<text>{{goodsData.name}}</text>
						</view>
						<view class="info-desc">
							<!-- <view>5斤装</view> -->
							<view></view>
							<view><text>X</text>{{goodsData.goodsNumber}}</view>
						</view>
						<view class="info-price">
							<view class="left-price">
								<text>￥</text>
								<text>{{goodsData.goodsPrice}}</text>
								<text>元</text>
							</view>
							<view class="right-price">
								<text>实付:</text>
								<text>{{goodsData.orderTotalPrice}}</text>
								<text>(免运费)</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="fruit-info-title">
				<view>水果身份</view>
			</view>

			<view class="frui-info-wrap">
				<view class="fruit-info-item">
					<view class="left-item">种类:</view>
					<view class="right-item">{{goodsData.classify}}</view>
				</view>
				<view class="fruit-info-item">
					<view class="left-item">品种:</view>
					<view class="right-item">{{goodsData.variety}}</view>
				</view>
				<view class="fruit-info-item">
					<view class="left-item">产地:</view>
					<view class="right-item">{{goodsData.originAddress}}</view>
				</view>
				<view class="fruit-info-item">
					<view class="left-item">储存条件:</view>
					<view class="right-item">{{goodsData.storageMode}}℃</view>
				</view>
				<view class="fruit-info-item">
					<view class="left-item">包装:</view>
					<view class="right-item">{{goodsData.packaging}}</view>
				</view>
				<view class="fruit-info-item">
					<view class="left-item">售后时效:</view>
					<view class="right-item">{{goodsData.afterSalesTime}}</view>
				</view>
			</view>
			<!-- 水果标准 -->
			<view class="tui-height-full">
				<view class="tui-title-line">
					<text>抽样标准</text>
				</view>
				<view class="tui-height-flex-two tui-magin-left-on tui-border-1px">
					<view class="tui-left-one">
						<text class="tui-text-left tui-title-class self-left">果品星级</text>
						<tui-rate :current="goodsData.fruitStar" active="#ff7900" :hollow="true" :disabled="true" :size="16"></tui-rate>
					</view>
					<view class="tui-left-one">
						<text class=" tui-text-left tui-title-class self-left">口感星级</text>
						<tui-rate :current="goodsData.tasteLevel" active="#ff7900" :hollow="true" :disabled="true" :size="16"></tui-rate>
					</view>
				</view>
				<view class="tui-height-flex-two tui-magin-left-on tui-border-1px">
					<view class="tui-left-one">
						<text class="tui-text-left tui-title-class self-left">果色星级</text>
						<tui-rate :current="goodsData.colorLevel" active="#ff7900" :hollow="true" :disabled="true" :size="16"></tui-rate>
					</view>
					<view class="tui-left-one">
						<text class="tui-text-left tui-title-class">外观星级</text>
						<tui-rate :current="goodsData.facadeLevel" active="#ff7900" :hollow="true" :disabled="true" :size="16"></tui-rate>
					</view>
				</view>
				<view class="tui-height-flex-two tui-magin-left-on tui-border-1px">
					<view class="tui-left-one2">
						<text class="tui-text-left tui-title-class self-left">果径大小</text>
						<text class=" tui-text-left tui-title-class self-right" v-if="goodsData.size && goodsData.size!=='' ">{{goodsData.size}}mm</text>
						<text class=" tui-text-left tui-title-class self-right" v-else>暂无</text>
					</view>
					<view class="tui-right-one" style="flex: 4;">
						<text class=" tui-text-left tui-title-class self-left">不良率</text>
						<text class=" tui-text-left tui-title-class self-right"  v-if="goodsData.rejectRatio && goodsData.rejectRatio!=='' ">{{goodsData.rejectRatio|| 0}}%</text>
						<text class=" tui-text-left tui-title-class self-right" v-else>暂无</text>
					</view>
				</view>
				<view class="tui-height-flex-two tui-magin-left-on tui-border-1px">
					<view class="tui-left-one2">
						<text class="tui-text-left tui-title-class self-left">糖分</text>
						<text class="tui-text-left tui-title-class self-right"  v-if="goodsData.sugar && goodsData.sugar!=='' ">{{goodsData.sugar || 0}}%</text>
						<text class=" tui-text-left tui-title-class self-right" v-else>暂无</text>
					</view>
					<view class="tui-right-one" style="flex: 4;">
						<text class="tui-text-left tui-title-class self-left">酸度</text>
						<text class="tui-text-left tui-title-class self-right"   v-if="goodsData.acidity && goodsData.acidity!=='' ">{{goodsData.acidity || 0}}%</text>
						<text class=" tui-text-left tui-title-class self-right" v-else>暂无</text>
					</view>

				</view>
				<view class="tui-height-flex-two tui-magin-left-on tui-border-1px">
					<view class="tui-left-one2">
						<text class="tui-text-left tui-title-class self-left">水分</text>
						<text class="tui-text-left tui-title-class self-right"  v-if="goodsData.moisture && goodsData.moisture!=='' ">{{goodsData.moisture || 0}}%</text>
						<text class=" tui-text-left tui-title-class self-right" v-else>暂无</text>
					</view>
					<view class="tui-right-one" style="flex: 4;">
						<text class="tui-text-left tui-title-class self-left">硬度</text>
						<text class="tui-text-left tui-title-class self-right"  v-if="goodsData.hardness && goodsData.hardness!==''">{{goodsData.hardness || 0}}kg/.co</text>
						<text class=" tui-text-left tui-title-class self-right" v-else>暂无</text>
					</view>
				</view>
				<!-- 	<view class="tui-height-flex-two tui-magin-left-on tui-border-1px">
					<view class="tui-left-one">
						<text class="tui-text-left tui-title-class">外观等级</text>
					</view>
					<view class="tui-right-one">
						<text class="tui-title-class">{{shopListdata.data.facadeLevel}}</text>
					</view>
				</view>
				<view class="tui-height-flex-two tui-magin-left-on tui-border-1px">
					<view class="tui-left-one">
						<text class="tui-text-left tui-title-class">果形等级</text>
					</view>
					<view class="tui-right-one">
						<text class="tui-title-class">{{shopListdata.data.shapeLevel}}</text>
					</view>
				</view>
				<view class="tui-height-flex-two tui-magin-left-on tui-border-1px">
					<view class="tui-left-one">
						<text class="tui-text-left tui-title-class">不良率</text>
					</view>
					<view class="tui-right-one">
						<text class="tui-title-class">{{shopListdata.data.rejectRatio}}</text>
					</view>
				</view>
				<view class="tui-height-flex-two tui-magin-left-on tui-border-1px">
					<view class="tui-left-one">
						<text class="tui-text-left tui-title-class">售后时效	</text>
					</view>
					<view class="tui-right-one">
						<text class=" tui-title-class">{{shopListdata.data.afterSalesTime}}</text>
					</view>
				</view> -->
			</view>
			<!-- 免赔情况 -->
			<view class="tui-height-full">
				<view class="tui-title-line">
					<text>免赔情况</text>
				</view>
				<view>
					<jyf-parser selectable @linkpress="clickLink" :html="goodsData.deductible"></jyf-parser>
				</view>
				<!-- <view class="tui-height-flex tui-height-flex-top">
					<view class="tui-left-one1">
						<text class="iconfont icon-quan"></text><text class="tui-name-class">果子颜色不一</text>
					</view>
					<view class="tui-right-one">
						<text class="iconfont icon-quan"></text><text class="tui-name-class">轻微风花</text>
					</view>
				</view>
				<view class="tui-height-flex tui-height-flex-top">
					<view class="tui-left-one1">
						<text class="iconfont icon-quan"></text><text class="tui-name-class">果形大小不一</text>
					</view>
					<view class="tui-right-one">
						<text class="iconfont icon-quan"></text><text class="tui-name-class">轻微流浆</text>
					</view>
				</view> -->
			</view>
			<!-- 可售后情况 -->
			<view class="tui-height-full ">
				<view class="tui-title-line">
					<text>可售后情况</text>
				</view>
				<view>
					<jyf-parser selectable @linkpress="clickLink" :html="goodsData.afterSale"></jyf-parser>
				</view>
				<!-- <view class="tui-height-flex tui-height-flex-top">
					<view class="tui-left-one1">
						<text class="iconfont icon-quan"></text><text class="tui-name-class">摔坏</text>
					</view>
					<view class="tui-right-one">
						<text class="iconfont icon-quan"></text><text class="tui-name-class">压伤</text>
					</view>
				</view>
				<view class="tui-height-flex tui-height-flex-top">
					<view class="tui-left-one1">
						<text class="iconfont icon-quan"></text><text class="tui-name-class">腐烂</text>
					</view>
					<view class="tui-right-one">
						<text class="iconfont icon-quan"></text><text class="tui-name-class">单果重量不达标</text>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
		listing,
		publicing
	} from '../../api/api.js';
	//请求地址
	import {
		postdelist,
		getDetails,
		orderHistory
	} from '../../api/request.js';
	export default {
		name: "orderDetail",
		data() {
			return {
				order_id: '',
				orderObj: {},
				goodsData: {}
			};
		},
		filters: {
			getTime(val) {
				let time = new Date(val);
				let y = time.getFullYear();
				let m = time.getMonth() + 1 >= 10 ? time.getMonth() + 1 : "0"+(time.getMonth() + 1);
				let d = time.getDate() >= 10 ? time.getDate() : "0"+time.getDate();
				let h = time.getHours()>= 10 ? time.getHours() : "0"+time.getHours();
				let mm = time.getMinutes()>= 10 ? time.getMinutes() : "0"+time.getMinutes();
				let s = time.getSeconds()>= 10 ? time.getSeconds() : "0"+time.getSeconds();
				return y + '-' + m+ '-' + d + ' ' + h+ ':' + mm + ':' + s
			},
		},
		
		methods: {
			getOrderDetail() {
				let setdata = uni.getStorageSync('usermen')
				let data = {
					token: setdata,
					id: this.order_id
				};
				listing(getDetails, data).then(res => {
					this.orderObj = res.data.data[0]
					if (this.orderObj.goods_id) {
						let data = {
							id: this.orderObj.goods_id,
							token: setdata
						}
						publicing(orderHistory, data).then(res => {
							this.goodsData = res.data.data
						})
					}
				})
			},
			clipNumber(val) {
				uni.setClipboardData({
					data: val,
					// success: function() {
					// 	uni.hideToast()
					// }
				})
			}
		},
		onLoad(opt) {
			this.order_id = opt.id
			this.getOrderDetail()
		},
		onShow() {
			this.getOrderDetail()
		},
		
	}
</script>

<style lang="less">
	page {
		background-color: #F7F7F7;
	}

	.order-detail-container {
		overflow: hidden;

		.address-wrap {
			background: #fff;
			border-radius: 30rpx;
			padding: 40rpx 48rpx;
			margin: 20rpx 0;

			.user-phone-name {
				display: flex;
				align-items: center;
				font-size: 32rpx;
				color: #000;
				font-weight: 500;
				margin-bottom: 30rpx;

				.user-name {
					margin-right: 16rpx;
				}
			}

			.user-address {
				display: flex;

				.address-icon {
					width: 6%;

					image {
						width: 24rpx;
						height: 28rpx;
					}

				}

				.address-info {
					width: 94%;
					font-size: 28rpx;
					color: #555;

				}
			}
		}

		.order-info {
			margin: 20rpx 0;
			background: #fff;
			padding: 10rpx 40rpx;
			border-radius: 30rpx;

			.order-info-wrap {
				position: relative;

				&::after {
					content: "";
					width: 100%;
					position: absolute;
					left: 30%;
					bottom: 0;
					height: 2rpx;
					background: #F2F2F2;
				}

				&:last-child {

					&::after {
						content: "";
						width: 100%;
						position: absolute;
						left: 30%;
						bottom: 0;
						height: 2rpx;
						background: #fff;
					}
				}

				padding: 30rpx 0;

				.info-item {
					display: flex;
					margin-bottom: 40rpx;

					&:last-child {
						margin-bottom: 0;
					}

					.info-item-left {
						color: #8C8C8C;
						font-size: 28rpx;
						font-weight: 400;
						width: 30%;
					}

					.info-item-right {
						display: flex;
						align-items: center;
						font-size: 28rpx;
						color: #000;
						font-weight: 500;
						width: 70%;

						.clip {
							margin-left: 20rpx;
							font-size: 24rpx;
							width: 72rpx;
							height: 36rpx;
							background: #f2f2f2;
							color: #000;
							text-align: center;
							border-radius: 40rpx;

						}
					}
				}

			}
		}

		.order-snapshoot {
			background: #fff;
			border-radius: 30rpx;
			padding: 40rpx 40rpx;
			margin: 20rpx 0 80rpx;

			.snap-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 28rpx;
				border-bottom: 1px solid #F2F2F2;
				padding: 12rpx 0;

				view {
					&:first-child {
						color: #000;
						font-size: 32rpx;
						font-weight: 500;
					}

					&:last-child {
						color: #8C8C8C;

						text {
							color: #F20000;
						}
					}
				}
			}

			.snap-goods {
				.goods-item {
					display: flex;
					padding: 20rpx 0;
					border-bottom: 1px solid #e5e5e5;
					margin: 20rpx 0;

					&:last-child {
						border-bottom: none;
					}

					.item-img {
						margin-right: 20rpx;
						width: 160rpx;

						image {
							width: 160rpx;
							height: 160rpx;
							background: #eee;
							border-radius: 6rpx;
						}
					}

					.item-info {
						flex: 1;

						.info-title {
							text {
								&:first-child {
									background: #00C52A;
									font-size: 24rpx;
									border-radius: 14rpx 2rpx 14rpx 2rpx;
									color: #fff;
									margin-right: 4rpx;
									padding: 2rpx 4rpx;
									display: inline-block;
									width: 100rpx;
									text-align: center;

								}

								&:last-child {
									color: #333333;
									font-size: 28rpx;
									fong-weight: 400;
								}
							}
						}

						.info-desc {
							display: flex;
							justify-content: space-between;
							align-items: center;
							color: #555555;
							font-size: 28rpx;
							margin: 12rpx 0;

							view {
								&:last-child {
									fonts-size: 32rpx;
									color: #333333;

									text {
										font-size: 24rpx;
										margin-right: 6rpx;

									}
								}
							}
						}

						.info-price {
							display: flex;
							justify-content: space-between;

							.left-price {
								text {
									color: #FF5600;

									&:first-child {
										font-size: 16rpx;
										margin-right: 4rpx;
									}

									&:nth-child(2) {
										font-size: 32rpx;
										font-weight: bold;
									}

									&:last-child {
										font-size: 24rpx;
									}
								}
							}

							.right-price {
								font-weight: 500;
								text {
									color: #666666;

									&:first-child {
										font-size: 24rpx;
									}

									&:nth-child(2) {
										font-size: 28rpx;
										color: #333333;
									}

									&:last-child {
										font-size: 24rpx;
									}
								}
							}
						}
					}
				}
			}

			.fruit-info-title {
				font-size: 32rpx;
				border-bottom: 1px solid #F2F2F2;
				padding: 12rpx 0;
			}

			.frui-info-wrap {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				padding: 36rpx 0;

				.fruit-info-item {
					display: flex;
					align-items: center;
					font-size: 28rpx;
					padding: 14rpx 0;
					&:nth-child(odd) {
						width: 58%;
					}
					&:nth-child(even) {
						width: 42%;
					}

					.left-item {
						color: #939297;
						font-weight: 400;
					}

					.right-item {
						color: #333;
						margin-left: 16rpx;
						font-weight: 400;
					}
				}
			}

		}
	}

	.tui-height-full {
		background-color: #fff;
		margin: 40rpx 0;
		color: #929397;
		font-size: 28rpx;

	}

	.shuoming {
		line-height: 60rpx;
		font-size: 28rpx;
		padding: 20rpx 10rpx;
	}

	.shuoming text {
		color: #00BC45;
		font-weight: bold;
	}

	.tui-title-line {
		color: #000;
		font-weight: 400;
		font-size: 32rpx;
		padding-bottom: 14rpx;
		border-bottom: 1px solid #f5f5f5;
		margin-bottom: 30rpx;
	}

	.tui-height-flex {
		display: flex;

	}

	.tui-height-flex-top {
		margin: 28rpx 0;
		display: flex;
		justify-content: space-between;

	}

	.tui-bottom-border {
		border-bottom: 1rpx solid rgba(245, 245, 245, 1);
		padding-bottom: 10rpx;
		color: rgba(51, 51, 51, 1);


	}

	.tui-pay-color {
		color: rgba(146, 147, 151, 1);
		font-size: 27rpx;
	}

	.tui-height-flex-two {
		display: flex;
		height: 80rpx;
		line-height: 80rpx;


	}

	.tui-border-1px {
		border-top: 1px solid rgba(244, 245, 247, 1);
		border-left: 1px solid rgba(244, 245, 247, 1);
		border-right: 1px solid rgba(244, 245, 247, 1);
	}

	.heigth-tui {
		background-color: #fff;
		border-radius: 50rpx;
		height: 518rpx;

	}

	.text-indent {
		text-indent: 2em;
		letter-spacing: 4rpx;
	}

	.line-higth-cent {
		color: rgba(112, 112, 112, 1);
		font-size: 24rpx;
		line-height: 50rpx;
		padding: 53rpx;
		font-weight: 500;
	}

	.tui-border-1px:last-child {
		border-bottom: 1px solid rgba(244, 245, 247, 1);

	}

	.tui-magin-cente {
		text-align: center;
		font-size: 40rpx;
		font-weight: 800;
		color: #fff;
		margin-bottom: 20rpx;
	}

	.tui-left-one {
		display: flex;
		justify-content: space-between;
		padding-right: 10rpx;
		flex: 4;
		border-right: 1px solid rgba(244, 245, 247, 1);

	}

	.tui-height-flex-two {
		.tui-left-one {
			&:last-child {
				border-right: none
			}
		}
	}

	.tui-left-one1 {
		flex: 4;
		display: flex;
		align-items: center;

	}

	.tui-left-one2 {
		flex: 4;
		border-right: 1px solid rgba(244, 245, 247, 1);

	}

	.tui-title-class {
		font-size: 28rpx;
		color: rgba(146, 147, 151, 1);
	}

	.tui-name-class {
		font-size: 32rpx;
		color: rgba(51, 51, 51, 1);
	}

	.icon-quan {
		margin-right: 10rpx;
		color: rgba(0, 197, 42, 1);
		font-size: 20rpx;
	}

	.tui-text-left {
		margin-left: 20rpx;
	}

	.tui-right-one {
		flex: 3;
		display: flex;
		align-items: center;
	}
	.self-left {
		min-width: 120rpx;
		width: 120rpx;
		display: inline-block;

	}
	.self-right {
		color: #333;
	}
</style>
