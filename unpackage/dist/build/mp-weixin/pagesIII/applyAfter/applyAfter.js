(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesIII/applyAfter/applyAfter"],{1376:function(t,e,i){"use strict";var n=i("7c83"),a=i.n(n);a.a},"50bc":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i("09cc"),a=i("0efb"),o=i("bb55"),s=console,c=s.log,l={data:function(){return{textTip:"请您在此描述详细问题(可输入100字)",imageList:[],category:"video",modaishow:!1,files:[],id:"",goodsData:{},array:["中国","美国","巴西","日本"],index:0,ValueList:[],ValueText:"请选择申请原因",Describe:"",flag:!1,labelList:[],VideoDatas:"",flagColor:!1}},methods:{successVideo:function(t){var e=JSON.parse(t.data);this.VideoDatas=e.data,c(this.VideoDatas)},goBack:function(){t.navigateBack({})},clipboard:function(t){var e=t;o.getClipboardData(e,(function(t){}),t)},goAfterSale:function(){t.redirectTo({url:"../../pagesIII/navbar/navbar"})},chooseImage:function(e){var i=this;i.files.length>=5?c("最多上传9张图片"):t.chooseImage({count:5-i.files.length,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(t){c(t),i.files=i.files.concat(t.tempFilePaths)}})},bindPickerChange:function(t){c(t),this.index=t.target.value,this.ValueText=this.ValueList[t.target.value],this.flagColor=!0},bindPicker:function(){},getGoods:function(){var e=this,i=t.getStorageSync("usermen"),o={id:this.id,token:i};(0,n.listing)(a.getDetails,o).then((function(t){e.goodsData=t.data.data[0],e.labelList=t.data.data[0].labelList})).catch((function(t){c(t)}))},uploadImages:function(t){this.flag=!0;var e=this;e.files.length>=5?c("最多上传5张图片"):(0,a.uploadFiles)((function(t){e.files=e.files.concat(t.data)}))},submitSave:function(){var e=this;if(0!=this.flagColor)if(""!=this.Describe){c("成了");var i=t.getStorageSync("usermen"),o=this.files.toString()+","+this.VideoDatas;c(o);var s={orderItemId:this.id,afterSaleDescribe:this.Describe,cause:this.index,fileUrls:o,token:i};0==this.flag?(delete s.fileUrls,c("没有上传图片")):1==this.flag&&c("点击了上传图片"),c(s),(0,n.publicing)(a.posAfterSale,s).then((function(i){c(i);var n=i.data.code;200==n?(e.Describe="",e.textTip="",e.modaishow=!0):t.showToast({title:"申请失败",icon:"none",duration:2e3})})).catch((function(t){c(t)}))}else t.showToast({title:"填写描述",icon:"none",duration:2e3});else t.showToast({title:"请选择申请原因",icon:"none",duration:2e3})},previewImage:function(e){t.previewImage({current:e.currentTarget.id,urls:this.files})},deleteImage:function(t){var e=t.index;this.files.splice(e,1)},getDictValue:function(){var e=this,i=t.getStorageSync("usermen");this.id;(0,n.listing2)(a.getAfterSaleData).then((function(t){e.ValueList=t.data.data.data;var i=e.ValueList.map((function(t){return t.treeNames}));e.ValueList=i,c(e.ValueList)})).catch((function(t){console.log(t)}))}},onLoad:function(t){this.id=t.id,this.getGoods(),this.getDictValue()}};e.default=l}).call(this,i("543d")["default"])},"539b":function(t,e,i){"use strict";i.r(e);var n=i("ca82"),a=i("b1ca");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("1376");var s,c=i("f0c5"),l=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);e["default"]=l.exports},"7c83":function(t,e,i){},b1ca:function(t,e,i){"use strict";i.r(e);var n=i("50bc"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},ca82:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var n={tuiListCell:function(){return i.e("components/tui-list-cell/tui-list-cell").then(i.bind(null,"174d"))},tuiIcon:function(){return i.e("components/tui-icon/tui-icon").then(i.bind(null,"f464"))},easyUpload:function(){return i.e("components/easy-upload/easy-upload").then(i.bind(null,"d3d1"))}},a=function(){var t=this,e=t.$createElement;t._self._c},o=[]},e9f3:function(t,e,i){"use strict";(function(t){i("abd2");n(i("66fd"));var e=n(i("539b"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])}},[["e9f3","common/runtime","common/vendor"]]]);