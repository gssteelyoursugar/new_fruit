<template>
	<view >
		<view class=""style="height: 10rpx;">
			
		</view>
		<tui-list-cell  @click="detail" >
			<view class="tui-goods-item">
				<image :src="goodsData.url" class="tui-goods-img"></image>
				<view class="tui-goods-center">
					<view class="tui-goods-name">
						
						<text class="tag-tit" v-for="(item,index) in labelList" :key="index">{{item.name}}</text>
						
						{{goodsData.name}}
						</view>
						<view class="tui-goods-flex">
							<view class="tui-goods-attr">{{goodsData.specification}}×{{goodsData.goods_number}}</view>
							<view class="tui-goods-attr">实付{{goodsData.order_total_price}}元(含运费)</view>
						</view>
					
					
					
				</view>
				
			</view>
		</tui-list-cell>
		<tui-list-cell  last="true">
			<view class="tui-item-box">
				
				<text class="tui-list-cell_name">收货状态</text>
				<view class="tui-right">已确认收货</view>
			</view>
		</tui-list-cell>
		<picker @change="bindPickerChange" :value="index" :range="ValueList">
		<tui-list-cell  :arrow="true" last="true">
			<view class="tui-item-box">
				<text class="tui-list-cell_name">申请原因</text>
				<view class="tui-right">{{ValueList[index]}}</view>
			</view>
		</tui-list-cell>
		</picker>
		<view class="tui-title tui-top40">问题描述</view>
			<view class="tui-textarea-box">
				<textarea class="tui-textarea" name="desc" placeholder="请您在此描述详细问题(可输入100字)" maxlength="100"
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
		  <view class="tui-upload-item tui-upload-add" v-if="files.length < 9" hover-class="tui-opcity" :hover-stay-time="150" @tap="uploadImages">
		    <tui-icon name="plus"></tui-icon>
		  </view>
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
	//请求
	import {listing,publicing,listing2} from '../../api/api.js'
	//请求地址
	import {getDetails,getAfterSaleData,posAfterSale,uploadFiles} from '../../api/request.js'
	var {log} = console
	export default {
		data() {
			return {
				modaishow:false,//隐藏弹窗
				files: [], //最多上传9张图片
				id:'',
				goodsData:{},
				 array: ['中国', '美国', '巴西', '日本'],
				 index: 0,
				 ValueList:[],
				 Describe:"",
				 flag:false,//是否点击上传图片
				 labelList:[],
				
			}
		},
		methods: {
			//返回
			goBack(){
				uni.navigateBack({
					
				})
			},
			//去查看售后订单
			goAfterSale(){
				uni.navigateTo({
					url:'../../pagesII/afterSale/afterSale'
				})
			},
			//上传图片
			chooseImage (e) {
				let that = this;
				if (that.files.length >= 9) {
					log("最多上传9张图片");
					return
				}
				
				uni.chooseImage({
					count: 9 - that.files.length,
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
					console.log('picker发送选择改变，携带值为', e.target.value)
					this.index = e.target.value
					
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
					log(res)
					this.goodsData = res.data.data[0]
					this.labelList = res.data.data[0].labelList
					log(this.labelList)
				})
				.catch((err)=>{
					log(err)
				})
			},
			
			//上传文件
			uploadImages(e){
				log(e)
				this.flag = true
				let that = this;
				if (that.files.length >= 9) {
					log("最多上传9张图片");
					return
				}
				
				//如果用户不点击上传图片，不用传参fileUrls，
				
				uploadFiles((res) => {
					console.log(res.data)//上传文件路径
					that.files=that.files.concat(res.data)
					//that.files.url = res.data//替换路径
					//设置对应的index为true
					// that.urlListFlag[index] = true
				});
			},
			//提交售后
			submitSave(){
				let setdata = uni.getStorageSync('usermen')
				let newArr = this.files.toString()
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
					console.log(res)
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
			console.log(options.id)
			this.id = options.id
			this.getGoods()
			this.getDictValue()
		}
	}
</script>

<style>
	.tui-button-primary{
		border-radius: 60rpx;
		/* 渐变色 */
		background-image: linear-gradient(to right,   rgba(0, 197, 42, 1),rgba(0, 188, 69, 1));
		color: #fff;
		font-size: 32rpx;
	}
	
	.tui-btn-box {
		padding: 40rpx 50rpx;
		box-sizing: border-box;
		background-color: #fff;
	}
	.tui-title {
	  padding: 55rpx 0 30rpx 0;
	  font-size: 26rpx;
	  color: #333;
	  
	  background-color: #fff;
	}
	.tui-upload-box {
		width: 100%;
		padding-bottom: 30rpx;
		display: flex;
		
		flex-wrap: wrap;
		background-color: #fff;
	}
	
	.tui-upload-item {
		margin-left: 20rpx;
		width: 220rpx;
		height: 220rpx;
		position: relative;
		
		
	}
	
	.tui-upload-item:nth-of-type(3n) {
		margin-right: 0;
	}
	
	.tui-upload-img {
		width: 220rpx;
		height: 220rpx;
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
		width: 220rpx;
		height: 220rpx;
		font-size: 68rpx;
		font-weight: 100;
		color: #888;
		background-color: #F7F7F7;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
	}
	/* end */
	.tui-top40 {
	  margin-top: 40rpx;
	  padding-left: 40rpx;
	}
	/*textarea*/
	
	.tui-textarea-box {
		border-radius: 4rpx;
		height: 280rpx;
		box-sizing: border-box;
		padding: 20rpx 20rpx 0 20rpx;
		position: relative;
		background-color: #fff;
	}
	.tui-textarea {
		height: 210rpx;
		width: 100%;
		color: #666;
		font-size: 28rpx;
		z-index: 2;
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
		padding-left: 20rpx;
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
		margin-right: 34rpx;
		font-size: 26rpx;
		color: #999;
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
.tui-goods-item {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}
	.tui-goods-img {
		width: 180rpx;
		height: 180rpx;
		display: block;
		flex-shrink: 0;
	}
	
	.tui-goods-center {
		flex: 1;
		padding: 20rpx 8rpx;
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
	
	.tui-goods-attr {
		font-size: 22rpx;
		color: #888888;
		line-height: 32rpx;
		padding-top: 20rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
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
