### pyh-goodsSwiper 商品组swiper组件

商品组swiper组件，组件名：``goodsSwiper``，代码块： goodsSwiper。

**使用方式：**

在 ``script`` 中引用组件 

```javascript
单页面引用
import goodsSwiper from "@/components/pyh-goodsSwiper/pyh-goodsSwiper.vue"
export default {
    components: {goodsSwiper}
}
```

在 ``template`` 中使用组件

```html
<goodsSwiper :datas="detail" :config="config" @change="swiperChange" @tapFun="tapFun"></goodsSwiper>
```

在 ``script`` 中detail说明
可自定义（需要修改组件内对应参数名）

**detail 属性说明：**

|属性名		|类型	|默认值	                    |说明					|
|---		|----	|---	                    |---					|
|title		|String	|''	            			|标题					|
|subLable	|String	|''	            			|标签					|
|list		|Array	|[]	            			|商品数组				|

**config 属性说明：**

|属性名		|类型	|默认值	                    |说明					|
|---		|----	|---	                    |---					|
|more		|Boolean|false            			|是否显示更多			|
|autoplay	|Boolean|false            			|是否自动轮播			|
|multiple	|Number	|3	            			|单页滑块数量			|
|shadow		|Boolean|false            			|是否显示两边渐变		|
|hideMargin	|Boolean|false            			|是否显示右边距			|
|current	|Number |0	            			|当前所在滑块的 index	|
|interval	|Number	|5000            			|自动切换时间间隔		|
|duration	|Number |500            			|滑动动画时长（app-nvue不支持）|
|circular	|Boolean|false            			|是否采用衔接滑动		|

**更新记录：**

1.0.2
1、添加swiper组件的属性设置（current、interval、duration、circular）

1.0.1
1、添加隐藏右边距选项（hideMargin为true时隐藏）</br>
2、修复禁止拖动的判断

1.0.0
创建

**感谢：**

> 有更多优化建议和需求，请联系作者。谢谢！