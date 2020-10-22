<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://www.baidu.com'
			}
		},
		methods: {
			
		},
		onLoad (options) {
			this.url = options.url
			console.log(options.url)
		}
	}
</script>

<style>

</style>
