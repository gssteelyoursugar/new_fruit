<template>
	<view class="container" :style="{paddingTop: navHeight + 'px'}">
		<view class="index-bg" :style="{opacity: bgOpcity}">
			<image src="../../static/images/index_bg.png" :style="{height: statusHeight <= 20 ?'318rpx' : '338rpx'}" mode="aspectFill"></image>
		</view>
		<view class="tui-header-box" :style="{ height: navHeight + 'px', background: 'rgba(0,197,42,' + opcity + ')' }">
			<view class="tui-header" :style="{ marginTop: statusHeight + 'px',height: boxHeight + 'px' }">
				<view class="tui-left" @click="scanCode">
					<image src="../../static/images/sceen.png" mode="aspectFit" class="tui-left-saoma"></image>
				</view>
				<view class="tui-mid">
					<image src="../../static/images/logo.png" mode="aspectFit" class="tui-logo"></image>
				</view>
				<view class="tui-left"></view>
			</view>
		</view>
		<view class="weather-container" style="margin: 10rpx 0 20rpx;" :style="{opacity: canSee}">
			<view class="weather-tui-flex ">
				<view class="weather-tui-left ">
					<image src="../../static/images/dingwei@2x.png" mode="aspectFit" class="weather-dingwei"></image>
					<text class="weather-city" style="font-size: 24rpx;" v-if="address&& ApproveStatus === 1">配送至{{address}}</text>
					<text class="weather-city" v-if="ApproveStatus !== 1">配送至</text>
					<view class="weather-tui-class" v-if="ApproveStatus !== 1 && showAuthTips">
					</view>
					<view class="weather-tui-class2" v-if="ApproveStatus !== 1 && showAuthTips">
						请认证店铺信息
					</view>
				</view>
				<view class="weather-tui-right" v-if="ApproveStatus === 1 ">
					<text>{{weatherObj.weather}}</text><text>{{weatherObj.temperature}}℃</text>
				</view>
			</view>
		</view>
		<view class="index-content">
			
			<Banner @childSwitch="goToLimit" :banner="WxIndexViewpager"></Banner>
			<view class="bac">
				<view class="tui-tag">
					<block v-for="(item,index) in WxPostersBottomAdve" :key="index">
						<view class="tui-row">
							<image :src="item.url" mode="aspectFit" class="iconImg icon-right"></image> {{item.title}}
						</view>
					</block>
				</view>
			</view>
			<!-- 金刚区 -->
			<view class=" swiper-item-top">
				<block v-if="WxTopNavigationBar">
					<view class="conteng-img" @tap="hrefKing(index)"  v-for=" (item,index) in WxTopNavigationBar" :key="index">
						<image :src="item.url" mode="widthFix" class="uploadimg1"></image>
						<text>{{item.title}}</text>
					</view>
				</block>
				<block v-if="!WxTopNavigationBar || WxTopNavigationBar.length=== 0">
					<view class="conteng-img" @tap="hrefKing(index)"  v-for="item of 5" :key="item">
						<view class="loading-bg"></view>
						<view class=""></view>
					</view>
				</block>
			</view>
			<view class="swiper-item">
				<block v-if="HotVarieties">
					<view class="conteng-img contentitem" v-for=" (item,index) in HotVarieties" :key="index" @tap="gotoBreed(item.name,item.id)">
						<image :src="item.url" mode="widthFix" class="uploadimg"></image>
						<text>{{item.name}}</text>
					</view>
				</block>
				<block v-if="!HotVarieties || HotVarieties.length === 0">
					<view class="conteng-img contentitem" v-for=" (item,index) in 9" :key="index" @tap="gotoBreed(item.name,item.id)">
						<view class="hot-loading-bg"></view>
						<view></view>
					</view>
				</block>
				<view class="conteng-img contentitem" @tap="gotoGun">
					<image src="../../static/images/gengduo@3x.png" mode="widthFix" class="uploadimg"></image>
					<text>查看更多</text>
				</view>
			</view>
			<!-- 温馨提示 -->
			<view class="tui-reminder">
				<view class="tui-rolling-news">
					<tui-icon style="margin-top: 4rpx;" name="news-fill" :size='28' color='#00BF3D'></tui-icon>
					<swiper vertical autoplay circular interval="3000" class="tui-swiper">
						<swiper-item v-for="(item,index) in WxPublicMsg" :key="index" class="tui-swiper-item">
							<view class="tui-news-item">{{item.title}} </view>
							<text class="tui-see" @tap="goTimeInfo(item.id,item.content,item.title,item.createDate)">查看<text class="iconfont icon-weibiaoti34"></text></text>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<!-- 限量批 -->
			<view class="tui-count-down">
				<view class="limit-title" @click="goLimit()">
					<text class="tui-font">爆品限量批</text>
				</view>
				<!-- 倒计时 -->
				<view class=" tui-line-hight">
					<tui-countdown :time="ts" color="#fff" borderColor="rgba(70, 66, 70, 1)" backgroundColor="rgba(70, 66, 70, 1)"
					 colonColor="rgba(70, 66, 70, 1)" @end="endOfTime">
					</tui-countdown>
				</view>
				<view class="new-fruit-title" @click="fruitGo">
					<text class="tui-font">新果上市</text>
					<text class="tui-barcolor">抢鲜市场 <text class="iconfont icon-weibiaoti34"></text> </text>
				</view>
			</view>
			<!-- 限量批 -->
			<view class="tui-center-Time-New" style="display: flex;">
				<view class="tui-Fruits" style="width: 50%;text-align: center;" @click="goLimit()">
					<block v-for="(item,index) in WxActivityList" :key="index">
						<view class="tui-Fruits-table">
							<image :src="item.url" mode="aspectFit" class="active-img" ></image>
							<view class="tui-price">
								<view class="tui-first-price">&yen;<text class="tui-price-color">{{ ApproveStatus === 1 ?item.platformClinetPrice: '***'}}</text><text
									 class="price-label">/件</text></view>
								<view class="tui-last-price" v-if="item.marketPrice && item.marketPrice != 0">&yen;<text class="tui-cribing">{{ApproveStatus === 1 ?item.marketPrice:'***'}}</text></view>
							</view>
							<text class="tui-weight">{{item.specification}}</text>
						</view>
					</block>
				</view>
				<!-- 鲜果上市 -->
				<view class="tui-Fruits" style="width: 50%;text-align: center;">
					<block v-for="(item,index) in NewGoods" :key="index">
						<view class="tui-Fruits-table" @click="fruitGo">
							<image :src="item.url" mode="aspectFit" class="active-img"></image>
							<view class="tui-price">
								<view class="tui-first-price">&yen;<text class="tui-price-color">{{ApproveStatus === 1 ?item.platformClinetPrice:'***'}}</text><text
									 class="price-label">/件</text></view>
								<view class="tui-last-price" v-if="item.marketPrice &&item.marketPrice != 0">&yen;<text class="tui-cribing">{{ApproveStatus === 1 ?item.marketPrice:'***'}}</text></view>
							</view>
							<text class="tui-weight">{{item.specification}}</text>
						</view>
					</block>
				</view>
			</view>
			<!-- 1像素边框 -->
			<view class="tui-border-top">
				<view class="tui-border-bottom"></view>
			</view>
			<!-- 水果排行榜 -->
			<view class="tui-Fruits-ranking">
				<block v-for="(item,index) in dataList" :key="index">
					<view class="tui-Fruits-ranking-tab" @tap="goToRank(index,item.value)">
						<text class="tui-Fruits-ranking-font-wei">{{item.name}}</text>
						<view class="tui-Fruits-ranking-lien">
							<text class="tui-Fruits-ranking-tab-font">{{item.title}}</text>
						</view>
						<image :src="item.imgsrc" class="tabimg"></image>
					</view>
				</block>
			</view>
			<!-- 推荐好货 -->
			<view class="xiding" :style="{top: navHeight+ 'px'}">
				<view class="tui-recommend">
					<block v-for="(item,index) in flexing" :key="index">
						<view class="tui-fixed-3 " @click="flexClick(index)">
							<view class="borderRight" v-if="index == 1 || index == 2"></view>
							<view class="fixed-3-font-wei" :class="{fixedweight:index == num}">{{item.title}}</view>
							<view class="fixed-3-font-weitwo" :class="{fixed3fontweione:index == num}">{{item.name}}</view>
						</view>
					</block>
				</view>
			</view>

			<!-- 水果列表页 -->
			<view class="tui-product-box">
				<view class="tui-product-list">
					<view class="tui-product-container">
						<!--商品列表1-->
						<block v-for="(item, index) in IndexGoods" :key="index" v-if="(index + 1) % 2 != 0" @tap="gotoList(item.id)">
							<view class="tui-pro-item" hover-class="hover" @tap="gotoList(item.id)" :hover-start-time="150">
								<view class="img-mask">
									<image :src="item.url" class="tui-pro-img" mode="widthFix" />
									<view class="img-mask-item" v-if="item.number === 0">
										<view class="item-text">抢光了</view>
									</view>
								</view>
								<view class="tui-pro-content">
									<view class="tui-pro-tit">
										<text class="tag-tit">{{item.lableName}}</text>
										<text class="tag-tit-text">{{item.name}}</text>
									</view>
									<view>
										<view class="tui-pro-price">
											<text class="tui-sale-price">{{item.describe}}</text>
											<!-- <text class="tui-factory-price">￥20</text> -->
										</view>
										<view class="tui-pro-pay">
											<block v-for="(itemTwo,indexs) in item.goodsType" :key="indexs">
												<view class="tag-tit-border">{{itemTwo.name}}</view>
											</block>
										</view>
										<view class="tui-pro-pic">
											<view class="tui-rate">
												<text>&yen;</text>
												{{ApproveStatus===1? item.platformClinetPrice:'***'}}
												<text class="tui-rate-text "> /件</text>
											</view>
											<view class="tui-rate-price" v-if="item.marketPrice &&item.marketPrice != 0"><text>&yen;</text>{{ApproveStatus===1? item.marketPrice:'***'}}</view>
											<text class="tui-praise  " @tap="praise(index)">
												<text class="tui-praise iconfont icon-like  " v-if="!item.showSearch1"></text>
												<text class="tui-praise iconfont icon-dianzan " v-if="item.showSearch1"></text>{{item.praiseNumber |filterNum}}
											</text>
										</view>
										<view class="tui-pro-dea">
											<text class="tui-jin1">{{item.specification}}</text>
											<text class="tui-jin">成交<text class="tui-dea-color">{{item.total | filterNum}}</text>元</text>
										</view>
									</view>
								</view>
							</view>
						</block>
					</view>
					<view class="tui-product-container2">
						<!--商品列表2-->
						<block v-for="(item, index) in IndexGoods" :key="index" v-if="(index + 1) % 2 == 0">
							<view class="tui-pro-item" hover-class="hover" @tap="gotoList(item.id)" :hover-start-time="150">
								<view class="img-mask">
									<image :src="item.url" class="tui-pro-img" mode="widthFix" />
									<view class="img-mask-item" v-if="item.number === 0">
										<view class="item-text">抢光了</view>
									</view>
								</view>
								<view class="tui-pro-content">
									<view class="tui-pro-tit">
										<text class="tag-tit">{{item.lableName}}</text>
										<text class="tag-tit-text">{{item.name}}</text>
									</view>
									<view>
										<view class="tui-pro-price">
											<text class="tui-sale-price">{{item.describe}}</text>
											<!-- <text class="tui-factory-price">￥20</text> -->
										</view>
										<view class="tui-pro-pay">
											<block v-for="(itemTwo,indexs) in item.goodsType" :key="indexs">
												<view class="tag-tit-border">{{itemTwo.name}}</view>
											</block>
										</view>
										<view class="tui-pro-pic">
											<view class="tui-rate">
												<text>&yen;</text>
												{{ApproveStatus===1? item.platformClinetPrice:'***'}}
												<text class="tui-rate-text "> /件</text>
											</view>
											<view class="tui-rate-price" v-if="item.marketPrice &&item.marketPrice != 0"> <text>&yen;</text>{{ApproveStatus===1? item.marketPrice:'***'}}</view>
											<text class="tui-praise  " @tap="praise(index)">
												<text class="tui-praise iconfont icon-like  " v-if="!item.showSearch1"></text>
												<text class="tui-praise iconfont icon-dianzan " v-if="item.showSearch1"></text>{{item.praiseNumber |filterNum}}
											</text>
										</view>
										<view class="tui-pro-dea">
											<text class="tui-jin1">{{item.specification}}</text>
											<text class="tui-jin">成交<text class="tui-dea-color">{{item.total | filterNum}}</text>元</text>
										</view>
									</view>
								</view>
							</view>
						</block>
					</view>
				</view>
			</view>
			<tui-nomore v-if="!pullUpOn"></tui-nomore>
			<view class="tui-safearea-bottom"></view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	import Weather from './components/weather.vue'
	import Banner from './components/banner.vue'
	// import amap from '@/common/SDK/amap-wx.js'
	import amap from '../../common/SDK/amap-wx.js';
	//请求
	import {
		listing,
		publicing,
		listing2
	} from '../../api/api.js'
	//请求地址
	import {
		getIndex,
		getClassify,
		url,
		postActivity,
		getNewsAll,
		getActivity,
		getClient
	} from '../../api/request.js'

	// 引入vuex的mapstate
	import {
		mapState
	} from 'vuex'
	var {
		log
	} = console
	var isFirst = true;
	var isFirst1 = true;
	export default {
		components: {
			Weather,
			Banner
		},
		data() {
			return {
				showAuthTips: true,
				address: '', //地址
				ApproveStatus: 0,
				itemList: [{
						title: '首页',
						icon: 'home'
					},
					{
						title: '收藏',
						icon: 'star'
					},
					{
						title: '分享',
						icon: 'partake'
					}
				],
				show: false,
				NewGoods: [], //新果上市
				WxActivityList: [], //限量批
				WeatherHide: true,
				startTime: 0,
				endTime: 0,
				createTime: 0,
				ts: 0,
				mm: 0,
				ss1: 59,
				imageUrl: "/static/images/paihang@2x.png",
				rankBgUrl: "/static/images/paihangbang@2x.png",
				bannerIndex: 0,
				menuShow: false,
				popupShow: false,
				value: 1,
				collected: false,
				WxActivityID: '', //限量批请求id
				IndexGoods: [],
				WxActivity: {}, //限量批
				WxTopNavigationBar: [], //金刚区
				WxPostersBottomAdve: [],
				WxPublicMsg: [],
				WxPublicMsgID: '', //公告ID
				WxIndexViewpager: [], //轮播
				HotVarieties: [], //分类列表区
				url: 'http://192.168.1.10:8980/',
				// url:'http://120.25.195.214:8980/js',
				opcity: 0.3, //渐变
				bgOpcity: 1,
				scrollH: 0, //滚动总高度
				height: 84, //header高度
				heightg: 84,
				top: 60, //标题图标距离顶部距离
				canSee: 1,
				num: 0,
				Sumify: '1', //推荐好货请求页码
				pullUpOn: true, //加载完了
				loadding: false,
				pageIndex: 1,
				praiseNum: 0,
				praiseNum1: 0,
				showSearch: false,
				showSearch1: false,
				key: '0619951c6f113f019b42f0bdc2a0e580', //小程序定位key
				webkey: '0b327e5c35240fd476d7b728bf6c825f', //获取天气key，key的服务不同所以用两个
				city: '', //城市
				citys: '', //
				temperature: '', //气温
				amapPlugin: null,
				key: '69d24a06f6710467afea85cb0c8db3e1',
				banner: ['6.jpg', '6.jpg', '6.jpg', '6.jpg', '6.jpg'],
				flexing: [{
						title: '推荐好货',
						name: '猜你喜欢'
					},
					{
						title: '实时鲜果',
						name: '今天辛苦了'
					},
					{
						title: '产地直供',
						name: '一手货源'

					}
				],
				dataList: [{
						name: '销量排行',
						value: 'shop',
						title: '跟榜买 不愁卖',
						imgsrc: '../../static/images/rank_1.png'
					},
					{
						name: '评价排行',
						value: 'praise',
						title: '好货靠口碑',
						imgsrc: '../../static/images/rank_2.png'
					},
					{
						name: '关注排行',
						value: 'follow',
						title: '大家都关注',
						imgsrc: '../../static/images/rank_3.png'
					},
					{
						name: '复购排行',
						value: 'back',
						title: '买了又买',
						imgsrc: '../../static/images/rank_4.png'
					}
				],
				statusHeight: 20,
				boxHeight: 44,
				navHeight: 64,
				weatherObj: {
					weather: "",
					temperature: ""
				}
			}
		},
		methods: {
			goToLimit() {
				uni.navigateTo({
					url: "../../pagesII/Limit/Limit?id=1327960611696472064"
				})
			},
			getMerchants() {
				let setdata = uni.getStorageSync('usermen')
				if (!setdata) {
					this.ApproveStatus = 0
					return
				} else {
					let data = {
						token: setdata
					}
					listing(getClient, data)
						.then((res) => {
							if (res.data.code == 500) {
								this.ApproveStatus = 0
								return
							}
							///登录成功后显示去认证店铺，如果已认证，显示已认证店铺
							this.ApproveStatus = res.data.data.approveStatus //获取电偶状态码，0未认证，1已认证，2拒绝
							let cityCode = res.data.data.address
							this.amapPlugin = new amap.AMapWX({
								key: this.key,
							});
							this.amapPlugin.getWeather({
								city: cityCode,
								success: (wres) => {
									this.weatherObj.temperature = wres.liveData.temperature
									this.weatherObj.weather = wres.liveData.weather
								}
							});
						})
						.catch((err) => {
							log(err)
						})
				}
			},
			//打开气泡
			rtBubble() {
				this.$refs.rtBubble.toggle();
			},
			topBubble() {
				this.show = !this.show;
			},
			//气泡
			itemClick(e) {
				let text = ["首页", "收藏", "分享"][e.index];
				this.tui.toast(`您点击了：${text}`);
			},
			//最近看过
			golook() {
				uni.navigateTo({
					url: '../../pagesII/Recently/Recently'
				})
			},
			//弹出协议
			popupState(state) {},
			//资讯页面
			goTimeInfo(id, content, title, createDate) {
				//拼接路径携带参数
				uni.navigateTo({
					url: '../../pagesII/timeInfo/timeInfo?id=' + id + '&content=' + content + '&createDate=' + createDate +
						'&title=' + title
				})
			},
			//倒计时
			endOfTime: function() {},
			//金刚区跳转
			hrefKing(index) {
				let url = "";
				switch (index) {
					case 0:
						url = "../../pagesII/seasonal/seasonal" //应季专区
						break;
					case 1:
						url = "../../pagesII/hotFruit/hotFruit" //热门品种
						break;
					case 2:
						url = "../../pagesII/ImportedFruit/ImportedFruit" //进口水果
						break;
					case 3:
						url = "../../pagesII/superValue/superValue" //超值专区
						break;
					case 4:
						url = "../../pagesII/Recently/Recently" //最近看过
						break;
					default:
						break;
				}
				if (url) {
					uni.navigateTo({
						url: url
					})
				} else {
					uni.showToast({
						title: '功能未完成~',
						icon: 'none'
					})
				}
			},
			//资讯页
			goMessage() {
				uni.navigateTo({
					url: '../../pagesII/message/message'
				})
			},
			gotoGun() {
				uni.switchTab({
					url: '../../pages/search/search'
				})
			},
			// 头部
			onPageScroll(e) {
				if (this.statusHeight > 20) {
					if (e.scrollTop < 20) {
						this.canSee = 1 - (e.scrollTop / 10)
						this.opcity = 0.3 + (e.scrollTop / 50)
					}
					if (e.scrollTop < 70) {
						this.bgOpcity = 1 + (e.scrollTop / 100)
					}
					if (e.scrollTop >= 70) {
						this.opcity = 1
						this.canSee = 0
					}
					if (e.scrollTop > 70) {
						this.bgOpcity = 0
					}
				} else {
					if (e.scrollTop < 14) {
						this.canSee = 1 - (e.scrollTop / 10)
						this.opcity = 0.3 + (e.scrollTop / 50)
					}
					if (e.scrollTop < 40) {
						this.bgOpcity = 1 + (e.scrollTop / 100)
					}
					if (e.scrollTop >= 40) {
						this.opcity = 1
						this.canSee = 0
					}
					if (e.scrollTop > 40) {
						this.bgOpcity = 0
					}
				}
				if (e.scrollTop === 0) {
					// this.WeatherHide = true
					this.opcity = 0
					this.canSee = 1
				}
			},
			//获取头像昵称
			getUserInfo(event) {
				this.userInfo = event.detail.userInfo
				if (event.detail.userInfo) {
					let wxing = event.detail.userInfo
					this.wxCode(wxing.avatarUrl, wxing.nickName)
				}
			},
			wxCode(avatarUrl, nickName) {
				wx.login({
					success: (res) => {
						let code = res.code
						this.wxLogin(avatarUrl, nickName, code)
					},
					fail: (err) => {
						log(err)

					}
				})
			},
			wxLogin(avatarUrl, nickName, code) {
				let data = {
					code,
				}
				publicing(loginis, data) //发送请求携带参数
					.then((res) => {
						uni.setStorageSync('usermen', res.data.token) //把token存在本地，小程序提供如同浏览器cookie
						this.ifUser()
					})
					.catch((err) => {
						log(err)
					})
			},
			ifUser() {
				let setdata = uni.getStorageSync('usermen')
				if (!setdata) {
					uni.showToast({
						title: '请登录',
						duration: 2000
					});
					this.wxlogin = false
				} else {
					uni.showToast({
						title: '已登录',
						duration: 2000
					});
					this.wxlogin = true
					this.usering = setdata
				}
			},
			//请求首页
			getHomelist() {
				let setdata = uni.getStorageSync('usermen')
				let data = {
					pageNo: '1',
					pageSize: '1000',
					token: setdata
				}
				listing(getIndex, data) //请求首页数据接口
					// listing(getIndex,data) //单发请求
					.then((res) => {
						this.address = res.data.data.address
						this.HotVarieties = res.data.data.HotVarieties //【0】首页分类列表
						this.WxTopNavigationBar = res.data.data.WxTopNavigationBar
						this.WxIndexViewpager = res.data.data.WxIndexViewpager
						this.WxPublicMsg = res.data.data.WxPublicMsg
						this.WxPublicMsgID = res.data.data.WxPublicMsg.id //公告id
						this.WxPostersBottomAdve = res.data.data.WxPostersBottomAdve
						this.NewGoods = res.data.data.NewGoods.goods //新果上市
						this.WxActivity = res.data.data.WxActivity //限量区数据ID+倒计时
						this.WxActivityID = res.data.data.WxActivity.id //限量区数据ID+倒计时
						this.WxActivityList = res.data.data.WxActivity.list //首页限量区数据
						this.startTime = res.data.data.WxActivity.startTime
						this.endTime = res.data.data.WxActivity.endTime
						this.createTime = res.data.data.WxActivity.createTime
						this.ts = (this.endTime - this.createTime) / 1000
						this.dd = parseInt(this.ts / 60 / 60 / 24, 10); //计算剩余的天数
						this.hh = parseInt(this.ts / 60 / 60 % 24, 10); //计算剩余的小时数
						this.mm = parseInt(this.ts / 60 % 60); //计算剩余的分钟数
						this.ss = parseInt(this.ts % 60, 10); //计算剩余的秒数
					})
					.catch((err) => {
						console.log(err)
					})
			},
			//请求首页列表
			getIndexClass() {
				let data2 = {
					pageNo: '1',
					pageSize: '10000',
					indexClassify: this.Sumify,
				}
				listing(getClassify, data2)
					.then((res) => {
						//处理数据格式,praiseNumber
						let goodsData = res.data.data.data;
						this.IndexGoods = goodsData //【1】首页分类数据
					})
					.catch((err) => {
						log(err)
					})
			},
			//数据处理方法
			numConvert(num) {
				if (num >= 10000) {
					num = Math.round(num / 1000) / 10 + '万';
				} else if (num >= 1000) {
					num = Math.round(num / 100) / 10 + '千';
				}
				return num;
			},
			//成交额数据处理方法
			numConvert(num) {
				if (num >= 10000) {
					num = Math.round(num / 1000) / 10 + 'w';
				} else if (num >= 1000) {
					num = Math.round(num / 100) / 10 + 'k';
				}
				return num;
			},
			//推荐好货请求
			flexClick(e) {
				this.num = e
				if (this.num === 0) {
					this.Sumify = 1
					this.getIndexClass()
				} else if (this.num === 1) {
					this.Sumify = 2
					this.getIndexClass()
				} else if (this.num === 2) {
					this.Sumify = 3
					this.getIndexClass()
				}
			},
			//限量批页面
			goLimit() {
				let id = this.WxActivityID
				uni.navigateTo({
					url: '../../pagesII/Limit/Limit?id=' + id
				})
			},
			//新果上市
			fruitGo() {
				uni.navigateTo({
					url: '../../pagesII/fruitList/fruitList'
				})
			},
			//排行榜
			goToRank(index, value) {
				uni.navigateTo({
					url: '../../pagesII/rankingList/rankingList?index=' + index + '&value=' + value
				})
			},
			//带参数跳转
			gotoBreed(name, id) {
				uni.navigateTo({
					url: '../../pagesII/productList/productList?name=' + name + '&id=' + id
				})
			},
			//商品详情页
			gotoList(id) {
				uni.navigateTo({
					url: '../../pagesIII/productDetail/productDetail?id=' + id
				})
			},
			//下来刷新
			onPullDownRefresh: function() {
				this.getMerchants()
				this.getHomelist()
				this.getIndexClass()
				let loadData = JSON.parse(JSON.stringify(this.IndexGoods));
				loadData = loadData.splice(0, 10);
				this.IndexGoods = loadData;
				this.pageIndex = 1;
				this.pullUpOn = true;
				this.loadding = false;
				uni.stopPullDownRefresh();
				
			},
			onReachBottom: function() {
				//下拉加载
				if (!this.pullUpOn) return;
				this.loadding = true;
				//增加页数
				if (this.pageIndex == 1) {
					uni.showLoading({
						title: '加载中'
					});
					uni.hideLoading();
					this.loadding = false;
					this.pullUpOn = false;
				} else {
					let loadData = JSON.parse(JSON.stringify(this.IndexGoods));

					loadData = loadData.splice(0, 10);

					if (this.pageIndex == 1) {
						uni.showLoading({
							title: '刷新中'
						});

						loadData = loadData.reverse();
					}
					this.IndexGoods = this.IndexGoods.concat(loadData);
					this.pageIndex = this.pageIndex + 1;
					uni.hideLoading()
					this.loadding = false;
				}
			},
			// 点赞列表1
			praise(index) {
				if (this.IndexGoods[index].showSearch1) {
					// this.productList[index].showSearch1 = false;
					// this.productList[index].praiseNum1--;//取消点赞;
				} else {
					this.IndexGoods[index].showSearch1 = true;
					this.IndexGoods[index].praiseNum1++; //点赞一次
				}
			},
			// 点赞列表2
			praise1(e) {
				if (isFirst1) {
					this.showSearch1 = !this.showSearch1
					this.praiseNum1++ //点赞一次
					isFirst1 = false;
				}
			},
			// 调起摄像头扫码
			scanCode() {
				uni.scanCode({
					scanType: ['barCode'],
					success: function(res) {
						uni.showModal({
							title: '提示',
							content: `条形码类型：${res.scanType}
									   条形码内容：${res.result}`,
							success: function(res) {
								if (res.confirm) {} else if (res.cancel) {}
							}
						});
					}
				});
			},
		},
		//初始化
		onLoad() {
			this.getMerchants()
			this.getIndexClass()
			// this.getGoodsAll()
			//请求首页
			this.getHomelist()
			//新版头部
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			const res = uni.getSystemInfoSync();
			let {
				statusBarHeight
			} = res
			let info = uni.getMenuButtonBoundingClientRect()
			let {
				top,
				bottom
			} = info
			this.statusHeight = statusBarHeight
			let buttonHeight = (bottom - statusBarHeight) + (top - statusBarHeight)
			let navHeight = statusBarHeight + buttonHeight + top - statusBarHeight //状态栏+导航栏的高度（页面初始高度）
			this.boxHeight = navHeight - statusBarHeight //导航栏高度
			this.navHeight = navHeight
			// #endif
			setTimeout(() => {
				this.showAuthTips = false
			}, 5000)
		},

		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				this.$refs.rtBubble.toggle();
			}
		},
		onShow() {
			this.getMerchants()
			this.getHomelist()
			this.getIndexClass()
		},
		// 转发
		onShareAppMessage: function() {
			return {
				title: '',
				imageUrl: '../../static/images/taozi.jpg',
				// path: '/pages/test/test?id=123'
			}
		},
		// 监听页面滚动距离
		mounted() {
		},
		filters: {
			filterNum(val) {
				if (val) {
					let words = (Math.floor(val) + '').split('');
					let res = '';
					if (words.length <= 4) {
						res = val;
					}
					if (words.length === 5) {
						res = words[0] + "." + words[1] + '万';
					}
					if (words.length === 6) {
						res = words[0] + words[1] + "." + words[2] + '万';
					}
					if (words.length === 7) {
						res = words[0] + words[1] + words[2] + "." + words[3] + '万';
					}
					if (words.length === 8) {
						res = words[0] + words[1] + words[2] + words[3] + "." + words[4] + '万';
					}
					if (words.length === 9) {
						res = words[0] + "." + words[1] + '亿';
					}
					if (words.length === 10) {
						res = words[0] + words[1] + "." + words[2] + '亿';
					}
					return res;
				} else {
					return val;
				}
			}
		},
		computed: {
			...mapState(['screendata']),
			// 筛选来的商家数据
			count() {
				this.takeshop = this.screendata.screenarr
			}
		}
	}
</script>

<style scoped>
	@import '../../common/css/tui.css';
	@import '../../common/iconfont/iconfont.css';

	.weather-tui-class {
		position: absolute;
		width: 20rpx;
		height: 20rpx;
		left: 60rpx;
		top: 36rpx;
		transform: rotate(40deg);
		-o-transform: rotate(40deg);
		-webkit-transform: rotate(40deg);
		-moz-transform: rotate(40deg);
		background-color: rgba(0, 0, 0, 0.9);

	}

	.weather-tui-class2 {
		position: absolute;
		left: 30rpx;
		top: 44rpx;
		background-color: rgba(0, 0, 0, 0.9);
		font-size: 24rpx;
		color: #fff;
		border-radius: 24rpx;
		padding: 10rpx 20rpx;
		z-index: 999;
	}

	.weather-active {
		display: none;
	}

	.weather-text-danger {
		display: block;
	}

	.weather-container {
		transition: all .3s;
	}

	.weather-tui-flex {
		position: relative;
		/* top: 46px; */
		margin: 0 30rpx;
		display: flex;
		font-size: 28rpx;
		color: #fff;
	}

	.weather-tui-left {
		flex: 3;
		display: flex;
		align-items: center;

	}

	.weather-tui-right {
		display: flex;
		position: relative;
		flex: 1;
		text-align: right;
		justify-content: flex-end;
	}

	.weather-city {
		margin-right: 10rpx;
		margin-left: 10rpx;
		font-size: 32rpx;
	}

	.weather-yun-icon {
		position: absolute;
		right: 76rpx;
		top: -2rpx;
		width: 52rpx;
		height: 40rpx;
		display: block;
	}

	.weather-dingwei {
		width: 30rpx;
		height: 40rpx;
		display: block;
		top: -6rpx;
	}

	.weather-tui-right text {
		font-size: 30rpx;
		margin: 0 4rpx;
		font-weight: 500;

	}

	/* 协议 */
	.agreement {}

	/* 头部 */

	.index-bg {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: -1;
		transition: all .1s;
	}

	.index-bg image {
		width: 100%;
		height: 318rpx;
		z-index: -1;
	}

	.index-content {
		z-index: 999
	}

	.tui-header-icon {
		position: fixed;
		top: 0;
		left: 10px;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		height: 64px;
		transform: translateZ(0);
		z-index: 9999;
		width: 100rpx;
	}

	.tui-icon-box {
		position: relative;
		height: 20px !important;
		width: 20px !important;
		padding: 6px !important;

		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* 样式切换 */
	.yangshi1 {
		color: #5555ff !important;
	}

	.yangshi2 {
		color: #F00E2C !important;
	}

	.icon-dianzan {
		color: #FFBE33 !important;
		margin-right: 8rpx;
	}

	.iconImg {
		width: 30rpx;
		height: 30rpx;
		display: block;

	}

	.dalaba-icon {
		height: 50rpx;
		width: 50rpx;
		display: block;
		position: absolute;
		top: 22rpx;
		right: 22rpx;
	}

	.tui-left-saoma {
		width: 40rpx;
		height: 40rpx;
		display: block;
	}

	.tui-my-bg {
		width: 100%;
		height: 464rpx;
		display: block;
	}

	/* 水果列表 */
	.tag-tit {
		/* 渐变色 */
		background-image: linear-gradient(to right, #00C94A, #00AC3F);
		margin-right: 10rpx;
		padding: 0 10rpx;
		border-radius: 15rpx 0 15rpx 0;
		color: #fff;
		font-size: 20rpx;
	}

	.tag-tit-text {
		font-size: 28rpx;
		color: #333;
	}

	.tui-product-box {
		margin-top: 20rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.tui-product-list {

		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
		/* padding-top: 20rpx; */
	}

	.tui-product-container {
		flex: 1;
		margin-right: 2%;
	}

	.tui-product-container2 {
		flex: 1;
		/* margin-right: 2%; */
	}

	.tui-pro-item {
		width: 100%;
		margin-bottom: 4%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 6rpx;
		overflow: hidden;
	}

	.img-mask {
		position: relative;
	}

	.img-mask-item {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(255, 255, 255, .5);
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: center;

	}

	.item-text {
		background: rgba(0, 0, 0, .6);
		color: #fff;
		font-size: 28rpx;
		padding: 6rpx 16rpx;
		border-radius: 40rpx;
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
		/* padding-top: 18rpx; */
		line-height: 30rpx;
	}

	.tui-sale-price {
		font-size: 22rpx;
		color: #9A9A9A;
	}

	.tui-factory-price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}

	.tui-pro-pay {
		margin: 10rpx 0;
	}

	.tui-pro-pic {
		display: flex;
		justify-content: space-between;
		align-items: baseline;

	}

	.tui-pro-dea {
		display: flex;
		justify-content: space-between;
	}

	/* 省略文字 */
	.tui-jin1 {
		color: #9a9a9a;
		font-size: 20rpx;
		/* width: 100rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap; */
	}

	.tui-jin {
		color: #9a9a9a;
		font-size: 20rpx;
	}

	.tui-dea-color {
		color: #FF4300;
	}

	.tui-rate {
		color: #FF4300;
		font-size: 28rpx;
		font-weight: 500;

	}

	.tui-rate text {
		font-size: 16rpx;
		margin-right: 2rpx;
	}

	.tui-rate-price {
		color: #B6B6B6;
		font-size: 24rpx;
		font-weight: 700;
		text-decoration: line-through;
		margin-left: 4rpx;
		flex: 2;
	}

	.tui-rate-price text {
		font-size: 16rpx;
		color: #B6B6B6;
		margin-right: 2rpx;

	}

	.tui-rate-text {
		color: #C4C4C4;
		font-size: 24rpx;
		margin-left: 4rpx;
	}

	.tui-praise {
		color: #C4C4C4;
		font-size: 24rpx;

	}

	.icon-like {
		margin-right: 8rpx;
	}

	.tag-tit-border {
		border: 1rpx solid rgba(255, 119, 9, 1);
		color: rgba(255, 119, 9, 1);
		font-size: 18rpx;
		padding: 2rpx 10rpx;
		border-radius: 18rpx;
		margin-right: 10rpx;
		display: inline-flex;

	}

	/* 推荐好货 */
	.border1px {
		border-left: 1rpx solid #E9E9E9;
		border-right: 1rpx solid #E9E9E9;
		padding: 10rpx 0;
	}

	.line-bor {
		line-height: 30rpx !important;
	}

	.fixed-3-font-wei {
		font-size: 36rpx;
		font-weight: 700;
		color: #000;
		margin: 2rpx 0;

	}

	.fixedweight {
		font-weight: 700;
		color: rgba(0, 198, 42, 1);
		font-size: 36rpx;
		margin: 2rpx 0;

	}

	.fixed3fontweione {
		font-size: 24rpx;
		color: #fff !important;
		background-image: linear-gradient(to right, #00C94A, #00AC3F);
		border-radius: 60rpx;
		padding: 5rpx 0rpx;
		font-weight: 600;

	}

	.fixed-3-font-weitwo {
		font-size: 28rpx;
		color: #9A9A9A;
		font-weight: 400;
		width: 66%;
		margin: 0 auto;
		padding: 5rpx 0rpx;

	}

	.xiding {
		position: sticky;
		z-index: 999;

	}

	.tui-recommend {
		margin: 10rpx 0;
		width: 100%;
		text-align: center;
		display: flex;
		justify-content: space-around;
		background-color: #fff;
		padding: 20rpx 0;
	}

	.tui-fixed-3 {
		width: 33.3%;
		position: relative;
		border-right: none;
	}

	/* 右边框 */
	.borderRight {
		width: 1rpx;
		height: 30rpx;
		background: #ccc;
		float: right;
		position: absolute;
		top: 40%;
		border-radius: 1rpx;
	}

	.borderRight:not(:last-child) {}

	/* 水果排行 */
	.tui-Fruits-ranking {
		border-radius: 0 0 30rpx 30rpx;
		padding-top: 10rpx;
		display: flex;
		justify-content: space-around;
		background-color: #fff;
		margin: 0 20rpx;
		border-top: 1rpx solid rgba(245, 245, 245, 1);
		overflow: hidden;
	}

	.tui-Fruits-ranking-lien {
		line-height: 20rpx;
	}

	.tui-Fruits-ranking-font-wei {
		color: #333333;
		font-size: 30rpx;
		font-weight: 700;
	}

	.tui-Fruits-ranking-tab-font {
		font-size: 20rpx;
		color: #999;
	}

	.tui-Fruits-ranking-tab {
		text-align: center;

		width: 25%;
	}

	/* 显示水果 */

	.tui-center-Time-New {
		margin: 0 20rpx;
	}

	.tui-Fruits {
		display: flex;
		justify-content: space-around;
		width: 100%;
		background-color: #fff;

	}

	/* 1像素边框 */
	.tui-border-top {
		margin: 0 20rpx;
		background-color: #fff;
	}

	.tui-border-bottom {
		height: 20rpx;
		text-align: center;
		/* border-bottom: 1rpx solid #e9e9e9; */



	}

	.tui-price-color {
		color: #FF4300;
		font-size: 32rpx;
		font-weight: 500;

	}

	.tui-weight {
		font-size: 23rpx;
		color: #999999;
	}

	.tui-price {
		font-size: 20rpx;
		display: -webkit-flex;
		display: flex;
		-webkit-align-items: baseline;
		align-items: baseline;
		color: #FF6500;
		margin-top: 14rpx;

	}

	.tui-first-price {
		display: flex;
		align-items: baseline;
		width: 100%;
		justify-content: center;

	}

	.tui-last-price {
		color: #B6B6B6;
		margin-left: 6rpx;

	}

	.price-label {
		color: #B6B6B6;
		font-size: 20rpx;
	}

	.tui-cribing {
		/* 中划线 */
		text-decoration: line-through;
		color: #999999;
		font-size: 23rpx;
	}

	.tabimg {
		width: 130rpx;
		height: 130rpx;
		display: block;
		margin: 10rpx auto;
		border: 1px solid #f5f5f5;
		border-radius: 10rpx;
	}
	
	.active-img {
		width: 130rpx;
		height: 130rpx;
		display: block;
		margin: 10rpx auto;
		border: 1px solid #f5f5f5;
		border-radius: 10rpx;
	}
	
	.tui-Fruits-ranking-tab .tabimg {
		border: none;
	}

	.tui-Fruits-table {

		text-align: center;
		line-height: 26rpx;

	}

	/* 限量批 */
	.tui-font {
		font-size: 32rpx;
		color: #000000;
		font-weight: 600;
	}

	.tui-barcolor {
		/* background-color: #0062CC; */
		/* 线性渐变 */
		background-image: linear-gradient(to right, rgba(255, 119, 9, 1), rgba(255, 101, 0, 1));
		color: #fff;
		font-size: 24rpx;
		border-radius: 4rpx 20rpx 4rpx 20rpx;
		padding: 2rpx 2rpx 2rpx 16rpx;
		margin-left: 16rpx;

	}

	.tui-count-down {
		border-radius: 30rpx 30rpx 0 0;
		display: flex;
		height: 100rpx;
		justify-content: space-around;
		background-color: #fff;
		padding: 0 20rpx;
		margin: 0 20rpx;
		line-height: 100rpx;
	}

	.tui-line-hight {
		position: relative;
		top: 35rpx;
		width: 33%;
	}
	.limit-title {
		width: 33%;
	}
	.new-fruit-title{
		width: 56%;
	}
	.tui-line {
		padding-top: 50rpx;
	}

	/* 温馨提示 */
	.tui-reminder {
		justify-content: space-around;
		display: flex;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #fff;
		margin: 20rpx;
		border-radius: 20rpx;

	}

	.icon-weibiaoti34 {
		position: relative;
		top: 4rpx;
	}

	.icon-laba {
		color: #00AC3F;
		font-size: 36rpx;
	}

	.tui-see {
		color: #555555;
		font-size: 28rpx;
		font-weight: 400;
		position: absolute;
		float: left;
		right: -10rpx;
		display: block;

	}

	.tui-tips {
		color: rgba(14, 14, 14, 1);
		font-size: 26rpx;
		width: 440rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-weight: 600;

	}

	.tui-magin-left {
		position: relative;

		text-align: center;
	}

	.tui-middle {
		flex: 6;
	}

	/* 九宫格 */
	.swiper-item-top {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		height: 180rpx;
		background-color: #fff;
		border-radius: 30rpx 30rpx 0 0;
		color: #6E6E6E;
		/* padding: 0 20rpx; */
		margin: 0 20rpx;
	}

	.swiper-item {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		color: #6E6E6E;
		background-color: #fff;
		border-radius: 0 0 30rpx 30rpx;
		/* padding: 0 20rpx; */
		margin: 0 20rpx;
	}

	.conteng-img {
		width: calc((100% / 5) - 12px) !important;
		margin: 6px;
		/* height: 120upx; */
		position: relative;
		text-align: center;
	}

	.contentitem {
		content: "";
	}

	.uploadimg {
		width: 100upx;
		height: 100upx;
		/* border-radius: 10upx; */
		display: block;
		margin: 0 auto;
	}

	.uploadimg1 {
		width: 100upx;
		height: 100upx;
		/* border-radius: 50upx; */
		display: block;
		margin: 0 auto;
	}
	
	.loading-bg {
		width: 100upx;
		height: 100upx;
		/* border-radius: 50upx; */
		display: block;
		margin: 0 auto;
		background: #f5f5f5;
		border-radius: 32rpx;
	}
	
	.hot-loading-bg{
		width: 100upx;
		height: 100upx;
		/* border-radius: 10upx; */
		display: block;
		margin: 0 auto;
		background: #f5f5f5;
		border-radius: 50%;
	}
	
	.loading-bg-text {
		padding-top: 20upx;
		background: #f5f5f5;
		width: 96rpx;
		height: 52rpx;
	}
	
	

	.conteng-img text {
		padding-top: 20upx;
		font-size: 25upx;
		font-weight: 600;
		color: #555555;
	}

	/* 标签栏 */
	.bac {
		/* height: 290rpx; */
		margin: 0 14rpx;
		background-color: #f7f7f7;
		color: #00AC3F;
		position: relative;
	}

	.tui-tag {
		width: 100%;
		/* position: absolute; */
		/* bottom: 16rpx; */
		display: flex;
		justify-content: space-between;
	}

	.icon-right {
		margin-right: 10rpx;
		margin-top: 1rpx;
	}

	.tui-row {
		/* width: calc((100% / 5) - 12px) !important; */
		/* height: 120upx; */
		/* width: 20%; */
		font-size: 24rpx;
		font-weight: 400;
		margin: 10rpx;
		text-align: center;
		color: #00ac3f;
		display: flex;
		align-items: center;

	}

	/* 主体 */
	.container {
		width: 100%;
	}

	.tui-flex {
		display: flex;
	}

	.tui-left {
		flex: 1;

	}

	.tui-mid {
		flex: 2;
	}

	.tui-right {
		flex: 1;
		position: relative;
	}

	.tui-logo {
		width: 100%;
		height: 50rpx;
		display: block;
	}

	/* banner */
	/* 底部 */
	.tui-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}



	.bgimg1 {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 111px;
		z-index: 111;
		zoom: 1;
		background-color: #fff;
		/* background: url(../../static/images/6.jpg) no-repeat; */
		background-size: cover;
		-webkit-background-size: cover;
		-o-background-size: cover;
		background-position: center 0;
	}

	.icon-saomiao {
		color: #FFFFFF;
		font-size: 50rpx;
	}


	/* 新版头部渐变 */
	.tui-my-bg {
		width: 100%;
		height: 464rpx;
		display: block;
	}

	.tui-rank-bg {
		position: absolute;
		width: 381rpx;
		height: 112rpx;
		left: 0;
		top: 170rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	/* 排行榜 */
	.tui-cent-box {
		border-radius: 60rpx 60rpx 0 0;
		height: 2000px;
		background-color: #fff;
		position: relative;
		top: -42rpx;
		padding: 0 30rpx;

	}

	.tui-tab-rank-cent {
		display: flex;
		padding: 20rpx 0;

	}

	.img-rink {
		width: 180rpx;
		height: 180rpx;
		display: block;
		margin-right: 20rpx;
		border: 1px solid #f5f5f5;
		border-radius: 6rpx;
	}

	.tui-pro-tit {

		flex: 5;


	}

	.tag-tit {
		/* 渐变色 */
		background-image: linear-gradient(to right, #00C94A, #00AC3F);
		margin-right: 10rpx;
		padding: 0 10rpx;
		border-radius: 15rpx 0 15rpx 0;
		color: #fff;
		font-size: 20rpx;
	}

	.tag-tit2 {
		display: flex;
		justify-content: space-between;
	}

	.tag-tit2-price {
		color: #FF5600;
		font-size: 16rpx;
	}

	.tag-tit2-text {
		color: #555;
		font-size: 16rpx;
	}

	.tui-shop-car {
		width: 80rpx;
		height: 80rpx;
		display: block;
	}

	.tag-tit-text {
		font-size: 28rpx;
		color: #333;
	}

	.tui-tab-rank {
		margin: 10rpx 0;

		border-bottom: 1rpx solid #ccc;
	}

	.actineclass {
		display: block;
	}

	.errorclass {
		display: none;
	}

	.activetext {
		color: #fff !important;
		background-image: linear-gradient(to right, #FF943D, #FF5600);
		border-radius: 60rpx;
	}

	.tui-cent-tab {
		position: relative;
		top: 50rpx;
		height: 60rpx;
		display: flex;
		justify-content: space-between;
		border-radius: 60rpx;
		background-color: #f7f7f7;
		margin-bottom: 80rpx;

	}

	.tui-tab-btn {
		flex: 1;
		width: 25%;
		text-align: center;
		font-size: 20rpx;
		color: #333333;
		line-height: 60rpx;

	}

	.tui-header-box {
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 995;
		transition: all 400;
		transition: all .3s;
	}

	.tui-header {
		width: 100%;
		font-size: 18px;
		line-height: 18px;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	/* 头部 */
	/* .tui-header {
		height: 200rpx;
		padding: 80rpx 30rpx 0 20rpx;
		box-sizing: border-box;
		background: url(../../static/images/6.jpg ) repeat-y 0px 0px;
		height: 56rpx;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
	} */

	.tui-header-icon {
		position: fixed;
		top: 0;
		left: 10px;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		height: 32px;
		transform: translateZ(0);
		z-index: 9999;
	}

	.tui-header-icon .tui-badge {
		background: #e41f19 !important;
		position: absolute;
		right: -4px;
	}

	.tui-icon-ml {
		margin-left: 20rpx;
	}

	.tui-icon-box {
		position: relative;
		height: 20px !important;
		width: 20px !important;
		padding: 6px !important;

		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-banner-swiper {
		position: relative;
	}

	/* 地区 */
	.tui-info-center {
		position: absolute;
		width: 100%;
		height: 128rpx;
		line-height: 50rpx;
		left: 0;
		top: 300rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		/* display: flex; */
		align-items: center;
		color: #fff;
	}

	.tui-info-day {
		font-size: 20rpx;
	}

	.tui-info-quanguo {
		font-size: 28rpx;
	}

	.tui-banner-tag {
		position: absolute;
		color: #fff;
		bottom: 30rpx;
		right: 0;
	}

	.tui-slide-image {
		width: 100%;
		display: block;
	}

	/*顶部菜单*/

	.tui-rolling-news {
		width: 100%;
		padding: 12rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
	}

	.tui-swiper {
		font-size: 28rpx;
		height: 50rpx;
		flex: 1;
	}

	.tui-swiper-item {
		display: flex;
		align-items: center
	}

	.tui-news-item {
		line-height: 28rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #0E0E0E;
		font-weight: normal;
		font-size: 28rpx;

	}
</style>
