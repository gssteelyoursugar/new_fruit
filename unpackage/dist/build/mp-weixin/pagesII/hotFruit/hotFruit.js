(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesII/hotFruit/hotFruit"],{2576:function(t,n,e){"use strict";e.r(n);var o=e("d8d4"),i=e.n(o);for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);n["default"]=i.a},"573e":function(t,n,e){"use strict";e.r(n);var o=e("ab1d"),i=e("2576");for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);e("7201");var c,a=e("f0c5"),s=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);n["default"]=s.exports},"62bf":function(t,n,e){"use strict";(function(t){e("abd2");o(e("66fd"));var n=o(e("573e"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"6e6c":function(t,n,e){},7201:function(t,n,e){"use strict";var o=e("6e6c"),i=e.n(o);i.a},ab1d:function(t,n,e){"use strict";var o;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return o}));var i=function(){var t=this,n=t.$createElement;t._self._c},u=[]},d8d4:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=e("09cc"),i=e("0efb"),u=console,c=u.log,a={data:function(){return{url:"",title:"热门品种",hideing:0,num:0,imageUrl:"http://qg-qr.oss-cn-shenzhen.aliyuncs.com/test/1599787275218.png?Expires=1915147267&OSSAccessKeyId=LTAI4G74cnhsbDWNkfvuNew3&Signature=qy5G7B2cGleaAAiI9I9YTcnNXhY%3D",rankBgUrl:"/static/images/paihangbang@2x.png",height:64,top:26,scrollH:0,opcity:0,iconOpcity:.5,bannerIndex:0,menuShow:!1,popupShow:!1,value:1,collected:!1,importData:[]}},onLoad:function(n){var e=this;this.title=n.title,this.getImportData(),this.url=i.imgurl;var o={};o=wx.getMenuButtonBoundingClientRect(),setTimeout((function(){t.getSystemInfo({success:function(t){e.width=o.left||t.windowWidth,e.height=o.top?o.top+o.height+8:t.statusBarHeight+44,e.top=o.top?o.top+(o.height-32)/2:t.statusBarHeight+6,e.scrollH=t.windowWidth}})}),0)},methods:{onPullDownRefresh:function(){this.getImportData(),console.log("refresh"),setTimeout((function(){t.stopPullDownRefresh()}),1e3)},getImportData:function(){var t=this;(0,o.listing2)(i.getselectHot).then((function(n){console.log(n),t.importData=n.data.data})).catch((function(t){console.log(t)}))},gotoList:function(n){c(n),t.navigateTo({url:"../../pagesIII/productDetail/productDetail?id="+n})},gotoGun:function(){t.navigateTo({url:"../../pagesIII/demo/demo"})},menubtn:function(t){this.num=t,console.log(this.num)},bannerChange:function(t){this.bannerIndex=t.detail.current},previewImage:function(n){var e=n.currentTarget.dataset.index;t.previewImage({current:this.banner[e],urls:this.banner})},back:function(){t.navigateBack()},openMenu:function(){this.menuShow=!0},closeMenu:function(){this.menuShow=!1},showPopup:function(){this.popupShow=!0},hidePopup:function(){this.popupShow=!1},change:function(t){this.value=t.value},collecting:function(){this.collected=!this.collected},common:function(){this.tui.toast("功能开发中~")},btnTopMenu:function(n){if(this.closeMenu(),4==n)t.makePhoneCall({phoneNumber:"10086"});else if(6==n)this.common();else{var e={0:"../message/message",1:"../mall/mall",2:"../my/my",3:"../shopcart/shopcart",5:"/pages/my/feedback/feedback?page=mall"}[n];e&&this.tui.href(e)}},submit:function(){this.popupShow=!1,t.navigateTo({url:"../submitOrder/submitOrder"})},coupon:function(){t.navigateTo({url:"../coupon/coupon"})},onShare:function(){}},onPageScroll:function(t){var n=t.scrollTop<=0?0:t.scrollTop,e=n/this.scrollH;this.opcity>=1&&e>=1||(this.opcity=e,this.iconOpcity=.5*(1-e<0?0:1-e))}};n.default=a}).call(this,e("543d")["default"])}},[["62bf","common/runtime","common/vendor"]]]);