(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/tui-countdown/tui-countdown"],{"06cc":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={name:"tuiCountdown",props:{width:{type:Number,default:25},height:{type:Number,default:25},borderColor:{type:String,default:"#333"},backgroundColor:{type:String,default:"#fff"},size:{type:Number,default:24},color:{type:String,default:"#333"},scale:{type:Boolean,default:!1},colonSize:{type:Number,default:28},colonColor:{type:String,default:"#333"},time:{type:Number,default:0},days:{type:Boolean,default:!1},hours:{type:Boolean,default:!0},minutes:{type:Boolean,default:!0},seconds:{type:Boolean,default:!0},unitEn:{type:Boolean,default:!1},isColon:{type:Boolean,default:!0},returnTime:{type:Boolean,default:!1}},watch:{time:function(t){this.clearTimer(),this.doLoop()}},data:function(){return{countdown:null,d:"0",h:"00",i:"00",s:"00"}},created:function(){this.clearTimer(),this.doLoop()},beforeDestroy:function(){this.clearTimer()},methods:{getWidth:function(t,e){return t>99?e/2*t.toString().length:e},clearTimer:function(){clearInterval(this.countdown),this.countdown=null},endOfTime:function(){this.clearTimer(),this.$emit("end",{})},doLoop:function(){var t=this,e=this.time||0;this.countDown(e),this.countdown=setInterval((function(){e--,e<0?t.endOfTime():(t.countDown(e),t.returnTime&&t.$emit("time",{seconds:e}))}),1e3)},countDown:function(t){var e=0,n=0,o=0,i=0;t>0?(e=this.days?Math.floor(t/86400):0,n=this.hours?Math.floor(t/3600)-24*e:0,o=this.minutes?Math.floor(t/60)-60*n-24*e*60:0,i=Math.floor(t)-24*e*60*60-60*n*60-60*o):this.endOfTime(),n=n<10?"0"+n:n,o=o<10?"0"+o:o,i=i<10?"0"+i:i,this.d=e,this.h=n,this.i=o,this.s=i}}};e.default=o},3055:function(t,e,n){},"43a3":function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return o}));var i=function(){var t=this,e=t.$createElement,n=(t._self._c,t.days?t.getWidth(t.d,t.width):null),o=t.hours?t.getWidth(t.h,t.width):null,i=t.minutes?t.getWidth(t.i,t.width):null,u=t.seconds?t.getWidth(t.s,t.width):null;t.$mp.data=Object.assign({},{$root:{m0:n,m1:o,m2:i,m3:u}})},u=[]},"4bd2":function(t,e,n){"use strict";n.r(e);var o=n("06cc"),i=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);e["default"]=i.a},56194:function(t,e,n){"use strict";var o=n("3055"),i=n.n(o);i.a},a045:function(t,e,n){"use strict";n.r(e);var o=n("43a3"),i=n("4bd2");for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);n("56194");var r,a=n("f0c5"),l=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,"5ba84d0c",null,!1,o["a"],r);e["default"]=l.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/tui-countdown/tui-countdown-create-component',
    {
        'components/tui-countdown/tui-countdown-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("a045"))
        })
    },
    [['components/tui-countdown/tui-countdown-create-component']]
]);
