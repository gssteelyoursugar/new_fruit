<template>
	<view>
	
		<!-- 反馈信息 -->
		<view class="tui-content">
			<view class="tui-title">反馈信息</view>
			<view class="tui-text-line">
				<text>反馈时间:</text><text>2020-9-23 14:42</text>
			</view>
			<view class="tui-text-line">
				<text>反馈内容:</text><text>经核实协商，退回部分货款50元。</text>
			</view>
			
		</view>
		<!-- 申请信息 -->
		<view class="tui-content">
			<view class="tui-title">申请信息</view>
			<view class="tui-img-cent">
				<image src="../../static/images/baixiangguo1.png" mode="aspectFit" class="img"></image>
				<view class="tui-goods-center">
					<view class="tui-goods-name"><text class="tag-tit">采手精选</text>葡萄大大大大大大</view>
					<view class="tui-goods-attr">一斤60×2</view>
					<view class="tui-goods-flex">
						<view class="tui-goods-attr1">￥108元</view>
						<view class="tui-goods-attr">实付98元(含运费)</view>
					</view>
					
				</view>
			</view>
		</view>
		<view class="tui-content2">
			<view class="tui-text-line">
				<text>服务单号:</text><text>2465465465456456</text>
			</view>
			<view class="tui-text-line">
				<text>申请时间:</text><text>2020-9-23 14:42</text>
			</view>
			<view class="tui-text-line2">
				<text>退款原因:</text><text>5商品与描述不符，发过来的货品比描述中的个头小很多</text>
			</view>
			
		</view>
		<view class="tui-content3">
			<image src="../../static/images/baixiangguo1.png" mode="aspectFit" class="img2"></image>
			<image src="../../static/images/baixiangguo1.png" mode="aspectFit" class="img2"></image>
			<image src="../../static/images/baixiangguo1.png" mode="aspectFit" class="img2"></image>
			<image src="../../static/images/baixiangguo1.png" mode="aspectFit" class="img2"></image>
		</view>
		<view class="tab-bar">
			<view class="tui-order-btn">
				<view class="tui-btn-ml">
					<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle"  @tap="goAfterCancel()">取消申请</tui-button>
				</view>
				<view class="tui-btn-ml" >
					<button type="primary"   class="icon-img3" @tap="goAfterConfirm()">确认</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			//取消申请
			goAfterCancel(){
				console.log('取消申请')
			},
			//确认
			goAfterConfirm(){
				console.log('确认')
			}
			
			
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
		padding:  23rpx 20rpx;
		box-sizing: border-box;
	}

	.tui-btn-ml {
		margin-left: 20rpx;
	}
	.icon-img3{
		background-image: linear-gradient(to right, rgba(0, 197, 42, 1) , rgba(0, 188, 69, 1));
		color: #fff!important;
		width: 152rpx!important;
		height: 56rpx!important;
		line-height: 56rpx;
		font-size: 26rpx!important;
		border-radius: 50rpx!important;
		/* border: 1rpx solid #929292!important; */
		
	
	}

.tui-title{
	height: 80rpx;
	line-height: 80rpx;
	border-bottom: 1rpx solid rgba(245, 245, 245, 1);
	font-size: 32rpx;
	font-weight: 700;
	padding:  0 30rpx;
}
.tui-text-line{
	height: 60rpx;
	line-height: 60rpx;
	font-size: 28rpx;
	color: rgba(57, 57, 57, 1);
	padding:  0 30rpx;
	font-weight: 500;
}
.tui-text-line2{
	
	line-height: 40rpx;
	font-size: 28rpx;
	color: rgba(57, 57, 57, 1);
	padding:  0 30rpx;
	font-weight: 500;
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
</style>
