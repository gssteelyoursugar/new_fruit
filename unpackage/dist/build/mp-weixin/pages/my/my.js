(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/my"],{2080:function(t,e,n){"use strict";n.r(e);var o=n("f8cf"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=a.a},3664:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var o={tuiListCell:function(){return n.e("components/tui-list-cell/tui-list-cell").then(n.bind(null,"174d"))}},a=function(){var t=this,e=t.$createElement;t._self._c},i=[]},"3ebe":function(t,e,n){"use strict";n.r(e);var o=n("3664"),a=n("2080");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("53da");var s,r=n("f0c5"),u=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);e["default"]=u.exports},"53da":function(t,e,n){"use strict";var o=n("985a"),a=n.n(o);a.a},6897:function(t,e,n){"use strict";(function(t){n("abd2");o(n("66fd"));var e=o(n("3ebe"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"985a":function(t,e,n){},f8cf:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n("09cc"),a=n("0efb"),i=(t.getStorageSync("userIN"),t.getStorageSync("usermen"),console),s=i.log,r=(n("53e7"),{onLoad:function(e){var n=this;console.log(123),this.getOrderData();var o={};t.getSystemInfo({success:function(t){n.width=o.left||t.windowWidth,n.height=o.top?o.top+o.height+8:t.statusBarHeight+44,n.top=o.top?o.top+(o.height-32)/2:t.statusBarHeight+6,n.scrollH=.6*t.windowWidth}})},data:function(){return{lists:[],modaishow:!1,show:!0,wxlogin:!0,usering:{},imageUrl:"/static/images/wode.png",kefuID:"",loadding:!1,pullUpOn:!0,ApproveStatus:void 0,loginText:"",logMsg:"去认证我的店铺",showBtn:!1,user_phone:"",fukuanList:"",fahuoList:"",shouhuoList:"",tuikuanList:""}},methods:{onPullDownRefresh:function(){this.getMerchants(),this.getOrderData(),setTimeout((function(){t.stopPullDownRefresh()}),1e3)},getUserInfo:function(e){s(e),this.usering=e.detail.userInfo,t.setStorageSync("userIN",e.detail.userInfo);t.setStorageSync("userIN",e.detail.userInfo);if(e.detail.userInfo){var n=e.detail.userInfo;this.wxCode(n.avatarUrl,n.nickName)}this.ifUser()},wxCode:function(t,e){var n=this;wx.login({success:function(t){var e=t.code;console.log(t),n.wxLoging(e)},fail:function(t){s(t)}})},wxLoging:function(e){var n=this;s(e);var i={code:e};t.showLoading({title:"加载中",icon:"none",duration:2e3}),(0,o.publicing2)(a.loginis,i).then((function(e){500!=e.statusCode?(200==e.statusCode&&n.getOrderData(),t.setStorageSync("usermen",e.data.token),t.hideLoading(),n.getOrderData(),n.getMerchants()):t.showModal({title:"提示",content:"登录出错，请重新登录获取信息",success:function(e){(e.confirm||e.cancel)&&t.hideLoading()}})})).catch((function(e){t.showToast({title:"".concat(e)}),s(e)}))},getMerchants:function(){var e=this,n=t.getStorageSync("usermen"),i={token:n};n&&(0,o.listing)(a.getClient,i).then((function(n){e.ApproveStatus=n.data.data.approveStatus,t.setStorageSync("StoreStatus",n.data.data.approveStatus);t.getStorageSync("StoreStatus");e.user_phone=n.data.data.phone;var o=e.ApproveStatus;void 0===o||null===o||""===o?e.logMsg="去认证我的店铺":0===o?e.logMsg="审核中待通过":1===o?e.logMsg="我的店铺已认证":2===o&&(e.logMsg="未通过,请重新提交")})).catch((function(t){s(t)}))},getOrderData:function(){var e=this,n=t.getStorageSync("usermen");if(n){var i={token:n,pageNo:1,pageSize:1e4};(0,o.listing)(a.getMyOrder,i).then((function(t){var n=t.data.data;if(0!==n.length){var o=[],a=[],i=[],s=[];n.forEach((function(t){0==t.payStatus&&o.push(t),"1"!=t.tradeStatus&&"2"!=t.tradeStatus&&"3"!=t.tradeStatus||a.push(t),"1"!=t.payStatus||"4"!=t.tradeStatus&&"8"!=t.tradeStatus||i.push(t),"7"==t.tradeStatus&&"3"==t.afterStatus&&s.push(t)})),e.fukuanList=o.length,e.fahuoList=a.length,e.shouhuoList=i.length,e.tuikuanList=s.length,e.$forceUpdate()}})).catch((function(t){s(t)}))}},ifUser:function(){var e=t.getStorageSync("userIN");e?(this.wxlogin=!0,this.usering=e):this.wxlogin=!1},tendShop:function(){var e=t.getStorageSync("usermen");e?t.navigateTo({url:"../../pagesII/tendShop/tendShop"}):(t.showToast({title:"请先登录",icon:"none"}),this.modaishow=!0)},tendShop1:function(){t.navigateTo({url:"../../pagesII/StoreInformation/StoreInformation"})},gotoAfter:function(){this.wxlogin?t.navigateTo({url:"../../pagesIII/navbar/navbar"}):t.showToast({title:"请先登录",icon:"none"})},myOrder:function(){this.wxlogin?t.navigateTo({url:"../../pagesII/myOrder/myOrder?index=0"}):t.showToast({title:"请先登录",icon:"none"})},ToBeDelivered:function(){this.wxlogin?t.navigateTo({url:"../../pagesII/myOrder/myOrder?index=1"}):t.showToast({title:"请先登录",icon:"none"})},ToBeReceived:function(){this.wxlogin?t.navigateTo({url:"../../pagesII/myOrder/myOrder?index=2"}):t.showToast({title:"请先登录",icon:"none"})},ToBePaid:function(){this.wxlogin?t.navigateTo({url:"../../pagesII/myOrder/myOrder?index=3"}):t.showToast({title:"请先登录",icon:"none"})},href:function(e){var n={0:"",1:"../../pagesII/OrderStatistics/OrderStatistics",2:"../../pagesII/Evaluate/Evaluate",3:"../../pagesII/myCollection/myCollection",4:"../../pagesII/customerService/customerService",5:"../../pagesII/message/message",6:"../../pagesII/ruleDescription/ruleDescription",7:"../../pagesII/cooperation/cooperation",8:"../../pagesII/SetUp/SetUp"};5!=e&&6!=e&&7!=e?this.wxlogin?t.navigateTo({url:n[e]}):t.showToast({title:"请先登录",icon:"none"}):t.navigateTo({url:n[e]})},detail:function(){t.navigateTo({url:"../productDetail/productDetail"})},back:function(){t.navigateBack()}},onShow:function(){this.getMerchants(),this.getOrderData(),this.ifUser()},onPullDownRefresh:function(){this.getOrderData(),setTimeout((function(){t.stopPullDownRefresh()}),200)}});e.default=r}).call(this,n("543d")["default"])}},[["6897","common/runtime","common/vendor"]]]);