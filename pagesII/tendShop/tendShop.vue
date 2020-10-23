<template>
	<view class="container">
		<!-- <tui-list-view  title="" color="#777">
			<tui-list-cell  :hover="false">
				店铺信息
			</tui-list-cell>
		</tui-list-view> -->
		<view class="tui-list-title1">
			<text>为了给您提供更好的服务，请填写真实的店铺信息</text>
		</view>
		<view class="tui-list-title2">
			店铺信息
		</view>
		<form @submit="postsaveStores" @reset="formReset">
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">店铺名称：</view><text class="start-1">*</text>
					<input placeholder-class="tui-phcolor" class="tui-input" name="storeName" :placeholder="storeName" maxlength="50"
					 type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">收货人：</view><text class="start-1">*</text>
					<input placeholder-class="tui-phcolor" class="tui-input" name="merchantsName" :placeholder="merchantsName"
					 maxlength="30" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">手机号：</view><text class="start-1">*</text>
					<input placeholder-class="tui-phcolor" class="tui-input" name="phone" :placeholder="phone" maxlength="11" type="text" />
				</view>
			</tui-list-cell>
			<picker :value="value" mode="multiSelector" :range="multiArray" @change="picker" @columnchange="columnPicker">
				<tui-list-cell :arrow="true" :lineLeft="false" shape="circle">
					<view class="tui-line-cell2">
						<view class="tui-title2">
							<text>选择地区：<text class="start-1">*</text> </text>
							<input placeholder-class="tui-phcolor" class="tui-input" name="address" :placeholder="text1" maxlength="50" type="text"
							 disabled="false" />
						</view>
					</view>
				</tui-list-cell>
			</picker>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">详细地址：</view><text class="start-1">*</text>
					<input placeholder-class="tui-phcolor" class="tui-input" name="address2" :placeholder="addressDetails" maxlength="50"
					 type="text" />
				</view>
			</tui-list-cell>

			<!-- 上传 -->
			<view class="tui-list-title2 tui-list-title-top">
				店铺照片
			</view>
			<view class="tui-box tui-order-box">

				<view class="tui-order-list">
					<view class="tui-order-list">
						<view class="tui-order-item" v-for="(item,index) in imgDataLi" :key="index">
							<view class="tui-icon-box">
								<view class="del-img" v-if="Boolean(urlListFlag[index]) === true">
									<tui-icon style="margin-top: 0rpx;" @click.stop="delImg(index)" name="close-fill" :size='20' color='#00BF3D'></tui-icon>
								</view>
								<image :src="item.url || '../../static/images/storeup.png' " mode="aspectFit" class="imgUplod" @click="uploadImages(index)"></image>
								<view class="title-store">{{item.title}}</view>
							</view>
							<!-- <view class="tui-order-text">{{item.title}}</view> -->
						</view>
					</view>

				</view>


			</view>



			<tui-list-cell :hover="false"><text class="colot-text-1">注: 如无办理工商营业执照，请联系客服专员</text>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">客服专员：</view><text></text>
					<input placeholder-class="tui-phcolor" class="tui-input" name="serviceNumber" :placeholder="serviceNumber"
					 maxlength="50" type="text" />
					<!-- <view class="screen-img"><image src="../../static/images/sceen_phone.png" mode=""></image></view> -->
				</view>
			</tui-list-cell>
			<view class="tui-btn-box">
				<button class="tui-button-primary" hover-class="tui-button-hover" formType="submit" type="primary">提交</button>
				<!-- <button class="tui-button-primary tui-button-gray" hover-class="tui-button-gray_hover" formType="reset">重置</button> -->
			</view>
		</form>
		<view class="warp" v-if="modaishow">
			<view class="warp-view">
				<view class="warp-text">请登陆后再操作</view>
				<view class="warp-flex">
					<button @click="messcancel()" plain="true">取消</button>
					<button plain="true" open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		publicing,
		publicing2,
		listing
	} from '../../api/api.js'
	import {
		postSaveStore,
		uploading,
		uploadFiles,
		getClient,
		loginis,
		postAddressList
	} from '../../api/request.js'
	let setdata = uni.getStorageSync('usermen') //Token
	import tips from '../../element/tips.vue'
	let {
		log
	} = console
	const form = require("@/common/tui-validation/tui-validation.js")
	const cityData = require('@/utils/picker.city.js')
	export default {
		data() {

			return {
				flag: false, //是否点击上传图片
				//地图信息
				selectList: cityData, //接口返回picker数据,此处就直接使用本地测试数据
				multiArray: [], //picker数据
				value: [0, 0, 0],
				text1: "请选择店铺所处省市区",
				id: "",
				addressAllData: [], //全国三级地址
				addressOne: [], //一级
				addressTwo: [], //二级
				addressThree: [], //三级
				//end
				urlList: [],
				modaishow: false,
				urlListFlag: [false, false, false, false], //对应下面urlList的四张图片状态，修改下面那个index的图片就设置当前对应的index为true
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
				storeName: '请填写店铺名，如圈果水果店',
				merchantsName: '请填写收货人姓名',
				phone: '请填写收货人手机号码',
				address: '请选择店铺所处省市区', //地址
				addressDetails: '请填写街道、门牌号',
				serviceNumber: '请填写客服专员手机号', //客服专员
				files: [], //最多上传9张图片
				imageList: [],
				category: 'image',
				ctx: {},
				idAddress: ''

			}
		},
		methods: {
			delImg(index) {
				let list = this.imgDataLi
				list[index].url = ''
				this.urlList = list
				this.urlListFlag[index] = false
				console.log(list,index)
			},
			//地址选择弹出
			picker: function(e) {
				//获取选中的三级信息
				let value = e.detail.value; //这个是三级的picker分别选中的下标，value=[].length = 3,第一个是一级，第二个是二级。。。
				let one = this.addressOne[value[0]];
				let two = this.addressTwo[value[1]];
				let three = this.addressThree[value[2]];
				this.text1 = one.name + " " + two.name + " " + three.name;
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
					log(this.value)
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
				publicing(postAddressList)
					.then((res) => {
						this.addressAllData = res.data
						//初始化三级信息
						this.addressOne = this.getAddressByPId("0") //一级地址
						this.addressTwo = this.getAddressByPId(this.addressOne[0].id) //默认显示一级的第一个地址的二级地址
						this.addressThree = this.getAddressByPId(this.addressTwo[0].id) //默认显示二级的第一个地址的三级地址
						// console.log(this.addressTwo[0].id)
						this.multiArray = [
							this.toArr(this.addressOne),
							this.toArr(this.addressTwo),
							this.toArr(this.addressThree)
						]
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
			//反馈提示
			tising(bull, tips) {
				this.$nextTick(() => {
					this.$refs.tips.init(bull, tips)
				})
			},
			//获取微信昵称
			getUserInfo(event) {
				log(event)
				if (event.detail.userInfo) {
					uni.setStorageSync('userIN', event.detail.userInfo) //把token存在本地，小程序提供如同浏览器cookie
					let wxing = event.detail.userInfo
					this.wxCode(wxing.avatarUrl, wxing.nickName)
				}
				this.modaishow = false
			},
			//获取微信code
			wxCode(avatarUrl, nickName) {
				wx.login({
					success: (res) => {
						log(res)
						// return
						let code = res.code
						this.wxLoging(code)
					},
					fail: (err) => {
						log(err)
					}
				})
			},
			//发给后台拿token
			wxLoging(code) {
				log(code)
				let data = {
					code,
				}
				publicing2(loginis, data) //发送请求携带参数
					.then((res) => {
						log(res.data.token) //获得token
						uni.setStorageSync('usermen', res.data.token) //把token存在本地，小程序提供如同浏览器cookie
						var setdata = uni.getStorageSync('usermen')
						uni.showToast({
							title: '登陆成功'
						})
					})
					.catch((err) => {
						log(err)
					})
			},
			// 显示
			init() {
				this.modaishow = true
			},
			// 取消
			messcancel() {
				this.modaishow = false
			},
			//上传文件
			uploadImages(index) {
				this.flag = true
				//如果用户不点击上传图片，不用传参fileUrls，
				let that = this;

				uploadFiles((res) => {
					console.log(res) //上传文件路径
					that.imgDataLi[index].url = res.data //替换路径
					//设置对应的index为true
					that.urlListFlag[index] = true
					console.log(this.imgDataLi)
				});
			},
			//获取店铺信息
			getMerchants() {
				uni.showLoading({})
				let setdata = uni.getStorageSync('usermen')
				if (!setdata) {
					log(setdata)
					this.modaishow = true
				} else {
					// this.modaishow = false
					this.modaishow = false
				}
				log(setdata)
				let data = {
					goodsId: this.productID,
					token: setdata,
					number: 1
				}
				listing(getClient, data)
					.then((res) => {
						// uni.showToast({
						// 	title:`${res.data.msg}`,
						// 	icon:'none',
						// 	duration:1000
						// })
						log(res)
						this.ApproveStatus = res.data.data.approveStatus
						// log(this.ApproveStatus)
						this.StoreInfo = res.data.data
						// log(this.StoreInfo)
					})
					.catch((err) => {
						log(err)
					})
				uni.hideLoading()
			},
			//请求保存店铺
			postsaveStores(e) {
				//表单验证
				let rules = [{
						name: "storeName",
						rule: ["required", "isChinese", "minLength:2", "maxLength:20"], //可使用区间，此处主要测试功能
						msg: ["请输入店铺名称", "店铺名必须全部为中文", "请输入2个或以上字符", "不能超过20个字符"]
					},
					{
						name: "merchantsName",
						rule: ["required", "isChinese", "minLength:2", "maxLength:6"], //可使用区间，此处主要测试功能
						msg: ["请输入真实姓名", "姓名必须全部为中文", "请输入2个或以上字符", "不能超过6个字符"]
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
						name: "address2",
						rule: ["required", "isChinese", "minLength:4", "maxLength:30"], //可使用区间，此处主要测试功能
						msg: ["请填写详细地址", "请填写详细地址!!!", "请填写详细地址!!!", "请填写详细地址!!!!"]
					},

				];
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				if (!checkRes) {
					let imgDataLi = []
					let subNum = 0
					for (let i in this.urlListFlag) {
						if (this.urlListFlag[i]) {
							subNum++
						}
					}
					if (subNum < 1) {
						uni.showToast({
							title: '至少要上传一张照片',
							icon: 'none'
						})
						return
					}
					let setdata = uni.getStorageSync('usermen')
					let data = {
						storeName: e.detail.value.storeName,
						merchantsName: e.detail.value.merchantsName,
						phone: e.detail.value.phone,
						address: this.idAddress,
						addressDetails: e.detail.value.address2,
						serviceNumber: e.detail.value.serviceNumber,
						token: setdata,
						type: 1,
						fileUrls: JSON.stringify(this.imgDataLi) //上传图片专用格式
					}
					//判断用户是否点击上传图片，是否要传fileUrls,flase不传值
					if (this.flag == false) {
						delete data.fileUrls
						log('没有上传图片')
					} else if (this.flag == true) {
						log('点击了上传图片')
					}
					log(data)
					publicing(postSaveStore, data)
						.then((res) => {
							uni.showLoading({})
							log(res)
							// log(res.data.msg)
							if (res.data.code === -1) {
								uni.showToast({
									title: `${res.data.msg}`,
									icon: "none",
									duration: 3000
								});
								return
							}
							if (res.data.code === 200) {
								uni.showToast({
									title: `${res.data.msg}`,
									icon: "none",
									duration: 3000
								});
								uni.switchTab({
									url: '../../pages/my/my',
									success() {
										let page = getCurrentPages().pop();
										if (page == undefined || page == null) return;
										page.onLoad();
									}
								})
							}
							setTimeout(() => {
								uni.hideLoading()
							}, 300)

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
			//获取token
			getToken() {
				let setdata = uni.getStorageSync('usermen')
				// log(setdata)
			},
			//上传图片
			//进来先判断登录了没
			postShopping() {

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
						msg: ["请输入店铺名", "姓名必须全部为中文", "姓名必须2个或以上字符", "姓名不能超过6个字符"]
					},
					{
						name: "storeName",
						rule: ["required", "isChinese", "minLength:2", "maxLength:6"], //可使用区间，此处主要测试功能
						msg: ["请输入店铺名", "姓名必须全部为中文", "姓名必须2个或以上字符", "姓名不能超过6个字符"]
					}, {
						name: "phone",
						rule: ["required", "isMobile"],
						msg: ["请输入手机号", "请输入正确的手机号"]
					}
				];
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

		//下拉刷新
		onPullDownRefresh() {
			this.getMerchants()
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad() {
			this.postAddressDatas()

			/* this.multiArray = [
				this.toArr(this.selectList),
				this.toArr(this.selectList[0].children),
				this.toArr(this.selectList[0].children[0].children)
			] */
			this.getToken()
			this.getMerchants()
		}
	}
</script>

<style scoped>
	/deep/.tui-fillet {
		background: #ffffff !important;
		color: #fff;
	}

	.container {
		padding: 0rpx 0 250rpx 0;
	}

	.tui-list-title1 {
		height: 50rpx;
		line-height: 50rpx;
		font-size: 24rpx;
		color: rgba(112, 112, 112, 1);
		padding: 6px 16px;
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

	.imgUplod {
		width: 322rpx;
		height: 220rpx;
		margin: 0 30rpx;
		border: 1px solid #f5f5f5;
		border-radius: 16rpx;

	}

	.tui-list-title {
		height: 30rpx;
		line-height: 30rpx;
		margin: 10rpx 20rpx;
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

	.tui-line-cell2 {
		width: 100%;
		box-sizing: border-box;

		align-items: center;
	}

	.tui-title {
		min-width: 140rpx;
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

	.screen-img image {
		width: 40rpx;
		height: 40rpx;
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
		border-top: 1px solid #e5e5e5;

	}

	.tui-btn-box .tui-button-primary {
		border-radius: 40rpx;
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
		/* margin: 20rpx 0rpx; */
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
		margin: 20 rpx 0;
		width: 100%;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;


	}

	.colot-text-1 {
		color: #00C52A;
		font-size: 24rpx;

	}

	.tui-order-item {
		width: 50%;
		text-align: center;
	}

	.tui-icon-box {
		margin: 46rpx 0;
		position: relative;
	}

	.del-img {
		position: absolute;
		right: 6rpx;
		top: -16rpx;
	}

	.tui-order-text,
	.tui-tool-text {
		font-size: 26rpx;
		font-weight: 400;
		color: rgba(87, 87, 87, 1);
		padding-top: 22rpx;
	}

	.title-store {
		color: rgba(85, 85, 85, 1);
		font-size: 24rpx;
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

	/* 模态弹窗布局 */
	.warp {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 9999;
	}

	.warp-view {
		width: 500upx;
		height: 200upx;
		background: #FFFFFF;
		margin: auto;
		position: absolute;
		-webkit-position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		border-radius: 8upx;
		overflow: hidden;
	}

	.warp-text {
		text-align: center;
		margin-top: 30upx;
		font-size: 34upx;
		color: #666666;
	}

	.warp-flex {
		display: flex;
		justify-content: space-around;
		border-top: 1upx solid #EEEEEE;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80upx;
		line-height: 80upx;
	}

	.warp-flex button {
		border: none;
		font-size: 30upx;
	}

	/*end  */
</style>
