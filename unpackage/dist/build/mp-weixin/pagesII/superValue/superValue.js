(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesII/superValue/superValue"],{"1ce9":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n("09cc"),i=n("0efb"),a=console,u=a.log,c=(t.getStorageSync("usermen"),{data:function(){return{url:"",title:"超值专区",hideing:0,num:0,ApproveStatus:0,imageUrl:"http://qg-qr.oss-cn-shenzhen.aliyuncs.com/test/1599787244002.png?Expires=1915147235&OSSAccessKeyId=LTAI4G74cnhsbDWNkfvuNew3&Signature=RgZDWac5E8rGYQ%2FFuUPRySaY5Mo%3D",rankBgUrl:"/static/images/paihangbang@2x.png",height:64,top:26,scrollH:0,opcity:0,iconOpcity:.5,bannerIndex:0,menuShow:!1,popupShow:!1,value:1,collected:!1,importData:[]}},onLoad:function(e){var n=this;t.setNavigationBarTitle({title:e.title}),this.getMerchants(),this.title=e.title,this.getImportData(),this.url=i.imgurl;var o={};o=wx.getMenuButtonBoundingClientRect(),setTimeout((function(){t.getSystemInfo({success:function(t){n.width=o.left||t.windowWidth,n.height=o.top?o.top+o.height+8:t.statusBarHeight+44,n.top=o.top?o.top+(o.height-32)/2:t.statusBarHeight+6,n.scrollH=t.windowWidth}})}),0)},methods:{getMerchants:function(){var e=this,n=t.getStorageSync("usermen");if(n){var a={token:n};(0,o.listing)(i.getClient,a).then((function(n){if(n.data.code&&200!=n.data.code)return t.showToast({title:n.data.msg,icon:"none"}),void t.switchTab({url:"../../pages/my/my"});e.ApproveStatus=n.data.data.approveStatus})).catch((function(t){u(t)}))}else this.ApproveStatus=0},onPullDownRefresh:function(){this.getImportData(),setTimeout((function(){t.stopPullDownRefresh()}),1e3)},getImportData:function(){var t=this;(0,o.listing2)(i.getselectSuper).then((function(e){t.importData=e.data.data})).catch((function(t){console.log(t)}))},gotoList:function(e){u(e),t.navigateTo({url:"../../pagesIII/productDetail/productDetail?id="+e})},gotoGun:function(){t.navigateTo({url:"../../pagesIII/demo/demo"})},menubtn:function(t){this.num=t},bannerChange:function(t){this.bannerIndex=t.detail.current},previewImage:function(e){var n=e.currentTarget.dataset.index;t.previewImage({current:this.banner[n],urls:this.banner})},back:function(){t.navigateBack()},openMenu:function(){this.menuShow=!0},closeMenu:function(){this.menuShow=!1},showPopup:function(){this.popupShow=!0},hidePopup:function(){this.popupShow=!1},change:function(t){this.value=t.value},collecting:function(){this.collected=!this.collected},common:function(){this.tui.toast("功能开发中~")},btnTopMenu:function(e){if(this.closeMenu(),4==e)t.makePhoneCall({phoneNumber:"10086"});else if(6==e)this.common();else{var n={0:"../message/message",1:"../mall/mall",2:"../my/my",3:"../shopcart/shopcart",5:"/pages/my/feedback/feedback?page=mall"}[e];n&&this.tui.href(n)}},submit:function(){this.popupShow=!1,t.navigateTo({url:"../submitOrder/submitOrder"})},coupon:function(){t.navigateTo({url:"../coupon/coupon"})},onShare:function(){}},onPageScroll:function(t){var e=t.scrollTop<=0?0:t.scrollTop,n=e/this.scrollH;this.opcity>=1&&n>=1||(this.opcity=n,this.iconOpcity=.5*(1-n<0?0:1-n))}});e.default=c}).call(this,n("543d")["default"])},"5f50":function(t,e,n){"use strict";n.r(e);var o=n("6e9c"),i=n("93dc");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("f09f");var u,c=n("f0c5"),s=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);e["default"]=s.exports},"6e9c":function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}));var i=function(){var t=this,e=t.$createElement;t._self._c},a=[]},"93dc":function(t,e,n){"use strict";n.r(e);var o=n("1ce9"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a},d199:function(t,e,n){},e2bd:function(t,e,n){"use strict";(function(t){n("abd2");o(n("66fd"));var e=o(n("5f50"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},f09f:function(t,e,n){"use strict";var o=n("d199"),i=n.n(o);i.a}},[["e2bd","common/runtime","common/vendor"]]]);