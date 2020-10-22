<template>
	<!-- 限量批 -->
	<view class="container">
		<!--header-->
		<!-- <view class="tui-header-box" :style="{paddingTop: statusHeight+ 'px',height: boxHeight+ 'px'}">
			<view class="tui-icon-box" @tap="back">
				<tui-icon name="arrowleft" :size="30" color="#333"></tui-icon>
			</view>
			<view class="tui-header">限量批</view>
		</view> -->
		<!--header-->
		<!--banner-->
		<view class="tui-banner-swiper" > <!-- :style="{top: navHeight + 'px'}" -->
			<image :src="imageUrl" class="tui-my-bg" mode="aspectFill"></image>
		</view>

		<view class="scroll-goods" :style="{top: statusHeight<=20 ? '430rpx': (430+statusHeight) + 'rpx'}">
			<view class="tui-cent-box">
				<view class="tui-cent-box-felx1">
					<view class="class-name-left">
						<image src="../../static/images/time1.png" mode="aspectFit" class="imgtime"></image>
					</view>

					<view class="class-name-left">
						<text class="tite-color-time">距离结束时间</text>
					</view>
					<view class="class-name-left tui-line-hight">
						<tui-countdown :time="ts" width="26" height="30" color="#fff" borderColor="#000" backgroundColor="#000"
						 colonColor="#000" @end="endOfTime"></tui-countdown>
					</view>
				</view>
				<!-- <view class="tui-cent-box-felx1">
						<view class="class-name-left">
							<image src="../../static/images/gengduo@3x.png" mode="aspectFit" class="imgtime2"></image>
						</view>

						<view class="class-name-left">
							<text class="tite-color-time">宁*果巨峰葡萄A级33斤果径20-35 鲜度5星</text>
						</view>
					</view>
				-->
			</view>
			<view class="flex-column-box">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll">
					<view class="tui-rink-sceate" >
						<view class="tui-rank-list"><!-- v-for="ll of 20" :key="ll" -->
							<view class="tui-tab-rank" v-for="(item,index) in LimitDataList" :key="index">
								<view class="tui-tab-rank-cent" @tap="gotoList(item.id)">
									<image :src="item.url" mode="aspectFill" class="img-rink"></image>
									<view class="tui-pro-tit">
										<text class="tag-tit">{{item.lableName}}</text> <text class="tag-tit-text">{{item.title}}</text>
										<view class="tag-tit2">
											<view class="">
												<view class="tag-tit2-text" >
													<view style="width: 200rpx; position: relative;">
														<view class="cu-progress round sm " :class="active?'active':''" style="position: relative;">
															<view class="fonsize">仅剩{{item.number}}件</view>
															<view class="bg-green round" :style="[{ width:loading? (item.number/item.initNumber)*100 + '%':''}]">
															</view>
														</view>
													</view>
												</view>
												<view class="tag-tit2-price">
													<text style="color:#555;margin-right: 6rpx;font-size: 24rpx;">限量价</text>
													<text style="font-size: 20rpx;">¥</text>
													<text style="font-size: 40rpx;font-weight: bold;margin: 6rpx 0;">{{item.marketPrice}}</text>
													<text style="font-size: 24rpx;font-weight: 400;">元</text>
													<text style="color: #b6b6b6;font-size: 20rpx;">/件</text>
												</view>
												<!-- <view class="tag-tit2-text">
										{{item.platformClinetPrice}}点赞
									</view> -->
											</view>
											<!-- <image src="../../static/images/shopcar@2x.png" mode="aspectFill" class="tui-shop-car"></image> -->
											<view class="robb-item">抢购</view>
											<!-- <view>购物车</view> -->
										</view>

									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- <Progress></Progress> -->
		</view>
		<!--底部选择层-->
	</view>
</template>

<script>
	import {
		listing2
	} from '../../api/api.js'
	//请求地址
	import {
		getActivity,
		imgurl
	} from '../../api/request.js'
	const {
		log
	} = console
	export default {

		data() {
			return {
				loading: false,
				active: true,
				url: '',
				LimitData: {},
				LimitDataList: [],
				hideing: 0,
				num: 0,
				ranking: ['销量榜', '评价榜', '关注榜', '回购榜'],
				imageUrl: "/static/images/limit-1.png",
				rankBgUrl: "/static/images/paihangbang@2x.png",
				height: 64, //header高度
				top: 26, //标题图标距离顶部距离
				scrollH: 0, //滚动总高度
				opcity: 0,
				iconOpcity: 0.5,
				bannerIndex: 0,
				menuShow: false,
				popupShow: false,
				value: 1,
				collected: false,
				WxActivityID: '', //首页传的id
				startTime: 0,
				endTime: 0,
				createTime: 0,
				ts: 0,
				te: 3,
				boxHeight: 44,
				statusHeight: 20,
				navHeight: 64,
				scrollTop: 0
			};
		},
		onLoad: function(options) {
			this.WxActivityID = options.id
			this.getLimit()
			this.url = imgurl
			this.getLimit()
			let obj = {};
			let that = this;
			setTimeout(function() {
				that.loading = true
			}, 500)
			let res = uni.getSystemInfoSync()
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
			this.navHeight = navHeight

			console.log(statusBarHeight, navHeight, buttonHeight)
			// #endif

		},
		computed:{
			
		},
		methods: {

			scroll(e) {
				console.log(e)
			},
			//商品详情页
			gotoList(id) {
				log(id)
				uni.navigateTo({
					url: '../../pagesIII/productDetail/productDetail?id=' + id
				})
			},

			//倒计时
			endOfTime: function() {
				console.log('倒计时结束')
			},
			//下拉刷新
			onPullDownRefresh() {
				this.getLimit()

				console.log('refresh');
				setTimeout(function() {
					uni.stopPullDownRefresh();



				}, 1000);
			},
			//请求限量区列表
			getLimit() {
				let data = {
					pageNo: 1,
					pageSize: 10,
					id: this.WxActivityID
				}
				listing2(getActivity, data)
					.then((res) => {
						log(res)
						this.LimitData = res.data.data
						this.LimitDataList = res.data.data.list
						this.startTime = res.data.data.startTime
						this.endTime = res.data.data.endTime
						this.createTime = res.data.data.createTime
						this.ts = (this.endTime - this.createTime) / 1000
						this.dd = parseInt(this.ts / 60 / 60 / 24, 10); //计算剩余的天数
						this.hh = parseInt(this.ts / 60 / 60 % 24, 10); //计算剩余的小时数
						this.mm = parseInt(this.ts / 60 % 60); //计算剩余的分钟数
						this.ss = parseInt(this.ts % 60, 10); //计算剩余的秒数
						log(this.dd + "天" + this.hh + "时" + this.mm + "分" + this.ss + "秒")
					})
					.catch((err) => {
						log(err)
					})
			},
			gotoGun() {
				uni.navigateTo({
					url: '../../pagesIII/demo/demo'
				})
			},
			menubtn(index) {
				this.num = index
				console.log(this.num)
				// 子组件调试父组件方法 ：parent
				// this.$parent.fatherMethod(index)
			},
			bannerChange: function(e) {
				this.bannerIndex = e.detail.current;
			},
			previewImage: function(e) {
				let index = e.currentTarget.dataset.index;
				uni.previewImage({
					current: this.banner[index],
					urls: this.banner
				});
			},
			back: function() {
				uni.navigateBack();
			},
			openMenu: function() {
				this.menuShow = true;
			},
			closeMenu: function() {
				this.menuShow = false;
			},
			showPopup: function() {
				this.popupShow = true;
			},
			hidePopup: function() {
				this.popupShow = false;
			},
			change: function(e) {
				this.value = e.value;
			},
			collecting: function() {
				this.collected = !this.collected;
			},
			common: function() {
				this.tui.toast('功能开发中~');
			},
			btnTopMenu(index) {
				this.closeMenu()
				if (index == 4) {
					uni.makePhoneCall({
						phoneNumber: "10086"
					})
				} else if (index == 6) {
					// #ifdef MP
					this.common()
					// #endif

					// #ifndef MP
					this.onShare()
					// #endif
				} else {
					let url = {
						0: '../message/message',
						1: "../mall/mall",
						2: '../my/my',
						3: '../shopcart/shopcart',
						5: '/pages/my/feedback/feedback?page=mall'
					} [index];
					url && this.tui.href(url)
				}
			},
			submit() {
				this.popupShow = false;
				uni.navigateTo({
					url: '../submitOrder/submitOrder'
				});
			},
			coupon() {
				uni.navigateTo({
					url: '../coupon/coupon'
				});
			},
			onShare() {
				//#ifdef APP-PLUS
				plus.share.sendWithSystem({
						content: '分享',
						href: ''
					},
					function() {
						console.log('分享成功');
					},
					function(e) {
						console.log('分享失败：' + JSON.stringify(e));
					}
				);
				//#endif
				// #ifdef H5
				location.href = ""
				// #endif
			}
		},
		onPageScroll(e) {
			let scroll = e.scrollTop <= 0 ? 0 : e.scrollTop;
			let opcity = scroll / this.scrollH;
			if (this.opcity >= 1 && opcity >= 1) {
				return;
			}
			this.opcity = opcity;
			this.iconOpcity = 0.5 * (1 - opcity < 0 ? 0 : 1 - opcity);
		}
	};
</script>

<style>
	@import '/common/css/main.css';

	page {
		background-color: #1dc236;
	}

	.tui-cent-box-felx1 {
		display: flex;
		justify-content: start;
		padding-left: 50rpx;
		padding-top: 20rpx;
		align-items: center;
	}

	.class-name-left {
		margin-right: 20rpx;
	}

	.imgtime {
		height: 34rpx;
		width: 34rpx;
		display: block;
	}

	.tui-line-hight {
		position: relative;
		top: 5rpx;
	}

	.tite-color-time {
		color: rgba(51, 51, 51, 1);
		font-size: 24rpx;
	}

	.imgtime2 {
		height: 40rpx;
		width: 40rpx;
		display: block;
	}

	.container {
		/* padding-bottom: 110rpx; */
	}

	.tui-rank-list {
		padding: 0 30rpx;
	}

	.tui-my-bg {
		width: 100%;
		height: 1334rpx;
		display: block;
	}

	.tui-rink-sceate {
		z-index: 99999;
		background: #fff;
		/* top: 390rpx; */
	}

	.tui-rank-bg {
		position: absolute;
		width: 381rpx;
		height: 112rpx;
		left: 0;
		top: 170rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.scroll-goods {
		border-radius: 60rpx 60rpx 0 0;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #fff;
		right: 0;
		display: flex;
		flex-direction: column;
		overflow: hidden;

	}

	/* 排行榜 */
	.tui-cent-box {
		height: 90rpx;
		background-color: #fff;
		position: relative;
		/* top: 400rpx; */
		z-index: 99999;
		border-bottom: 1px solid #f5f5f5;
	}
	
	.flex-column-box {
		position: relative;
		flex: 1;
	}
	
	.scroll-Y{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;

	}


	.tui-tab-rank-cent {
		display: flex;
		padding: 20rpx 0;
		padding-bottom: 1rpx solid rgba(245, 245, 245, 1);

	}

	.img-rink {
		width: 150rpx;
		height: 150rpx;
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
		align-items: center;

	}

	.fonsize {
		position: absolute;
		top: 0;
		left: 0;
		font-size: 16rpx !important;
		width: 50% !important;
	}

	.tag-tit2-price {
		color: #FF5600;
		font-size: 24rpx;
	}

	.tag-tit2-text {
		color: #555;
		font-size: 24rpx;
		margin: 4rpx 0 2rpx;

	}

	.robb-item {
		background: #00C52A;
		font-size: 24rpx;
		color: #fff;
		width: 160rpx;
		text-align: center;
		padding: 16rpx 0;
		border-radius: 50rpx;
		font-weight: 500;
		box-shadow: 0 0rpx 4rpx 0 rgba(0, 197, 42, 1);

	}

	.tui-shop-car {
		width: 80rpx;
		height: 80rpx;
		display: block;
	}

	.tag-tit-text {
		font-size: 28rpx;
		color: #333;
	}

	.tui-tab-rank {
		/* margin: 10rpx 0; */
		border-bottom: 1rpx solid rgba(245, 245, 245, 1);
	}

	.actineclass {
		display: block;
	}

	.errorclass {
		display: none;
	}

	.activetext {
		color: #fff !important;
		background-image: linear-gradient(to right, #FF943D, #FF5600);
		border-radius: 60rpx;
	}

	.tui-cent-tab {
		position: relative;
		top: 50rpx;
		height: 60rpx;
		display: flex;
		justify-content: space-between;
		border-radius: 60rpx;
		background-color: #f7f7f7;
		margin-bottom: 80rpx;

	}

	.tui-tab-btn {
		flex: 1;
		width: 25%;
		text-align: center;
		font-size: 20rpx;
		color: #333333;
		line-height: 60rpx;

	}

	.tui-header-box {
		display: flex;
		align-items: center;
		background: #fff;
		font-size: 32rpx;
		color: #393939;
		padding: 0 30rpx;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		width: 100%;
	}

	/* 
	.tui-header {
		width: 100%;
		font-size: 18px;
		line-height: 18px;
		font-weight: 500;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	} */

	/* .tui-header-icon {
		position: fixed;
		top: 0;
		left: 10px;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		height: 32px;
		transform: translateZ(0);
		z-index: 9999;
	}
 */
	.tui-header-icon .tui-badge {
		background: #e41f19 !important;
		position: absolute;
		right: -4px;
	}

	.tui-icon-ml {
		margin-left: 20rpx;
	}

	.tui-icon-box {
		position: relative;
		height: 20px !important;
		width: 20px !important;
		padding: 6px !important;

		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-banner-swiper {
		position: fixed;
		width: 100%;
		z-index: -1;
		/* height: 1334rpx; */
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
	}

	/* 地区 */
	.tui-info-center {
		position: absolute;
		width: 100%;
		height: 128rpx;
		line-height: 50rpx;
		left: 0;
		top: 300rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		/* display: flex; */
		align-items: center;
		color: #fff;
	}

	.tui-info-day {
		font-size: 20rpx;
	}

	.tui-info-quanguo {
		font-size: 28rpx;
	}

	.tui-banner-tag {
		position: absolute;
		color: #fff;
		bottom: 30rpx;
		right: 0;
	}

	.tui-slide-image {
		width: 100%;
		display: block;
	}

	/*顶部菜单*/


	/* 进度条样式 */


	/* end */
</style>
