<template>
	<view class="container">
		<view class="tui-list-title1">
			<text>为了给您提供更好的服务，请填写真实的店铺信息</text>
		</view>
		<view class="tui-list-title2">
			店铺信息
		</view>
		<form @submit="postUpdateStore" @reset="formReset">
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">店铺名称：</view><text class="start-1">*</text>
					<input placeholder-class="tui-phcolor" class="tui-input" name="storeName" :placeholder="storeName" :value="StoreInfo.storeName"
					 maxlength="50" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">收货人：</view><text class="start-1">*</text>
					<input placeholder-class="tui-phcolor" class="tui-input" name="merchantsName" :placeholder="merchantsName" :value="StoreInfo.merchantsName"
					 maxlength="50" type="text" />
				</view>
			</tui-list-cell>

			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">手机号：</view><text class="start-1">*</text>
					<input placeholder-class="tui-phcolor" class="tui-input" name="phone" :placeholder="phone" maxlength="11" :value="StoreInfo.phone"
					 type="number" />
				</view>
			</tui-list-cell>
			<picker :value="value" mode="multiSelector" :range="multiArray" @change="picker" @columnchange="columnPicker">
				<tui-list-cell :arrow="true" :lineLeft="false" shape="circle">
					<view class="tui-line-cell2">
						<view class="tui-title2">
							<text>选择地区：<text class="start-1">*</text> </text>
							<input placeholder-class="tui-phcolor" class="tui-input" name="address" :placeholder="StoreInfo.address"
							 maxlength="50" type="text" disabled="flase" />
						</view>
					</view>
				</tui-list-cell>
			</picker>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">详细地址：</view><text class="start-1">*</text>
					<input placeholder-class="tui-phcolor" class="tui-input" name="addressDetails" :placeholder="addressDetails"
					 maxlength="50" :value="StoreInfo.addressDetails" type="text" />
				</view>
			</tui-list-cell>

			<!-- 上传 -->
			<view class="tui-list-title2 tui-list-title-top">
				店铺照片
			</view>
			<view class="tui-box tui-order-box">

				<view class="tui-order-list">
					<view class="tui-order-list">
						<view class="tui-order-item" v-for="(item,index) in urlList" :key="index">
							<view class="del-img" v-if="item.url !== ''">
								<tui-icon style="margin-top: 0rpx;" @click.stop="delImg(index)" name="close-fill" :size='20' color='#00BF3D'></tui-icon>
							</view>
							<view class="tui-icon-box"  @click="uploadImages(index,item.id)">
								<image :src="item.url || '../../static/images/storeup.png'" mode="aspectFit" class="imgUplod"></image>
							</view>
							<view class="tui-order-text">{{item.title}}</view>
						</view>
					</view>
				</view>
			</view>

			<tui-list-cell :hover="false"> <text class="colot-text-1">注: 如无办理工商营业执照，请联系客服专员</text>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">客服专员：</view><text></text>
					<input placeholder-class="tui-phcolor" class="tui-input" name="serviceNumber" :value="StoreInfo.serviceNumber"
					 maxlength="50" type="text" disabled />
					<text></text>
				</view>
			</tui-list-cell>
			<view class="tui-btn-box">
				<button class="tui-button-primary" style="border-radius: 60rpx;" hover-class="tui-button-hover" formType="submit"
				 type="primary">提交</button>
				<!-- <button class="tui-button-primary tui-button-gray" hover-class="tui-button-gray_hover" formType="reset">重置</button> -->
			</view>
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
		postupdateClient,
		uploadFiles,
		postSaveStore,
		postAddressList
	} from '../../api/request.js'
	let setdata = uni.getStorageSync('usermen') //Token
	let {
		log
	} = console
	const cityData = require('@/utils/picker.city.js')
	const form = require("@/common/tui-validation/tui-validation.js")
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
				Address1: '', //更新店铺地址
				//end
				urlListFlag: [false, false, false, false], //对应下面urlList的四张图片状态，修改下面那个index的图片就设置当前对应的index为true
				urlList: [],
				checkList: [
					{
						id: "",
						"title": "门头照片",
						"name": "me_1",
						"url": ""
					},
					{
						id: "",
						"title": "水果陈列照片",
						"name": "me_2",
						"url": ""
					},
					{
						id: "",
						"title": "卸货区",
						"name": "me_3",
						"url": ""
					},
					{
						id: "",
						"title": "工商营业执照",
						"name": "me_4",
						"url": ""
					}
				],
				imgName: ['门头照', '水果陈列照', '卸货区', '工商营业执照'],
				imgDataLi: [{
						"title": "门头照片",
						"name": "me_1",
						"url": ""
					},
					{
						"title": "水果陈列照片",
						"name": "me_2",
						"url": ""
					},
					{
						"title": "卸货区",
						"name": "me_3",
						"url": ""
					},
					{
						"title": "工商营业执照",
						"name": "me_4",
						"url": ""
					}
				],

				imgUrlData0: '../../static/images/B@2x.png',
				imgUrlData1: '../../static/images/B@2x.png',
				imgUrlData2: '../../static/images/B@2x.png',
				imgUrlData3: '../../static/images/B@2x.png',
				updataImg0: '',
				updataImg1: '',
				updataImg2: '',
				updataImg3: '',
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
				storeName: '请填写店铺名',
				merchantsName: '填写姓名',
				phone: '请输入收货人手机号码',
				address: '南宁', //地址
				serviceNumber: '', //客服专员
				files: [], //最多上传9张图片
				imageList: [],
				category: 'image',
				ctx: {},
				StoreInfo: {}, //店铺信息
				cartIds: [],
				imgUrlData: '',
				addressDetails: '请填写详细地址',
				flag: false,
				idList: []
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
				let addThree = this.getAddressById(three.id)
				//拿到第三级，根据第三级的pid就是第二级的id，根据第二级的pid就是第一级的id
				let addTwo = this.getAddressById(addThree.pId)
				let addOne = this.getAddressById(addTwo.pId)
				this.textAddress = addOne.name + "/" + addTwo.name + "/" + addThree.name;
				this.address = three.id
				this.StoreInfo.address = this.textAddress
				this.idAddress = three.id
				this.StoreInfo.address = this.textAddress //
				// this.StoreInfo.address = this.idAddress //ID
				this.Address1 = this.idAddress

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
						that.getMerchants()
					})
					.catch((err) => {
						log(err)
					})
			},
			//根据pid获取后台的三级联动地址
			getAddressByPId(pid) {
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
				for (let i = 0; i < this.addressAllData.length; i++) {
					let dd = this.addressAllData[i];
					if (dd.id === id) {
						return dd
					}
				}
				return null
			},
			delImg(index) {
				let list = this.urlList
				let idList = this.idList
				list[index].url = ''
				idList.push(list[index].id)
				this.urlList = list
				this.urlListFlag[index] = false
				this.idList =idList
			},

			//上传文件
			uploadImages(index, id) {
				//如果用户不点击上传图片，不用传参fileUrls，delFileIds
				let that = this;
				that.flag = true
			
				uploadFiles((res) => {
					that.urlList[index].url = res.data //替换图片路径
					//设置对应的index为true
					that.urlListFlag[index] = true
				});
			},

			//更新店铺信息

			/**
			 * 修改图片注意
			 * 如果用户修改信息时，没有删除图片或者（修改/添加）图片，
			 * 则不需要返回图片的对应信息；
			 * 如果删除了图片，则需要把 删除了的图片的ID传给delFileIds；
			 * 如果修改了图片，则只需要把修改了的图片的信息传到fileUrls
			 * 
			 */
			postUpdateStore(e) {
				log(e)
				//表单规则
				let rules = [{
						name: "storeName",
						rule: ["required",  "minLength:2", "maxLength:20"], //可使用区间，此处主要测试功能
						msg: ["请输入店铺名称", "请输入2个或以上字符", "不能超过20个字符"]
					},
					{
						name: "merchantsName",
						rule: ["required", "isChinese", "minLength:2", "maxLength:6"], //可使用区间，此处主要测试功能
						msg: ["请输入真实姓名", "姓名必须全部为中文", "姓名必须2个或以上字符", "不能超过6个字符"]
					}, {
						name: "phone",
						rule: ["required", "isMobile"],
						msg: ["请输入手机号", "请输入正确的手机号"]
					},
					{
						name: "address",
						rule: ["minLength:4"], //可使用区间，此处主要测试功能
						msg: ["请选择地区", "请选择地区!!!", "请选择地区!!!", "请选择地区!!!!"]
					},
					{
						name: "addressDetails",
						rule: ["required", "isChinese", "minLength:4", "maxLength:30"], //可使用区间，此处主要测试功能
						msg: ["请填写详细地址", "请填写详细地址!!!", "请填写详细地址!!!", "请填写详细地址!!!!"]
					},

				];
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				if (!checkRes) {
					//判断四张图片中哪几张是改变了的然后存储已改变的图片为一个list发送后台，没改动的就不传
					let changeImg = []
					for (let index in this.urlListFlag) {
						if (this.urlListFlag[index]) { //等于true则证明这个index下标对应的this.urlList图片有改动
							//就把这个this.urlList下标内容存储
							changeImg.push(this.urlList[index])
						}
					}
					let setdata = uni.getStorageSync('usermen') //Token
					let data = {
						storeName: e.detail.value.storeName,
						merchantsName: e.detail.value.merchantsName,
						phone: e.detail.value.phone,
						address: this.Address1,
						token: setdata,
						type: 1,
						addressDetails: e.detail.value.addressDetails,
						fileUrls: JSON.stringify(changeImg), //这个地方不要传json数组，要把json数组转字符串，用JSON.stringify能转为字符串json数组，这样后台才能接收
						delFileIds: this.idList.join(',')
					}

					publicing(postupdateClient, data)
						.then((res) => {
							
							if (res.data.code === -1) {
								uni.showToast({
									title: `${res.data.msg}`,
									icon: "none",
									duration: 3000
								})
								return
							}
							if (res.data.code == 500) {
								uni.showToast({
									title: "服务器异常,请重试",
									icon: "none",
									duration: 3000
								});
								return
							}
							if (res.data.code ===200) {
								uni.showToast({
									title: `${res.data.msg}`,
									icon: "none",
									duration: 3000
								})
								wx.switchTab({
									url: '../../pages/my/my',
									success: function(e) {
										var page = getCurrentPages().pop(); //当前页面
										if (page == undefined || page == null) return;
										page.onLoad();
								
									}
								})
							}
						})
						.catch((err) => {
							log(err)
						})

				} else {
					uni.showToast({
						title: checkRes,
						icon: "none"
					});
				}
			},
			//获取申请店铺状态信息
			getMerchants() {
				let setdata = uni.getStorageSync('usermen') //Token
				let data = {
					token: setdata
				}
				listing(getClient, data)
					.then((res) => {
						//这里查询
						this.ApproveStatus = res.data.data.approveStatus
						this.StoreInfo = res.data.data
						let ulist = res.data.data.urlList
						let clist = this.checkList
						let tempList = []
						ulist.forEach((item,index)=>{
							clist.forEach((itm,idx)=>{
								if (item.name === itm.name) {
									itm.url = item.url
									itm.id = item.id
								}
							})
						})
						clist.sort((a,b)=>{
							return a.name.replace(/[^0-9]/ig,"") - b.name.replace(/[^0-9]/ig,"")
						})
						this.urlList = clist
						this.Address1 = res.data.data.address
						//根据id获取地址，地址已经获取到
						let addThree = this.getAddressById(this.StoreInfo.address)
						//拿到第三级，根据第三级的pid就是第二级的id，根据第二级的pid就是第一级的id
						let addTwo = this.getAddressById(addThree.pId)
						let addOne = this.getAddressById(addTwo.pId)
						
						this.textAddress = addOne.name + "/" + addTwo.name + "/" + addThree.name;
						this.StoreInfo.address = this.textAddress

					})
					.catch((err) => {
						log(err)
					})

			},
			//刷新店铺信息
			onPullDownRefresh() {
				this.postAddressDatas()
				this.getMerchants()
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000);
			},



			//请求保存店铺
			postsaveStores() {

				let setdata = uni.getStorageSync('usermen')
				uni.showLoading({
					title: '提交中'
				});
				publicing(postSaveStore, data)
					.then((res) => {
						uni.hideLoading();
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
			}
		},
		onLoad() {
			this.postAddressDatas()
			// this.getToken()
			this.getMerchants()
		}
	}
</script>

<style>
	.upText {
		font-size: 24rpx;
	}

	.container {
		padding: 0rpx 0 250rpx 0;
	}



	.imgUplod {
		width: 300rpx;
		height: 200rpx;
		max-width: 300rpx;
		max-height: 200rpx;
		border-radius: 16rpx;
		border: 1px solid #f5f5f5;
	}

	.tui-list-title1 {
		height: 50rpx;
		line-height: 50rpx;
		font-size: 24rpx;
		color: #707070;
		padding: 12rpx 30rpx;

	}

	.tui-list-title2 {
		height: 50rpx;
		line-height: 50rpx;
		font-size: 30rpx;
		color: rgba(51, 51, 51, 1);
		font-weight: 800;
		background-color: #fff;
		padding: 14px 16px;
		border-bottom: 1rpx solid rgba(233, 234, 238, 1);

	}

	.tui-list-title-top {
		margin-top: 20rpx;
	}

	.start-1 {
		color: rgba(241, 0, 0, 1);
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

	.colot-text-1 {
		color: #00C52A;
		font-size: 24rpx;
	}

	.tui-title {
		line-height: 32rpx;
		min-width: 140rpx;
		flex-shrink: 0;
	}

	.tui-line-cell2 {
		width: 100%;
		box-sizing: border-box;

		align-items: center;
	}

	.tui-title2 {
		display: flex;
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
		position: fixed;
		bottom: 0rpx;
		width: 100%;
		padding: 40rpx 50rpx;
		box-sizing: border-box;
		background-color: #fff;
		z-index: 999;
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
		margin: 20rpx 0;
		width: 100%;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;

	}

	.tui-order-item {
		width: 50%;
		text-align: center;
		margin: 10rpx 0;
		position: relative;

	}
	
	.del-img{
		position: absolute;
		right: 14rpx;
		top: -16rpx;
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
</style>
