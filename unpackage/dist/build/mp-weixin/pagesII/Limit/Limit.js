(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesII/Limit/Limit"],{"0880":function(t,n,e){"use strict";e.r(n);var i=e("667d"),a=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);n["default"]=a.a},2826:function(t,n,e){"use strict";e.r(n);var i=e("dbc1"),a=e("0880");for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);e("f6f5");var u,c=e("f0c5"),s=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],u);n["default"]=s.exports},"667d":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=e("a6ff"),a=e("ca88"),o=console,u=o.log,c=(t.getStorageSync("usermen"),{data:function(){return{loading:!1,active:!0,url:"",LimitData:{},LimitDataList:[],hideing:0,num:0,ApproveStatus:0,ranking:["销量榜","评价榜","关注榜","回购榜"],imageUrl:"/static/images/limit-1.png",rankBgUrl:"/static/images/paihangbang@2x.png",height:64,top:26,scrollH:0,opcity:0,iconOpcity:.5,bannerIndex:0,menuShow:!1,popupShow:!1,value:1,collected:!1,WxActivityID:"",startTime:0,endTime:0,createTime:0,ts:0,te:3,boxHeight:44,statusHeight:20,navHeight:64,scrollTop:0,activityStatus:""}},onLoad:function(n){this.getMerchants(),this.WxActivityID=n.id,this.getLimit(),this.url=a.imgurl,this.getLimit();var e=this;setTimeout((function(){e.loading=!0}),500);var i=t.getSystemInfoSync(),o=i.statusBarHeight,u=t.getMenuButtonBoundingClientRect(),c=u.top,s=u.bottom;this.statusHeight=o;var r=s-o+(c-o),l=o+r+c-o;this.boxHeight=l-o,this.navHeight=l},computed:{},methods:{getMerchants:function(){var n=this,e=t.getStorageSync("usermen");if(e){var o={token:e};(0,i.listing)(a.getClient,o).then((function(t){n.ApproveStatus=t.data.data.approveStatus})).catch((function(t){u(t)}))}else this.ApproveStatus=0},scroll:function(t){},gotoList:function(n){t.navigateTo({url:"../../pagesIII/productDetail/productDetail?id="+n})},showTipsOnData:function(n){"3"!=this.activityStatus?0!==n||t.showToast({title:"该商品抢完啦!",icon:"none"}):t.showToast({title:"活动结束啦!",icon:"none"})},endOfTime:function(){},onPullDownRefresh:function(){this.getLimit(),setTimeout((function(){t.stopPullDownRefresh()}),1e3)},getLimit:function(){var t=this,n={pageNo:1,pageSize:10,id:this.WxActivityID};(0,i.listing2)(a.getActivity,n).then((function(n){t.LimitData=n.data.data,t.LimitDataList=n.data.data.list,t.activityStatus=n.data.data.status,t.startTime=n.data.data.startTime,t.endTime=n.data.data.endTime,t.createTime=n.data.data.createTime,t.ts=(t.endTime-t.createTime)/1e3,t.dd=parseInt(t.ts/60/60/24,10),t.hh=parseInt(t.ts/60/60%24,10),t.mm=parseInt(t.ts/60%60),t.ss=parseInt(t.ts%60,10)})).catch((function(t){u(t)}))},gotoGun:function(){t.navigateTo({url:"../../pagesIII/demo/demo"})},menubtn:function(t){this.num=t},bannerChange:function(t){this.bannerIndex=t.detail.current},previewImage:function(n){var e=n.currentTarget.dataset.index;t.previewImage({current:this.banner[e],urls:this.banner})},back:function(){t.navigateBack()},openMenu:function(){this.menuShow=!0},closeMenu:function(){this.menuShow=!1},showPopup:function(){this.popupShow=!0},hidePopup:function(){this.popupShow=!1},change:function(t){this.value=t.value},collecting:function(){this.collected=!this.collected},common:function(){this.tui.toast("功能开发中~")},btnTopMenu:function(n){if(this.closeMenu(),4==n)t.makePhoneCall({phoneNumber:"10086"});else if(6==n)this.common();else{var e={0:"../message/message",1:"../mall/mall",2:"../my/my",3:"../shopcart/shopcart",5:"/pages/my/feedback/feedback?page=mall"}[n];e&&this.tui.href(e)}},submit:function(){this.popupShow=!1,t.navigateTo({url:"../submitOrder/submitOrder"})},coupon:function(){t.navigateTo({url:"../coupon/coupon"})},onShare:function(){}},onPageScroll:function(t){var n=t.scrollTop<=0?0:t.scrollTop,e=n/this.scrollH;this.opcity>=1&&e>=1||(this.opcity=e,this.iconOpcity=.5*(1-e<0?0:1-e))}});n.default=c}).call(this,e("543d")["default"])},cd63:function(t,n,e){"use strict";(function(t){e("a4d8");i(e("66fd"));var n=i(e("2826"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},dbc1:function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return i}));var i={tuiCountdown:function(){return e.e("components/tui-countdown/tui-countdown").then(e.bind(null,"69a1"))}},a=function(){var t=this,n=t.$createElement;t._self._c},o=[]},ec15:function(t,n,e){},f6f5:function(t,n,e){"use strict";var i=e("ec15"),a=e.n(i);a.a}},[["cd63","common/runtime","common/vendor"]]]);