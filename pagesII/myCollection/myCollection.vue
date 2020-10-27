<template>
	<view>
		<view class="container-img " v-if="likeDatas.length == 0">
			<image src="../../static/images/orderBMG.png" mode="widthFix"></image>
			<text class="color-text">最近没有收藏过商品~</text>
		</view>
		<view class="container-img" v-if="modaishow">
				<image src="../../static/images/quanguo.png" mode="widthFix" class="img-quanguo"></image>
				<!-- <text class="color-text">{{tips}}</text> -->
				<view class="btnbox">
					<button class="btn" type="default"  open-type="getUserInfo" @getuserinfo="getUserInfo">去登录</button>
				</view>
				
		</view>
		<view class="tui-tab-rank" >
			<!-- <view class="tui-time-title">
				<text class="title-time-left">2020年9月6日</text> 
			</view> -->
		<view class="tui-tab-rank-cent" v-for="(item,index) in likeDatas" :key="index">
			<image :src="item.url" mode="aspectFill" class="img-rink"></image>
			<view class="tui-pro-tit">
				<text class="tag-tit">{{item.lableName}}</text> <text class="tag-tit-text">{{item.name}}</text>
				<view class="tag-tit2">
					<view class="">
						<view class="tag-tit2-price">
							{{item.kg1}}斤装
						</view>
						<view class="tag-tit2-text">
							 <text class="price1">￥{{ApproveStatus===1?item.platformClientPrice:'***'}}元</text><text class="price2">/件</text>
						</view>
					</view>
					<image  src="../../static/images/like1.png"  mode="aspectFill" class="tui-shop-car" v-if="showLike" @tap="delLike(item.goodsId)"></image>
					<image src="../../static/images/like2.png" mode="aspectFill" class="tui-shop-car" v-if="!showLike"></image>
					
					<!-- <view>购物车</view> -->
				</view>
				
			</view>
		</view>
		
		</view>
		
	<!-- 	
		<view class="tui-tab-rank" >
			<view class="tui-time-title"><text class="title-time-left">2020年9月6日</text> </view>
		<view class="tui-tab-rank-cent">
			<image src="../../static/images/ranking.png" mode="aspectFill" class="img-rink"></image>
			<view class="tui-pro-tit">
				<text class="tag-tit">采手精选</text> <text class="tag-tit-text">葡萄回复的伤口缝合公司的讲课风格</text>
				<view class="tag-tit2">
					<view class="">
						<view class="tag-tit2-price">
							5斤装 × 1
						</view>
						<view class="tag-tit2-text">
							 <text class="price1">￥108元</text><text class="price2">/件</text>
						</view>
					</view>
					<image src="../../static/images/like2.png" mode="aspectFill" class="tui-shop-car"></image>
					<view>购物车</view>
				</view>
				
			</view>
		</view>
		</view> -->
		
	</view>
</template>

<script>
	//请求方式
	import {listing,publicing,publicing2} from '../../api/api.js'
	//请求地址
	import {getLike,postDelLike,loginis,getClient} from '../../api/request.js'
	var setdata = uni.getStorageSync('usermen')
	var {log} = console
	export default {
		data() {
			return {
				tips: '',
				modaishow:false,
				isCollection:false,
				isActive:true,//显示
				hasError: false,//隐藏
				showLike:true,
				url:'http://192.168.1.10:8980/',
				likeDatas:[],
				ApproveStatus: 0
				
			}
		},
		methods: {
			getMerchants() {
				let data = {
					token: setdata
				};
				// log(data)
				listing(getClient, data)
					.then(res => {
						// log(res)
						///登录成功后显示去认证店铺，如果已认证，显示已认证店铺
						this.ApproveStatus = res.data.data.approveStatus; //获取状态码，0未认证，1已认证，2拒绝
						// log(this.ApproveStatus)
					})
					.catch(err => {
						log(err);
					});
			},
			//反馈提示
			tising(bull,tips){
				this.init(bull,tips)
			},
			init(bull,tips){
				this.modaishow = bull
				this.tips = tips
			},
			//获取头像昵称
			getUserInfo(event){
				log(event)
				 this.usering= event.detail.userInfo
				uni.setStorageSync('userIN',event.detail.userInfo)//把头像存在本地，小程序提供如同浏览器cookie
				let userING = uni.setStorageSync('userIN',event.detail.userInfo)
				if(event.detail.userInfo){
					let wxing = event.detail.userInfo
					this.wxCode(wxing.avatarUrl,wxing.nickName)
				}
				// wx.startPullDownRefresh()
				
				log('dddddddddd')
				
				
			},
			//获取code
			wxCode(avatarUrl,nickName){
				wx.login ({
					success: (res)=>{
						log(res)
						let code = res.code
						this.wxLoging(code)
					},
					fail:(err)=>{
						log(err)
					}
				})
				
			},
			//发code给后台换取token
			wxLoging(code){
				log(code)
							
				// let appid = wx.getAccountInfoSync().miniProgram.appId
				// let secret = "956f8c9345cbe06a42c6494f7bb53f7f"
				let data = {
					code,
				}
							uni.showLoading({
								title:'加载中',
								icon:'none'
								// mask:true
							})
				publicing2(loginis,data)//发送请求携带参数
				.then((res)=>{
								if(res.statusCode == 500){
									uni.showModal({
									    title: '提示',
									    content: '服务器错误，请重新登录获取信息',
									    success: function (res) {
									        if (res.confirm) {
												uni.hideLoading();
									        } else if (res.cancel) {
												uni.hideLoading();
									        }
									    }
									});
									return
								
								}else if(res.statusCode == 200){
									
									log(res)
								}
								
					log(res)//获得token
					uni.setStorageSync('usermen',res.data.token)//把token存在本地，小程序提供如同浏览器cookie
								uni.hideLoading();
								this.modaishow = false
								this.getLikeData()
								
								
				
				})
				.catch((err)=>{
								uni.showToast({
									title:`${err}`
								})
								
					log(err)
				})
							
			},
			//获取收藏列表
			getLikeData(){
				var setdata = uni.getStorageSync('usermen')
				let data = {
					token:setdata
				}
				listing(getLike,data)
				.then((res)=>{
					log( res.data.data)
					this.likeDatas = res.data.data
					log(this.likeDatas)
					
				})
				.catch((err)=>{
					log(err)
				})
			},
			//删除收藏
			delLike(goodsId){
				var setdata = uni.getStorageSync('usermen')
				let data ={
					goodsId:goodsId,
					token:setdata
				}
				uni.showModal({
				    title: '提示',
				    content: '取消收藏这件宝贝，确定吗？',
				    success:(res)=> {
				        if (res.confirm) {
							publicing(postDelLike,data)
							.then((res)=>{
								log(res.data.msg)
								uni.showToast({
									title:`删除${res.data.msg}`
								})
								this.getLikeData()
							})
							.catch((err)=>{
								log(err)
							})
				        } else if (res.cancel) {
							
				        }
				    }
				});
			},
			
		},
		onShow() {
			this.getMerchants()
			let setdata = uni.getStorageSync('usermen')
			log(setdata)
			if(!setdata){
				this.hasError = true
				this.isActive = false
				let bull = true
				let tips = '请登录后再查看'
				this.tising(bull,tips)
			}else{
				let bull = false
				let tips = ''
				this.tising(bull,tips)
				
				 this.getLikeData()
				 log('显示订单')
			}	
			
		}
	}
</script>

<style>
	/* 隐藏 */
	.text-danger{
		display: none!important;
	}
	/* 显示 */
	.active{
		display: block;
	}
	.price1{
		color: #FF5600;
		font-size: 24rpx;
		font-weight: 600;
	}
	.price2{
		color: #B6B6B6;
		font-size: 24rpx;
	}
	.tui-tab-rank{
		background-color: #fff;
		margin: 20rpx 0;
		
	}
	.tui-time-title{
		height: 60rpx;
		line-height: 60rpx;
		border-bottom: 1rpx solid #F5F5F5;
		
	}
	.title-time-left{
		margin-left: 20rpx;
		color: #707070;
	}
	.tui-tab-rank-cent{
		display: flex;
		padding: 20rpx;
		align-items: center;
	}
	.img-rink{
		width: 180rpx;
		height: 180rpx;
		display: block;
		margin-right: 20rpx;
	}
	.tui-pro-tit {
		flex: 5;
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
	.tag-tit2{
		display: flex;
		justify-content: space-between;
	}
	.tag-tit2-price{
		color: #555555;
		font-size: 24rpx;
	}
	.tag-tit2-text{
		color: ##FF5600;
		font-size: 24rpx;
	}
	.tui-shop-car{
		width: 51rpx;
		height: 48rpx;
		display: block;
	}
	.tag-tit-text{
		font-size: 28rpx;
		color: #333;
	}
	
	/* ==== */
	.order-no{width: 400upx; height: 400upx;
	margin: 90upx auto 0 auto;
	text-align: center;
	font-size: 28upx;}
	.order-no image{display: block;
	width: 250upx; height: 250upx;
	margin: 0 auto;
	padding-bottom: 30upx;
	}
	
	
	.container-img{
		margin-top: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.img-quanguo{
		height: 600rpx;
		width: 300rpx;
		
	}
	
	.color-text{
		color: rgba(112, 112, 112, 1);
	}
	
	.btnbox{
		position: relative;
		top: 100rpx;
		width: 100%;
	}
	button::after {
	
	/* border: 2rpx solid #00AC3F; */
	
	}
	
	button {
	background-color: #fff!important;
	/* background-color: transparent; */
	
	padding-left: 0;
	
	
	padding-right: 0;
	
	line-height:inherit;
	
	}
	
	button {
	
	border-radius:0;
	
	}
	.btn{
		border-radius: 100rpx;
		height: 60rpx;
		width: 30%;
		background-color: #FFFFFF;
		border: 1rpx solid rgba(0, 197, 42, 1);
		color: rgba(0, 197, 42, 1)!important;
		padding: 10rpx 0;
		font-size: 30rpx;
	}
</style>
