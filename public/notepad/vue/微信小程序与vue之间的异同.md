## 微信小程序与 vue 之间的异同

[TOC]

> 项目总是在 vue 和小程序之间切换，写了好几个 vue 和小程序项目了，是时候总结一下他们之间的异同了

## 生命周期钩子

> 只比较几个常用的钩子函数

**页面级钩子函数**

- vue
  - `created`页面等待渲染，可在此请求数据
  - `mounted`页面渲染完毕，可在此获取 Dom 操作，或 Dom 相关属性
- 小程序
  - `onLoad`页面加载，可在此请求数据，接受页面参数
  - `onShow`页面显示，页面每显示一次就执行对于刷新较高的页面可在此请求数据

> 页面传参：
>
> - vue，一般使用路由 query 来传递参数，该方式 url 后面显示?id=...
>
> ```
> // A页面传递
> this.$router.push({ path: '/describe', query: { id: 123 } })
> // 路由配置
> { path: '/describe', name: 'Describe', component: Describe }
> // B页面接收
> var id = this.$route.query.id>
> ```
>
> - 小程序，通过跳转页面传参
>
> ```js
> // A页面传递
> wx.navigateTo({  url: '/pages/index/index?id=' + 123 })
> // B页面接收
> onLoad(options){ var id = options.id }
> ```

**组件钩子函数**

- vue
  - vue 组件的钩子函数和页面的一样只是注意他们之间的顺序，子组件的生命周期在父组件的`beforeMount`和`mounted`之间执行
  - 父 beforeCreate->父 created->父 beforeMount->[子]beforeCreate->[子]created->[子]beforeMount->[子]mounted->父 mounted
- 小程序

```js
// 微信小程序组件有自己的一套生命周期，同时他还可以监听页面的生命周期变化，真是很强大啊!
// 看来微信小程序是受react的影响很大，他还是很推荐我们使用组件呢
/* 组件生命周期 */
  lifetimes: {
    attached() {   console.log("在组件实例进入页面节点树时执行")    },
    ready() {      console.log("在组件在视图层布局完成后执行")    },
    moved() {      console.log("在组件实例被移动到节点树另一个位置时执行")    }
    /* 组件所在页面的生命周期 */
    pageLifetimes: {
      show: function () {        console.log("页面被展示")      },
      hide: function () {        console.log("页面被隐藏")      },
      resize: function (size) {  console.log("页面尺寸变化")     }
    }
  }
```

## 模板语法

- 文本：两者一样都是在双大括号里面直接写`<view>{{ msg }}</view>`

- 原始 html

  - vue：`v-html="htmlContent"`

  - 小程序：`<rich-text nodes="{{ htmlContent }}"></rich-text>`

    1. 里面图片不能自适应可使用正则将内容里面的 img 添`加width:100%`即可示例：`res.data.htmlContent .replace(/\<img/gi, '<img style="max-width:100%;height:auto"')`

    2. 图片不能预览，不能解析视频和表情，可使用富文本解析库【[wxParse](https://github.com/icindy/wxParse)】

- 绑定属性

  - vue：`v-bind:show="show"`或者`:show="isShow"`
  - 小程序：`show="{{ isShow }}"`

## 计算属性和监听数据

- vue：`computed`和`watch`

- 小程序：页面没有此功能，只能通过外部拓展【[GitHub](https://github.com/wechat-miniprogram/computed)】【[示例 CSND](https://blog.csdn.net/weixin_41181778/article/details/103673200)】

```js
// 组件有数据监听功能，但是不是值改变才出发是只要设置值就触发
// 监听父级属性变化
  observers: {
    'show'(newVal) {
      console.log(newVal)
    }
  },
```

## class 与 style 绑定

- vue

  class 绑定单个`:class="goods.className"`，绑定多个`:class="['item-box',{ 'action' : isAction }]"`

  style 绑定`:style="{ color: activeColor, fontSize: fontSize + 'px' }"`

- 小程序

  class 绑定`class="item-box {{ isAction ? 'action' : '' }}"`

  style 绑定`style="{{ 'color:red' }}"`

## 条件渲染

- vue：`v-if="flag"`
- 小程序：`wx:if="{{ flag }}"`

## 列表渲染

- vue：

```js
v-for="(item, index) in list" :key="index"
// 改变循环变量直接在括号里面定义即可
v-for="(sonItem, sonIndex) in list" :key="index"
```

- 小程序：

```js
wx:for="{{ list }}" wx:key="key"
// 改变循环变量使用一下方法
wx:for-item="sonItem" wx:for-index="sonIndex"
```

## 事件处理

- 绑定事件及参数传递

  - vue：

    ```js
    <div @click="lookInfo($event, index)"></div>
    // js里面接收参数即可
    lookInfo(event, index){
       console.log(event, index)// $event 为原始dom事件，不写任何参数也可获得该值
    }
    ```

  - 小程序：

    ```js
    // 小程序里面函数不能传参，只能将参数绑定到event对象里面
    <view bindtap="lookInfo" data-index="{{ index }}"></view>
    // js里面通过event里面获取
    lookInfo(e){
       var index = e.currentTarget.dataset.index
       console.log(index)
    }
    ```

- 事件类型及冒泡处理

  - vue：`click`点击，`keyup`等键盘事件，`mousedown`等鼠标事件

    阻止冒泡：添加修饰符，【[vue 事件](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6)】

  - 小程序：`bindtap`点击，`bindinput`输入框的值发生改变，`touchstart`手指触摸等事件

    阻止冒泡：使用`catchtap`替换`bindtap`，【[小程序事件](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#%E4%BA%8B%E4%BB%B6%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F)】

## 表单输入绑定

- vue：`v-model`双向绑定数据，可绑定单个输入框到变量，也可绑定复选框到同一数组
- 小程序：没有双向绑定，小程序使用的是单向数据流，从页面到数据，再从数据到页面需要手动操作，如下示例：

```js
<!-- html -->
<input value="{{ userName }}" bindinput="inputChange" data-type="userName"></input>
<input value="{{ password }}" bindinput="inputChange" data-type="password"></input>
// js
data:{
    userName: '',
    password: ''
},
inputChange(e) {
    let value = e.detail.value
    let type = e.currentTarget.dataset.type
    this.setData({
      [type]: value
    })
}
```

## 组件

定义，引入，通信
