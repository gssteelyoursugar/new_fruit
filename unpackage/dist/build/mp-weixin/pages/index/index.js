(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0e4f":function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var n={tuiIcon:function(){return i.e("components/tui-icon/tui-icon").then(i.bind(null,"f464"))},tuiCountdown:function(){return i.e("components/tui-countdown/tui-countdown").then(i.bind(null,"a045"))},tuiNomore:function(){return i.e("components/tui-nomore/tui-nomore").then(i.bind(null,"e246"))}},a=function(){var t=this,e=t.$createElement,i=(t._self._c,t.__map(t.IndexGoods,(function(e,i){var n=t.__get_orig(e),a=(i+1)%2!=0?t._f("filterNum")(e.praiseNumber):null,o=(i+1)%2!=0?t._f("filterNum")(e.total):null;return{$orig:n,f0:a,f1:o}}))),n=t.__map(t.IndexGoods,(function(e,i){var n=t.__get_orig(e),a=(i+1)%2==0?t._f("filterNum")(e.praiseNumber):null,o=(i+1)%2==0?t._f("filterNum")(e.total):null;return{$orig:n,f2:a,f3:o}}));t.$mp.data=Object.assign({},{$root:{l0:i,l1:n}})},o=[]},"42be":function(t,e,i){"use strict";(function(t){i("abd2");n(i("66fd"));var e=n(i("9659"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},"5ec5":function(t,e,i){},9659:function(t,e,i){"use strict";i.r(e);var n=i("0e4f"),a=i("9c6c");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("d732");var s,r=i("f0c5"),c=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"5b89a5b8",null,!1,n["a"],s);e["default"]=c.exports},"9c6c":function(t,e,i){"use strict";i.r(e);var n=i("a7a4"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},a7a4:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n,a=i("2f62"),o=i("09cc"),s=i("0efb");function r(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function c(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?r(Object(i),!0).forEach((function(e){u(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):r(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function u(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var l=function(){i.e("pages/index/components/weather").then(function(){return resolve(i("8d84"))}.bind(null,i)).catch(i.oe)},g=function(){i.e("pages/index/components/banner").then(function(){return resolve(i("a19e"))}.bind(null,i)).catch(i.oe)},d=console,h=d.log,f=!0,p={components:{Weather:l,Banner:g},data:function(){return{showAuthTips:!0,address:"",ApproveStatus:0,itemList:[{title:"首页",icon:"home"},{title:"收藏",icon:"star"},{title:"分享",icon:"partake"}],show:!1,newsList:["致力发展负责任的人工智能 中国发布八大治理原则","格兰仕暗示拜访拼多多后遭天猫打压，拼多多高层赞其有勇气","阿里计划将每股普通股拆为8股，增加筹资灵活性"],NewGoods:[],WxActivityList:[],WeatherHide:!0,startTime:0,endTime:0,createTime:0,ts:0,mm:0,ss1:59,ranking:["销量榜","评价榜","关注榜","回购榜"],imageUrl:"/static/images/paihang@2x.png",rankBgUrl:"/static/images/paihangbang@2x.png",bannerIndex:0,menuShow:!1,popupShow:!1,value:1,collected:!1,WxActivityID:"",IndexGoods:[],WxActivity:{},WxTopNavigationBar:[],WxPostersBottomAdve:[],WxPublicMsg:[],WxPublicMsgID:"",WxIndexViewpager:[],HotVarieties:[],url:"http://192.168.1.10:8980/",opcity:.3,bgOpcity:1,scrollH:0,height:84,heightg:84,top:60,canSee:1,num:0,Sumify:"1",pullUpOn:!0,loadding:!1,pageIndex:1,praiseNum:0,praiseNum1:0,showSearch:!1,showSearch1:!1,key:"0619951c6f113f019b42f0bdc2a0e580",webkey:"0b327e5c35240fd476d7b728bf6c825f",city:"",citys:"",temperature:"",banner:["6.jpg","6.jpg","6.jpg","6.jpg","6.jpg"],flexing:[{title:"推荐好货",name:"猜你喜欢"},{title:"实时鲜果",name:"今天辛苦了"},{title:"产地直供",name:"一手货源"}],dataList:[{name:"销量排行",value:"order_total",title:"跟榜买 不愁卖",imgsrc:"../../static/images/baixiangguo1.png"},{name:"评价排行",value:"evaluate",title:"好货靠口碑",imgsrc:"../../static/images/niuyouguo1.png"},{name:"关注排行",value:"follow",title:"大家都关注",imgsrc:"../../static/images/putao1.png"},{name:"复购排行",value:"back",title:"买了又买",imgsrc:"../../static/images/pingguo1.png"}],statusHeight:20,boxHeight:44,navHeight:64}},methods:(n={getMerchants:function(){var e=this,i=t.getStorageSync("usermen"),n={token:i};(0,o.listing)(s.getClient,n).then((function(t){e.ApproveStatus=t.data.data.approveStatus})).catch((function(t){h(t)}))},rtBubble:function(){this.$refs.rtBubble.toggle()},topBubble:function(){this.show=!this.show},itemClick:function(t){var e=["首页","收藏","分享"][t.index];this.tui.toast("您点击了：".concat(e))},golook:function(){t.navigateTo({url:"../../pagesII/Recently/Recently"})},popupState:function(t){},goTimeInfo:function(e,i,n,a){t.navigateTo({url:"../../pagesII/timeInfo/timeInfo?id="+e+"&content="+i+"&createDate="+a+"&title="+n})},endOfTime:function(){console.log("倒计时结束")},hrefKing:function(e){var i="";switch(e){case 0:i="../../pagesII/ImportedFruit/ImportedFruit";break;case 1:i="../../pagesII/hotFruit/hotFruit";break;case 2:i="../../pagesII/seasonal/seasonal";break;case 3:i="../../pagesII/superValue/superValue";break;case 4:i="../../pagesII/Recently/Recently";break;default:break}i?t.navigateTo({url:i}):t.showToast({title:"功能未完成~",icon:"none"})},goKingarea:function(e){t.navigateTo({url:"../../pagesII/kingarea/kingarea?title="+title})},goMessage:function(){t.navigateTo({url:"../../pagesII/message/message"})},gotoGun:function(){t.switchTab({url:"../../pages/search/search"})},onPageScroll:function(t){this.statusHeight>20?(t.scrollTop<20&&(this.canSee=1-t.scrollTop/10,this.opcity=.3+t.scrollTop/50),t.scrollTop<70&&(this.bgOpcity=1+t.scrollTop/100),t.scrollTop>=70&&(this.opcity=1,this.canSee=0),t.scrollTop>70&&(this.bgOpcity=0)):(t.scrollTop<14&&(this.canSee=1-t.scrollTop/10,this.opcity=.3+t.scrollTop/50),t.scrollTop<40&&(this.bgOpcity=1+t.scrollTop/100),t.scrollTop>=40&&(this.opcity=1,this.canSee=0),t.scrollTop>40&&(this.bgOpcity=0)),0===t.scrollTop&&(this.opcity=0,this.canSee=1)},getUserInfo:function(t){if(this.userInfo=t.detail.userInfo,t.detail.userInfo){var e=t.detail.userInfo;this.wxCode(e.avatarUrl,e.nickName)}},wxCode:function(t,e){var i=this;wx.login({success:function(n){var a=n.code;i.wxLogin(t,e,a)},fail:function(t){h(t)}})},wxLogin:function(e,i,n){var a=this,s={code:n};(0,o.publicing)(loginis,s).then((function(e){t.setStorageSync("usermen",e.data.token),a.ifUser()})).catch((function(t){h(t)}))},ifUser:function(){var e=t.getStorageSync("usermen");e?(t.showToast({title:"已登录",duration:2e3}),this.wxlogin=!0,this.usering=e):(t.showToast({title:"请登录",duration:2e3}),this.wxlogin=!1)},getHomelist:function(){var e=this,i=t.getStorageSync("usermen"),n={pageNo:"1",pageSize:"1000",token:i};(0,o.listing)(s.getIndex,n).then((function(t){e.address=t.data.data.address,e.HotVarieties=t.data.data.HotVarieties,e.WxTopNavigationBar=t.data.data.WxTopNavigationBar,e.WxIndexViewpager=t.data.data.WxIndexViewpager,e.WxPublicMsg=t.data.data.WxPublicMsg,e.WxPublicMsgID=t.data.data.WxPublicMsg.id,e.WxPostersBottomAdve=t.data.data.WxPostersBottomAdve,e.NewGoods=t.data.data.NewGoods.goods,e.WxActivity=t.data.data.WxActivity,e.WxActivityID=t.data.data.WxActivity.id,e.WxActivityList=t.data.data.WxActivity.list,e.startTime=t.data.data.WxActivity.startTime,e.endTime=t.data.data.WxActivity.endTime,e.createTime=t.data.data.WxActivity.createTime,e.ts=(e.endTime-e.createTime)/1e3,e.dd=parseInt(e.ts/60/60/24,10),e.hh=parseInt(e.ts/60/60%24,10),e.mm=parseInt(e.ts/60%60),e.ss=parseInt(e.ts%60,10),h(e.dd+"天"+e.hh+"时"+e.mm+"分"+e.ss+"秒")})).catch((function(t){console.log(t)}))},getIndexClass:function(){var t=this,e={pageNo:"1",pageSize:"10000",indexClassify:this.Sumify};(0,o.listing)(s.getClassify,e).then((function(e){var i=e.data.data.data;t.IndexGoods=i})).catch((function(t){h(t)}))},numConvert:function(t){return t>=1e4?t=Math.round(t/1e3)/10+"万":t>=1e3&&(t=Math.round(t/100)/10+"千"),t}},u(n,"numConvert",(function(t){return t>=1e4?t=Math.round(t/1e3)/10+"w":t>=1e3&&(t=Math.round(t/100)/10+"k"),t})),u(n,"flexClick",(function(t){this.num=t,0===this.num?(this.Sumify=1,this.getIndexClass()):1===this.num?(this.Sumify=2,this.getIndexClass()):2===this.num&&(this.Sumify=3,this.getIndexClass())})),u(n,"goLimit",(function(){var e=this.WxActivityID;t.navigateTo({url:"../../pagesII/Limit/Limit?id="+e})})),u(n,"fruitGo",(function(){t.navigateTo({url:"../../pagesII/fruitList/fruitList"})})),u(n,"goToRank",(function(e,i){t.navigateTo({url:"../../pagesII/rankingList/rankingList?index="+e+"&value="+i})})),u(n,"gotoBreed",(function(e,i){t.navigateTo({url:"../../pagesII/productList/productList?name="+e+"&id="+i})})),u(n,"gotoList",(function(e){t.navigateTo({url:"../../pagesIII/productDetail/productDetail?id="+e})})),u(n,"onPullDownRefresh",(function(){this.getMerchants(),this.getHomelist(),this.getIndexClass();var e=JSON.parse(JSON.stringify(this.IndexGoods));e=e.splice(0,10),this.IndexGoods=e,this.pageIndex=1,this.pullUpOn=!0,this.loadding=!1,t.stopPullDownRefresh(),t.showLoading({title:"刷新中"}),setTimeout((function(){t.hideLoading()}),1e3)})),u(n,"onReachBottom",(function(){if(this.pullUpOn)if(this.loadding=!0,1==this.pageIndex)t.showLoading({title:"加载中"}),t.hideLoading(),this.loadding=!1,this.pullUpOn=!1;else{var e=JSON.parse(JSON.stringify(this.IndexGoods));e=e.splice(0,10),1==this.pageIndex&&(t.showLoading({title:"刷新中"}),e=e.reverse()),this.IndexGoods=this.IndexGoods.concat(e),this.pageIndex=this.pageIndex+1,t.hideLoading(),this.loadding=!1}})),u(n,"praise",(function(t){this.IndexGoods[t].showSearch1||(this.IndexGoods[t].showSearch1=!0,this.IndexGoods[t].praiseNum1++)})),u(n,"praise1",(function(t){f&&(this.showSearch1=!this.showSearch1,this.praiseNum1++,f=!1)})),u(n,"scanCode",(function(){t.scanCode({scanType:["barCode"],success:function(e){t.showModal({title:"提示",content:"条形码类型：".concat(e.scanType,"\n\t\t\t\t\t\t\t\t   条形码内容：").concat(e.result),success:function(t){t.confirm?console.log("用户点击确定"):t.cancel&&console.log("用户点击取消")}})}})})),u(n,"tian",(function(e){var i=this;t.request({url:"https://restapi.amap.com/v3/weather/weatherInfo",method:"GET",data:{key:this.webkey,city:e},success:function(t){i.temperature=t.data.lives[0].temperature,i.citys=t.data.lives[0].city}})})),n),onNavigationBarButtonTap:function(t){0===t.index&&this.$refs.rtBubble.toggle()},onShow:function(){this.getMerchants(),this.getHomelist()},onShareAppMessage:function(){return{title:"测试圈果测试圈果测试圈果测试圈果测试圈果测试圈果测试圈果测试圈果测试圈果测试圈果测试圈果测试圈果测试圈果",imageUrl:"../../static/images/taozi.jpg"}},onLoad:function(){var e=this;this.getMerchants(),this.getIndexClass(),this.getHomelist();var i='{"id":1301422737316712448}',n=i.match(/\d{17,}/)[0];i=i.replace(n,'"'.concat(n,'"'));JSON.parse(i);var a=t.getSystemInfoSync(),o=a.statusBarHeight,s=t.getMenuButtonBoundingClientRect(),r=s.top,c=s.bottom;this.statusHeight=o;var u=c-o+(r-o),l=o+u+r-o;this.boxHeight=l-o,this.navHeight=l,console.log("statusBarHeight,",o,"navHeight",l,"boxHeight",this.boxHeight,"buttonHeight",u),setTimeout((function(){e.showAuthTips=!1}),5e3)},mounted:function(){},filters:{filterNum:function(t){if(t){var e=(Math.floor(t)+"").split(""),i="";return e.length<=4&&(i=t),5===e.length&&(i=e[0]+"."+e[1]+"万"),6===e.length&&(i=e[0]+e[1]+"."+e[2]+"万"),7===e.length&&(i=e[0]+e[1]+e[2]+"."+e[3]+"万"),8===e.length&&(i=e[0]+e[1]+e[2]+e[3]+"."+e[4]+"万"),9===e.length&&(i=e[0]+"."+e[1]+"亿"),10===e.length&&(i=e[0]+e[1]+"."+e[2]+"亿"),i}return t}},computed:c(c({},(0,a.mapState)(["screendata"])),{},{count:function(){this.takeshop=this.screendata.screenarr}})};e.default=p}).call(this,i("543d")["default"])},d732:function(t,e,i){"use strict";var n=i("5ec5"),a=i.n(n);a.a}},[["42be","common/runtime","common/vendor"]]]);