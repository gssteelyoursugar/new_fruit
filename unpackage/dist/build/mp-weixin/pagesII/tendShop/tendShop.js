(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesII/tendShop/tendShop"],{"0608":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=n("09cc"),i=n("0efb");a(n("a67a"));function a(e){return e&&e.__esModule?e:{default:e}}e.getStorageSync("usermen");var r=console,o=r.log,u=n("d90d"),d=n("7ea5"),c={data:function(){return{flag:!1,selectList:d,multiArray:[],value:[0,0,0],text1:"请选择店铺所处省市区",id:"",addressAllData:[],addressOne:[],addressTwo:[],addressThree:[],urlList:[],modaishow:!1,urlListFlag:[!1,!1,!1,!1],imgDataLi:[{title:"门头照片",name:"me_1",url:"../../static/images/storeup.png"},{title:"水果陈列照片",name:"me_2",url:"../../static/images/storeup.png"},{title:"卸货区",name:"me_3",url:"../../static/images/storeup.png"},{title:"工商营业执照",name:"me_4",url:"../../static/images/storeup.png"}],imagesList:[{url:"../../static/images/B@2x.png"},{url:"../../static/images/B@2x.png"},{url:"../../static/images/B@2x.png"},{url:"../../static/images/B@2x.png"}],storeName:"请填写店铺名，如圈果水果店",merchantsName:"请填写收货人姓名",phone:"请填写收货人手机号码",address:"请选择店铺所处省市区",addressDetails:"请填写街道、门牌号",serviceNumber:"请填写客服专员手机号",files:[],imageList:[],category:"image",ctx:{},idAddress:""}},methods:{picker:function(e){console.log("pick=============",e);var t=e.detail.value,n=this.addressOne[t[0]],s=this.addressTwo[t[1]],i=this.addressThree[t[2]];this.text1=n.name+" "+s.name+" "+i.name,console.log("选中的三级信息======",this.text1),this.idAddress=i.id,o("选中的三级ID======",this.idAddress)},toArr:function(e){var t=[];for(var n in e)t.push(e[n].name);return t},columnPicker:function(e){var t=e.detail.column,n=e.detail.value;if(0===t){var s=this.addressOne[n];console.log("选中的一级===",s.name);var i=this.getAddressByPId(s.id),a=this.getAddressByPId(i[0].id);this.addressTwo=i,this.addressThree=a,this.multiArray=[this.multiArray[0],this.toArr(i),this.toArr(a)],this.value=[n,0,0],o(this.value)}else if(1===t){var r=this.addressTwo[n];console.log("选中的二级===",r.name);var u=this.getAddressByPId(r.id);this.addressThree=u,this.multiArray=[this.multiArray[0],this.multiArray[1],this.toArr(u)],this.value=[this.value[0],n,0]}else if(2===t){var d=this.addressThree[n];console.log("选中的三级===",d.id),this.ADDressID=d.id,console.log(this.ADDressID)}},postAddressDatas:function(){var e=this;(0,s.publicing)(i.postAddressList).then((function(t){e.addressAllData=t.data,e.addressOne=e.getAddressByPId("0"),e.addressTwo=e.getAddressByPId(e.addressOne[0].id),e.addressThree=e.getAddressByPId(e.addressTwo[0].id),e.multiArray=[e.toArr(e.addressOne),e.toArr(e.addressTwo),e.toArr(e.addressThree)]})).catch((function(e){o(e)}))},getAddressByPId:function(e){for(var t=new Array,n=0;n<this.addressAllData.length;n++){var s=this.addressAllData[n];s.pId===e&&t.push(s)}return t},tising:function(e,t){var n=this;this.$nextTick((function(){n.$refs.tips.init(e,t)}))},getUserInfo:function(t){if(o(t),t.detail.userInfo){e.setStorageSync("userIN",t.detail.userInfo);var n=t.detail.userInfo;this.wxCode(n.avatarUrl,n.nickName)}this.modaishow=!1},wxCode:function(e,t){var n=this;wx.login({success:function(e){o(e);var t=e.code;n.wxLoging(t)},fail:function(e){o(e)}})},wxLoging:function(t){o(t);var n={code:t};(0,s.publicing2)(i.loginis,n).then((function(t){o(t.data.token),e.setStorageSync("usermen",t.data.token);e.getStorageSync("usermen");e.showToast({title:"登陆成功"})})).catch((function(e){o(e)}))},init:function(){this.modaishow=!0},messcancel:function(){this.modaishow=!1},uploadImages:function(e){this.flag=!0;var t=this;(0,i.uploadFiles)((function(n){console.log(n.data),t.imgDataLi[e].url=n.data,t.urlListFlag[e]=!0}))},getMerchants:function(){var t=this;e.showLoading({});var n=e.getStorageSync("usermen");n?this.modaishow=!1:(o(n),this.modaishow=!0),o(n);var a={goodsId:this.productID,token:n,number:1};(0,s.listing)(i.getClient,a).then((function(e){o(e),t.ApproveStatus=e.data.data.approveStatus,t.StoreInfo=e.data.data})).catch((function(e){o(e)})),e.hideLoading()},postsaveStores:function(t){e.showLoading({});var n=[{name:"storeName",rule:["required","isChinese","minLength:2","maxLength:20"],msg:["请输入店铺名称","店铺名必须全部为中文","姓名必须2个或以上字符","姓名不能超过6个字符"]},{name:"merchantsName",rule:["required","isChinese","minLength:2","maxLength:4"],msg:["请输入真实性名","姓名必须全部为中文","姓名必须2个或以上字符","不能超过6个字符"]},{name:"phone",rule:["required","isMobile"],msg:["请输入手机号","请输入正确的手机号"]},{name:"address",rule:["minLength:4"],msg:["请选择地区","请选择地区!!!","请选择地区!!!","请选择地区!!!!"]},{name:"address2",rule:["required","isChinese","minLength:4","maxLength:30"],msg:["请填写详细地址","请填写详细地址!!!","请填写详细地址!!!","请填写详细地址!!!!"]}],a=t.detail.value,r=u.validation(a,n);if(r)e.showToast({title:r,icon:"none"});else{var d=new Array;for(var c in this.urlListFlag)this.urlListFlag[c]&&d.push(this.imgDataLi[c]);if(console.log("修改的图片去除没修改的====",d.length),d.length<1)return void e.showToast({title:"至少要上传一张照片",icon:"none"});var l=e.getStorageSync("usermen");o(l);var f={storeName:t.detail.value.storeName,merchantsName:t.detail.value.merchantsName,phone:t.detail.value.phone,address:this.idAddress,addressDetails:t.detail.value.address2,serviceNumber:t.detail.value.serviceNumber,token:l,type:1,fileUrls:JSON.stringify(d)};0==this.flag?(delete f.fileUrls,o("没有上传图片")):1==this.flag&&o("点击了上传图片"),o(f),(0,s.publicing)(i.postSaveStore,f).then((function(t){o(t),e.showToast({title:"".concat(t.data.msg),icon:"none"}),e.switchTab({url:"../../pages/my/my",success:function(){var e=getCurrentPages().pop();void 0!=e&&null!=e&&(e.onLoad(),o("我已经执行跳转"))}})})).catch((function(e){o(e)}))}o(t),e.hideLoading()},getToken:function(){e.getStorageSync("usermen")},postShopping:function(){},previewImage:function(t){e.previewImage({current:t.currentTarget.id,urls:this.files})},deleteImage:function(e){var t=e.index;this.files.splice(t,1)},formSubmit:function(t){var n=[{name:"storeName",rule:["required","isChinese","minLength:2","maxLength:6"],msg:["请输入店铺名","姓名必须全部为中文","姓名必须2个或以上字符","姓名不能超过6个字符"]},{name:"storeName",rule:["required","isChinese","minLength:2","maxLength:6"],msg:["请输入店铺名","姓名必须全部为中文","姓名必须2个或以上字符","姓名不能超过6个字符"]},{name:"phone",rule:["required","isMobile"],msg:["请输入手机号","请输入正确的手机号"]}],s=t.detail.value,i=u.validation(s,n);i?e.showToast({title:i,icon:"none"}):e.showToast({title:"提交!",icon:"none"})},formReset:function(e){console.log("清空数据")}},onPullDownRefresh:function(){this.getMerchants(),console.log("refresh"),setTimeout((function(){e.stopPullDownRefresh()}),1e3)},onLoad:function(){this.postAddressDatas(),this.getToken(),this.getMerchants()}};t.default=c}).call(this,n("543d")["default"])},"122d":function(e,t,n){"use strict";n.r(t);var s=n("6b40"),i=n.n(s);for(var a in s)"default"!==a&&function(e){n.d(t,e,(function(){return s[e]}))}(a);t["default"]=i.a},"150f":function(e,t,n){"use strict";n.r(t);var s=n("0608"),i=n.n(s);for(var a in s)"default"!==a&&function(e){n.d(t,e,(function(){return s[e]}))}(a);t["default"]=i.a},"6b40":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=n("09cc"),i=n("0efb"),a=console,r=a.log,o={data:function(){return{tips:"",modaishow:!1}},methods:{init:function(e,t){this.modaishow=e,this.tips=t},getUserInfo:function(t){this.usering=t.detail.userInfo,e.setStorageSync("userIN",t.detail.userInfo);e.setStorageSync("userIN",t.detail.userInfo);if(t.detail.userInfo){var n=t.detail.userInfo;this.wxCode(n.avatarUrl,n.nickName)}},wxCode:function(e,t){var n=this;wx.login({success:function(e){var t=e.code;n.wxLoging(t)},fail:function(e){r(e)}})},wxLoging:function(t){var n={code:t};e.showLoading({title:"加载中",icon:"none"}),(0,s.publicing2)(i.loginis,n).then((function(t){500!=t.statusCode?(200==t.statusCode&&r(t),r(t),e.setStorageSync("usermen",t.data.token),e.hideLoading()):e.showModal({title:"提示",content:"服务器错误，请重新登录获取信息",success:function(t){(t.confirm||t.cancel)&&e.hideLoading()}})})).catch((function(t){e.showToast({title:"".concat(t)}),r(t)}))}}};t.default=o}).call(this,n("543d")["default"])},"741a":function(e,t,n){"use strict";var s=n("c444"),i=n.n(s);i.a},"84b4":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return s}));var s={tuiListCell:function(){return n.e("components/tui-list-cell/tui-list-cell").then(n.bind(null,"174d"))}},i=function(){var e=this,t=e.$createElement;e._self._c},a=[]},"9a92":function(e,t,n){"use strict";(function(e){n("abd2");s(n("66fd"));var t=s(n("b08c"));function s(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},a67a:function(e,t,n){"use strict";n.r(t);var s=n("c828"),i=n("122d");for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);n("741a");var r,o=n("f0c5"),u=Object(o["a"])(i["default"],s["b"],s["c"],!1,null,"1b7bb252",null,!1,s["a"],r);t["default"]=u.exports},b08c:function(e,t,n){"use strict";n.r(t);var s=n("84b4"),i=n("150f");for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);n("cc22");var r,o=n("f0c5"),u=Object(o["a"])(i["default"],s["b"],s["c"],!1,null,"1a6afb7c",null,!1,s["a"],r);t["default"]=u.exports},c444:function(e,t,n){},c828:function(e,t,n){"use strict";var s;n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return s}));var i=function(){var e=this,t=e.$createElement;e._self._c},a=[]},cc22:function(e,t,n){"use strict";var s=n("e59c"),i=n.n(s);i.a},e59c:function(e,t,n){}},[["9a92","common/runtime","common/vendor"]]]);