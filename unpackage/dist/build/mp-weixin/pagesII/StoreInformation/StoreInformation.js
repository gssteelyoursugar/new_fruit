(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesII/StoreInformation/StoreInformation"],{"159d":function(e,t,s){"use strict";var a=s("e772"),r=s.n(a);r.a},"4ad0":function(e,t,s){"use strict";s.d(t,"b",(function(){return r})),s.d(t,"c",(function(){return n})),s.d(t,"a",(function(){return a}));var a={tuiListCell:function(){return s.e("components/tui-list-cell/tui-list-cell").then(s.bind(null,"174d"))}},r=function(){var e=this,t=e.$createElement;e._self._c},n=[]},7689:function(e,t,s){"use strict";s.r(t);var a=s("b074"),r=s.n(a);for(var n in a)"default"!==n&&function(e){s.d(t,e,(function(){return a[e]}))}(n);t["default"]=r.a},b074:function(e,t,s){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=s("09cc"),r=s("0efb"),n=e.getStorageSync("usermen"),i=console,d=i.log,o=s("d90d"),l=s("7ea5"),u={data:function(){return{selectList:l,multiArray:[],value:[0,0,0],text1:"请选择店铺所处省市区",id:"",idAddress:"",addressAllData:[],addressOne:[],addressTwo:[],addressThree:[],textAddress:"",approveStatus:0,StoreInfo:{},imagesList:[{url:"../../static/images/B@2x.png"},{url:"../../static/images/B@2x.png"},{url:"../../static/images/B@2x.png"},{url:"../../static/images/B@2x.png"}],urlList:[],storeName:"请填写店铺名",merchantsName:"填写姓名",phone:"1111",address:"南宁",serviceNumber:"",addressInfo:"",files:[],imageList:[],category:"image",ctx:{}}},methods:{picker:function(e){var t=e.detail.value,s=this.addressOne[t[0]],a=this.addressTwo[t[1]],r=this.addressThree[t[2]];this.text1=s.name+" "+a.name+" "+r.name,this.idAddress=r.id},toArr:function(e){var t=[];for(var s in e)t.push(e[s].name);return t},columnPicker:function(e){var t=e.detail.column,s=e.detail.value;if(0===t){var a=this.addressOne[s],r=this.getAddressByPId(a.id),n=this.getAddressByPId(r[0].id);this.addressTwo=r,this.addressThree=n,this.multiArray=[this.multiArray[0],this.toArr(r),this.toArr(n)],this.value=[s,0,0]}else if(1===t){var i=this.addressTwo[s],d=this.getAddressByPId(i.id);this.addressThree=d,this.multiArray=[this.multiArray[0],this.multiArray[1],this.toArr(d)],this.value=[this.value[0],s,0]}else if(2===t){var o=this.addressThree[s];this.ADDressID=o.id}},postAddressDatas:function(){var e=this,t=this;(0,a.publicing)(r.postAddressList).then((function(s){e.addressAllData=s.data,e.addressOne=e.getAddressByPId("0"),e.addressTwo=e.getAddressByPId(e.addressOne[0].id),e.addressThree=e.getAddressByPId(e.addressTwo[0].id),e.multiArray=[e.toArr(e.addressOne),e.toArr(e.addressTwo),e.toArr(e.addressThree)],t.getMerchants()})).catch((function(e){d(e)}))},getAddressByPId:function(e){d(e);for(var t=new Array,s=0;s<this.addressAllData.length;s++){var a=this.addressAllData[s];a.pId===e&&t.push(a)}return t},getAddressById:function(e){d(e);for(var t=0;t<this.addressAllData.length;t++){var s=this.addressAllData[t];if(s.id===e)return d(s),s}return null},sEdit:function(){e.showModal({title:"温馨提示",content:"修改店铺信息需要重修进行审核认证,确定修改?",success:function(t){t.cancel?console.log("用户点击取消"):t.confirm&&(console.log("用户点击确定"),e.navigateTo({url:"../updataStore/updataStore"}))}})},uploadImages:function(e){var t=this;uploadFiles((function(s){console.log(s.data),t.imagesList[e].url=s.data}))},onPullDownRefresh:function(){this.getMerchants(),console.log("refresh"),setTimeout((function(){e.stopPullDownRefresh()}),1e3)},getMerchants:function(){var e=this,t={token:n};(0,a.listing)(r.getClient,t).then((function(t){d(t),e.ApproveStatus=t.data.data.approveStatus,d(e.ApproveStatus),e.StoreInfo=t.data.data,e.urlList=t.data.data.urlList,d(e.StoreInfo);var s=e.getAddressById(e.StoreInfo.address);d(s);var a=e.getAddressById(s.pId),r=e.getAddressById(a.pId);console.log("addThree===",s.name),console.log("addTwo===",a.name),console.log("addOne===",r.name),e.textAddress=r.name+"/"+a.name+"/"+s.name,d(e.textAddress),e.StoreInfo.address=e.textAddress})).catch((function(e){d(e)}))},postsaveStores:function(t){d(t);var s=e.getStorageSync("usermen");d(s);var r={storeName:t.detail.value.storeName,merchantsName:t.detail.value.merchantsName,phone:t.detail.value.phone,address:t.detail.value.address,serviceNumber:t.detail.value.serviceNumber,token:s};d(r),(0,a.publicing)(postSaveStore,r).then((function(t){d(t),e.showToast({title:"".concat(t.data.msg),icon:"none"})})).catch((function(e){d(e)}))},getToken:function(){var t=e.getStorageSync("usermen");d(t)},chooseImage:function(t){var s=this;s.files.length>=9?this.tui.toast("最多上传9张图片"):e.chooseImage({count:9-s.files.length,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(e){s.files=s.files.concat(e.tempFilePaths),console.log(s.files)}})},previewImage:function(t){e.previewImage({current:t.currentTarget.id,urls:this.files})},deleteImage:function(e){var t=e.index;this.files.splice(t,1)},formSubmit:function(t){var s=[{name:"storeName",rule:["required","isChinese","minLength:2","maxLength:6"],msg:["请输入店铺名姓名","姓名必须全部为中文","姓名必须2个或以上字符","姓名不能超过6个字符"]},{name:"mobile",rule:["required","isMobile"],msg:["请输入手机号","请输入正确的手机号"]}],a=t.detail.value,r=o.validation(a,s);r?e.showToast({title:r,icon:"none"}):e.showToast({title:"提交!",icon:"none"})},formReset:function(e){console.log("清空数据")}},onLoad:function(){this.postAddressDatas(),this.getMerchants()}};t.default=u}).call(this,s("543d")["default"])},b275:function(e,t,s){"use strict";s.r(t);var a=s("4ad0"),r=s("7689");for(var n in r)"default"!==n&&function(e){s.d(t,e,(function(){return r[e]}))}(n);s("159d");var i,d=s("f0c5"),o=Object(d["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);t["default"]=o.exports},da82:function(e,t,s){"use strict";(function(e){s("abd2");a(s("66fd"));var t=a(s("b275"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,s("543d")["createPage"])},e772:function(e,t,s){}},[["da82","common/runtime","common/vendor"]]]);