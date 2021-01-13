<template>
	<view>
		<view class="centen">
			<view class="imgWidth">
				<image :src="img1" mode="widthFix"></image>
			</view>
			<view class="imgWidth">
				<image :src="img2" mode="widthFix"></image>
			</view>
			<view class="imgWidth">
				<image :src="img3" mode="widthFix"></image>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchKey: '',
				img1: 'https://qg-qr.oss-cn-shenzhen.aliyuncs.com/test/1609927390266.png?Expires=1925287389&OSSAccessKeyId=LTAI4G74cnhsbDWNkfvuNew3&Signature=ZG23vinx%2B7dXdvZBZDkraJZh8Uw%3D',
				img2: 'https://qg-qr.oss-cn-shenzhen.aliyuncs.com/test/1609927695970.png?Expires=1925287695&OSSAccessKeyId=LTAI4G74cnhsbDWNkfvuNew3&Signature=V%2BYRmHE94sqPhTGhYt0DxqiLj3Q%3D',
				img3: 'https://qg-qr.oss-cn-shenzhen.aliyuncs.com/test/1609927714719.png?Expires=1925287712&OSSAccessKeyId=LTAI4G74cnhsbDWNkfvuNew3&Signature=Fll6xIgg%2FpOHSdWmXHhLqWRMZD0%3D'
			}
		},
		methods: {

		},
		onLoad(option) {
			this.searchKey = option.name
		},
		// 下拉刷新
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 500);
		}

	}
</script>

<style>
	.centen {
		text-align: center;
	}

	.imgWidth {
		margin: 30rpx 20rpx;
		width: 710rpx;
	}

	.imgWidth image {
		height: 400rpx;
		width: 710rpx;
		vertical-align: top;
	}
</style>
