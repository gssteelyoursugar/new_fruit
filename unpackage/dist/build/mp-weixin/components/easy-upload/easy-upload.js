(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/easy-upload/easy-upload"],{1318:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}));var a={tuiIcon:function(){return n.e("components/tui-icon/tui-icon").then(n.bind(null,"f464"))}},o=function(){var t=this,e=t.$createElement;t._self._c},r=[]},"3e40":function(t,e,n){"use strict";n.r(e);var a=n("5d0a"),o=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=o.a},"5d0a":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("0efb");function o(t,e){var n;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=u(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var a=0,o=function(){};return{s:o,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,i=!0,l=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return i=t.done,t},e:function(t){l=!0,r=t},f:function(){try{i||null==n.return||n.return()}finally{if(l)throw r}}}}function r(t){return s(t)||l(t)||u(t)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(t,e){if(t){if("string"===typeof t)return c(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(t,e):void 0}}function l(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function s(t){if(Array.isArray(t))return c(t)}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}var d={props:{types:{type:String,default:"image"},dataList:{type:Array,default:function(){return[]}},clearIcon:{type:String,default:""},uploadIcon:{type:String,default:"../../static/images/videoImg.png"},uploadUrl:{type:String,default:a.uploading},deleteUrl:{type:String,default:""},uploadCount:{type:Number,default:1},upload_max:{type:Number,default:100}},data:function(){return{uploadImages:[],uploads:[],exceeded_list:[]}},mounted:function(){this.uploads=this.dataList},methods:{previewImage:function(e){var n=e.target.dataset.src;t.previewImage({current:n,urls:this.dataList})},chooseUploads:function(){var e=this;switch(this.types){case"image":t.chooseImage({count:this.uploadCount-this.uploads.length,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(n){for(var a=0;a<n.tempFiles.length;a++)Math.ceil(n.tempFiles[a].size/1024)<1024*e.upload_max?(e.uploads.push(n.tempFiles[a].path),e.uploadImages.push(n.tempFiles[a].path)):(e.exceeded_list.push(0===a?1:a+1),t.showModal({title:"提示",content:"第".concat(r(new Set(e.exceeded_list)).join(","),"张图片超出限制").concat(e.upload_max,"MB,已过滤")}))},fail:function(e){t.showModal({content:JSON.stringify(e)})}});break;case"video":t.chooseVideo({sourceType:["camera","album"],success:function(n){n.size;console.log(n.tempFilePath),Math.ceil(n.size/1024)<1024*e.upload_max?(e.uploads.push(n.tempFilePath),t.showLoading({title:"上传中..."}),t.uploadFile({url:a.uploading,filePath:n.tempFilePath,name:"file",formData:{user:"test"},success:function(n){console.log(JSON.parse(n.data)),e.uploadFileResData=JSON.parse(n.data),e.uploadData=e.uploadFileResData.data,e.$emit("successVideo",n),t.hideLoading()}})):t.showModal({title:"提示",content:"第".concat(r(new Set(e.exceeded_list)).join(","),"张视频超出限制").concat(e.upload_max,"MB,已过滤")})},fail:function(t){console.log(t)}});break}},delImage:function(e){var n=this;"http"===this.uploads[e].substring(0,4)&&"http://tmp/"!=this.uploads[e].substring(0,11)?this.deleteUrl?t.request({url:this.deleteUrl,method:"DELETE",data:{image:this.dataList[e]},success:function(a){1==a.data.status&&(t.showToast({title:"删除成功"}),n.uploads.splice(e,1))}}):t.showModal({content:"请填写删除接口"}):this.uploads.splice(e,1)},upload:function(){var e=this;if(this.uploadUrl){var n,r=o(this.uploadImages);try{for(r.s();!(n=r.n()).done;){var i=n.value;t.uploadFile({url:a.uploading,filePath:i,name:"file",formData:{user:"test"},success:function(t){e.$emit("successImage",t)}})}}catch(u){r.e(u)}finally{r.f()}}else t.showModal({content:a.uploading})}}};e.default=d}).call(this,n("543d")["default"])},"6e38":function(t,e,n){},7669:function(t,e,n){"use strict";var a=n("6e38"),o=n.n(a);o.a},d3d1:function(t,e,n){"use strict";n.r(e);var a=n("1318"),o=n("3e40");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("7669");var i,u=n("f0c5"),l=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,"7b92de92",null,!1,a["a"],i);e["default"]=l.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/easy-upload/easy-upload-create-component',
    {
        'components/easy-upload/easy-upload-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("d3d1"))
        })
    },
    [['components/easy-upload/easy-upload-create-component']]
]);