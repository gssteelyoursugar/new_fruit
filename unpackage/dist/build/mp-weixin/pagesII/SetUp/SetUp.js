(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesII/SetUp/SetUp"],{2528:function(t,n,e){"use strict";var u=e("65c8"),o=e.n(u);o.a},4601:function(t,n,e){"use strict";e.r(n);var u=e("55d1"),o=e("ca21");for(var c in o)"default"!==c&&function(t){e.d(n,t,(function(){return o[t]}))}(c);e("2528");var i,a=e("f0c5"),r=Object(a["a"])(o["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],i);n["default"]=r.exports},"55d1":function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return u}));var u={tuiListCell:function(){return e.e("components/tui-list-cell/tui-list-cell").then(e.bind(null,"155c"))},ssSwitch:function(){return e.e("components/ss-switch/ss-switch").then(e.bind(null,"1cb5"))}},o=function(){var t=this,n=t.$createElement;t._self._c},c=[]},"5ed0":function(t,n,e){"use strict";(function(t){e("54e5");u(e("66fd"));var n=u(e("4601"));function u(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"65c8":function(t,n,e){},ca21:function(t,n,e){"use strict";e.r(n);var u=e("d03d"),o=e.n(u);for(var c in u)"default"!==c&&function(t){e.d(n,t,(function(){return u[t]}))}(c);n["default"]=o.a},d03d:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{switchValue:!1,statusHeight:20,boxHeight:44}},onLoad:function(){var n=t.getSystemInfoSync(),e=n.statusBarHeight,u=t.getMenuButtonBoundingClientRect(),o=u.top,c=u.bottom;this.statusHeight=e;var i=c-e+(o-e),a=e+i+o-e;this.boxHeight=a-e},methods:{switchInput:function(t){},back:function(){t.navigateBack()},switchChange:function(t){},logout:function(){t.removeStorageSync("userIN"),t.removeStorageSync("usermen"),t.removeStorageSync("StoreStatus"),t.removeStorageSync("userIN"),t.switchTab({url:"../../pages/my/my"}),t.removeTabBarBadge({index:3}),t.showToast({title:"退出成功",icon:"none"})}}};n.default=e}).call(this,e("543d")["default"])}},[["5ed0","common/runtime","common/vendor"]]]);