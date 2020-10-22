<template>
	<view>
		<!--header-->
		<!-- <view class="tui-header-box" :style="{paddingTop: statusHeight+ 'px',height: boxHeight+ 'px'}">
			<view class="tui-icon-box" @tap="back">
				<tui-icon name="arrowleft" :size="30" color="#333"></tui-icon>
			</view>
			<view class="tui-header">资讯信息</view>
		</view> -->
		<!--header-->
		<tui-list-view title=" ">
			<tui-list-cell :lineLeft="false"  v-for="(item,index) of msgList" :key="index" >
				<view class="tui-item-box" @click="clickToItem(item.id)">
					<view class="tui-msg-box">
						<!-- /static/images/selection1.png -->
						<image :src="item.url" class="tui-msg-pic" mode="widthFix"></image>
						<view class="tui-msg-item">
							<view class="tui-msg-name">{{item.title}}</view>
							<view class="tui-msg-content">{{item.describe}}</view>
						</view>
					</view>
					<!-- <view class="tui-msg-right">
						<view class="tui-msg-time">10:22</view>
						<tui-badge type="danger" class="tui-badge">9</tui-badge>
					</view> -->
				</view>
			</tui-list-cell>
			
		</tui-list-view>
	</view>
</template>

<script>
	import {
		listing2
	} from '../../api/api.js'
	import {
		getMsg
	} from '../../api/request.js'
	export default {
		data() {
			return {
				statusHeight: 20,
				boxHeight: 44,
				msgList: []
			}
		},
		onLoad() {
			const res = uni.getSystemInfoSync();
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
			console.log(statusBarHeight, navHeight, buttonHeight)
			// #endif
			listing2(getMsg).then(res=>{
				console.log(res)
				this.msgList = res.data.data
			})
		},
		methods: {
			back() {
				uni.navigateBack();
			},
			detail () {
				uni.navigateTo({
					url: '../../pages/'
				})
			},
			clickToItem(id) {
				console.log(id)
				uni.navigateTo({
					url: "../../pagesII/timeInfo/timeInfo?id="+ id
				})
			}
		}
	};
</script>

<style>
	.tui-header-box {
		display: flex;
		align-items: center;
		background: #fff;
		font-size: 32rpx;
		color: #393939;
		padding: 0 30rpx;
	}

	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-item-box {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.tui-list-cell_name {
		padding-left: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-ml-auto {
		margin-left: auto;
	}

	.tui-right {
		margin-left: auto;
		margin-right: 34rpx;
		font-size: 26rpx;
		color: #999;
	}

	.tui-logo {
		height: 52rpx;
		width: 52rpx;
		flex-shrink: 0;
	}

	.tui-flex {
		display: flex;
		align-items: center;
	}

	.tui-msg-box {
		display: flex;
		align-items: center;
	}

	.tui-msg-pic {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		display: block;
		margin-right: 24rpx;
		flex-shrink: 0;
	}

	.tui-msg-item {
		max-width: 500rpx;
		min-height: 80rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.tui-msg-name {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 34rpx;
		line-height: 1;
		color: #262b3a;
	}

	.tui-msg-content {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 26rpx;
		line-height: 1;
		color: #9397a4;
	}

	.tui-msg-right {
		max-width: 120rpx;
		height: 88rpx;
		margin-left: auto;
		text-align: right;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}

	.tui-right-dot {
		height: 76rpx !important;
		padding-bottom: 10rpx !important;
	}

	.tui-msg-time {
		width: 100%;
		font-size: 24rpx;
		line-height: 24rpx;
		color: #9397a4;
	}
</style>
