<template>
	<view class="container">
		<view class="tui-list-title1">
			<text>为了给您提供更好的服务，请填写真实的店铺信息</text>
		</view>
		<view class="tui-list-title2">
			<text>店铺信息</text><text class="edit-btn" @click="sEdit">编辑</text>
		</view>
		<form @submit="postsaveStores" @reset="formReset">
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">店铺名称：</view><text class="colorStart">*</text>
					<input placeholder-class="tui-phcolor" class="tui-input" name="storeName" :placeholder="StoreInfo.storeName"
					 maxlength="50" type="text" disabled />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">收货人：</view><text class="colorStart">*</text>
					<input placeholder-class="tui-phcolor" class="tui-input" name="merchantsName" :placeholder="StoreInfo.merchantsName"
					 maxlength="50" type="text" disabled />
				</view>
			</tui-list-cell>

			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">手机号：</view><text class="colorStart">*</text>
					<input placeholder-class="tui-phcolor" class="tui-input" name="phone" :placeholder="StoreInfo.phone" maxlength="50"
					 type="text" disabled />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">所在地区：</view><text class="colorStart">*</text>
					<input placeholder-class="tui-phcolor" class="tui-input" name="address" :placeholder="StoreInfo.address" maxlength="50"
					 type="text" disabled />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">详细地址：</view><text class="colorStart">*</text>
					<input placeholder-class="tui-phcolor" class="tui-input" name="address2" :placeholder="StoreInfo.addressDetails"
					 maxlength="50" type="text" disabled />
				</view>
			</tui-list-cell>

			<!-- 上传 -->
			<view class="tui-list-title2 tui-list-title-top">
				店铺照片
			</view>
			<view class="tui-box tui-order-box">

				<view class="tui-order-list">
					<view class="tui-order-item">
						<view class="tui-icon-box">

							<image :src="urlList[0].url" mode="aspectFit" class="imgUplod"></image>
							<!-- <view>点击上传图片</view> -->
						</view>
						<view class="tui-order-text">{{urlList[0].title}}</view>
					</view>
					<view class="tui-order-item">
						<view class="tui-icon-box">
							<image :src="urlList[1].url" mode="aspectFit" class="imgUplod"></image>
							<!-- <view>点击上传图片</view> -->
						</view>
						<view class="tui-order-text">{{urlList[1].title}}</view>
					</view>
				</view>

				<view class="tui-order-list padding-bo">

					<view class="tui-order-item">
						<view class="tui-icon-box">
							<image :src="urlList[2].url" mode="aspectFit" class="imgUplod"></image>
							<!-- <view class="">点击上传图片</view> -->
						</view>
						<view class="tui-order-text">{{urlList[2].title}}</view>
					</view>
					<view class="tui-order-item">
						<view class="tui-icon-box">
							<image :src="urlList[3].url" mode="aspectFit" class="imgUplod"></image>
							<!-- <view>点击上传图片</view> -->
						</view>
						<view class="tui-order-text">{{urlList[3].title}}</view>
					</view>
				</view>
			</view>



			<tui-list-cell :hover="false"><text class="colot-text-1">注: 如无办理工商营业执照，请联系客服专员</text>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">客服专员：</view><text></text>
					<input placeholder-class="tui-phcolor" class="tui-input" name="serviceNumber" :placeholder="StoreInfo.serviceNumber"
					 maxlength="50" type="text" disabled />
					<text></text>
				</view>
			</tui-list-cell>
			<!-- <view class="tui-btn-box">
				<button class="tui-button-primary" hover-class="tui-button-hover" formType="submit" type="primary">提交</button>
				<button class="tui-button-primary tui-button-gray" hover-class="tui-button-gray_hover" formType="reset">重置</button>
			</view> -->
		</form>
	</view>
</template>
<script>
	import {
		publicing2,
		listing,
		publicing
	} from '../../api/api.js'
	import {
		loginis,
		getClient,
		postAddressList
	} from '../../api/request.js'
	let setdata = uni.getStorageSync('usermen') //Token
	let {
		log
	} = console
	const form = require("@/common/tui-validation/tui-validation.js")
	const cityData = require('@/utils/picker.city.js')
	export default {
		data() {
			return {

				//地图信息
				selectList: cityData, //接口返回picker数据,此处就直接使用本地测试数据
				multiArray: [], //picker数据
				value: [0, 0, 0],
				text1: "请选择店铺所处省市区",
				id: "",
				idAddress: '',
				addressAllData: [], //全国三级地址
				addressOne: [], //一级
				addressTwo: [], //二级
				addressThree: [], //三级
				textAddress: '',




				//end
				approveStatus: 0, //店铺状态标识
				StoreInfo: {}, //店铺信息



				imagesList: [{
						url: '../../static/images/B@2x.png'
					},
					{
						url: '../../static/images/B@2x.png'
					},
					{
						url: '../../static/images/B@2x.png'
					},
					{
						url: '../../static/images/B@2x.png'
					}
				],
				urlList: [],
				storeName: '请填写店铺名',
				merchantsName: '填写姓名',
				phone: '1111',
				address: '南宁', //地址
				serviceNumber: '', //客服专员
				addressInfo: '', //详细地址
				files: [], //最多上传9张图片
				imageList: [],
				category: 'image',
				ctx: {}
			}
		},
		methods: {

			//地址选择弹出

			picker: function(e) {

				//获取选中的三级信息
				let value = e.detail.value; //这个是三级的picker分别选中的下标，value=[].length = 3,第一个是一级，第二个是二级。。。
				let one = this.addressOne[value[0]];
				let two = this.addressTwo[value[1]];
				let three = this.addressThree[value[2]];
				this.text1 = one.name + " " + two.name + " " + three.name;
				// console.log("选中的三级信息======",this.text1)
				// this.StoreInfo.address = this.text1

				this.idAddress = three.id

				/* if (this.selectList.length > 0) {
					let provice = this.selectList[value[0]].text
					let city = this.selectList[value[0]].children[value[1]].text
					let district = this.selectList[value[0]].children[value[1]].children[value[2]].text
					this.text = provice + " " + city + " " + district;
					this.id = this.selectList[value[0]].children[value[1]].children[value[2]].value
				} */
			},
			toArr(object) {
				let arr = [];
				for (let i in object) {
					arr.push(object[i].name);
				}
				return arr;
			},
			columnPicker: function(e) {
				//console.log("columnPicker=======",e)

				//第几列 下标从0开始,0=一级选择，1=二级选择，2=三级选择
				let column = e.detail.column;
				//第几行 下标从0开始
				let value = e.detail.value;
				if (column === 0) {
					//获取一级选中的地址信息
					let one = this.addressOne[value]

					//一级固定不变，设置二级，三级
					let two = this.getAddressByPId(one.id) //获取二级，根据一级选中的id，获取二级关联的pid
					let three = this.getAddressByPId(two[0].id) //获取三级，默认显示二级的第一个地址的三级信息
					//保存地址
					this.addressTwo = two
					this.addressThree = three
					//设置地址
					this.multiArray = [
						this.multiArray[0],
						this.toArr(two),
						this.toArr(three)
					];
					this.value = [value, 0, 0]
				} else if (column === 1) {
					//获取二级选中的地址信息
					let two = this.addressTwo[value]

					//一级\二级固定不变，设置三级
					let three = this.getAddressByPId(two.id) //获取三级，根据二级选中的id，获取三级关联的pid
					//保存地址
					this.addressThree = three
					//设置地址
					this.multiArray = [
						this.multiArray[0],
						this.multiArray[1],
						this.toArr(three)
					];
					this.value = [this.value[0], value, 0]
				} else if (column === 2) {
					//获取二级选中的地址信息
					let three = this.addressThree[value]

					this.ADDressID = three.id
				}
			},

			//获取地理信息,这个地方要
			postAddressDatas() {
				let that = this;
				publicing(postAddressList)
					.then((res) => {
						this.addressAllData = res.data

						//初始化三级信息
						this.addressOne = this.getAddressByPId("0") //一级地址
						this.addressTwo = this.getAddressByPId(this.addressOne[0].id) //默认显示一级的第一个地址的二级地址
						this.addressThree = this.getAddressByPId(this.addressTwo[0].id) //默认显示二级的第一个地址的三级地址



						this.multiArray = [
							this.toArr(this.addressOne),
							this.toArr(this.addressTwo),
							this.toArr(this.addressThree)
						]
						/* console.log("获取全国一级地址===",this.addressOne)
						console.log("获取全国二级地址===",this.addressTwo)
						console.log("获取全国三级地址===",this.addressThree) */

						that.getMerchants()
					})
					.catch((err) => {
						log(err)
					})
			},
			//根据pid获取后台的三级联动地址
			getAddressByPId(pid) {
				log(pid)
				let data = new Array();
				for (let i = 0; i < this.addressAllData.length; i++) {
					let dd = this.addressAllData[i];
					if (dd.pId === pid) {
						data.push(dd)
					}
				}
				return data
			},
			//根据id获取后台id 的三级联动地址
			getAddressById(id) {
				log(id)
				for (let i = 0; i < this.addressAllData.length; i++) {
					let dd = this.addressAllData[i];
					if (dd.id === id) {
						log(dd)
						return dd
					}
				}
				return null
			},





			//编辑店铺信息
			sEdit() {
				uni.showModal({
					title: '温馨提示',
					content: '修改店铺信息需要重修进行审核认证,确定修改?',
					success: (res) => {
						if (res.cancel) {
							console.log('用户点击取消');
						} else if (res.confirm) {
							console.log('用户点击确定');
							uni.navigateTo({
								url: '../updataStore/updataStore'
							})

						}
					}
				});
			},
			//上传文件
			uploadImages(index) {
				let that = this;
				uploadFiles((res) => {
					console.log(res.data)
					that.imagesList[index].url = res.data
				});
			},
			//下拉刷新
			onPullDownRefresh() {
				this.getMerchants()
				console.log('refresh');
				setTimeout(function() {
					uni.stopPullDownRefresh();



				}, 1000);
			},


			//获取申请店铺状态信息
			getMerchants() {
				let data = {
					token: setdata
				}
				listing(getClient, data)
					.then((res) => {
						log(res)


						//这里查询
						this.ApproveStatus = res.data.data.approveStatus
						log(this.ApproveStatus)
						this.StoreInfo = res.data.data
						this.urlList = res.data.data.urlList
						log(this.StoreInfo)

						//根据id获取地址，地址已经获取到
						let addThree = this.getAddressById(this.StoreInfo.address)
						log(addThree)
						//拿到第三级，根据第三级的pid就是第二级的id，根据第二级的pid就是第一级的id
						let addTwo = this.getAddressById(addThree.pId)
						let addOne = this.getAddressById(addTwo.pId)

						console.log("addThree===", addThree.name)
						console.log("addTwo===", addTwo.name)
						console.log("addOne===", addOne.name)
						this.textAddress = addOne.name + "/" + addTwo.name + "/" + addThree.name;
						log(this.textAddress)
						this.StoreInfo.address = this.textAddress
						//this.text1 = addInfo.name

					})
					.catch((err) => {
						log(err)
					})

			},


			//请求保存店铺
			postsaveStores(e) {
				log(e)
				let setdata = uni.getStorageSync('usermen')
				log(setdata)
				let data = {
					storeName: e.detail.value.storeName,
					merchantsName: e.detail.value.merchantsName,
					phone: e.detail.value.phone,
					address: e.detail.value.address,
					serviceNumber: e.detail.value.serviceNumber,
					token: setdata
				}
				log(data)

				publicing(postSaveStore, data)
					.then((res) => {
						log(res)

						// log(res.data.msg)
						uni.showToast({
							title: `${res.data.msg}`,
							icon: "none"
						});

					})
					.catch((err) => {
						log(err)
					})


			},

			//获取token
			getToken() {
				let setdata = uni.getStorageSync('usermen')
				log(setdata)
			},
			//上传图片
			chooseImage(e) {
				let that = this;
				if (that.files.length >= 9) {
					this.tui.toast("最多上传9张图片");
					return
				}
				uni.chooseImage({
					count: 9 - that.files.length,
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function(res) {

						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						that.files = that.files.concat(res.tempFilePaths)
						console.log(that.files)
						//上传功能已移除
						//...
					}
				})
			},


			previewImage: function(e) {
				uni.previewImage({
					current: e.currentTarget.id,
					urls: this.files
				})
			},
			deleteImage: function(e) {
				const index = e.index;
				this.files.splice(index, 1);
			},

			formSubmit(e) {
				//表单规则
				let rules = [{
					name: "storeName",
					rule: ["required", "isChinese", "minLength:2", "maxLength:6"], //可使用区间，此处主要测试功能
					msg: ["请输入店铺名姓名", "姓名必须全部为中文", "姓名必须2个或以上字符", "姓名不能超过6个字符"]
				}, {
					name: "mobile",
					rule: ["required", "isMobile"],
					msg: ["请输入手机号", "请输入正确的手机号"]
				}];
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
				console.log("清空数据")
			}
		},
		onLoad() {
			this.postAddressDatas()
			//获取店铺信息
			this.getMerchants()
			// this.getToken()
		}
	}
</script>

<style>
	.padding-bo {
		margin-bottom: 100rpx;
	}

	.container {
		padding: 0rpx 0 50rpx 0;
	}

	.tui-list-title1 {
		height: 50rpx;
		line-height: 50rpx;
		font-size: 24rpx;
		color: #707070;
		padding: 10rpx 30rpx;
	}

	.tui-list-title2 {
		justify-content: space-between;
		display: flex;
		height: 50rpx;
		font-size: 30rpx;
		color: rgba(51, 51, 51, 1);
		font-weight: 800;
		background-color: #fff;
		padding: 14px 16px;
		border-bottom: 1rpx solid rgba(233, 234, 238, 1);
	}
	
	.tui-list-title2 text.edit-btn{
		display: inline-block;
		padding: 4rpx 40rpx;
		border-radius: 40rpx;
		background: #ECFFF0;
		border: 1px solid #00C52A;
		color: #00C52A;
		font-size: 28rpx;
		font-weight: 400;

	}

	.tui-list-title-top {
		margin-top: 20rpx;
	}

	.tui-order-list .tui-order-item .tui-icon-box {
		border-radius: 6rpx;
		overflow: hidden;
		padding: 10rpx;
		border: 1px solid #e5e5e5;

	}

	.imgUplod {
		width: 300rpx;
		height: 200rpx;
		background: #f5f5f5;
		max-width: 300rpx;
		max-height: 200rpx;
		border-radius: 4rpx;

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
		min-width: 140rpx;
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
		margin: 20rpx 0;
		padding: 0 24rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;

	}

	.colot-text-1 {
		color: #00C52A;
		font-size: 24rpx;
	}

	.tui-order-item {

		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		margin-bottom: 20rpx;
	}

	.tui-order-text,
	.tui-tool-text {
		font-size: 28rpx;
		font-weight: 400;
		color: #555555;
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

	.tui-assets-list {}

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
	.colorStart {
		color: rgba(241, 0, 0, 1);

	}

	.tui-title-flex {
		display: flex;
		justify-content: space-between;
	}
</style>
