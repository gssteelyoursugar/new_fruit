(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesII/editStore/editStore"],{"0404":function(t,e,a){},"275d":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return s})),a.d(e,"a",(function(){return n}));var n={tuiListView:function(){return a.e("components/tui-list-view/tui-list-view").then(a.bind(null,"aec6"))},tuiListCell:function(){return a.e("components/tui-list-cell/tui-list-cell").then(a.bind(null,"155c"))}},i=function(){var t=this,e=t.$createElement;t._self._c},s=[]},"4e15":function(t,e,a){"use strict";var n=a("0404"),i=a.n(n);i.a},5448:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a("b3d7"),i=a("5c15"),s=console,o=s.log,r=a("8a0f"),c={data:function(){return{urlList:[],imgName:["门头照","水果陈列照","卸货区","工商营业执照"],imgDataLi:[{name:"me_1 ",url:"../../static/images/B@2x.png"},{name:"me_2",url:"../../static/images/B@2x.png"},{name:":me_3",url:"../../static/images/B@2x.png"},{name:":me_4",url:"../../static/images/B@2x.png"}],imgUrlData0:"../../static/images/B@2x.png",imgUrlData1:"../../static/images/B@2x.png",imgUrlData2:"../../static/images/B@2x.png",imgUrlData3:"../../static/images/B@2x.png",updataImg0:"",updataImg1:"",updataImg2:"",updataImg3:"",imagesList:[{url:"../../static/images/B@2x.png"},{url:"../../static/images/B@2x.png"},{url:"../../static/images/B@2x.png"},{url:"../../static/images/B@2x.png"}],storeName:"请填写店铺名",merchantsName:"填写姓名",phone:"1111",address:"南宁",serviceNumber:"请填写客服专员手机号",files:[],imageList:[],category:"image",ctx:{},StoreInfo:{},cartIds:[],imgUrlData:""}},methods:{uploadImages:function(t){var e=this;(0,i.uploadFiles)((function(a){e.imgUrlData.split(","),e.urlList[t].url=a.data}))},postUpdateStore:function(){var e=t.getStorageSync("usermen"),a={storeName:this.StoreInfo.storeName,merchantsName:this.StoreInfo.merchantsName,phone:this.StoreInfo.phone,address:this.StoreInfo.address,token:e,idCard:this.StoreInfo.idCard,fileUrls:JSON.stringify(this.imgDataLi)};(0,n.publicing2)(i.postupdateClient,a).then((function(t){})).catch((function(t){o(t)}))},getMerchants:function(){var e=this,a=t.getStorageSync("usermen"),s={token:a};(0,n.listing)(i.getClient,s).then((function(a){if(a.data.code&&200!=a.data.code)return t.showToast({title:a.data.msg,icon:"none"}),void t.switchTab({url:"../../pages/my/my"});e.ApproveStatus=a.data.data.approveStatus,e.StoreInfo=a.data.data,e.urlList=a.data.data.urlList})).catch((function(t){o(t)}))},postsaveStores:function(e){var a=t.getStorageSync("usermen"),s={storeName:e.detail.value.storeName,merchantsName:e.detail.value.merchantsName,phone:e.detail.value.phone,address:e.detail.value.address,serviceNumber:e.detail.value.serviceNumber,token:a,fileUrls:JSON.stringify(this.imgDataLi)};(0,n.publicing)(i.postSaveStore,s).then((function(e){-1!==e.data.code?500!=e.data.code?200===e.data.code&&t.showToast({title:"".concat(e.data.msg),icon:"none",duration:3e3}):t.showToast({title:"服务器异常,请重试",icon:"none",duration:3e3}):t.showToast({title:"".concat(e.data.msg),icon:"none",duration:3e3})})).catch((function(t){o(t)}))},getToken:function(){t.getStorageSync("usermen")},chooseImage:function(e){var a=this;a.files.length>=9?this.tui.toast("最多上传9张图片"):t.chooseImage({count:9-a.files.length,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(t){a.files=a.files.concat(t.tempFilePaths)}})},previewImage:function(e){t.previewImage({current:e.currentTarget.id,urls:this.files})},deleteImage:function(t){var e=t.index;this.files.splice(e,1)},formSubmit:function(e){var a=[{name:"storeName",rule:["required","minLength:2","maxLength:6"],msg:["请输入店铺名姓名","姓名必须2个或以上字符","姓名不能超过6个字符"]},{name:"mobile",rule:["required","isMobile"],msg:["请输入手机号","请输入正确的手机号"]}],n=e.detail.value,i=r.validation(n,a);i?t.showToast({title:i,icon:"none"}):t.showToast({title:"提交!",icon:"none"})},formReset:function(t){}},onLoad:function(){this.getMerchants()}};e.default=c}).call(this,a("543d")["default"])},"7a09":function(t,e,a){"use strict";a.r(e);var n=a("5448"),i=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,(function(){return n[t]}))}(s);e["default"]=i.a},"8cec":function(t,e,a){"use strict";(function(t){a("54e5");n(a("66fd"));var e=n(a("8df07"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},"8df07":function(t,e,a){"use strict";a.r(e);var n=a("275d"),i=a("7a09");for(var s in i)"default"!==s&&function(t){a.d(e,t,(function(){return i[t]}))}(s);a("4e15");var o,r=a("f0c5"),c=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);e["default"]=c.exports}},[["8cec","common/runtime","common/vendor"]]]);