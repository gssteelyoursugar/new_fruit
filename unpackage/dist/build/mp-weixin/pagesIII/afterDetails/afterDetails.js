(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesIII/afterDetails/afterDetails"],{"208f":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=e("a6ff"),i=e("ca88"),r=e("3619"),u=console,c=u.log,o={data:function(){return{id:"",DetailsData:{},files:[]}},methods:{previewImage:function(n){c(n.currentTarget.id),t.previewImage({current:n.currentTarget.id,urls:this.files})},postAfterDetails:function(){var n=this,e=t.getStorageSync("usermen"),r={token:e,id:this.id};(0,a.publicing)(i.posAfterDetails,r).then((function(e){if(e.data.code&&200!=e.data.code)return t.showToast({title:e.data.msg,icon:"none"}),void t.switchTab({url:"../../pages/my/my"});n.DetailsData=e.data.data;var a=e.data.data.imgList.map((function(t){return t.url}));n.files=a})).catch((function(t){c(t)}))},clipboard:function(t){var n=t;r.getClipboardData(n,(function(t){}),t)}},onLoad:function(t){this.id=t.id,this.postAfterDetails()}};n.default=o}).call(this,e("543d")["default"])},"40f7":function(t,n,e){},6797:function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return a}));var a={tuiListCell:function(){return e.e("components/tui-list-cell/tui-list-cell").then(e.bind(null,"9a71"))}},i=function(){var t=this,n=t.$createElement,e=(t._self._c,t.__map(t.files,(function(n,e){var a=t.__get_orig(n),i=n.indexOf(".mp4"),r=n.indexOf(".mp4");return{$orig:a,g0:i,g1:r}})));t.$mp.data=Object.assign({},{$root:{l0:e}})},r=[]},"9b02":function(t,n,e){"use strict";var a=e("40f7"),i=e.n(a);i.a},abc8:function(t,n,e){"use strict";(function(t){e("a4d8");a(e("66fd"));var n=a(e("c3e1"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},b59f:function(t,n,e){"use strict";e.r(n);var a=e("208f"),i=e.n(a);for(var r in a)"default"!==r&&function(t){e.d(n,t,(function(){return a[t]}))}(r);n["default"]=i.a},c3e1:function(t,n,e){"use strict";e.r(n);var a=e("6797"),i=e("b59f");for(var r in i)"default"!==r&&function(t){e.d(n,t,(function(){return i[t]}))}(r);e("9b02");var u,c=e("f0c5"),o=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);n["default"]=o.exports}},[["abc8","common/runtime","common/vendor"]]]);