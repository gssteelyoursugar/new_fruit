(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesII/fruitList/fruitList"],{1828:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=e("a6ff"),o=e("ca88"),a=(t.getStorageSync("usermen"),console),u=a.log,c={data:function(){return{infoList:[],GoodsData:[],url:"",ApproveStatus:0,preferdata:[{image:"/static/images/youzi@3x.png"},{image:"/static/images/youzi@3x.png"},{image:"/static/images/youzi@3x.png"},{image:"/static/images/youzi@3x.png"}],hideing:0,num:0,ranking:["销量榜","评价榜","关注榜","回购榜"],imageUrl:"/static/images/shangxin@3x.png",height:64,top:26,scrollH:0,opcity:0,iconOpcity:.5,bannerIndex:0,menuShow:!1,popupShow:!1,value:1,collected:!1}},onLoad:function(n){var e=this;this.getMerchants(),this.url=o.imgurl,this.getGoodsAll();var i={};i=wx.getMenuButtonBoundingClientRect(),setTimeout((function(){t.getSystemInfo({success:function(t){e.width=i.left||t.windowWidth,e.height=i.top?i.top+i.height+8:t.statusBarHeight+44,e.top=i.top?i.top+(i.height-32)/2:t.statusBarHeight+6,e.scrollH=t.windowWidth}})}),0)},onPullDownRefresh:function(){this.getGoodsAll(),setTimeout((function(){t.stopPullDownRefresh()}),1e3)},methods:{getMerchants:function(){var n=this,e=t.getStorageSync("usermen");if(e){var a={token:e};(0,i.listing)(o.getClient,a).then((function(t){n.ApproveStatus=t.data.data.approveStatus})).catch((function(t){u(t)}))}else this.ApproveStatus=0},getGoodsAll:function(){var t=this,n={pageNo:1,pageSize:1e4};(0,i.listing2)(o.getNewsAll,n).then((function(n){t.infoList=n.data.data.imgage,t.GoodsData=n.data.data.goods})).catch((function(t){u(t)}))},gotoList:function(n){t.navigateTo({url:"../../pagesIII/productDetail/productDetail?id="+n})},goToInfo:function(n){t.navigateTo({url:"../../pagesII/prediction/prediction?id="+n})},menubtn:function(t){this.num=t},bannerChange:function(t){this.bannerIndex=t.detail.current},previewImage:function(n){var e=n.currentTarget.dataset.index;t.previewImage({current:this.banner[e],urls:this.banner})},back:function(){t.navigateBack()},openMenu:function(){this.menuShow=!0},closeMenu:function(){this.menuShow=!1},showPopup:function(){this.popupShow=!0},hidePopup:function(){this.popupShow=!1},change:function(t){this.value=t.value},collecting:function(){this.collected=!this.collected},common:function(){this.tui.toast("功能开发中~")},btnTopMenu:function(n){if(this.closeMenu(),4==n)t.makePhoneCall({phoneNumber:"10086"});else if(6==n)this.common();else{var e={0:"../message/message",1:"../mall/mall",2:"../my/my",3:"../shopcart/shopcart",5:"/pages/my/feedback/feedback?page=mall"}[n];e&&this.tui.href(e)}},submit:function(){this.popupShow=!1,t.navigateTo({url:"../submitOrder/submitOrder"})},coupon:function(){t.navigateTo({url:"../coupon/coupon"})},onShare:function(){}},onPageScroll:function(t){var n=t.scrollTop<=0?0:t.scrollTop,e=n/this.scrollH;this.opcity>=1&&e>=1||(this.opcity=e,this.iconOpcity=.5*(1-e<0?0:1-e))}};n.default=c}).call(this,e("543d")["default"])},"2eb2":function(t,n,e){"use strict";(function(t){e("a4d8");i(e("66fd"));var n=i(e("a079"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"302a":function(t,n,e){"use strict";e.r(n);var i=e("1828"),o=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=o.a},a079:function(t,n,e){"use strict";e.r(n);var i=e("cc33"),o=e("302a");for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);e("f602");var u,c=e("f0c5"),s=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],u);n["default"]=s.exports},cc33:function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i}));var i={tuiIcon:function(){return e.e("components/tui-icon/tui-icon").then(e.bind(null,"eeeb"))}},o=function(){var t=this,n=t.$createElement;t._self._c},a=[]},de34:function(t,n,e){},f602:function(t,n,e){"use strict";var i=e("de34"),o=e.n(i);o.a}},[["2eb2","common/runtime","common/vendor"]]]);