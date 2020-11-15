<template>
	<view>
		<view class="container-img " v-if="evaList.length === 0" :class="{ active: isActive, 'text-danger': hasError }">
			<image src="../../static/images/no_like.png" mode="widthFix"></image>
			<text class="color-text">最近没有点赞过商品~</text>
		</view>
		<view class="tui-tab-rank" v-for="(item,index) of evaList" :key="index" v-if="evaList.length !== 0">
			<view class="tui-time-title"><text class="title-time-left">{{item.time}}</text> </view>
			<view class="tui-tab-rank-cent" @click="clickToDetail(itm.id)" v-for="(itm,idx) of item.list" :key="idx">
				<image :src="itm.url" mode="aspectFill" class="img-rink"></image>
				<view class="tui-pro-tit">
					<text class="tag-tit">{{itm.labelName}}</text> <text class="tag-tit-text">{{itm.name}}</text>
					<view class="tag-tit2">
						<view class="">
							<view class="tag-tit2-price">
								{{itm.specification}}
							</view>
							<view class="tag-tit2-text">
								<text class="price1">
									<text style="font-size: 20rpx;margin-right:4rpx;">¥</text>{{ApproveStatus === 1 ?itm.platformClientPrice : '***'}}<text
									 style="font-size: 20rpx;margin-left:4rpx;">元</text>
									<text class="price2">/件</text>
								</text>
							</view>
						</view>
						<image src="../../static/images/zan.png" mode="aspectFill" class="tui-shop-car" @click.stop="toggleTips(itm.id)"></image>
						<!-- <view>购物车</view> -->
					</view>
				</view>
			</view>
		</view>

		<view class="warp" v-if="showTips">
			<view class="warp-view">
				<view class="warp-text1">温馨提示</view>
				<view class="warp-text">取消点赞？</view>
				<view class="warp-flex">
					<view @click="unShowTips" plain="true">取消</view>
					<view @click="cancelPraise" :data-id="11" class="color-green">确认</view>
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
		getClient,
		getEvaluateList,
		postCancelPraise
	} from '../../api/request.js'
	let setdata = uni.getStorageSync('usermen')

	export default {
		data() {
			return {
				showTips: false,
				curIds: undefined,
				evaList: [],
				ApproveStatus: 0
			}
		},
		onLoad() {
			this.getMerchants()
			this.getList()
		},
		onShow() {
			this.getMerchants()
			this.getList()
		},
		methods: {
			getMerchants() {
				let setdata = uni.getStorageSync("usermen")
				if (!setdata) {
					this.ApproveStatus = 0
					return
				}
				let data = {
					token: setdata
				};
				// log(data)
				listing(getClient, data)
					.then(res => {
						///登录成功后显示去认证店铺，如果已认证，显示已认证店铺
						this.ApproveStatus = res.data.data.approveStatus; //获取状态码，0未认证，1已认证，2拒绝
					})
					.catch(err => {
						log(err);
					});
			},
			getList() {
				let data = {
					token: setdata,
					pageNo: 1,
					pageSize: 10000
				}
				publicing(getEvaluateList, data).then(res => {
					this.evaList = res.data.data

				})
			},
			clickToDetail(id) {
				uni.navigateTo({
					url: '../../pagesIII/productDetail/productDetail?id=' + id
				})
			},
			toggleTips(id) {
				this.curIds = id
				this.showTips = !this.showTips
			},

			unShowTips() {
				this.showTips = false
			},

			cancelPraise(e) {
				let data = {
					goodsId: this.curIds,
					token: setdata
				}
				// return
				publicing(postCancelPraise, data).then(res => {
					uni.showToast({
						title: '已取消点赞',

					})
					this.unShowTips()
					this.getList()
				})
			}
		},
		onPullDownRefresh() {

		},
	}
</script>

<style>
	.container-img {
		/* margin-top: 150rpx; */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.color-text {
		color: rgba(112, 112, 112, 1);
	}

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
		border-bottom: 1px solid #f5f5f5;
	}

	.tui-tab-rank-cent:last-child {
		border-bottom: none;
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

	/* 模态弹窗布局 */
	.warp {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 9999;
	}

	.warp-view {
		width: 500upx;
		height: 260upx;
		background: #ffffff;
		margin: auto;
		position: absolute;
		-webkit-position: absolute;
		top: 0;
		left: 0;
		bottom: 20%;
		right: 0;
		border-radius: 8upx;
		overflow: hidden;
	}

	.warp-text {
		text-align: center;
		margin-top: 34upx;
		font-size: 34upx;
		color: #666666;
	}

	.warp-text1 {
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 34upx;
		color: #fff;
		background-color: rgba(0, 197, 42, 1);
	}

	.warp-flex {
		display: flex;
		justify-content: space-around;
		border-top: 1upx solid #eeeeee;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80upx;
		line-height: 80upx;
	}

	.color-green {
		color: rgba(0, 197, 42, 1);
	}

	.warp-flex view {
		border: none;
		font-size: 30upx;
	}

	.warp-flex view:nth-child(2) {
		color: rgba(0, 197, 42, 1);
	}

	/*end  */
</style>
