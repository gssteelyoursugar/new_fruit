(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesIII/navbar/navbar"],{"3b2c":function(t,e,n){"use strict";n.r(e);var a=n("75ba"),i=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);e["default"]=i.a},"711e":function(t,e,n){"use strict";var a=n("bd41"),i=n.n(a);i.a},"75ba":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("2b9e"),i=n("2b28"),s=3,o=3,r=[],c=(t.getStorageSync("usermen"),console),u=c.log,f=n("dfa0"),l={data:function(){return{isIos:!1,newsList:[],cacheTab:[],tabIndex:0,tabBars:[{name:"全部"},{name:"待确认"}],count:0,currentTab:0,pageIndex:1,loadding:!1,pullUpOn:!0,scrollTop:0,AfterSaleData:[],modaishow:!1,flag:!1,itemid:"",idNum:"",scrollInto:"",showTips:!1,pulling:!1}},onLoad:function(e){var n=this;this.id=e.id,this.postAfterSalelist(),this.getBeConfirmedData(),setTimeout((function(){n.newsList=n.randomfn(),t.getSystemInfo({success:function(t){n.isIos="ios"==t.platform.toLocaleLowerCase()}})}),200)},methods:{Goyes:function(){var e=this,n=t.getStorageSync("usermen"),s={token:n,orderItemId:this.itemid,id:this.idNum};u(s),(0,a.publicing)(i.postAfterCen,s).then((function(t){u(t),e.postAfterSalelist(),e.getBeConfirmedData(),e.messcancel()})).catch((function(t){u(t)}))},getBeConfirmedData:function(){var e=this,n=(t.getStorageSync("usermen"),{token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uS2V5IjoiVVgwSEtIRC8yVUJnYm4ya0tGVSt3QT09Iiwiand0LWlkIjoiNGNhMzNkZGQtMjU1MC00M2IyLTkzZDAtNzE3MWNiOTA3ODNlIiwid3hPcGVuSWQiOiJvb0MwNDQxc0JvOTN1ODV0ZFVxSC1iY1Z0NXNVIn0.IEabjDYhD6_crxCFyc1L5LsJUOZTaCYgVHfw1mgjFwU"});(0,a.listing)(i.getBeConfirmed,n).then((function(t){u("res",t),e.count=t.data.data.count,u(e.count),e.$set(e.tabBars,1,{name:"待确认(".concat(e.count,")")})})).catch((function(t){u(t)}))},goBack:function(){this.messcancel()},postAfterSalelist:function(){var e=this,n=t.getStorageSync("usermen"),s={token:n,afterSaleStatus:3};0===this.tabIndex&&delete s.afterSaleStatus,(0,a.publicing)(i.posAfterSaleList,s).then((function(t){u(t),e.AfterSaleData=t.data.data})).catch((function(t){u(t)}))},goAfter:function(e){t.navigateTo({url:"../../pagesIII/applyAfter/applyAfter?id="+e})},clipboard:function(t){var e=t;f.getClipboardData(e,(function(t){}),t)},init:function(){this.modaishow=!0},messcancel:function(){this.modaishow=!1},goAfterDetail:function(e){t.navigateTo({url:"../../pagesIII/afterDetails/afterDetails?id="+e})},goAfterSaleDetail:function(e){t.navigateTo({url:"../../pagesIII/AfterSaleDetails/AfterSaleDetails?id="+e})},goAfterCancel:function(t,e){this.init(),this.itemid=t,this.idNum=e,u(this.itemid)},goAfterConfirm:function(e){u(e),t.navigateTo({url:"../../pagesIII/confirmAfter/confirmAfter?id="+e})},change:function(t){this.currentTab=t.index,(0===this.currentTab||1===this.currentTab)&&(this.postAfterSalelist(),this.getBeConfirmedData())},detail:function(t){},randomfn:function(){for(var t=[],e=0,n=this.tabBars.length;e<n;e++){var a={loadingText:"正在加载...",refreshing:!1,refreshText:"",data:[],isLoading:!1,pageIndex:1};0===e&&(a.pageIndex=2,a.data=a.data.concat(r)),t.push(a)}return t},getList:function(t,e){var n=this.newsList[t],a=r||[];e?(n.data=[],n.loadingText="正在加载...",n.pageIndex=2,n.data=a||[]):(n.data=n.data.concat(a),n.pageIndex++,n.isLoading=!1,n.pageIndex>3&&(n.loadingText="没有更多了"))},loadMore:function(t){var e=this,n=this.newsList[this.tabIndex];n.pageIndex<4&&!n.isLoading&&(n.isLoading=!0,setTimeout((function(){e.getList(e.tabIndex)}),300))},tabClick:function(t){var e=t.currentTarget.dataset.current;this.switchTab(e)},tabChange:function(t){var e=t.target.current||t.detail.current;this.switchTab(e),this.postAfterSalelist(),this.getBeConfirmedData()},switchTab:function(t){if(this.tabIndex!==t){if(0===this.newsList[t].data.length&&this.getList(t),this.newsList[this.tabIndex].pageIndex>s){var e=this.cacheTab.indexOf(this.tabIndex);e<0&&this.cacheTab.push(this.tabIndex)}this.tabIndex=t;var n=t-1<0?0:t-1;if(this.scrollInto=this.tabBars[n].id,this.cacheTab.length>o){var a=this.cacheTab[0];this.clearTabData(a),this.cacheTab.splice(0,1)}}},clearTabData:function(t){this.newsList[t].data.length=0,this.newsList[t].loadingText="加载更多..."},onrefresh:function(e){var n=this;this.postAfterSalelist(),this.getBeConfirmedData();var a=this.newsList[this.tabIndex];a.refreshing||(a.refreshing=!0,a.refreshText="正在刷新...",setTimeout((function(){n.getList(n.tabIndex,!0),n.pulling=!0,a.refreshing=!1,a.refreshFlag=!1,a.refreshText="刷新成功",t.showToast({title:"刷新成功",icon:"none"}),setTimeout((function(){n.pulling=!1}),500)}),1e3))}}};e.default=l}).call(this,n("543d")["default"])},"8ac6":function(t,e,n){"use strict";(function(t){n("5361");a(n("66fd"));var e=a(n("ad98"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},a07e:function(t,e,n){"use strict";var a=n("cb97"),i=n.n(a);i.a},ad98:function(t,e,n){"use strict";n.r(e);var a=n("f576"),i=n("3b2c");for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);n("a07e"),n("711e");var o,r=n("f0c5"),c=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=c.exports},bd41:function(t,e,n){},cb97:function(t,e,n){},f576:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return a}));var a={tuiListCell:function(){return n.e("components/tui-list-cell/tui-list-cell").then(n.bind(null,"5ba1"))}},i=function(){var t=this,e=t.$createElement;t._self._c},s=[]}},[["8ac6","common/runtime","common/vendor"]]]);