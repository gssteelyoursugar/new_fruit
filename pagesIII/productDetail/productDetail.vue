<template>
	<view class="container">
		<!--header-->
		<view class="tui-header-box" :style="{ height: navHeight + 'px', background: 'rgba(255,255,255,' + opcity + ')' }">
			<!-- <view class="tui-header" :style="{ paddingTop: top + 'px', opacity: opcity }"></view> -->
			<view class="tui-header-icon" :style="{ marginTop: iconTop + 'px' }" style="border: 1rpx solid #ccc;border-radius: 50rpx;">
				<view class="tui-icon-box box-line" style="margin-top: 2rpx;" @tap="back">
					<tui-icon name="arrowleft" :size="30" :color="opcity >= 1 ? '#000' : '#fff'"></tui-icon>
				</view>
				<!-- 1像素竖线 -->
				<view class="tui-icon-box" @tap.stop="openMenu">
					<tui-icon name="home-fill" :size="20" color="#000"></tui-icon>
				</view>
			</view>
			<tui-tabs size="32" :top="tabsTop" :tabs="tabs" :isFixed="scrollTop >= 0" :currentTab="currentTab" selectedColor="#00C52A"
			 sliderBgColor="#00C52A" @change="changeNum" itemWidth="50%"></tui-tabs>
		</view>

		<!--选项卡一-->
		<view :class="[currentTab === 0 ? 'actineclass' : 'errorclass']">
			<view class="tui-banner-swiper">
				<swiper :autoplay="false" :interval="5000" :duration="150" :circular="true" :style="{ height: 520 + 'rpx' }"
				 @change="bannerChange">
					<!-- https://qg-qr.oss-cn-shenzhen.aliyuncs.com/test/1602326575865.mp4?Expires=1917686575&OSSAccessKeyId=LTAI4G74cnhsbDWNkfvuNew3&Signature=D3SFuMpki6hbX6iNKTPXQQ%2BcgpM%3 -->
					<block v-for="(item, index) in swiperList" :key="index" v-if="shopListdata.urlVideo==='' ">
						<swiper-item :data-index="index">
							<image :src="item" class="tui-slide-image" :style="{ height: scrollH + 'px' }" />
						</swiper-item>
					</block>
					<block v-for="(item, index) in swiperList" :key="index" v-if="shopListdata.urlVideo!==''">
						<swiper-item :data-index="index" v-if="index===0">
							<video v-cloak id="myVideo"  :src="shopListdata.urlVideo" :show-fullscreen-btn="true" style="width:100%;height:100%;"></video>
						</swiper-item>
						<swiper-item :data-index="index" v-else>
							<image :src="item" class="tui-slide-image"  />
						</swiper-item>
					</block>

				</swiper>
				<view class="tui-banner-tag">
					{{ bannerIndex + 1 || 0}}/{{ swiperList.length ||0}}
				</view>
				<view class="net-tip" v-if="!netStatus&& shopListdata.urlVideo!==''">当前为非wifi环境，使用流量播放视频</view>
			</view>



			<view class="tui-pro-detail">
				<view class="tui-product-title tui-border-radius">
					<view class="tui-pro-tit">
						<block v-for="(item, index) in labelList" :key="index">
							<text class="tag-tit">{{ item.name || ''}}</text>
						</block>

						<text class="tag-tit-text">{{ shopListdata.name ||''}}</text>

						<view class="tag-tit-pra" v-if="!canPraise" @tap="praiseLike(shopListdata.id)">
							<tui-icon name="agree" color="#999" :size="15"></tui-icon>
							<text>点赞{{ shopListdata.praiseNumber||0 |filterNum}}</text>
						</view>
						<view class="tag-tit-pra" v-if="canPraise" @tap="praiseLikeTwo">
							<tui-icon name="agree-fill" color="#ff0000" :size="15"></tui-icon>
							<text>点赞{{ shopListdata.praiseNumber||0  |filterNum}}</text>
						</view>

					</view>
					<view class="tui-original-price tui-gray">{{ shopListdata.describe ||0}}</view>

					<view class="tui-pro-titbox">
						<view class="tui-pro-title">
							<text class="tui-pro-title-tag" v-if="shopListdata.number">仅剩{{ shopListdata.number || 0 }}件</text>
							<!--    -->
							<text class="tui-pro-title-tag" v-if="shopListdata.totalPirce!== undefined">成交{{ shopListdata.totalPirce | filterNum }}元</text>
							<text class="tui-pro-title-tag" v-if="shopListdata.viewNumber!== undefined">{{ shopListdata.viewNumber | filterNum }}人看</text>
						</view>
						<button open-type="share" class="tui-share-btn tui-share-position" @tap="onShare">
							<tui-tag type="gray" shape="circleLeft" padding="12rpx 16rpx">
								<view class="tui-share-box">
									<tui-icon name="partake" color="#999" :size="15"></tui-icon>
									<text class="tui-share-text tui-gray tui-size">分享</text>
								</view>
							</tui-tag>
						</button>
					</view>
					<view class="tui-padding">
						<view class="tui-sale-info tui-size tui-gray">
							<view class="tui-magin">
								<text class="tui-code">￥</text>
								<text class="tui-price-one">{{ shopListdata.platformPrice }}</text>
								<text style="font-size:28rpx;color: #FF6500;">元</text>
								<text>/件</text>
							</view>
							<view class="tui-huaxian">￥{{ shopListdata.marketPrice ||0}}/件</view>
							<view class="tui-text-overflow">{{ shopListdata.specification ||''}}, 水果净重约{{ shopListdata.kg2 ||0}}斤</view>
						</view>
					</view>
				</view>
				<!-- 水果身份 -->
				<view class="tui-height-full">
					<view class="tui-title-line"><text>水果身份</text></view>
					<view class="tui-height-flex">
						<view class="tui-left-one1">
							<text class="tui-title-class">种&nbsp;类：</text>
							<text class="tui-name-class" style="font-size: 24rpx;">{{ shopListdata.classify }}</text>
						</view>
						<view class="tui-right-one">
							<text class="tui-title-class">品&nbsp;种 ：</text>
							<text class="tui-name-class" style="font-size: 24rpx;">{{ shopListdata.variety }}</text>
						</view>
					</view>
					<view class="tui-height-flex">
						<view class="tui-left-one1">
							<text class="tui-title-class">产&nbsp;地：</text>
							<text class="tui-name-class" style="font-size: 24rpx;width: 244rpx;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ shopListdata.originAddress }}</text>
						</view>
						<view class="tui-right-one">
							<text class="tui-title-class">储藏条件：</text>
							<text class="tui-name-class" style="font-size: 24rpx;">{{ shopListdata.storageMode || '常规' }}</text>
						</view>
					</view>
					<view class="tui-height-flex">
						<view class="tui-left-one1">
							<text class="tui-title-class">包&nbsp;装：</text>
							<text class="tui-name-class" style="font-size: 24rpx;">{{ shopListdata.packaging }}</text>
						</view>

					</view>
				</view>
				<!-- 水果标准 -->
				<view class="tui-height-full">
					<view class="tui-title-line"><text>抽样标准</text></view>
					<view class="tui-height-flex-two tui-magin-left-on tui-border-1px">
						<view class="tui-left-one">
							<text class="tui-text-left tui-title-class">果品星级</text>
							<tui-rate :current="shopListdata.fruitStar" active="#ff7900" :hollow="true" :disabled="true" :size="16"></tui-rate>
						</view>
						<view class="tui-left-one">
							<text class=" tui-text-left tui-title-class">口感星级</text>
							<tui-rate :current="shopListdata.tasteLevel" active="#ff7900" :hollow="true" :disabled="true" :size="16"></tui-rate>
						</view>
					</view>
					<view class="tui-height-flex-two tui-magin-left-on tui-border-1px">
						<view class="tui-left-one">
							<text class="tui-text-left tui-title-class">果色星级</text>
							<tui-rate :current="shopListdata.colorLevel" active="#ff7900" :hollow="true" :disabled="true" :size="16"></tui-rate>
						</view>
						<view class="tui-left-one">
							<text class="tui-text-left tui-title-class">外观星级</text>
							<tui-rate :current="shopListdata.facadeLevel" active="#ff7900" :hollow="true" :disabled="true" :size="16"></tui-rate>
						</view>
					</view>
					<view class="tui-height-flex-two tui-magin-left-on tui-border-1px">
						<view class="tui-left-one2">
							<text class="tui-text-left tui-title-class">果径大小</text>
							<text class=" tui-text-left tui-title-class">{{ shopListdata.platformPrice }}mm</text>
						</view>
						<view class="tui-right-one" style="flex: 4;">
							<text class=" tui-text-left tui-title-class ">不良率</text>
							<text class=" tui-text-left tui-title-class">{{ shopListdata.rejectRatio }}%</text>
						</view>
					</view>
					<view class="tui-height-flex-two tui-magin-left-on tui-border-1px">
						<view class="tui-left-one2">
							<text class="tui-text-left tui-title-class">糖分</text>
							<text class=" tui-text-left tui-title-class">{{ shopListdata.sugar }}%</text>
						</view>
						<view class="tui-right-one" style="flex: 4;">
							<text class="tui-text-left tui-title-class">酸度</text>
							<text class="tui-text-left tui-title-class">{{ shopListdata.acidity }}%</text>
						</view>
					</view>
					<view class="tui-height-flex-two tui-magin-left-on tui-border-1px">
						<view class="tui-left-one2">
							<text class="tui-text-left tui-title-class">水分</text>
							<text class="tui-text-left tui-title-class">{{ shopListdata.moisture }}%</text>
						</view>
						<view class="tui-right-one" style="flex: 4;">
							<text class="tui-text-left tui-title-class">硬度</text>
							<text class="tui-text-left tui-title-class">{{ shopListdata.hardness }}kg/.co</text>
						</view>
					</view>
					<!-- 	<view class="tui-height-flex-two tui-magin-left-on tui-border-1px">
						<view class="tui-left-one">
							<text class="tui-text-left tui-title-class">外观等级</text>
						</view>
						<view class="tui-right-one">
							<text class="tui-title-class">{{shopListdata.facadeLevel}}</text>
						</view>
						
					</view>
					<view class="tui-height-flex-two tui-magin-left-on tui-border-1px">
						<view class="tui-left-one">
							<text class="tui-text-left tui-title-class">果形等级</text>
						</view>
						<view class="tui-right-one">
							<text class="tui-title-class">{{shopListdata.shapeLevel}}</text>
						</view>
						
					</view>
					<view class="tui-height-flex-two tui-magin-left-on tui-border-1px">
						<view class="tui-left-one">
							<text class="tui-text-left tui-title-class">不良率</text>
						</view>
						<view class="tui-right-one">
							<text class="tui-title-class">{{shopListdata.rejectRatio}}</text>
						</view>
						
					</view>
					<view class="tui-height-flex-two tui-magin-left-on tui-border-1px">
						<view class="tui-left-one">
							<text class="tui-text-left tui-title-class">售后时效	</text>
						</view>
						<view class="tui-right-one">
							<text class=" tui-title-class">{{shopListdata.afterSalesTime}}</text>
						</view>
						
					</view> -->
				</view>
				<!-- 物流配送 -->

				<view class="tui-height-full">
					<view class="tui-title-line"><text>物流配送</text></view>
					<view class="tui-height-flex tui-bottom-border">
						<view class="deliver-info" v-if="shopListdata.address && shopListdata.addressDetails">
							<text>配送至</text>{{ shopListdata.address}} {{ shopListdata.addressDetails }}
						</view>
						<view class="" v-else style="font-size: 28rpx;padding: 20rpx 0;color: #333;">
							暂无地址信息
						</view>
					</view>
					<view class="pay-time">
						<text class="tui-pay-color">{{payTime <= 16 ? '16:00前':'现在'}}完成支付，预计{{ shopListdata.deliveryTime|| nowTime | deliverTime }}送达</text>
					</view>
				</view>
				<!-- 水果描述 -->
				<view class="tui-height-full">
					<view class="tui-title-line"><text>水果描述</text></view>
				</view>

				<view class="tui-product-img tui-radius-all">
					<!-- <image src="../../static/images/putao1.png"
					 mode="widthFix"></image> -->
					<jyf-parser selectable @linkpress="clickLink" :html="shopListdata.remarks"></jyf-parser>
				</view>
			</view>
		</view>

		<!--  -->

		<!-- 选项卡二 -->
		<view :class="[currentTab === 1 ? 'actineclass' : 'errorclass']" style="padding-top: 100px;">
			<view class="tui-pro-detail">
				<!-- 免赔情况 -->
				<view class="tui-height-full">
					<view class="tui-title-line"><text>免赔情况</text></view>
					<view class="tui-height-flex tui-height-flex-top">
						<view class="tui-left-one1">
							<text class="iconfont icon-quan"></text>
							<text class="tui-name-class">果子颜色不一</text>
						</view>
						<view class="tui-right-one">
							<text class="iconfont icon-quan"></text>
							<text class="tui-name-class">轻微风花</text>
						</view>
					</view>
					<view class="tui-height-flex tui-height-flex-top">
						<view class="tui-left-one1">
							<text class="iconfont icon-quan"></text>
							<text class="tui-name-class">果形大小不一</text>
						</view>
						<view class="tui-right-one">
							<text class="iconfont icon-quan"></text>
							<text class="tui-name-class">轻微流浆</text>
						</view>
					</view>
				</view>
				<!-- 可售后情况 -->
				<view class="tui-height-full ">
					<view class="tui-title-line"><text>可售后情况</text></view>
					<view class="tui-height-flex tui-height-flex-top">
						<view class="tui-left-one1">
							<text class="iconfont icon-quan"></text>
							<text class="tui-name-class">摔坏</text>
						</view>
						<view class="tui-right-one">
							<text class="iconfont icon-quan"></text>
							<text class="tui-name-class">压伤</text>
						</view>
					</view>
					<view class="tui-height-flex tui-height-flex-top">
						<view class="tui-left-one1">
							<text class="iconfont icon-quan"></text>
							<text class="tui-name-class">腐烂</text>
						</view>
						<view class="tui-right-one">
							<text class="iconfont icon-quan"></text>
							<text class="tui-name-class">单果重量不达标</text>
						</view>
					</view>
				</view>
				<view class="tui-height-full tui-full-bac">
					<view class="tui-title-line"><text>免赔情况</text></view>
					<view class="shuoming">
						在相关法规明确规定网络销售的鲜活易腐类商品不适用
						<text>“七天无理由退换货”</text>
						规则的情况下，圈果公司基于相信商品品质、信任可敬顾客的初衷，主动推出退换货服务，得到广大顾客的赞赏和支持，形成了良好互动，为提升顾客消费体验、构建和谐商业环境起到正向作用。
						为使该服务持久良性发展，更好的惠及顾客，圈果公司制定并发布了
						<text>《退换货规则》</text>
						，具体规则内容可到
						<text>“我的”-“我的服务”-“规则说明”</text>
						查阅全部内容。
					</view>
				</view>
			</view>
		</view>
		<!--  -->
		<tui-nomore text="已经到最底了" backgroundColor="#f7f7f7"></tui-nomore>
		<view class="tui-safearea-bottom"></view>
		<!--底部操作栏-->
		<view class="tui-operation">
			<view class="tui-operation-left tui-col-5">
				<view class="tui-operation-item" hover-class="tui-opcity" :hover-stay-time="150" @tap="likeOrder(shopListdata.id)">
					<tui-icon name="like" :size="22" color="#333" v-if="!shopListdata.isCollection"></tui-icon>
					<tui-icon name="like-fill" :size="22" color="#ff0000" v-if="shopListdata.isCollection"></tui-icon>
					<view class="tui-operation-text tui-scale-small">收藏</view>
				</view>
				<view class="tui-operation-item" hover-class="tui-opcity" :hover-stay-time="150" @tap="postShopping(shopListdata.id)">
					<tui-icon name="order" :size="22" color="#333" v-if="!shopListdata.isCart"></tui-icon>
					<tui-icon name="order" :size="22" color="#ff0000" v-if="shopListdata.isCart"></tui-icon>
					<view class="tui-operation-text tui-scale-small">加入进货单</view>
				</view>
				<!-- <view class="tui-operation-item" hover-class="tui-opcity" :hover-stay-time="150">
					<tui-icon name="cart" :size="22" color="#333"></tui-icon>
					<view class="tui-operation-text tui-scale-small">购物车</view>
					<tui-badge type="red" absolute :scaleRatio="0.8" right="10rpx" top="-4rpx">9</tui-badge>
				</view> -->
			</view>
			<view class="tui-operation-right tui-right-flex tui-col-7 tui-btnbox-4">
				<view class="tui-flex-1">
					<tui-button height="68rpx" :size="26" type="danger" shape="circle" @click="showPopup">立即购买</tui-button>
				</view>
				<!-- <view class="tui-flex-1">
					<tui-button height="68rpx" :size="26" type="warning" shape="circle" @click="submit">立即购买</tui-button>
				</view> -->
			</view>
		</view>
		<wyb-popup ref="popup" type="bottom" height="500" width="750" radius="14" mode="size-fixed" :showCloseIcon="true"
		 :scrollY="true" :showScrollbar="true">
			<!-- 清单列表 -->
			<block v-for="(item, index) in labelList" :key="index">
				<view class="tui-rank-list">
					<view class="tui-tab-rank">
						<view class="tui-tab-rank-cent">
							<image :src="shopListdata.urlVideo!==''? urlList[1]:urlList[0]" mode="aspectFill" class="img-rink"></image>
							<view class="tui-pro-tit" style="padding: 0 30rpx 0 0;">
								<text class="tag-tit">{{ item.name }}</text>
								<text class="tag-tit-text" style="font-size:28rpx">{{ shopListdata.name }}</text>
								<view class="tag-tit2">
									<view class="">
										<view class="tag-tit2-price list-desc">{{ shopListdata.specification }}</view>
										<view class="tag-tit2-num" style="align-items: baseline;">
											<view class="shabi">
												<text class="tui-price-one" style="font-size: 20rpx;">￥</text>
												<view class="tui-price-one">
													{{ shopListdata.platformPrice }}
													<text style="font-size: 24rpx;">元</text>
												</view>
												/件
											</view>
											<view class="tui-huaxian">￥{{ shopListdata.marketPrice }}</view>
										</view>
									</view>

									<!-- <view>购物车</view> -->
								</view>
							</view>
						</view>
						<view class="tag-tit3-flex">
							<view class="tag-tit2-price">购买数量</view>
							<view class="tag-tit2-text">
								<tui-numberbox :min="1" :max="99" :value="value2" @change="change2"></tui-numberbox>
							</view>
						</view>
					</view>
				</view>
				<view class="tui-pay-flex-box">
					<view class="tui-pay-flex">
						<view class="tui-pay1-flex">
							<!-- <text>合计{{shopListdata.platformPrice * value2}}含运费</text> -->
							<text style="color: #333333;font-size: 24rpx;margin-right:4rpx">合计:</text>
							<text style="color: #FF5600;font-size: 20rpx;">¥</text>
							<text style="font-weight: bold;">{{ shopListdata.platformPrice * value2 }}</text>
							<text style="color: #FF5600;font-size: 22rpx;margin-right:8rpx">元</text>
							<text style="color: #888888;font-size: 22rpx;">含运费</text>
						</view>

						<button class="tui-pay2-flex" @tap="buyNow(shopListdata.id)">结算</button>
					</view>
				</view>
			</block>
		</wyb-popup>
		<view class="warp" v-if="modaishow">
			<view class="warp-view">
				<view class="warp-text1">温馨提示</view>
				<view class="warp-text">请先登录</view>
				<view class="warp-flex">
					<button @click="messcancel()" plain="true">取消</button>
					<button plain="true" open-type="getUserInfo" @getuserinfo="getUserInfo" class="color-green">登录</button>
				</view>
			</view>
		</view>
		<view class="warp" v-if="isVerify">
			<view class="warp-view">
				<view class="warp-text1">温馨提示</view>
				<view class="warp-text">前往验证店铺？</view>
				<view class="warp-flex">
					<button @click="toggleVerify()" plain="true">取消</button>
					<button plain="true" @click="clickToVerify" class="color-green">前往</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		listing,
		publicing,
		publicing2
	} from '../../api/api.js';
	//请求地址
	import {
		postdelist,
		getIndex,
		getClassify,
		postmyOrder,
		postLike,
		postPraise,
		loginis,
		postSettle,
		getClient
	} from '../../api/request.js';

	var setdata = uni.getStorageSync('usermen');
	var {
		log
	} = console;
	export default {
		data() {
			return {
				ApproveStatus: 0, //店铺认证状态
				isLogin: false,
				current: 0, //星星
				modaishow: false,
				isVerify: false,
				saveLike: true, //已收藏
				praLike: true, //已点赞
				ordrIng: true, //已加进货
				value2: 1,
				valueNum: 0,
				shopListdata: {}, //商品详细
				labelList: [], //标签
				currentTab: 0,
				pageIndex: 1,
				tabs: [{
						name: '水果介绍'
					},
					{
						name: '购买须知'
					}
				],
				productName: '',
				height: 94, //header高度
				top: 50, //标题图标距离顶部距离
				scrollH: 0, //滚动总高度
				opcity: 1,
				iconOpcity: 0.5,
				urlList: [],
				url: 'http://192.168.1.10:8980',
				// url:'http://120.25.195.214:8980/js',
				posters: 'https://www.thorui.cn/img/product/4.png', //视频封面
				//videos:'https://6e6f-normal-env-ta6pc-1300924598.tcb.qcloud.la/video-swiper/1589851354869410.mp4?sign=1f636557effa496e074332e3f4b9b8aa&t=1589851461',
				bannerIndex: 0,
				userInfoData: {}, //物流信息
				topMenu: [{
						icon: 'message',
						text: '消息',
						size: 26,
						badge: 3
					},
					{
						icon: 'home',
						text: '首页',
						size: 23,
						badge: 0
					},
					{
						icon: 'people',
						text: '我的',
						size: 26,
						badge: 0
					},
					{
						icon: 'cart',
						text: '购物车',
						size: 23,
						badge: 2
					},
					{
						icon: 'kefu',
						text: '客服小蜜',
						size: 26,
						badge: 0
					},
					{
						icon: 'feedback',
						text: '我要反馈',
						size: 23,
						badge: 0
					},
					{
						icon: 'share',
						text: '分享',
						size: 26,
						badge: 0
					}
				],
				productID: 0,
				menuShow: false,
				popupShow: false,
				value: 1,
				collected: false,
				Sumify: '',
				token: '',
				navHeight: 64,
				iconTop: 24,
				tabsTop: 64,
				canPraise: true,
				netStatus: true,
				nowTime: '2020-10-20'
			};
		},
		onLoad(options) {
			// 导航栏高度 = 状态栏高度 + 胶囊高度 + 胶囊上下边距
			let that = this
			try {
				const res = uni.getSystemInfoSync();
				let {
					statusBarHeight
				} = res
				uni.getNetworkType({
					success: function(res) {
						console.log(res.networkType);
						if (res.networkType === 'wifi') {
							that.netStatus = true
						}
						if (res.networkType !== 'wifi') {
							that.netStatus = false
							setTimeout(function() {
								that.netStatus = true
							}, 3000)
						}
					}
				});
				uni.onNetworkStatusChange(function(res) {
					console.log(res.isConnected);
					console.log(res.networkType);
					if (res.isConnected && res.networkType !== 'wifi') {
						that.netStatus = false
						setTimeout(function() {
							that.netStatus = true
						}, 3000)
					}
					if (res.isConnected && res.networkType === 'wifi') {
						that.netStatus = true
					}
				});
				// #ifndef H5 || APP-PLUS || MP-ALIPAY
				let info = uni.getMenuButtonBoundingClientRect()
				let {
					top,
					bottom
				} = info
				let buttonHeight = (bottom - statusBarHeight) + (top - statusBarHeight)
				that.navHeight = statusBarHeight + buttonHeight + top - statusBarHeight
				that.iconTop = statusBarHeight + (top - statusBarHeight)
				that.tabsTop = statusBarHeight + buttonHeight + top - statusBarHeight
				console.log(that.navHeight, buttonHeight)
				// #endif


			} catch (err) {
				console.log(err)
			}
			// this.getHomelist()
			let setdata = uni.getStorageSync('usermen');
			this.token = setdata;
			this.productID = options.id;
			this.postDetails();
			this.postSettle();
			this.getMerchants();
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			my.hideAddToDesktopMenu();
			// #endif
			// 	setTimeout(() => {
			// 		uni.getSystemInfo({
			// 			success: res => {
			// 				this.width = obj.left || res.windowWidth;
			// 				this.height = obj.top ? obj.top + obj.height + 8 : res.statusBarHeight + 44;
			// 				this.top = obj.top ? obj.top + (obj.height - 32) / 2 : res.statusBarHeight + 6;
			// 				this.scrollH = res.windowWidth;
			// 			}
			// 		});
			// 	}, 0);
			// 
		},
		computed: {
			swiperList() {
				let vList = this.shopListdata
				let uList = this.urlList
				if (vList && vList.urlVideo !== '') {
					uList.unshift(vList.urlVideo)
					// console.log("uList", "you", uList, uList.length, )
					return uList
				} else {
					// console.log("uList", "meiyou", uList, uList.length)
					return uList
				}
			},
			payTime() {
				let time = new Date().getHours()
				return time
			},


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
			},
			deliverTime(val) {
				let res = val.split("")
				let data = res.splice(5, 5)
				let time = new Date().getHours()
				let result = ''
				if (time <= 16) {
					result = data[0] + data[1] + "月" + data[3] + data[4] + "日"
				} else {
					result = data[0] + data[1] + "月" + data[3] + (data[4] * 1 + 1) + "日"
				}
				return result
			}
		},

		methods: {
			clickLink(e) {
				console.log(e)
			},
			//购买前获取申请店铺状态信息
			getMerchants() {
				let data = {
					token: setdata
				};
				listing(getClient, data)
					.then(res => {
						// log(res);
						///登录成功后显示去认证店铺，如果已认证，显示已认证店铺
						this.ApproveStatus = res.data.data.approveStatus; //获取状态码，0未认证，1已认证，2拒绝

						// log(this.ApproveStatus);
					})
					.catch(err => {
						log(err);
					});
			},

			//物流配送
			postSettle() {
				let setdata = uni.getStorageSync('usermen');
				let data = {
					id: this.productID,
					token: setdata
				};
				publicing(postSettle, data)
					.then(res => {
						// log(res);
						this.userInfoData = res.data.data.extraData.userInfo;
					})
					.catch(err => {
						log(err);
					});
			},
			//结算，立即购买
			buyNow(id) {
				let setdata = uni.getStorageSync('usermen');
				if (!setdata) {
					this.modaishow = true;
				} else {
					// this.modaishow = false
					this.modaishow = false;
					let data = {
						goodsId: id,
						token: setdata,
						number: this.value2,
						type: 'nowGoods'
					};
					publicing(postmyOrder, data)
						.then(res => {
							// log(res);
							let ids = res.data.data;
							let code = res.data.code;
							if (code == -1) {
								uni.showToast({
									title: `${res.data.msg}`,
									icon: 'none',
									duration: 2000
								});
								uni.hideLoading();
								return;
							} else if (code == 200) {
								uni.showToast({
									title: `${res.data.msg}`,
									icon: 'none',
									duration: 2000
								});
								uni.navigateTo({
									url: '../../pagesIII/submitOrder/submitOrder?ids=' + ids
								});
							}
						})
						.catch(err => {
							log(err);
						});
				}
			},
			//重复点赞
			praiseLikeTwo() {
				uni.showToast({
					title: '重复点赞',
					icon: 'none'
				});
			},

			//点赞
			praiseLike(id) {
				let setdata = uni.getStorageSync('usermen');
				if (!setdata) {
					this.modaishow = true;
				} else {
					this.modaishow = false;
					let data = {
						goodsId: id,
						token: setdata
					};
					if (this.shopListdata.isPraise == true) {
						uni.showToast({
							title: '重复点赞',
							icon: 'none'
						});
						return;
					}
					if (this.canPraise === true) {
						uni.showToast({
							title: '重复点赞',
							icon: 'none'
						});
						return;
					}
					if (this.shopListdata.isPraise === false) {
						this.canPraise = true
						publicing(postPraise, data)
							.then(res => {
								log(res);
								// this.postDetails();
								this.shopListdata.praiseNumber++
								uni.showToast({
									title: '点赞成功',
									icon: 'none'
								});
							})
							.catch(err => {
								log(err);
							});
					}
				}
			},
			change2: function(e) {
				this.value2 = e.value;
			},

			// 显示
			init() {
				this.modaishow = true;
			},
			// 取消
			messcancel() {
				this.modaishow = false;
			},
			//弹出立即购买
			showPopup() {
				let setdata = uni.getStorageSync('usermen');
				if (!setdata) {
					this.modaishow = true;
					return
				} else if (this.ApproveStatus != 1) {
					// uni.showToast({
					// 	title: '您还没有验证店铺',
					// 	icon: 'none'
					// });
					// return;
					this.toggleVerify()
					return
				}
				if (setdata && this.ApproveStatus === 1) {
					this.$refs.popup.show();
				}
			},

			toggleVerify() {
				this.isVerify = !this.isVerify
			},
			clickToVerify() {
				uni.navigateTo({
					url: '../../pagesII/tendShop/tendShop'
				})
				this.toggleVerify()
				console.log("前往验证")
			},

			//获取微信昵称
			getUserInfo(event) {
				// log(event);
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
						// log(res);
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
				uni.showLoading({});
				// log(code);
				let data = {
					code
				};
				publicing2(loginis, data) //发送请求携带参数
					.then(res => {
						uni.setStorageSync('usermen', res.data.token); //把token存在本地，小程序提供如同浏览器cookie
						var setdata = uni.getStorageSync('usermen');
						uni.showToast({
							title: '登陆成功'
						});
						this.getMerchants();
						uni.hideLoading();
					})
					.catch(err => {
						log(err);
					});
			},
			//收藏订单
			likeOrder(id) {
				let setdata = uni.getStorageSync('usermen');
				//判断是否登录才能收藏
				if (!setdata) {
					this.modaishow = true;
				} else {
					this.modaishow = false;

					let data = {
						goodsId: id,
						token: setdata
					};
					if (this.shopListdata.isCollection == true) {
						uni.showToast({
							title: '重复收藏',
							icon: 'none'
						});
						return;
					} else if (this.shopListdata.isCollection == false) {
						publicing(postLike, data)
							.then(res => {
								this.postDetails();
								uni.showToast({
									title: '收藏成功',
									icon: 'none'
								});
							})
							.catch(err => {
								log(err);
							});
					}
				}
			},
			//请求商品详情

			postDetails() {
				uni.showLoading({
					title: '加载中'
				});
				let data = {
					id: this.productID,
					token: setdata
				};
				// 批量并发请求多个接口，Promise.all =>可以并发请求多个接口。并且同时得到多个接口的数据
				//这个方法是异步执行的，值还没有赋值，后就先执行了postAct这个，异步，同步，
				publicing(postdelist, data)
					.then(res => {
						console.log("res123", res);
						this.shopListdata = res.data.data;
						this.labelList = res.data.data.labelList;
						this.urlList = res.data.data.urlList;
						this.canPraise = res.data.data.isPraise
						// console.log(this.labelList);
					})
					.catch(err => {
						console.log(err);
					});
				uni.hideLoading();
			},
			//立即购买/加进货单
			postShopping(id) {
				let setdata = uni.getStorageSync('usermen');
				if (!setdata) {
					this.modaishow = true;
				} else {
					// this.modaishow = false
					this.modaishow = false;

					let data = {
						goodsId: id,
						token: setdata,
						number: 1
					};
					if (this.shopListdata.isCart == true) {
						uni.showToast({
							title: '重复加入进货单',
							icon: 'none',
							duration: 3000
						});
						return;
					} else if (this.shopListdata.isCart == false) {
						publicing(postmyOrder, data)
							.then(res => {
								let code = res.data.code;
								if (code == -1) {
									uni.showToast({
										title: `${res.data.msg}`,
										icon: 'none',
										duration: 3000
									});
								} else if (code == 200) {
									this.postDetails();
									uni.showToast({
										title: '加入进货单成功',
										icon: 'none',
										duration: 3000
									});
								}
							})
							.catch(err => {
								log(err);
							});
					}
				}
			},

			bannerChange(e) {
				this.bannerIndex = e.detail.current;
			},

			//轮播图点击事件 @tap.stop="previewImage"
			previewImage(e) {
				let index = e.currentTarget.dataset.index;
				uni.previewImage({
					current: this.banner[index],
					urls: this.banner
				});
			},
			back: function() {
				uni.navigateBack();
			},
			openMenu: function() {
				// this.menuShow = true;
				uni.switchTab({
					url: '../../pages/index/index'
				});
			},
			closeMenu: function() {
				this.menuShow = false;
			},

			hidePopup: function() {
				this.popupShow = false;
			},
			// change: function(e) {
			// 	this.value = e.value;
			// },
			collecting: function() {
				this.collected = !this.collected;
			},
			common: function() {
				this.tui.toast('功能开发中~');
			},
			btnTopMenu(index) {
				this.closeMenu();
				if (index == 4) {
					uni.makePhoneCall({
						phoneNumber: '10086'
					});
				} else if (index == 6) {
					// #ifdef MP
					this.common();
					// #endif

					// #ifndef MP
					this.onShare();
					// #endif
				} else {
					let url = {
						0: '../message/message',
						1: '../mall/mall',
						2: '../my/my',
						3: '../shopcart/shopcart',
						5: '/pages/my/feedback/feedback?page=mall'
					} [index];
					url && this.tui.href(url);
				}
			},
			changeNum(e) {
				this.currentTab = e.index;
				// console.log(this.currentTab);
			},
			submit() {
				this.popupShow = false;
				uni.navigateTo({
					url: '../submitOrder/submitOrder'
				});
			},
			coupon() {
				uni.navigateTo({
					url: '../coupon/coupon'
				});
			},
			onShare() {
				//#ifdef APP-PLUS
				plus.share.sendWithSystem({
						content: '',
						href: 'https://www.thorui.cn/'
					},
					function() {},
					function(e) {
						console.log('分享失败：' + JSON.stringify(e));
					}
				);
				//#endif
				// #ifdef H5
				location.href = 'https://www.thorui.cn/';
				// #endif
			}
		},
		onPageScroll(e) {
			// let scroll = e.scrollTop <= 0 ? 0 : e.scrollTop;
			// let opcity = scroll / this.scrollH;
			// if (this.opcity >= 1 && opcity >= 1) {
			// 	return;
			// }
			// this.opcity = opcity;
			// this.iconOpcity = 0.5 * (1 - opcity < 0 ? 0 : 1 - opcity);
		}
	};
</script>

<style>
	page {
		background-color: #fff;
	}

	[v-cloak] {
		display: none;
	}

	/* 弹层 */
	.tui-list-title {
		position: relative;
		height: 100rpx;
		width: 100%;
		text-align: center;
		padding-top: 20rpx;
	}

	.border-green {}

	.borderBottom {
		width: 280rpx;
		height: 10rpx;
		background-color: rgba(0, 197, 42, 0.5);
		position: absolute;
		right: 33%;
		top: 60rpx;
		border-radius: 20rpx;
	}

	/* 弹出列表 */
	.tui-rank-list {
		padding: 0 30rpx;
	}

	.tui-tab-rank {
		margin: 10rpx 0 0;
		border-bottom: 1rpx solid rgba(245, 245, 245, 1);
	}

	.tui-tab-rank-cent {
		display: flex;
		padding: 20rpx 0 0;
	}

	.img-rink {
		width: 220rpx;
		height: 220rpx;
		display: block;
		margin-right: 10rpx;
		background: #eee;
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
		font-size: 24rpx;
	}

	.tag-tit-text {
		font-size: 28rpx;
		color: #333;
	}

	.tag-tit2 {
		display: flex;
		justify-content: space-between;
	}

	.tag-tit2-price {
		color: rgba(85, 85, 85, 1);
		font-size: 24rpx;
	}

	.list-desc {
		background: rgba(255, 119, 9, 0.1);
		border: 1px solid #ff7709;
		color: #ff7709;
		min-width: 160rpx;
		text-align: center;
		font-size: 24rpx;
		padding: 10rpx 0;
		border-radius: 6rpx;
		margin: 10rpx 0;
	}

	.tag-tit2-num {
		display: flex;
		justify-content: start;
		color: rgba(182, 182, 182, 1);
	}

	.shabi {
		font-size: 24rpx;
		font-size: 12px;
		display: flex;
		align-items: baseline;
	}

	.tag-tit3-flex {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0;
		align-items: center;
	}

	.tag-tit3-flex .tag-tit2-price {
		font-size: 26rpx;
	}

	.tag-tit2-text {
		color: rgba(255, 86, 0, 1);
		font-size: 24rpx;
	}

	.tui-pay-flex-box {
		display: flex;
		justify-content: center;
		width: 100%;
		position: fixed;
		bottom: 20rpx;
	}

	.tui-pay-flex {
		display: flex;
		justify-content: space-between;
		width: 690rpx;
		align-items: center;
	}

	.tui-pay1-flex {
		text-align: center;
		border-radius: 80rpx 0 0 80rpx;
		line-height: 100rpx;
		width: 60%;
		height: 100rpx;
		background-color: rgba(228, 228, 228, 1);
		font-size: 32rpx;
		color: #ff5600;
		display: flex;
		align-items: baseline;
		justify-content: center;

	}

	.tui-pay2-flex {
		text-align: center;
		border-radius: 0 80rpx 80rpx 0;
		color: #fff;
		line-height: 100rpx;
		width: 40%;
		height: 100rpx;
		background: #00ac3f;
		background-color: rgba(0, 197, 42, 1);
	}

	.tui-shop-car {
		width: 80rpx;
		height: 80rpx;
		display: block;
	}

	/* end */

	.container {
		padding-bottom: 110rpx;
	}

	/* 显示隐藏 */
	.actineclass {
		display: block;
	}

	.errorclass {
		display: none;
	}

	.tui-header-box {
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 995;
	}

	.tui-header {
		width: 100%;
		font-size: 18px;
		line-height: 18px;
		font-weight: 500;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-header-icon {
		position: fixed;
		top: 0;
		left: 10px;
		display: flex;
		align-items: center;
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

	.tui-icon-box {
		position: relative;
		height: 64rpx !important;
		width: 64rpx !important;
		padding: 6px !important;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.box-line::after {
		content: '';
		position: absolute;
		top: 30rpx;
		right: 0;
		width: 2rpx;
		height: 30rpx;
		background: #d8d8d8;
	}

	.tui-banner-swiper {
		position: relative;
		padding-top: 220rpx;
	}

	.tui-banner-tag {
		position: absolute;
		color: #fff;
		bottom: 70rpx;
		right: 40rpx;
		background: #b6b6b6;
		font-size: 32rpx;
		padding: 4rpx 0;
		border-radius: 40rpx;
		width: 100rpx;
		text-align: center;
	}

	.net-tip {
		color: #fff;
		position: absolute;
		/* left: 16rpx; */
		bottom: 30%;
		background: rgba(0, 0, 0, .5);
		font-size: 28rpx;
		padding: 20rpx;
		-webkit-border-radius: 14rpx;
		border-radius: 14rpx;
		text-align: center;
		width: 70%;
		margin: 0 15%;

	}

	.tui-slide-image {
		width: 100%;
		display: block;
		height: 520rpx !important;
	}

	/*顶部菜单*/

	.tui-menu-box {
		box-sizing: border-box;
	}

	.tui-menu-header {
		font-size: 34rpx;
		color: #fff;
		height: 32px;
		display: flex;
		align-items: center;
	}

	.tui-menu-itembox {
		color: #fff;
		padding: 40rpx 10rpx 0 10rpx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		font-size: 26rpx;
	}

	.tui-menu-item {
		width: 22%;
		height: 160rpx;
		border-radius: 24rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		background: rgba(0, 0, 0, 0.4);
		margin-right: 4%;
		margin-bottom: 4%;
	}

	.tui-menu-item:nth-of-type(4n) {
		margin-right: 0;
	}

	.tui-badge-box {
		position: relative;
	}

	.tui-badge-box .tui-badge-class {
		position: absolute;
		top: -8px;
		right: -8px;
	}

	.tui-msg-badge {
		top: -10px;
	}

	.tui-icon-up_box {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-menu-text {
		padding-top: 12rpx;
	}

	.tui-opcity .tui-menu-text,
	.tui-opcity .tui-badge-box {
		opacity: 0.5;
		transition: opacity 0.2s ease-in-out;
	}

	/*顶部菜单*/

	/*内容 部分*/

	.tui-padding {
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.tui-ml-auto {
		margin-left: auto;
	}

	/* #ifdef H5 */
	.tui-ptop {
		padding-top: 44px;
	}

	/* #endif */

	.tui-size {
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-huaxian {
		text-decoration: line-through;
		font-size: 24rpx;
		margin: 0 10rpx;
	}

	.tui-magin {
		margin: 10rpx 0;
		display: flex;
		flex-wrap: nowrap;
		align-items: baseline;
	}

	.tui-text-overflow {
		/* width: 460rpx; */
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.tui-code {
		color: rgba(255, 101, 0, 1);
		font-size: 20rpx;
	}

	.tui-price-one {
		font-size: 40rpx;
		font-weight: bold;
		color: rgba(255, 101, 0, 1);
	}

	.tui-gray {
		color: #999;
	}

	.tui-icon-red {
		color: #ff201f;
	}

	.tui-border-radius {
		overflow: hidden;
	}

	.tui-radius-all {
		overflow: hidden;
	}

	.tui-mtop {
		margin-top: 26rpx;
	}

	.tui-pro-detail {
		box-sizing: border-box;
		color: #333;
	}

	.tui-product-title {
		background: #fff;
		padding: 30rpx 0;
		border-bottom: 20rpx solid #f5f5f5
	}

	/* 2020/8/29 */
	.tui-height-full {
		background-color: #fff;
		padding: 24rpx 30rpx;
		border-bottom: 20rpx solid #f5f5f5;
	}

	.shuoming {
		line-height: 60rpx;
		font-size: 28rpx;
		padding: 20rpx 10rpx;
	}

	.shuoming text {
		color: #00bc45;
		font-weight: bold;
	}

	.tui-title-line {
		color: rgba(51, 51, 51, 1);
		font-weight: 400;
		font-size: 36rpx;
		padding-bottom: 14rpx;
		/* border-bottom: 1px solid #f5f5f5; */
	}

	.tui-height-flex {
		display: flex;
	}

	.deliver-info {
		font-size: 28rpx;
		padding: 20rpx 0;
		color: #333;
	}

	.deliver-info text {
		margin-right: 20rpx;
	}

	.tui-height-flex-top {
		margin: 28rpx 0;
		display: flex;
		justify-content: space-between;
	}

	.tui-bottom-border {
		border-bottom: 1rpx solid rgba(245, 245, 245, 1);
		padding-bottom: 10rpx;
		color: rgba(51, 51, 51, 1);
	}

	.pay-time {
		padding-top: 30rpx;
	}

	.tui-pay-color {
		color: rgba(146, 147, 151, 1);
		font-size: 27rpx;
	}

	.tui-height-flex-two {
		display: flex;
		height: 80rpx;
		line-height: 80rpx;
	}

	.tui-border-1px {
		border-top: 1px solid rgba(244, 245, 247, 1);
		border-left: 1px solid rgba(244, 245, 247, 1);
		border-right: 1px solid rgba(244, 245, 247, 1);
	}

	.heigth-tui {
		background-color: #fff;
		border-radius: 50rpx;
		height: 518rpx;
	}

	.text-indent {
		text-indent: 2em;
		letter-spacing: 4rpx;
	}

	.line-higth-cent {
		color: rgba(112, 112, 112, 1);
		font-size: 24rpx;
		line-height: 50rpx;
		padding: 53rpx;
		font-weight: 500;
	}

	.tui-border-1px:last-child {
		border-bottom: 1px solid rgba(244, 245, 247, 1);
	}

	.tui-magin-cente {
		text-align: center;
		font-size: 40rpx;
		font-weight: 800;
		color: #fff;
		margin-bottom: 20rpx;
	}

	.tui-left-one {
		display: flex;
		justify-content: space-between;
		padding-right: 10rpx;
		flex: 4;
		border-right: 1px solid rgba(244, 245, 247, 1);
	}

	.tui-left-one1 {
		flex: 4;
		display: flex;

	}

	.tui-left-one2 {
		flex: 4;
		border-right: 1px solid rgba(244, 245, 247, 1);
	}

	.tui-title-class {
		font-size: 24rpx;
		color: rgba(146, 147, 151, 1);
		min-width: 100rpx;
		display: inline-block;

	}

	.tui-name-class {
		font-size: 32rpx;
		color: rgba(51, 51, 51, 1);
	}

	.icon-quan {
		margin-right: 10rpx;
		color: rgba(0, 197, 42, 1);
		font-size: 20rpx;
	}

	.tui-text-left {
		margin-left: 40rpx;
	}

	.tui-right-one {
		flex: 3;
	}

	.tui-page-box {
		padding: 0 50rpx;
	}

	.tui-flex-one {
		display: flex;
		justify-content: start;
	}

	.tui-magin-riht {
		margin-left: 50rpx;
	}

	.tui-pro-tit {
		padding: 0 30rpx;
		color: rgba(51, 51, 51, 1);
		font-size: 32rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tag-tit {
		/* 渐变色 */
		background-image: linear-gradient(to right, #00c94a, #00ac3f);
		margin-right: 10rpx;
		padding: 0 10rpx;
		border-radius: 15rpx 0 15rpx 0;
		color: #fff;
		font-size: 24rpx;
	}

	.tag-tit-text {
		position: relative;
		font-size: 32rpx;
		color: #333;
		font-weight: 400;
	}

	.tag-tit-pra {
		position: absolute;
		right: 0;
		background-color: rgba(244, 244, 244, 1);
		padding: 5rpx 20rpx 5rpx 20rpx;
		border-radius: 10px 0 0 10px;
		color: rgba(182, 182, 182, 1);
		font-size: 24rpx;
	}

	.tui-pro-pricebox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #ff201f;
		font-size: 36rpx;
		font-weight: bold;
		line-height: 44rpx;
	}

	.tui-pro-price {
		display: flex;
		align-items: center;
	}

	.tui-price {
		font-size: 58rpx;
	}

	.tui-original-price {
		font-size: 28rpx;
		line-height: 28rpx;
		padding: 10rpx 0rpx 10rpx 30rpx;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		margin-top: 8rpx;
		width: 80%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;

	}

	.tui-line-through {
		text-decoration: line-through;
	}

	.tui-collection {
		color: #333;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		height: 44rpx;
	}

	.tui-scale-collection {
		transform: scale(0.7);
		transform-origin: center 90%;
		line-height: 24rpx;
		font-weight: normal;
		margin-top: 4rpx;
	}

	.tui-pro-titbox {
		font-size: 32rpx;
		font-weight: 500;
		position: relative;
		padding: 0 150rpx 0 30rpx;
		box-sizing: border-box;
	}

	.tui-pro-title {
		padding-top: 20rpx;
	}

	.tui-pro-title-tag {
		background-color: rgba(245, 245, 245, 1);
		color: rgba(255, 101, 0, 1);
		border-radius: 10px;
		margin: 0 10rpx;
		font-size: 24rpx;
		padding: 5rpx 20rpx;
	}

	.tui-share-btn {
		display: block;
		background: transparent;
		margin: 0;
		padding: 0;
		border-radius: 0;
		border: 0;
	}

	.tui-share-btn::after {
		border: 0;
	}

	.tui-share-box {
		display: flex;
		align-items: center;
	}

	.tui-share-position {
		position: absolute;
		right: 0;
		top: 30rpx;
	}

	.tui-share-text {
		padding-left: 8rpx;
	}

	.tui-sub-title {
		padding: 20rpx 0;
		line-height: 32rpx;
	}

	.tui-sale-info {
		display: flex;
		align-items: baseline;
		/* justify-content: space-between; */
		padding-top: 30rpx;
	}

	.tui-discount-box {
		background: #fff;
		padding: 0 30rpx;
	}

	.tui-list-cell {
		display: flex;
		justify-content: space-around;
	}

	.tui-right {
		position: absolute;
		right: 30rpx;
		top: 30rpx;
	}

	.tui-top40 {
		top: 40rpx !important;
	}

	.tui-bold {
		font-weight: bold;
	}

	.tui-list-cell::after {
		content: '';
		position: absolute;
		border-bottom: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 126rpx;
	}

	.tui-last::after {
		border-bottom: 0 !important;
	}

	.tui-flex-center {
		display: flex;
		align-items: center;
	}

	.tui-cell-title {
		width: 66rpx;
		padding-right: 30rpx;
		flex-shrink: 0;
	}

	.tui-promotion-box {
		display: flex;
		align-items: center;
		padding: 10rpx 0;
		width: 80%;
	}

	.tui-promotion-box text {
		width: 70%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-basic-info {
		background: #fff;
	}

	.tui-addr-box {
		width: 76%;
	}

	.tui-addr-item {
		padding: 10rpx;
		line-height: 34rpx;
	}

	.tui-guarantee {
		background: #fdfdfd;
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx 30rpx 30rpx 30rpx;
		font-size: 24rpx;
	}

	.tui-guarantee-item {
		color: #999;
		padding-right: 30rpx;
		padding-top: 10rpx;
	}

	.tui-pl {
		padding-left: 4rpx;
	}

	.tui-cmt-box {
		background: #fff;
	}

	.tui-between {
		justify-content: space-between !important;
	}

	.tui-cmt-all {
		color: #ff201f;
		padding-right: 8rpx;
	}

	.tui-cmt-content {
		font-size: 26rpx;
	}

	.tui-cmt-user {
		display: flex;
		align-items: center;
	}

	.tui-acatar {
		width: 60rpx;
		height: 60rpx;
		border-radius: 30rpx;
		display: block;
		margin-right: 16rpx;
	}

	.tui-cmt {
		padding: 14rpx 0;
	}

	.tui-attr {
		font-size: 24rpx;
		color: #999;
		padding: 6rpx 0;
	}

	.tui-cmt-btn {
		padding: 50rpx 0 30rpx 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-nomore-box {
		padding-top: 10rpx;
	}

	.tui-product-img {
		display: flex;
		flex-direction: column;
		transform: translateZ(0);
		padding: 20rpx;
	}

	.tui-product-img image {
		width: 100%;
		display: block;
	}

	/*底部操作栏*/

	.tui-col-7 {
		width: 58.33333333%;
	}

	.tui-col-5 {
		width: 41.66666667%;
	}

	.tui-operation {
		width: 100%;
		height: 100rpx;
		background: rgba(255, 255, 255, 0.98);
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 10;
		bottom: 0;
		left: 0;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}

	.tui-operation::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		border-top: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.tui-operation-left {
		display: flex;
		align-items: center;
	}

	.tui-operation-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
	}

	.tui-operation-text {
		font-size: 22rpx;
		color: #333;
	}

	.tui-opacity {
		opacity: 0.5;
	}

	.tui-scale-small {
		transform: scale(0.9);
		transform-origin: center center;
	}

	.tui-operation-right {
		height: 100rpx;
		padding-top: 0;
	}

	.tui-right-flex {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-flex-1 {
		/* flex: 1; */
		width: 280rpx;
		padding: 16rpx;
	}

	/*底部操作栏*/

	/*底部选择弹层*/

	.tui-popup-class {
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-popup-box {
		position: relative;
		padding: 30rpx 0 100rpx 0;
	}

	.tui-popup-btn {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	/* .tui-popup-btn .tui-btn-class {
		width: 90% !important;
		display: block !important;
		font-size: 28rpx !important;
	} */

	/* .tui-icon-close {
		position: absolute;
		top: 30rpx;
		right: 30rpx;
	} */

	.tui-product-box {
		display: flex;
		align-items: flex-end;
		font-size: 24rpx;
		padding-bottom: 30rpx;
	}

	.tui-popup-img {
		height: 200rpx;
		width: 200rpx;
		border-radius: 24rpx;
		display: block;
	}

	.tui-popup-price {
		padding-left: 20rpx;
		padding-bottom: 8rpx;
	}

	.tui-amount {
		color: #ff201f;
		font-size: 36rpx;
	}

	.tui-number {
		font-size: 24rpx;
		line-height: 24rpx;
		padding-top: 12rpx;
		color: #999;
	}

	.tui-popup-scroll {
		height: 600rpx;
		font-size: 26rpx;
	}

	.tui-scrollview-box {
		padding: 0 30rpx 60rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-attr-title {
		padding: 10rpx 0;
		color: #333;
	}

	.tui-attr-box {
		font-size: 0;
		padding: 20rpx 0;
	}

	.tui-attr-item {
		max-width: 100%;
		min-width: 200rpx;
		height: 64rpx;
		display: -webkit-inline-flex;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: #f7f7f7;
		padding: 0 26rpx;
		box-sizing: border-box;
		border-radius: 32rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		font-size: 26rpx;
	}

	.tui-attr-active {
		background: #fcedea !important;
		color: #e41f19;
		font-weight: bold;
		position: relative;
	}

	.tui-attr-active::after {
		content: '';
		position: absolute;
		border: 1rpx solid #e41f19;
		width: 100%;
		height: 100%;
		border-radius: 40rpx;
		left: 0;
		top: 0;
	}

	.tui-number-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0 30rpx 0;
		box-sizing: border-box;
	}

	/*底部选择弹层*/

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
