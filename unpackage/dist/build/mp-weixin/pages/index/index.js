(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"11d0":function(t,e,n){"use strict";(function(t){n("a4d8");i(n("66fd"));var e=i(n("db7e"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"18fa":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i,a=n("2f62"),o=c(n("7b75")),s=n("a6ff"),r=n("ca88");function c(t){return t&&t.__esModule?t:{default:t}}function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){d(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function d(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var g=function(){n.e("pages/index/components/weather").then(function(){return resolve(n("d5fa"))}.bind(null,n)).catch(n.oe)},f=function(){n.e("pages/index/components/banner").then(function(){return resolve(n("59a1"))}.bind(null,n)).catch(n.oe)},h=console,p=h.log,m=!0,b={components:{Weather:g,Banner:f},data:function(){var t;return t={topss:0,showAuthTips:!0,address:"",ApproveStatus:0,itemList:[{title:"首页",icon:"home"},{title:"收藏",icon:"star"},{title:"分享",icon:"partake"}],show:!1,NewGoods:[],WxActivityList:[],WeatherHide:!0,startTime:0,endTime:0,createTime:0,ts:0,mm:0,ss1:59,imageUrl:"/static/images/paihang@2x.png",WxActivityID:"",IndexGoods:[],WxActivity:{},WxTopNavigationBar:[],WxPostersBottomAdve:[],WxPublicMsg:[],WxPublicMsgID:"",WxIndexViewpager:[],HotVarieties:[],url:"http://192.168.1.10:8980/",opcity:.3,bgOpcity:1,scrollH:0,height:84,heightg:84,top:60,canSee:1,num:0,Sumify:"1",noMore:!1,loadding:!1,pageIndex:1,praiseNum:0,praiseNum1:0,showSearch:!1,showSearch1:!1,key:"0619951c6f113f019b42f0bdc2a0e580",webkey:"0b327e5c35240fd476d7b728bf6c825f",city:"",citys:"",temperature:"",amapPlugin:null},d(t,"key","69d24a06f6710467afea85cb0c8db3e1"),d(t,"banner",["6.jpg","6.jpg","6.jpg","6.jpg","6.jpg"]),d(t,"flexing",[{title:"推荐好货",name:"猜你喜欢"},{title:"实时鲜果",name:"今天辛苦了"},{title:"产地直供",name:"一手货源"}]),d(t,"dataList",[{name:"销量排行",value:"shop",title:"跟榜买 不愁卖",imgsrc:"../../static/images/rank_1.png"},{name:"评价排行",value:"praise",title:"好货靠口碑",imgsrc:"../../static/images/rank_2.png"},{name:"关注排行",value:"follow",title:"大家都关注",imgsrc:"../../static/images/rank_3.png"},{name:"复购排行",value:"back",title:"买了又买",imgsrc:"../../static/images/rank_4.png"}]),d(t,"statusHeight",20),d(t,"boxHeight",44),d(t,"navHeight",64),d(t,"weatherObj",{weather:"",temperature:""}),d(t,"tempData",{pageNo:1,pageSize:10}),t},onReachBottom:function(){this.noMore?t.showToast({title:"没有更多啦~",icon:"none"}):(this.tempData.pageNo++,this.getIndexClass())},methods:(i={flexClick:function(t){this.num=t,this.IndexGoods=[],this.tempData.pageNo=1,this.noMore=!1,0===this.num?this.Sumify=1:1===this.num?this.Sumify=2:2===this.num&&(this.Sumify=3),this.getIndexClass()},getIndexClass:function(){var t=this,e=Object.assign({indexClassify:this.Sumify},this.tempData);(0,s.listing)(r.getClassify,e).then((function(e){var n=e.data.data.data;t.IndexGoods=t.IndexGoods.concat(n),(0==n.length||n.length<t.tempData.pageSize)&&(t.noMore=!0)})).catch((function(t){p(t)}))},getHomelist:function(){var e=this,n=t.getStorageSync("usermen"),i={pageNo:"1",pageSize:"1000",token:n};(0,s.listing)(r.getIndex,i).then((function(t){e.address=t.data.data.address,e.HotVarieties=t.data.data.HotVarieties,e.WxTopNavigationBar=t.data.data.WxTopNavigationBar,e.WxIndexViewpager=t.data.data.WxIndexViewpager,e.WxPublicMsg=t.data.data.WxPublicMsg,e.WxPublicMsgID=t.data.data.WxPublicMsg.id,e.WxPostersBottomAdve=t.data.data.WxPostersBottomAdve,e.NewGoods=t.data.data.NewGoods.goods,e.WxActivity=t.data.data.WxActivity,e.WxActivityID=t.data.data.WxActivity.id,e.WxActivityList=t.data.data.WxActivity.list,e.startTime=t.data.data.WxActivity.startTime,e.endTime=t.data.data.WxActivity.endTime,e.createTime=t.data.data.WxActivity.createTime,e.ts=(e.endTime-e.createTime)/1e3,e.dd=parseInt(e.ts/60/60/24,10),e.hh=parseInt(e.ts/60/60%24,10),e.mm=parseInt(e.ts/60%60),e.ss=parseInt(e.ts%60,10)})).catch((function(t){console.log(t)}))},goToLimit:function(e){t.navigateTo({url:e.url})},getMerchants:function(){var e=this,n=t.getStorageSync("usermen");if(n){var i={token:n};(0,s.listing)(r.getClient,i).then((function(n){if(n.data.code&&200!=n.data.code)return t.showToast({title:n.data.msg,icon:"none",duration:3e3}),e.ApproveStatus=void 0,void t.switchTab({url:"../my/my"});e.ApproveStatus=n.data.data.approveStatus;var i=n.data.data.address;e.amapPlugin=new o.default.AMapWX({key:e.key}),e.amapPlugin.getWeather({city:i,success:function(t){e.weatherObj.temperature=t.liveData.temperature,e.weatherObj.weather=t.liveData.weather}})})).catch((function(t){p(t)}))}else this.ApproveStatus=0},rtBubble:function(){this.$refs.rtBubble.toggle()},topBubble:function(){this.show=!this.show},itemClick:function(t){var e=["首页","收藏","分享"][t.index];this.tui.toast("您点击了：".concat(e))},golook:function(){t.navigateTo({url:"../../pagesII/Recently/Recently"})},popupState:function(t){},goTimeInfo:function(e,n,i,a){t.navigateTo({url:"../../pagesII/timeInfo/timeInfo?id="+e+"&content="+n+"&createDate="+a+"&title="+i})},endOfTime:function(){},hrefKing:function(e){var n="";switch(e){case 0:n="../../pagesII/seasonal/seasonal";break;case 1:n="../../pagesII/hotFruit/hotFruit";break;case 2:n="../../pagesII/ImportedFruit/ImportedFruit";break;case 3:n="../../pagesII/superValue/superValue";break;case 4:n="../../pagesII/Recently/Recently";break;default:break}n?t.navigateTo({url:n}):t.showToast({title:"功能未完成~",icon:"none"})},goMessage:function(){t.navigateTo({url:"../../pagesII/message/message"})},gotoGun:function(){t.switchTab({url:"../../pages/search/search"})},onPageScroll:function(t){this.topss=t.scrollTop,this.statusHeight>20?(t.scrollTop<20&&(this.canSee=1-t.scrollTop/10,this.opcity=.3+t.scrollTop/50),t.scrollTop<70&&(this.bgOpcity=1+t.scrollTop/100),t.scrollTop>=70&&(this.opcity=1,this.canSee=0),t.scrollTop>70&&(this.bgOpcity=0)):(t.scrollTop<14&&(this.canSee=1-t.scrollTop/10,this.opcity=.3+t.scrollTop/50),t.scrollTop<40&&(this.bgOpcity=1+t.scrollTop/100),t.scrollTop>=40&&(this.opcity=1,this.canSee=0),t.scrollTop>40&&(this.bgOpcity=0)),0===t.scrollTop&&(this.opcity=0,this.canSee=1)},getUserInfo:function(t){if(this.userInfo=t.detail.userInfo,t.detail.userInfo){var e=t.detail.userInfo;this.wxCode(e.avatarUrl,e.nickName)}},wxCode:function(t,e){var n=this;wx.login({success:function(i){var a=i.code;n.wxLogin(t,e,a)},fail:function(t){p(t)}})},wxLogin:function(e,n,i){var a=this,o={code:i};(0,s.publicing)(loginis,o).then((function(e){t.setStorageSync("usermen",e.data.token),a.ifUser()})).catch((function(t){p(t)}))},ifUser:function(){var e=t.getStorageSync("usermen");e?(t.showToast({title:"已登录",duration:2e3}),this.wxlogin=!0,this.usering=e):(t.showToast({title:"请登录",duration:2e3}),this.wxlogin=!1)},numConvert:function(t){return t>=1e4?t=Math.round(t/1e3)/10+"万":t>=1e3&&(t=Math.round(t/100)/10+"千"),t}},d(i,"numConvert",(function(t){return t>=1e4?t=Math.round(t/1e3)/10+"w":t>=1e3&&(t=Math.round(t/100)/10+"k"),t})),d(i,"goLimit",(function(){var e=this.WxActivityID;t.navigateTo({url:"../../pagesII/Limit/Limit?id="+e})})),d(i,"fruitGo",(function(){t.navigateTo({url:"../../pagesII/fruitList/fruitList"})})),d(i,"goToRank",(function(e,n){t.navigateTo({url:"../../pagesII/rankingList/rankingList?index="+e+"&value="+n})})),d(i,"gotoBreed",(function(e,n){t.navigateTo({url:"../../pagesII/productList/productList?name="+e+"&id="+n})})),d(i,"gotoList",(function(e){t.navigateTo({url:"../../pagesIII/productDetail/productDetail?id="+e})})),d(i,"praise",(function(t){this.IndexGoods[t].showSearch1||(this.IndexGoods[t].showSearch1=!0,this.IndexGoods[t].praiseNum1++)})),d(i,"praise1",(function(t){m&&(this.showSearch1=!this.showSearch1,this.praiseNum1++,m=!1)})),d(i,"scanCode",(function(){t.scanCode({scanType:["barCode"],success:function(e){t.showModal({title:"提示",content:"条形码类型：".concat(e.scanType,"\n\t\t\t\t\t\t\t\t   条形码内容：").concat(e.result),success:function(t){t.confirm||t.cancel}})}})})),i),onPullDownRefresh:function(){this.IndexGoods=[],this.tempData.pageNo=1,this.noMore=!1,this.getMerchants(),this.getHomelist(),this.getIndexClass(),t.stopPullDownRefresh()},onLoad:function(){var e=this;this.getMerchants(),this.getIndexClass(),this.getHomelist();var n=t.getSystemInfoSync(),i=n.statusBarHeight,a=t.getMenuButtonBoundingClientRect(),o=a.top,s=a.bottom;this.statusHeight=i;var r=s-i+(o-i),c=i+r+o-i;this.boxHeight=c-i,this.navHeight=c,setTimeout((function(){e.showAuthTips=!1}),5e3)},onNavigationBarButtonTap:function(t){0===t.index&&this.$refs.rtBubble.toggle()},onShow:function(){this.getMerchants(),this.getHomelist()},onShareAppMessage:function(){return{title:"",imageUrl:"../../static/images/taozi.jpg"}},mounted:function(){},filters:{filterNum:function(t){if(t){var e=(Math.floor(t)+"").split(""),n="";return e.length<=4&&(n=t),5===e.length&&(n=e[0]+"."+e[1]+"万"),6===e.length&&(n=e[0]+e[1]+"."+e[2]+"万"),7===e.length&&(n=e[0]+e[1]+e[2]+"."+e[3]+"万"),8===e.length&&(n=e[0]+e[1]+e[2]+e[3]+"."+e[4]+"万"),9===e.length&&(n=e[0]+"."+e[1]+"亿"),10===e.length&&(n=e[0]+e[1]+"."+e[2]+"亿"),n}return t}},computed:l(l({},(0,a.mapState)(["screendata"])),{},{count:function(){this.takeshop=this.screendata.screenarr}})};e.default=b}).call(this,n("543d")["default"])},"3a2d":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={tuiIcon:function(){return n.e("components/tui-icon/tui-icon").then(n.bind(null,"eeeb"))},tuiCountdown:function(){return n.e("components/tui-countdown/tui-countdown").then(n.bind(null,"69a1"))},tuiNomore:function(){return n.e("components/tui-nomore/tui-nomore").then(n.bind(null,"3fa6"))},backTop:function(){return n.e("components/back-top/back-top").then(n.bind(null,"4468"))}},a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.IndexGoods,(function(e,n){var i=t.__get_orig(e),a=(n+1)%2!=0?t._f("filterNum")(e.praiseNumber):null,o=(n+1)%2!=0?t._f("filterNum")(e.total):null;return{$orig:i,f0:a,f1:o}}))),i=t.__map(t.IndexGoods,(function(e,n){var i=t.__get_orig(e),a=(n+1)%2==0?t._f("filterNum")(e.praiseNumber):null,o=(n+1)%2==0?t._f("filterNum")(e.total):null;return{$orig:i,f2:a,f3:o}}));t.$mp.data=Object.assign({},{$root:{l0:n,l1:i}})},o=[]},"81fb":function(t,e,n){"use strict";var i=n("e584"),a=n.n(i);a.a},ade3:function(t,e,n){"use strict";n.r(e);var i=n("18fa"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},db7e:function(t,e,n){"use strict";n.r(e);var i=n("3a2d"),a=n("ade3");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("81fb");var s,r=n("f0c5"),c=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"cc5d7eac",null,!1,i["a"],s);e["default"]=c.exports},e584:function(t,e,n){}},[["11d0","common/runtime","common/vendor"]]]);