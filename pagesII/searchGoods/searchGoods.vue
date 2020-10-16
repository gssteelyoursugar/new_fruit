<template>
	<view class="container">
		<view class="tui-searchbox">
			<view class="tui-search-input">
				<icon type="search" :size='13' color='#333'></icon>
				<input confirm-type="search" placeholder="搜索您要购买的商品或类型" placeholder-class="tui-input-plholder" class="tui-input"
				 v-model="key" @confirm="inputKey" />
				<icon type="clear" :size='13' color='#bcbcbc' @tap="cleanKey" v-show="key"></icon>
			</view>
			<view class="tui-cancle" @tap="inputKey">搜索</view>
		</view>

		<view class="tui-search-history" v-show="history.length>0 && !key">
			<view class="tui-history-header">
				<view class="tui-search-title">搜索历史</view>
			</view>
			<view class="tui-history-content">
				<block v-for="(item,index) in history" :key="index">
					<tui-tag @click="clickItem(item)" style="color: #555;" margin="0 24rpx 24rpx 0" type="gray" shape="circle">{{item}}</tui-tag>
				</block>
			</view>
			<!-- <tui-icon name="delete" :size='14' color='#333'  class="tui-icon-delete"></tui-icon> -->
			<view class="clear-all" v-if="history.length !== 0 && !key" @tap="openActionSheet">
				<image src="../../static/images/clean.png" mode=""></image>
				<text>清空历史记录</text>
			</view>
		</view>


		<view class="tui-search-hot">
			<view class="tui-hot-header">
				<view class="tui-search-title">热门搜索</view>
			</view>
			<view class="tui-hot-content">
				<view class="tui-result-box">
					<block v-for="(item,index) in hot" :key="index">
						<view @click="clickItem(item)" class="tui-result-item" hover-class="tui-opcity" :hover-stay-time="150">
							<rich-text :nodes="item"></rich-text>
						</view>
					</block>
				</view>
			</view>
		</view>
		<tui-actionsheet :show="showActionSheet" :tips="tips" @click="itemClick" @cancel="closeActionSheet"></tui-actionsheet>
	</view>

</template>

<script>
	const util = require("@/utils/util.js")
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				// 热门搜索
				hot: [
					"芒果",
					"哈密瓜",
					"火龙果",
					"蜜柚"
				],
				key: "",
				showActionSheet: false,
				tips: "确认清空搜索历史吗？",
				//搜索历史列表
				searchResult: [
					// "按照展示的列表输入关键词看效果","thorui","2019退役球星","搜索关键词高亮显示","模拟搜索结果集","开源不易，需要鼓励","人人为我，我为人人",
				],
			}
		},
		computed: {
			...mapState(['history'])
		},
		methods: {
			...mapMutations(['saveSearch', 'clearSearch']),
			clickItem(val) {
				this.saveSearch({
					data: val
				})
				this.key = ""
				uni.navigateTo({
					url: '../../pagesII/productList/productList?name=' + val
				})

			},
			back: function() {
				uni.navigateBack();
			},
			cleanKey: function() {
				this.key = ''
			},
			closeActionSheet: function() {
				this.showActionSheet = false
			},
			openActionSheet: function() {
				this.showActionSheet = true
			},
			itemClick: function(e) {
				let index = e.index;
				if (index == 0) {
					this.showActionSheet = false;
					this.clearSearch()
				}
			},
			inputKey(e) {
				let name = e.detail.value || this.key
				let that = this
				console.log(name)
				if (name === '') {
					uni.showToast({
						title: "请输入关键词",
						icon: "none"
					})
					return
				}
				let result = name.trim()
				uni.navigateTo({
					url: '../../pagesII/productList/productList?name=' + result,
					success: function() {
						that.saveSearch({
							data: result
						})
						that.key = ""
					}
				})

			}
		},
		onLoad(options) {
			console.log(this.history)
		}
	}
</script>

<style>
	page {
		color: #333;
		background: #fff;
	}

	.container {
		padding: 0 30rpx 30rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-searchbox {
		padding: 30rpx 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-search-input {
		width: 100%;
		height: 66rpx;
		border-radius: 35rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background: #f2f2f2;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		background: #F5F5F5;

	}

	.tui-input {
		flex: 1;
		color: #333;
		padding: 0 16rpx;
		font-size: 28rpx;
	}

	.tui-input-plholder {
		font-size: 28rpx;
		color: #b2b2b2;
	}

	.tui-cancle {
		color: #333;
		font-size: 28rpx;
		padding-left: 10rpx;
		flex-shrink: 0;
	}

	.tui-history-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 0;
	}

	.tui-history-content {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.clear-all {
		margin: 60rpx 0 20rpx;
		justify-content: center;
		display: flex;
		align-items: center;
		color: #999;
		font-size: 24rpx;
	}

	.clear-all image {
		width: 22rpx;
		height: 22rpx;
		margin-right: 6rpx;
	}

	.tui-icon-delete {
		padding: 10rpx;
	}

	.tui-search-title {
		font-size: 28rpx;
		font-weight: bold;
	}

	.tui-hot-header {
		padding: 30rpx 0;
	}

	.tui-header {
		padding: 26rpx 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-header-left {
		font-size: 30rpx;
		color: #222;
		border-left: 4rpx solid #EB0909;
		padding-left: 10rpx;
		word-break: break-all;
	}

	.tui-noboredr {
		border-left: 0 !important;
	}

	.tui-result-box {
		font-size: 28rpx;
		display: flex;
		flex-wrap: wrap;
	}

	.tui-result-item {
		line-height: 28rpx;
		padding: 14rpx 20rpx;
		background: #f5f5f5;
		color: #555;
		font-size: 28rpx;
		margin: 10rpx 30rpx 10rpx 0rpx;
		border-radius: 40rpx;

	}
</style>
