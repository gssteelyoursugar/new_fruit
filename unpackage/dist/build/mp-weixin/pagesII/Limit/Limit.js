(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesII/Limit/Limit"],{"031e":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=e("09cc"),o=e("0efb"),a=console,c=a.log,u={data:function(){return{loading:!1,active:!0,url:"",LimitData:{},LimitDataList:[],hideing:0,num:0,ranking:["销量榜","评价榜","关注榜","回购榜"],imageUrl:"/static/images/limit.png",rankBgUrl:"/static/images/paihangbang@2x.png",height:64,top:26,scrollH:0,opcity:0,iconOpcity:.5,bannerIndex:0,menuShow:!1,popupShow:!1,value:1,collected:!1,WxActivityID:"",startTime:0,endTime:0,createTime:0,ts:0,te:3,boxHeight:44,statusHeight:20,navHeight:64,scrollTop:0}},onLoad:function(n){this.WxActivityID=n.id,this.getLimit(),this.url=o.imgurl,this.getLimit();var e=this;setTimeout((function(){e.loading=!0}),500);var i=t.getSystemInfoSync(),a=i.statusBarHeight,c=t.getMenuButtonBoundingClientRect(),u=c.top,s=c.bottom;this.statusHeight=a;var r=s-a+(u-a),l=a+r+u-a;this.boxHeight=l-a,this.navHeight=l,console.log(a,l,r)},computed:{},methods:{scroll:function(t){console.log(t)},gotoList:function(n){c(n),t.navigateTo({url:"../../pagesIII/productDetail/productDetail?id="+n})},endOfTime:function(){console.log("倒计时结束")},onPullDownRefresh:function(){this.getLimit(),console.log("refresh"),setTimeout((function(){t.stopPullDownRefresh()}),1e3)},getLimit:function(){var t=this,n={pageNo:1,pageSize:10,id:this.WxActivityID};(0,i.listing2)(o.getActivity,n).then((function(n){c(n),t.LimitData=n.data.data,t.LimitDataList=n.data.data.list,t.startTime=n.data.data.startTime,t.endTime=n.data.data.endTime,t.createTime=n.data.data.createTime,t.ts=(t.endTime-t.createTime)/1e3,t.dd=parseInt(t.ts/60/60/24,10),t.hh=parseInt(t.ts/60/60%24,10),t.mm=parseInt(t.ts/60%60),t.ss=parseInt(t.ts%60,10),c(t.dd+"天"+t.hh+"时"+t.mm+"分"+t.ss+"秒")})).catch((function(t){c(t)}))},gotoGun:function(){t.navigateTo({url:"../../pagesIII/demo/demo"})},menubtn:function(t){this.num=t,console.log(this.num)},bannerChange:function(t){this.bannerIndex=t.detail.current},previewImage:function(n){var e=n.currentTarget.dataset.index;t.previewImage({current:this.banner[e],urls:this.banner})},back:function(){t.navigateBack()},openMenu:function(){this.menuShow=!0},closeMenu:function(){this.menuShow=!1},showPopup:function(){this.popupShow=!0},hidePopup:function(){this.popupShow=!1},change:function(t){this.value=t.value},collecting:function(){this.collected=!this.collected},common:function(){this.tui.toast("功能开发中~")},btnTopMenu:function(n){if(this.closeMenu(),4==n)t.makePhoneCall({phoneNumber:"10086"});else if(6==n)this.common();else{var e={0:"../message/message",1:"../mall/mall",2:"../my/my",3:"../shopcart/shopcart",5:"/pages/my/feedback/feedback?page=mall"}[n];e&&this.tui.href(e)}},submit:function(){this.popupShow=!1,t.navigateTo({url:"../submitOrder/submitOrder"})},coupon:function(){t.navigateTo({url:"../coupon/coupon"})},onShare:function(){}},onPageScroll:function(t){var n=t.scrollTop<=0?0:t.scrollTop,e=n/this.scrollH;this.opcity>=1&&e>=1||(this.opcity=e,this.iconOpcity=.5*(1-e<0?0:1-e))}};n.default=u}).call(this,e("543d")["default"])},"09ef":function(t,n,e){},"2cc8":function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i}));var i={tuiIcon:function(){return e.e("components/tui-icon/tui-icon").then(e.bind(null,"f464"))},tuiCountdown:function(){return e.e("components/tui-countdown/tui-countdown").then(e.bind(null,"a045"))}},o=function(){var t=this,n=t.$createElement;t._self._c},a=[]},"33ce":function(t,n,e){"use strict";(function(t){e("abd2");i(e("66fd"));var n=i(e("cf59"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"6ada":function(t,n,e){"use strict";e.r(n);var i=e("031e"),o=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=o.a},cf59:function(t,n,e){"use strict";e.r(n);var i=e("2cc8"),o=e("6ada");for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);e("f67e");var c,u=e("f0c5"),s=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],c);n["default"]=s.exports},f67e:function(t,n,e){"use strict";var i=e("09ef"),o=e.n(i);o.a}},[["33ce","common/runtime","common/vendor"]]]);