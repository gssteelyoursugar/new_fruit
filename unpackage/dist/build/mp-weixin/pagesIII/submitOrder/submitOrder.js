(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesIII/submitOrder/submitOrder"],{"0c5e":function(t,n,e){},"51b3":function(t,n,e){"use strict";e.r(n);var a=e("a4be"),o=e("638e");for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);e("c75d");var r,u=e("f0c5"),c=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);n["default"]=c.exports},"638e":function(t,n,e){"use strict";e.r(n);var a=e("9c01"),o=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);n["default"]=o.a},"9c01":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=e("09cc"),o=e("0efb"),i=(t.getStorageSync("usermen"),console),r=i.log,u={components:{},data:function(){return{payUrl:"",isTop:!0,ids:"",goodsData:[],hasCoupon:!0,insufficient:!1,show:!1,extraUserInfo:{},totalPrice:{},ids2:"",orderNumber:"",extraData:{},idList:"",url:"",name:"arrowright",unit:"rpx",size:32,color:"#000",margin:"0"}},computed:{allGoodsNum:function(){var t=this.goodsData,n=0;return t.forEach((function(t){n+=t.number})),n}},methods:{clip:function(){t.setClipboardData({data:this.payUrl,success:function(){t.hideToast()}})},gtePayORderTel:function(){var n=this,e=t.getStorageSync("usermen"),i={id:this.ids,token:e};(0,a.publicing)(o.postSettle,i).then((function(t){n.extraUserInfo=t.data.data.extraData.userInfo,n.goodsData=t.data.data.data,n.extraData=t.data.data.extraData})).catch((function(t){console.log(t)}))},gtePayORder:function(){var n=this,e=t.getStorageSync("usermen"),i={id:this.ids,token:e};(0,a.publicing)(o.postSettle,i).then((function(t){n.extraUserInfo=t.data.data.extraData.userInfo,n.goodsData=t.data.data.data,n.extraData=t.data.data.extraData;var e=n.goodsData.map((function(t){return t.id})),a="";for(var o in e)a=a+e[o]+",";a=a.substring(0,a.length-1),console.log("idList去除逗号后====",a),r(a),n.ids=a})).catch((function(t){console.log(t)}))},getQueryString:function(t,n){if(t)for(var e=t.split("?")[1]||"",a=e.split("&")||[],o=0;o<a.length;o++){var i=decodeURIComponent(a[o].split("=")[0]),r=decodeURIComponent(a[o].split("=")[1]);if(n===i)return r}else;},SubmitOrder:function(){var n=this,e=this,i=t.getStorageSync("usermen"),u={id:e.ids,token:i};(0,a.listing)(o.getSubmitOrder,u).then((function(a){r(a);var o=a.data.data.orderNumber;n.payUrl=a.data.data.payUrl,e.clip(),t.showModal({title:"提示",content:"确认支付",success:function(n){if(n.confirm)e.btnPay(o);else if(n.cancel)return t.showToast({title:"订单已取消",icon:"none",duration:2e3}),void t.switchTab({url:"../../pages/my/my"})}})})).catch((function(t){r(t)}))},open:function(){this.$refs.popup.show()},chooseAddr:function(){t.navigateTo({url:"../address/address"})},btnPay:function(n){t.showLoading({title:"支付中",duration:2e3});var e={orderNumber:n};(0,a.publicing)(o.postOrderPay,e).then((function(n){r(n),t.showToast({title:"".concat(n.data.msg),icon:"none",duration:2e3}),t.reLaunch({url:"../PayOK/PayOK"})})).catch((function(t){r(t)}))},popupClose:function(){this.show=!1}},onLoad:function(t){this.url=o.imgurl,this.ids=t.ids,this.gtePayORderTel();var n=getCurrentPages(),e=(n[n.length-1],n[n.length-2]);r(e.$page.fullPath),"/pages/order/order"===e.$page.fullPath?(r("我执行了加购清单"),this.gtePayORder()):"/pagesIII/productDetail/productDetail"==e.$page.fullPath&&r("我执行了立即购买")}};n.default=u}).call(this,e("543d")["default"])},a4be:function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return a}));var a={tuiListCell:function(){return e.e("components/tui-list-cell/tui-list-cell").then(e.bind(null,"174d"))},tuiButton:function(){return e.e("components/tui-button/tui-button").then(e.bind(null,"a5c6"))},wybPopup:function(){return e.e("components/wyb-popup/wyb-popup").then(e.bind(null,"1f69"))}},o=function(){var t=this,n=t.$createElement;t._self._c},i=[]},c75d:function(t,n,e){"use strict";var a=e("0c5e"),o=e.n(a);o.a},e631:function(t,n,e){"use strict";(function(t){e("abd2");a(e("66fd"));var n=a(e("51b3"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])}},[["e631","common/runtime","common/vendor"]]]);