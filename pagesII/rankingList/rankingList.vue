<template>
	<!-- 排行榜 -->
	<view class="container">
		<!--header-->
		<view class="tui-header-box" :style="{ height: height + 'px', background: 'rgba(255,255,255,' + opcity + ')' }">
			<view class="tui-header" :style="{ paddingTop: top + 'px', opacity: opcity }">排行榜</view>
			<view class="tui-header-icon" :style="{ marginTop: top + 'px' }">
				<view class="tui-icon-box" @tap="back">
					<tui-icon name="arrowleft" :size="30" :color="opcity >= 1 ? '#000' : '#fff'"></tui-icon>
				</view>
			</view>
		</view>
		<!--header-->
		<!--banner-->

		<view class="tui-banner-swiper">
			<image :src="imageUrl" class="tui-my-bg" mode="aspectFill"></image>
			<image :src="rankBgUrl" class="tui-rank-bg" mode="aspectFill"></image>
			<view class="tui-info-center">
				<view class="tui-info-quanguo">
					圈果&nbsp;·&nbsp;南宁
				</view>
				<view class="tui-info-day">
					按截至前一天的累计评价数量排序 {{currMonth}}月{{currDay}}日更新
				</view>
			</view>
		</view>
		<view class="tui-cent-box">
			<!-- 切换 -->
			<view class="tui-cent-tab">
				<block v-for="(item,index) in ranking" :key="index">
					<view class="tui-tab-btn" :class="{activetext:index == num}" @click="menubtn(index,item.value)">
						{{item.name}}
					</view>
				</block>
			</view>
			<view class="tui-rink-sceate">
				<!-- 销量 -->
				<view class="tui-tab-rank" :class="[num === 0 ? 'actineclass' : 'errorclass']">
					<block v-for="(item,index) in goodList" :key="index">
						<view class="tui-tab-rank-cent" @tap="gotoList(item.id)">
							<view class="rank-box" :style="{borderColor: rankColor[index]}">
								<text v-if="index<9" :style="{backgroundColor: rankColor[index]}">{{"0"+(index+1)}}</text>
								<text v-if="index===9" :style="{backgroundColor: rankColor[9]}">{{(index+1)}}</text>
								<image :src="item.url" mode="aspectFill" class="img-rink"></image>
							</view>
							<view class="tui-pro-tit">
								<text class="tag-tit">{{item.lableName}}</text> <text class="tag-tit-text">{{item.name}}</text>
								<view class="tag-tit2">
									<view class="">
										<view class="tag-tit2-price">
											<!-- <text style="font-size: 24rpx;color: #555;margin-right: 12rpx;">限量价</text> -->
											<text style="font-size: 16rpx;">¥</text>
											<text style="font-size: 40rpx;font-weight: bold;margin: 0 4rpx;">{{ApproveStatus===1?item.platformClientPrice:'***'}}</text>
											<text style="font-size: 24rpx;font-weight: 400;">元</text>
											<text style="font-size: 20rpx;color: #b6b6b6;">/件</text>
										</view>
										<view class="tag-tit2-text">
											累计成交
											<text class="tag-tit3-text">
												<!-- {{item.totalPrice |filterNum}} -->
												{{item.totalPrice||0 | filterNum }}
											</text> 元
										</view>
									</view>
									<image src="../../static/images/shopcar@2x.png" mode="aspectFill" class="tui-shop-car"></image>
									<!-- <view>购物车</view> -->
								</view>

							</view>
						</view>
					</block>
				</view>
				<!-- 评价 -->
				<view class="tui-tab-rank" :class="[num === 1 ? 'actineclass' : 'errorclass']">
					<block v-for="(item,index) in goodList" :key="index">
						<view class="tui-tab-rank-cent" @tap="gotoList(item.id)">
							<view class="rank-box" :style="{borderColor: rankColor[index]}">
								<text v-if="index<9" :style="{backgroundColor: rankColor[index]}">{{"0"+(index+1)}}</text>
								<text v-if="index===9" :style="{backgroundColor: rankColor[9]}">{{(index+1)}}</text>
								<image :src="item.url" mode="aspectFill" class="img-rink"></image>
							</view>
							<view class="tui-pro-tit">
								<text class="tag-tit">{{item.lableName}}</text> <text class="tag-tit-text">{{item.name}}</text>
								<view class="tag-tit2">
									<view class="">
										<view class="tag-tit2-price">
											<!-- <text style="font-size: 24rpx;color: #555;margin-right: 12rpx;">限量价</text> -->
											<text style="font-size: 16rpx;">¥</text>
											<text style="font-size: 40rpx;font-weight: bold;margin: 0 4rpx;">{{ApproveStatus === 1?item.platformClientPrice:'***'}}</text>
											<text style="font-size: 24rpx;font-weight: 400;">元</text>
											<text style="font-size: 20rpx;color: #b6b6b6;">/件</text>
										</view>
										<view class="tag-tit2-text">
											{{item.praise_number || 0 |filterNum}}人点了赞
										</view>
									</view>
									<image src="../../static/images/shopcar@2x.png" mode="aspectFill" class="tui-shop-car"></image>
									<!-- <view>购物车</view> -->
								</view>

							</view>
						</view>
					</block>
				</view>
				<!-- 关注 -->
				<view class="tui-tab-rank" :class="[num === 2 ? 'actineclass' : 'errorclass']">
					<block v-for="(item,index) in goodList" :key="index">
						<view class="tui-tab-rank-cent" @tap="gotoList(item.id)">
							<view class="rank-box" :style="{borderColor: rankColor[index]}">
								<text v-if="index<9" :style="{backgroundColor: rankColor[index]}">{{"0"+(index+1)}}</text>
								<text v-if="index===9" :style="{backgroundColor: rankColor[9]}">{{(index+1)}}</text>
								<image :src="item.url" mode="aspectFill" class="img-rink"></image>
							</view>
							<view class="tui-pro-tit">
								<text class="tag-tit">{{item.lableName}}</text> <text class="tag-tit-text">{{item.name}}</text>
								<view class="tag-tit2">
									<view class="">
										<view class="tag-tit2-price">
											<!-- <text style="font-size: 24rpx;color: #555;margin-right: 12rpx;">限量价</text> -->
											<text style="font-size: 16rpx;">¥</text>
											<text style="font-size: 40rpx;font-weight: bold;margin: 0 4rpx;">{{ApproveStatus ===1?item.platformClientPrice:'***'}}</text>
											<text style="font-size: 24rpx;font-weight: 400;">元</text>
											<text style="font-size: 20rpx;color: #b6b6b6;">/件</text>
										</view>
										<view class="tag-tit2-text">
											{{item.followNumber ||0}}人关注收藏了
										</view>
									</view>
									<image src="../../static/images/shopcar@2x.png" mode="aspectFill" class="tui-shop-car"></image>
									<!-- <view>购物车</view> -->
								</view>

							</view>
						</view>
					</block>

				</view>
				<!-- 复购 -->
				<view class="tui-tab-rank" :class="[num === 3 ? 'actineclass' : 'errorclass']">
					<block v-for="(item,index) in goodList" :key="index">
						<view class="tui-tab-rank-cent" @tap="gotoList(item.id)">
							<view class="rank-box" :style="{borderColor: rankColor[index]}">
								<text v-if="index<9" :style="{backgroundColor: rankColor[index]}">{{"0"+(index+1)}}</text>
								<text v-if="index===9" :style="{backgroundColor: rankColor[9]}">{{(index+1)}}</text>
								<image :src="item.url" mode="aspectFill" class="img-rink"></image>
							</view>
							<view class="tui-pro-tit">
								<text class="tag-tit">{{item.lableName}}</text> <text class="tag-tit-text">{{item.name}}</text>
								<view class="tag-tit2">
									<view class="">
										<view class="tag-tit2-price">
											<!-- <text style="font-size: 24rpx;color: #555;margin-right: 12rpx;">限量价</text> -->
											<text style="font-size: 16rpx;">¥</text>
											<text style="font-size: 40rpx;font-weight: bold;margin: 0 4rpx;">{{ApproveStatus===1?item.platformClientPrice:'***'}}</text>
											<text style="font-size: 24rpx;font-weight: 400;">元</text>
											<text style="font-size: 20rpx;color: #b6b6b6;">/件</text>
										</view>
										<view class="tag-tit2-text">
											{{item.backNumber || 0}}人买了之后又买
										</view>
									</view>
									<image src="../../static/images/shopcar@2x.png" mode="aspectFill" class="tui-shop-car"></image>
									<!-- <view>购物车</view> -->
								</view>

							</view>
						</view>
					</block>
				</view>
			</view>


		</view>

		<!--底部选择层-->
	</view>
</template>

<script>
	import {
		listing,
		publicing
	} from '../../api/api.js'
	//请求地址
	let setdata = uni.getStorageSync('usermen')//Token
	import {
		postOrder,
		imgurl,
		getClient,
	} from '../../api/request.js'
	const {
		log
	} = console
	export default {
		data() {
			return {
				rankColor: ['#FF5C00', '#9AA8BB', '#C8AA8D', '#E3E3E3', '#E3E3E3', '#E3E3E3', '#E3E3E3', '#E3E3E3', '#E3E3E3',
					'#E3E3E3'
				],
				url: '',
				goodList: [],
				hideing: 0,
				num: 0,
				ranking: [{
						value: 'shop',
						name: '销量榜'
					},
					{
						value: 'praise',
						name: '评价榜'
					},
					{
						value: 'follow',
						name: '关注榜'
					},
					{
						value: 'back',
						name: '复购榜'
					}

				],
				imageUrl: "/static/images/paihang@2x.png",
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
				valueText: '',
				ApproveStatus: 0,
			};
		},
		onLoad: function(options) {
			this.getMerchants()
			this.url = imgurl


			let obj = {
				options
			};

			//指定跳转
			this.menubtn(parseInt(options.index), options.value)
			//this.postRanking()

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
		computed: {
			currMonth() {
				return new Date().getMonth() + 1
			},
			currDay() {
				return new Date().getDate()
			},

		},

		filters: {
			filterNum(val) {
				if (val < 1) {
					return val
				}
				let data = Math.floor(val) + ''
				let res = data.split("")
				const unit = ['','个', '十', '百', '千', '万', '万', '万', '万', '亿']
				if (res.length <= 4) {
					return data
				} else if (res.length === 5) { // 1w √
					if (res[1] !== '0') {
						return res[0] + "." + res[1] + unit[res.length]
					} else {
						return res[0] + "" + unit[res.length]
					}
				} else if (res.length === 6) {  // 10w √
					if (res[2] !== '0') {
						return res[0] + res[1]+ "." + res[2]+ unit[res.length]
					} else {
						return res[0] + res[1]+ "" + unit[res.length]
					}
				} else if (res.length === 7) { // 100w √
					if (res[3] !== '0') {
						return res[0] + res[1] + res[2]+ "." +res[3]+ unit[res.length]
					} else {
						return res[0] + res[1] + res[2]+ "" + unit[res.length]
					}
				} else if (res.length === 8) { // 1000w√
					if (res[4] !== '0') {
						return res[0] + res[1] + res[2]+ res[3]+ "." +res[4]+ unit[res.length]
					} else {
						return res[0] + res[1] + res[2]+ res[3] + "" + unit[res.length]
					}
				}  else if (res.length === 9) { // 1e
					if (res[1] !== '0') {
						return res[0] + "." + res[1] + unit[res.length]
					} else {
						return res[0] + "" + unit[res.length]
					}
				}
			}
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
						///登录成功后显示去认证店铺，如果已认证，显示已认证店铺
						this.ApproveStatus = res.data.data.approveStatus; //获取状态码，0未认证，1已认证，2拒绝
					})
					.catch(err => {
						log(err);
					});
			},
			onPullDownRefresh() {
				this.postRanking()
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000);
			},
			//商品详情页
			gotoList(id) {
				uni.navigateTo({
					url: '../../pagesIII/productDetail/productDetail?id=' + id
				})
			},
			//请求数据
			postRanking() {
				uni.showLoading({
				})
				let val = this.valueText
				let data = {
					value: val,
					pageNo: 1,
					pageSize: 10000
				}
				publicing(postOrder, data)
					.then((res) => {
						this.goodList = res.data.data
					})
					.catch((err) => {})
				uni.hideLoading()
			},
			menubtn(index, value) {


				this.valueText = value //这个地方你都注释掉了，没有赋值，
				this.num = index

				this.postRanking() //那这个方法里面的this.valueText怎么会能拿到嘛
				// 子组件调试父组件方法 ：parent
				// this.$parent.fatherMethod(index)
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

			coupon() {

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
	page {
		background-color: #f7f7f7;
	}

	.container {
		/* padding-bottom: 110rpx; */
	}

	.tui-my-bg {
		width: 100%;
		height: 464rpx;
		display: block;
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

	/* 排行榜 */
	.tui-cent-box {
		border-radius: 60rpx 60rpx 0 0;
		/* height: 2000px; */
		background-color: #fff;
		position: relative;
		top: -42rpx;
		padding: 0 30rpx;
		margin-bottom: 50rpx;


	}

	.tui-tab-rank-cent {
		display: flex;
		padding: 20rpx 0;
		border-bottom: 1rpx solid rgba(238, 238, 238, 1);

	}
	.tui-tab-rank-cent:last-child {
		border-bottom:none
	}

	.rank-box {
		margin-right: 10rpx;
		border: 1px solid transparent;
		border-radius: 6rpx;
		overflow: hidden;
	}

	.rank-box text {
		position: absolute;
		font-size: 20rpx;
		display: inline-block;
		width: 44rpx;
		background: #fff;
		color: #fff;
		text-align: center;
		height: 20rpx;
		line-height: 20rpx;
		border-radius: 4rpx 0 16rpx 0;
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
	}

	.tag-tit2-text {
		color: #555;
		font-size: 20rpx;
	}

	.tag-tit3-text {
		font-size: 24rpx;
		font-weight: 500;
		color: #FF5600;
	}

	.tui-shop-car {
		width: 52rpx;
		height: 52rpx;
		display: block;
	}

	.tag-tit-text {
		font-size: 28rpx;
		color: #333;
	}

	.tui-tab-rank {
		margin: 10rpx 0;


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
		font-size: 32rpx !important;
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
		font-size: 28rpx;
		color: #555;
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
		font-size: 28rpx;
	}

	.tui-info-quanguo {
		font-size: 32rpx;
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
