(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesII/rankingList/rankingList"],{"1bcb":function(t,n,e){"use strict";var o=e("a440"),i=e.n(o);i.a},"44bb":function(t,n,e){"use strict";e.r(n);var o=e("5c4c"),i=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);n["default"]=i.a},"5c4c":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=e("09cc"),i=e("0efb"),a=t.getStorageSync("usermen"),u=console,c=u.log,r={data:function(){return{rankColor:["#FF5C00","#9AA8BB","#C8AA8D","#E3E3E3","#E3E3E3","#E3E3E3","#E3E3E3","#E3E3E3","#E3E3E3","#E3E3E3"],url:"",goodList:[],hideing:0,num:0,ranking:[{value:"shop",name:"销量榜"},{value:"praise",name:"评价榜"},{value:"follow",name:"关注榜"},{value:"back",name:"复购榜"}],imageUrl:"/static/images/paihang@2x.png",rankBgUrl:"/static/images/paihangbang@2x.png",height:64,top:26,scrollH:0,opcity:0,iconOpcity:.5,bannerIndex:0,menuShow:!1,popupShow:!1,value:1,collected:!1,valueText:"",ApproveStatus:0}},onLoad:function(n){var e=this;this.getMerchants(),this.url=i.imgurl;var o={options:n};this.menubtn(parseInt(n.index),n.value),o=wx.getMenuButtonBoundingClientRect(),setTimeout((function(){t.getSystemInfo({success:function(t){e.width=o.left||t.windowWidth,e.height=o.top?o.top+o.height+8:t.statusBarHeight+44,e.top=o.top?o.top+(o.height-32)/2:t.statusBarHeight+6,e.scrollH=t.windowWidth}})}),0)},computed:{currMonth:function(){return(new Date).getMonth()+1},currDay:function(){return(new Date).getDate()}},filters:{filterNum:function(t){if(t<1)return t;var n=Math.floor(t)+"",e=n.split(""),o=["","个","十","百","千","万","万","万","万","亿"];return e.length<=4?n:5===e.length?"0"!==e[1]?e[0]+"."+e[1]+o[e.length]:e[0]+""+o[e.length]:6===e.length?"0"!==e[2]?e[0]+e[1]+"."+e[2]+o[e.length]:e[0]+e[1]+""+o[e.length]:7===e.length?"0"!==e[3]?e[0]+e[1]+e[2]+"."+e[3]+o[e.length]:e[0]+e[1]+e[2]+""+o[e.length]:8===e.length?"0"!==e[4]?e[0]+e[1]+e[2]+e[3]+"."+e[4]+o[e.length]:e[0]+e[1]+e[2]+e[3]+""+o[e.length]:9===e.length?"0"!==e[1]?e[0]+"."+e[1]+o[e.length]:e[0]+""+o[e.length]:void 0}},methods:{getMerchants:function(){var t=this,n={token:a};(0,o.listing)(i.getClient,n).then((function(n){t.ApproveStatus=n.data.data.approveStatus})).catch((function(t){c(t)}))},onPullDownRefresh:function(){this.postRanking(),setTimeout((function(){t.stopPullDownRefresh()}),1e3)},gotoList:function(n){t.navigateTo({url:"../../pagesIII/productDetail/productDetail?id="+n})},postRanking:function(){var n=this;t.showLoading({});var e=this.valueText,a={value:e,pageNo:1,pageSize:1e4};(0,o.publicing)(i.postOrder,a).then((function(t){c(t),n.goodList=t.data.data})).catch((function(t){})),t.hideLoading()},menubtn:function(t,n){this.valueText=n,this.num=t,this.postRanking()},previewImage:function(n){var e=n.currentTarget.dataset.index;t.previewImage({current:this.banner[e],urls:this.banner})},back:function(){t.navigateBack()},openMenu:function(){this.menuShow=!0},closeMenu:function(){this.menuShow=!1},showPopup:function(){this.popupShow=!0},hidePopup:function(){this.popupShow=!1},change:function(t){this.value=t.value},collecting:function(){this.collected=!this.collected},common:function(){this.tui.toast("功能开发中~")},btnTopMenu:function(n){if(this.closeMenu(),4==n)t.makePhoneCall({phoneNumber:"10086"});else if(6==n)this.common();else{var e={0:"../message/message",1:"../mall/mall",2:"../my/my",3:"../shopcart/shopcart",5:"/pages/my/feedback/feedback?page=mall"}[n];e&&this.tui.href(e)}},coupon:function(){},onShare:function(){}},onPageScroll:function(t){var n=t.scrollTop<=0?0:t.scrollTop,e=n/this.scrollH;this.opcity>=1&&e>=1||(this.opcity=e,this.iconOpcity=.5*(1-e<0?0:1-e))}};n.default=r}).call(this,e("543d")["default"])},"940b":function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return o}));var o={tuiIcon:function(){return e.e("components/tui-icon/tui-icon").then(e.bind(null,"f464"))}},i=function(){var t=this,n=t.$createElement,e=(t._self._c,t.__map(t.goodList,(function(n,e){var o=t.__get_orig(n),i=t._f("filterNum")(n.totalPrice||0);return{$orig:o,f0:i}}))),o=t.__map(t.goodList,(function(n,e){var o=t.__get_orig(n),i=t._f("filterNum")(n.praise_number||0);return{$orig:o,f1:i}}));t.$mp.data=Object.assign({},{$root:{l0:e,l1:o}})},a=[]},"9b6a":function(t,n,e){"use strict";(function(t){e("abd2");o(e("66fd"));var n=o(e("caba"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},a440:function(t,n,e){},caba:function(t,n,e){"use strict";e.r(n);var o=e("940b"),i=e("44bb");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e("1bcb");var u,c=e("f0c5"),r=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);n["default"]=r.exports}},[["9b6a","common/runtime","common/vendor"]]]);