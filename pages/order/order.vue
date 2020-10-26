<template>
	<view class="container">
		
		<!-- <view class="tui-edit-goods">
			<view>购物车共<text class="tui-goods-num">{{cartIds.length}}</text>件商品</view>
			<view>
				<tui-button type="gray" :plain="true" shape="circle" width="160rpx" height="60rpx" :size="24" @click="editGoods">{{isEdit?"完成":"编辑商品"}}</tui-button>
			</view>
		</view> -->
		
		<view class="container-img" v-if="modaishow">
			<image src="../../static/images/big_logo.png" mode="widthFix" class="img-quanguo"></image>
			<!-- <text class="color-text">{{tips}}</text> -->
			<view class="btnbox"><button class="btn" type="default" open-type="getUserInfo" @getuserinfo="getUserInfo">去登录</button></view>
		</view>
		
		<view class="empty-img" v-if="!modaishow && orderObj.length=== 0">
			<image src="../../static/images/orderBMG.png" mode="widthFix"></image>
			<text class="color-text">进货单为空，赶紧去逛逛</text>
			<view class="color-border" @tap="goIndex"><text>去逛逛</text></view>
		</view>
		
		<checkbox-group @change="buyChange" v-if="!modaishow && orderObj.length!== 0">
			<view class="tui-cart-cell  tui-mtop" v-for="(item, index) in orderObj" :key="index">
				<view class="tui-activity">
					<view class="tui-bold">
						<image :src="item.url" mode="aspectFit" class="tui-head-log"></image>
						{{ item.name }}
					</view>
					<!-- <view class="tui-buy">去凑单<tui-icon name="arrowright" :size="18" color="#333"></tui-icon></view> -->
				</view>
				<tui-swipe-action :actions="actions" @click="handlerButton(itemTwo.id, itemTwo.goodsId)" :params="item" v-for="(itemTwo, indexs) in item.list"
				 :key="indexs">
					<template v-slot:content>
						<view class="tui-goods-item">
							<label class="tui-checkbox">
								<!-- <checkbox :value="itemTwo.id" :checked="checkFlag" color="#fff" ></checkbox> -->
								 <!-- @click="setIds(itemTwo.id)" -->
								<checkbox :value="itemTwo.id" :checked="itemTwo.selected" color="#fff"></checkbox>
							</label>
							<image :src="itemTwo.url" class="tui-goods-img" @tap="gotoList(itemTwo.goodsId)" />
							<view class="tui-goods-info">
								<view class="tui-goods-title">
									<text class="tag-tit">{{ itemTwo.labelName }}</text>
									{{ itemTwo.name }}
								</view>
								<view class="tui-goods-model">
									<view class="tui-model-text">{{ itemTwo.kg1 }}斤装</view>
								</view>
								
								<view class="tui-price-box">
									<view class="tui-goods-price">
										<text class="goods-price-tag">￥</text>
										<text class="goods-price-num">{{ ApproveStatus === 1 ? itemTwo.platformClientPrice :'***' | getPrice }}</text>
										<text>/件</text>
									</view>
									<!-- :custom="index" :index="indexs" 
									这个存储用的，第一个是存储最大外面的那个下标
									第二个是存储第二个循环的下标，这样才能找到对应的商品的 number
									
									这个是组件封装好了的，方法不能传参数，只能接受组件传出来的
									-->
									<tui-numberbox :value="itemTwo.number" iconColor="#444444" :height="48" :width="76" :min="0" :custom="index"
									 :index="indexs" @change="changeNum()"></tui-numberbox>
								</view>
							</view>
						</view>
					</template>
				</tui-swipe-action>
			</view>
		</checkbox-group>

		<!--tabbar-->
		<view class="tui-tabbar" v-if="!modaishow">
			<view class="tui-checkAll">
				<checkbox-group @change="checkAll">
					<label class="tui-checkbox">
						<checkbox :checked="isAll" color="#fff"></checkbox>
						<text class="tui-checkbox-pl">全选</text>
					</label>
				</checkbox-group>
				<!-- <view class="tui-total-price" v-if="!isEdit">合计:<text class="tui-bold">￥{{totalPrice | getPrice}}</text> </view> -->
			</view>
			<view class="tui-total-price" v-if="!isEdit">
				<text class="total-all">合计:</text>
				<text class="total-label">￥</text>
				<text class="total-price-num">{{ allPrice }}</text>
				<text class="total-label" v-if="cartIds.length !== 0">元</text>
				<text class="total-fee" v-if="cartIds.length !== 0">含运费</text>
			</view>
			<view class="pay-btns">
				<!-- cartIds.length 商品数量 -->
				<!-- <tui-button width="200rpx" height="70rpx" :size="30" type="danger" shape="circle" ></tui-button> -->
				<view class="go-pay" v-if="!isEdit && cartIds.length !== 0" @click="btnPay">结算</view>
				<view class="no-pay" v-if="!isEdit && cartIds.length === 0" @click="btnPay">结算</view>
				<tui-button width="200rpx" height="70rpx" :size="30" type="danger" shape="circle" :plain="true" v-if="isEdit" @tap="delClick">删除</tui-button>
				<!-- <tui-button width="200rpx" height="70rpx" :size="30" class="no-goods" type="danger" shape="circle"  @click="btnPay">结算</tui-button> -->
			</view>
		</view>
		<!--加载loadding-->
		<tui-loadmore v-if="loadding" :index="3" type="red"></tui-loadmore>
		<!-- 提示 -->
	</view>
</template>

<script>
	//请求方式
	import {
		listing,
		publicing,
		listing2,
		publicing2
	} from '../../api/api.js';
	//请求地址
	import {
		getCart,
		postDelOrder,
		postUpOrder,
		getClient,
		postSubmitOrder,
		loginis
	} from '../../api/request.js';
	var {
		log
	} = console;
	var setdata = uni.getStorageSync('usermen');
	export default {
		data() {
			return {
				tips: '',
				modaishow: false,
				isActive: true, //显示
				hasError: false, //隐藏
				ApproveStatus: 0, //店铺认证状态
				flag: false,
				checkFlag: false, //默认选中
				allFlag: '', //全选
				checkedArr: [], //存放选中的数据
				valueNum: 0,
				url: 'http://192.168.1.10:8980',
				orderObj: [],
				openid: '',
				neworder: [],
				isCheck: false,
				dataList: [{
						id: 'q2020811',
						buyNum: 1,
						price: 299.5,
						selected: false,
						imgsrc: '../../static/images/putao1.png',
						shopName: '大葡萄'
					},
					{
						id: 'q2020812',
						buyNum: 2,
						price: 499,
						selected: false,
						imgsrc: '../../static/images/niuyouguo1.png',
						shopName: '大哈密瓜'
					},
					{
						id: 'q2020813',
						buyNum: 3,
						price: 199,
						selected: false,
						imgsrc: '../../static/images/putao1.png',
						shopName: '大紫葡萄'
					}
				],
				isAll: false,
				totalPrice: 0,
				buyNum: 0,
				cartIds: [], //购物车id
				actions: [{
					name: '删除',
					color: '#fff',
					fontsize: 28,
					width: 64,
					background: '#F82400'
				}],
				actions2: [{
						name: '看相似',
						color: '#fff',
						fontsize: 28,
						width: 64,
						background: '#FF7035'
					},
					{
						name: '删除',
						color: '#fff',
						fontsize: 28,
						width: 64,
						background: '#F82400'
					}
				],
				isEdit: false,
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				allPrice: 0, //总价
				curId: 0,
			};
		},
		filters: {
			getPrice(price) {
				if (price === '***') {
					return price
				}
				price = price || 0;
				return price.toFixed(2);
			}
		},
		methods: {
			goIndex() {
				uni.switchTab({
					url: '../index/index'
				});
			},

			init(bull, tips) {
				this.modaishow = bull;
				this.tips = tips;
			},
			//获取头像昵称
			getUserInfo(event) {
				// log(event)
				this.usering = event.detail.userInfo;
				uni.setStorageSync('userIN', event.detail.userInfo); //把头像存在本地，小程序提供如同浏览器cookie
				let userING = uni.setStorageSync('userIN', event.detail.userInfo);
				if (event.detail.userInfo) {
					let wxing = event.detail.userInfo;
					this.wxCode(wxing.avatarUrl, wxing.nickName);
				}
				// wx.startPullDownRefresh()
			},
			//获取code
			wxCode(avatarUrl, nickName) {
				wx.login({
					success: res => {
						// log(res)
						let code = res.code;
						this.wxLoging(code);
					},
					fail: err => {
						log(err);
					}
				});
			},
			//发code给后台换取token
			wxLoging(code) {
				log(code);

				// let appid = wx.getAccountInfoSync().miniProgram.appId
				// let secret = "956f8c9345cbe06a42c6494f7bb53f7f"
				let data = {
					code
				};
				uni.showLoading({
					title: '加载中',
					icon: 'none'
					// mask:true
				});
				publicing2(loginis, data) //发送请求携带参数
					.then(res => {
						if (res.statusCode == 500) {
							uni.showModal({
								title: '提示',
								content: '服务器错误，请重新登录获取信息',
								success: function(res) {
									if (res.confirm) {
										// console.log('用户点击确定');
										uni.hideLoading();
									} else if (res.cancel) {
										// console.log('用户点击取消');
										uni.hideLoading();
									}
								}
							});
							return;
						} else if (res.statusCode == 200) {
							log(res);
						}
						// log(res) //获得token
						uni.setStorageSync('usermen', res.data.token); //把token存在本地，小程序提供如同浏览器cookie

						this.modaishow = false;
						this.orderIng();
						this.getMerchants();
						uni.hideLoading();
					})
					.catch(err => {
						uni.showToast({
							title: `${err}`
						});

						log(err);
					});
			},
			//购买前获取申请店铺状态信息
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
			//计算总价
			jieSuanPrice() {
				let allPrice = 0; //总价
				for (let index in this.orderObj) {
					let oneData = this.orderObj[index].list;
					for (let indexTwo in oneData) {
						let goodsData = oneData[indexTwo];
						//indexOf 此方法判断数组中是否存在某个值，如果存在返回数组元素的下标，否则返回-1
						if (this.cartIds.indexOf(goodsData.id) != -1) {
							//判断选中的商品id数组中是否包含
							//获取单价
							//获取数量
							//两个相乘
							allPrice = allPrice + goodsData.number * goodsData.platformClientPrice;
						}
					}
				}
				let order = this.orderObj
				this.allPrice = allPrice.toFixed(2); //保留两位小数toFixed
			},
			//请求订单列表
			orderIng() {
				let setdata = uni.getStorageSync('usermen');
				// console.log("setdata==========", setdata)
				let data = {
					token: setdata
				};
				listing(getCart, data)
					.then(res => {
						let lists = res.data.data
						lists.forEach(item=>{
							console.log(item)
							item.list.forEach(itm=>{
								Object.assign(itm,{selected:false})
								console.log("itm",itm)
							})
						})
						this.orderObj = lists;
					})
					.catch(err => {
						log(err);
					});
			},

			//商品详情页
			gotoList(id) {
				log(id);
				// 	return
				uni.navigateTo({
					url: '../../pagesIII/productDetail/productDetail?id=' + id
				});
			},

			//反馈提示
			tising(bull, tips) {
				this.init(bull, tips);
			},
			//结算
			calcHandle() {
				let buyNum = 0;
				let totalPrice = 0;
				let selectedNum = 0;
				this.dataList.map(item => {
					if (item.selected) {
						buyNum += item.buyNum;
						totalPrice += item.price * item.buyNum;
						selectedNum++;
					}
				});
				this.isAll = selectedNum === this.dataList.length;
				this.buyNum = buyNum;
				this.totalPrice = totalPrice;
			},

			//更新进货单数量
			changeNum(e) {
				uni.showLoading({});
				// console.log(e)
				if (e.value < 1) {
					e.value = 1
					uni.showToast({
						title: '不能再少啦～',
						icon: 'none'
					})
				}
				this.orderObj[e.custom].list[e.index].number = e.value;
				//计算价格
				this.jieSuanPrice();

				/* this.valueNum = e.value */
				/* this.orderObj[index].number 
					this.valueNum = e.value
					console.log(e.value) */
				let data = {
					id: this.orderObj[e.custom].list[e.index].id,
					goodsId: this.orderObj[e.custom].list[e.index].goodsId,
					number: this.orderObj[e.custom].list[e.index].number,
					token: setdata
				};
				// log(data)
				//更新我的加购单
				publicing(postUpOrder, data)
					.then(res => {
						// log(res)
						// log(res.data.msg)
						// uni.showToast({
						// 	title:`${}`
						// })
						uni.hideLoading();
					})
					.catch(err => {
						log(err);
					});

				// this.dataList[e.index].buyNum = e.value
				// setTimeout(() => {
				// 	this.calcHandle()
				// }, 0)
			},
			//删除商品
			handlerButton(id, goodsId) {
				log(id);
				var setdata = uni.getStorageSync('usermen');
				let data = {
					id: id,
					goodsId: goodsId,
					token: setdata
				};
				// log(data)
				publicing(postDelOrder, data)
					.then(res => {
						// log(res)

						uni.showToast({
							title: `${res.data.msg}`
						});
						this.orderIng();

						// this.$forceUpdate();
					})
					.catch(err => {
						log(err);
						uni.showToast({
							title: '删除失败'
						});
					});
				// let index = e.index;
				// let item = e.item;
			},
			editGoods: function() {
				// #ifdef H5 || MP
				this.isEdit = !this.isEdit;
				// #endif
			},
			detail: function() {
				uni.navigateTo({
					url: '../productDetail/productDetail'
				});
			},

			//提交订单
			postSubOrder() {
				if (this.ApproveStatus != 1) {
					uni.showToast({
						title: '您还没有验证店铺',
						icon: 'none'
					});
					return;
				}
				if (this.cartIds.length <= 0) {
					this.isAll = false;
					this.checkFlag = false;
					this.flag = false;
					//提示没有选择任何商品，不可结算
					uni.showToast({
						title: '先勾选要结算商品呀！',
						icon: 'none'
					});
					// console.log("提示没有选择任何商品，不可结算")
					return;
				}
				//结算,获取到选中的商品id数组
				console.log(this.cartIds);
				let setdata = uni.getStorageSync('usermen');
				//拼接字符串id
				let ids = '';
				for (let index in this.cartIds) {
					ids = ids + this.cartIds[index] + ',';
				}
				//去除ids最后一个逗号
				ids = ids.substring(0, ids.length - 1);
				return;
				let data = {
					id: ids,
					token: setdata
				};
				publicing(postSubmitOrder, data)
					.then(res => {
						// log(res)
						uni.navigateTo({
							url: '../../pagesIII/submitOrder/submitOrder?ids=' + ids
						});
					})
					.catch(err => {
						log(err);
					});
			},

			//去结算
			btnPay() {
				if (this.ApproveStatus != 1) {
					uni.showToast({
						title: '您还没有验证店铺',
						icon: 'none'
					});
					return;
				}
				if (this.cartIds.length <= 0) {
					//提示没有选择任何商品，不可结算
					uni.showToast({
						title: '先勾选要结算商品呀！',
						icon: 'none'
					});
					return;
				}
				//结算,获取到选中的商品id数组
				// console.log(this.cartIds);
				//拼接字符串id
				let ids = '';
				for (let index in this.cartIds) {
					ids = ids + this.cartIds[index] + ',';
				}
				//去除ids最后一个逗号
				ids = ids.substring(0, ids.length - 1);
				this.orderID = ids;

				//去结算页面
				uni.navigateTo({
					url: '../../pagesIII/submitOrder/submitOrder?ids=' + ids
				});
			},
			// setIds(id) {
			// 	this.curId = id
				
			// },
			//加购单,勾选
			buyChange(e) {
				let lists = this.orderObj
				let target = e.detail.value
				let selectedNum = 0
				lists.forEach(item=> {
					selectedNum += item.list.length
					item.list.forEach((itm,index)=> {
						// console.log(itm)
						let idxs = target.findIndex(im=>{
							// console.log(im)
							return itm.id === im
						})
						// console.log(idxs)
						if (idxs !== -1) {
							itm.selected = true
						} else {
							itm.selected = false
						}
					})
				})
				if (selectedNum === target.length){
					this.isAll = true
				}else {
					this.isAll = false
				}
				this.orderObj = lists
				this.cartIds = target
				//计算价格
				this.jieSuanPrice();
				console.log(lists,selectedNum)
			},
			//全选
			checkAll(e) {
				this.isAll = !this.isAll
				console.log(this.isAll)
				let lists = this.orderObj
				let arr = []
				if (this.isAll === false) {
					lists.forEach(item => {
						item.list.forEach(itm => {
							itm.selected = false
							this.$forceUpdate();
						})
					})
					console.log(lists)
					this.cartIds = []
					this.orderObj = lists
				} 
				if (this.isAll === true) {	
					lists.forEach(item => {
						item.list.forEach(itm => {
							itm.selected = true
							arr.push(itm.id)
							this.$forceUpdate();
						})
					})
					console.log(lists)
					let res = new Set(arr)
					this.orderObj = lists
					this.cartIds = Array.from(arr)
				}
				this.$forceUpdate(); //强制刷新当前数据，因为 this.orderObj[index].list[indexTwo]. 双层数组，层级太高了，导致不渲染数据
				//计算价格
				this.jieSuanPrice();

			},
			onclike() {
				this.flag = false;
				this.isAll = false;
			}
		},
		watch: {
			// "checkedNames": function() {
			//     if (this.checkedNames.length == this.checkedArr.length) {
			//         this.checked = true
			//     } else {
			//         this.checked = false
			//     }
			// }
		},
		// 看订单的前提条件就是是否登录
		onShow() {
			//下拉刷新
			this.allPrice = 0;
			this.onclike();
			this.isAll = false
			this.isCheck = false;
			this.cartIds = []; //清空id
			this.getMerchants();
			let setdata = uni.getStorageSync('usermen');
			console.log(setdata)
			if (!setdata) {
				this.hasError = true;
				this.isActive = false;
				let bull = true;
				let tips = '请登录后再查看';
				this.tising(bull, tips);
			} else {
				let bull = false;
				let tips = '';
				this.tising(bull, tips);
				this.orderIng();
				log('显示订单');
			}
			let olist = this.orderObj;
			if (olist.length === 0) {
				return;
			} else {
				olist.forEach((item, index) => {
					item.list.forEach((itm, idx) => {
						if (!itm) {
							return;
						} else {
							itm.selected = false;
						}
					});
				});
				this.orderObj = olist;
			}
		},
		onLoad() {
			this.flag = false;
		},
		onPullDownRefresh() {
			let setdata = uni.getStorageSync('usermen');
			this.orderIng();
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},

		onNavigationBarButtonTap(e) {
			this.isEdit = !this.isEdit;
			let text = this.isEdit ? '完成' : '编辑';
			// #ifdef APP-PLUS
			let webView = this.$mp.page.$getAppWebview();
			webView.setTitleNViewButtonStyle(0, {
				text: text
			});
			// #endif
		}
	};
</script>

<style>
	.container {
		padding-bottom: 120rpx;
	}

	/* 隐藏 */
	.text-danger {
		display: none !important;
	}

	/* 显示 */
	.active {
		display: block;
	}

	.tui-mtop {
		margin-top: 24rpx;
	}

	/* 头像 */
	.tui-head-log {
		width: 40rpx;
		height: 40rpx;
		display: block;
		margin-right: 20rpx;
	}

	.container-img {
		/* margin-top: 150rpx; */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.img-quanguo {
		width: 380rpx;
		height: 486rpx;
	}

	.color-text {
		font-size: 32rpx;
		color: rgba(112, 112, 112, 1);
	}

	.color-border {
		width: 300rpx;
		height: 80rpx;
		line-height: 80rpx;
		border: 1rpx solid rgba(0, 197, 42, 1);
		border-radius: 60rpx;
		text-align: center;
		color: rgba(0, 197, 42, 1);
		margin-top: 60rpx;
		box-shadow: 0 0 6rpx -1rpx;
		-webkit-box-shadow: 0 0 6rpx -1rpx;
	}

	.tui-edit-goods {
		width: 100%;
		border-radius: 12rpx;
		overflow: hidden;
		padding: 24rpx 30rpx 0 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #333;
		font-size: 24rpx;
	}

	.tui-goods-num {
		font-weight: bold;
		color: #ff5600;
	}

	.tui-cart-cell {
		width: 100%;
		border-radius: 12rpx;
		background: #ffffff;
		padding: 40rpx 0;
		overflow: hidden;
	}

	.tui-goods-item {
		display: flex;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-checkbox {
		min-width: 70rpx;
		display: flex;
		align-items: center;
	}

	/* #ifdef MP-WEIXIN */
	.tui-checkbox .wx-checkbox-input {
		width: 40rpx;
		height: 40rpx;
		margin-right: 0 !important;
		border-radius: 50% !important;
		transform: scale(0.8);
		border-color: #d1d1d1 !important;
	}

	.tui-checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		background: #00bc45;
		width: 44rpx !important;
		height: 44rpx !important;
		border: none;
	}

	/* #endif */
	/* #ifndef MP-WEIXIN */

	>>>.tui-checkbox .uni-checkbox-input {
		width: 40rpx;
		height: 40rpx;
		margin-right: 0 !important;
		border-radius: 50% !important;
		transform: scale(0.8);
		border-color: #d1d1d1 !important;
	}

	>>>.tui-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		background: #00bc45;
		width: 45rpx !important;
		height: 45rpx !important;
		border: none;
	}

	/* #endif */
	.tui-goods-img {
		width: 150rpx;
		height: 150rpx !important;
		border-radius: 12rpx;
		flex-shrink: 0;
		display: block;
		background: #ddd;
		border: 1px solid #e5e5e5;

	}

	.tui-goods-info {
		width: 100%;
		padding-left: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		box-sizing: border-box;
		overflow: hidden;
	}

	.tui-goods-title {
		white-space: normal;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 28rpx;
		color: #333;
		font-weight: 500;
	}

	.tag-tit {
		/* 渐变色 */
		background: linear-gradient(to right, #00c94a, #00ac3f);
		margin-right: 10rpx;
		padding: 0 10rpx;
		border-radius: 15rpx 0 15rpx 0;
		color: #fff;
		font-size: 24rpx;
	}

	.tui-goods-model {
		max-width: 100%;
		color: #333;
	}

	.tui-model-text {
		font-size: 24rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 400rpx;
		color: #666666;
	}

	.tui-price-box {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	.tui-goods-price {
		font-size: 20rpx;
		font-weight: 400;
		color: #b6b6b6;
	}

	.goods-price-tag {
		font-size: 16rpx;
		color: #ff5600;
	}

	.goods-price-num {
		color: #ff5600;
		font-size: 32rpx;
		font-weight: bold;
	}

	.tui-scale {
		transform: scale(0.8);
		transform-origin: 100% 100%;
	}

	.tui-activity {
		font-size: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx 20rpx 28rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #f5f5f5;
		margin-bottom: 26rpx;
	}

	.tui-buy {
		display: flex;
		align-items: center;
	}

	.tui-bold {
		font-weight: bold;
		display: flex;
	}

	.tui-sub-info {
		max-width: 532rpx;
		font-size: 24rpx;
		line-height: 24rpx;
		padding: 20rpx 30rpx 10rpx 30rpx;
		box-sizing: border-box;
		color: #333;
		transform: scale(0.8);
		transform-origin: 100% center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-left: auto;
	}

	.tui-invalid-text {
		width: 66rpx;
		margin-right: 4rpx;
		text-align: center;
		font-size: 24rpx;
		color: #fff;
		background: rgba(0, 0, 0, 0.3);
		transform: scale(0.8);
		transform-origin: center center;
		border-radius: 4rpx;
		flex-shrink: 0;
	}

	.tui-gray {
		color: #b2b2b2 !important;
	}

	.tui-goods-invalid {
		color: #555;
		font-size: 24rpx;
	}

	.tui-flex-center {
		align-items: center !important;
	}

	.tui-invalid-ptop {
		padding-top: 40rpx;
	}

	.tui-tabbar {
		width: 100%;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		padding: 30rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		z-index: 99999;
	}

	.tui-tabbar::before {
		content: '';
		width: 100%;
		border-top: 1rpx solid #d9d9d9;
		position: absolute;
		top: 0;
		left: 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.tui-checkAll {
		display: block;
		width: 20%;
	}

	.tui-checkbox-pl {
		padding-left: 12rpx;
	}

	.tui-total-price {
		width: 50%;
		display: flex;
		font-size: 30rpx;
		justify-content: flex-end;
		align-items: baseline;
	}

	.total-all {
		font-size: 24rpx;
		font-weight: 400;
		color: #333;
	}

	.total-label {
		color: #ff5600;
		font-weight: 400;
		font-size: 24rpx;
	}

	.total-price-num {
		color: #ff5600;
		font-size: 36rpx;
		font-weight: bold;
		margin: 0 4rpx;
	}

	.total-fee {
		font-size: 22rpx;
		font-weight: 400;
		color: #888888;
	}

	.pay-btns {
		width: 30%;
	}

	.go-pay {
		background: linear-gradient(to right, #00c52a, #00bc45);
		color: #fff;
		width: 90%;
		padding: 12rpx 0;
		text-align: center;
		border-radius: 40rpx;
		font-size: 32rpx;
		margin: 0 auto;
		fong-weight: 400;
	}

	.no-pay {
		background: #ddd;
		color: #fff;
		width: 90%;
		padding: 12rpx 0;
		text-align: center;
		border-radius: 40rpx;
		font-size: 32rpx;
		margin: 0 auto;
		fong-weight: 400;
	}

	/*猜你喜欢*/
	.tui-youlike {
		padding-left: 12rpx;
	}

	.tui-product-list {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
	}

	.tui-product-container {
		flex: 1;
		margin-right: 2%;
	}

	.tui-product-container:last-child {
		margin-right: 0;
	}

	.tui-pro-item {
		width: 100%;
		margin-bottom: 4%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		overflow: hidden;
	}

	.tui-pro-img {
		width: 100%;
		display: block;
	}

	.tui-pro-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.tui-pro-tit {
		color: #2e2e2e;
		font-size: 26rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-pro-price {
		padding-top: 18rpx;
	}

	.tui-sale-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
	}

	.tui-factory-price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}

	.tui-pro-pay {
		padding-top: 10rpx;
		font-size: 24rpx;
		color: #656565;
	}

	/* ==== */
	.order-no {
		width: 400upx;
		height: 400upx;
		margin: 90upx auto 0 auto;
		text-align: center;
		font-size: 28upx;
	}

	.order-no image {
		display: block;
		width: 250upx;
		height: 250upx;
		margin: 0 auto;
		padding-bottom: 30upx;
	}

	.empty-img {
		/* margin-top: 150rpx; */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.color-text {
		color: rgba(112, 112, 112, 1);
	}

	.btnbox {
		position: relative;
		top: 100rpx;
		width: 100%;
	}

	button::after {
		/* border: 2rpx solid #00AC3F; */
	}

	button {
		background-color: #fff !important;
		/* background-color: transparent; */
		padding-left: 0;
		padding-right: 0;
		line-height: inherit;
	}

	button {
		border-radius: 0;
	}

	.btn {
		border-radius: 100rpx;
		height: 80rpx;
		width: 300rpx;
		background-color: #ffffff;
		border: 1px solid rgba(0, 197, 42, 1);
		color: rgba(0, 197, 42, 1) !important;
		padding: 16rpx 0;
		font-size: 32rpx;
		box-shadow: 0 0 6rpx -1rpx;
	}
</style>
