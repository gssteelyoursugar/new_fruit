(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesIII/submitOrder/submitOrder"],{"0c5e":function(t,e,n){},"51b3":function(t,e,n){"use strict";n.r(e);var a=n("7965"),o=n("638e");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("c75d");var r,u=n("f0c5"),c=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=c.exports},"638e":function(t,e,n){"use strict";n.r(e);var a=n("9c01"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},7965:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var a={tuiListCell:function(){return n.e("components/tui-list-cell/tui-list-cell").then(n.bind(null,"174d"))},tuiButton:function(){return n.e("components/tui-button/tui-button").then(n.bind(null,"a5c6"))},wybPopup:function(){return n.e("components/wyb-popup/wyb-popup").then(n.bind(null,"1f69"))}},o=function(){var t=this,e=t.$createElement;t._self._c},i=[]},"9c01":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("09cc"),o=n("0efb"),i=(t.getStorageSync("usermen"),console),r=i.log,u={components:{},data:function(){return{payUrl:"",isTop:!0,ids:"",goodsData:[],hasCoupon:!0,insufficient:!1,show:!1,extraUserInfo:{},totalPrice:{},ids2:"",orderNumber:"",extraData:{},idList:"",url:"",name:"arrowright",unit:"rpx",size:32,color:"#000",margin:"0"}},computed:{allGoodsNum:function(){var t=this.goodsData,e=0;return t.forEach((function(t){e+=t.number})),e}},methods:{clip:function(){t.setClipboardData({data:this.payUrl,success:function(){t.hideToast()}})},gtePayORderTel:function(){var e=this,n=t.getStorageSync("usermen"),i={id:this.ids,token:n};(0,a.publicing)(o.postSettle,i).then((function(t){e.extraUserInfo=t.data.data.extraData.userInfo,e.goodsData=t.data.data.data,e.extraData=t.data.data.extraData})).catch((function(t){console.log(t)}))},gtePayORder:function(){var e=this,n=t.getStorageSync("usermen"),i={id:this.ids,token:n};(0,a.publicing)(o.postSettle,i).then((function(t){e.extraUserInfo=t.data.data.extraData.userInfo,e.goodsData=t.data.data.data,e.extraData=t.data.data.extraData;var n=e.goodsData.map((function(t){return t.id})),a="";for(var o in n)a=a+n[o]+",";a=a.substring(0,a.length-1),console.log("idList去除逗号后====",a),r(a),e.ids=a})).catch((function(t){console.log(t)}))},getQueryString:function(t,e){if(t)for(var n=t.split("?")[1]||"",a=n.split("&")||[],o=0;o<a.length;o++){var i=decodeURIComponent(a[o].split("=")[0]),r=decodeURIComponent(a[o].split("=")[1]);if(e===i)return r}else;},SubmitOrder:function(){var e=this,n=t.getStorageSync("usermen"),i={id:e.ids,token:n};(0,a.listing)(o.getSubmitOrder,i).then((function(a){if(-1!==a.data.code){var o=a.data.data,i=o.payinfo,r=o.orderNumber;t.setClipboardData({data:i,success:function(){t.hideToast()}}),t.showModal({title:"提示",content:"确认支付",success:function(a){if(a.confirm)e.btnPay();else if(a.cancel)return e.cancelOrder(r,n),t.showToast({title:"订单已取消",icon:"none",duration:2e3}),void t.switchTab({url:"../../pages/my/my"})}})}else t.showToast({title:a.data.msg,icon:"none",duration:3e3})})).catch((function(t){r(t)}))},open:function(){this.$refs.popup.show()},chooseAddr:function(){t.navigateTo({url:"../address/address"})},cancelOrder:function(t,e){var n={token:e,orderNumber:t};(0,a.publicing)(o.postCancelOrder,n).then((function(t){console.log(t)}))},btnPay:function(e){t.showLoading({title:"支付中",duration:2e3}),t.reLaunch({url:"../PayOK/PayOK"})},popupClose:function(){this.show=!1}},onLoad:function(t){this.url=o.imgurl,this.ids=t.ids,this.gtePayORderTel();var e=getCurrentPages(),n=(e[e.length-1],e[e.length-2]);r(n.$page.fullPath),"/pages/order/order"===n.$page.fullPath?(r("我执行了加购清单"),this.gtePayORder()):"/pagesIII/productDetail/productDetail"==n.$page.fullPath&&r("我执行了立即购买")}};e.default=u}).call(this,n("543d")["default"])},c75d:function(t,e,n){"use strict";var a=n("0c5e"),o=n.n(a);o.a},e631:function(t,e,n){"use strict";(function(t){n("abd2");a(n("66fd"));var e=a(n("51b3"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["e631","common/runtime","common/vendor"]]]);