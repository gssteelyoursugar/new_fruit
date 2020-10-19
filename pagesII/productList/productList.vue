<template>
	<view class="container">
		<!--header-->
		<view class="container-img" v-if="goods.length == 0">
			<image src="../../static/images/orderBMG.png" mode="widthFix"></image>
			<text class="color-text">当前水果没有货，再看看别的吧</text>
		</view>
		<view class="tui-header-box" :style="{paddingTop: statusHeight+ 'px',height: boxHeight+ 'px'}">
			<view class="tui-icon-box" @tap="back">
				<tui-icon name="arrowleft" :size="30" color="#333"></tui-icon>
			</view>
			<view class="tui-header">找水果</view>
			<!-- <view class="tui-searchbox tui-search-mr" :style="{ marginTop: inputTop + 'px' }" @tap="search">
				<icon type="search" :size="13" color="#999"></icon>
				<text class="tui-search-text" v-if="!searchKey">搜索圈果商品</text>
				<view class="tui-search-key" v-if="searchKey">
					<view class="tui-key-text">{{ searchKey }}</view>
					<tui-icon name="shut" :size="12" color="#fff"></tui-icon>
				</view>
			</view> -->
		</view>


		<!--header-->

		<!-- 搜索框 -->
		<view class="search-bar" @click="goToSearchGoods" :style="{top: navHeight+ 'px'}">
			<image src="../../static/images/search-icon.png" mode=""></image>
			<view class="search-text">搜索您要购买的商品或类型</view>
		</view>
		<!-- 搜索框 -->
		<!--顶部筛选-->
		<view class="tui-header-screen" :style="{ top: height + 'px' }">
			<view class="tui-screen-top">
				<!-- 综合筛选 -->
				<block v-for="(item,index) in seleTopList" :key="index">
					<view class="tui-top-item tui-icon-ml" :class="[index == num ? 'tui-active tui-bold' : '']" @tap="Total(index)"
					 data-index=" ">
						<view>{{item.name}}</view>
						<text class="iconfont icon-shangxiajiantou" :color="index == num ? '#00BC45' : '#444' " v-if="index == 1 || index == 2"></text>
					</view>
				</block>
				<!--下拉选择列表综合-->
			</view>
			<view class="tui-screen-bottom">
				<!-- 品种筛选 -->
				<!-- <block v-for="(item, index) in seleBottom" :key="index">
					<view class="tui-bottom-item tui-icon-ml" :class="[index == dropNum ? 'tui-active-bottom tui-bold' : '']" @tap="btnDropChange(index)">
						<view class="tui-bottom-text" >{{item.name}}</view>
						<text class="iconfont icon-xiajiantou" :color="index == dropNum ? '#00BC45' : '#444' "  v-if="index == 0 || index == 1 || index == 2"></text>
					</view>
				</block> -->
				<view class="tui-bottom-item tui-icon-ml" @tap="btnDropChange(slMangguo)" :class="{ activeNull: isActives1 }">
					<view class="tui-bottom-text">{{slMangguo}}</view>
					<text class="iconfont icon-xiajiantou"></text>
				</view>
				<view class="tui-bottom-item tui-icon-ml" @tap="btnDropChange2(slPinzhong)" :class="{ activeNull: isActives2 }">
					<view class="tui-bottom-text">{{slPinzhong}}</view>
					<text class="iconfont icon-xiajiantou"></text>
				</view>
				<view class="tui-bottom-item tui-icon-ml" @tap="btnDropChange3(slGuobiao)">
					<view class="tui-bottom-text">{{slGuobiao}}</view>
					<text class="iconfont icon-xiajiantou"></text>
				</view>
				<view class="tui-bottom-item tui-icon-ml">
					<!-- @tap="btnDropChange(slYanzheng)" -->
					<view class="tui-bottom-text">{{slYanzheng}}</view>
					<!-- <text class="iconfont icon-xiajiantou"></text> -->
				</view>

			</view>
		</view>
		<!--screen-->

		<!--商品列表list-->
		<view class="tui-product-list" :style="{ marginTop: px(dropScreenH + 18) }">
			<view class="tui-product-container">
				<block v-for="(item, index) in goods" :key="index" v-if="(index + 1) % 2 != 0">
					<!-- <template is="productItem" data="{{item,index:index,isList:isList}}" /> -->
					<!--商品列表1-->
					<view class="tui-pro-item" @tap="gotoList(item.id)">
						<image :src="item.url" class="tui-pro-img" mode="widthFix" />
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
										<text class="tag-tit-border">{{itemTwo.name}}</text>
									</block>
								</view>
								<view class="tui-pro-pic">
									<view style="color: #FF7709; display: flex;align-items: baseline;">
										<text style="font-size: 16rpx;">¥</text>
										<text style="font-size: 28rpx; font-weight: 500">{{item.platformPrice}}</text>
										<text style="font-size: 20rpx;color: #B6B6B6;">/件</text>
										<view style="color: #B6B6B6;text-decoration: line-through; margin-left:10rpx;">
											<text style="font-size: 16rpx;"> ¥</text>
											<text style="font-size: 24rpx;font-weight: 500;">{{item.marketPrice}}</text>
										</view>
									</view>
									<text class="tui-praise  ">
										<text class="tui-praise iconfont icon-dianzan "></text>{{item.praiseNumber| filterNum}}
									</text>
								</view>
								<view class="tui-pro-dea">
									<text class="tui-jin">{{item.specification}}</text>
									<text class="tui-jin">成交<text class="tui-dea-color">{{item.totalPirce | filterNum}}</text>元</text>

								</view>
							</view>
						</view>
					</view>
					<!--商品列表1-->
				</block>
			</view>
			<view class="tui-product-container">
				<block v-for="(item, index) in goods" :key="index" v-if="(index + 1) % 2 == 0">
					<!-- <template is="productItem" data="{{item,index:index}}" /> -->
					<!--商品列表2-->
					<view class="tui-pro-item" @tap="gotoList(item.id)">
						<image :src="item.url" class="tui-pro-img" mode="widthFix" />
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
										<text class="tag-tit-border">{{itemTwo.name}}</text>
									</block>
								</view>
								<view class="tui-pro-pic">
									<view style="color: #FF7709; display: flex;align-items: baseline;">
										<text style="font-size: 16rpx;">¥</text>
										<text style="font-size: 28rpx; font-weight: 500">{{item.platformPrice}}</text>
										<text style="font-size: 20rpx;color: #B6B6B6;">/件</text>
										<view style="color: #B6B6B6;text-decoration: line-through;margin-left:10rpx;">
											<text style="font-size: 16rpx;"> ¥</text>
											<text style="font-size: 24rpx;font-weight: 500">{{item.marketPrice}}</text>
										</view>
									</view>
									<text class="tui-praise">
										<text class="tui-praise iconfont icon-dianzan "></text>{{item.praiseNumber | filterNum}}
									</text>
								</view>
								<view class="tui-pro-dea">
									<text class="tui-jin">{{item.specification}}</text>
									<text class="tui-jin">成交<text class="tui-dea-color">{{item.totalPirce | filterNum}}</text>元</text>

								</view>
							</view>
						</view>
					</view>
					<!--商品列表-->
				</block>
			</view>
		</view>

		<!--list-->

		<!--果类弹层 -->
		<tui-top-dropdown backgroundColor="#f7f7f7" :show="dropScreenShow" :paddingbtm="110" :translatey="dropScreenH" @close="btnCloseDrop">
			<scroll-view class="tui-scroll-box" scroll-y :scroll-top="scrollTop">
				<view class="tui-hot-title" style="color: #000000;">
					热门水果
				</view>
				<view class="hot-wrap" style="display: flex; flex-wrap: wrap;">
					<view class="tui-drop-item" :class="{'tui-drop-active': varietyId == item.id}" v-for="(item, index) in species" :key="index"
					 :style="">
						<text class="" :class="{activetext:varietyId == item.id}" @click="checkDing(index,item.id,item.title)">{{ item.title }}</text>
					</view>
					<view class="tui-drop-item ">
						<text class="" @click="checkgeng()">更多></text>
					</view>
				</view>
				<!-- <view class="tui-drop-item "v-for="(item, index) in variety":key="index" >
					<text class="tui-ml tui-middle " :class="{checked: item.isActives}" @click="checkDing2(index,item.title,item.isActives)">{{ item.title }}</text>
				</view> -->
			</scroll-view>
			
		</tui-top-dropdown>
		<!-- 品种 -->
		<tui-top-dropdown backgroundColor="#f7f7f7" :show="dropScreenShow2" :paddingbtm="110" :translatey="dropScreenH"
		 @close="btnCloseDrop">
			<scroll-view class="tui-scroll-box" scroll-y :scroll-top="scrollTop">
				<view class="hot-wrap">
					<view class="tui-drop-item" :class="{'tui-drop-active':idList.indexOf(item.id)!==-1}" v-for="(item,index) of seleVarieties" :key="index">
						<text class="tui-ml tui-middle" :class="{activetext:idList.indexOf(item.id) !==-1 }" @click="checkVariety(index,item.id,item.title)">{{item.title}}</text>
					</view>
				</view>
			</scroll-view>
			<view class="tui-drop-btnbox">
				<view class="tui-drop-btn tui-btn-white" hover-class="tui-white-hover" :hover-stay-time="150" @tap="reset(seleVarieties[0].id)">重置</view>
				<view class="tui-drop-btn tui-btn-red" hover-class="tui-red-hover" :hover-stay-time="150" @click="getTypeData">确定</view>
			</view>
		</tui-top-dropdown>
		<!---顶部下拉筛选弹层 属性-->
		<!--左抽屉弹层 筛选 -->
		<tui-drawer mode="right" :visible="drawer" @close="closeDrawer">
			<view class="tui-drawer-box" :style="{ paddingTop: height + 'px' }">
				<scroll-view class="tui-drawer-scroll" scroll-y :style="{ height: drawerH + 'px'}">
					<view class="tui-drawer-title">
						<text class="tui-title-bold">果品等级</text>
					</view>
					<view class="tui-drawer-content tui-flex-attr">
						<block v-for="(item,index) in fruit_level" :key="index">
							<view class="tui-attr-item" :class="{activeItem:index == num}" @click="activeGo('fruitLevel',item.id,index)">
								<view class="tui-attr-ellipsis">{{item.title}}</view>
							</view>
						</block>
					</view>
					<view class="tui-drawer-title">
						<text class="tui-title-bold">单果重量</text>
					</view>
					<view class="tui-drawer-content">
						<input placeholder-class="tui-phcolor" v-model="optionList.weight_parameter_1" class="tui-input" placeholder="不限"
						 maxlength="11" type="number" />
						<tui-icon name="reduce" color="#333" :size="14"></tui-icon>
						<input placeholder-class="tui-phcolor" v-model="optionList.weight_parameter_2" class="tui-input" placeholder="不限"
						 maxlength="11" type="number" /><text class="content-text">克</text>
					</view>
					<view class="tui-drawer-title">
						<text class="tui-title-bold">果径大小</text>
					</view>
					<view class="tui-drawer-content">
						<input placeholder-class="tui-phcolor" v-model="optionList.size_parameter_1" class="tui-input" placeholder="不限"
						 maxlength="11" type="number" />
						<tui-icon name="reduce" color="#333" :size="14"></tui-icon>
						<input placeholder-class="tui-phcolor" v-model="optionList.size_parameter_2" class="tui-input" placeholder="不限"
						 maxlength="11" type="number" /><text class="content-text">毫米</text>
					</view>
					<view class="tui-drawer-title">
						<text class="tui-title-bold">口感等级</text>
					</view>
					<view class="tui-drawer-content">
						<view class="content" @click="useOutClickSide">
							<easy-select :options="tasteBox" ref="easySelect" size="mini" :selectName="'tasteLevel_parameter_1'"  :value="optionList.tasteLevel_parameter_1"
							 @selectOne="selectItem"></easy-select>
						</view>
						<tui-icon name="reduce" color="#333" :size="14"></tui-icon>
						<view class="content" @click="useOutClickSide">
							<easy-select :options="tasteBox" ref="easySelect" size="mini" :selectName="'tasteLevel_parameter_2'" :value="optionList.tasteLevel_parameter_2"
							 :valueNum="optionList.ltTaste" @selectOne="selectItem"></easy-select>
						</view><text class="content-text" style="color: #fff;">星</text>
					</view>
					<view class="tui-drawer-title">
						<text class="tui-title-bold">颜色等级</text>
					</view>
					<view class="tui-drawer-content">
						<view class="content" @click="useOutClickSide">
							<easy-select :options="colorBox" ref="easySelect" :selectName="'colorLevel_parameter_1'" size="mini" :value="optionList.colorLevel_parameter_1"
							 @selectOne="selectItem"></easy-select>
						</view>
						<tui-icon name="reduce" color="#333" :size="14"></tui-icon>
						<view class="content" @click="useOutClickSide">
							<easy-select :options="colorBox" ref="easySelect" :selectName="'colorLevel_parameter_2'" size="mini" :value="optionList.colorLevel_parameter_2"
							 @selectOne="selectItem"></easy-select>
						</view><text class="content-text" style="color: #fff;">星</text>
					</view>
					<view class="tui-drawer-title">
						<text class="tui-title-bold">果形等级</text>
					</view>
					<view class="tui-drawer-content">
						<view class="content" @click="useOutClickSide">
							<easy-select :options="shapeBox" ref="easySelect" :selectName="'shapeLevel_parameter_1'" size="mini" :value="optionList.shapeLevel_parameter_1"
							 @selectOne="selectItem"></easy-select>
						</view>
						<tui-icon name="reduce" color="#333" :size="14"></tui-icon>
						<view class="content" @click="useOutClickSide">
							<easy-select :options="shapeBox" ref="easySelect" :selectName="'shapeLevel_parameter_2'" size="mini" :value="optionList.shapeLevel_parameter_2"
							 @selectOne="selectItem"></easy-select>
						</view>
						<text class="content-text" style="color: #fff;">星</text>
					</view>
					<view class="tui-drawer-title">
						<text class="tui-title-bold">不良率</text>
					</view>
					<view class="tui-drawer-content">
						<input placeholder-class="tui-phcolor" v-model="optionList.rejectRatio_parameter_1" class="tui-input" placeholder="不限"
						 maxlength="11" type="number" />
						<tui-icon name="reduce" color="#333" :size="14"></tui-icon>
						<input placeholder-class="tui-phcolor" v-model="optionList.rejectRatio_parameter_2" class="tui-input" placeholder="不限"
						 maxlength="11" type="number" /><text class="content-text">%</text>
					</view>
					<view class="tui-drawer-title">
						<text class="tui-title-bold">价格区间</text>
					</view>
					<view class="tui-drawer-content">
						<input placeholder-class="tui-phcolor" v-model="optionList.price_parameter_1" class="tui-input" placeholder="不限"
						 maxlength="11" type="number" />
						<tui-icon name="reduce" color="#333" :size="14"></tui-icon>
						<input placeholder-class="tui-phcolor" v-model="optionList.price_parameter_2" class="tui-input" placeholder="不限"
						 maxlength="11" type="number" /><text class="content-text">元</text>
					</view>
					<view class="tui-safearea-bottom"></view>
				</scroll-view>
				<view class="tui-attr-btnbox">
					<view class="tui-attr-safearea">
						<view class="tui-drawer-btn tui-drawerbtn-black" hover-class="tui-white-hover" :hover-stay-time="150" @tap="clickToReset">重置</view>
						<view class="tui-drawer-btn tui-drawerbtn-primary" hover-class="tui-red-hover" :hover-stay-time="150" @tap="clickToConfirm">确定</view>
					</view>
				</view>
			</view>
		</tui-drawer>
		<!--左抽屉弹层 筛选-->

		<!--加载loadding-->
		<tui-nomore v-if="!pullUpOn"></tui-nomore>
		<tui-loadmore v-if="loadding" :index="3" type="red"></tui-loadmore>
		<!-- <tui-nomore v-if="!pullUpOn && isList" backgroundColor="#f7f7f7"></tui-nomore> -->
		<!--加载loadding-->
	</view>
</template>

<script>
	import {
		listing
	} from '../../api/api.js'
	import {
		getGoodsall,
		getAttribute
	} from '../../api/request.js'
	var {
		log
	} = console
	let setdata = uni.getStorageSync('usermen')

	export default {
		data() {
			return {
				title: '选中',
				sleter: false,
				sleter2: false,
				dropdownlistData: [{
					name: "微信支付",
				}, {
					name: "支付宝支付",
				}, {
					name: "银行卡支付",

				}, {
					name: "微信支付",

				}, {
					name: "支付宝支付",

				}, {
					name: "银行卡支付",

				}],
				dropdownShow: false,
				dropdownShow2: false,
				seleVarieties: [], //全部品种
				color_level: [], //颜色等级
				// facade_level: [], //外观等级
				fruit_level: [], //果品等级
				shape_level: [], //果形等级
				goods: [], //商品
				packaging: [], //包装
				species: [], //果类
				storage_mode: [], //储存方式
				taste_level: [], //口感等级
				variety: [], //品种
				numNull: 0,
				numNull2: 0,
				numName: 0,
				url: 'http://192.168.1.10:8980',
				isActives1: false,
				isActives2: false,
				imgUrl: "http://192.168.1.10:8980/js/userfiles/fileupload/202008/1298932901905809410.png",
				colorLevelList: [],
				goodsList: [],
				fileUploadList: '',
				mouthfeelLevelList: [],
				slMangguo: '全部',
				slPinzhong: '品种',
				slGuobiao: '水果标准',
				slYanzheng: '验证保障',
				varietyId: 0,
				ciData: [{
						name: "芒果",
						bOn: false
					},
					{
						name: "西瓜",
						bOn: false
					},
					{
						name: "香蕉",
						bOn: false
					},
					{
						name: "橘子",
						bOn: false
					},
					{
						name: "猕猴桃",
						bOn: false
					}
				],
				dictDataList: [{
						name: '芒果',
						isActive: false
					},
					{
						name: '西瓜',
						isActive: false
					},
					{
						name: '哈密瓜',
						isActive: false
					}
				],
				fruitLevelList: [],
				facadeLevelList: [],
				dictTypeList: [],
				dengji: [{
						name: '特级'
					},
					{
						name: 'A级'
					},
					{
						name: 'B级'
					}
				],
				activeA: false,
				selecValue: '不限',
				selecTwoValue: '不限',
				searchKey: '', //搜索关键词
				width: 200, //header宽度
				height: 64, //header高度
				inputTop: 0, //搜索框距离顶部距离
				arrowTop: 0, //箭头距离顶部距离
				dropScreenH: 0, //下拉筛选框距顶部距离
				attrData: [],
				attrIndex: -1,
				dropScreenShow: false, //品种筛选
				dropScreenShow2: false, //品种筛选
				dropNum: 0, //筛选下拉
				scrollTop: 0,
				tabIndex: 0, //顶部筛选索引
				tabIndex1: 1, //顶部销量索引
				tabIndex2: 2, //价格索引
				tabIndex3: 3, //视频选果
				isList: false, //切换列表展示效果
				drawer: false, //显示选果标准抽屉
				drawerH: 0, //抽屉内部scrollview高度
				selectedName: '综合',
				selectH: 0,
				num: 0,
				seleTopList: [{
						name: '综合',
						selected: false
					},
					{
						name: '销量',
						selected: false
					},
					{
						name: '价格',
						selected: false
					},
					{
						name: '视频选果',
						selected: false
					}
				],
				seleBottom: [{
						name: '芒果',
						selected: false
					},
					{
						name: '品种',
						selected: true
					},
					{
						name: '水果标准',
						selected: false
					},
					{
						name: '验证保障',
						selected: false
					}
				],
				dropdownList: [{
						name: '综合',
						selected: true
					},
					{
						name: '价格升序',
						selected: false
					},
					{
						name: '价格降序',
						selected: false
					}
				],
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				// 渲染展示的数据，存的是label名
				optionList: {
					fruitLevel: '1295251270639849472', //等级
					weight_parameter_1: '', //单果左
					weight_parameter_2: '', //单果右
					size_parameter_1: '', //果径左
					size_parameter_2: '', //果径右
					tasteLevel_parameter_1: '', //口感左
					tasteLevel_parameter_2: '', //口感右
					colorLevel_parameter_1: '', //颜色左
					colorLevel_parameter_2: '', //颜色右
					shapeLevel_parameter_1: '', //形状左
					shapeLevel_parameter_2: '', //形状右
					rejectRatio_parameter_1: '', //不良左
					rejectRatio_parameter_2: '', //不良右
					price_parameter_1: '', //价格左
					price_parameter_2: '', //价格右边
				},
				// 提交申请的数据，存的是id
				postList: {
					fruitLevel: '1295251270639849472', //等级
					weight_parameter_1: '', //单果左
					weight_parameter_2: '', //单果右
					size_parameter_1: '', //果径左
					size_parameter_2: '', //果径右
					tasteLevel_parameter_1: '', //口感左
					tasteLevel_parameter_2: '', //口感右
					colorLevel_parameter_1: '', //颜色左
					colorLevel_parameter_2: '', //颜色右
					shapeLevel_parameter_1: '', //形状左
					shapeLevel_parameter_2: '', //形状右
					rejectRatio_parameter_1: '', //不良左
					rejectRatio_parameter_2: '', //不良右
					price_parameter_1: '', //价格左
					price_parameter_2: '', //价格右边
				},
				statusHeight: 20,
				boxHeight: 44,
				navHeight: 64,
				idList: [], //品种多选存放id
			};
		},
		onLoad(options) {
			var pages = getCurrentPages();
			var beforePage = pages[pages.length - 2]; // 前一个页面路径
			// log(beforePage.$page.fullPath)
			if (beforePage.$page.fullPath === '/pagesII/searchGoods/searchGoods') {
				// log('我执行了搜索')
				//搜索	
				this.getSearch(options.name)
			} else {
				console.log("没错我走到了这里")
				this.slMangguo = options.name
				this.varietyId = options.id
				log(this.varietyId)
				this.ShopIng()
			}

			//this.searchKey = options.name
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
			uni.getSystemInfo({
				success: res => {
					this.width = obj.left || res.windowWidth;
					this.height = obj.top ? obj.top + obj.height + 8 : res.statusBarHeight + 44;
					this.inputTop = obj.top ? obj.top + (obj.height - 30) / 2 : res.statusBarHeight + 7;
					this.arrowTop = obj.top ? obj.top + (obj.height - 32) / 2 : res.statusBarHeight + 6;
					this.searchKey = options.name || ''; //传递的搜索关键字
					//略小，避免误差带来的影响
					this.dropScreenH = (this.height * 750) / res.windowWidth + 186;
					this.drawerH = res.windowHeight - uni.upx2px(100) - this.height;
				}
			});
			
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
			console.log("statusBarHeight,",statusBarHeight,"navHeight",navHeight,"boxHeight",this.boxHeight, "buttonHeight",buttonHeight)
			// #endif
			
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
			tasteBox() {
				let arr = []
				let data = this.taste_level
				data.forEach((item, index) => {
					let tmp = {
						num: index,
						star: index + 1,
						label: item.title,
						value: item.title,
						id:item.id
					}
					arr.push(tmp)
				})
				return arr
			},
			colorBox() {
				let arr = []
				let data = this.color_level
				data.forEach((item, index) => {
					let tmp = {
						num: index,
						star: index + 1,
						label: item.title,
						value: item.title,
						id:item.id
					}
					arr.push(tmp)
				})
				return arr
			},
			shapeBox() {
				let arr = []
				let data = this.shape_level
				data.forEach((item, index) => {
					let tmp = {
						num: index,
						star: index + 1,
						label: item.title,
						value: item.title,
						id:item.id
					}
					arr.push(tmp)
				})
				return arr
			}
		},
		methods: {
			//点击搜索
			goToSearchGoods() {
				uni.navigateTo({
					url: '../../pagesII/searchGoods/searchGoods'
				})
			},
			//商品详情页
			gotoList(id) {
				log(id)
				uni.navigateTo({
					url: '../../pagesIII/productDetail/productDetail?id=' + id
				})
			},
			//下拉选
			dropDownList(index, name) {
				if (index !== -1) {
					console.log("index：" + index, name)
				}
				this.title = name
				this.dropdownShow = !this.dropdownShow
			},
			dropDownList2(index, name) {
				if (index !== -1) {
					console.log("index：" + index, name)
				}
				this.title = name
				this.dropdownShow2 = !this.dropdownShow2
			},
			
			// 搜索请求数据
			getSearch(serrchName) {
				let data = {
					pageNo: 1,
					pageSize: 10,
					name: serrchName
				}
				listing(getGoodsall, data)
					.then((res) => {
						log("搜索结果",res)
						this.goods = res.data.data.goods
						this.seleVarieties = res.data.data
						if (this.seleVarieties === undefined) {
							this.seleVarieties = this.seleVarieties
						} else if (this.seleVarieties != undefined) {}
						this.color_level = res.data.data.color_level
						this.facade_level = res.data.data.facade_level
						this.fruit_level = res.data.data.fruit_level
						this.shape_level = res.data.data.shape_level
						this.goods = res.data.data.goods
						this.packaging = res.data.data.packaging
						this.species = res.data.data.species
						// for (var i = 0; i < this.species.length; i++) {
						// 	this.species[i].isActives = this.activeA
						// }
						this.storage_mode = res.data.data.storage_mode
						this.taste_level = res.data.data.taste_level
						this.variety = res.data.data.variety
					})
					.catch((err) => {
						log(err)
					})

			},

			/* 第一个筛选 */
			Total(index) {
				this.num = index
				log(this.num)
				if (this.num == 0) {
					this.ShopIng()
					log('综合')
				} else if (this.num == 1) {
					if (this.sleter) {
						log('销量升序')
						this.getshopDESC()
					} else {
						this.getshopASC()
						log('销量降序')
					}
					this.sleter = !this.sleter
				} else if (this.num == 2) {
					if (this.sleter2) {
						log('价格升序')
						this.getpriceDESC()
					} else {
						log('价格降序')
						this.getpriceASC()
					}
					this.sleter2 = !this.sleter2

				} else if (this.num == 3) {
					uni.navigateTo({
						url: '../../pagesIII/videos/videos'
					})
					log('视频选果')

				} else if (this.num == 4) {

					uni.navigateTo({
						url: '../../pagesII/rankingList/rankingList'
					})
				}
			},

			/* 筛选果 */
			btnDropChange(name) {
				this.isActives1 = !this.isActives1
				this.dropScreenShow = !this.dropScreenShow
				this.dropScreenShow2 = false
				this.isActives2 = false
				// if(this.isActives1 === true){
				// 	this.dropScreenShow === true
				// }else if(this.isActives1 === false){
				// 	this.dropScreenShow === false
				// }
				// this.isActives1 = !this.isActives1
				this.isActives1 = this.dropScreenShow
				// 	this.dropScreenShow = !this.dropScreenShow
				// this.dropScreenShow2 = false
				// log(this.dropNum)
				// if (this.dropNum == 0) {
				// 	this.dropScreenShow = !this.dropScreenShow
				// 	this.dropScreenShow2 = false
				// 	log('芒果')
				// } else if (this.dropNum == 1) {
				// 	this.dropScreenShow2 = !this.dropScreenShow2
				// 	this.dropScreenShow = false
				// 	log('品种')

				// } else if (this.dropNum == 2) {
				// 	this.btnCloseDrop();
				// 	this.drawer = !this.drawer
				// 	log('果标')
				// } else if (this.dropNum == 3) {
				// 	log('保障')

				// } 

			},
			btnDropChange2() {
				log('触发')
				this.$forceUpdate();
				this.isActives2 = !this.isActives2
				this.dropScreenShow2 = !this.dropScreenShow2
				this.dropScreenShow = false
				this.isActives1 = false
			},
			btnDropChange3() {
				this.drawer = !this.drawer
				this.dropScreenShow2 = false
				this.dropScreenShow = false
				this.isActives2 = false
				this.isActives = false
			},
			//单选
			checkDing(index, id, title) {
				this.numNull = index
				this.slMangguo = title
				this.varietyId = id
				this.ShopIng()
				this.dropScreenShow = !this.dropScreenShow
			},
			checkVariety(index, id, title) {
				let list = this.idList
				let idx = list.indexOf(id)
				if (idx !== -1) {
					list.splice(idx,1)
				}else {
					list.push(id)
				}
				this.idList = list
			},
			// 品种多选请求
			getTypeData(){
				if (this.idList.length === 0) {
					this.dropScreenShow2 = !this.dropScreenShow2
					return
				}
				let ids = this.idList.join(',')
				let data = {
					token: setdata,
					varietyId: ids,
					pageNo:1 ,
					pageSize: 10
				}
				listing(getGoodsall,data).then(res=>{
					console.log(res)
					this.goods= res.data.data.goods
				})
				this.dropScreenShow2 = !this.dropScreenShow2
				this.isActives2 = false
			},
			checkDing2(index, title, id) {
				this.numNull2 = index
				this.slPinzhong = title
				log(index, title, id)
			},
			checkgeng() {
				uni.switchTab({
					url: '../../pages/search/search'
				})
			},
			Sales(id) {
				log(id)
			},
			Priceda(id) {
				log(id)
			},
			Videosl(id) {
				log(id)
			},
			activeGo(name, id, idx) {
				this.optionList[name] = id
				this.num = idx
				console.log(this.optionList)
			},
			selectItem(e) {
				console.log(e)
				let {
					id,
					s_name,
					label
				} = e
				this.optionList[s_name] = label
				this.postList[s_name] = id
				console.log("postList:", this.postList)

			},
			//关闭
			isFalse() {
				this.dropScreenShow2 = false
				this.dropScreenShow = false
				this.isActives2 = false
				this.isActives = false
			},
			//打开
			isTrue() {
				this.dropScreenShow2 = true
				this.dropScreenShow = true
				this.isActives2 = true
				this.isActives = true
			},

			useOutClickSide() {
				this.$refs.easySelect.hideOptions && this.$refs.easySelect.hideOptions()
			},
			//销量升序
			getshopDESC() {
				let data = {
					pageNo: 1,
					pageSize: 10,
					order: 'A.shop_number DESC'
				}
				listing(getGoodsall, data)
					.then((res) => {
						log(res)
						this.goods = res.data.data.goods
					})
					.catch((err) => {
						log(err)
					})

			},
			//销量降序
			getshopASC() {

				let data = {
					pageNo: 1,
					pageSize: 10,
					order: 'A.shop_number ASC'
				}
				listing(getGoodsall, data)
					.then((res) => {

						log(res)
						this.goods = res.data.data.goods
					})
					.catch((err) => {
						log(err)
					})

			},
			//价格升序
			getpriceDESC() {
				let data = {
					pageNo: 1,
					pageSize: 10,
					order: 'A.platform_price DESC'
				}
				listing(getGoodsall, data)
					.then((res) => {
						log(res)
						this.goods = res.data.data.goods
					})
					.catch((err) => {
						log(err)
					})
			},
			//价格降序
			getpriceASC() {
				let data = {
					pageNo: 1,
					pageSize: 10,
					order: 'A.platform_price ASC'
				}
				listing(getGoodsall, data)
					.then((res) => {
						this.goods = res.data.data.goods
					})
					.catch((err) => {
						log(err)
					})
			},
			//请求数据
			ShopIng() {
				let data = {
					id: this.varietyId,
					pageNo: 1,
					pageSize: 10
				}
				let data2 = {
					id: this.varietyId
				}
				Promise.all([listing(getGoodsall, data), listing(getAttribute, data2)])
					// listing(getGoodsall,data)
					.then((res) => {
						console.log(res)
						this.seleVarieties = res[1].data.data
						this.color_level = res[0].data.data.color_level
						this.facade_level = res[0].data.data.facade_level
						this.fruit_level = res[0].data.data.fruit_level
						this.shape_level = res[0].data.data.shape_level
						this.goods = res[0].data.data.goods
						this.packaging = res[0].data.data.packaging
						this.species = res[0].data.data.species
						for (var i = 0; i < this.species.length; i++) {
							this.species[i].isActives = this.activeA
						}
						this.storage_mode = res[0].data.data.storage_mode
						this.taste_level = res[0].data.data.taste_level
						this.variety = res[0].data.data.variety

					})
					.catch((err) => {
						log(err)
					})
			},
			
			px(num) {
				return uni.upx2px(num) + 'px';
			},
			//重置
			reset(id) {
				this.isActives2 = false
				this.isActives = false
				this.slPinzhong = "品种"
				this.idList = [id]
				
				// let arr = this.attrData;
				// for (let item of arr) {
				// 	item.selected = false;
				// }
				// this.attrData = arr;
			},
			btnCloseDrop() {
				this.scrollTop = 1;
				this.$nextTick(() => {
					this.scrollTop = 0;
				});

				this.dropScreenShow = false;
				this.attrIndex = -1;
			},
			clickToSure(dd) {
				this.isActives2 = false
				this.isActives = false
				// this.btnCloseDrop();
				this.dropScreenShow2 = false
				console.log('我真的点击了', dd)
				// this.dropScreenShow = false
			},
			showDropdownList() {
				this.selectH = 246;
				this.tabIndex = 0;
			},
			hideDropdownList() {
				this.selectH = 0;
			},
			dropdownItem() {
				log('2')
			},
			//筛选汇总
			screen(e) {

				let index = e.currentTarget.dataset.index ? e.currentTarget.dataset.index : e;
				console.log(index)
				this.hideDropdownList();
				this.btnCloseDrop();
				if (index == 0) {
					this.showDropdownList();

				} else if (index == 1) {
					this.tabIndex = 1;
				} else if (index == 2) {
					this.isList = !this.isList;
				} else if (index == 3) {
					this.drawer = true;
				} else if (index == 4) {
					log('')
					uni.navigateTo({
						url: '../../pagesII/rankingList/rankingList'
					})
				}
			},
			clickToConfirm() {
				console.log(this.optionList)
				this.closeDrawer()
			},
			clickToReset() {
				this.num = 0
				this.optionList = {
					level: '', //等级
					ltWeight: '', //单果左
					rtWeight: '', //单果左
					ltWidth: '', //果径左
					rtWidth: '', //果径右
					ltTaste: '', //口感左
					rtTaste: '', //口感右
					ltColor: '', //颜色左
					rtColor: '', //颜色右
					ltShape: '', //形状左
					rtShape: '', //形状右
					ltRight: '', //不良左
					rtRight: '', //不良右
					ltPrice: '', //价格左
					rtPrice: '', //价格右边
				}
			},
			closeDrawer: function() {
				this.drawer = false;
			},
			back: function() {
				if (this.drawer) {
					this.closeDrawer();
				} else {
					uni.navigateBack();
				}
			},
			search: function() {
				uni.navigateTo({
					url: '../../news/search/search'
				});
			},
			detail(name) {
				console.log(name)
				uni.navigateTo({
					url: '../../pagesIII/productDetail/productDetail?data=' + name
				});
			}
		},
		onReachBottom: function() {
			if (!this.pullUpOn) return;
			this.loadding = true;
			if (this.pageIndex == 4) {
				this.loadding = false;
				this.pullUpOn = false;
			} else {
				let loadData = JSON.parse(JSON.stringify(this.goodsList)); //商品列表
				loadData = loadData.splice(0, 10);
				if (this.pageIndex == 1) {
					loadData = loadData.reverse();
				}
				this.goodsList = this.goodsList.concat(loadData);
				this.pageIndex = this.pageIndex + 1;
				this.loadding = false;
			}
		}
	};
</script>

<style>
	page {
		background-color: #f7f7f7;
	}

	.activetext {
		color: #fff;
		border: 1rpx solid rgba(0, 0, 0, 0);

	}

	.tui-drop-input-box {
		padding: 50rpx;
		box-sizing: border-box;
	}

	.icon-shangxiajiantou {
		font-size: 16rpx;
	}

	.icon-xiajiantou {
		font-size: 16rpx;
	}

	.checked {
		background-image: linear-gradient(to right, rgba(0, 197, 42, 1), rgba(0, 188, 69, 1));
		color: #fff;
	}

	.activeNull {
		background-image: linear-gradient(to right, rgba(0, 197, 42, 1), rgba(0, 188, 69, 1));
		color: #fff;
	}

	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.container-img {
		margin-top: 350rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.color-text {
		color: rgba(112, 112, 112, 1);
	}


	/* .tui-ml {
		border: 1rpx solid #ccc;
		padding: 10rpx 20rpx;
		border-radius: 24px;
	} */

	/* 隐藏scroll-view滚动条*/

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.tui-header-box {
		width: 100%;
		background: #fff;
		position: fixed;
		z-index: 99998;
		left: 0;
		top: 0;
		overflow: hidden;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
	}

	.tui-header {
		display: flex;
		align-items: center;

	}

	.tui-back {
		margin-left: 8rpx;
		height: 32px !important;
		width: 32px !important;
	}

	.tui--top-title {
		margin-top: 52rpx;
		height: 66rpx;
		line-height: 66rpx;
		color: #000;
		font-size: 32rpx;

	}


	.tui-searchbox {
		width: 100%;
		height: 30px;
		margin-right: 30rpx;
		border-radius: 15px;
		font-size: 12px;
		background: #f7f7f7;
		padding: 3px 10px;
		box-sizing: border-box;
		color: #999;
		display: flex;
		align-items: center;
		overflow: hidden;
	}

	/* #ifdef MP */
	.tui-search-mr {
		margin-right: 20rpx !important;
	}

	/* #endif */

	.tui-search-text {
		padding-left: 16rpx;
	}

	.tui-search-key {
		max-width: 80%;
		height: 100%;
		padding: 0 16rpx;
		margin-left: 12rpx;
		display: flex;
		align-items: center;
		border-radius: 15px;
		background: rgba(0, 0, 0, 0.5);
		color: #fff;
	}

	.tui-key-text {
		box-sizing: border-box;
		padding-right: 12rpx;
		font-size: 12px;
		line-height: 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.search-bar {
		width: 590rpx;
		margin: 0 50rpx;
		border: 1px solid #F5F5F5;
		-webkit-box-shadow: 0 0 20rpx 0 #f5f5f5;
		box-shadow: 0 0 20rpx 0 #f5f5f5;
		height: 80rpx;
		background: #fff;
		border-radius: 40rpx;
		position: fixed;
		/* top: 140rpx; */
		z-index: 99999;
		left: 0;
		display: flex;
		align-items: center;
		padding: 0 40rpx;
	}

	.search-bar image {
		width: 36rpx;
		height: 36rpx;
		margin-right: 20rpx;
	}

	.search-text {
		color: #666666;
		font-size: 28rpx;
	}

	/*screen*/

	.tui-header-screen {
		width: 100%;
		box-sizing: border-box;
		background: #fff;
		position: fixed;
		z-index: 1000;
		padding-top: 100rpx;
	}

	.tui-screen-top,
	.tui-screen-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		color: #333;
	}

	.tui-screen-top {
		height: 88rpx;
		position: relative;
		background: #fff;
	}

	.tui-top-item {
		height: 28rpx;
		line-height: 28rpx;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-topitem-active {
		color: #00BC45;
	}

	.tui-screen-bottom {
		height: 100rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		align-items: center;
		overflow: hidden;
	}

	.tui-bottom-text {
		line-height: 26rpx;
		max-width: 82%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-bottom-item {
		flex: 1;
		width: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 12rpx;
		box-sizing: border-box;
		background-color: #fff;
		margin-right: 20rpx;
		white-space: nowrap;
		height: 60rpx;
		border-radius: 24px;
		border: 1px solid #ccc;
	}

	.tui-icon-ml {
		/* margin-left: 20rpx; */
	}

	.tui-bottom-item:last-child {
		margin-right: 0;
	}


	.activeItem {
		background-color: #fcedea !important;
		color: #00BC45;
		font-weight: bold;
		position: relative;
	}

	.tui-btmItem-active::after {
		content: '';
		position: absolute;
		border: 1rpx solid #00BC45;
		width: 100%;
		height: 100%;
		border-radius: 4px;
		left: 0;
		top: 0;
	}

	.tui-btmItem-tap {
		position: relative;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.tui-btmItem-tap::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 22rpx;
		background: #f7f7f7;
		left: 0;
		top: 58rpx;
	}

	/* 选中加粗 */
	.tui-bold {
		font-weight: bold;
	}

	/*  */
	.tui-active {
		color: #00BC45;
	}

	.tui-active-bottom {
		background-image: linear-gradient(to right, rgba(0, 197, 42, 1), rgba(0, 188, 69, 1));
		color: #fff;
	}

	.tui-addr-left {
		padding-left: 6rpx;
	}

	.tui-seizeaseat-20 {
		height: 20rpx;
	}

	.tui-seizeaseat-30 {
		height: 30rpx;
	}

	/*screen*/

	/*顶部下拉选择 属性*/

	.tui-scroll-box {
		width: 100%;
		height: 480rpx;
		box-sizing: border-box;
		position: relative;
		z-index: 99;
		color: #fff;
		font-size: 30rpx;
		word-break: break-all;
		margin-top: 100rpx;
	}

	.tui-hot-title {
		margin: 24rpx 40rpx;
		color: #333;
	}

	.hot-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.tui-drop-item {
		padding: 10rpx 0;
		width: 19%;
		margin: 20rpx;
		text-align: center;
		border: 1px solid #eee;
		border-radius: 40rpx;
		font-size: 24rpx;
		color: #333;
	}

	.tui-drop-active {
		background: linear-gradient(to left, rgba(0, 188, 69, 1), rgba(0, 197, 42, 1));

	}

	/* .tui-drop-item {
		color: #333;
		font-size: 28rpx;
		padding: 20rpx 40rpx 20rpx 40rpx;
		box-sizing: border-box;
		display: inline-block;
		
	} */

	.tui-drop-btnbox {
		width: 100%;
		height: 100rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		display: flex;
		z-index: 999;
	}

	.tui-drop-btn {
		width: 50%;
		font-size: 32rpx;
		text-align: center;
		height: 100rpx;
		line-height: 100rpx;
		border: 0;
	}

	.tui-btn-red {
		background: #00BC45;
		color: #fff;
	}

	/* 确定按钮 */
	.tui-red-hover {
		background: #00BC78 !important;
		color: #e5e5e5;
	}

	.tui-btn-white {
		background: #fff;
		color: #333;
	}

	.tui-white-hover {
		background: #e5e5e5;
		color: #2e2e2e;
	}

	/*顶部下拉选择 属性*/

	/*顶部下拉选择 综合*/

	.tui-dropdownlist {
		width: 100%;
		position: absolute;
		background-color: #fff;
		border-bottom-left-radius: 24rpx;
		border-bottom-right-radius: 24rpx;
		overflow: hidden;
		box-sizing: border-box;
		padding-top: 10rpx;
		padding-bottom: 26rpx;
		left: 0;
		top: 88rpx;
		visibility: hidden;
		transition: all 0.2s ease-in-out;
		z-index: 999;
	}

	/* 显示元素 */
	.tui-dropdownlist-show {
		visibility: visible;
	}

	.tui-dropdownlist-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: -1;
		transition: all 0.2s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}

	.tui-mask-show {
		opacity: 1;
		visibility: visible;
	}

	/* 下拉列表 */
	.tui-dropdownlist-item {
		color: #333;
		height: 70rpx;
		font-size: 28rpx;
		padding: 0 40rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/*顶部下拉选择 综合*/

	.tui-drawer-box {
		width: 686rpx;
		font-size: 24rpx;
		overflow: hidden;
		position: relative;
		padding-bottom: 100rpx;
	}

	.tui-drawer-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		box-sizing: border-box;
		height: 80rpx;
	}

	.tui-title-bold {
		font-size: 26rpx;
		font-weight: bold;
		flex-shrink: 0;
	}

	.tui-location {
		margin-right: 6rpx;
	}

	.tui-attr-right {
		width: 70%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: right;
	}

	.tui-all-box {
		width: 90%;
		white-space: nowrap;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.tui-drawer-content {
		padding: 16rpx 30rpx 30rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.tui-drawer-content .content-text {
		width: 10%;
	}

	.tui-input {
		border: 1px solid #DCDCDC;
		height: 60rpx;
		border-radius: 4px;
		width: 200rpx;
		background-color: #fff;
		text-align: center;
		font-size: 24rpx;
		color: #333;

		border-radius: 40rpx;
	}

	.tui-phcolor {
		text-align: center;
		color: #b2b2b2;
		font-size: 24rpx;
	}

	.tui-flex-attr {
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.tui-attr-item {
		width: 30%;
		height: 64rpx;
		background-color: #f7f7f7;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 4rpx;
		box-sizing: border-box;
		border-radius: 4px;
		margin-right: 5%;
		margin-bottom: 5%;
	}

	.tui-attr-ellipsis {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		width: 96%;
		text-align: center;
	}

	.tui-attr-item:nth-of-type(3n) {
		margin-right: 0%;
	}

	.tui-attr-btnbox {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		/* padding: 0 30rpx; */
		background: #fff;
	}

	.tui-attr-safearea {
		height: 100rpx;
		display: flex;
		/* align-items: center; */
		justify-content: space-between;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}

	.tui-attr-btnbox::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		border-top: 1px solid #eaeef1;
		transform: scaleY(0.5) translateZ(0);
		transform-origin: 0 0;
	}

	.tui-drawer-btn {
		width: 50%;
		text-align: center;
		line-height: 100rpx;
		font-size: 28rpx;
	}

	.tui-drawerbtn-black {
		background: #DCDCDC;
		color: #555555;
	}

	.tui-drawerbtn-primary {
		background: #00BC45;
		color: #fff;
	}

	/* 商品列表*/

	.tui-product-list {
		padding: 100rpx 10rpx 30rpx;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
	}

	.tui-product-container {
		flex: 1;
		margin-right: 10rpx;
	}

	.tui-product-container:last-child {
		margin-right: 0;
	}

	.tui-pro-item {
		width: 100%;
		margin-bottom: 10rpx;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		overflow: hidden;
		transition: all 0.15s ease-in-out;
	}

	.tui-flex-list {
		display: flex;
		margin-bottom: 1rpx !important;
	}

	.tui-pro-img {
		width: 100%;
		display: block;
	}

	.tui-proimg-list {
		width: 260rpx;
		height: 260rpx !important;
		flex-shrink: 0;
		border-radius: 12rpx;
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
	}

	.tui-pro-dea {
		display: flex;
		justify-content: space-between;
	}

	.tui-jin {
		color: #9a9a9a;
		font-size: 22rpx;
	}

	.tui-dea-color {
		color: #FF4300;
	}

	.tui-rate {
		color: #FF4300;
		font-size: 30rpx;

	}

	.tui-rate-price {
		color: #C4C4C4;
		font-size: 26rpx;
		text-decoration: line-through;
		flex: 2;
		margin-left: 10rpx;
		padding-top: 8rpx;
	}

	.tui-praise {
		color: #C4C4C4;
		font-size: 26rpx;
		padding-top: 8rpx;
	}

	.icon-dianzan {
		color: #FFBE33 !important;
		margin-right: 8rpx;
	}

	.icon-like {
		margin-right: 8rpx;
	}

	.tag-tit-border {
		border: 2rpx solid #FFBE33;
		color: #FFBE33;
		font-size: 18rpx;
		padding: 2rpx 10rpx;
		border-radius: 18rpx;
		margin-right: 10rpx;
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

	.tui-pro-price {
		padding-top: 18rpx;
		line-height: 20rpx;
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
		padding-top: 10rpx;
		font-size: 24rpx;
		color: #656565;
	}

	/* 商品列表*/


	/* 下拉选 */
	/* 隐藏scroll-view滚动条*/
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}





	.tui-animation {
		display: inline-block;
		transform: rotate(0deg);
		transition: all 0.2s;
	}

	.tui-animation-show {
		transform: rotate(180deg);
	}

	.tui-selected-list {
		background-color: #fff;
		border-radius: 20rpx;
		overflow: hidden;
		transform: translateZ(0);
	}

	.tui-dropdown-scroll {
		height: 400rpx;
	}

	.tui-cell-class {
		display: flex;
		align-items: center;
		padding: 26rpx 30rpx !important;
	}

	.tui-ml-20 {
		margin-left: 20rpx;
	}
</style>
