(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/order"],{41:
/*!**********************************************************************************!*\
  !*** /Users/gsheng/Downloads/new_fruit/main.js?{"page":"pages%2Forder%2Forder"} ***!
  \**********************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";(function(t){n(/*! uni-pages */4);i(n(/*! vue */2));var e=i(n(/*! ./pages/order/order.vue */42));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["createPage"])},42:
/*!***************************************************************!*\
  !*** /Users/gsheng/Downloads/new_fruit/pages/order/order.vue ***!
  \***************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var i=n(/*! ./order.vue?vue&type=template&id=127632e4& */43),o=n(/*! ./order.vue?vue&type=script&lang=js& */45);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n(/*! ./order.vue?vue&type=style&index=0&lang=css& */47);var s,a=n(/*! ../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */10),c=Object(a["default"])(o["default"],i["render"],i["staticRenderFns"],!1,null,null,null,!1,i["components"],s);c.options.__file="pages/order/order.vue",e["default"]=c.exports},43:
/*!**********************************************************************************************!*\
  !*** /Users/gsheng/Downloads/new_fruit/pages/order/order.vue?vue&type=template&id=127632e4& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,e,n){"use strict";n.r(e);var i=n(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./order.vue?vue&type=template&id=127632e4& */44);n.d(e,"render",(function(){return i["render"]})),n.d(e,"staticRenderFns",(function(){return i["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return i["recyclableRender"]})),n.d(e,"components",(function(){return i["components"]}))},44:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/gsheng/Downloads/new_fruit/pages/order/order.vue?vue&type=template&id=127632e4& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,e,n){"use strict";n.r(e),n.d(e,"render",(function(){return o})),n.d(e,"staticRenderFns",(function(){return s})),n.d(e,"recyclableRender",(function(){return r})),n.d(e,"components",(function(){return i}));var i={tuiSwipeAction:function(){return n.e(/*! import() | components/tui-swipe-action/tui-swipe-action */"components/tui-swipe-action/tui-swipe-action").then(n.bind(null,/*! @/components/tui-swipe-action/tui-swipe-action.vue */433))},tuiNumberbox:function(){return n.e(/*! import() | components/tui-numberbox/tui-numberbox */"components/tui-numberbox/tui-numberbox").then(n.bind(null,/*! @/components/tui-numberbox/tui-numberbox.vue */440))},tuiButton:function(){return n.e(/*! import() | components/tui-button/tui-button */"components/tui-button/tui-button").then(n.bind(null,/*! @/components/tui-button/tui-button.vue */447))}},o=function(){var t=this,e=t.$createElement,n=(t._self._c,t.modaishow||0===t.orderObj.length?null:t.__map(t.orderObj,(function(e,n){var i=t.__get_orig(e),o=t.__map(e.list,(function(e,n){var i=t.__get_orig(e),o=t._f("getPrice")(1===t.ApproveStatus?e.platformClientPrice:"***");return{$orig:i,f0:o}}));return{$orig:i,l0:o}})));t.$mp.data=Object.assign({},{$root:{l1:n}})},r=!1,s=[];o._withStripped=!0},45:
/*!****************************************************************************************!*\
  !*** /Users/gsheng/Downloads/new_fruit/pages/order/order.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var i=n(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./order.vue?vue&type=script&lang=js& */46),o=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},46:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/gsheng/Downloads/new_fruit/pages/order/order.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(/*! ../../api/api.js */20),o=n(/*! ../../api/request.js */22),r=console,s=r.log,a={data:function(){return{setdata:"",tips:"",modaishow:!1,isActive:!0,hasError:!1,ApproveStatus:0,flag:!1,checkFlag:!1,allFlag:"",checkedArr:[],valueNum:0,orderObj:[],openid:"",neworder:[],isCheck:!1,dataList:[{id:"q2020811",buyNum:1,price:299.5,selected:!1,imgsrc:"../../static/images/putao1.png",shopName:"大葡萄"},{id:"q2020812",buyNum:2,price:499,selected:!1,imgsrc:"../../static/images/niuyouguo1.png",shopName:"大哈密瓜"},{id:"q2020813",buyNum:3,price:199,selected:!1,imgsrc:"../../static/images/putao1.png",shopName:"大紫葡萄"}],isAll:!1,totalPrice:0,buyNum:0,cartIds:[],actions:[{name:"删除",color:"#fff",fontsize:28,width:64,background:"#F82400"}],actions2:[{name:"看相似",color:"#fff",fontsize:28,width:64,background:"#FF7035"},{name:"删除",color:"#fff",fontsize:28,width:64,background:"#F82400"}],isEdit:!1,pageIndex:1,loadding:!1,pullUpOn:!0,allPrice:0,curId:0}},filters:{getPrice:function(t){return"***"===t?t:(t=t||0,t.toFixed(2))}},methods:{goIndex:function(){t.switchTab({url:"../index/index"})},getUserInfo:function(e){this.usering=e.detail.userInfo,t.setStorageSync("userIN",e.detail.userInfo);t.setStorageSync("userIN",e.detail.userInfo);if(e.detail.userInfo){var n=e.detail.userInfo;this.wxCode(n.avatarUrl,n.nickName)}},wxCode:function(t,e){var n=this;wx.login({success:function(t){var e=t.code;n.wxLoging(e)},fail:function(t){s(t)}})},wxLoging:function(e){var n=this,r={code:e};t.showLoading({title:"加载中",icon:"none"}),(0,i.publicing2)(o.loginis,r).then((function(e){if(500==e.statusCode)return n.modaishow=!0,void t.showModal({title:"提示",content:"服务器错误，请重新登录获取信息",success:function(e){e.confirm?(t.switchTab({url:"../my/my"}),t.hideLoading()):e.cancel&&t.hideLoading()}});200==e.statusCode&&(t.setStorageSync("usermen",e.data.token),n.modaishow=!1,n.orderIng(),n.getMerchants(),t.hideLoading())})).catch((function(e){t.showToast({title:"".concat(e)}),s(e)}))},getMerchants:function(){var e=this,n=t.getStorageSync("usermen");if(n){var r={token:n};(0,i.listing)(o.getClient,r).then((function(t){e.ApproveStatus=t.data.data.approveStatus})).catch((function(t){s(t)}))}},jieSuanPrice:function(){var t=0;for(var e in this.orderObj){var n=this.orderObj[e].list;for(var i in n){var o=n[i];-1!=this.cartIds.indexOf(o.id)&&(t+=o.number*o.platformClientPrice)}}this.orderObj;this.allPrice=1*t.toFixed(2)},orderIng:function(){var e=this,n=t.getStorageSync("usermen"),r={token:n};(0,i.listing)(o.getCart,r).then((function(t){var n=t.data.data;n.forEach((function(t){t.list.forEach((function(t){Object.assign(t,{selected:!1})}))})),e.orderObj=n})).catch((function(t){s(t)}))},gotoList:function(e){t.navigateTo({url:"../../pagesIII/productDetail/productDetail?id="+e})},calcHandle:function(){var t=0,e=0,n=0;this.dataList.map((function(i){i.selected&&(t+=i.buyNum,e+=i.price*i.buyNum,n++)})),this.isAll=n===this.dataList.length,this.buyNum=t,this.totalPrice=e},changeNum:function(e){var n=this;if(t.showLoading({}),e.value<1)return e.value=1,void t.showToast({title:"不能再少啦～",icon:"none"});var r=t.getStorageSync("usermen"),a={id:this.orderObj[e.custom].list[e.index].id,goodsId:this.orderObj[e.custom].list[e.index].goodsId,number:this.orderObj[e.custom].list[e.index].number=e.value,token:r};(0,i.publicing)(o.postUpOrder,a).then((function(i){t.hideLoading(),-1!=i.data.code?(500==i.data.code&&t.showToast({title:"账号异常",icon:"none"}),200==i.data.code&&(n.orderObj[e.custom].list[e.index].number=e.value,n.jieSuanPrice())):t.showToast({title:i.data.msg,icon:"none"})})).catch((function(t){s(t)}))},handlerButton:function(e,n){var r=this,a=t.getStorageSync("usermen"),c={id:e,goodsId:n,token:a};(0,i.publicing)(o.postDelOrder,c).then((function(e){t.showToast({title:"".concat(e.data.msg)}),r.orderIng()})).catch((function(e){s(e),t.showToast({title:"删除失败"})}))},btnPay:function(){if(1==this.ApproveStatus)if(this.cartIds.length<=0)t.showToast({title:"先勾选要结算商品呀！",icon:"none"});else{var e="";for(var n in this.cartIds)e=e+this.cartIds[n]+",";e=e.substring(0,e.length-1),this.orderID=e,t.navigateTo({url:"../../pagesIII/submitOrder/submitOrder?ids="+e})}else t.showToast({title:"您还没有验证店铺",icon:"none"})},buyChange:function(t){var e=this.orderObj,n=t.detail.value,i=0;e.forEach((function(t){i+=t.list.length,t.list.forEach((function(t,e){var i=n.findIndex((function(e){return t.id===e}));t.selected=-1!==i}))})),i===n.length?this.isAll=!0:this.isAll=!1,this.orderObj=e,this.cartIds=n,this.jieSuanPrice()},checkAll:function(t){var e=this;this.isAll=!this.isAll;var n=this.orderObj,i=[];if(!1===this.isAll&&(n.forEach((function(t){t.list.forEach((function(t){t.selected=!1,e.$forceUpdate()}))})),this.cartIds=[],this.orderObj=n),!0===this.isAll){n.forEach((function(t){t.list.forEach((function(t){t.selected=!0,i.push(t.id),e.$forceUpdate()}))}));new Set(i);this.orderObj=n,this.cartIds=Array.from(i)}this.$forceUpdate(),this.jieSuanPrice()},onclike:function(){this.flag=!1,this.isAll=!1}},onShow:function(){this.allPrice=0,this.onclike(),this.isAll=!1,this.isCheck=!1,this.cartIds=[];var e=t.getStorageSync("usermen");if(console.log("setdata1",e,this.modaishow),!e)return this.modaishow=!0,void console.log("setdata2",e,this.modaishow);this.modaishow=!1,console.log("setdata3",e,this.modaishow),this.orderIng(),this.getMerchants();var n=this.orderObj;0!==n.length&&(n.forEach((function(t,e){t.list.forEach((function(t,e){t&&(t.selected=!1)}))})),this.orderObj=n)},onLoad:function(){this.flag=!1},onPullDownRefresh:function(){t.getStorageSync("usermen");this.orderIng(),setTimeout((function(){t.stopPullDownRefresh()}),1e3)},onNavigationBarButtonTap:function(t){this.isEdit=!this.isEdit;this.isEdit}};e.default=a}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"])},47:
/*!************************************************************************************************!*\
  !*** /Users/gsheng/Downloads/new_fruit/pages/order/order.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var i=n(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./order.vue?vue&type=style&index=0&lang=css& */48),o=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},48:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/gsheng/Downloads/new_fruit/pages/order/order.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,n){}},[[41,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/order.js.map