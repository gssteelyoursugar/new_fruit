(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/order"],{2472:function(t,e,i){"use strict";(function(t){i("5361");n(i("66fd"));var e=n(i("5bd5"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},4685:function(t,e,i){},"5bd5":function(t,e,i){"use strict";i.r(e);var n=i("d106"),o=i("d167");for(var r in o)"default"!==r&&function(t){i.d(e,t,(function(){return o[t]}))}(r);i("ffbc");var a,s=i("f0c5"),c=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],a);e["default"]=c.exports},b5c5:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i("2b9e"),o=i("2b28"),r=console,a=r.log,s={data:function(){return{setdata:"",tips:"",modaishow:!1,isActive:!0,hasError:!1,ApproveStatus:0,flag:!1,checkFlag:!1,allFlag:"",checkedArr:[],valueNum:0,orderObj:[],openid:"",neworder:[],isCheck:!1,dataList:[{id:"q2020811",buyNum:1,price:299.5,selected:!1,imgsrc:"../../static/images/putao1.png",shopName:"大葡萄"},{id:"q2020812",buyNum:2,price:499,selected:!1,imgsrc:"../../static/images/niuyouguo1.png",shopName:"大哈密瓜"},{id:"q2020813",buyNum:3,price:199,selected:!1,imgsrc:"../../static/images/putao1.png",shopName:"大紫葡萄"}],isAll:!1,totalPrice:0,buyNum:0,cartIds:[],actions:[{name:"删除",color:"#fff",fontsize:28,width:64,background:"#F82400"}],actions2:[{name:"看相似",color:"#fff",fontsize:28,width:64,background:"#FF7035"},{name:"删除",color:"#fff",fontsize:28,width:64,background:"#F82400"}],isEdit:!1,pageIndex:1,loadding:!1,pullUpOn:!0,allPrice:0,curId:0}},filters:{getPrice:function(t){return"***"===t?t:(t=t||0,t.toFixed(2))}},methods:{goIndex:function(){t.switchTab({url:"../index/index"})},getUserInfo:function(e){this.usering=e.detail.userInfo,t.setStorageSync("userIN",e.detail.userInfo);t.setStorageSync("userIN",e.detail.userInfo);if(e.detail.userInfo){var i=e.detail.userInfo;this.wxCode(i.avatarUrl,i.nickName)}},wxCode:function(t,e){var i=this;wx.login({success:function(t){var e=t.code;i.wxLoging(e)},fail:function(t){a(t)}})},wxLoging:function(e){var i=this,r={code:e};t.showLoading({title:"加载中",icon:"none"}),(0,n.publicing2)(o.loginis,r).then((function(e){if(500==e.statusCode)return i.modaishow=!0,void t.showModal({title:"提示",content:"登录超时，请重新登录获取信息",success:function(e){e.confirm?(t.switchTab({url:"../my/my"}),t.hideLoading()):e.cancel&&t.hideLoading()}});200==e.statusCode&&(t.setStorageSync("usermen",e.data.token),i.modaishow=!1,i.orderIng(),i.getMerchants(),t.hideLoading())})).catch((function(e){t.showToast({title:"".concat(e)}),a(e)}))},getMerchants:function(){var e=this,i=t.getStorageSync("usermen");if(i){var r={token:i};(0,n.listing)(o.getClient,r).then((function(t){e.ApproveStatus=t.data.data.approveStatus})).catch((function(t){a(t)}))}else this.ApproveStatus=0},jieSuanPrice:function(){var t=0;for(var e in this.orderObj){var i=this.orderObj[e].list;for(var n in i){var o=i[n];-1!=this.cartIds.indexOf(o.id)&&(t+=o.number*o.platformClientPrice)}}this.orderObj;this.allPrice=1*t.toFixed(2)},orderIng:function(){var e=this,i=t.getStorageSync("usermen"),r={token:i};(0,n.listing)(o.getCart,r).then((function(t){var i=t.data.data;i&&(i.forEach((function(t){t.list.forEach((function(t){Object.assign(t,{selected:!1})}))})),e.orderObj=i)})).catch((function(t){a(t)}))},gotoList:function(e){t.navigateTo({url:"../../pagesIII/productDetail/productDetail?id="+e})},calcHandle:function(){var t=0,e=0,i=0;this.dataList.map((function(n){n.selected&&(t+=n.buyNum,e+=n.price*n.buyNum,i++)})),this.isAll=i===this.dataList.length,this.buyNum=t,this.totalPrice=e},changeNum:function(e){var i=this;if(t.showLoading({}),e.value<1)return e.value=1,void t.showToast({title:"不能再少啦～",icon:"none"});var r=t.getStorageSync("usermen"),s={id:this.orderObj[e.custom].list[e.index].id,goodsId:this.orderObj[e.custom].list[e.index].goodsId,number:this.orderObj[e.custom].list[e.index].number=e.value,token:r};(0,n.publicing)(o.postUpOrder,s).then((function(n){t.hideLoading(),-1!=n.data.code?(500==n.data.code&&t.showToast({title:"账号异常",icon:"none"}),200==n.data.code&&(i.orderObj[e.custom].list[e.index].number=e.value,i.jieSuanPrice())):t.showToast({title:n.data.msg,icon:"none"})})).catch((function(t){a(t)}))},handlerButton:function(e,i){var r=this,s=t.getStorageSync("usermen"),c={id:e,goodsId:i,token:s};(0,n.publicing)(o.postDelOrder,c).then((function(e){t.showToast({title:"".concat(e.data.msg)}),r.orderIng()})).catch((function(e){a(e),t.showToast({title:"删除失败"})}))},btnPay:function(){var e=t.getStorageSync("usermen");if(1==this.ApproveStatus)if(this.cartIds.length<=0)t.showToast({title:"先勾选要结算商品呀",icon:"none"});else{var i="";for(var r in this.cartIds)i=i+this.cartIds[r]+",";i=i.substring(0,i.length-1),this.orderID=i;var a={id:i,token:e};(0,n.publicing)(o.postSettle,a).then((function(e){console.log(e),-1!=e.data.data.code&&500!=e.data.data.code?200==e.data.data.code&&t.navigateTo({url:"../../pagesIII/submitOrder/submitOrder?ids="+i}):t.showToast({title:e.data.data.msg,icon:"none",duration:3e3})}))}else t.showToast({title:"您还没有验证店铺",icon:"none"})},buyChange:function(t){var e=this.orderObj,i=t.detail.value,n=0;e.forEach((function(t){n+=t.list.length,t.list.forEach((function(t,e){var n=i.findIndex((function(e){return t.id===e}));t.selected=-1!==n}))})),n===i.length?this.isAll=!0:this.isAll=!1,this.orderObj=e,this.cartIds=i,this.jieSuanPrice()},checkAll:function(t){var e=this;this.isAll=!this.isAll;var i=this.orderObj,n=[];if(!1===this.isAll&&(i.forEach((function(t){t.list.forEach((function(t){t.selected=!1,e.$forceUpdate()}))})),this.cartIds=[],this.orderObj=i),!0===this.isAll){i.forEach((function(t){t.list.forEach((function(t){t.selected=!0,n.push(t.id),e.$forceUpdate()}))}));new Set(n);this.orderObj=i,this.cartIds=Array.from(n)}this.$forceUpdate(),this.jieSuanPrice()},onclike:function(){this.flag=!1,this.isAll=!1}},onShow:function(){this.allPrice=0,this.onclike(),this.isAll=!1,this.isCheck=!1,this.cartIds=[];var e=t.getStorageSync("usermen");if(e){this.modaishow=!1,this.orderIng(),this.getMerchants();var i=this.orderObj;0!==i.length&&(i.forEach((function(t,e){t.list.forEach((function(t,e){t&&(t.selected=!1)}))})),this.orderObj=i)}else this.modaishow=!0},onLoad:function(){this.flag=!1},onPullDownRefresh:function(){t.getStorageSync("usermen");this.orderIng(),setTimeout((function(){t.stopPullDownRefresh()}),1e3)},onNavigationBarButtonTap:function(t){this.isEdit=!this.isEdit;this.isEdit}};e.default=s}).call(this,i("543d")["default"])},d106:function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return n}));var n={tuiSwipeAction:function(){return i.e("components/tui-swipe-action/tui-swipe-action").then(i.bind(null,"7a0f"))},tuiNumberbox:function(){return i.e("components/tui-numberbox/tui-numberbox").then(i.bind(null,"e3a0"))},tuiButton:function(){return i.e("components/tui-button/tui-button").then(i.bind(null,"9dd9"))}},o=function(){var t=this,e=t.$createElement,i=(t._self._c,t.modaishow||0===t.orderObj.length?null:t.__map(t.orderObj,(function(e,i){var n=t.__get_orig(e),o=t.__map(e.list,(function(e,i){var n=t.__get_orig(e),o=t._f("getPrice")(1===t.ApproveStatus?e.platformClientPrice:"***");return{$orig:n,f0:o}}));return{$orig:n,l0:o}})));t.$mp.data=Object.assign({},{$root:{l1:i}})},r=[]},d167:function(t,e,i){"use strict";i.r(e);var n=i("b5c5"),o=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=o.a},ffbc:function(t,e,i){"use strict";var n=i("4685"),o=i.n(n);o.a}},[["2472","common/runtime","common/vendor"]]]);