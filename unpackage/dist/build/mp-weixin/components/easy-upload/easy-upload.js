(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/easy-upload/easy-upload"],{"3fc2":function(t,e,a){"use strict";var n=a("40e8"),o=a.n(n);o.a},"40e8":function(t,e,a){},"50aa":function(t,e,a){"use strict";a.r(e);var n=a("d1a5"),o=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);e["default"]=o.a},"98c5":function(t,e,a){"use strict";a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return n}));var n={tuiIcon:function(){return a.e("components/tui-icon/tui-icon").then(a.bind(null,"eeeb"))}},o=function(){var t=this,e=t.$createElement;t._self._c},r=[]},d1a5:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a("ca88");function o(t,e){var a;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(a=u(t))||e&&t&&"number"===typeof t.length){a&&(t=a);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,i=!0,s=!1;return{s:function(){a=t[Symbol.iterator]()},n:function(){var t=a.next();return i=t.done,t},e:function(t){s=!0,r=t},f:function(){try{i||null==a.return||a.return()}finally{if(s)throw r}}}}function r(t){return l(t)||s(t)||u(t)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(t,e){if(t){if("string"===typeof t)return c(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?c(t,e):void 0}}function s(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function l(t){if(Array.isArray(t))return c(t)}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}var d={props:{types:{type:String,default:"image"},dataList:{type:Array,default:function(){return[]}},clearIcon:{type:String,default:""},uploadIcon:{type:String,default:"../../static/images/videoImg.png"},uploadUrl:{type:String,default:n.uploading},deleteUrl:{type:String,default:""},uploadCount:{type:Number,default:1},upload_max:{type:Number,default:100}},data:function(){return{uploadImages:[],uploads:[],exceeded_list:[]}},mounted:function(){this.uploads=this.dataList},methods:{previewImage:function(e){var a=e.target.dataset.src;t.previewImage({current:a,urls:this.dataList})},chooseUploads:function(){var e=this;switch(this.types){case"image":t.chooseImage({count:this.uploadCount-this.uploads.length,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(a){for(var n=0;n<a.tempFiles.length;n++)Math.ceil(a.tempFiles[n].size/1024)<1024*e.upload_max?(e.uploads.push(a.tempFiles[n].path),e.uploadImages.push(a.tempFiles[n].path)):(e.exceeded_list.push(0===n?1:n+1),t.showModal({title:"提示",content:"第".concat(r(new Set(e.exceeded_list)).join(","),"张图片超出限制").concat(e.upload_max,"MB,已过滤")}))},fail:function(e){t.showModal({content:JSON.stringify(e)})}});break;case"video":t.chooseVideo({sourceType:["camera","album"],success:function(a){a.size;Math.ceil(a.size/1024)<1024*e.upload_max?(e.uploads.push(a.tempFilePath),t.showLoading({title:"上传中..."}),t.uploadFile({url:n.uploading,filePath:a.tempFilePath,name:"file",formData:{user:"test"},success:function(a){e.uploadFileResData=JSON.parse(a.data),e.uploadData=e.uploadFileResData.data,e.$emit("successVideo",a),t.hideLoading()}})):t.showModal({title:"提示",content:"第".concat(r(new Set(e.exceeded_list)).join(","),"张视频超出限制").concat(e.upload_max,"MB,已过滤")})},fail:function(t){console.log(t)}});break}},delImage:function(e){var a=this;"http"===this.uploads[e].substring(0,4)&&"http://tmp/"!=this.uploads[e].substring(0,11)?this.deleteUrl?t.request({url:this.deleteUrl,method:"DELETE",data:{image:this.dataList[e]},success:function(n){1==n.data.status&&(t.showToast({title:"删除成功"}),a.uploads.splice(e,1))}}):t.showModal({content:"请填写删除接口"}):this.uploads.splice(e,1)},upload:function(){var e=this;if(this.uploadUrl){var a,r=o(this.uploadImages);try{for(r.s();!(a=r.n()).done;){var i=a.value;t.uploadFile({url:n.uploading,filePath:i,name:"file",formData:{user:"test"},success:function(t){e.$emit("successImage",t)}})}}catch(u){r.e(u)}finally{r.f()}}else t.showModal({content:n.uploading})}}};e.default=d}).call(this,a("543d")["default"])},fe9a:function(t,e,a){"use strict";a.r(e);var n=a("98c5"),o=a("50aa");for(var r in o)"default"!==r&&function(t){a.d(e,t,(function(){return o[t]}))}(r);a("3fc2");var i,u=a("f0c5"),s=Object(u["a"])(o["default"],n["b"],n["c"],!1,null,"4a3fcc78",null,!1,n["a"],i);e["default"]=s.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/easy-upload/easy-upload-create-component',
    {
        'components/easy-upload/easy-upload-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("fe9a"))
        })
    },
    [['components/easy-upload/easy-upload-create-component']]
]);
