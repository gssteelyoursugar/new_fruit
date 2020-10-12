<template>
	<view>

		<view class="tui-header">

			<view class="tui-rolling-search" @click="goToSearchGoods">
				<tui-icon name="search-2" :size="36" unit="rpx"></tui-icon>
				<!-- <icon type="search" :size="13" color="#999"></icon> -->
				<view class="tui-hot-item">芒果</view>
			</view>
		</view>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 100upx)">
				<view class="cu-item" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in menuList" :key="index" @tap="TabSelect(item,index)"
				 :data-id="index">
					{{item.title}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 100upx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding-lr" v-for="(item,index) in menuList" :key="index" :id="'main-'+index">

					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<!-- <text class="cuIcon-title text-green">777</text> -->
						</view>
					</view>
					<view class="" style="padding: 20rpx 0;">
						<view class="class-item">
							<view class="class-name">
								<image src="../../static/images/hot3x.png" mode="aspectFit" class="hot-img" v-if="item.id === 0"></image>
								{{item.title}}
								<image src="../../static/images/hot3x.png" mode="aspectFit" class="hot-img" v-if="item.id === 0"></image>
							</view>
							<view class="g-container">
								<view class="g-box" @tap="navBar(itemTwo.title,itemTwo.id)" v-for="(itemTwo,indexs) in item.list" :key="indexs">
									<image :src="itemTwo.url" class="g-image" />
									<view class="g-title">{{itemTwo.title}}</view>
								</view>

							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		listing2
	} from '../../api/api.js'
	import {
		getsearch
	} from '../../api/request.js'
	const {
		log
	} = console
	export default {
		data() {
			return {
				menuList: [],
				list: [],
				url: 'http://192.168.1.10:8980',
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true
			};
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			this.getsearchIng()

		},
		//下拉刷新
		onPullDownRefresh() {
			this.getsearchIng()
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			//搜索页
			goToSearchGoods() {
				uni.navigateTo({
					url: '../../pagesII/searchGoods/searchGoods'
				})
			},

			//请求数据
			getsearchIng() {

				listing2(getsearch)
					.then((res) => {
						log(res)
						this.menuList = res.data.data
						//添加属性
						for (var i = 0; i < this.menuList.length; i++) {
							// this.menuList[i].id = this.menuList[i]
							this.menuList[i].id = i
						}

						log(this.menuList)


						// log(this.menuList)
					})
					.catch((err) => {
						log(err)
					})

			},

			TabSelect(e) {
				this.tabCur = e.id;
				this.mainCur = e.id;
				this.verticalNavTop = (e.id - 1) * 50
			},
			navBar(name, id) {
				uni.navigateTo({
					url: '../../pagesII/productList/productList?name=' + name + '&id=' + id
				})
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				return false //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.menuList.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.menuList[i].id);
						view.fields({
							size: true
						}, data => {
							this.menuList[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.menuList[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.menuList.length; i++) {
					if (scrollTop > this.menuList[i].top && scrollTop < this.menuList[i].bottom) {
						this.verticalNavTop = (this.menuList[i].id - 1) * 50
						this.tabCur = this.menuList[i].id
						// console.log(scrollTop)
						return false
					}
				}
			}
		},
		onPullDownRefresh() {
			this.getsearchIng()
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},

	}
</script>

<style>
	/*tabbar*/

	.tui-header {
		width: 100%;
		height: 100rpx;
		padding: 0 30rpx 0 20rpx;
		box-sizing: border-box;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		left: 0;
		top: 0;
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		z-index: 999;
	}

	.hot-img {
		height: 40rpx;
		width: 40rpx;
		margin: 0 10rpx;
	}

	.tui-category {
		font-size: 24rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin: 0;
		margin-right: 22rpx;
		flex-shrink: 0;
	}

	.tui-category-scale {
		transform: scale(0.7);
		line-height: 24rpx;
	}

	.tui-rolling-search {
		width: 100%;
		height: 80rpx;
		border-radius: 100rpx;
		padding: 0 40rpx 0 30rpx;
		box-sizing: border-box;
		background-color: #fff;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		color: #999;
		box-shadow: 0 4rpx 8rpx 0rpx rgba(0, 0, 0, .1);
		border: 1px solid #F5F5F5;
	}

	.tui-hot-item {
		font-size: 28rpx;
		line-height: 28rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #666666;
		margin-left: 20rpx;
	}

	.tui-searchbox {

		padding: 0 30rpx;

	}

	.tui-searchbox::after {
		content: '';
		position: absolute;
		border-bottom: 1rpx solid #d2d2d2;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 0;
	}

	.tui-search-input {
		width: 100%;
		height: 60rpx;
		background: #f1f1f1;
		border-radius: 30rpx;
		font-size: 26rpx;
		color: #999;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 20rpx;
	}

	.tui-search-text {
		padding-left: 16rpx;
	}

	.class-item {
		background: #fff;
		width: 100%;
		box-sizing: border-box;
		padding: 0 20rpx 20rpx 0;
		margin-bottom: 20rpx;
		border-radius: 12rpx;
		margin-left: 15rpx;
	}

	.class-name {
		font-size: 28rpx;
		padding: 20rpx 0;
		border-bottom: 1px solid #EEEEEE;
		color: #666666;
		display: flex;
		align-items: center;
		margin: 0 10rpx;

	}

	.g-container {
		/* padding-top: 20rpx; */
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.g-box {
		width: 33.3333%;
		text-align: center;
		padding-top: 40rpx;
	}

	.g-image {
		width: 120rpx;
		height: 120rpx;
	}

	.g-title {
		font-size: 28rpx;
		color: #666;

	}

	/* 列表 */
	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 160upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		line-height: 50px;
		position: relative;
		font-size: 28rpx;
		color: #666;

	}

	.VerticalNav.nav .cu-item.cur {
		color: #4CD964;
		font-weight: 700;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 4rpx;
		height: 50rpx;
		/* border-radius: 10upx 0 0 10upx; */
		position: absolute;
		background-color: currentColor;
		top: 0;
		left: 0rpx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
		background-color: #fff;
		margin-top: 100rpx;
		padding-top: 10rpx;

	}

	.VerticalMain {
		background-color: #f5f5f5;
		flex: 1;
	}
</style>
