<template>
	<view >
		<view class="tui-tab-rank" >
			<view class="tui-time-title"><text class="title-time-left font-size-color">订单编号: {{DetailsData.order_number}}</text> </view>
		<view class="tui-tab-rank-cent">
			<image :src="DetailsData.url" mode="aspectFill" class="img-rink"></image>
			<view class="tui-pro-tit">
				<text class="tag-tit">采手精选</text> <text class="tag-tit-text">{{DetailsData.name}}</text>
				<view class="tag-tit2">
					<view class="">
						<view class="tag-tit2-price">
							{{DetailsData.specification}}×{{DetailsData.goods_number}}
						</view>
						<view class="tag-tit2-text">
							 <text class="price1">￥{{DetailsData.platform_price}}元</text><text class="price2">/件</text>
						</view>
					</view>
					<!-- <image src="../../static/images/zan.png" mode="aspectFill" class="tui-shop-car"></image> -->
					<view class="price-title">实付{{DetailsData.market_price}}（含运费）</view>
				</view>
				
			</view>
		</view>
		</view>
		<tui-list-cell   last="true">
			<view class="tui-item-box">
				
				<text class="tui-list-cell_name">收货状态</text>
				<view class="tui-right">已确认收货</view>
			</view>
		</tui-list-cell>
		<tui-list-cell  :arrow="true" last="true">
			<view class="tui-item-box">
				
				<text class="tui-list-cell_name">申请原因</text>
				<view class="tui-right">{{DetailsData.cause}}</view>
			</view>
		</tui-list-cell>
		<view class="tui-title tui-top40">问题描述</view>
			<view class="tui-textarea-box">
				<textarea class="tui-textarea" name="desc" :placeholder="DetailsData.after_sale_describe"  readonly="readonly"   disabled="disabled"
				 placeholder-class="tui-phcolor-color" />
				<!-- <view class="tui-textarea-counter">最多500字</view> -->
		</view>
		<view class="tui-title tui-top40">上传凭证</view>
		<!-- 上传 -->
		<view class="tui-upload-box">
		  <view class="tui-upload-item" v-for="(item,index) in files" :key="index">
		    <image :src="item" class='tui-upload-img' @tap="previewImage" mode="aspectFill" :id="item"></image>
		  </view>
		</view>
		
	</view>
</template>

<script>
	import {publicing} from '../../api/api.js'
	import {posAfterDetails} from '../../api/request.js'
	var {log} = console
	export default {
		data() {
			return {
				id:'',
				DetailsData:{},//申请详情数据
				files:[]
				
			}
		},
		methods: {
			previewImage: function (e) {
				log(e.currentTarget.id)
				uni.previewImage({
					current: e.currentTarget.id, 
					urls: this.files
				})
			},
			
			postAfterDetails(){
				var setdata = uni.getStorageSync('usermen')
				let data = {
					token:setdata,
					id:this.id
				}
				publicing(posAfterDetails,data)
				.then((res)=>{
					log(res)
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
			console.log(options.id)
			this.id = options.id
			this.postAfterDetails()
			
		}
	}
</script>

<style>
	
	/* start */
	.price1{
		color: #FF5600;
		font-size: 24rpx;
		font-weight: 600;
	}
	.font-size-color{
		color: rgba(85, 85, 85, 1);
		font-size: 28rpx;
	}
	.price-title{
		font-size: 24rpx;
		margin-top: 30rpx;
	}
	.price2{
		color: #B6B6B6;
		font-size: 24rpx;
	}
	.tui-tab-rank{
		background-color: #fff;
		margin: 20rpx 0;
		
	}
	.tui-time-title{
		padding: 10rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-bottom: 1rpx solid #F5F5F5;
		
	}
	.title-time-left{
		margin-left: 20rpx;
		color: #707070;
	}
	.tui-tab-rank-cent{
		display: flex;
		padding: 20rpx ;
		
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
		color: #555555;
		font-size: 24rpx;
	}
	.tag-tit2-text{
		color: ##FF5600;
		font-size: 24rpx;
	}
	.tui-shop-car{
		width: 45rpx;
		height: 48rpx;
		display: block;
	}
	.tag-tit-text{
		font-size: 28rpx;
		color: #333;
	}
	/* end */
	.tui-button-primary{
		border-radius: 60rpx;
		/* 渐变色 */
		background-image: linear-gradient(to right,   rgba(0, 197, 42, 1),rgba(0, 188, 69, 1));
		color: #fff;
		font-size: 32rpx;
	}
	
	.tui-btn-box {
		padding: 40rpx 50rpx;
		box-sizing: border-box;
		background-color: #fff;
	}
	.tui-title {
	  padding: 55rpx 0 30rpx 0;
	  font-size: 26rpx;
	  color: #333;
	  
	  background-color: #fff;
	}
	.tui-upload-box {
		width: 100%;
		margin-bottom: 30rpx;
		padding-bottom: 30rpx;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		background-color: #fff;
	}
	
	.tui-upload-item {
		width: 220rpx;
		height: 220rpx;
		position: relative;
		
	}
	
	.tui-upload-item:nth-of-type(3n) {
		margin-right: 0;
	}
	
	.tui-upload-img {
		width: 220rpx;
		height: 220rpx;
		display: block;
	}
	
	.tui-upload-del {
		position: absolute;
		right: -18rpx;
		top: -18rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.tui-upload-add {
		width: 220rpx;
		height: 220rpx;
		font-size: 68rpx;
		font-weight: 100;
		color: #888;
		background-color: #F7F7F7;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
	}
	/* end */
	.tui-top40 {
	  margin-top: 40rpx;
	  padding-left: 40rpx;
	}
	/*textarea*/
	
	.tui-textarea-box {
		border-radius: 4rpx;
		height: 280rpx;
		box-sizing: border-box;
		padding: 20rpx 20rpx 0 20rpx;
		position: relative;
		background-color: #fff;
	}
	.tui-textarea {
		height: 210rpx;
		width: 100%;
		color: #666;
		font-size: 28rpx;
		z-index: 2;
	}
	.tui-phcolor-color {
		color: #333 !important;
	}
	.tui-textarea-counter {
		font-size: 24rpx;
		color: #999;
		text-align: right;
		height: 40rpx;
		line-height: 40rpx;
		padding-top: 4rpx;
	}
	.tui-list-cell_name {
		padding-left: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tui-item-box {
		width: 100%;
		display: flex;
		align-items: center;
	}
	.tui-right {
		margin-left: auto;
		margin-right: 34rpx;
		font-size: 26rpx;
		color: #999;
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
.tui-goods-item {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}
	.tui-goods-img {
		width: 180rpx;
		height: 180rpx;
		display: block;
		flex-shrink: 0;
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
	
	.tui-price-right {
		text-align: right;
		font-size: 24rpx;
		color: #888888;
		line-height: 30rpx;
		padding-top: 20rpx;
	}
	
	.tui-color-red {
		color: #E41F19;
		padding-right: 30rpx;
	}
	
	.tui-goods-price {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		font-size: 24rpx;
	}
	
	.tui-size-24 {
		font-size: 24rpx;
		line-height: 24rpx;
	}
	
	.tui-price-large {
		font-size: 32rpx;
		line-height: 30rpx;
		font-weight: 500;
	}
	
	.tui-order-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background: #fff;
		padding: 10rpx 30rpx 20rpx;
		box-sizing: border-box;
	}
	
	.tui-btn-ml {
		margin-left: 20rpx;
	}
</style>
