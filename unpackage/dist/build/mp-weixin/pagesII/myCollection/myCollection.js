(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesII/myCollection/myCollection"],{"2c63":function(t,n,e){"use strict";e.r(n);var o=e("c525"),i=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);n["default"]=i.a},"37ad":function(t,n,e){"use strict";var o;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return o}));var i=function(){var t=this,n=t.$createElement;t._self._c},a=[]},7253:function(t,n,e){"use strict";e.r(n);var o=e("37ad"),i=e("2c63");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e("a9ce");var c,s=e("f0c5"),u=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);n["default"]=u.exports},a063:function(t,n,e){},a9ce:function(t,n,e){"use strict";var o=e("a063"),i=e.n(o);i.a},b279:function(t,n,e){"use strict";(function(t){e("abd2");o(e("66fd"));var n=o(e("7253"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},c525:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=e("09cc"),i=e("0efb"),a=(t.getStorageSync("usermen"),console),c=a.log,s={data:function(){return{tips:"",modaishow:!1,isCollection:!1,isActive:!0,hasError:!1,showLike:!0,url:"http://192.168.1.10:8980/",likeDatas:[]}},methods:{tising:function(t,n){this.init(t,n)},init:function(t,n){this.modaishow=t,this.tips=n},getUserInfo:function(n){c(n),this.usering=n.detail.userInfo,t.setStorageSync("userIN",n.detail.userInfo);t.setStorageSync("userIN",n.detail.userInfo);if(n.detail.userInfo){var e=n.detail.userInfo;this.wxCode(e.avatarUrl,e.nickName)}c("dddddddddd")},wxCode:function(t,n){var e=this;wx.login({success:function(t){c(t);var n=t.code;e.wxLoging(n)},fail:function(t){c(t)}})},wxLoging:function(n){var e=this;c(n);var a={code:n};t.showLoading({title:"加载中",icon:"none"}),(0,o.publicing2)(i.loginis,a).then((function(n){500!=n.statusCode?(200==n.statusCode&&c(n),c(n),t.setStorageSync("usermen",n.data.token),t.hideLoading(),e.modaishow=!1,e.getLikeData()):t.showModal({title:"提示",content:"服务器错误，请重新登录获取信息",success:function(n){n.confirm?(console.log("用户点击确定"),t.hideLoading()):n.cancel&&(console.log("用户点击取消"),t.hideLoading())}})})).catch((function(n){t.showToast({title:"".concat(n)}),c(n)}))},getLikeData:function(){var n=this,e=t.getStorageSync("usermen"),a={token:e};(0,o.listing)(i.getLike,a).then((function(t){c(t.data.data),n.likeDatas=t.data.data,c(n.likeDatas)})).catch((function(t){c(t)}))},delLike:function(n){var e=this,a=t.getStorageSync("usermen"),s={goodsId:n,token:a};t.showModal({title:"提示",content:"取消收藏这件宝贝，确定吗？",success:function(n){n.confirm?((0,o.publicing)(i.postDelLike,s).then((function(n){c(n.data.msg),t.showToast({title:"删除".concat(n.data.msg)}),e.getLikeData()})).catch((function(t){c(t)})),console.log("用户点击确定")):n.cancel&&console.log("用户点击取消")}})}},onShow:function(){var n=t.getStorageSync("usermen");if(c(n),n){var e=!1,o="";this.tising(e,o),this.getLikeData(),c("显示订单")}else{this.hasError=!0,this.isActive=!1;var i=!0,a="请登录后再查看";this.tising(i,a)}}};n.default=s}).call(this,e("543d")["default"])}},[["b279","common/runtime","common/vendor"]]]);