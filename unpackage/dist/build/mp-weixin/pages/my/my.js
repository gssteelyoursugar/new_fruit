(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/my"],{2080:function(t,e,o){"use strict";o.r(e);var n=o("f8cf"),i=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=i.a},"3ebe":function(t,e,o){"use strict";o.r(e);var n=o("c415"),i=o("2080");for(var a in i)"default"!==a&&function(t){o.d(e,t,(function(){return i[t]}))}(a);o("53da");var s,u=o("f0c5"),r=Object(u["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);e["default"]=r.exports},"53da":function(t,e,o){"use strict";var n=o("985a"),i=o.n(n);i.a},6897:function(t,e,o){"use strict";(function(t){o("abd2");n(o("66fd"));var e=n(o("3ebe"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},"985a":function(t,e,o){},c415:function(t,e,o){"use strict";o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return n}));var n={tuiListCell:function(){return o.e("components/tui-list-cell/tui-list-cell").then(o.bind(null,"174d"))}},i=function(){var t=this,e=t.$createElement;t._self._c},a=[]},f8cf:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o("09cc"),i=o("0efb"),a=(t.getStorageSync("userIN"),t.getStorageSync("usermen")),s=console,u=s.log,r=(o("53e7"),{onLoad:function(e){var o=this;console.log("这里是onload");var n={};t.getSystemInfo({success:function(t){o.width=n.left||t.windowWidth,o.height=n.top?n.top+n.height+8:t.statusBarHeight+44,o.top=n.top?n.top+(n.height-32)/2:t.statusBarHeight+6,o.scrollH=.6*t.windowWidth}})},data:function(){return{lists:[],modaishow:!1,show:!0,wxlogin:!0,usering:{},imageUrl:"/static/images/wode.png",kefuID:"",loadding:!1,pullUpOn:!0,ApproveStatus:void 0,loginText:"",logMsg:"去认证我的店铺",showBtn:!1,Goauth:!0,Goauth2:!1,Goauth3:!1,Goauth4:!1,user_phone:"",fukuanList:"",fahuoList:"",shouhuoList:"",tuikuanList:""}},methods:{onPullDownRefresh:function(){this.getMerchants(),setTimeout((function(){t.stopPullDownRefresh()}),1e3)},getUserInfo:function(e){u(e),this.usering=e.detail.userInfo,t.setStorageSync("userIN",e.detail.userInfo);t.setStorageSync("userIN",e.detail.userInfo);if(e.detail.userInfo){var o=e.detail.userInfo;this.wxCode(o.avatarUrl,o.nickName)}this.ifUser()},wxCode:function(t,e){var o=this;wx.login({success:function(t){var e=t.code;o.wxLoging(e)},fail:function(t){u(t)}})},wxLoging:function(e){var o=this;u(e);var a={code:e};t.showLoading({title:"加载中",icon:"none",duration:2e3}),(0,n.publicing2)(i.loginis,a).then((function(e){500!=e.statusCode?(200==e.statusCode&&o.getOrderData(),t.setStorageSync("usermen",e.data.token),t.hideLoading(),o.getMerchants()):t.showModal({title:"提示",content:"登录出错，请重新登录获取信息",success:function(e){(e.confirm||e.cancel)&&t.hideLoading()}})})).catch((function(e){t.showToast({title:"".concat(e)}),u(e)}))},getMerchants:function(){var e=this,o=t.getStorageSync("usermen"),a={token:o};o&&(0,n.listing)(i.getClient,a).then((function(o){console.log(o.data.data),e.ApproveStatus=o.data.data.approveStatus,t.setStorageSync("StoreStatus",o.data.data.approveStatus);t.getStorageSync("StoreStatus");e.user_phone=o.data.data.phone;var n=e.ApproveStatus;void 0===n||null===n||""===n?e.logMsg="去认证我的店铺":0===n?e.logMsg="审核中待通过":1===n?e.logMsg="我的店铺已认证":2===n&&(e.logMsg="未通过,请重新提交")})).catch((function(t){u(t)}))},getOrderData:function(){var e=this,o=t.getStorageSync("usermen");if(o){var a={token:o,pageNo:1,pageSize:100};(0,n.listing)(i.getMyOrder,a).then((function(t){console.log(t);var o=t.data.data,n=[],i=[],a=[],s=[];0!==o.length&&(o.forEach((function(t){0==t.payStatus&&n.push(t),1==t.tradeStatus&&i.push(t),2==t.tradeStatus&&a.push(t),7==t.tradeStatus&&s.push(t)})),console.log("shouhuoList,",a),e.fukuanList=n.length,e.fahuoList=i.length,e.shouhuoList=a.length,e.tuikuanList=s.length,e.$forceUpdate())})).catch((function(t){u(t)}))}},ifUser:function(){var e=t.getStorageSync("userIN");e?(this.wxlogin=!0,this.usering=e):this.wxlogin=!1},tendShop:function(){var e=t.getStorageSync("usermen");e?t.navigateTo({url:"../../pagesII/tendShop/tendShop"}):(t.showToast({title:"请先登录",icon:"none"}),this.modaishow=!0)},tendShop1:function(){t.navigateTo({url:"../../pagesII/StoreInformation/StoreInformation"})},gotoAfter:function(){this.wxlogin?t.navigateTo({url:"../../pagesIII/navbar/navbar"}):t.showToast({title:"请先登录",icon:"none"})},ifUser2:function(){a?(t.showToast({title:"已登录",duration:2e3}),u("用户已经登陆"),this.wxlogin=!0,this.usering=a):(t.showToast({title:"登录失败",duration:2e3,icon:"none"}),this.wxlogin=!1)},init:function(){this.modaishow=!0},messcancel:function(){this.modaishow=!1},myOrder:function(){this.wxlogin?t.navigateTo({url:"../../pagesII/myOrder/myOrder?index=0"}):t.showToast({title:"请先登录",icon:"none"})},ToBePaid:function(){this.wxlogin?t.navigateTo({url:"../../pagesII/myOrder/myOrder?index=1"}):t.showToast({title:"请先登录",icon:"none"})},ToBeDelivered:function(){this.wxlogin?t.navigateTo({url:"../../pagesII/myOrder/myOrder?index=2"}):t.showToast({title:"请先登录",icon:"none"})},ToBeReceived:function(){this.wxlogin?t.navigateTo({url:"../../pagesII/myOrder/myOrder?index=3"}):t.showToast({title:"请先登录",icon:"none"})},href:function(e){var o={0:"",1:"../../pagesII/OrderStatistics/OrderStatistics",2:"../../pagesII/Evaluate/Evaluate",3:"../../pagesII/myCollection/myCollection",4:"../../pagesII/customerService/customerService",5:"../../pagesII/message/message",6:"../../pagesII/ruleDescription/ruleDescription",7:"../../pagesII/cooperation/cooperation",8:"../../pagesII/SetUp/SetUp"};5!=e&&6!=e&&7!=e?this.wxlogin?t.navigateTo({url:o[e]}):t.showToast({title:"请先登录",icon:"none"}):t.navigateTo({url:o[e]})},detail:function(){t.navigateTo({url:"../productDetail/productDetail"})},initNavigation:function(t){this.opacity=t.opacity,this.top=t.top},opacityChange:function(t){this.opacity=t.opacity},back:function(){t.navigateBack()}},onShow:function(){this.getMerchants(),this.getOrderData(),this.ifUser(),console.log("这里是onshow")},onPageScroll:function(t){this.scrollTop=t.scrollTop},onPullDownRefresh:function(){setTimeout((function(){t.stopPullDownRefresh()}),200)},onReachBottom:function(){}});e.default=r}).call(this,o("543d")["default"])}},[["6897","common/runtime","common/vendor"]]]);