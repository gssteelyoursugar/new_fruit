(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesII/myOrder/myOrder"],{"25b6":function(t,e,a){},"4ef7":function(t,e,a){"use strict";a.r(e);var n=a("900d"),i=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);e["default"]=i.a},6390:function(t,e,a){"use strict";(function(t){a("a4d8");n(a("66fd"));var e=n(a("a029"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},"900d":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a("a6ff"),i=a("ca88"),r=t.getStorageSync("usermen"),o=console,u=o.log,s=a("3619"),c={data:function(){return{contactType:"contact",coundDownTime:"30000",loadStatus:"loading",payStatus:"",tradeStatus:"",timeList:300,tabs:[{name:"全部"},{name:"待发货"},{name:"待收货"},{name:"已完成"}],currentTab:null,pageIndex:1,loadding:!1,pullUpOn:!0,scrollTop:0,myOrderData:[],url:"",countDown:0,afterStatus:"",navHeight:64,isConfirm:!1,curConfirmId:""}},onLoad:function(e){0==e.index?(this.currentTab=parseInt(e.index),this.payStatus="",this.tradeStatus=""):1==e.index?(this.currentTab=parseInt(e.index),this.payStatus="1",this.tradeStatus="1,2,3"):2==e.index?(this.currentTab=parseInt(e.index),this.payStatus="1",this.tradeStatus="4,8"):3==e.index&&(this.currentTab=parseInt(e.index),this.payStatus="1",this.tradeStatus="6,7",this.afterStatus="11"),this.getOrderData();var a=t.getSystemInfoSync(),n=a.statusBarHeight,i=t.getMenuButtonBoundingClientRect(),r=i.top,o=(i.height,i.bottom),u=o-n+(r-n);this.navHeight=n+u+r-n},computed:{allData:function(){var t=this.myOrderData;return t},waitPay:function(){var t=this.myOrderData,e=[];return t.map((function(t){"0"==t.payStatus&&e.push(t)})),e},waitDeliver:function(){var t=this.myOrderData,e=[];return t.map((function(t){"1"!=t.tradeStatus&&"2"!=t.tradeStatus&&"3"!=t.tradeStatus||e.push(t)})),e},waitConfirm:function(){var t=this.myOrderData,e=[];return t.map((function(t){"1"!=t.payStatus||"4"!=t.tradeStatus&&"8"!=t.tradeStatus||e.push(t)})),e},done:function(){var t=this.myOrderData,e=[];return t.map((function(t){("6"==t.tradeStatus||"7"==t.tradeStatus&&"11"==t.afterStatus)&&e.push(t)})),e}},methods:{onSlide:function(t){},endOfTime:function(t){this.goCancel(t)},goDel:function(t){var e=this,a={id:t,token:r};(0,n.publicing)(i.postDelOrders,a).then((function(t){e.getOrderData(),e.$forceUpdate()})).catch((function(t){u(t)}))},goCancel:function(t){var e=this,a={id:t,token:r};(0,n.publicing)(i.postCancelPay,a).then((function(t){e.getOrderData(),e.$forceUpdate()})).catch((function(t){u(t)}))},payGo:function(e){var a=this;t.showModal({title:"提示",content:"确认支付",success:function(r){if(r.confirm){var o={orderNumber:e};(0,n.publicing)(i.postOrderPay,o).then((function(e){t.showToast({title:"".concat(e.data.msg),icon:"none",duration:2e3}),a.getOrderData(),a.$forceUpdate()})).catch((function(t){u(t)}))}else if(r.cancel)return void t.showToast({title:"已取消支付",icon:"none",duration:2e3})}})},toggleConfirm:function(t){"cancel_btn"!=t&&(this.curConfirmId=t),this.isConfirm=!this.isConfirm},goConfirm:function(){var e=this,a=t.getStorageSync("usermen"),r={id:this.curConfirmId,token:a};(0,n.publicing)(i.postConfirmOrder,r).then((function(a){if(a.data.code&&200!=a.data.code)return e.loadStatus="noMore",t.showToast({title:a.data.msg,icon:"none"}),void t.switchTab({url:"../../pages/my/my"});200==a.data.code?(t.showToast({title:"收货成功",duration:2e3}),e.isConfirm=!e.isConfirm,e.getOrderData()):t.showToast({title:a.data.msg,duration:2e3}),e.getOrderData(),e.$forceUpdate()})).catch((function(t){u(t)}))},buyAgain:function(e){t.navigateTo({url:"../../pagesIII/productDetail/productDetail?id="+e})},getOrderData:function(){var e=this,a={token:r,pageNo:this.pageIndex,pageSize:1e3,payStatus:this.payStatus,tradeStatus:this.tradeStatus,afterStatus:this.afterStatus};(0,n.listing)(i.getMyOrder,a).then((function(a){return a.data.code&&200!=a.data.code?(e.loadStatus="noMore",t.showToast({title:a.data.msg,icon:"none"}),void t.switchTab({url:"../../pages/my/my"})):0===a.data.data.length?(e.myOrderData=a.data.data,setTimeout((function(){e.loadStatus="noMore"}),1e3),void e.$forceUpdate()):(e.myOrderData=a.data.data,e.loadStatus="noMore",void e.$forceUpdate())})).catch((function(t){u(t)}))},clickToService:function(){t.navigateTo({url:"../../pagesII/customerService/customerService"})},clipboard:function(t){var e=t;s.getClipboardData(e,(function(t){}),t)},goAfter:function(e){t.navigateTo({url:"../../pagesIII/applyAfter/applyAfter?id="+e})},goAfterSaleDetail:function(e){t.navigateTo({url:"../../pagesIII/AfterSaleDetails/AfterSaleDetails?id="+e})},goAfterDetails:function(e){t.navigateTo({url:"../../pagesIII/afterDetails/afterDetails?id="+e})},change:function(t){this.currentTab=t.index,0==t.index?(this.currentTab=parseInt(t.index),this.payStatus="",this.tradeStatus=""):1==t.index?(this.currentTab=parseInt(t.index),this.payStatus="1",this.tradeStatus="1,2,3"):2==t.index?(this.currentTab=parseInt(t.index),this.payStatus="1",this.tradeStatus="4,8"):3==t.index&&(this.currentTab=parseInt(t.index),this.payStatus="1",this.tradeStatus="6,7",this.afterStatus="11"),this.getOrderData()},detail:function(e,a){5!=e&&t.navigateTo({url:"../../pagesIII/orderDetail/orderDetail?id="+a})}},onShow:function(){this.url=i.imgurl},onPullDownRefresh:function(){this.getOrderData(),setTimeout((function(){t.stopPullDownRefresh()}),500)},onReachBottom:function(){}};e.default=c}).call(this,a("543d")["default"])},a029:function(t,e,a){"use strict";a.r(e);var n=a("dede"),i=a("4ef7");for(var r in i)"default"!==r&&function(t){a.d(e,t,(function(){return i[t]}))}(r);a("e48a");var o,u=a("f0c5"),s=Object(u["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);e["default"]=s.exports},dede:function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return n}));var n={tuiTabs:function(){return a.e("components/tui-tabs/tui-tabs").then(a.bind(null,"c4a3"))},wybSlideListener:function(){return a.e("components/wyb-slide-listener/wyb-slide-listener").then(a.bind(null,"9916"))},tuiListCell:function(){return a.e("components/tui-list-cell/tui-list-cell").then(a.bind(null,"9a71"))},tuiButton:function(){return a.e("components/tui-button/tui-button").then(a.bind(null,"869b"))},uniLoadMore:function(){return a.e("components/uni-load-more/uni-load-more").then(a.bind(null,"18a2"))}},i=function(){var t=this,e=t.$createElement;t._self._c},r=[]},e48a:function(t,e,a){"use strict";var n=a("25b6"),i=a.n(n);i.a}},[["6390","common/runtime","common/vendor"]]]);