(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesIII/demo/demo"],{"332f":function(t,e,n){"use strict";n.r(e);var a=n("f54f"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},"7acb":function(t,e,n){"use strict";(function(t){n("5361");a(n("66fd"));var e=a(n("f948"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},9267:function(t,e,n){},"96ee":function(t,e,n){"use strict";var a=n("9267"),o=n.n(a);o.a},a705:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var o=function(){var t=this,e=t.$createElement;t._self._c},i=[]},f54f:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("2b9e"),o=n("2b28"),i={data:function(){return{detail:[{title:"我是标题"},{title:"我是标题"},{title:"我是标题"}],url:"http://192.168.1.10:8980/js/",WxIndexViewpager:[],ColorList:this.ColorList,color:"red",loading:!1,modalName:"",active:!1,currentIndex:0}},onLoad:function(){this.getListData();var t=this;setTimeout((function(){t.loading=!0}),500)},methods:{getListData:function(){var t=this,e={pageNo:"1",pageSize:"10000",indexClassify:"2"};(0,a.listing)(o.getIndex,e).then((function(e){t.WxIndexViewpager=e.data.data.WxIndexViewpager})).catch((function(t){console.log(t)}))},showModal:function(t){this.modalName=t.currentTarget.dataset.target},hideModal:function(t){this.modalName=null},SetColor:function(t){this.color=t.currentTarget.dataset.color,this.modalName=null},SetActive:function(t){this.active=t.detail.value}}};e.default=i},f948:function(t,e,n){"use strict";n.r(e);var a=n("a705"),o=n("332f");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("96ee");var u,r=n("f0c5"),c=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);e["default"]=c.exports}},[["7acb","common/runtime","common/vendor"]]]);