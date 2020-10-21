<template>
	<!-- 金刚区进口水果 -->
	<view class="container">
		<!--header-->
		<view class="tui-header-box" :style="{ height: height + 'px', background: 'rgba(255,255,255,' + opcity + ')' }">
			<view class="tui-header" :style="{ paddingTop: top + 'px', opacity: opcity }">{{title}}</view>
			<view class="tui-header-icon" :style="{ marginTop: top + 'px' }">
				<view class="tui-icon-box"  @tap="back">
					<tui-icon name="arrowleft" :size="30" :color="opcity >= 1 ? '#000' : '#fff'"></tui-icon>
				</view>
			</view>
		</view>
		<!--header-->
		<!--banner-->
		<view class="tui-banner-swiper">
		<image :src="imageUrl" class="tui-my-bg" mode="aspectFill"></image>
		</view>
		<!-- <view class="tui-cent-box">
			
		</view> -->
		<view class="tui-rink-sceate">
			<view class="tui-rank-list" >
				<view class="tui-tab-rank" v-for="(item,index) in importData" :key="index">
					<view class="tui-tab-rank-cent" @tap="gotoList(item.id)">
						<image :src="url+item.url" mode="aspectFill" class="img-rink"></image>
						<view class="tui-pro-tit">
							<text class="tag-tit">{{item.lableName}}</text> <text class="tag-tit-text">{{item.name}}</text>
							<view class="tag-tit2">
								<view class="">
									<view class="tag-tit2-price">
										{{item.platformClinetPrice}}元/件
									</view>
									<view class="tag-tit2-text">
										{{item.number}}点赞
									</view>
								</view>
								<image src="../../static/images/shopcar@2x.png" mode="aspectFill" class="tui-shop-car"></image>
								<!-- <view>购物车</view> -->
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
	import {listing2,publicing} from '../../api/api.js'
	//请求地址
	import {getselectImport,imgurl} from '../../api/request.js'
	var {log} = console
	export default {
	
		data() {
			return {
				url:'',
				title:'进口水果',
				hideing: 0,
				num:0,
				
				imageUrl:"/static/images/limit@2x.png",
				rankBgUrl:"/static/images/paihangbang@2x.png",
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
				importData:[],//请求的数据
			};
		},
		onLoad: function(options) {
			this.title = options.title
			this.getImportData()
			this.url = imgurl
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
		
		methods: {
			//获取进口水果
			getImportData(){
				listing2(getselectImport)
				.then((res)=>{
					console.log(res)
					this.importData =  res.data.data
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			//商品详情页
			gotoList(id){
				log(id)
				uni.navigateTo({
					url:'../../pagesIII/productDetail/productDetail?id=' + id
				})
			},
			gotoGun(){
				uni.navigateTo({
					url:'../../pagesIII/demo/demo'
				})
			},
			menubtn(index){
				this.num = index
				console.log(this.num )
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
						content: '',
						href: 'https://www.thorui.cn/'
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
				location.href = "https://www.thorui.cn/"
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
		background-color: #fff;
	}

	.container {
		/* padding-bottom: 110rpx; */
	}
	.tui-rank-list{
		padding: 0 30rpx;
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
	
	.tui-rink-sceate{
		border-radius: 60rpx 60rpx 0 0;
		padding-top: 26rpx;
		position: relative;
		top: -26px;
		background-color: #fff;
	}
	.tui-cent-box{
		padding-top: 26rpx;
		border-radius: 60rpx 60rpx 0 0 ;
		height: 30px;
		background-color: #fff;
		position: relative;
		top: -20rpx;
		
		
	}
	.tui-tab-rank-cent{
		display: flex;
		padding: 20rpx 0;
		
	}
	.img-rink{
		width: 180rpx;
		height: 180rpx;
		display: block;
		margin-right: 20rpx;
	}
	.tui-pro-tit {
		flex: 5;
	}
	.tag-tit{
		/* 渐变色 */
		background-image: linear-gradient(to right, #00C94A , #00AC3F);
		margin-right: 10rpx;
		padding: 0 10rpx;
		border-radius: 15rpx 0 15rpx 0;
		color: #fff;
		font-size: 20rpx;
	}
	.tag-tit2{
		display: flex;
		justify-content: space-between;
	}
	.tag-tit2-price{
		color: #FF5600;
		font-size: 16rpx;
	}
	.tag-tit2-text{
		color: #555;
		font-size: 16rpx;
	}
	.tui-shop-car{
		width: 80rpx;
		height: 80rpx;
		display: block;
	}
	.tag-tit-text{
		font-size: 28rpx;
		color: #333;
	}
	.tui-tab-rank{
		margin: 10rpx 0;
		border-bottom: 1rpx solid #ccc;
	}
	.actineclass{display: block; }
	.errorclass{display: none;}
	.activetext{
		color: #fff !important;
		background-image: linear-gradient(to right, #FF943D , #FF5600);
		border-radius: 60rpx;
		}
	.tui-cent-tab{
		position: relative;
		top: 50rpx;
		height: 60rpx;
		display: flex;
		justify-content: space-between;
		border-radius: 60rpx;
		background-color: #f7f7f7;
		margin-bottom: 80rpx;
		
	}
	.tui-tab-btn{
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
	.tui-info-day{
		font-size: 20rpx;
	}
	.tui-info-quanguo{
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
