(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesIII/productDetail/productDetail"],{"3f88":function(t,e,n){},6576:function(t,e,n){"use strict";n.r(e);var i=n("dd32"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},"89ba":function(t,e,n){"use strict";var i=n("3f88"),o=n.n(i);o.a},a87d:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var i={tuiIcon:function(){return n.e("components/tui-icon/tui-icon").then(n.bind(null,"f464"))},tuiTabs:function(){return n.e("components/tui-tabs/tui-tabs").then(n.bind(null,"b958"))},tuiTag:function(){return n.e("components/tui-tag/tui-tag").then(n.bind(null,"8544"))},tuiRate:function(){return n.e("components/tui-rate/tui-rate").then(n.bind(null,"41db"))},jyfParser:function(){return Promise.all([n.e("common/vendor"),n.e("components/jyf-parser/jyf-parser")]).then(n.bind(null,"ebe5"))},tuiNomore:function(){return n.e("components/tui-nomore/tui-nomore").then(n.bind(null,"e246"))},tuiButton:function(){return n.e("components/tui-button/tui-button").then(n.bind(null,"a5c6"))},wybPopup:function(){return n.e("components/wyb-popup/wyb-popup").then(n.bind(null,"1f69"))},tuiNumberbox:function(){return n.e("components/tui-numberbox/tui-numberbox").then(n.bind(null,"bd60"))}},o=function(){var t=this,e=t.$createElement,n=(t._self._c,t.canPraise?null:t._f("filterNum")(t.shopListdata.praiseNumber||0)),i=t.canPraise?t._f("filterNum")(t.shopListdata.praiseNumber||0):null,o=void 0!==t.shopListdata.totalPirce?t._f("filterNum")(t.shopListdata.totalPirce):null,a=void 0!==t.shopListdata.viewNumber?t._f("filterNum")(t.shopListdata.viewNumber):null,s=t._f("deliverTime")(t.shopListdata.deliveryTime||t.nowTime),u=t._f("countNum")(t.shopListdata.platformClientPrice*t.value2);t.$mp.data=Object.assign({},{$root:{f0:n,f1:i,f2:o,f3:a,f4:s,f5:u}})},a=[]},bbaf:function(t,e,n){"use strict";(function(t){n("abd2");i(n("66fd"));var e=i(n("ebdc"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},dd32:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("09cc"),o=n("0efb"),a=t.getStorageSync("usermen"),s=console,u=s.log,r={data:function(){return{ApproveStatus:"",isLogin:!1,current:0,modaishow:!1,isVerify:!1,saveLike:!0,praLike:!0,ordrIng:!0,value2:1,valueNum:0,shopListdata:{},labelList:[],currentTab:0,pageIndex:1,tabs:[{name:"水果介绍"},{name:"购买须知"}],productName:"",height:94,top:50,scrollH:0,opcity:1,iconOpcity:.5,urlList:[],url:"http://192.168.1.10:8980",posters:"https://www.thorui.cn/img/product/4.png",bannerIndex:0,userInfoData:{},topMenu:[{icon:"message",text:"消息",size:26,badge:3},{icon:"home",text:"首页",size:23,badge:0},{icon:"people",text:"我的",size:26,badge:0},{icon:"cart",text:"购物车",size:23,badge:2},{icon:"kefu",text:"客服小蜜",size:26,badge:0},{icon:"feedback",text:"我要反馈",size:23,badge:0},{icon:"share",text:"分享",size:26,badge:0}],productID:0,menuShow:!1,popupShow:!1,value:1,collected:!1,Sumify:"",token:"",navHeight:64,iconTop:24,tabsTop:64,canPraise:!0,canCollect:!0,canCart:!0,netStatus:!0,nowTime:"2020-10-20"}},onLoad:function(e){var n=this;try{var i=t.getSystemInfoSync(),o=i.statusBarHeight,a=t.getMenuButtonBoundingClientRect(),s=a.top,u=(a.height,a.bottom),r=u-o+(s-o);n.navHeight=o+r+s-o,n.iconTop=o+(s-o),n.tabsTop=o+r+s-o,t.getNetworkType({success:function(t){"wifi"===t.networkType&&(n.netStatus=!0),"wifi"!==t.networkType&&(n.netStatus=!1,setTimeout((function(){n.netStatus=!0}),3e3))}}),t.onNetworkStatusChange((function(t){t.isConnected&&"wifi"!==t.networkType&&(n.netStatus=!1,setTimeout((function(){n.netStatus=!0}),3e3)),t.isConnected&&"wifi"===t.networkType&&(n.netStatus=!0)}))}catch(l){console.log(l)}var c=t.getStorageSync("usermen");this.token=c,this.productID=e.id,this.postDetails(),this.postSettle(),this.getMerchants();wx.getMenuButtonBoundingClientRect()},computed:{swiperList:function(){var t=this.shopListdata,e=this.urlList;return t&&""!==t.urlVideo?(e.unshift(t.urlVideo),e):e},payTime:function(){var t=(new Date).getHours();return t}},filters:{filterNum:function(t){if(t){var e=(Math.floor(t)+"").split(""),n="";return e.length<=4&&(n=t),5===e.length&&(n=e[0]+"."+e[1]+"万"),6===e.length&&(n=e[0]+e[1]+"."+e[2]+"万"),7===e.length&&(n=e[0]+e[1]+e[2]+"."+e[3]+"万"),8===e.length&&(n=e[0]+e[1]+e[2]+e[3]+"."+e[4]+"万"),9===e.length&&(n=e[0]+"."+e[1]+"亿"),10===e.length&&(n=e[0]+e[1]+"."+e[2]+"亿"),n}return t},deliverTime:function(t){var e=t.split(""),n=e.splice(5,5),i=(new Date).getHours(),o="";return o=i<=16?n[0]+n[1]+"月"+n[3]+n[4]+"日":n[0]+n[1]+"月"+n[3]+(1*n[4]+1)+"日",o},countNum:function(t){return 1*t.toFixed(2)}},methods:{clickLink:function(t){},getMerchants:function(){var t=this,e={token:a};(0,i.listing)(o.getClient,e).then((function(e){t.ApproveStatus=e.data.data.approveStatus})).catch((function(t){u(t)}))},postSettle:function(){var e=this,n=t.getStorageSync("usermen"),a={id:this.productID,token:n};(0,i.publicing)(o.postSettle,a).then((function(t){e.userInfoData=t.data.data.extraData.userInfo})).catch((function(t){u(t)}))},buyNow:function(e){var n=t.getStorageSync("usermen");if(n){this.modaishow=!1;var a={goodsId:e,token:n,number:this.value2,type:"nowGoods"};(0,i.publicing)(o.postmyOrder,a).then((function(e){var n=e.data.data,i=e.data.code;-1!=i?200==i&&(t.showToast({title:"".concat(e.data.msg),icon:"none",duration:3e3}),t.navigateTo({url:"../../pagesIII/submitOrder/submitOrder?ids="+n})):t.showToast({title:"".concat(e.data.msg),icon:"none",duration:3e3})})).catch((function(t){u(t)}))}else this.modaishow=!0},praiseLikeTwo:function(){t.showToast({title:"重复点赞",icon:"none"})},praiseLike:function(e){var n=this,a=t.getStorageSync("usermen");if(a){this.modaishow=!1;var s={goodsId:e,token:a};1!=this.shopListdata.isPraise&&!0!==this.canPraise?!1===this.shopListdata.isPraise&&(this.canPraise=!0,(0,i.publicing)(o.postPraise,s).then((function(e){u(e),n.shopListdata.praiseNumber++,t.showToast({title:"点赞成功",icon:"none"})})).catch((function(t){u(t)}))):t.showToast({title:"重复点赞",icon:"none"})}else this.modaishow=!0},change2:function(t){this.value2=t.value},init:function(){this.modaishow=!0},messcancel:function(){this.modaishow=!1},noGoods:function(){t.showToast({title:"正在补货中～",icon:"none"})},showPopup:function(){var e=t.getStorageSync("usermen");e?null!==this.ApproveStatus&&void 0!==this.ApproveStatus&&""!==this.ApproveStatus&&2!==this.ApproveStatus?0!==this.ApproveStatus?e&&1===this.ApproveStatus&&this.$refs.popup.show():t.showToast({title:"店铺信息审核中",icon:"none"}):this.toggleVerify():this.modaishow=!0},toggleVerify:function(){this.isVerify=!this.isVerify},clickToVerify:function(){t.navigateTo({url:"../../pagesII/tendShop/tendShop"}),this.toggleVerify()},getUserInfo:function(e){if(e.detail.userInfo){t.setStorageSync("userIN",e.detail.userInfo);var n=e.detail.userInfo;this.wxCode(n.avatarUrl,n.nickName)}this.modaishow=!1},wxCode:function(t,e){var n=this;wx.login({success:function(t){var e=t.code;n.wxLoging(e)},fail:function(t){u(t)}})},wxLoging:function(e){var n=this;t.showLoading({});var a={code:e};(0,i.publicing2)(o.loginis,a).then((function(e){t.setStorageSync("usermen",e.data.token);t.getStorageSync("usermen");t.showToast({title:"登录成功"}),n.getMerchants(),n.postDetails(),t.hideLoading()})).catch((function(t){u(t)}))},likeOrder:function(e){var n=t.getStorageSync("usermen");if(n)if(this.modaishow=!1,0!==this.ApproveStatus)if(null!==this.ApproveStatus&&void 0!==this.ApproveStatus&&""!==this.ApproveStatus&&2!==this.ApproveStatus){if(1===this.ApproveStatus){var a={goodsId:e,token:n};if(1==this.shopListdata.isCollection)return void t.showToast({title:"重复收藏",icon:"none"});if(!0===this.canCollect)return void t.showToast({title:"重复收藏",icon:"none"});0==this.shopListdata.isCollection&&(this.canCollect=!0,(0,i.publicing)(o.postLike,a).then((function(e){t.showToast({title:"收藏成功",icon:"none"})})).catch((function(t){u(t)})))}}else this.toggleVerify();else t.showToast({title:"店铺信息审核中",icon:"none"});else this.modaishow=!0},postDetails:function(){var e=this;t.showLoading({title:"加载中"});var n=t.getStorageSync("usermen"),a={id:this.productID,token:n};(0,i.publicing)(o.postdelist,a).then((function(t){e.shopListdata=t.data.data,e.labelList=t.data.data.labelList,e.urlList=t.data.data.urlList,e.canPraise=t.data.data.isPraise,e.canCollect=t.data.data.isCollection,e.canCart=t.data.data.isCart})).catch((function(t){console.log(t)})),t.hideLoading()},postShopping:function(e){var n=this,a=t.getStorageSync("usermen");if(a)if(this.modaishow=!1,null!==this.ApproveStatus&&void 0!==this.ApproveStatus&&""!==this.ApproveStatus&&2!==this.ApproveStatus)if(0!==this.ApproveStatus){if(1===this.ApproveStatus){if(1==this.shopListdata.isCart)return void t.showToast({title:"重复加入进货单",icon:"none",duration:3e3});if(!0===this.canCart)return void t.showToast({title:"重复加入进货单",icon:"none",duration:3e3});if(0==this.shopListdata.isCart){var s={goodsId:e,token:a,number:1};(0,i.publicing)(o.postmyOrder,s).then((function(e){var i=e.data.code;-1==i?t.showToast({title:"".concat(e.data.msg),icon:"none",duration:3e3}):200==i&&(n.canCart=!0,t.showToast({title:"加入进货单成功",icon:"none",duration:3e3}))})).catch((function(t){u(t)}))}}}else t.showToast({title:"店铺信息审核中",icon:"none"});else this.toggleVerify();else this.modaishow=!0},bannerChange:function(t){this.bannerIndex=t.detail.current},previewImage:function(e){var n=e.currentTarget.dataset.index;t.previewImage({current:this.banner[n],urls:this.banner})},back:function(){t.navigateBack()},openMenu:function(){t.switchTab({url:"../../pages/index/index"})},closeMenu:function(){this.menuShow=!1},hidePopup:function(){this.popupShow=!1},collecting:function(){this.collected=!this.collected},common:function(){this.tui.toast("功能开发中~")},changeNum:function(t){this.currentTab=t.index},submit:function(){this.popupShow=!1,t.navigateTo({url:"../submitOrder/submitOrder"})},coupon:function(){t.navigateTo({url:"../coupon/coupon"})},onShare:function(){}},onPageScroll:function(t){}};e.default=r}).call(this,n("543d")["default"])},ebdc:function(t,e,n){"use strict";n.r(e);var i=n("a87d"),o=n("6576");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("89ba");var s,u=n("f0c5"),r=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);e["default"]=r.exports}},[["bbaf","common/runtime","common/vendor"]]]);