<template>
	<view style="padding: 0 100rpx;background-color: #fff;">
		<!-- <view style="border-radius: 10rpx;" class="cu-progress round sm striped active">
			<view class="bg-cyan" :style="[{ width:loading?'60%':''}]">90</view>
		</view> -->
		
		<goodsSwiper :datas="detail" :config="config" @change="swiperChange" @tapFun="tapFun"></goodsSwiper>
		
	</view>
</template>

<script>
	//请求
	import {listing} from '../../api/api.js'
	//请求地址
	import {getIndex} from '../../api/request.js'
	export default {
		data() {
			return {
				detail:[
					{
						title:'我是标题'
					},
					{
						title:'我是标题'
					},
					{
						title:'我是标题'
					}
					
				
				],
				
				url:'http://192.168.1.10:8980/js/',
				WxIndexViewpager:[],
				ColorList: this.ColorList,
				color: 'red',
				loading: false,
				modalName: '',
				active: false,
				currentIndex: 0
			};
		},
		onLoad: function() {
			this.getListData()
			let that = this;
			setTimeout(function() {
				that.loading = true
			}, 500)
		},
		methods: {
			
			getListData(){
				let data ={
					pageNo:'1',
					pageSize:'10000',
					indexClassify:'2'
				}
				
				listing(getIndex,data)
				.then((res)=>{
					this.WxIndexViewpager = res.data.data.WxIndexViewpager
					
					// this.HotVarieties = res.data.data
				})
				.catch((err)=>{
					
					console.log(err)
				})
				
			},
			
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			SetColor(e) {
				this.color = e.currentTarget.dataset.color;
				this.modalName = null
			},
			SetActive(e) {
				this.active = e.detail.value
			},
		}
	}
</script>

<style>
	
	@import '/common/css/main.css';
	
</style>
