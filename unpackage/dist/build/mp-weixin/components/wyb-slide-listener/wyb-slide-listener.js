(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/wyb-slide-listener/wyb-slide-listener"],{"0533":function(t,s,e){"use strict";var i;e.d(s,"b",(function(){return a})),e.d(s,"c",(function(){return r})),e.d(s,"a",(function(){return i}));var a=function(){var t=this,s=t.$createElement;t._self._c},r=[]},"380f":function(t,s,e){"use strict";e.r(s);var i=e("0533"),a=e("92a5");for(var r in a)"default"!==r&&function(t){e.d(s,t,(function(){return a[t]}))}(r);var h,n=e("f0c5"),l=Object(n["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],h);s["default"]=l.exports},"92a5":function(t,s,e){"use strict";e.r(s);var i=e("f0ca"),a=e.n(i);for(var r in i)"default"!==r&&function(t){e.d(s,t,(function(){return i[t]}))}(r);s["default"]=a.a},f0ca:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var i=30,a=45,r=45,h=Math.tan(a),n=Math.tan(r),l=1e3,u=0,f={},c={name:"wyb-slide-listener",data:function(){return{startX:0,startY:0,lastX:0,lastY:0}},props:{vertDeg:{type:Number,default:45},horiDeg:{type:Number,default:45},vertDif:{type:Number,default:30},horiDif:{type:Number,default:30},timeLim:{type:Number,default:1e3}},created:function(){a=this.vertDeg,r=this.horiDeg,i=this.vertDif,this.horiDif,l=this.timeLim},methods:{touchStart:function(t){this.startX=t.touches[0].clientX,this.startY=t.touches[0].clientY,f=setInterval((function(){u+=100}),100)},touchEnd:function(t){this.lastX=t.changedTouches[0].clientX,this.lastY=t.changedTouches[0].clientY;var s={point:{startX:this.startX,startY:this.startY,lastX:this.lastX,lastY:this.lastY},difference:{differenceAbsX:Math.abs(this.startX-this.lastX),differenceAbsY:Math.abs(this.startY-this.lastY),differenceX:this.startX-this.lastX,differenceY:this.startY-this.lastY},stayTime:u};clearInterval(f),u<=l&&(Math.abs((this.lastX-this.startX)/(this.lastY-this.startY))<h?Math.abs(this.startY-this.lastY)>=i&&this.startY-this.lastY>0?(s["type"]="slideUp",this.$emit("slideUp",s)):Math.abs(this.startY-this.lastY)>=i&&this.startY-this.lastY<0&&(s["type"]="slideDown",this.$emit("slideDown",s)):Math.abs((this.lastY-this.startY)/(this.lastX-this.startX))<n&&(Math.abs(this.startX-this.lastX)>=i&&this.startX-this.lastX>0?(s["type"]="slideLeft",this.$emit("slideLeft",s)):Math.abs(this.startX-this.lastX)>=i&&this.startX-this.lastX<0&&(s["type"]="slideRight",this.$emit("slideRight",s)))),u=0}}};s.default=c}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/wyb-slide-listener/wyb-slide-listener-create-component',
    {
        'components/wyb-slide-listener/wyb-slide-listener-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("380f"))
        })
    },
    [['components/wyb-slide-listener/wyb-slide-listener-create-component']]
]);
