(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesIII/demo/demo"],{"1c48":function(t,e,n){"use strict";n.r(e);var a=n("6e52"),o=n("7438");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("33bb");var c,u=n("f0c5"),r=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);e["default"]=r.exports},"33bb":function(t,e,n){"use strict";var a=n("6b04"),o=n.n(a);o.a},"6b04":function(t,e,n){},"6e52":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var o=function(){var t=this,e=t.$createElement;t._self._c},i=[]},"6fc3":function(t,e,n){"use strict";(function(t){n("abd2");a(n("66fd"));var e=a(n("1c48"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},7438:function(t,e,n){"use strict";n.r(e);var a=n("773a"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},"773a":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("09cc"),o=n("0efb"),i={data:function(){return{detail:[{title:"我是标题"},{title:"我是标题"},{title:"我是标题"}],url:"http://192.168.1.10:8980/js/",WxIndexViewpager:[],ColorList:this.ColorList,color:"red",loading:!1,modalName:"",active:!1,currentIndex:0}},onLoad:function(){this.getListData();var t=this;setTimeout((function(){t.loading=!0}),500)},methods:{getListData:function(){var t=this,e={pageNo:"1",pageSize:"30",indexClassify:"2"};(0,a.listing)(o.getIndex,e).then((function(e){t.WxIndexViewpager=e.data.data.WxIndexViewpager,console.log(e)})).catch((function(t){console.log(t)}))},showModal:function(t){this.modalName=t.currentTarget.dataset.target},hideModal:function(t){this.modalName=null},SetColor:function(t){this.color=t.currentTarget.dataset.color,this.modalName=null},SetActive:function(t){this.active=t.detail.value}}};e.default=i}},[["6fc3","common/runtime","common/vendor"]]]);