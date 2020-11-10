<template>
	<view >
		<view class=""style="height: 10px;">
			
		</view>
		<view class="tui-time-title"><text class="title-time-left font-size-color">订单号: {{goodsData.order_number}}</text>
		 <text class="iconfont icon-lujing182" @click="clipboard(goodsData.order_number)"></text>
		 </view>
		<tui-list-cell  @click="detail" >
			<view class="tui-goods-item">
				<image :src="goodsData.url" class="tui-goods-img"></image>
				<view class="tui-goods-center">
						<view class="tui-goods-name">
						<text class="tag-tit" v-for="(item,index) in labelList" :key="index">{{item.name}}</text>
						<text class="tag-tit2">{{goodsData.name}}</text>
						</view>
						<view class="lineH">
							<text class="speci">{{goodsData.specification}}</text><text>×</text><text class="goodsnum">{{goodsData.goods_number}}</text>
							
						</view>
						<view class="tui-goods-flex">
							<view class="tui-goods-attr1"> <text class="yuanicon">￥</text> <text class="yuanPrice">{{goodsData.goods_price}} </text> <text class="yuanText">元</text> </view>
							<view class="tui-goods-attr">实付:<text class="fontTotal">{{goodsData.order_total_price}}</text> (免运费)</view>
						</view>
				</view>
				
			</view>
		</tui-list-cell>
		<tui-list-cell  last="true">
			<view class="tui-item-box">
				
				<text class="tui-list-cell_name">收货状态</text>
				<view class="tui-right" v-if="goodsData.delivery_status == 6">已确认收货</view>
				<view class="tui-right" v-if="goodsData.delivery_status == 0">未确认收货</view>
			</view>
		</tui-list-cell>
		<picker @change="bindPickerChange" :value="index" :range="ValueList" >
		<tui-list-cell  :arrow="true" last="true" @tap="bindPicker">
			<view class="tui-item-box">
				<text class="tui-list-cell_name">申请原因</text>
				<input type="text" :value="ValueText"   class="tui-input" disabled="flase" :class="{ activeColor: flagColor }"/>
				<!-- <view class="tui-right2" >{{ValueList[index]}}</view> -->
			</view>
		</tui-list-cell>
		</picker>
		<view class="tui-title tui-top40">问题描述 <text class="redicon">*</text> </view>
			<view class="tui-textarea-box">
				<textarea class="tui-textarea" name="desc" :placeholder="textTip" maxlength="100"
				 v-model="Describe" 
				 placeholder-class="tui-phcolor-color" />
				<!-- <view class="tui-textarea-counter">最多500字</view> -->
		</view>
		<view class="tui-title tui-top40">上传凭证</view>
		<!-- 上传 -->
		<view class="tui-upload-box">
			
		  <view class="tui-upload-item" v-for="(item,index) in files" :key="index">
		    <image :src="item" class='tui-upload-img' @tap="previewImage" mode="aspectFill" :id="item"></image>
		    <view class="tui-upload-del">
				<tui-icon color="#ed3f14" :size="18" name="close-fill"  :index="index" @click="deleteImage"></tui-icon>
			</view>
		  </view>
		  
		 
		  <view class="tui-upload-item tui-upload-add" v-if="files.length < 5" hover-class="tui-opcity" :hover-stay-time="150" @tap="uploadImages">
			  <image src="../../static/images/upImg.png" mode="aspectFill" class="imgup"></image>
		    <!-- <tui-icon name="plus"></tui-icon> -->
		  </view>
		  <easy-upload
		     :dataList="imageList" uploadUrl="url" :types="category"
		     deleteUrl='url' :uploadCount="1"
		     @successImage="successImage" @successVideo="successVideo"
		     ></easy-upload> 
		</view>
		
		<view class="tui-btn-box">
			<button class="tui-button-primary"  @tap="submitSave">提交</button>
		</view>
		<view class="warp" v-if="modaishow">
			<view class="warp-view">
				<view class="warp-text1">温馨提示</view>
				<view class="warp-text">申请已提交处理</view>
				<view class="warp-flex">
					<button @click="goBack" plain="true" class="color-green"> 返回</button>
					<button @click="goAfterSale" plain="true"  class="color-green">去查看</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const thorui = require("@/common/tui-clipboard/tui-clipboard.js")
	//请求
	import {listing,publicing,listing2} from '../../api/api.js'
	//请求地址
	import {getDetails,getAfterSaleData,posAfterSale,uploadFiles} from '../../api/request.js'
	var {log} = console
	export default {
		data() {
			return {
				textTip:'请您在此描述详细问题(可输入100字)',
				imageList: [],
				category: 'video',
				modaishow:false,//隐藏弹窗
				files: [], //最多上传9张图片
				id:'',
				goodsData:{},
				 array: ['中国', '美国', '巴西', '日本'],
				 index: 0,
				 ValueList:[],
				 ValueText:'请选择申请原因',//默认值
				 Describe:"",
				 flag:false,//是否点击上传图片
				 labelList:[],
				 VideoDatas:'',//视频上传得到的地址
				 flagColor:false
				
			}
		},
		methods: {
			
			//子组件数据
			successVideo(e){
				
				let videoData = JSON.parse(e.data)
				this.VideoDatas = videoData.data
				log(this.VideoDatas)
				// this.uploadFileResData = JSON.parse(uploadFileRes.data)
			},
			//返回
			goBack(){
				uni.navigateBack({
					
				})
			},
			//复制
			//event 当需要异步请求返回数据再进行复制时，需要传入此参数，或者异步方法转为同步方法（H5端）
			clipboard(event) {
				let data= event;
				thorui.getClipboardData(data, (res) => {
					// #ifdef H5 || MP-ALIPAY
					if (res) {
						this.tui.toast("复制成功")
					} else {
						this.tui.toast("复制失败")
					}
					// #endif
					},event)
				},
			//去查看售后订单
			goAfterSale(){
				uni.redirectTo({
					url:'../../pagesIII/navbar/navbar'
				})
			},
			//上传图片
			chooseImage (e) {
				let that = this;
				if (that.files.length >= 5) {
					log("最多上传9张图片");
					return
				}
				
				uni.chooseImage({
					count: 5 - that.files.length,
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function (res) {
						log(res)
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						that.files=that.files.concat(res.tempFilePaths)
						//上传功能已移除
						//...
					}
				})
			},
			//选择器
			bindPickerChange: function(e) {
				log(e)
				//  for ( var i = 0; i <this.ValueList.length; i++){
				// }
					this.index = e.target.value
					this.ValueText = this.ValueList[e.target.value]
					this.flagColor = true
					
				},
				//获取下拉申请原因
				bindPicker(){
				},
				//获取商品售后
			getGoods(){
				let setdata = uni.getStorageSync('usermen')
				let data ={
					id:this.id,
					token:setdata
				}
				listing(getDetails,data)
				.then((res)=>{
					this.goodsData = res.data.data[0]
					this.labelList = res.data.data[0].labelList
				})
				.catch((err)=>{
					log(err)
				})
			},
			
			//上传文件
			uploadImages(e){
				this.flag = true
				let that = this;
				if (that.files.length >= 5) {
					log("最多上传5张图片");
					return
				}
				
				//如果用户不点击上传图片，不用传参fileUrls，
				
				uploadFiles((res) => {
					that.files=that.files.concat(res.data)
					//that.files.url = res.data//替换路径
					//设置对应的index为true
					// that.urlListFlag[index] = true
				});
			},
			
			//提交售后
			submitSave(){
				if( this.flagColor == false){
					uni.showToast({
						title:'请选择申请原因',
						icon:'none',
						duration:2000
					})
					return
				}else if(this.Describe == ""){
					uni.showToast({
						title:'填写描述',
						icon:'none',
						duration:2000
					})
					return
				}else{
					log('成了')
					
					let setdata = uni.getStorageSync('usermen')
					let newArr = this.files.toString()+','+ this.VideoDatas //上传图片和视频
					log(newArr)
					let data ={
						orderItemId:this.id,
						afterSaleDescribe:this.Describe,  //售后描述
						cause:this.index,//原因
						fileUrls:newArr,
						token:setdata
					}
					
					
					//判断用户是否点击上传图片，是否要传fileUrls,flase不传值
					if(this.flag == false){
						delete data.fileUrls
						log('没有上传图片')
					}else if(this.flag == true){
						log('点击了上传图片')
					}
					log(data)
					
					publicing(posAfterSale,data)
					.then((res)=>{
						log(res)
						let code = res.data.code
						if(code ==200){
							 this.Describe = ""
							 this.textTip = ""
							 this.modaishow = true
						}else{
							uni.showToast({
								title:'申请失败',
								icon:'none',
								duration:2000
							})
						}
						
					})
					.catch((err)=>{
						log(err)
					})
				}
			
			},
			previewImage: function (e) {
				uni.previewImage({
					current: e.currentTarget.id, 
					urls: this.files 
				})
			},
			deleteImage: function (e) {
				const index = e.index;
				this.files.splice(index, 1);
			},
			//获取选择参数
			getDictValue(){
				let setdata = uni.getStorageSync('usermen')
				let data ={
					id:this.id,
					token:setdata
				}
				//不带token
				listing2(getAfterSaleData)
				.then((res)=>{
					this.ValueList = res.data.data.data
					let new_arr = this.ValueList.map(obj => {return obj.treeNames})//提取数组里面的每一项里面的id
					
					this.ValueList = new_arr
					log(this.ValueList)
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			
		},
		onLoad(options) {
			this.id = options.id
			this.getGoods()
			this.getDictValue()
		}
	}
</script>

<style>
	.activeColor{
		color: rgba(51, 51, 51, 1)!important;
	}
	.tui-input {
		font-size: 28rpx;
		color: rgba(182, 182, 182, 1);
		margin-right: 20rpx;
		font-weight: 400;
		flex: 1;
		overflow: visible;
		text-align: right;
	}
	.tui-button-primary{
		border-radius: 60rpx;
		/* 渐变色 */
		background-image: linear-gradient(to right,   rgba(0, 197, 42, 1),rgba(0, 188, 69, 1));
		color: #fff;
		font-size: 32rpx;
	}
	
	.tui-btn-box {
		position: fixed;
		width: 100%;
		bottom: 0;
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #fff;
	}
	.tui-btn-box button {
		height: 55px;
		line-height: 3.55;
	}
	.tui-title {
	  padding: 20rpx 0 20rpx 0;
	  font-size: 28rpx;
	  color: rgba(51, 51, 51, 1);
	  font-weight: 400;
	  background-color: #fff;
	}
	.tui-upload-box {
		width: 100%;
		padding-bottom: 130rpx;
		display: flex;
		
		flex-wrap: wrap;
		background-color: #fff;
	}
	
	.tui-upload-item {
		margin: 0 0 20rpx 20rpx;
		width: 168rpx;
		height: 168rpx;
		position: relative;
		
		
	}
	
	.tui-upload-item:nth-of-type(3n) {
		margin-right: 0;
	}
	
	.tui-upload-img {
		width: 168rpx;
		height: 168rpx;
		display: block;
	}
	
	.tui-upload-del {
		position: absolute;
		right: -18rpx;
		top: -18rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.tui-upload-add {
		width: 168rpx;
		height: 168rpx;
		font-size: 68rpx;
		font-weight: 100;
		color: #888;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
	}
	/* end */
	.tui-top40 {
	  margin-top: 10px;
	  padding-left: 40rpx;
	}
	.imgup{
		width: 100%;
		height: 100%;
	}
	.redicon{
		color: rgba(255, 0, 0, 1);
		font-size: 28rpx;
	}
	/*textarea*/
	
	.tui-textarea-box {
		border-radius: 4rpx;
		height: 180rpx;
		box-sizing: border-box;
		padding: 0rpx 20rpx 0 40rpx;
		position: relative;
		background-color: #fff;
	}
	.tui-textarea {
		height: 180rpx;
		width: 100%;
		color: rgba(182, 182, 182, 1);
		font-size: 28rpx;
		font-weight: 400;
		
	}
	.tui-phcolor-color {
		color: #ccc !important;
	}
	.tui-textarea-counter {
		font-size: 24rpx;
		color: #999;
		text-align: right;
		height: 40rpx;
		line-height: 40rpx;
		padding-top: 4rpx;
	}
	.tui-list-cell_name {
		color: rgba(51, 51, 51, 1);
		font-size: 28rpx;
		font-weight: 400;
		padding-left: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tui-item-box {
		width: 100%;
		display: flex;
		align-items: center;
	}
	.tui-right {
		margin-left: auto;
		
		font-size: 28rpx;
		color:rgba(51, 51, 51, 1);
		font-weight: 400;
	}
	.tui-right2{
		margin-left: auto;
		margin-right: 34rpx;
		font-size: 14px;
		color:rgba(51, 51, 51, 1);
		font-weight: 400;
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
		color: rgba(51, 51, 51, 1);
		font-size: 16px;
	}
.tui-goods-item {
		width: 100%;
		padding: 20rpx 0rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}
	.tui-goods-img {
		width: 140rpx;
		height: 140rpx;
		display: block;
		flex-shrink: 0;
	}
	
	.tui-time-title{
		padding: 10rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-bottom: 1rpx solid #F5F5F5;
		background-color: #fff;
		
	}
	.title-time-left{
		margin-left: 10rpx;
		color: #707070;
	}
	.font-size-color{
		color: rgba(85, 85, 85, 1);
		font-size: 24rpx;
	}
	.icon-lujing182{
		font-size: 24rpx;
		color: rgba(182, 182, 182, 1);
		margin-left: 12rpx;
	}
	
	.tui-goods-center {
		flex: 1;
		padding: 0rpx 8rpx;
		box-sizing: border-box;
	}
	
	.tui-goods-name {
		/* max-width: 310rpx; */
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 26rpx;
		line-height: 32rpx;
	}
	.lineH{
		line-height: 24px;
	}
	.speci{
		color: rgba(51, 51, 51, 1);
		font-size: 12px;
	}
	.goodsnum{
		font-size: 14px;
		color: rgba(51, 51, 51, 1);
	}
	
	.tui-goods-attr {
		font-size: 12px;
		color: rgba(102, 102, 102, 1);
		line-height: 32rpx;
		padding-top: 20rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.fontTotal{
		color: rgba(51, 51, 51, 1);
		font-size: 14px;
		font-weight: 500;
		margin-left: 4rpx;
	}
	.tui-goods-attr1{
		
		color: rgba(255, 86, 0, 1);
		line-height: 32rpx;
		padding-top: 20rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.yuanicon{
		font-size: 8px;
	}
	.yuanPrice{
		font-size: 16px;
		font-weight: bold;
	}
	.yuanText{
		font-size: 12px;
	}
	.tui-goods-flex{
		display: flex;
		justify-content: space-between;
	}
	
	.tui-price-right {
		text-align: right;
		font-size: 24rpx;
		color: #888888;
		line-height: 30rpx;
		padding-top: 20rpx;
	}
	
	.tui-color-red {
		color: #E41F19;
		padding-right: 30rpx;
	}
	
	.tui-goods-price {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		font-size: 24rpx;
	}
	
	.tui-size-24 {
		font-size: 24rpx;
		line-height: 24rpx;
	}
	
	.tui-price-large {
		font-size: 32rpx;
		line-height: 30rpx;
		font-weight: 500;
	}
	
	.tui-order-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background: #fff;
		padding: 10rpx 30rpx 20rpx;
		box-sizing: border-box;
	}
	
	.tui-btn-ml {
		margin-left: 20rpx;
	}
	
	/* 模态弹窗布局 */
	.warp{position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background: rgba(0,0,0,0.6);
	z-index: 9999;}
	.warp-view{width: 500upx;
			height: 260upx;
			background: #FFFFFF;
			margin: auto;
			position: absolute;
			-webkit-position:absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			border-radius: 8upx;
			overflow: hidden;
			}
	.warp-text{
		text-align: center;
		margin-top: 34upx;
		font-size: 34upx;
		color: #666666;
			}
	.warp-text1{
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 34upx;
		color: #fff;
		background-color: rgba(0, 197, 42, 1);
			}		
	.warp-flex{ display: flex;
		justify-content: space-around;
		border-top: 1upx solid #EEEEEE;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80upx;
		line-height: 80upx;
		}
		.color-green{
			color: rgba(0, 197, 42, 1);
		}
	.warp-flex button{border: none;
	font-size: 30upx;
	}
		.warp-flex button:nth-child(2){
			color: rgba(0, 197, 42, 1);
		}
	/*end  */
</style>
