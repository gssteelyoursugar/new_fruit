(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesII/kingarea/kingarea"],{"56ae":function(t,n,e){},8259:function(t,n,e){"use strict";var o=e("56ae"),i=e.n(o);i.a},"8a58":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=e("09cc"),i=e("0efb"),u=console,a=u.log,c={data:function(){return{url:"",title:"进口水果",hideing:0,num:0,imageUrl:"/static/images/limit@2x.png",rankBgUrl:"/static/images/paihangbang@2x.png",height:64,top:26,scrollH:0,opcity:0,iconOpcity:.5,bannerIndex:0,menuShow:!1,popupShow:!1,value:1,collected:!1,importData:[]}},onLoad:function(n){var e=this;this.title=n.title,this.getImportData(),this.url=i.imgurl;var o={};o=wx.getMenuButtonBoundingClientRect(),setTimeout((function(){t.getSystemInfo({success:function(t){e.width=o.left||t.windowWidth,e.height=o.top?o.top+o.height+8:t.statusBarHeight+44,e.top=o.top?o.top+(o.height-32)/2:t.statusBarHeight+6,e.scrollH=t.windowWidth}})}),0)},methods:{getImportData:function(){var t=this;(0,o.listing2)(i.getselectImport).then((function(n){console.log(n),t.importData=n.data.data})).catch((function(t){console.log(t)}))},gotoList:function(n){a(n),t.navigateTo({url:"../../pagesIII/productDetail/productDetail?id="+n})},gotoGun:function(){t.navigateTo({url:"../../pagesIII/demo/demo"})},menubtn:function(t){this.num=t,console.log(this.num)},bannerChange:function(t){this.bannerIndex=t.detail.current},previewImage:function(n){var e=n.currentTarget.dataset.index;t.previewImage({current:this.banner[e],urls:this.banner})},back:function(){t.navigateBack()},openMenu:function(){this.menuShow=!0},closeMenu:function(){this.menuShow=!1},showPopup:function(){this.popupShow=!0},hidePopup:function(){this.popupShow=!1},change:function(t){this.value=t.value},collecting:function(){this.collected=!this.collected},common:function(){this.tui.toast("功能开发中~")},btnTopMenu:function(n){if(this.closeMenu(),4==n)t.makePhoneCall({phoneNumber:"10086"});else if(6==n)this.common();else{var e={0:"../message/message",1:"../mall/mall",2:"../my/my",3:"../shopcart/shopcart",5:"/pages/my/feedback/feedback?page=mall"}[n];e&&this.tui.href(e)}},submit:function(){this.popupShow=!1,t.navigateTo({url:"../submitOrder/submitOrder"})},coupon:function(){t.navigateTo({url:"../coupon/coupon"})},onShare:function(){}},onPageScroll:function(t){var n=t.scrollTop<=0?0:t.scrollTop,e=n/this.scrollH;this.opcity>=1&&e>=1||(this.opcity=e,this.iconOpcity=.5*(1-e<0?0:1-e))}};n.default=c}).call(this,e("543d")["default"])},b9e3:function(t,n,e){"use strict";e.r(n);var o=e("8a58"),i=e.n(o);for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);n["default"]=i.a},e4b8:function(t,n,e){"use strict";e.r(n);var o=e("eb47"),i=e("b9e3");for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);e("8259");var a,c=e("f0c5"),r=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);n["default"]=r.exports},eb47:function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return o}));var o={tuiIcon:function(){return e.e("components/tui-icon/tui-icon").then(e.bind(null,"f464"))}},i=function(){var t=this,n=t.$createElement;t._self._c},u=[]},fcd3:function(t,n,e){"use strict";(function(t){e("abd2");o(e("66fd"));var n=o(e("e4b8"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])}},[["fcd3","common/runtime","common/vendor"]]]);