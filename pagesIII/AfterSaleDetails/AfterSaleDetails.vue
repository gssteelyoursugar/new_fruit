<template>
	<view>
		<!-- 处理结果 -->
		<view class="tui-content" v-if="DetailsData.after_sale_status == '1'|| DetailsData.after_sale_status == '11'|| DetailsData.after_sale_status =='2'||DetailsData.after_sale_status =='3'||DetailsData.after_sale_status =='4'">
			<view class="tui-title">处理结果</view>
			<view class="tui-text-line">
				<text>处理时间:</text><text class="maginLeft colorNum">{{DetailsData.affirm_time}}</text>
			</view>
			<view class="tui-text-line">
				<text>处理方式:</text><text class="maginLeft">{{DetailsData.after_sale_mode}}</text>
			</view>
			<view class="tui-text-line" v-if="DetailsData.after_sale_mode === '退款' ">
				<text>退款金额:</text><text class="maginLeft">{{DetailsData.refund_money}}元</text>
			</view>
			<view class="tui-text-line" v-if="DetailsData.after_sale_mode === '退款' ">
				<text>退款方式:</text><text class="maginLeft">退至付款账户</text>
			</view>
		</view>
		<!-- 反馈信息 -->
		<view class="tui-content" v-if="DetailsData.after_sale_status == '1'||DetailsData.after_sale_status == '11'|| DetailsData.after_sale_status =='2'||DetailsData.after_sale_status =='3'||DetailsData.after_sale_status =='4'">
			<view class="tui-title">反馈信息</view>
			<view class="tui-text-line">
				<text>反馈时间:</text><text class="maginLeft colorNum">{{DetailsData.feedback_time}}</text>
			</view>
			<view class="tui-text-line">
				<text>反馈内容:</text><text class="maginLeft">{{DetailsData.remarks}}</text>
			</view>
		</view>
		<!-- 申请信息 -->
		<view class="tui-content">
			<view class="tui-title">申请信息</view>
			<view class="tui-img-cent">
				<image :src="DetailsData.url" mode="aspectFit" class="img"></image>
				<view class="tui-goods-center">
					<view class="tui-goods-name"><text class="tag-tit">采手精选</text>{{DetailsData.name}}</view>
					<view class="tui-goods-attr">{{DetailsData.specification}}×{{DetailsData.goods_number}}</view>
					<!-- <view class="tui-goods-flex">
						<view class="tui-goods-attr1">￥{{DetailsData.goods_price}}元</view>
						<view class="tui-goods-attr">实付{{DetailsData.order_total_price}}元(免运费)</view>
					</view> -->

				</view>
			</view>
		</view>
		<view class="tui-content2">
			<view class="tui-text-line">
				<text>订单号:</text><text class="maginLeft colorNum">{{DetailsData.order_number}}</text>
				<text class="iconfont icon-lujing182" @click="clipboard(DetailsData.order_number)"></text>
			</view>
			<view class="tui-text-line">
				<text>服务单号:</text><text class="maginLeft colorNum">{{DetailsData.after_sale_number}}</text>
				<text class="iconfont icon-lujing182" @click="clipboard(DetailsData.after_sale_number)"></text>
			</view>
			<view class="tui-text-line">
				<text>申请时间:</text><text class="maginLeft colorNum">{{DetailsData.apply_time}}</text>
			</view>
			<view class="tui-text-line">
				<text>申请原因:</text><text class="maginLeft">{{DetailsData.cause}}</text>
			</view>
			<view class="tui-text-line2">
				<text>问题描述:</text><text class="maginLeft">{{DetailsData.after_sale_describe}}</text>
			</view>
		</view>
		<view class="tui-content3">
		</view>
		<view class="tui-upload-box">
			<view class="tui-upload-item" v-for="(item,index) in files" :key="index">
				<image class='tui-upload-img' :src="item" @tap="previewImage" mode="aspectFill" :id="item" v-if="item.indexOf('.mp4') == -1"></image>
				<video class='tui-upload-img' :src="item" v-if="item.indexOf('.mp4') != -1" controls></video>
			</view>
		</view>
		<view class="">

		</view>


	</view>
</template>

<script>
	const thorui = require("@/common/tui-clipboard/tui-clipboard.js")
	import {
		publicing
	} from '../../api/api.js'
	import {
		posAfterDetails
	} from '../../api/request.js'
	var {
		log
	} = console
	export default {
		data() {
			return {
				refund_money: '', //退款金额
				id: '',
				DetailsData: {}, //详情数据
				files: []
			}
		},
		methods: {
			//复制
			//event 当需要异步请求返回数据再进行复制时，需要传入此参数，或者异步方法转为同步方法（H5端）
			clipboard(event) {
				let data = event;
				thorui.getClipboardData(data, (res) => {
					// #ifdef H5 || MP-ALIPAY
					if (res) {
						this.tui.toast("复制成功")
					} else {
						this.tui.toast("复制失败")
					}
					// #endif
				}, event)
			},
			//图片预览
			previewImage: function(e) {
				log(e.currentTarget.id)
				uni.previewImage({
					current: e.currentTarget.id,
					urls: this.files
				})
			},
			//获取详情信息
			postAfterDetails() {
				var setdata = uni.getStorageSync('usermen')
				let data = {
					token: setdata,
					id: this.id
				}
				publicing(posAfterDetails, data)
					.then((res) => {
						if (res.data.code && res.data.code != 200) {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
							uni.switchTab({
								url: "../../pages/my/my"
							})
							return
						}
						this.DetailsData = res.data.data
						this.refund_money = res.data.data.refund_money //退款金额
						// this.DetailsData.after_sale_mode = '退款'
						// this.files = res.data.data.imgList
						let new_arr = res.data.data.imgList.map(obj => {
							return obj.url
						}) //把图片链接提取出来
						this.files = new_arr

					})
					.catch((err) => {
						log(err)
					})
			},
		},
		onLoad(options) {
			this.id = options.id
			this.postAfterDetails()

		}
	}
</script>

<style>
	.tui-content {
		margin-top: 30rpx;
		background-color: #fff;
		padding-bottom: 30rpx;

	}

	.tui-content2 {
		background-color: #fff;
		padding: 20rpx 0 30rpx;
	}

	.tui-content3 {
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
		width: 100%;
		background-color: #fff;
	}

	.maginLeft {
		margin-left: 10rpx;
	}

	.colorNum {
		color: rgba(57, 57, 57, 1);
		font-weight: 500;
	}

	.icon-lujing182 {
		font-size: 30rpx;
		color: rgba(182, 182, 182, 1);
		margin-left: 12rpx;
	}

	.tui-title {
		height: 80rpx;
		line-height: 80rpx;
		border-bottom: 1rpx solid rgba(245, 245, 245, 1);
		font-size: 16px;
		font-weight: bold;
		padding: 0 30rpx;
	}

	.tui-text-line {

		line-height: 60rpx;
		font-size: 28rpx;
		color: rgba(57, 57, 57, 1);
		padding: 6rpx 30rpx;
		/* font-weight: 400; */
	}

	.tui-text-line2 {

		line-height: 60rpx;
		font-size: 28rpx;
		color: rgba(57, 57, 57, 1);
		padding: 6rpx 30rpx;

	}

	.tui-img-cent {
		display: flex;
		justify-content: start;
		padding: 20rpx;
	}

	.tui-goods-center {
		flex: 1;
		padding: 20rpx 8rpx;
		box-sizing: border-box;
	}

	.tui-goods-name {
		/* max-width: 310rpx; */
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 26rpx;
		line-height: 32rpx;
	}

	.tag-tit {
		/* 渐变色 */
		background-image: linear-gradient(to right, #00C94A, #00AC3F);
		margin-right: 10rpx;
		padding: 0 10rpx;
		border-radius: 15rpx 0 15rpx 0;
		color: #fff;
		font-size: 20rpx;
	}

	.tui-goods-flex {
		display: flex;
		justify-content: space-between;
	}

	.tui-goods-attr {
		font-size: 22rpx;
		color: #888888;
		line-height: 32rpx;
		padding-top: 20rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-goods-attr1 {
		font-size: 22rpx;
		color: rgba(255, 86, 0, 1);
		line-height: 32rpx;
		padding-top: 20rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.img {
		width: 150rpx;
		height: 150rpx;
	}

	.img2 {
		width: 220rpx;
		height: 220rpx;
	}

	.tui-upload-box {
		width: 100%;
		/* margin-top: 30rpx; */
		margin-bottom: 30rpx;
		padding-bottom: 30rpx;
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
		background-color: #fff;
	}

	.tui-upload-item {
		width: 220rpx;
		height: 220rpx;
		position: relative;
		/* margin-left: 20rpx; */
		margin: 0 0 20rpx 20rpx;

	}

	.tui-upload-img {
		width: 220rpx;
		height: 220rpx;
		display: block;
	}
</style>
