(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesII/message/message"],{"2d98":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=e("a6ff"),u=e("ca88"),a={data:function(){return{statusHeight:20,boxHeight:44,msgList:[]}},onLoad:function(){var n=this,e=t.getSystemInfoSync(),a=e.statusBarHeight,c=t.getMenuButtonBoundingClientRect(),o=c.top,f=c.bottom;this.statusHeight=a;var s=f-a+(o-a),r=a+s+o-a;this.boxHeight=r-a,(0,i.listing2)(u.getMsg).then((function(t){n.msgList=t.data.data}))},methods:{back:function(){t.navigateBack()},detail:function(){t.navigateTo({url:"../../pages/"})},clickToItem:function(n){t.navigateTo({url:"../../pagesII/timeInfo/timeInfo?id="+n})}}};n.default=a}).call(this,e("543d")["default"])},"5a62":function(t,n,e){"use strict";e.r(n);var i=e("2d98"),u=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=u.a},6508:function(t,n,e){"use strict";var i=e("dc57"),u=e.n(i);u.a},b61c:function(t,n,e){"use strict";e.r(n);var i=e("d5ff"),u=e("5a62");for(var a in u)"default"!==a&&function(t){e.d(n,t,(function(){return u[t]}))}(a);e("6508");var c,o=e("f0c5"),f=Object(o["a"])(u["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],c);n["default"]=f.exports},cf25:function(t,n,e){"use strict";(function(t){e("a4d8");i(e("66fd"));var n=i(e("b61c"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},d5ff:function(t,n,e){"use strict";e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i}));var i={tuiListView:function(){return e.e("components/tui-list-view/tui-list-view").then(e.bind(null,"a72f"))},tuiListCell:function(){return e.e("components/tui-list-cell/tui-list-cell").then(e.bind(null,"9a71"))}},u=function(){var t=this,n=t.$createElement;t._self._c},a=[]},dc57:function(t,n,e){}},[["cf25","common/runtime","common/vendor"]]]);