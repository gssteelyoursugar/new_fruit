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
				img1: 'http://qg-qr.oss-cn-shenzhen.aliyuncs.com/test/1599825743093.png?Expires=1915185734&OSSAccessKeyId=LTAI4G74cnhsbDWNkfvuNew3&Signature=SKzdpCezA%2BRAXPDOk2fOrA1iAYA%3D',
				img2: 'http://qg-qr.oss-cn-shenzhen.aliyuncs.com/test/1599825772354.png?Expires=1915185765&OSSAccessKeyId=LTAI4G74cnhsbDWNkfvuNew3&Signature=lUcaUKSt10HwyipxoMSil9C9i1o%3D',
				img3: 'http://qg-qr.oss-cn-shenzhen.aliyuncs.com/test/1599825787322.png?Expires=1915185780&OSSAccessKeyId=LTAI4G74cnhsbDWNkfvuNew3&Signature=gfzIKuRSjSAgJlLculXHxuUJ4HU%3D'
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
