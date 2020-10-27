<template>
	<view class="container">
		<tui-list-view title="为了给您提供更好的服务，请填写真实的店铺信息" color="#777">
			<tui-list-cell  :hover="false">
				店铺信息
			</tui-list-cell>
		</tui-list-view>
		<form @submit="postsaveStores" @reset="formReset">
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">店铺名称：</view><text>*</text>
					<input placeholder-class="tui-phcolor" class="tui-input" name="storeName" :placeholder="storeName" maxlength="50" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">收货人：</view><text>*</text>
					<input placeholder-class="tui-phcolor" class="tui-input" name="merchantsName" :placeholder="merchantsName" maxlength="50" type="text" />
				</view>
			</tui-list-cell>
			
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">手机号：</view><text>*</text>
					<input placeholder-class="tui-phcolor" class="tui-input" name="phone" :placeholder="phone" maxlength="50" type="number" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">所在地区：</view><text>*</text>
					<input placeholder-class="tui-phcolor" class="tui-input" name="address" :placeholder="address" maxlength="50" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">详细地址：</view><text>*</text>
					<input placeholder-class="tui-phcolor" class="tui-input" name="address2" placeholder="请填写详细地址" maxlength="50" type="text" />
				</view>
			</tui-list-cell>
		
		<!-- 上传 -->
		<tui-list-view title=" " color="#777">
			<tui-list-cell  :hover="false">
				店铺照片
			</tui-list-cell>
		</tui-list-view>
		<view class="tui-box tui-order-box">
			
			<view class="tui-order-list">
				<view class="tui-order-item" v-for="(item,index) in urlList" @click="uploadImages(index)">
					<view class="tui-icon-box">
						<image :src="item.url" mode="aspectFit" class="imgUplod"></image>
						<view>点击上传图片</view>
					</view>
					<view class="tui-order-text">{{imgName[index]}}</view>
				</view>
			</view>
			
			
			<!-- <view class="tui-order-list">
				<view class="tui-order-item"  @click="uploadImages(0)">
					<view class="tui-icon-box">
						<image :src="imagesList[0].url" mode="aspectFit" class="imgUplod"></image>
						<view>点击上传图片</view>
					</view>
					<view class="tui-order-text">门头照</view>
				</view>
				<view class="tui-order-item"  @click="uploadImages(1)">
					<view class="tui-icon-box">
						<image :src="imagesList[1].url" mode="aspectFit" class="imgUplod"></image>
						<view>点击上传图片</view>
					</view>
					<view class="tui-order-text">水果陈列照</view>
				</view>
			</view>
			
			<view class="tui-order-list">
				<view class="tui-order-item"  @click="uploadImages(2)">
					<view class="tui-icon-box">
						<image :src="imagesList[2].url" mode="aspectFit" class="imgUplod"></image>
						<view class="">点击上传图片</view>
					</view>
					<view class="tui-order-text">卸货区</view>
				</view>
				<view class="tui-order-item"  @click="uploadImages(3)">
					<view class="tui-icon-box">
						<image :src="imagesList[3].url" mode="aspectFit" class="imgUplod"></image>
						<view>点击上传图片</view>
					</view>
					<view class="tui-order-text">工商营业执照</view>
				</view>
			</view> -->
			
		</view>
		
		
		
			<tui-list-cell  :hover="false">注: 如无办理工商营业执照，请联系客服专员
			</tui-list-cell>
		<tui-list-cell :hover="false">
			<view class="tui-line-cell">
				<view class="tui-title">客服专员：</view><text>*</text>
				<input placeholder-class="tui-phcolor" class="tui-input" name="serviceNumber" :placeholder="serviceNumber" maxlength="50" type="text" />
				<text>*</text>
			</view>
		</tui-list-cell>
			<view class="tui-btn-box">
				<button class="tui-button-primary" hover-class="tui-button-hover" formType="submit" type="primary">提交</button>
				<button class="tui-button-primary tui-button-gray" hover-class="tui-button-gray_hover" formType="reset">重置</button>
			</view>
			</form>
	</view>
</template>
<script>
	import {publicing2,listing,publicing} from '../../api/api.js'
	import {loginis,getClient,postupdateClient,uploadFiles,postSaveStore} from '../../api/request.js'
	let setdata = uni.getStorageSync('usermen')//Token
	let {log} = console
	const form = require("@/common/tui-validation/tui-validation.js")
	export default {
		data() {
			return {
				urlList:[],
				imgName:['门头照','水果陈列照','卸货区','工商营业执照'],
				imgDataLi:[
					{
						"name":"me_1 ",
						"url":"../../static/images/B@2x.png"
					},
					{
						"name":"me_2",
						"url":"../../static/images/B@2x.png"
					},
					{
						"name":":me_3",
						"url":"../../static/images/B@2x.png"
					},
					{
						"name":":me_4",
						"url":"../../static/images/B@2x.png"
					}
					],
				
				imgUrlData0:'../../static/images/B@2x.png',
				imgUrlData1:'../../static/images/B@2x.png',
				imgUrlData2:'../../static/images/B@2x.png',
				imgUrlData3:'../../static/images/B@2x.png',
				updataImg0:'',
				updataImg1:'',
				updataImg2:'',
				updataImg3:'',
				imagesList:[
					{url:'../../static/images/B@2x.png'},
					{url:'../../static/images/B@2x.png'},
					{url:'../../static/images/B@2x.png'},
					{url:'../../static/images/B@2x.png'}
				],
				storeName:'请填写店铺名',
				merchantsName:'填写姓名',
				phone:'1111',
				address:'南宁',//地址
				serviceNumber:'请填写客服专员手机号',//客服专员
				files: [] ,//最多上传9张图片
				imageList: [],
				category: 'image',
				ctx:{},
				StoreInfo:{},//店铺信息
				cartIds:[],
				imgUrlData:'',
			}
		},
		methods: {
			//上传文件
			uploadImages(index){
				// let that = this;
				uploadFiles((res) => {
					let imgArr
					imgArr = this.imgUrlData.split(",");
					log(imgArr)
					// this.cartIds = [];//清空
					// for(let i=0;i<this.imgurlData.length;i++){
					//     this.cartIds.push(this.imgurlData[i])
					//    }
					// log(this.cartIds)
					//拼接字符串
					
					// let ids = "";
					// for(let index in this.imgUrlData){
					// 	ids = ids + this.imgUrlData[index] + "";
					// }
					// //去除ids最后一个逗号
					// // ids = ids.substring(0,ids.length - 1);
					
					this.urlList[index].url = res.data//替换图片路径
				});
			},
			
			//更新店铺信息
			postUpdateStore(){
				let data ={
					storeName:this.StoreInfo.storeName,
					merchantsName:this.StoreInfo.merchantsName,
					phone:this.StoreInfo.phone,
					address:this.StoreInfo.address,
					// serviceNumber:'',
					token:setdata,
					idCard:this.StoreInfo.idCard,
					fileUrls:JSON.stringify(this.imgDataLi)
				}
				log(data)
				publicing2(postupdateClient,data)
				.then((res)=>{
					log(res)
				})
				.catch((err)=>{
					log(err)
				})
				
			},
			
			//获取申请店铺状态信息
			getMerchants(){
				let data = {
					token:setdata
				}
				listing(getClient,data)
				.then((res)=>{
					log(res)
					this.ApproveStatus =  res.data.data.approveStatus
					log(this.ApproveStatus)
					this.StoreInfo = res.data.data
					this.urlList = res.data.data.urlList
					log(this.StoreInfo)
				})
				.catch((err)=>{
					log(err)
				})
				
			},
			
			
			
			//请求保存店铺
			postsaveStores(e){
				
				let setdata = uni.getStorageSync('usermen')
				log(setdata)
				let data ={
					storeName:e.detail.value.storeName,
					merchantsName:e.detail.value.merchantsName,
					phone:e.detail.value.phone,
					address:e.detail.value.address,
					serviceNumber:e.detail.value.serviceNumber,
					token:setdata,
					fileUrls:JSON.stringify(this.imgDataLi)//这个地方不要传json数组，要把json数组转字符串，用JSON.stringify能转为字符串json数组，这样后台才能接收
				}
				log(data)
				
				publicing(postSaveStore,data)
				.then((res)=>{
					log(res)
					
					// log(res.data.msg)
					uni.showToast({
						title: `${res.data.msg}`,
						icon: "none"
					});
					
				})
				.catch((err)=>{
					log(err)
				})
					
				
			},
			
			//获取token
			getToken(){
				let setdata = uni.getStorageSync('usermen')
				log(setdata)
			},
			//上传图片
			chooseImage (e) {
						let that = this;
						if (that.files.length >= 9) {
							this.tui.toast("最多上传9张图片");
							return
						}
						uni.chooseImage({
							count: 9 - that.files.length,
							sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
							sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
							success: function (res) {
								
								// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
								that.files=that.files.concat(res.tempFilePaths)
								//上传功能已移除
								//...
							}
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
			
			formSubmit(e) {
				//表单规则
				let rules = [{
					name: "storeName",
					rule: ["required", "isChinese", "minLength:2", "maxLength:6"], //可使用区间，此处主要测试功能
					msg: ["请输入店铺名姓名", "姓名必须全部为中文", "姓名必须2个或以上字符", "姓名不能超过6个字符"]
				},{
					name: "mobile",
					rule: ["required", "isMobile"],
					msg: ["请输入手机号", "请输入正确的手机号"]
				} ];
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				if (!checkRes) {
					uni.showToast({
						title: "提交!",
						icon: "none"
					});
				} else {
					uni.showToast({
						title: checkRes,
						icon: "none"
					});
				}
			},
			formReset: function(e) {
			}
		},
		onLoad() {
			// this.getToken()
			this.getMerchants()
		}
	}
</script>

<style>
	.container {
		padding: 20rpx 0 50rpx 0;
	}
	.imgUplod{
		width: 80rpx;
		height: 80rpx;
		
	}
	/*上传*/
	.tui-upload-box {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	
	.tui-upload-item {
		width: 220rpx;
		height: 220rpx;
		position: relative;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
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

	.tui-line-cell {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-title {
		line-height: 32rpx;
		min-width: 120rpx;
		flex-shrink: 0;
	}

	.tui-input {
		font-size: 28rpx;
		color: rgba(182, 182, 182, 1);
		padding-left: 20rpx;
		flex: 1;
		overflow: visible;
	}

	.radio-group {
		margin-left: auto;
		transform: scale(0.8);
		transform-origin: 100% center;
		flex-shrink: 0;
	}

	.tui-radio {
		display: inline-block;
		padding-left: 28rpx;
		font-size: 36rpx;
		vertical-align: middle;
	}


	.tui-btn-box {
		padding: 40rpx 50rpx;
		box-sizing: border-box;
	}

	.tui-button-gray {
		margin-top: 30rpx;
	}

	.tui-tips {
		padding: 30rpx;
		color: #999;
		font-size: 24rpx;
	}
	
	/* start */
	.tui-content-box {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: relative;
		top: -172rpx;
		z-index: 10;
	}
	
	.tui-box {
		width: 100%;
		background: #fff;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
		border-radius: 10rpx;
		overflow: hidden;
	}
	
	.tui-order-box {
		/* height: 208rpx; */
	}
	
	.tui-cell-header {
		width: 100%;
		
		padding: 0 26rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.tui-cell-title {
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: 600;
		color: #333;
	}
	
	.tui-cell-sub {
		font-size: 26rpx;
		font-weight: 400;
		color: #999;
		padding-right: 28rpx;
	}
	
	.tui-order-list {
		width: 100%;
		
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	
	}
	
	.tui-order-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	
	.tui-order-text,
	.tui-tool-text {
		font-size: 26rpx;
		font-weight: 400;
		color: rgba(87, 87, 87, 1);
		padding-top: 22rpx;
	}
	
	.tui-tool-text {
		font-size: 24rpx;
	}
	
	.tui-order-icon {
		width: 56rpx;
		height: 56rpx;
		display: block;
	}
	
	.tui-assets-box {
		
		margin-top: 20rpx;
	}
	
	.tui-assets-list {
		
	}
	
	.tui-assets-num {
		font-size: 32rpx;
		font-weight: 500;
		color: #333;
		position: relative;
	}
	
	.tui-assets-text {
		font-size: 24rpx;
		font-weight: 400;
		color: #666;
		padding-top: 6rpx;
	}
	
	.tui-tool-box {
		margin-top: 20rpx;
	}
	
	.tui-flex-wrap {
		flex-wrap: wrap;
		height: auto;
		padding-bottom: 30rpx;
	}
	
	.tui-tool-item {
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding-top: 30rpx;
	}
	
	.tui-tool-icon {
		width: 64rpx;
		height: 64rpx;
		display: block;
	}
	
	.tui-badge-icon {
		width: 66rpx;
		
		position: absolute;
		right: 0;
		transform: translateX(88%);
		top: -15rpx;
	}
	/* end */
</style>
