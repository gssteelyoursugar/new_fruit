(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesIII/productDetail/productDetail"],{"3f88":function(t,e,n){},6576:function(t,e,n){"use strict";n.r(e);var o=n("dd32"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a},"89ba":function(t,e,n){"use strict";var o=n("3f88"),i=n.n(o);i.a},bbaf:function(t,e,n){"use strict";(function(t){n("abd2");o(n("66fd"));var e=o(n("ebdc"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},c4f8:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}));var o={tuiIcon:function(){return n.e("components/tui-icon/tui-icon").then(n.bind(null,"f464"))},tuiTabs:function(){return n.e("components/tui-tabs/tui-tabs").then(n.bind(null,"b958"))},tuiTag:function(){return n.e("components/tui-tag/tui-tag").then(n.bind(null,"8544"))},tuiRate:function(){return n.e("components/tui-rate/tui-rate").then(n.bind(null,"41db"))},jyfParser:function(){return Promise.all([n.e("common/vendor"),n.e("components/jyf-parser/jyf-parser")]).then(n.bind(null,"ebe5"))},tuiNomore:function(){return n.e("components/tui-nomore/tui-nomore").then(n.bind(null,"e246"))},tuiButton:function(){return n.e("components/tui-button/tui-button").then(n.bind(null,"a5c6"))},wybPopup:function(){return n.e("components/wyb-popup/wyb-popup").then(n.bind(null,"1f69"))},tuiNumberbox:function(){return n.e("components/tui-numberbox/tui-numberbox").then(n.bind(null,"bd60"))}},i=function(){var t=this,e=t.$createElement,n=(t._self._c,t.canPraise?null:t._f("filterNum")(t.shopListdata.praiseNumber||0)),o=t.canPraise?t._f("filterNum")(t.shopListdata.praiseNumber||0):null,i=void 0!==t.shopListdata.totalPirce?t._f("filterNum")(t.shopListdata.totalPirce):null,a=void 0!==t.shopListdata.viewNumber?t._f("filterNum")(t.shopListdata.viewNumber):null,s=t._f("deliverTime")(t.shopListdata.deliveryTime||t.nowTime);t.$mp.data=Object.assign({},{$root:{f0:n,f1:o,f2:i,f3:a,f4:s}})},a=[]},dd32:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n("09cc"),i=n("0efb"),a=t.getStorageSync("usermen"),s=console,u=s.log,r={data:function(){return{ApproveStatus:0,isLogin:!1,current:0,modaishow:!1,isVerify:!1,saveLike:!0,praLike:!0,ordrIng:!0,value2:1,valueNum:0,shopListdata:{},labelList:[],currentTab:0,pageIndex:1,tabs:[{name:"水果介绍"},{name:"购买须知"}],productName:"",height:94,top:50,scrollH:0,opcity:1,iconOpcity:.5,urlList:[],url:"http://192.168.1.10:8980",posters:"https://www.thorui.cn/img/product/4.png",bannerIndex:0,userInfoData:{},topMenu:[{icon:"message",text:"消息",size:26,badge:3},{icon:"home",text:"首页",size:23,badge:0},{icon:"people",text:"我的",size:26,badge:0},{icon:"cart",text:"购物车",size:23,badge:2},{icon:"kefu",text:"客服小蜜",size:26,badge:0},{icon:"feedback",text:"我要反馈",size:23,badge:0},{icon:"share",text:"分享",size:26,badge:0}],productID:0,menuShow:!1,popupShow:!1,value:1,collected:!1,Sumify:"",token:"",navHeight:64,iconTop:24,tabsTop:64,canPraise:!0,canCollect:!0,canCart:!0,netStatus:!0,nowTime:"2020-10-20"}},onLoad:function(e){var n=this;try{var o=t.getSystemInfoSync(),i=o.statusBarHeight;t.getNetworkType({success:function(t){console.log(t.networkType),"wifi"===t.networkType&&(n.netStatus=!0),"wifi"!==t.networkType&&(n.netStatus=!1,setTimeout((function(){n.netStatus=!0}),3e3))}}),t.onNetworkStatusChange((function(t){console.log(t.isConnected),console.log(t.networkType),t.isConnected&&"wifi"!==t.networkType&&(n.netStatus=!1,setTimeout((function(){n.netStatus=!0}),3e3)),t.isConnected&&"wifi"===t.networkType&&(n.netStatus=!0)}));var a=t.getMenuButtonBoundingClientRect(),s=a.top,u=a.bottom,r=u-i+(s-i);n.navHeight=i+r+s-i,n.iconTop=i+(s-i),n.tabsTop=i+r+s-i,console.log(n.navHeight,r)}catch(l){console.log(l)}var c=t.getStorageSync("usermen");this.token=c,this.productID=e.id,this.postDetails(),this.postSettle(),this.getMerchants();wx.getMenuButtonBoundingClientRect()},computed:{swiperList:function(){var t=this.shopListdata,e=this.urlList;return t&&""!==t.urlVideo?(e.unshift(t.urlVideo),e):e},payTime:function(){var t=(new Date).getHours();return t}},filters:{filterNum:function(t){if(t){var e=(Math.floor(t)+"").split(""),n="";return e.length<=4&&(n=t),5===e.length&&(n=e[0]+"."+e[1]+"万"),6===e.length&&(n=e[0]+e[1]+"."+e[2]+"万"),7===e.length&&(n=e[0]+e[1]+e[2]+"."+e[3]+"万"),8===e.length&&(n=e[0]+e[1]+e[2]+e[3]+"."+e[4]+"万"),9===e.length&&(n=e[0]+"."+e[1]+"亿"),10===e.length&&(n=e[0]+e[1]+"."+e[2]+"亿"),n}return t},deliverTime:function(t){var e=t.split(""),n=e.splice(5,5),o=(new Date).getHours(),i="";return i=o<=16?n[0]+n[1]+"月"+n[3]+n[4]+"日":n[0]+n[1]+"月"+n[3]+(1*n[4]+1)+"日",i}},methods:{clickLink:function(t){console.log(t)},getMerchants:function(){var t=this,e={token:a};(0,o.listing)(i.getClient,e).then((function(e){t.ApproveStatus=e.data.data.approveStatus})).catch((function(t){u(t)}))},postSettle:function(){var e=this,n=t.getStorageSync("usermen"),a={id:this.productID,token:n};(0,o.publicing)(i.postSettle,a).then((function(t){e.userInfoData=t.data.data.extraData.userInfo})).catch((function(t){u(t)}))},buyNow:function(e){var n=t.getStorageSync("usermen");if(n){this.modaishow=!1;var a={goodsId:e,token:n,number:this.value2,type:"nowGoods"};(0,o.publicing)(i.postmyOrder,a).then((function(e){var n=e.data.data,o=e.data.code;if(-1==o)return t.showToast({title:"".concat(e.data.msg),icon:"none",duration:2e3}),void t.hideLoading();200==o&&(t.showToast({title:"".concat(e.data.msg),icon:"none",duration:2e3}),t.navigateTo({url:"../../pagesIII/submitOrder/submitOrder?ids="+n}))})).catch((function(t){u(t)}))}else this.modaishow=!0},praiseLikeTwo:function(){t.showToast({title:"重复点赞",icon:"none"})},praiseLike:function(e){var n=this,a=t.getStorageSync("usermen");if(a){this.modaishow=!1;var s={goodsId:e,token:a};if(1==this.shopListdata.isPraise)return void t.showToast({title:"重复点赞",icon:"none"});if(!0===this.canPraise)return void t.showToast({title:"重复点赞",icon:"none"});!1===this.shopListdata.isPraise&&(this.canPraise=!0,(0,o.publicing)(i.postPraise,s).then((function(e){u(e),n.shopListdata.praiseNumber++,t.showToast({title:"点赞成功",icon:"none"})})).catch((function(t){u(t)})))}else this.modaishow=!0},change2:function(t){this.value2=t.value},init:function(){this.modaishow=!0},messcancel:function(){this.modaishow=!1},noGoods:function(){t.showToast({title:"正在补货中～",icon:"none"})},showPopup:function(){var e=t.getStorageSync("usermen");e?1==this.ApproveStatus?e&&1===this.ApproveStatus&&this.$refs.popup.show():this.toggleVerify():this.modaishow=!0},toggleVerify:function(){this.isVerify=!this.isVerify},clickToVerify:function(){t.navigateTo({url:"../../pagesII/tendShop/tendShop"}),this.toggleVerify(),console.log("前往验证")},getUserInfo:function(e){if(e.detail.userInfo){t.setStorageSync("userIN",e.detail.userInfo);var n=e.detail.userInfo;this.wxCode(n.avatarUrl,n.nickName)}this.modaishow=!1},wxCode:function(t,e){var n=this;wx.login({success:function(t){var e=t.code;n.wxLoging(e)},fail:function(t){u(t)}})},wxLoging:function(e){var n=this;t.showLoading({});var a={code:e};(0,o.publicing2)(i.loginis,a).then((function(e){t.setStorageSync("usermen",e.data.token);t.getStorageSync("usermen");t.showToast({title:"登陆成功"}),n.getMerchants(),t.hideLoading()})).catch((function(t){u(t)}))},likeOrder:function(e){var n=t.getStorageSync("usermen");if(n){this.modaishow=!1;var a={goodsId:e,token:n};if(1==this.shopListdata.isCollection)return void t.showToast({title:"重复收藏",icon:"none"});if(!0===this.canCollect)return void t.showToast({title:"重复收藏",icon:"none"});0==this.shopListdata.isCollection&&(this.canCollect=!0,(0,o.publicing)(i.postLike,a).then((function(e){t.showToast({title:"收藏成功",icon:"none"})})).catch((function(t){u(t)})))}else this.modaishow=!0},postDetails:function(){var e=this;t.showLoading({title:"加载中"});var n={id:this.productID,token:a};(0,o.publicing)(i.postdelist,n).then((function(t){console.log("res123",t),e.shopListdata=t.data.data,e.labelList=t.data.data.labelList,e.urlList=t.data.data.urlList,e.canPraise=t.data.data.isPraise,e.canCollect=t.data.data.isCollection,e.canCart=t.data.data.isCart})).catch((function(t){console.log(t)})),t.hideLoading()},postShopping:function(e){var n=this,a=t.getStorageSync("usermen");if(a){this.modaishow=!1;var s={goodsId:e,token:a,number:1};if(1==this.shopListdata.isCart)return void t.showToast({title:"重复加入进货单",icon:"none",duration:3e3});if(!0===this.canCart)return void t.showToast({title:"重复加入进货单",icon:"none",duration:3e3});0==this.shopListdata.isCart&&(0,o.publicing)(i.postmyOrder,s).then((function(e){var o=e.data.code;-1==o?t.showToast({title:"".concat(e.data.msg),icon:"none",duration:3e3}):200==o&&(n.canCart=!0,t.showToast({title:"加入进货单成功",icon:"none",duration:3e3}))})).catch((function(t){u(t)}))}else this.modaishow=!0},bannerChange:function(t){this.bannerIndex=t.detail.current},previewImage:function(e){var n=e.currentTarget.dataset.index;t.previewImage({current:this.banner[n],urls:this.banner})},back:function(){t.navigateBack()},openMenu:function(){t.switchTab({url:"../../pages/index/index"})},closeMenu:function(){this.menuShow=!1},hidePopup:function(){this.popupShow=!1},collecting:function(){this.collected=!this.collected},common:function(){this.tui.toast("功能开发中~")},btnTopMenu:function(e){if(this.closeMenu(),4==e)t.makePhoneCall({phoneNumber:"10086"});else if(6==e)this.common();else{var n={0:"../message/message",1:"../mall/mall",2:"../my/my",3:"../shopcart/shopcart",5:"/pages/my/feedback/feedback?page=mall"}[e];n&&this.tui.href(n)}},changeNum:function(t){this.currentTab=t.index},submit:function(){this.popupShow=!1,t.navigateTo({url:"../submitOrder/submitOrder"})},coupon:function(){t.navigateTo({url:"../coupon/coupon"})},onShare:function(){}},onPageScroll:function(t){}};e.default=r}).call(this,n("543d")["default"])},ebdc:function(t,e,n){"use strict";n.r(e);var o=n("c4f8"),i=n("6576");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("89ba");var s,u=n("f0c5"),r=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);e["default"]=r.exports}},[["bbaf","common/runtime","common/vendor"]]]);