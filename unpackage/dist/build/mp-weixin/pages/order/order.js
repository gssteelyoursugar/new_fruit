(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/order"],{"101f":function(t,i,n){"use strict";n.d(i,"b",(function(){return o})),n.d(i,"c",(function(){return s})),n.d(i,"a",(function(){return e}));var e={tuiSwipeAction:function(){return n.e("components/tui-swipe-action/tui-swipe-action").then(n.bind(null,"657a"))},tuiNumberbox:function(){return n.e("components/tui-numberbox/tui-numberbox").then(n.bind(null,"bd60"))},tuiButton:function(){return n.e("components/tui-button/tui-button").then(n.bind(null,"a5c6"))}},o=function(){var t=this,i=t.$createElement,n=(t._self._c,t.__map(t.orderObj,(function(i,n){var e=t.__get_orig(i),o=t.__map(i.list,(function(i,n){var e=t.__get_orig(i),o=t._f("getPrice")(i.platformClinetPrice);return{$orig:e,f0:o}}));return{$orig:e,l0:o}})));t.$mp.data=Object.assign({},{$root:{l1:n}})},s=[]},"1df5":function(t,i,n){},"7bed":function(t,i,n){"use strict";var e=n("1df5"),o=n.n(e);o.a},a5f8:function(t,i,n){"use strict";n.r(i);var e=n("101f"),o=n("f9bd");for(var s in o)"default"!==s&&function(t){n.d(i,t,(function(){return o[t]}))}(s);n("7bed");var r,a=n("f0c5"),c=Object(a["a"])(o["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],r);i["default"]=c.exports},ba14:function(t,i,n){"use strict";(function(t){n("abd2");e(n("66fd"));var i=e(n("a5f8"));function e(t){return t&&t.__esModule?t:{default:t}}t(i.default)}).call(this,n("543d")["createPage"])},daac:function(t,i,n){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e=n("09cc"),o=n("0efb"),s=console,r=s.log,a=t.getStorageSync("usermen"),c={data:function(){return{tips:"",modaishow:!1,isActive:!0,hasError:!1,ApproveStatus:0,flag:!1,checkFlag:!1,allFlag:"",checkedArr:[],valueNum:0,url:"http://192.168.1.10:8980",orderObj:[],openid:"",neworder:[],isCheck:!1,dataList:[{id:"q2020811",buyNum:1,price:299.5,selected:!1,imgsrc:"../../static/images/putao1.png",shopName:"大葡萄"},{id:"q2020812",buyNum:2,price:499,selected:!1,imgsrc:"../../static/images/niuyouguo1.png",shopName:"大哈密瓜"},{id:"q2020813",buyNum:3,price:199,selected:!1,imgsrc:"../../static/images/putao1.png",shopName:"大紫葡萄"}],isAll:!1,totalPrice:0,buyNum:0,cartIds:[],actions:[{name:"删除",color:"#fff",fontsize:28,width:64,background:"#F82400"}],actions2:[{name:"看相似",color:"#fff",fontsize:28,width:64,background:"#FF7035"},{name:"删除",color:"#fff",fontsize:28,width:64,background:"#F82400"}],isEdit:!1,pageIndex:1,loadding:!1,pullUpOn:!0,allPrice:0,curId:0}},filters:{getPrice:function(t){return t=t||0,t.toFixed(2)}},methods:{goIndex:function(){t.switchTab({url:"../index/index"})},init:function(t,i){this.modaishow=t,this.tips=i},getUserInfo:function(i){this.usering=i.detail.userInfo,t.setStorageSync("userIN",i.detail.userInfo);t.setStorageSync("userIN",i.detail.userInfo);if(i.detail.userInfo){var n=i.detail.userInfo;this.wxCode(n.avatarUrl,n.nickName)}},wxCode:function(t,i){var n=this;wx.login({success:function(t){var i=t.code;n.wxLoging(i)},fail:function(t){r(t)}})},wxLoging:function(i){var n=this;r(i);var s={code:i};t.showLoading({title:"加载中",icon:"none"}),(0,e.publicing2)(o.loginis,s).then((function(i){500!=i.statusCode?(200==i.statusCode&&r(i),t.setStorageSync("usermen",i.data.token),n.modaishow=!1,n.orderIng(),n.getMerchants(),t.hideLoading()):t.showModal({title:"提示",content:"服务器错误，请重新登录获取信息",success:function(i){(i.confirm||i.cancel)&&t.hideLoading()}})})).catch((function(i){t.showToast({title:"".concat(i)}),r(i)}))},getMerchants:function(){var t=this,i={token:a};(0,e.listing)(o.getClient,i).then((function(i){t.ApproveStatus=i.data.data.approveStatus})).catch((function(t){r(t)}))},jieSuanPrice:function(){var t=0;for(var i in this.orderObj){var n=this.orderObj[i].list;for(var e in n){var o=n[e];-1!=this.cartIds.indexOf(o.id)&&(t+=o.number*o.platformClinetPrice)}}this.orderObj;this.allPrice=t.toFixed(2)},orderIng:function(){var i=this,n=t.getStorageSync("usermen"),s={token:n};(0,e.listing)(o.getCart,s).then((function(t){var n=t.data.data;n.forEach((function(t){console.log(t),t.list.forEach((function(t){Object.assign(t,{selected:!1}),console.log("itm",t)}))})),i.orderObj=n})).catch((function(t){r(t)}))},gotoList:function(i){r(i),t.navigateTo({url:"../../pagesIII/productDetail/productDetail?id="+i})},tising:function(t,i){this.init(t,i)},calcHandle:function(){var t=0,i=0,n=0;this.dataList.map((function(e){e.selected&&(t+=e.buyNum,i+=e.price*e.buyNum,n++)})),this.isAll=n===this.dataList.length,this.buyNum=t,this.totalPrice=i},changeNum:function(i){t.showLoading({}),i.value<1&&(i.value=1,t.showToast({title:"不能再少啦～",icon:"none"})),this.orderObj[i.custom].list[i.index].number=i.value,this.jieSuanPrice();var n={id:this.orderObj[i.custom].list[i.index].id,goodsId:this.orderObj[i.custom].list[i.index].goodsId,number:this.orderObj[i.custom].list[i.index].number,token:a};(0,e.publicing)(o.postUpOrder,n).then((function(i){t.hideLoading()})).catch((function(t){r(t)}))},handlerButton:function(i,n){var s=this;r(i);var a=t.getStorageSync("usermen"),c={id:i,goodsId:n,token:a};(0,e.publicing)(o.postDelOrder,c).then((function(i){t.showToast({title:"".concat(i.data.msg)}),s.orderIng()})).catch((function(i){r(i),t.showToast({title:"删除失败"})}))},editGoods:function(){this.isEdit=!this.isEdit},detail:function(){t.navigateTo({url:"../productDetail/productDetail"})},postSubOrder:function(){if(1==this.ApproveStatus){if(this.cartIds.length<=0)return this.isAll=!1,this.checkFlag=!1,this.flag=!1,void t.showToast({title:"先勾选要结算商品呀！",icon:"none"});console.log(this.cartIds);t.getStorageSync("usermen");var i="";for(var n in this.cartIds)i=i+this.cartIds[n]+",";i=i.substring(0,i.length-1)}else t.showToast({title:"您还没有验证店铺",icon:"none"})},btnPay:function(){if(1==this.ApproveStatus)if(this.cartIds.length<=0)t.showToast({title:"先勾选要结算商品呀！",icon:"none"});else{var i="";for(var n in this.cartIds)i=i+this.cartIds[n]+",";i=i.substring(0,i.length-1),this.orderID=i,t.navigateTo({url:"../../pagesIII/submitOrder/submitOrder?ids="+i})}else t.showToast({title:"您还没有验证店铺",icon:"none"})},buyChange:function(t){var i=this.orderObj,n=t.detail.value,e=0;i.forEach((function(t){e+=t.list.length,t.list.forEach((function(t,i){var e=n.findIndex((function(i){return t.id===i}));t.selected=-1!==e}))})),e===n.length?this.isAll=!0:this.isAll=!1,this.orderObj=i,this.cartIds=n,this.jieSuanPrice(),console.log(i,e)},checkAll:function(t){var i=this;this.isAll=!this.isAll,console.log(this.isAll);var n=this.orderObj,e=[];if(!1===this.isAll&&(n.forEach((function(t){t.list.forEach((function(t){t.selected=!1,i.$forceUpdate()}))})),console.log(n),this.cartIds=[],this.orderObj=n),!0===this.isAll){n.forEach((function(t){t.list.forEach((function(t){t.selected=!0,e.push(t.id),i.$forceUpdate()}))})),console.log(n);new Set(e);this.orderObj=n,this.cartIds=Array.from(e)}this.$forceUpdate(),this.jieSuanPrice()},onclike:function(){this.flag=!1,this.isAll=!1}},watch:{},onShow:function(){this.allPrice=0,this.onclike(),this.isAll=!1,this.isCheck=!1,this.cartIds=[],this.getMerchants();var i=t.getStorageSync("usermen");if(i){var n=!1,e="";this.tising(n,e),this.orderIng(),r("显示订单")}else{this.hasError=!0,this.isActive=!1;var o=!0,s="请登录后再查看";this.tising(o,s)}var a=this.orderObj;0!==a.length&&(a.forEach((function(t,i){t.list.forEach((function(t,i){t&&(t.selected=!1)}))})),this.orderObj=a)},onLoad:function(){this.flag=!1},onPullDownRefresh:function(){t.getStorageSync("usermen");this.orderIng(),console.log("refresh"),setTimeout((function(){t.stopPullDownRefresh()}),1e3)},onNavigationBarButtonTap:function(t){this.isEdit=!this.isEdit;this.isEdit}};i.default=c}).call(this,n("543d")["default"])},f9bd:function(t,i,n){"use strict";n.r(i);var e=n("daac"),o=n.n(e);for(var s in e)"default"!==s&&function(t){n.d(i,t,(function(){return e[t]}))}(s);i["default"]=o.a}},[["ba14","common/runtime","common/vendor"]]]);