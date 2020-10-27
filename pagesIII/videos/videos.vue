<template>
	<view>
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" @change="changefun" @animationfinish="animationfinishfun" :current="1" :circular="true"
					 :vertical="true">
						<!-- v-for item of PayVideo -->
						<swiper-item v-for="(item,index) in PayVideo" :key="index">
							<view class="swiper-item uni-bg-red">
								<!-- video_path -->
								<video :custom-cache="false" loop="true" class="video" :id="'id'+index" :enable-play-gesture="true"
								 :enable-progress-gesture="true" :controls="true" :src="video_path" :show-center-play-btn="true">
								</video>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<!-- 此处的is_more应该是循环体里面的字段，暂时为模拟 -->
				<view class="collect-btn" @click="clickToCollect(PayVideo[index_].id)" :class="{'is-collect':is_show}">
					<image src="../../static/images/like.png"></image>
					<text>收藏</text>
				</view>
			</view>
		</view>
		<view class="left_box" v-if="is_active">
			<view class="tui-tab-rank">
				<!-- <view class="tui-time-title"><text class="title-time-left">2020年9月6日</text> </view> -->
				<view class="tui-tab-rank-cent">
					<view class="show-more" @click="toggleShow">
						<text>{{is_more?'收起':'展开'}}</text>
						<tui-icon :name="is_more?'arrowdown':'arrowup'" :color="iconColor" :size="iconSize" :unit="iconUnit"></tui-icon>
					</view>
					<view class="detail-btn" v-if="!is_more" @click="clickToDetail(PayVideo[index_].id)">查看详情</view>
					<image src="../../static/images/pingguo1.png" mode="aspectFill" class="img-rink"></image>
					<view class="tui-pro-tit">
						<view><text class="tag-tit">采手精选</text> <text class="tag-tit-text">{{PayVideo[index_].title}}</text></view>
						<view class="tag-tit2">
							<view class="">
								<view class="tag-tit2-price">
									5斤装 × 1
								</view>
								<view class="tag-tit2-text">
									<view class="price1">
										<text style="font-size: 20rpx;margin-right:4rpx;">¥</text>108<text style="font-size: 20rpx;margin-left:4rpx;">元</text>
										<text class="price2">/件</text>
									</view>
								</view>
							</view>
							<!-- <view>购物车</view> -->
						</view>

					</view>
				</view>
				<view class="show-detail" v-if="is_more">
					<view class="detail-btn-item">货源地:陕西西安</view>
					<view class="detail-btn-item">成交:0.9万元</view>
					<view class="detail-btn-item">1万多人看过</view>
					<view class="click-detail-btn" @click="clickToDetail(PayVideo[index_].id)">查看详情</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				hamiguaPNG: 'http://192.168.1.10:8980/js/userfiles/fileupload/202008/1299161489108729858.png',
				mangguoPNG: 'http://192.168.1.10:8980/js/userfiles/fileupload/202008/1298932901905809410.png',
				imgUrl: 'http://192.168.1.10:8980/js/userfiles/fileupload/202008/1295611300690604034.png',
				data: [{
					"id": 16,
					"title": "哈哈哈PS",
					"like_nums": 1,
					"user_id": 10004,
					"goods_id": 0,
					"nick_name": "测试3",
					"avatar_url": "https://himg.bdimg.com/sys/portrait/item/wise.1.c0717b7c.VAcJx2qFUqMIkq-Fqx0HUg.jpg?time=3720",
					"islive": 0,
					"live_id": 0,
					"room_id": 0,
					"online_num": 0,
					"img_path": "https://pic.rmb.bdstatic.com/7b836f461a0e7b69ed0e91941fa2133a.jpeg@s_2,w_272,h_272,q_80",
					"video_path": "https://vd2.bdstatic.com/mda-kfeakt16yicmjydw/sc/mda-kfeakt16yicmjydw.mp4?playlist=%5B%22hd%22%2C%22sc%22%5D&auth_key=1598866337-0-0-21c518f91f29893cb325d2b1cbd92d36&bcevod_channel=searchbox_feed&pd=1&pt=3",
					"distance": "1.8km"
				}, {
					"id": 38,
					"title": "清新的小女孩",
					"like_nums": 0,
					"user_id": 10003,
					"goods_id": 0,
					"nick_name": "测试2",
					"avatar_url": "https://himg.bdimg.com/sys/portrait/item/wise.1.c0717b7c.VAcJx2qFUqMIkq-Fqx0HUg.jpg?time=3720",
					"islive": 0,
					"live_id": 0,
					"room_id": 0,
					"online_num": 0,
					"img_path": "https://pic.rmb.bdstatic.com/7b836f461a0e7b69ed0e91941fa2133a.jpeg@s_2,w_272,h_272,q_80",
					"video_path": "https://vd2.bdstatic.com/mda-kgjc3ze8pqzs3jvd/v1-cae/1080p/mda-kgjc3ze8pqzs3jvd.mp4?auth_key=1598866600-0-0-d40e72c46c5770fbe2cfcd5e70202b79&bcevod_channel=searchbox_feed&pd=1&pt=3",
					"distance": "1.8km"
				}, {
					"id": 39,
					"title": "吴京",
					"like_nums": 0,
					"user_id": 10050,
					"goods_id": 10020,
					"nick_name": "ee",
					"avatar_url": "https://himg.bdimg.com/sys/portrait/item/wise.1.c0717b7c.VAcJx2qFUqMIkq-Fqx0HUg.jpg?time=3720",
					"islive": 0,
					"live_id": 0,
					"room_id": 0,
					"online_num": 0,
					"img_path": "https://pic.rmb.bdstatic.com/7b836f461a0e7b69ed0e91941fa2133a.jpeg@s_2,w_272,h_272,q_80",
					"video_path": "https://vd2.bdstatic.com/mda-kh7zyxeft3z6ecz2/v1-cae/sc/mda-kh7zyxeft3z6ecz2.mp4?auth_key=1598866684-0-0-21bc056d8706104388701b32bb0af159&bcevod_channel=searchbox_feed&pd=1&pt=3",
					"distance": "1.8km"
				}, {
					"id": 40,
					"title": "音乐",
					"like_nums": 0,
					"user_id": 10002,
					"goods_id": 0,
					"nick_name": "测试1",
					"avatar_url": "https://himg.bdimg.com/sys/portrait/item/wise.1.c0717b7c.VAcJx2qFUqMIkq-Fqx0HUg.jpg?time=3720",
					"islive": 0,
					"live_id": 0,
					"room_id": 0,
					"online_num": 0,
					"img_path": "https://pic.rmb.bdstatic.com/7b836f461a0e7b69ed0e91941fa2133a.jpeg@s_2,w_272,h_272,q_80",
					"video_path": "https://vd2.bdstatic.com/mda-kfeakt16yicmjydw/sc/mda-kfeakt16yicmjydw.mp4?playlist=%5B%22hd%22%2C%22sc%22%5D&auth_key=1598866337-0-0-21c518f91f29893cb325d2b1cbd92d36&bcevod_channel=searchbox_feed&pd=1&pt=3",
					"distance": "1.8km"
				}, {
					"id": 41,
					"title": "好纠结",
					"like_nums": 0,
					"user_id": 10002,
					"goods_id": 10073,
					"nick_name": "测试1",
					"avatar_url": "https://himg.bdimg.com/sys/portrait/item/wise.1.c0717b7c.VAcJx2qFUqMIkq-Fqx0HUg.jpg?time=3720",
					"islive": 0,
					"live_id": 0,
					"room_id": 0,
					"online_num": 0,
					"img_path": "https://pic.rmb.bdstatic.com/7b836f461a0e7b69ed0e91941fa2133a.jpeg@s_2,w_272,h_272,q_80",
					"video_path": "https://vd4.bdstatic.com/mda-kgwsw7bsybhikxzv/v1-cae/sc/mda-kgwsw7bsybhikxzv.mp4?auth_key=1598866881-0-0-b986bf7f3bb0ab0bb80b5c8872749429&bcevod_channel=searchbox_feed&pd=1&pt=3",
					"distance": "1.8km"
				}, ],
				index_: 1,
				index: '1',
				is_active: true,
				active: 2,
				PayVideo: [],
				current_i: 2,
				_arr: [],
				len: 0,
				iconSize: 32,
				iconUnit: 'rpx',
				is_more: false, //true展开，false收起
				is_show: false, //模拟用户点击收藏按钮
			}
		},
		computed: {

		},
		props: {
			ind: {
				type: Number,
				default: 0
			},
		},
		methods: {
			// 视频页点击商品详情按钮
			clickToDetail(id) {
				// let id = 1311280367173636096
				uni.navigateTo({
					url: '../productDetail/productDetail?id=' + id
				})
			},
			// 视频页点击收藏商品
			clickToCollect(id){
				this.is_show = !this.is_show
				this.is_show && uni.showToast({
					title: '收藏成功',
					icon: 'none'
				})
				!this.is_show && uni.showToast({
					title: '取消收藏',
					icon: 'none'
				})
			},
			// 切换显示
			toggleShow() {
				this.is_more = !this.is_more
			},
			shopPing() {
				uni.navigateTo({
					url: '../productDetail/productDetail'
				})
			},
			changefun(e) {
				this.is_active = false
				let current = e.detail.current
				let {
					len,
					PayVideo,
					active,
					_arr,
					t,
					index_
				} = this
				let videoContext = uni.createVideoContext('id' + index_)
				videoContext.pause()
				this.PayVideo = PayVideo
			},
			animationfinishfun(e) {
				let {
					index_,
					len,
					PayVideo,
					active,
					_arr,
					t
				} = this
				let current = e.detail.current
				this.is_active = true
				PayVideo[current]['istrue'] = true
				this.PayVideo = PayVideo
				let videoContext = uni.createVideoContext('id' + index_)
				videoContext.pause()
				videoContext = uni.createVideoContext('id' + current)
				videoContext.play()
				this.index_ = current
				if (PayVideo.length == len) {
					return
				}


				this.PayVideo.push(_arr[active])
				this.active += 1


			}
		},
		mounted() {
			//同步存储
			uni.setStorageSync('video', this.data);

			let ind = 1

			this.index = ind
			//同步读取
			const video = uni.getStorageSync('video');
			const len = video.length
			let b_arr = []
			let s_arr = []
			video.forEach((res, index) => {
				if (ind <= index) {
					b_arr.push(res)
				} else {
					s_arr.push(res)
				}
			})
			let _arr = b_arr.concat(s_arr.reverse())
			_arr = _arr.map(res => {
				res['istrue'] = false
				return res
			})
			_arr[0]['istrue'] = true
			const PayVideo = [
				_arr[len - 1], _arr[0], _arr[1]
			]
			this.PayVideo = PayVideo
			this._arr = _arr
			this.len = len
			this.$nextTick(function() {

				let videoContext = uni.createVideoContext('id1')
				videoContext.play()
			})


		}
	}
</script>

<style scoped lang="less">
	.circle {

		background: rgba(34, 34, 34, 0.4);

		border-radius: 50%;
		z-index: 2;
		height: 70px;
		width: 70px;
		position: fixed;
		top: 0;

		bottom: 441rpx;
		left: 31rpx;

		margin: auto;

		.red {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			margin: auto;
			z-index: 3;
			height: 35px;
			width: 35px;
		}
	}

	.swiper {
		height: 100vh;

		.swiper-item {
			height: 100vh;
			position: relative;
		}

		.uni-bg-red {
			background: red;
		}

		.uni-bg-green {
			background: green;
		}

		.uni-bg-blue {
			background: blue;
		}
	}

	.video {
		width: 100%;
		height: 100vh;
		position: relative;

	}

	.collect-btn {
		position: fixed;
		top: 60rpx;
		right: 60rpx;
		color: #fff;
		display: flex;
		align-items: center;
		background: rgba(255,255,255,.3);
		justify-content: space-evenly;
		border-radius: 40rpx;
		font-size: 28rpx;
		width: 160rpx;
		height: 60rpx;

	}

	.collect-btn image {
		width: 36rpx;
		height: 30rpx;
	}

	.is-collect {
		background: #FF7709;
	}

	.left_box {
		/* 2020/8/31改 */
		position: fixed;
		width: 100%;
		// height: 200rpx;
		border-radius: 40rpx 40rpx 0 0;
		bottom: 0;
		left: 0;
		background-color: #fff;
		color: #000;

		.ke_context {
			width: 516rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			// color: rgba(255, 255, 255, 1);
			word-break: break-all;
			word-wrap: break-word;
			white-space: pre-line;
			white-space: normal;
			text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);
		}

		.ren {

			margin: 20rpx 0;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: bold;
			// color: rgba(255, 255, 255, 1);
			text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);
		}

		.auto {
			display: flex;
			align-items: center;
			width: 100%;
			height: 60rpx;
			margin-top: 24rpx;
			opacity: 1;
			border-radius: 8rpx;
			padding-left: 10rpx;

			cover-view {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				line-height: 90px;
				text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);
			}

			cover-image {
				margin-right: 10rpx;
				height: 28rpx;
				width: 26rpx;
			}
		}

		.ke {
			display: flex;
			align-items: center;
			width: 310rpx;
			height: 60rpx;
			background: rgba(0, 0, 0, 0.3);
			opacity: 1;
			border-radius: 8rpx;
			padding-left: 10rpx;

			cover-view {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				line-height: 90px;
				text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);
			}

			cover-image {
				margin-right: 10rpx;
				height: 40rpx;
				width: 40rpx;
			}
		}
	}

	.H_T {
		z-index: 2;
		width: 100%;
		display: flex;
		box-sizing: border-box;
		position: absolute;
		padding: 0 30rpx;
		background: transparent;
		justify-content: space-between;

		.back {
			height: 48rpx;
			width: 48rpx;
		}

		.search {
			height: 48rpx;
			width: 48rpx;
		}
	}

	.right_box {
		width: 100rpx;
		position: absolute;
		z-index: 2;
		bottom: 60rpx;
		right: 12rpx;
		display: flex;
		flex-direction: column;

		.top1 {
			position: relative;
			height: 124rpx;

			.avatar_img {
				width: 98rpx;
				height: 98rpx;
				border-radius: 50%;
			}

			.add_img {
				position: absolute;
				z-index: 99;
				width: 48rpx;
				height: 48rpx;
				bottom: 10rpx;
				left: 0;
				right: 0;
				margin: 0 auto;
			}
		}

		.top2 {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 37rpx;

			.t_img {
				height: 72rpx;
				width: 72rpx;
				margin-bottom: 10rpx;
			}

			.font_t {
				font-size: 26rpx;
				font-family: SF Pro Text;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);

				text-shadow: 0px 1rpx 1rpx rgba(0, 0, 0, 0.4);
				text-align: center;
			}
		}

	}

	.price1 {
		color: #FF5600;
		font-size: 36rpx;
		font-weight: 600;
	}

	.price2 {
		color: #B6B6B6;
		font-size: 20rpx;
	}

	.tui-tab-rank {
		// background-color: #fff;
		// margin: 20rpx 0;

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
		padding: 32rpx 20rpx 20rpx;
		position: relative;
	}

	.show-detail {
		display: flex;
		border-top: 1px solid #e5e5e5;
		padding: 30rpx 0;
		position: relative;

	}

	.detail-btn-item {
		padding: 10rpx 8rpx;
		text-align: center;
		font-size: 20rpx;
		color: #555555;
		background: #E5E5E5;
		border-radius: 10rpx;
		margin: 0 20rpx;
	}

	.click-detail-btn {
		position: absolute;
		right: 0;
		background: linear-gradient(to right, #FF7709, #FF6500);
		width: 180rpx;
		height: 70rpx;
		text-align: center;
		line-height: 70rpx;
		border-radius: 40rpx 0 0 40rpx;
		top: 16rpx;
		color: #fff;

	}

	.show-more {
		position: absolute;
		right: 20rpx;
		top: 20rpx;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		color: #B6B6B6;

	}

	.detail-btn {
		position: absolute;
		right: 0;
		bottom: 40rpx;
		background: linear-gradient(to right, #FF7709, #FF6500);
		width: 180rpx;
		height: 70rpx;
		text-align: center;
		color: #fff;
		font-size: 28rpx;
		font-weight: 400;
		line-height: 70rpx;
		border-radius: 40rpx 0 0 40rpx;

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
		color: #FF5600;
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
