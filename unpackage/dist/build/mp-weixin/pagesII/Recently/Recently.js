(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesII/Recently/Recently"],{"12cc":function(t,e,n){"use strict";n.r(e);var i=n("3d55"),o=n("68b7");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("3a9d");var c,s=n("f0c5"),u=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],c);e["default"]=u.exports},"37aa":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i,o=n("09cc"),a=n("0efb");function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var s=t.getStorageSync("usermen"),u=console,r=u.log,l=(i={data:function(){var t;return t={tips:"",modaishow:!1,isCollection:!1,isActive:!0,hasError:!1,showLike:!0,url:"http://192.168.1.10:8980/",lookDatas:[],ApproveStatus:0,flag:!1,checkFlag:!1,allFlag:"",checkedArr:[],valueNum:0},c(t,"url","http://192.168.1.10:8980"),c(t,"orderObj",[]),c(t,"openid",""),c(t,"neworder",[]),c(t,"dataList",[{id:"q2020811",buyNum:1,price:299.5,selected:!1,imgsrc:"../../static/images/putao1.png",shopName:"大葡萄"},{id:"q2020812",buyNum:2,price:499,selected:!1,imgsrc:"../../static/images/niuyouguo1.png",shopName:"大哈密瓜"},{id:"q2020813",buyNum:3,price:199,selected:!1,imgsrc:"../../static/images/putao1.png",shopName:"大紫葡萄"}]),c(t,"isAll",!1),c(t,"totalPrice",0),c(t,"buyNum",0),c(t,"cartIds",[]),c(t,"actions",[{name:"删除",color:"#fff",fontsize:28,width:64,background:"#F82400"}]),c(t,"actions2",[{name:"看相似",color:"#fff",fontsize:28,width:64,background:"#FF7035"},{name:"删除",color:"#fff",fontsize:28,width:64,background:"#F82400"}]),c(t,"isEdit",!1),c(t,"pageIndex",1),c(t,"loadding",!1),c(t,"pullUpOn",!0),c(t,"allPrice",0),c(t,"statusHeight",20),c(t,"boxHeight",44),t},filters:{getPrice:function(t){return t=t||0,t.toFixed(2)}},onPullDownRefresh:function(){this.getRecentlyData(),setTimeout((function(){t.stopPullDownRefresh()}),1e3)},onLoad:function(){this.getMerchants();var e=t.getSystemInfoSync(),n=e.statusBarHeight,i=t.getMenuButtonBoundingClientRect(),o=i.top,a=i.bottom;this.statusHeight=n;var c=a-n+(o-n),s=n+c+o-n;this.boxHeight=s-n},methods:{getMerchants:function(){var t=this,e={token:s};(0,o.listing)(a.getClient,e).then((function(e){t.ApproveStatus=e.data.data.approveStatus})).catch((function(t){r(t)}))},back:function(){t.navigateBack()},init:function(t,e){this.modaishow=t,this.tips=e},getUserInfo:function(e){r(e),this.usering=e.detail.userInfo,t.setStorageSync("userIN",e.detail.userInfo);t.setStorageSync("userIN",e.detail.userInfo);if(e.detail.userInfo){var n=e.detail.userInfo;this.wxCode(n.avatarUrl,n.nickName)}r("dddddddddd")},wxCode:function(t,e){var n=this;wx.login({success:function(t){r(t);var e=t.code;n.wxLoging(e)},fail:function(t){r(t)}})},wxLoging:function(e){var n=this;r(e);var i={code:e};t.showLoading({title:"加载中",icon:"none"}),(0,o.publicing2)(a.loginis,i).then((function(e){500!=e.statusCode?(200==e.statusCode&&r(e),r(e),t.setStorageSync("usermen",e.data.token),t.hideLoading(),n.modaishow=!1,n.getRecentlyData()):t.showModal({title:"提示",content:"服务器错误，请重新登录获取信息",success:function(e){(e.confirm||e.cancel)&&t.hideLoading()}})})).catch((function(e){t.showToast({title:"".concat(e)}),r(e)}))},getRecentlyData:function(){var t=this,e={token:s,pageNo:1,pageSize:1e4};(0,o.listing)(a.getRecently,e).then((function(e){t.lookDatas=e.data.data})).catch((function(t){r(t)}))},likeOrder:function(e){var n=this;r(e);var i=t.getStorageSync("usermen");if(i){this.modaishow=!1;var c={goodsId:e.id,token:i};(0,o.publicing)(a.postLike,c).then((function(e){n.getRecentlyData(),t.showToast({title:"已收藏",icon:"none",duration:2e3})})).catch((function(t){r(t)}))}else this.modaishow=!0;r(i)},delLike:function(e){var n=this,i={goodsId:e.id,token:s};(0,o.publicing)(a.postDelLike,i).then((function(e){t.showToast({title:"取消收藏"}),n.getRecentlyData()})).catch((function(t){r(t)}))},gotoList:function(e){r("id",e),t.navigateTo({url:"../../pagesIII/productDetail/productDetail?id="+e})},handlerButton:function(e){var n=this;r(e);var i=t.getStorageSync("usermen"),c={goodsId:e,token:i};r(c),(0,o.publicing)(a.postRecentlyDel,c).then((function(e){r(e),t.showToast({title:"".concat(e.data.msg)}),n.getRecentlyData()})).catch((function(e){r(e),t.showToast({title:"删除失败"})}))},tising:function(t,e){this.init(t,e)},detail:function(){t.navigateTo({url:"../productDetail/productDetail"})}},onShow:function(){var e=t.getStorageSync("usermen");if(r(e),e){var n=!1,i="";this.tising(n,i),this.getRecentlyData(),r("显示订单")}else{this.hasError=!0,this.isActive=!1;var o=!0,a="请登录后再查看";this.tising(o,a)}}},c(i,"onPullDownRefresh",(function(){setTimeout((function(){t.stopPullDownRefresh()}),200)})),c(i,"onNavigationBarButtonTap",(function(t){this.isEdit=!this.isEdit;this.isEdit})),i);e.default=l}).call(this,n("543d")["default"])},"3a9d":function(t,e,n){"use strict";var i=n("5440"),o=n.n(i);o.a},"3d55":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var i={tuiSwipeAction:function(){return n.e("components/tui-swipe-action/tui-swipe-action").then(n.bind(null,"657a"))}},o=function(){var t=this,e=t.$createElement;t._self._c},a=[]},5440:function(t,e,n){},"68b7":function(t,e,n){"use strict";n.r(e);var i=n("37aa"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},cf6a:function(t,e,n){"use strict";(function(t){n("abd2");i(n("66fd"));var e=i(n("12cc"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["cf6a","common/runtime","common/vendor"]]]);