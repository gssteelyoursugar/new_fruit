(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesII/myOrder/myOrder"],{1055:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("09cc"),i=n("0efb"),r=t.getStorageSync("usermen"),u=console,o=u.log,s=n("bb55"),c={data:function(){return{contactType:"contact",coundDownTime:"30000",loadStatus:"loading",payStatus:"",tradeStatus:"",timeList:300,tabs:[{name:"全部"},{name:"待发货"},{name:"待收货"},{name:"已完成"}],currentTab:null,pageIndex:1,loadding:!1,pullUpOn:!0,scrollTop:0,myOrderData:[],url:"",countDown:0,afterStatus:""}},onLoad:function(t){0==t.index?(this.currentTab=parseInt(t.index),this.payStatus="",this.tradeStatus=""):1==t.index?(this.currentTab=parseInt(t.index),this.payStatus="1",this.tradeStatus="1,2,3"):2==t.index?(this.currentTab=parseInt(t.index),this.payStatus="1",this.tradeStatus="4,8"):3==t.index&&(this.currentTab=parseInt(t.index),this.payStatus="1",this.tradeStatus="6,7",this.afterStatus="11"),this.getOrderData()},computed:{allData:function(){var t=this.myOrderData;return t},waitPay:function(){var t=this.myOrderData,e=[];return t.map((function(t){"0"==t.payStatus&&e.push(t)})),e},waitDeliver:function(){var t=this.myOrderData,e=[];return t.map((function(t){"1"!=t.tradeStatus&&"2"!=t.tradeStatus&&"3"!=t.tradeStatus||e.push(t)})),e},waitConfirm:function(){var t=this.myOrderData,e=[];return t.map((function(t){"1"!=t.payStatus||"4"!=t.tradeStatus&&"8"!=t.tradeStatus||e.push(t)})),e},done:function(){var t=this.myOrderData,e=[];return t.map((function(t){("6"==t.tradeStatus||"7"==t.tradeStatus&&"11"==t.afterStatus)&&e.push(t)})),e}},methods:{onSlide:function(t){console.log(t)},endOfTime:function(t){this.goCancel(t)},goDel:function(t){var e=this;o(t);var n={id:t,token:r};(0,a.publicing)(i.postDelOrders,n).then((function(t){o(t),e.getOrderData(),e.$forceUpdate()})).catch((function(t){o(t)}))},goCancel:function(t){var e=this;o(t);var n={id:t,token:r};(0,a.publicing)(i.postCancelPay,n).then((function(t){o(t),e.getOrderData(),e.$forceUpdate()})).catch((function(t){o(t)}))},payGo:function(e){var n=this;t.showModal({title:"提示",content:"确认支付",success:function(r){if(r.confirm){var u={orderNumber:e};(0,a.publicing)(i.postOrderPay,u).then((function(e){o(e),t.showToast({title:"".concat(e.data.msg),icon:"none",duration:2e3}),n.getOrderData(),n.$forceUpdate()})).catch((function(t){o(t)}))}else if(r.cancel)return void t.showToast({title:"已取消支付",icon:"none",duration:2e3})}})},goConfirm:function(t){var e=this;o(t);var n={id:t,token:r};(0,a.publicing)(i.postConfirmOrder,n).then((function(t){o(t),e.getOrderData(),e.$forceUpdate()})).catch((function(t){o(t)}))},buyAgain:function(e){o(e),t.navigateTo({url:"../../pagesIII/productDetail/productDetail?id="+e})},getOrderData:function(){var t=this,e={token:r,pageNo:this.pageIndex,pageSize:1e3,payStatus:this.payStatus,tradeStatus:this.tradeStatus,afterStatus:this.afterStatus};(0,a.listing)(i.getMyOrder,e).then((function(e){if(o(e.data.data),0===e.data.data.length)return t.myOrderData=e.data.data,setTimeout((function(){t.loadStatus="noMore"}),1e3),void t.$forceUpdate();t.myOrderData=e.data.data,t.loadStatus="noMore",t.$forceUpdate()})).catch((function(t){o(t)}))},clickToService:function(){t.navigateTo({url:"../../pagesII/customerService/customerService"})},clipboard:function(t){var e=t;s.getClipboardData(e,(function(t){}),t)},goAfter:function(e){t.navigateTo({url:"../../pagesIII/applyAfter/applyAfter?id="+e})},goAfterSaleDetail:function(e){t.navigateTo({url:"../../pagesIII/AfterSaleDetails/AfterSaleDetails?id="+e})},goAfterDetails:function(e){t.navigateTo({url:"../../pagesIII/afterDetails/afterDetails?id="+e})},change:function(t){this.currentTab=t.index,0==t.index?(this.currentTab=parseInt(t.index),this.payStatus="",this.tradeStatus=""):1==t.index?(this.currentTab=parseInt(t.index),this.payStatus="1",this.tradeStatus="1,2,3"):2==t.index?(this.currentTab=parseInt(t.index),this.payStatus="1",this.tradeStatus="4,8"):3==t.index&&(this.currentTab=parseInt(t.index),this.payStatus="1",this.tradeStatus="6,7",this.afterStatus="11"),this.getOrderData()},detail:function(e,n){5!=e&&t.navigateTo({url:"../../pagesIII/orderDetail/orderDetail?id="+n})}},onShow:function(){this.url=i.imgurl},onPullDownRefresh:function(){setTimeout((function(){t.stopPullDownRefresh()}),500)},onReachBottom:function(){}};e.default=c}).call(this,n("543d")["default"])},2121:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}));var a={tuiTabs:function(){return n.e("components/tui-tabs/tui-tabs").then(n.bind(null,"b958"))},wybSlideListener:function(){return n.e("components/wyb-slide-listener/wyb-slide-listener").then(n.bind(null,"380f"))},tuiListCell:function(){return n.e("components/tui-list-cell/tui-list-cell").then(n.bind(null,"174d"))},tuiButton:function(){return n.e("components/tui-button/tui-button").then(n.bind(null,"a5c6"))},uniLoadMore:function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"b6f8"))}},i=function(){var t=this,e=t.$createElement;t._self._c},r=[]},"39cb":function(t,e,n){"use strict";(function(t){n("abd2");a(n("66fd"));var e=a(n("b56c"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},6128:function(t,e,n){"use strict";var a=n("8de3"),i=n.n(a);i.a},6231:function(t,e,n){"use strict";n.r(e);var a=n("1055"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},"8de3":function(t,e,n){},b56c:function(t,e,n){"use strict";n.r(e);var a=n("2121"),i=n("6231");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("6128");var u,o=n("f0c5"),s=Object(o["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);e["default"]=s.exports}},[["39cb","common/runtime","common/vendor"]]]);