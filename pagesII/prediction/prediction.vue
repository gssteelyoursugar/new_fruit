<template>
	<view class="content">
		<view class="top"></view>
		<view class="container">
			<view class="color top-title">{{title}}</view>
			<view class="color top-title top1" >{{createDate | getTime}}</view>
			<jyf-parser selectable @linkpress="clickLink" :html="content"></jyf-parser>
			
		</view>
	</view>
</template>

<script>
	import {listing2} from '../../api/api.js'
	//请求地址
	import {getPredictInfo} from '../../api/request.js'
	var {log} = console
	export default {
		data() {
			return {
				title:'',
				content:'',
				createDate:'',
				id:''
			}
		},
		filters: {
			getTime(val) {
				let time = new Date(val);
				let y = time.getFullYear();
				let m = time.getMonth() + 1;
				let d = time.getDate();
				let h = time.getHours();
				let mm = time.getMinutes();
				let s = time.getSeconds();
				return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
			}
		},
		methods: {
			getMsgData(id){
				let data = {id}
				listing2(getPredictInfo,data)
				.then((res)=>{
					console.log(res)
					let contents = res.data.data.content
					this.content = contents.replace(/\<image/g, '<image style="width:100%;max-width:100%;height:auto" ');
					this.createDate = res.data.data.time
					this.title = res.data.data.title
				})
				.catch((err)=>{
					log(err)
				})
			},
			clickLink(e){
			}
			
		},
		onLoad(options) {
			this.getMsgData(options.id)
			// this.content= options.content
			// this.createDate= options.createDate
			// this.title= options.title
		},
		//下拉刷新
		 onPullDownRefresh() {
		        setTimeout(function () {
		            uni.stopPullDownRefresh();
		        }, 1000);
		    },
	}
</script>

<style scoped>
	page{
		background-color: #fff;
	}
	.html-content image{
		width: 100%;
	}
	.top{
		height: 20rpx;
		background-color: rgba(245, 245, 245, 1);
	}
	.container{
		margin: 10rpx  20rpx;
	}
	.color{
		color: rgba(57, 57, 57, 1);
		font-weight: 500;
	}
	.size{
		font-size: 28rpx;
	}
	.top1{
		margin-top: 5rpx;
		font-size: 24rpx;
	}
	.top-title{
		margin-bottom:  10rpx;
	}
	.content{
	background-color: #fff;
	
	}
	.html-content{
		margin: 5rpx;
	}
	
	.html-content >>> .img {
	    max-width: 100%;
	    height: auto;
	  }
	
</style>
