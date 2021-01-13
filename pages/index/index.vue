<template>
	<view class="container" :style="{ paddingTop: navHeight + 'px' }">
		<view class="index-bg" :style="{ opacity: bgOpcity }">
			<image src="../../static/images/index_bg.png" :style="{ height: statusHeight <= 20 ? '318rpx' : '338rpx' }" mode="aspectFill"></image>
		</view>
		<view class="tui-header-box" :style="{ height: navHeight + 'px', background: 'rgba(0,197,42,' + opcity + ')' }">
			<view class="tui-header" :style="{ marginTop: statusHeight + 'px', height: boxHeight + 'px' }">
				<view class="tui-left" @click="scanCode">
					<image src="../../static/images/sceen.png" mode="aspectFit" class="tui-left-saoma"></image>
				</view>
				<view class="tui-mid">
					<image src="../../static/images/logo.png" mode="aspectFit" class="tui-logo"></image>
				</view>
				<view class="tui-left"></view>
			</view>
		</view>
		<view class="weather-container" style="margin: 10rpx 0 20rpx;" :style="{ opacity: canSee }">
			<view class="weather-tui-flex ">
				<view class="weather-tui-left ">
					<image src="../../static/images/dingwei@2x.png" mode="aspectFit" class="weather-dingwei"></image>
					<text class="weather-city" style="font-size: 24rpx;" v-if="address && ApproveStatus === 1">配送至{{ address }}</text>
					<text class="weather-city" v-if="ApproveStatus !== 1">配送至</text>
					<view class="weather-tui-class" v-if="ApproveStatus !== 1 && showAuthTips"></view>
					<view class="weather-tui-class2" v-if="ApproveStatus !== 1 && showAuthTips">请认证店铺信息</view>
				</view>
				<view class="weather-tui-right" v-if="ApproveStatus === 1">
					<text>{{ weatherObj.weather }}</text>
					<text>{{ weatherObj.temperature }}℃</text>
				</view>
			</view>
		</view>
		<view class="index-content">
			<Banner @childSwitch="goToLimit" :banner="WxIndexViewpager"></Banner>
			<view class="bac">
				<view class="tui-tag">
					<block v-for="(item, index) in WxPostersBottomAdve" :key="index">
						<view class="tui-row">
							<image :src="item.url" mode="aspectFit" class="iconImg icon-right"></image>
							{{ item.title }}
						</view>
					</block>
				</view>
			</view>
			<!-- 金刚区 -->
			<view class=" swiper-item-top">
				<block v-if="WxTopNavigationBar">
					<view class="conteng-img" @tap="hrefKing(index,item.title)" v-for="(item, index) in WxTopNavigationBar" :key="index">
						<image :src="item.url" mode="widthFix" class="uploadimg1"></image>
						<text>{{ item.title }}</text>
					</view>
				</block>
				<block v-if="!WxTopNavigationBar || WxTopNavigationBar.length === 0">
					<view class="conteng-img" @tap="hrefKing(index,item.title)" v-for="item of 5" :key="item">
						<view class="loading-bg"></view>
						<view class=""></view>
					</view>
				</block>
			</view>
			<view class="swiper-item">
				<block v-if="HotVarieties">
					<view class="conteng-img contentitem" v-if="index < 5" v-for="(item, index) in HotVarieties" :key="index" @tap="gotoBreed(item.name, item.id)">
						<image :src="item.url" mode="widthFix" class="uploadimg"></image>
						<text>{{ item.name }}</text>
					</view>
				</block>
				<block v-if="!HotVarieties || HotVarieties.length === 0">
					<view class="conteng-img contentitem" v-for="(item, index) in 5" :key="index" @tap="gotoBreed(item.name, item.id)">
						<view class="hot-loading-bg"></view>
						<view></view>
					</view>
				</block>
				<!-- <view class="conteng-img contentitem" @tap="gotoGun">
					<image src="../../static/images/gengduo@3x.png" mode="widthFix" class="uploadimg"></image>
					<text>查看更多</text>
				</view> -->
			</view>
			<!-- 温馨提示 -->
			<view class="tui-reminder">
				<view class="tui-rolling-news">
					<image style="margin-right:20rpx;width: 36rpx;height: 40rpx;" src="../../static/images/message.png" mode=""></image>
					<swiper vertical autoplay circular interval="3000" class="tui-swiper">
						<swiper-item v-for="(item, index) in WxPublicMsg" :key="index" class="tui-swiper-item">
							<view class="tui-news-item" @tap="goTimeInfo(item.id, item.content, item.title, item.createDate)">{{ item.title }}</view>
							<!-- <text class="tui-see" >查看<text class="iconfont icon-weibiaoti34"></text></text> -->
						</swiper-item>
					</swiper>
				</view>
			</view>

			<!-- 2020-12-21新版首页限量批-->
			<view class="new-limit-single-wrap" v-if="WxActivity.status == '0' && WxActivityList && WxActivityList.length !== 0 && WxActivityList.length === 1">
				<view class="new-limit-single-bg">
					<image src="../../static/images/limit_bg_single.png" mode=""></image>
				</view>
				<view class="new-limit-top" @click="goLimit()">
					<view class="top-left">
						<view class="top-left-title">爆款限量批</view>
						<view class="top-left-countdown">
							<tui-countdown :time="ts" size="28" width="36" height="36" color="#FF7709" borderColor="#ffffff" backgroundColor="#ffffff"
							 colonColor="#ffffff" @end="endOfTime"></tui-countdown>
						</view>
					</view>
					<view class="top-right" @click="goLimit()">
						<view class="more-btn">
							查看更多
							<image src="../../static/images/r_arrow.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="new-limit-single-content">
					<view class="new-limit-single-item" @click="clickToDetail(item.id)" v-for="(item, index) of WxActivityList" :key="index">
						<view class="item-url">
							<image :src="item.url" mode=""></image>
						</view>
						<view class="item-info">
							<view class="item-name">{{ item.title }}</view>
							<view class="item-specification">{{ item.specification }}</view>
							<view class="item-buy-btn">
								<view class="buy-btn-bg">
									<image src="../../static/images/buy_btn.png" mode=""></image>
								</view>
								<view class="item-price-buy">
									<view class="left-price">
										<text>¥</text>
										<text>{{ ApproveStatus === 1 ? item.platformClinetPrice : '***' }}</text>
										<text>/件</text>
									</view>
									<view class="right-buy">立刻购买</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="new-limit-multi-wrap" v-if="WxActivity.status == '0' && WxActivityList && WxActivityList.length !== 0 && WxActivityList.length > 1">
				<view class="new-limit-bg">
					<image src="../../static/images/new_limit.png" mode=""></image>
				</view>
				<view class="new-limit-top" @click="goLimit()">
					<view class="top-left">
						<view class="top-left-title">爆款限量批</view>
						<view class="top-left-countdown">
							<tui-countdown :time="ts" size="28" width="36" height="36" color="#FF7709" borderColor="#ffffff" backgroundColor="#ffffff"
							 colonColor="#ffffff" @end="endOfTime"></tui-countdown>
						</view>
					</view>
					<view class="top-right" @click="goLimit()">
						<view class="more-btn">
							查看更多
							<image src="../../static/images/r_arrow.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="new-limit-content">
					<scroll-view scroll-x="true" style="width: 100%">
						<view class="content-box">
							<view class="box-item" @click="clickToDetail(item.id)" v-for="(item, index) of WxActivityList" :key="index">
								<view class="item-url">
									<image :src="item.url" mode=""></image>
								</view>
								<view class="item-name">{{ item.title }}</view>
								<view class="item-price-action">
									<view class="item-price">
										<text>¥</text>
										<text>{{ ApproveStatus === 1 ? item.platformClinetPrice : '***' }}</text>
										<text>/件</text>
										<!-- 如果4位数的话就不显示/件 v-if="Math.floor(item.platformClinetPrice).toString().length < 4" -->
									</view>
									<view class="item-action">立即抢购</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>

			<!-- 2020-12-21新版首页排行榜 hotGoods-->
			<view class="hot-goods-wrap">
				<view class="hot-goods-bg">
					<image src="../../static/images/hg_bg.png" mode=""></image>
				</view>
				<view class="hot-goods-top">
					<view class="top-left">
						<view class="left-icon">
							<image src="../../static/images/hg_icon.png" mode=""></image>
						</view>
						<view class="left-title">
							<view class="title-left">热销排行榜</view>
							<view class="title-right">大家都在买</view>
						</view>
					</view>
					<view class="top-right">
						<view class="more-btn" @click="goToRank()">
							查看更多
							<image src="../../static/images/r_arrow.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="hot-goods-content">
					<view class="content-item" @click.stop="clickToDetail(item.id)" v-for="(item, index) of hotGoods" :key="index">
						<view class="item-url">
							<image :src="item.url" mode=""></image>
						</view>
						<view class="item-name">{{ item.name }}</view>
						<view class="item-specification">{{ item.specification }}</view>
						<view class="item-price-action">
							<view class="item-price">
								<text>¥</text>
								<text>{{ ApproveStatus === 1 ? item.platformClientPrice : '***' }}</text>
							</view>
							<view class="item-action" @click.stop="clickToCart(item.id)">
								<image src="../../static/images/plus_cart.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 推荐好货 -->
			<view class="xiding" :style="{ top: navHeight + 'px' }">
				<view class="tui-recommend">
					<block v-for="(item, index) in flexing" :key="index">
						<view class="tui-fixed-3 " @click="flexClick(index)">
							<view class="fixed-3-font-wei" :class="{ fixedweight: index == num }">{{ item.title }}</view>
							<view class="fixed-3-font-weitwo" :class="{ fixed3fontweione: index == num }">{{ item.name }}</view>
						</view>
					</block>
				</view>
			</view>
			<swiper :current="currentSwiperItem" :style="{ height: swiperHeight + 'px' }" @change="handleChange" :indicator-dots="false"
			 :autoplay="false" easing-function="easeInOutCubic">
				<swiper-item>
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
												<text class="tag-tit">{{ item.lableName }}</text>
												<text class="tag-tit-text">{{ item.name }}</text>
											</view>
											<view>
												<view class="tui-pro-price">
													<text class="tui-sale-price">{{ item.describe }}</text>
													<!-- <text class="tui-factory-price">￥20</text> -->
												</view>
												<view class="tui-pro-pay">
													<block v-for="(itemTwo, indexs) in item.goodsType" :key="indexs">
														<view class="tag-tit-border">{{ itemTwo.name }}</view>
													</block>
												</view>
												<view class="tui-pro-pic">
													<view class="tui-rate">
														<text>&yen;</text>
														{{ ApproveStatus === 1 ? item.platformClinetPrice : '***' }}
														<text class="tui-rate-text ">/件</text>
													</view>
													<view class="tui-rate-price" v-if="item.marketPrice && item.marketPrice != 0">
														<text>&yen;</text>
														{{ ApproveStatus === 1 ? item.marketPrice : '***' }}
													</view>
													<!--<text class="tui-praise  " @tap="praise(index)">
														<text class="tui-praise iconfont icon-like  " v-if="!item.showSearch1"></text>
														<text class="tui-praise iconfont icon-dianzan " v-if="item.showSearch1"></text>{{item.praiseNumber |filterNum}}
													</text> -->
												</view>
												<view class="tui-pro-dea">
													<text class="tui-jin1">{{ item.specification }}</text>
													<text class="tui-jin">
														成交
														<text class="tui-dea-color">{{ item.total | filterNum }}</text>
														元
													</text>
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
												<text class="tag-tit">{{ item.lableName }}</text>
												<text class="tag-tit-text">{{ item.name }}</text>
											</view>
											<view>
												<view class="tui-pro-price">
													<text class="tui-sale-price">{{ item.describe }}</text>
													<!-- <text class="tui-factory-price">￥20</text> -->
												</view>
												<view class="tui-pro-pay">
													<block v-for="(itemTwo, indexs) in item.goodsType" :key="indexs">
														<view class="tag-tit-border">{{ itemTwo.name }}</view>
													</block>
												</view>
												<view class="tui-pro-pic">
													<view class="tui-rate">
														<text>&yen;</text>
														{{ ApproveStatus === 1 ? item.platformClinetPrice : '***' }}
														<text class="tui-rate-text ">/件</text>
													</view>
													<view class="tui-rate-price" v-if="item.marketPrice && item.marketPrice != 0">
														<text>&yen;</text>
														{{ ApproveStatus === 1 ? item.marketPrice : '***' }}
													</view>
													<!-- <text class="tui-praise  " @tap="praise(index)">
														<text class="tui-praise iconfont icon-like  " v-if="!item.showSearch1"></text>
														<text class="tui-praise iconfont icon-dianzan " v-if="item.showSearch1"></text>{{item.praiseNumber |filterNum}}
													</text> -->
												</view>
												<view class="tui-pro-dea">
													<text class="tui-jin1">{{ item.specification }}</text>
													<text class="tui-jin">
														成交
														<text class="tui-dea-color">{{ item.total | filterNum }}</text>
														元
													</text>
												</view>
											</view>
										</view>
									</view>
								</block>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
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
												<text class="tag-tit">{{ item.lableName }}</text>
												<text class="tag-tit-text">{{ item.name }}</text>
											</view>
											<view>
												<view class="tui-pro-price">
													<text class="tui-sale-price">{{ item.describe }}</text>
													<!-- <text class="tui-factory-price">￥20</text> -->
												</view>
												<view class="tui-pro-pay">
													<block v-for="(itemTwo, indexs) in item.goodsType" :key="indexs">
														<view class="tag-tit-border">{{ itemTwo.name }}</view>
													</block>
												</view>
												<view class="tui-pro-pic">
													<view class="tui-rate">
														<text>&yen;</text>
														{{ ApproveStatus === 1 ? item.platformClinetPrice : '***' }}
														<text class="tui-rate-text ">/件</text>
													</view>
													<view class="tui-rate-price" v-if="item.marketPrice && item.marketPrice != 0">
														<text>&yen;</text>
														{{ ApproveStatus === 1 ? item.marketPrice : '***' }}
													</view>
													<text class="tui-praise  " @tap="praise(index)">
														<text class="tui-praise iconfont icon-like  " v-if="!item.showSearch1"></text>
														<text class="tui-praise iconfont icon-dianzan " v-if="item.showSearch1"></text>
														{{ item.praiseNumber | filterNum }}
													</text>
												</view>
												<view class="tui-pro-dea">
													<text class="tui-jin1">{{ item.specification }}</text>
													<text class="tui-jin">
														成交
														<text class="tui-dea-color">{{ item.total | filterNum }}</text>
														元
													</text>
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
												<text class="tag-tit">{{ item.lableName }}</text>
												<text class="tag-tit-text">{{ item.name }}</text>
											</view>
											<view>
												<view class="tui-pro-price">
													<text class="tui-sale-price">{{ item.describe }}</text>
													<!-- <text class="tui-factory-price">￥20</text> -->
												</view>
												<view class="tui-pro-pay">
													<block v-for="(itemTwo, indexs) in item.goodsType" :key="indexs">
														<view class="tag-tit-border">{{ itemTwo.name }}</view>
													</block>
												</view>
												<view class="tui-pro-pic">
													<view class="tui-rate">
														<text>&yen;</text>
														{{ ApproveStatus === 1 ? item.platformClinetPrice : '***' }}
														<text class="tui-rate-text ">/件</text>
													</view>
													<view class="tui-rate-price" v-if="item.marketPrice && item.marketPrice != 0">
														<text>&yen;</text>
														{{ ApproveStatus === 1 ? item.marketPrice : '***' }}
													</view>
													<text class="tui-praise  " @tap="praise(index)">
														<text class="tui-praise iconfont icon-like  " v-if="!item.showSearch1"></text>
														<text class="tui-praise iconfont icon-dianzan " v-if="item.showSearch1"></text>
														{{ item.praiseNumber | filterNum }}
													</text>
												</view>
												<view class="tui-pro-dea">
													<text class="tui-jin1">{{ item.specification }}</text>
													<text class="tui-jin">
														成交
														<text class="tui-dea-color">{{ item.total | filterNum }}</text>
														元
													</text>
												</view>
											</view>
										</view>
									</view>
								</block>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>

			<view class="warp" :style="{ top: navHeight + 'px' }" v-if="modaishow">
				<view class="warp-view">
					<view class="warp-text1">温馨提示</view>
					<view class="warp-text">请先登录</view>
					<view class="warp-flex">
						<button @click="messcancel()" plain="true">取消</button>
						<button plain="true" open-type="getUserInfo" @getuserinfo="getUserInfo" class="color-green">登录</button>
					</view>
				</view>
			</view>
			<view class="warp" :style="{ top: navHeight + 'px' }" v-if="isVerify">
				<view class="warp-view">
					<view class="warp-text1">温馨提示</view>
					<view class="warp-text">未验证店铺信息</view>
					<view class="warp-flex">
						<button @click="toggleVerify()" plain="true">取消</button>
						<button plain="true" @click="clickToVerify" class="color-green">前往验证</button>
					</view>
				</view>
			</view>

			<tui-nomore v-if="noMore"></tui-nomore>
			<back-top :scrollTop="topss"></back-top>
			<view class="tui-safearea-bottom"></view>
		</view>
		<view class="now-to-login" v-if="!wxlogin">
			<view class="login-tips-text">登录后可查看商品价格</view>
			<view class="login-button"><button open-type="getUserInfo" @getuserinfo="getUserInfo">立即登录</button></view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	import Weather from './components/weather.vue';
	import Banner from './components/banner.vue';
	// import amap from '@/common/SDK/amap-wx.js'
	import amap from '../../common/SDK/amap-wx.js';
	//请求
	import {
		listing,
		publicing,
		listing2,
		publicing2
	} from '../../api/api.js';
	//请求地址
	import {
		getIndex,
		getClassify,
		url,
		postActivity,
		getNewsAll,
		getActivity,
		getCart,
		postmyOrder,
		loginis,
		getClient
	} from '../../api/request.js';

	// 引入vuex的mapstate
	import {
		mapState
	} from 'vuex';
	var {
		log
	} = console;
	var isFirst = true;
	var isFirst1 = true;
	export default {
		components: {
			Weather,
			Banner
		},
		data() {
			return {
				wxlogin: true,
				modaishow: false, //是否登录
				isVerify: false, //是否验证
				currentSwiperItem: 0, //推荐好货 的当前轮播模块
				swiperHeight: 0,
				hotGoods: [],
				topss: 0,
				showAuthTips: true,
				address: '', //地址
				ApproveStatus: 0,
				show: false,
				NewGoods: [], //新果上市
				WxActivityList: [], //限量批
				WeatherHide: true,
				startTime: 0,
				endTime: 0,
				createTime: 0,
				ts: 0,
				mm: 0,
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
				opcity: 0.3, //渐变
				bgOpcity: 1,
				scrollH: 0, //滚动总高度
				height: 84, //header高度
				heightg: 84,
				top: 60, //标题图标距离顶部距离
				canSee: 1,
				num: 0,
				Sumify: '1', //推荐好货请求页码
				noMore: false, //加载完了
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
						title: '批发市场', //推荐好货
						name: '送货到店' // 猜你喜欢
					},
					// {
					// 	title: '实时鲜果',
					// 	name: '今天辛苦了'
					// },
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
					weather: '',
					temperature: ''
				},
				tempData: {
					pageNo: 1,
					pageSize: 10
				}
			};
		},

		onReachBottom() {
			if (!this.noMore) {
				this.tempData.pageNo++;
				this.getIndexClass();
			} else {
				uni.showToast({
					title: '没有更多啦~',
					icon: 'none'
				});
			}
		},
		methods: {
			handleChange(e) {
				const {
					current
				} = e.detail;
				this.num = current;
				this.currentSwiperItem = current;
				this.IndexGoods = [];
				this.tempData.pageNo = 1;
				this.noMore = false;
				if (this.num === 0) {
					this.Sumify = 1;
				} else if (this.num === 1) {
					this.Sumify = 3; // 原本有三项，现改为2项，取消中间的那一项
				}
				this.getIndexClass();
			},
			//点击进入详情
			clickToDetail(id) {
				uni.navigateTo({
					url: '../../pagesIII/productDetail/productDetail?id=' + id
				});
			},
			// 点击加入购物车
			clickToCart(id) {
				const setdata = uni.getStorageSync('usermen');
				if (!setdata) {
					this.modaishow = true;
					return;
				} else {
					// this.modaishow = false
					this.modaishow = false;
					if (this.ApproveStatus === null || this.ApproveStatus === undefined || this.ApproveStatus === '' || this.ApproveStatus ===
						2) {
						this.toggleVerify();
						return;
					}
					if (this.ApproveStatus === 0) {
						uni.showToast({
							title: '店铺信息审核中',
							icon: 'none'
						});
						return;
					}
					if (this.ApproveStatus === 1) {
						let data = {
							goodsId: id,
							token: setdata,
							number: 1
						};
						publicing(postmyOrder, data)
							.then(res => {
								let code = res.data.code;
								if (code != 200) {
									uni.showToast({
										title: `${res.data.msg}`,
										icon: 'none',
										duration: 3000
									});
								} else {
									// this.postDetails();
									this.canCart = true;
									uni.showToast({
										title: '加入进货单成功',
										icon: 'none',
										duration: 3000
									});
									this.orderIng();
								}
							})
							.catch(err => {
								log(err);
							});
					}
				}
			},
			orderIng() {
				let setdata = uni.getStorageSync('usermen');
				let data = {
					token: setdata
				};
				listing(getCart, data)
					.then(res => {
						if (res.data.code && res.data.code != 200) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							// uni.switchTab({
							// 	url: '../my/my'
							// })
							return;
						}
						let lists = res.data.data;

						if (lists) {
							let cartNum = 0;
							lists.forEach(it => {
								if (it.list) {
									cartNum += it.list.length;
								}
							});
							if (lists.length !== 0) {
								uni.setTabBarBadge({
									index: 3,
									text: cartNum + ''
								});
							} else {
								uni.removeTabBarBadge({
									index: 3
								});
							}
						}
					})
					.catch(err => {
						log(err);
					});
			},
			// 取消
			messcancel() {
				this.modaishow = false;
			},
			toggleVerify() {
				this.isVerify = !this.isVerify;
			},
			clickToVerify() {
				uni.navigateTo({
					url: '../../pagesII/tendShop/tendShop'
				});
				this.toggleVerify();
			},
			//获取推荐好货的高度
			getHeight() {
				const query = uni.createSelectorQuery().in(this);
				query
					.select('.tui-product-list')
					.boundingClientRect(data => {
						this.swiperHeight = parseInt(data.height);
					})
					.exec();
			},
			//推荐好货请求
			flexClick(e) {
				this.num = e;
				this.currentSwiperItem = e;
				// this.IndexGoods = []
				// this.tempData.pageNo = 1
				// this.noMore = false
				// if (this.num === 0) {
				// 	this.Sumify = 1
				// } else if (this.num === 1) {
				// 	this.Sumify = 3 // 原本有三项，现改为2项，取消中间的那一项
				// }
				// this.getIndexClass()
			},
			//请求首页列表
			getIndexClass() {
				let data2 = Object.assign({
						indexClassify: this.Sumify
					},
					this.tempData
				);
				uni.showLoading({
					title: '加载中...'
				});
				listing(getClassify, data2)
					.then(res => {
						setTimeout(() => {
							uni.hideLoading();
						}, 200);
						//处理数据格式,praiseNumber
						let goodsData = res.data.data.data;
						// this.IndexGoods = goodsData //【1】首页分类数据
						this.IndexGoods = this.IndexGoods.concat(goodsData);

						setTimeout(() => {
							this.getHeight();
						}, 100);
						if (goodsData.length == 0 || goodsData.length < this.tempData.pageSize) {
							this.noMore = true;
							return;
						}
					})
					.catch(err => {
						log(err);
					});
			},
			//请求首页
			getHomelist() {
				let setdata = uni.getStorageSync('usermen');
				let data = {
					pageNo: '1',
					pageSize: '1000',
					token: setdata
				};
				listing(getIndex, data) //请求首页数据接口
					// listing(getIndex,data) //单发请求
					.then(res => {
						this.hotGoods = res.data.data.hotGoods;
						this.address = res.data.data.address;
						this.HotVarieties = res.data.data.HotVarieties; //【0】首页分类列表
						this.WxTopNavigationBar = res.data.data.WxTopNavigationBar;
						this.WxIndexViewpager = res.data.data.WxIndexViewpager;
						this.WxPublicMsg = res.data.data.WxPublicMsg;
						this.WxPublicMsgID = res.data.data.WxPublicMsg.id; //公告id
						this.WxPostersBottomAdve = res.data.data.WxPostersBottomAdve;
						this.NewGoods = res.data.data.NewGoods.goods; //新果上市
						this.WxActivity = res.data.data.WxActivity; //限量区数据ID+倒计时
						this.WxActivityID = res.data.data.WxActivity.id; //限量区数据ID+倒计时
						this.WxActivityList = res.data.data.WxActivity.list; //首页限量区数据
						this.startTime = res.data.data.WxActivity.startTime;
						this.endTime = res.data.data.WxActivity.endTime;
						this.createTime = res.data.data.WxActivity.createTime;
						this.ts = (this.endTime - this.createTime) / 1000;
						this.dd = parseInt(this.ts / 60 / 60 / 24, 10); //计算剩余的天数
						this.hh = parseInt((this.ts / 60 / 60) % 24, 10); //计算剩余的小时数
						this.mm = parseInt((this.ts / 60) % 60); //计算剩余的分钟数
						this.ss = parseInt(this.ts % 60, 10); //计算剩余的秒数
					})
					.catch(err => {
						console.log(err);
					});
			},

			// 点击轮播图跳转
			goToLimit(val) {
				uni.navigateTo({
					url: val.url
				});
			},

			getMerchants() {
				let setdata = uni.getStorageSync('usermen');
				if (!setdata) {
					this.ApproveStatus = 0;
					return;
				} else {
					let data = {
						token: setdata
					};
					listing(getClient, data)
						.then(res => {
							if (res.data.code && res.data.code != 200) {
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									duration: 3000
								});
								this.ApproveStatus = undefined;
								uni.switchTab({
									url: '../my/my'
								});
								return;
							}
							///登录成功后显示去认证店铺，如果已认证，显示已认证店铺
							this.ApproveStatus = res.data.data.approveStatus; //获取电偶状态码，0未认证，1已认证，2拒绝
							let cityCode = res.data.data.address;
							this.amapPlugin = new amap.AMapWX({
								key: this.key
							});
							this.amapPlugin.getWeather({
								city: cityCode,
								success: wres => {
									this.weatherObj.temperature = wres.liveData.temperature;
									this.weatherObj.weather = wres.liveData.weather;
								}
							});
						})
						.catch(err => {
							log(err);
						});
				}
			},

			//最近看过
			golook() {
				uni.navigateTo({
					url: '../../pagesII/Recently/Recently'
				});
			},
			//弹出协议
			popupState(state) {},
			//资讯页面
			goTimeInfo(id, content, title, createDate) {
				//拼接路径携带参数
				uni.navigateTo({
					url: '../../pagesII/timeInfo/timeInfo?id=' + id + '&content=' + content + '&createDate=' + createDate +
						'&title=' + title
				});
			},
			//倒计时
			endOfTime: function() {},
			//金刚区跳转
			hrefKing(index, title) {
				let url = '';
				switch (index) {
					case 0:
						url = '../../pagesII/seasonal/seasonal?title=' + title; //应季专区
						break;
					case 1:
						url = '../../pagesII/hotFruit/hotFruit?title=' + title; //热门品种
						break;
					case 2:
						url = '../../pagesII/ImportedFruit/ImportedFruit?title=' + title; //进口水果
						break;
					case 3:
						url = '../../pagesII/superValue/superValue?title=' + title; //超值专区
						break;
					case 4:
						url = '../../pagesII/Recently/Recently?title=' + title; //最近看过
						break;
					default:
						break;
				}
				if (url) {
					uni.navigateTo({
						url: url
					});
				} else {
					uni.showToast({
						title: '功能未完成~',
						icon: 'none'
					});
				}
			},
			//资讯页
			goMessage() {
				uni.navigateTo({
					url: '../../pagesII/message/message'
				});
			},
			gotoGun() {
				uni.switchTab({
					url: '../../pages/search/search'
				});
			},
			// 头部
			onPageScroll(e) {
				this.topss = e.scrollTop;
				if (this.statusHeight > 20) {
					if (e.scrollTop < 20) {
						this.canSee = 1 - e.scrollTop / 10;
						this.opcity = 0.3 + e.scrollTop / 50;
					}
					if (e.scrollTop < 70) {
						this.bgOpcity = 1 + e.scrollTop / 100;
					}
					if (e.scrollTop >= 70) {
						this.opcity = 1;
						this.canSee = 0;
					}
					if (e.scrollTop > 70) {
						this.bgOpcity = 0;
					}
				} else {
					if (e.scrollTop < 14) {
						this.canSee = 1 - e.scrollTop / 10;
						this.opcity = 0.3 + e.scrollTop / 50;
					}
					if (e.scrollTop < 40) {
						this.bgOpcity = 1 + e.scrollTop / 100;
					}
					if (e.scrollTop >= 40) {
						this.opcity = 1;
						this.canSee = 0;
					}
					if (e.scrollTop > 40) {
						this.bgOpcity = 0;
					}
				}
				if (e.scrollTop === 0) {
					// this.WeatherHide = true
					this.opcity = 0;
					this.canSee = 1;
				}
			},
			//获取微信昵称
			getUserInfo(event) {
				if (event.detail.userInfo) {
					uni.setStorageSync('userIN', event.detail.userInfo); //把token存在本地，小程序提供如同浏览器cookie
					let wxing = event.detail.userInfo;
					this.wxCode(wxing.avatarUrl, wxing.nickName);
				}
				this.modaishow = false;
			},
			//获取微信code
			wxCode(avatarUrl, nickName) {
				wx.login({
					success: res => {
						// return
						let code = res.code;
						this.wxLoging(code);
					},
					fail: err => {
						log(err);
					}
				});
			},
			//发给后台拿token
			wxLoging(code) {
				let data = {
					code
				};
				publicing2(loginis, data) //发送请求携带参数
					.then(res => {
						if (res.statusCode == 200 && res.data.statusCode == 500) {
							uni.showToast({
								title: '登录信息过期,请重新登录',
								icon: 'none'
							});
							setTimeout(() => {
								uni.removeStorageSync('userIN');
								uni.removeStorageSync('usermen');
								uni.removeStorageSync('StoreStatus');
								this.ifUser();
								
							}, 1000);
							return;
						} else {
							uni.setStorageSync('usermen', res.data.token); //把token存在本地，小程序提供如同浏览器cookie
							var setdata = uni.getStorageSync('usermen');
							uni.hideLoading();
							setTimeout(() => {
								uni.showToast({
									title: '登录成功'
								});
							}, 100);
							this.wxlogin = true
							this.getMerchants();
						}
					})
					.catch(err => {
						log(err);
					});
			},
			ifUser() {
				let setdata = uni.getStorageSync('usermen');
				if (!setdata) {
					// uni.showToast({
					// 	title: '请登录',
					// 	duration: 2000
					// });
					this.wxlogin = false;
				} else {
					// uni.showToast({
					// 	title: '已登录',
					// 	duration: 2000
					// });
					this.wxlogin = true;
					this.usering = setdata;
				}
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

			//限量批页面
			goLimit() {
				let id = this.WxActivityID;
				uni.navigateTo({
					url: '../../pagesII/Limit/Limit?id=' + id
				});
			},
			//新果上市
			fruitGo() {
				uni.navigateTo({
					url: '../../pagesII/fruitList/fruitList'
				});
			},
			//排行榜
			goToRank() {
				uni.navigateTo({
					url: '../../pagesII/rankingList/rankingList?index=0&value=shop'
				});
			},
			//带参数跳转
			gotoBreed(name, id) {
				uni.navigateTo({
					url: '../../pagesII/productList/productList?name=' + name + '&id=' + id
				});
			},
			//商品详情页
			gotoList(id) {
				uni.navigateTo({
					url: '../../pagesIII/productDetail/productDetail?id=' + id
				});
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
					this.showSearch1 = !this.showSearch1;
					this.praiseNum1++; //点赞一次
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
		//下来刷新
		onPullDownRefresh: function() {
			this.IndexGoods = [];
			this.tempData.pageNo = 1;
			this.noMore = false;
			this.getMerchants();
			this.getHomelist();
			this.getIndexClass();
			uni.stopPullDownRefresh();
		},
		//初始化
		onLoad() {
			this.getMerchants();
			this.getIndexClass();
			// this.getGoodsAll()
			//请求首页
			this.getHomelist();
			//新版头部
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			const res = uni.getSystemInfoSync();
			let {
				statusBarHeight
			} = res;
			let info = uni.getMenuButtonBoundingClientRect();
			let {
				top,
				bottom
			} = info;
			this.statusHeight = statusBarHeight;
			let buttonHeight = bottom - statusBarHeight + (top - statusBarHeight);
			let navHeight = statusBarHeight + buttonHeight + top - statusBarHeight; //状态栏+导航栏的高度（页面初始高度）
			this.boxHeight = navHeight - statusBarHeight; //导航栏高度
			this.navHeight = navHeight;
			// #endif
			setTimeout(() => {
				this.showAuthTips = false;
			}, 5000);
		},

		onNavigationBarButtonTap(e) {},
		
		onShow() {
			let setdata = uni.getStorageSync('usermen');
			if (setdata) {
				this.orderIng();
			}
			this.getMerchants();
			this.getHomelist();
			this.ifUser()
		},
		// 转发
		onShareAppMessage: function() {
			return {
				title: '',
				imageUrl: '../../static/images/taozi.jpg'
				// path: '/pages/test/test?id=123'
			};
		},

		mounted() {
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			});
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
						res = words[0] + '.' + words[1] + '万';
					}
					if (words.length === 6) {
						res = words[0] + words[1] + '.' + words[2] + '万';
					}
					if (words.length === 7) {
						res = words[0] + words[1] + words[2] + '.' + words[3] + '万';
					}
					if (words.length === 8) {
						res = words[0] + words[1] + words[2] + words[3] + '.' + words[4] + '万';
					}
					if (words.length === 9) {
						res = words[0] + '.' + words[1] + '亿';
					}
					if (words.length === 10) {
						res = words[0] + words[1] + '.' + words[2] + '亿';
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

			isShowUnit(val) {
				return;
			}
		}
	};
</script>

<style lang="less" scoped>
	@import '../../common/css/tui.css';
	@import '../../common/iconfont/iconfont.css';

	.new-limit-single-wrap {
		width: 720rpx;
		margin: 30rpx auto;
		height: 400rpx;
		border-radius: 20rpx;
		position: relative;

		.new-limit-single-bg {
			width: 100%;
			height: 400rpx;
			z-index: -1;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;

			image {
				width: 100%;
				height: 400rpx;
			}
		}

		.new-limit-top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10rpx 20rpx 8rpx;

			.top-left {
				width: 70%;
				display: flex;
				align-items: center;

				.top-left-title {
					font-size: 44rpx;
					color: #fff;
					font-weight: bold;
					padding: 0 8rpx;
				}

				.top-left-countdown {
					border-left: 4rpx solid #fff;
					padding-left: 14rpx;
				}
			}

			.top-right {
				width: 30%;
				display: flex;
				justify-content: flex-end;

				.more-btn {
					background: #fff;
					width: 140rpx;
					font-size: 24rpx;
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #00bd45;
					border-radius: 14rpx;
					height: 46rpx;

					image {
						width: 10rpx;
						height: 18rpx;
						margin-left: 2rpx;
					}
				}
			}
		}

		.new-limit-single-content {
			width: 680rpx;
			height: 300rpx;
			background: #fff;
			margin: 0 auto;
			border-radius: 14rpx;

			.new-limit-single-item {
				display: flex;
				justify-content: space-between;

				.item-url {
					image {
						width: 300rpx;
						height: 300rpx;
						display: block;
					}
				}

				.item-info {
					padding: 0 28rpx;

					.item-name {
						font-size: 32rpx;
						color: #333;
						font-weight: bold;
						line-height: 46rpx;
						margin-top: 22rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						text-overflow: ellipsis;
						min-height: 92rpx;
					}

					.item-specification {
						font-size: 24rpx;
						color: #7f7f7f;
						font-weight: 400;
						margin-bottom: 36rpx;
						margin-top: 12rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 328rpx;
						min-height: 34rpx;
					}

					.item-buy-btn {
						position: relative;
						width: 328rpx;
						height: 84rpx;

						.buy-btn-bg {
							width: 328rpx;
							height: 84rpx;
							position: relative;

							image {
								width: 328rpx;
								height: 84rpx;
								display: block;
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								bottom: 0;
								z-index: 1;
							}
						}

						.item-price-buy {
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
							width: 100%;
							z-index: 2;
							display: flex;
							align-items: center;
							justify-content: space-between;

							.left-price {
								width: 50%;
								text-align: center;
								color: #ff7709;

								text {
									&:first-child {
										font-size: 22rpx;
										font-weight: 400;
									}

									&:nth-child(2) {
										margin: 0 4rpx;
										font-size: 36rpx;
										font-weight: 500;
									}

									&:nth-child(3) {
										font-size: 24rpx;
										font-weight: 400;
									}
								}
							}

							.right-buy {
								width: 50%;
								text-align: center;
								font-size: 28rpx;
								color: #fff;
							}
						}
					}
				}
			}
		}
	}

	.new-limit-multi-wrap {
		width: 720rpx;
		margin: 30rpx auto;
		height: 540rpx;
		// background: #FF0000;
		border-radius: 20rpx;
		position: relative;

		.new-limit-bg {
			width: 100%;
			height: 540rpx;
			z-index: -1;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;

			image {
				width: 100%;
				height: 540rpx;
			}
		}

		.new-limit-top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10rpx 20rpx 8rpx;

			.top-left {
				width: 70%;
				display: flex;
				align-items: center;

				.top-left-title {
					font-size: 44rpx;
					color: #fff;
					font-weight: bold;
					padding: 0 8rpx;
				}

				.top-left-countdown {
					border-left: 4rpx solid #fff;
					padding-left: 14rpx;
				}
			}

			.top-right {
				width: 30%;
				display: flex;
				justify-content: flex-end;

				.more-btn {
					background: #fff;
					width: 140rpx;
					font-size: 24rpx;
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #00bd45;
					border-radius: 14rpx;
					height: 46rpx;

					image {
						width: 10rpx;
						height: 18rpx;
						margin-left: 2rpx;
					}
				}
			}
		}

		.new-limit-content {
			width: 680rpx;
			height: 440rpx;
			background: #fff;
			margin: 0 auto;
			border-radius: 14rpx;

			.content-box {
				padding: 20rpx 24rpx 12rpx;
				display: flex;
				/* align-items: center; */
				justify-content: space-between;

				.box-item {
					flex: 1;
					margin-right: 46rpx;

					&:last-child {
						padding-right: 30rpx;
					}

					.item-url {
						image {
							width: 290rpx;
							height: 290rpx;
							display: block;
							border-radius: 16rpx;
						}
					}

					.item-name {
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						font-size: 28rpx;
						color: #333;
						min-height: 30px;
						width: 290rpx;
						height: 60rpx;
						line-height: 60rpx;
					}

					.item-price-action {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.item-price {
							color: #ff7709;
							margin-right: 10rpx;

							text {
								&:first-child {
									font-size: 20rpx;
									margin-right: 4rpx;
									font-weight: 500;
								}

								&:nth-child(2) {
									font-size: 36rpx;
									font-weight: bold;
								}

								&:nth-child(3) {
									font-size: 24rpx;
									color: #b6b6b6;
								}
							}
						}

						.item-action {
							height: 50rpx;
							width: 110rpx;
							text-align: center;
							font-size: 20rpx;
							background: linear-gradient(to right, #fca421, #ff7709);
							border-radius: 14rpx;
							line-height: 50rpx;
							color: #fff;
						}
					}
				}
			}
		}
	}

	.hot-goods-wrap {
		width: 720rpx;
		margin: 30rpx auto;
		height: 420rpx;
		-webkit-border-radius: 10px;
		border-radius: 20rpx;
		position: relative;

		.hot-goods-bg {
			width: 100%;
			height: 120rpx;
			z-index: -1;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;

			image {
				width: 100%;
				height: 120rpx;
				display: block;
			}
		}

		.hot-goods-top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 20rpx;
			height: 82rpx;

			.top-left {
				width: 70%;
				display: flex;
				align-items: center;

				.left-icon {
					width: 40rpx;
					height: 40rpx;

					image {
						width: 40rpx;
						height: 40rpx;
						display: block;
					}
				}

				.left-title {
					display: flex;
					align-items: center;

					.title-left {
						font-size: 36rpx;
						color: #fff;
						font-weight: 500;
						margin: 0 12rpx;
					}

					.title-right {
						font-size: 28rpx;
						color: #fff;
						font-weight: 500;
						padding-left: 12rpx;
						border-left: 4rpx solid #fff;
					}
				}
			}

			.top-right {
				width: 30%;
				display: flex;
				justify-content: flex-end;

				.more-btn {
					background: #fff;
					width: 140rpx;
					font-size: 24rpx;
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #00bd45;
					border-radius: 14rpx;
					height: 46rpx;

					image {
						width: 10rpx;
						height: 18rpx;
						margin-left: 2rpx;
					}
				}
			}
		}

		.hot-goods-content {
			width: 100%;
			background: #fff;
			height: 340rpx;
			border-radius: 30rpx 30rpx 20rpx 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 8rpx 20rpx;
			box-sizing: border-box;

			.content-item {
				width: 184rpx;

				.item-url {
					image {
						width: 182rpx;
						height: 182rpx;
						display: block;
						border-radius: 16rpx;
						border: 1px solid #f5f5f5;
					}
				}

				.item-name {
					// display: -webkit-box;
					// -webkit-box-orient: vertical;
					// -webkit-line-clamp: 2;
					white-space: nowrap;
					width: 182rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					font-size: 26rpx;
					color: #333;
					// min-height: 80rpx;
				}

				.item-specification {
					font-size: 24rpx;
					color: #b6b6b6;
					min-height: 28rpx;
				}

				.item-price-action {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.item-price {
						color: #ff7709;
						margin-right: 10rpx;

						text {
							&:first-child {
								font-size: 20rpx;
								margin-right: 4rpx;
								font-weight: 500;
							}

							&:nth-child(2) {
								font-size: 36rpx;
								font-weight: bold;
							}

							// &:nth-child(3) {
							// 	font-size: 16rpx;
							// 	color: #B6B6B6;
							// }
						}
					}

					.item-action {
						image {
							width: 48rpx;
							height: 48rpx;
							display: block;
						}
					}
				}
			}
		}
	}

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
		transition: all 0.3s;
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
		transition: all 0.1s;
	}

	.index-bg image {
		width: 100%;
		height: 318rpx;
		z-index: -1;
	}

	.now-to-login {
		display: flex;
		position: fixed;
		bottom: 14rpx;
		justify-content: space-between;
		left: 14rpx;
		right: 14rpx;
		background: rgba(0, 0, 0, .5);
		border-radius: 12rpx;
		align-items: center;
		color: #fff;
		box-sizing: border-box;
		padding: 0 20rpx;
		height: 80rpx;
		z-index: 9999;

		.login-tips-text {
			font-size: 24rpx;
			font-weight: 500;
		}

		.login-button {
			button {
				font-size: 24rpx;
				padding: 8rpx 20rpx;
				margin: 0;
				line-height: unset;
				border-radius: 60rpx;
				background: #21ca2b;
				font-weight: 500;
				color: #fff;
			}
		}
	}

	.index-content {
		z-index: 999;
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
		color: #f00e2c !important;
	}

	.icon-dianzan {
		color: #ffbe33 !important;
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
		background-image: linear-gradient(to right, #00c94a, #00ac3f);
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
		border-radius: 20rpx;
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
		background: rgba(255, 255, 255, 0.5);
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: center;
		border-radius: 20rpx 20rpx 0 0;
	}

	.item-text {
		background: rgba(0, 0, 0, 0.6);
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
		padding: 20rpx 12rpx;
		border-radius: 0 0 20rpx 20rpx;
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
		font-size: 20rpx;
		color: #7f7f7f;
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
		color: #b6b6b6;
		font-size: 24rpx;
		/* width: 100rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap; */
	}

	.tui-jin {
		color: #b6b6b6;
		font-size: 24rpx;
	}

	.tui-dea-color {
		color: #ff4300;
	}

	.tui-rate {
		color: #ff4300;
		font-size: 40rpx;
		font-weight: 500;
	}

	.tui-rate text {
		font-size: 20rpx;
		margin-right: 2rpx;
	}

	.tui-rate-price {
		color: #b6b6b6;
		font-size: 24rpx;
		font-weight: 700;
		text-decoration: line-through;
		margin-left: 4rpx;
		flex: 2;
	}

	.tui-rate-price text {
		font-size: 16rpx;
		color: #b6b6b6;
		margin-right: 2rpx;
	}

	.tui-rate-text {
		color: #b6b6b6;
		font-size: 24rpx;
		margin-left: 4rpx;
	}

	.tui-praise {
		color: #c4c4c4;
		font-size: 24rpx;
	}

	.icon-like {
		margin-right: 8rpx;
	}

	.tag-tit-border {
		border: 1rpx solid rgba(255, 119, 9, 1);
		color: rgba(255, 119, 9, 1);
		font-size: 20rpx;
		padding: 2rpx 10rpx;
		border-radius: 18rpx;
		margin-right: 10rpx;
		display: inline-flex;
	}

	/* 推荐好货 */
	.border1px {
		border-left: 1rpx solid #e9e9e9;
		border-right: 1rpx solid #e9e9e9;
		padding: 10rpx 0;
	}

	.line-bor {
		line-height: 30rpx !important;
	}

	.fixed-3-font-wei {
		font-size: 36rpx;
		font-weight: 700;
		// color: #000;
		color: #fff;
		margin: 2rpx 0;
	}

	.fixedweight {
		font-weight: 700;
		// color: rgba(0, 198, 42, 1);
		color: #fff;
		font-size: 36rpx;
		margin: 2rpx 0;
	}

	.fixed-3-font-weitwo {
		font-size: 28rpx;
		// color: #9a9a9a;
		color: #fff;
		font-weight: 400;
		width: 66%;
		margin: 0 auto;
		padding: 5rpx 0rpx;
		border-radius: 60rpx;
		background: transparent;
		transition: all 0.5s;
	}

	.fixed3fontweione {
		color: #fff !important;
		// background: linear-gradient(to right, #00c94a, #00ac3f);
		background: linear-gradient(to right, #FF7709, #FF7709);
	}

	.xiding {
		position: sticky;
		z-index: 999;
		/* 修改成2项 */
		/* border-radius: 30rpx; */
		/* overflow: hidden; */
		/* margin: 14rpx 20rpx 0; */
	}

	.tui-recommend {
		margin: 10rpx 0;
		width: 100%;
		text-align: center;
		display: flex;
		justify-content: space-around;
		// background-color: #fff;
		background: rgba(0, 197, 42, 1);
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
		color: #ff4300;
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
		color: #ff6500;
		margin-top: 14rpx;
	}

	.tui-first-price {
		display: flex;
		align-items: baseline;
		width: 100%;
		justify-content: center;
	}

	.tui-last-price {
		color: #b6b6b6;
		margin-left: 6rpx;
	}

	.price-label {
		color: #b6b6b6;
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

	.new-fruit-title {
		width: 56%;
	}

	.tui-line {
		padding-top: 50rpx;
	}

	/* 温馨提示 */
	.tui-reminder {
		justify-content: space-around;
		display: flex;
		height: 64rpx;
		line-height: 64rpx;
		background-color: #fff;
		margin: 20rpx;
		border-radius: 40rpx;
	}

	.icon-weibiaoti34 {
		position: relative;
		top: 4rpx;
	}

	.icon-laba {
		color: #00ac3f;
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
		color: #6e6e6e;
		/* padding: 0 20rpx; */
		margin: 0 20rpx;
	}

	.swiper-item {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		color: #6e6e6e;
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
		content: '';
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

	.hot-loading-bg {
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
		color: #00ac3f;
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
		color: #ffffff;
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
		background-image: linear-gradient(to right, #00c94a, #00ac3f);
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
		color: #ff5600;
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
		background-image: linear-gradient(to right, #ff943d, #ff5600);
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
		transition: all 0.3s;
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
		align-items: center;
	}

	.tui-news-item {
		line-height: 28rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #0e0e0e;
		font-weight: normal;
		font-size: 28rpx;
	}

	/* 模态弹窗布局 */
	.warp {
		position: fixed;
		left: 0;
		right: 0;
		top: 130rpx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 9999;
	}

	.warp-view {
		width: 500upx;
		height: 260upx;
		background: #ffffff;
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
		margin-top: 34upx;
		font-size: 34upx;
		color: #666666;
	}

	.warp-text1 {
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 34upx;
		color: #fff;
		background-color: rgba(0, 197, 42, 1);
	}

	.warp-flex {
		display: flex;
		justify-content: space-around;
		border-top: 1upx solid #eeeeee;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80upx;
		line-height: 80upx;
	}

	.color-green {
		color: rgba(0, 197, 42, 1);
	}

	.warp-flex button {
		border: none;
		font-size: 30upx;
	}

	.warp-flex button:nth-child(2) {
		color: rgba(0, 197, 42, 1);
	}

	/*end  */
</style>
