<template>
	<!-- 新果上市 -->
	<view class="container">
		<!--header-->
		<view class="tui-header-box" :style="{ height: height + 'px', background: 'rgba(255,255,255,' + opcity + ')' }">
			<view class="tui-header" :style="{ paddingTop: top + 'px', opacity: opcity }">新果上市</view>
			<view class="tui-header-icon" :style="{ marginTop: top + 'px' }">
				<view class="tui-icon-box" @tap="back">
					<tui-icon name="arrowleft" :size="30" :color="opcity >= 1 ? '#000' : '#fff'"></tui-icon>
				</view>
			</view>
		</view>
		<!--header-->
		<!--banner-->
		<view class="tui-banner-swiper">
			<image :src="imageUrl" class="tui-my-bg" mode=""></image>
		</view>
		<view class="tui-cent-box">
			<view class="tui-cent--title">
				<text>上市预告</text>
			</view>
			<view class="page-section-spacing">
				<view class=" tui-cell-view">
					<scroll-view scroll-x="true" class="scroll" scroll-with-animation="true">
						<view class="prefer-dis">
							<block v-for="(item, index) in infoList" :key="index">
								<view class="prefer-view" @click="goToInfo(item.id)">
									<view class="tui-img-text">
										<image :src="item.url" mode="aspectFill" class="tui-img"></image>
										<view class="tui-tag-mag">
											<view style="padding-top: 6rpx;"><text class="tui-tag-name">{{item.labelName}}</text></view>
											<view>
												<view class="tui-tag-name2">{{item.title}}</view>
												<view class="tui-tag-time">预计上市时间{{item.time}}</view>
											</view>
										</view>
									</view>
								</view>
							</block>
						</view>
					</scroll-view>
				</view>
			</view>

			<view class="tui-cent--title">
				<text>刚刚上市</text>
			</view>
		</view>
		<view class="tui-rink-sceate">
			<view class="tui-rank-list">
				<view class="tui-tab-rank" v-for="(item,index) in GoodsData" :key="index">
					<view class="tui-tab-rank-cent" @tap="gotoList(item.id)">
						<view class="img-mask">
							<image :src="item.url" mode="aspectFill" class="img-rink"></image>
							<view class="img-mask-item" v-if="item.number === 0">
								<view class="item-text">抢光了</view>
							</view>
						</view>
						<view class="tui-pro-tit">
							<text class="tag-tit">{{item.lableName}}</text> <text class="tag-tit-text">{{item.title}}</text>
							<view class="tag-tit2">
								<view class="">
									<view class="tag-tit2-text">
										刚刚上市{{item.day}}天
									</view>
									<view class="tag-tit2-price">
										<text style="font-size: 24rpx;color: #555;margin-right: 12rpx;">限量价</text>
										<text style="font-size: 16rpx;">¥</text>
										<text style="font-size: 40rpx;font-weight: bold;margin: 0 4rpx;">{{ApproveStatus===1? item.platformClinetPrice:'***'}}</text>
										<text style="font-size: 24rpx;font-weight: 400;">元</text>
										<text style="font-size: 20rpx;color: #b6b6b6;">/件</text>
									</view>

								</view>
								<!-- <image src="../../static/images/shopcar@2x.png" mode="aspectFill" class="tui-shop-car"></image> -->
								<view class="tui-rob">马上抢鲜</view>
							</view>

						</view>
					</view>
				</view>
			</view>



		</view>
		<!-- <Progress></Progress> -->

		<!--底部选择层-->
	</view>
</template>

<script>
	//请求
	import {
		listing,
		listing2
	} from '../../api/api.js'
	//请求地址
	import {
		getClient,
		getNewsAll,
		imgurl
	} from '../../api/request.js'
	let setdata = uni.getStorageSync('usermen')//Token
	var {
		log
	} = console
	
	export default {
		
		data() {
			return {
				infoList: [],
				GoodsData: [],
				url: '',
				ApproveStatus: 0,
				preferdata: [{
						image: '/static/images/youzi@3x.png'
					},
					{
						image: '/static/images/youzi@3x.png'
					},
					{
						image: '/static/images/youzi@3x.png'
					},
					{
						image: '/static/images/youzi@3x.png'
					}
				],
				hideing: 0,
				num: 0,
				ranking: ['销量榜', '评价榜', '关注榜', '回购榜'],
				// imageUrl: "../../static/images/new_fruit.png",
				imageUrl: "/static/images/shangxin@3x.png",
				height: 64, //header高度
				top: 26, //标题图标距离顶部距离
				scrollH: 0, //滚动总高度
				opcity: 0,
				iconOpcity: 0.5,
				bannerIndex: 0,
				menuShow: false,
				popupShow: false,
				value: 1,
				collected: false
			};
		},
		onLoad: function(options) {
			this.getMerchants()
			this.url = imgurl
			this.getGoodsAll()
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			my.hideAddToDesktopMenu();
			// #endif
			setTimeout(() => {
				uni.getSystemInfo({
					success: res => {
						this.width = obj.left || res.windowWidth;
						this.height = obj.top ? obj.top + obj.height + 8 : res.statusBarHeight + 44;
						this.top = obj.top ? obj.top + (obj.height - 32) / 2 : res.statusBarHeight + 6;
						this.scrollH = res.windowWidth;
					}
				});
			}, 0);
		},
		//下拉刷新
		onPullDownRefresh() {
			this.getGoodsAll()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
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
				listing(getClient, data)
					.then(res => {
						if (res.data.code && res.data.code !=200) {
							uni.showToast({
								title: res.data.msg,
								icon:"none"
							})
							uni.switchTab({
								url: "../../pages/my/my"
							})
							return
						}
						///登录成功后显示去认证店铺，如果已认证，显示已认证店铺
						this.ApproveStatus = res.data.data.approveStatus; //获取状态码，0未认证，1已认证，2拒绝
					})
					.catch(err => {
						log(err);
					});
			},
			//请求鲜果上市所有水果
			getGoodsAll() {
				let data = {
					pageNo: 1,
					pageSize: 10000

				}
				listing2(getNewsAll, data)
					.then((res) => {
						this.infoList = res.data.data.imgage
						this.GoodsData = res.data.data.goods
					})
					.catch((err) => {
						log(err)
					})
			},
			//商品详情页
			gotoList(id) {
				uni.navigateTo({
					url: '../../pagesIII/productDetail/productDetail?id=' + id
				})
			},
			
			goToInfo (id) {
				uni.navigateTo({
					url: '../../pagesII/prediction/prediction?id=' + id
				})
			},


			menubtn(index) {
				this.num = index
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
						content: '圈果',
						href: ''
					},
					function() {
					},
					function(e) {
					}
				);
				//#endif
				// #ifdef H5
				location.href = " "
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
	page {
		background-color: #00C42A;
	}

	.container {
		/* padding-bottom: 110rpx; */
		background-color: #00C42A;
	}

	.tui-rank-list {
		padding: 0 30rpx 100rpx;
	}

	/* 滑动广告 */
	.scroll {
		white-space: nowrap;
		width: 100%;
		/* height: 180upx; */
		/* border-bottom: 1px solid #f5f5f5; */
	}

	.tui-cent--title {
		margin-left: 30rpx;
		color: #fff;
		font-weight: 700;
		font-size: 50rpx;
		padding: 0 0 30rpx;

	}

	.tui-cent--title text {
		position: relative;
		z-index: 3;
	}

	.tui-cent--title text::before {
		content: "";
		position: absolute;
		bottom: 10rpx;
		left: 0;
		width: 100%;
		height: 8rpx;
		background: #FF6500;
		z-index: -1;
	}


	.tui-tag-mag {
		margin-left: 20rpx;
		display: flex;
		padding: 10rpx 0;

	}

	.tui-tag-name {
		margin: 0 10rpx;
		background-color: rgba(255, 119, 9, 1);
		color: #fff;
		font-size: 24rpx;
		border-radius: 20rpx;
		padding: 2rpx 16rpx;
		width: 100rpx;
		display: inline-block;
		max-height: 20px;
		text-align: center;
		max-width: 100rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.tui-tag-name2 {
		color: #555555;
		font-size: 32rpx;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 450rpx;
		white-space: nowrap;
	}

	.tui-tag-time {
		font-size: 28rpx;
		color: #707070;
		/* margin-left: 30rpx; */
	}

	.prefer-dis {
		display: flex;
		justify-content: space-between;
	}

	.prefer-view {
		height: 300rpx;
		width: 660rpx;
		padding: 0 20upx;

	}

	.tui-img {
		width: 660rpx;
		height: 173rpx;
		border-radius: 20rpx;
		display: block;
	}

	.tui-img-text {
		width: 660rpx;
		/* height: 312rpx; */
		border-radius: 20rpx;
		display: block;
		background-color: #fff;
	}

	.swipe-img {
		width: 80%;
		height: 100rpx;
		display: block;

	}

	.swiper-box {
		width: 100%;
		height: 150rpx;
	}

	.tui-my-bg {
		width: 750rpx;
		display: block;
		height: 2000rpx;
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

	/* 新果榜 */
	.tui-cent-box {

		position: relative;



	}

	.tui-tab-rank-cent {
		display: flex;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;



	}
	
	.img-mask {
		position: relative;
		margin-right: 10rpx;
	}
	
	.img-mask-item {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(255, 255, 255, .5);
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: center;
	
	}
	
	.item-text {
		background: rgba(0, 0, 0, .6);
		color: #fff;
		font-size: 24rpx;
		padding: 0 16rpx;
		border-radius: 40rpx;
	}

	.img-rink {
		width: 180rpx;
		height: 180rpx;
		display: block;
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

	.tag-tit2-price {
		color: #FF5600;
		font-size: 24rpx;
		margin-top: 28rpx;
	}

	.tag-tit2-text {
		color: #707070;
		font-size: 24rpx;
	}

	.tui-shop-car {
		width: 80rpx;
		height: 80rpx;
		display: block;
	}

	.tui-rob {
		background-image: linear-gradient(to right, rgba(255, 119, 9, 1), rgba(255, 101, 0, 1));
		color: #fff;
		padding: 10rpx 20rpx;
		font-size: 28rpx;
		border-radius: 40rpx;
	}

	.tag-tit-text {
		font-size: 28rpx;
		color: #333;
	}

	.tui-tab-rank {
		margin: 10rpx 0 50rpx;
		/* border-bottom: 1rpx solid #ccc; */
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
		position: absolute;
		top: 50rpx;
		height: 60rpx;
		display: flex;
		justify-content: space-between;
		border-radius: 60rpx;
		background-color: #f7f7f7;
		margin-bottom: 80rpx;

	}

	.tui-rink-sceate {
		position: absolute;
		background-color: #00C42A;
		width: 100%;
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
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 995;
	}

	.tui-header {
		width: 100%;
		font-size: 18px;
		line-height: 18px;
		font-weight: 500;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-header-icon {
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
		position: relative;
		height: 576rpx;
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
</style>
