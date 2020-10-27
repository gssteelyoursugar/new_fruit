<template>
	<view class="agreement-container">
		<view class="agreement-content">
			<jyf-parser selectable @linkpress="clickLink" :html="info.content"></jyf-parser>
		</view>
	</view>
</template>

<script>
	import {
		listing2,
	} from '../../api/api.js'
	import {
		getAgreeInfo
	} from '../../api/request.js'
	export default {
		data() {
			return {
				info: {}
			}
		},
		onLoad(opt) {
			this.getAgreeInfo(opt.id)

		},
		methods: {
			getAgreeInfo(id) {
				let data = {
					id: id
				}
				listing2(getAgreeInfo, data).then(res => {
					this.info = res.data.data
					uni.setNavigationBarTitle({
						title: res.data.data.title
					});
				})
			}
		}
	}
</script>

<style scoped>
	
	.agreement-container {
		padding: 20rpx;
		line-height: 40px;
		font-size: 30rpx;
	}

</style>
