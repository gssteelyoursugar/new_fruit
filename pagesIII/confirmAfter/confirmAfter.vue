<template>
	<view>
	
		<!-- 反馈信息 -->
		<view class="tui-content">
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
						<view class="tui-goods-attr">实付{{DetailsData.market_price}}元(免运费)</view>
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
			<view class="tui-text-line2">
				<text>申请原因:</text><text class="maginLeft">{{DetailsData.after_sale_describe}}</text>
			</view>
			
		</view>
		<view class="tui-content3">
			
		</view>
		<view class="tui-upload-box">
		  <view class="tui-upload-item" v-for="(item,index) in files" :key="index">
		    <image class='tui-upload-img' :src="item"  @tap="previewImage" mode="aspectFill" :id="item"  v-if="item.indexOf('.mp4') == -1"></image>
		    <video class='tui-upload-img' :src="item"   v-if="item.indexOf('.mp4') != -1"   controls ></video>
		  </view>
		</view>
		<view class="tab-bar">
			<view class="tui-order-btn">
				<view class="tui-btn-ml">
					<button type="primary"   class="icon-img4" @tap="goAfterCancel()">取消申请</button>
					
				</view>
				<view class="tui-btn-ml" >
					<button type="primary"  class="icon-img3" @tap="goAfterConfirm(DetailsData.order_item_id)">确认</button>
				</view>
			</view>
		</view>
		<view class="warp" v-if="modaishow">
			<view class="warp-view">
				<view class="warp-text1">温馨提示</view>
				<view class="warp-text">确定要取消申请?</view>
				<view class="warp-flex">
					<button @click="goBack" plain="true" class="color-green"> 否</button>
					<button @click="goAfterSale(DetailsData.id,DetailsData.order_item_id)" plain="true"  class="color-green">是</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const thorui = require("@/common/tui-clipboard/tui-clipboard.js")
	import {publicing} from '../../api/api.js'
	import {posAfterDetails,postAfterCen,PostDataById} from '../../api/request.js'
	var {log} = console
	export default {
		data() {
			return {
				id:'',
				DetailsData:{},//申请详情数据
				files:[],
				modaishow:false,
			}
		},
		methods: {
			//复制
			//event 当需要异步请求返回数据再进行复制时，需要传入此参数，或者异步方法转为同步方法（H5端）
			clipboard(event) {
				let data= event;
				thorui.getClipboardData(data, (res) => {
					// #ifdef H5 || MP-ALIPAY
					if (res) {
						this.tui.toast("复制成功")
					} else {
						this.tui.toast("复制失败")
					}
					// #endif
					},event)
				},
			goBack(){
				this.modaishow = false
			},
			goAfterCancel(){
				this.modaishow = true
			},
			//取消申请
			goAfterSale(id,order_item_id){
				
				var setdata = uni.getStorageSync('usermen')
				let data ={
					token:setdata,
					id:id,
					orderItemId:order_item_id
					
				}
				publicing(postAfterCen,data)
				.then((res)=>{
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
					
					this.modaishow = false
					uni.reLaunch({
						url:'../../pagesIII/navbar/navbar'
					})
				})
				.catch((err)=>{
					log(err)
				})
			},
			//确认
			goAfterConfirm(id){
				log("id是",id)
				let setdata = uni.getStorageSync('usermen')
				let datas ={
					token:setdata,
					orderItemId:id
				}
				publicing(PostDataById,datas)
				.then((res)=>{
					log(res)
					uni.showToast({
						title:`${res.data.msg}`,
						duration:2000
					})
					uni.redirectTo({
						url:'../../pagesIII/navbar/navbar'
					})
				})
				.catch((err)=>{
					log(err)
				})
			},
			previewImage: function (e) {
				log(e.currentTarget.id)
				uni.previewImage({
					current: e.currentTarget.id, 
					urls: this.files
				})
			},
			//获取申请详情信息
			postAfterDetails(){
				var setdata = uni.getStorageSync('usermen')
				let data = {
					token:setdata,
					id:this.id
				}
				publicing(posAfterDetails,data)
				.then((res)=>{
					this.DetailsData = res.data.data
					// this.files = res.data.data.imgList
					let new_arr = res.data.data.imgList.map(obj => {return obj.url})//把图片链接提取出来
					this.files = new_arr
					
				})
				.catch((err)=>{
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
.tui-content{
	margin-top: 30rpx;
	background-color: #fff;
	
}
.tui-content2{
	background-color: #fff;
}
.tui-content3{
	display: flex;
	justify-content: start;
	flex-wrap: wrap;
	width: 100%;
	background-color: #fff;
	padding-bottom: 100rpx;
	
	}
.tab-bar{
	height: 100rpx;
	width: 100%;
	position: fixed;
	bottom: 0;
	background-color: #fff;
	box-shadow: 0 -2rpx 3rpx -1rpx #dedede;
}

.tui-order-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background: #fff;
		padding:  15rpx 40rpx;
		box-sizing: border-box;
	}

	.tui-btn-ml {
		margin-left: 40rpx;
	}
	.icon-img3{
		background-image: linear-gradient(to right, rgba(0, 197, 42, 1) , rgba(0, 188, 69, 1));
		color: #fff!important;
		width: 226rpx!important;
		height: 76rpx!important;
		line-height: 76rpx;
		font-size: 26rpx!important;
		border-radius: 50rpx!important;
		/* border: 1rpx solid #929292!important; */
		
	
	}
	.icon-img4{
		background-color: #fff!important;
		color: rgba(85, 85, 85, 1)!important;
		width: 226rpx!important;
		height: 76rpx!important;
		line-height: 76rpx;
		font-size: 26rpx!important;
		border-radius: 50rpx!important;
		border: 1rpx solid #929292!important;
		
	
	}

.tui-title{
	height: 80rpx;
	line-height: 80rpx;
	border-bottom: 1rpx solid rgba(245, 245, 245, 1);
	font-size: 16px;
	font-weight: bold;
	padding:  0 30rpx;
}
.tui-text-line{
	
	line-height: 60rpx;
	font-size: 14px;
	color: rgba(57, 57, 57, 1);
	padding:  0 30rpx;
	
}
	.icon-lujing182{
		font-size: 30rpx;
		color: rgba(182, 182, 182, 1);
		margin-left: 12rpx;
	}
.maginLeft{
	margin-left: 10rpx;
}
.colorNum{
	color: rgba(57, 57, 57, 1);
	font-weight: 500;
}
.tui-text-line2{
	
	line-height: 40rpx;
	font-size: 14px;
	color: rgba(57, 57, 57, 1);
	padding:  0 30rpx;
	/* font-weight: 500; */
}
.tui-img-cent{
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
	.tag-tit{
			/* 渐变色 */
			background-image: linear-gradient(to right, #00C94A , #00AC3F);
			margin-right: 10rpx;
			padding: 0 10rpx;
			border-radius: 15rpx 0 15rpx 0;
			color: #fff;
			font-size: 20rpx;
		}
	.tui-goods-flex{
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
	
.img{
	width: 150rpx;
	height: 150rpx;
}
.img2{
	width: 220rpx;
	height: 220rpx;
}

.tui-upload-box {
		width: 100%;
		margin-bottom: 30rpx;
		padding-bottom: 100rpx;
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
		background-color: #fff;
	}
	
	.tui-upload-item {
		width: 220rpx;
		height: 220rpx;
		position: relative;
		margin-left: 20rpx;
		margin-bottom: 20rpx;
		
	}
	.tui-upload-img {
		width: 178rpx;
		height: 178rpx;
		display: block;
	}
	
	/* 模态弹窗布局 */
		.warp{position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0,0,0,0.6);
		z-index: 9999;}
		.warp-view{width: 500upx;
				height: 260upx;
				background: #FFFFFF;
				margin: auto;
				position: absolute;
				-webkit-position:absolute;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				border-radius: 8upx;
				overflow: hidden;
				}
		.warp-text{
			text-align: center;
			margin-top: 34upx;
			font-size: 34upx;
			color: #666666;
				}
		.warp-text1{
			text-align: center;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 34upx;
			color: #fff;
			background-color: rgba(0, 197, 42, 1);
				}		
		.warp-flex{ display: flex;
			justify-content: space-around;
			border-top: 1upx solid #EEEEEE;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 80upx;
			line-height: 80upx;
			}
			.color-green{
				color: rgba(0, 197, 42, 1);
			}
		.warp-flex button{border: none;
		font-size: 30upx;
		}
			.warp-flex button:nth-child(2){
				color: rgba(0, 197, 42, 1);
			}
		/*end  */
</style>
