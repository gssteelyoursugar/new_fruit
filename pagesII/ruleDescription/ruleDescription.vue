<template>
	<view>
		<view class="tui-paddingTop">
			<tui-list-cell @click="detail" :arrow="true" unlined >
				<view class="tui-item-box">
					<view class="tui-list-cell_name">服务协议</view>
				</view>
			</tui-list-cell>
		</view>
		<view class="tui-paddingTop">
			<tui-list-cell @click="detail" :arrow="true" unlined >
				<view class="tui-item-box">
					<view class="tui-list-cell_name">隐私政策</view>
				</view>
			</tui-list-cell>
		</view>
		<view class="tui-paddingTop">
			<tui-list-cell @click="detail" :arrow="true" unlined >
				<view class="tui-item-box">
					<view class="tui-list-cell_name">关于退货</view>
				</view>
			</tui-list-cell>
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
			detail(){
				uni.showToast({
					icon:'none',
				    title: '待完善',
				    duration: 1000
				});
			
			}
		}
	}
</script>

<style>
page {
		background-color: rgba(245, 245, 245, 1);
	}
	.tui-paddingTop{
		padding-top: 3rpx;
	}
	.tui-title {
		width: 100%;
		padding-left: 20rpx;
		box-sizing: border-box;
		
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.tui-switch {
		transform: scale(0.8);
		transform-origin: 100% center;
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
</style>
