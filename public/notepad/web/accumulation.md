[toc]

> 不积跬步无以至千里,不积小流无以成江海

# js

## 往返缓存

> 有些事件看似是 vue 等框架支持的，其实原生 js 早就支持了

> **「往返缓存」**指浏览器为了在页面间执行前进后退操作时能拥有更流畅体验的一种策略，以下简称`BFCache`。该策略具体表现为：当用户前往新页面前将旧页面的 DOM 状态保存在`BFCache`里，当用户返回旧页面前将旧页面的 DOM 状态从`BFCache`里取出并加载。大部分`移动端浏览器`都会部署`BFCache`，可大大节省接口请求的时间和带宽。

解决往返缓存的方式如下：通过监听页面的销毁或显示事件手动执行代码即可

- 页面销毁事件

```js
// 在新页面监听页面销毁事件
window.addEventListener('onunload', () => {
  // 执行旧页面代码
})
```

- 页面显示事件

```js
window.addEventListener('pageshow', (e) => e.persisted && location.reload())
```

> `pageshow事件`在每次页面加载时都会触发，无论是首次加载还是再次加载都会触发，这就是它与`load事件`的区别。`pageshow事件`暴露的`persisted`可判断页面是否从`BFCache`里取出。

## 数组操作

```js
// 查找数组的索引，简单数组对象型数组均可，自己封装的方法searchIndex瞬间下岗了(*^_^*)
var list = [{ id: '88' }, { id: '99' }, { id: '66' }]
let index = list.findIndex((item) => item.id === '66')
console.log(index) // 2
```

## 判断浏览器是 pc 还是移动

```js
function IsPC() {
  var userAgentInfo = navigator.userAgent
  var Agents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod'
  ]
  var flag = true
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}
console.log(IsPC())
```

## 页面滚动穿透处理

> 常用于弹窗的滚动穿透处理

- 移动端

```html
<div class="test" @touchmove.prevent></div>
```

- PC 端

```js
// 停止页面滚动
stopMove() {
    let m = function(e) {
        e.preventDefault();
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('touchmove', m, { passive: false });
},
// 开启页面滚动
canMove() {
    let m = function(e) {
        e.preventDefault();
    };
    document.body.style.overflow = '';
    document.removeEventListener('touchmove', m, { passive: true });
}
```

## 继承

- 首先写一个父类

```js
// 定义一个动物类
function Animal(name) {
  // 属性
  this.name = name || 'Animal'
  // 实例方法
  this.sleep = function () {
    console.log(this.name + '正在睡觉！')
  }
}
// 原型方法
Animal.prototype.eat = function (food) {
  console.log(this.name + '正在吃：' + food)
}
```

### 简单原型链继承

```js
function Cat() {}
Cat.prototype = new Animal()
Cat.prototype.name = 'cat'
// 修复原型链指向
Cat.prototype.constructor = Cat
```

> 优点：
>
> - 实例是子类的实例，也是父类的实例
>
> - 父类新增原型方法/原型属性，子类都能访问到
>
> 缺点：
>
> - 来自原型对象的所有属性被所有实例共享
> - 创建子类实例时，无法向父类构造函数传参

### 借用构造函数

```js
function Cat(name) {
  Animal.call(this)
  this.name = name || 'Tom'
}
```

> 优点：
>
> - 可以传参
> - 可以多继承
>
> 缺点：
>
> - 只能继承父类，不能继承原型链
> - 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能

### 寄生组合继承

```js
// 利用call继承Animal方法和属性
function Cat(name) {
  Animal.call(this)
  this.name = name || 'Tom'
}
// 利用temp继承Animal的prototype
;(function () {
  var Temp = function () {}
  Temp.prototype = Animal.prototype
  Cat.prototype = new Temp()
})()
// 修复原型链指向
Cat.prototype.constructor = Cat
```

> 优点：完美的继承
>
> 缺点：代码多几行

# css

## 图片自适应

```css
/* 图片适应 */

/* 方案一css3 */
.img-box {
  object-fit: cover;
}
```

```html
<!-- 方案二div背景图 -->
<div
  style="background: url('./img.png') no-repeat; background-size:100% auto;"
></div>
```

## a 标签的样式

```css
/* 去除a标签的下划线 */
a {
  text-decoration: none;
}
/* 未访问时的状态 */
a:link {
  color: #ff0000;
}
/* 鼠标移动到链接上时的状态 */
a:hover {
  color: red;
}
/* 已访问过的状态 */
a:visited {
  color: green;
}
/* 鼠标按下去时的状态 */
a:active {
  color: #ff0000;
}
/* 一次设置这四个样式 */
a {
  color: #ff0000;
}
```

## 经常用到的

- ul 去掉左边的点

  ```css
  li {
    list-style: none;
  }
  ```

- input 占位文字样式

  ```css
  input::-webkit-input-placeholder {
    color: #66f;
  }
  ```

- 下拉选择中选项文字右对齐

  ```css
  select option {
    direction: rtl;
  }
  ```

- 修复点击失效

  > 在苹果系统上有些情况下非可点击元素监听`click事件`可能会无效，针对该情况只需对不触发`click事件`的元素声明`cursor:pointer`就能解决。

  ```css
  .elem {
    cursor: pointer;
  }
  ```

- 1px 边框

  ```css
  .elem {
    position: relative;
    width: 200px;
    height: 80px;
  }

  .elem::after {
    position: absolute;
    left: 0;
    top: 0;
    border: 1px solid #f66;
    width: 200%;
    height: 200%;
    content: '';
    transform: scale(0.5);
    transform-origin: left top;
  }
  ```

## 表格单线边框

```css
table {
  border-top: 1px solid #999;
  border-left: 1px solid #999;
  border-spacing: 0;
  td {
    width: 200px;
    border-bottom: 1px solid #999;
    border-right: 1px solid #999;
  }
```

## 图片错误显示其他图片

```html
<img
  :src="item.cover"
  onerror="this.src='http://bangimage.yasn.com/default1105.jpg?imageView2/1/w/250/h/250/q/75|imageslim'"
/>
```

# vue

## route 和 router

- `$route` 当前路由对象，里面有当前的路由信息
- `$router` 全局的路由实例，是`router`构造方法的实例。

## vue 路由传参

```js
// 方式一：query传参
// 传递
this.$router.push({
  path: '/merchant/commodityManagement',
  query: { bId: item.bId }
})
// 接收
this.$route.query.bId

// 路由形状
// /merchant/commodityManagement?bId=123
```

## 处理重复请求

```js
// 进入请求设置请求状态
if (this.noRepeat) {
  console.log(this.noRepeat, '重复请求')
  return
}
this.noRepeat = true

this.api('aaa').then((res) => {
  // 请求成功后释放状态
  this.noRepeat = false
})
```

## 子父组件生命周期

> 父组件的 beforeCreate、created、beforeMount --> 所有子组件的 beforeCreate、created、beforeMount --> 所有子组件的 mounted --> 父组件的 mounted

- 执行顺序

```js
// 根据vue官方说明
/*
在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，property 和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el property 目前尚不可用。
*/
// 所以Props，methods,data和computed的初始化都是在beforeCreated和created之间完成的。
```

## 组件样式修改【组件样式穿透】

> 在父组件中修改子组件的样式一直是个令人头疼的问题，如果不使用`scoped`有担心全局样式污染，但是使用`scoped`就不能控制子组件的样式，于是就有了组件样式穿透的运用

- 方案一使用`>>>`

  ```css
  .max >>> .box {
    color: red;
  }
  ```

- 方案二使用`scss`的`/deep/`或`::v-deep`

  ```css
  .max ::v-deep .box {
    color: red;
  }
  ```

## 组件封装

- 属性传递穿透
  在封装多层组件时我们不想每个属性都去定义，可以使用`v-bind="$attrs"`将父级组件的属性直接过渡到子组件
- 组件的 v-model
  默认组件绑定的时 value 属性，子组件要要改变 value 时调用`this.$emit('input', newVal)`
- 组件属性的双向绑定`.sync`
  [sync 修饰符](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-修饰符)，分以下两步

1. 子组件通知数据更新`this.$emit('update:title', newTitle)`
2. 父组件监听事件`<text-document v-bind:title.sync="doc.title"></text-document>`

# 微信小程序

【[微信小程序记录传送门](https://blog.csdn.net/jinbo1996/article/details/105806487)】

## 子组件调父组件方法

```js
// 组件js
var value = 123;
this.triggerEvent('callSomeFun', value)
// 父级
<component bind:callSomeFun="setUser"></component>
setUser(){
    console.log(111)
}
```

## 控制元素淡入淡出

```css
.show_add_box {
  opacity: 1;
  height: 200rpx;
  transition: 0.4s;
}
.hidden_box {
  opacity: 0;
  height: 0;
  padding: 0 !important;
  box-sizing: border-box;
  pointer-events: none;
  transition: 0.4s;
}
```

> - 使用 transition 必须有固定的起始和终了状态
> - padding: 0 !important; 防止可能的 padding 把盒子撑开
> - pointer-events: none; 禁用盒子的点击事件

## scroll-view

- 横向滚动

  ```html
  <scroll-view scroll-x="{{ true }}">
    <view class="box_max">
      <view wx:for="{{ 5 }}" wx:key="unique" class="box_item">{{ item }}</view>
    </view>
  </scroll-view>
  ```

  ```css
  /* 横向滑动必须具备以下样式 */
  .box_max {
    white-space: nowrap;
  }

  .box_max .box_item {
    display: inline-block;
  }
  ```

- 纵向滚动

  ```html
  <scroll-view scroll-y="{{ true }}">
    <view class="box_max">
      <view wx:for="{{ 5 }}" wx:key="unique" class="box_item">{{ item }}</view>
    </view>
  </scroll-view>
  ```

  ```css
  /* 纵向滑动必须设置高度 */
  .box_max {
    width: 300px;
  }
  ```

# 富文本编辑器 tinymce

下载 tinymce.zip【[传送门](http://tinymce.ax-z.cn/download-all.php)】

> 目前没有使用 vue 组件方式使用的是 script 标签引入方式，如果是前后端分离请放在前端 public 目录下，如果是 mvc 需放在服务器对应目录

注意点：

- 富文本里面的内容需要初始化才能显示，也就是需要使用 v-if 使其重绘一下才能很好的显示
- 多图上传是第三方插件，里面有个 html 存在 iframe 跨域的问题，所以整个包只能放在本地

# 正则

## 清除空白和换行

`let content = val.replace(/(^\s*)|(\s*$)/g, '')`

## 短线转驼峰

```js
function getCamelCase2(str) {
  return str.replace(/-([a-z])/g, function (keb, item) {
    return item.toUpperCase()
  })
}
console.log(getCamelCase2('user-name')) //userName
```

## 驼峰转短线

```js
function getKebabCase2(str) {
  return str.replace(/[A-Z]/g, function (item) {
    return '-' + item.toLowerCase()
  })
}
console.log(getKebabCase2('userName')) //user-name
```

# jquery

## 获取类选择器里面的 index

`var index = $(".select-type").index($(this));`

## 文档就绪事件

```js
$(document).ready(function () {
  // 代码...
})
```

## 常用选择器

```js
$('.aa').parent(expr) // 找上一级父亲节点，可以传入expr进行过滤
$('.aa').parents(expr) // 查找所有祖先元素，不限于父元素
$('.aa').children(expr) // 返回所有子节点，这个方法只会返回直接的孩子节点
$('.aa').contents() // 返回下面的所有内容，包括节点和文本。
$('.aa').prev() // 返回上一个兄弟节点，不是所有的兄弟节点
$('.aa').prevAll() // 返回所有之前的兄弟节点
$('.aa').next() // 返回下一个兄弟节点，不是所有的兄弟节点
$('.aa').nextAll() // 返回所有之后的兄弟节点
$('.aa').siblings() // 返回兄弟姐妹节点，不分前后
$('.aa').find(expr) // 找到对应子节点
```

# vue-cli webpack

## 跨域代理

```js
// 本地服务器运行调试配置
devServer: {
    open: true, 			// 是否自动弹出浏览器页面
    host: "127.0.0.1", 		// 本地域名
    port: '8081',			// 本地端口
    https: false,			// 是否支持https
    hotOnly: true, 			// 是否热重载
    proxy: {
        '/': {
            target: 'http://127.0.0.1:9898', 	// API服务器的地址
            ws: true,  							// 代理websockets
            changeOrigin: true, 				// 虚拟的站点需要更管origin
            pathRewrite: {   // 重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                '^/': ''	// 当请求根路径时将被代理到服务器路径
            }
        },
        // 配置多个代理
        '/admin': {
            target: 'http://127.0.0.1:9999', 	// admin服务器的地址
            ws: true,  							// 代理websockets
            changeOrigin: true, 				// 虚拟的站点需要更管origin
            pathRewrite: {      // 重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                '^/admin': ''	// 当请求/admin时将被代理到admin服务器路径
            }
        }
    },
}
```

## node-sass 安装失败

1. 修改淘宝镜像 `npm config set registry https://registry.npm.taobao.org`
2. 修改 github 地址 `set SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/`
3. 对应版本 【Node 13 node-sass 4.13+】，【Node 12 node-sass 4.12+】
4. 清除已缓存的`binding.node` 输入：`npm rebuild node-sass`
5. 安装 python2 配置 path，尝试本地编译`binding.node`[该步骤是尝试本地编译]
6. 卸载 node-sass `npm uninstall node-sass`重新安装`npm install node-sass`

【[参考链接](https://segmentfault.com/a/1190000020993365?utm_source=tag-newest)】

> 严格按照这 6 步操作后基本都能成功了(●ˇ∀ˇ●)

# vscode

## Vetur 格式整理配置

在 settings.json 里面添加配置

```json
"vetur.format.options.tabSize": 4,  // 间隔4
"vetur.format.defaultFormatterOptions": {
    "prettier": {
        "semi": false,          // 不加分号
        "singleQuote": true,    // 使用单引号
        "trailingComma": "none" // 禁止随时添加逗号
    }
}
```

## 编译脚本报错【此系统禁止运行脚本】

需要管理员权限运行 vscode 然后终端执行`set-ExecutionPolicy RemoteSigned`即可

## 自定义用户代码片段

> 文件 -- 首选项 -- 用户片段 新建代码片段
> 代码片段存在`C:\Users\userNameNone\AppData\Roaming\Code\User\snippets`目录下

```json
{
  "Print to console": {
    "scope": "javascript,typescript", // 触发语言 .vue .php 需要去掉此选项
    "prefix": "clog", // 代码片段名字
    "body": [
      // 代码内容
      "console.log(678, '-->>> 678 $1')" // $1 生成代码后光标的初始位置. 还可以有$2,$3...
    ],
    "description": "console.log debug" // 片段简介
  }
}
```

> 注意：body 里面是数组，数组每一项代表一行
> 多行示例:

```json
{
  "body": [
    "console.log(678, '-->>> 678 $1')",
    "console.log(123, '-->>> 123 $2')"
  ]
}
```

# uni-app

## dom 操作兼容性

浏览器专用的 window、document、navigator、location 对象，包括 cookie 等存储，只有在浏览器中才有，app 和小程序都不支持。

> 小技巧：之前用 addEventListener 添加事件的可以修改成父级事件委托的方式

## 连接手机调试模拟器

1. 安装夜神模拟器【[官方下载连接](https://www.yeshen.com/)】

2. 打开夜神模拟器

3. 打开夜神模拟器的调试端口

   在`D:\Program Files\Nox\bin`目录下运行`debugReport.bat`即可

4. 进入夜神模拟器目录`D:/Program Files/Nox/bin/`输入` .\adb.exe connect 127.0.0.1:62001`使其连接到电脑

5. 添加 path 环境

   将`D:\app\HBuilderX\plugins\launcher\tools\adbs`添加到 path 环境使其可全局访问

   打开 cmd 输入`adb version`若输出`Android Debug Bridge version 1.0.32`则说明 path 路径添加成功

6. 设置端口

   打开 HBuilderX 的工具->设置->运行配置 将 Android 模拟器端口设置为 62001

7. 设置模拟器 adb 路径

   打开 HBuilderX 的工具->设置->运行配置 将 adb 路径设置为`D:/Program Files/Nox/bin/adb.exe`

8. 连接夜神模拟器

   cmd 继续输入`adb connect 127.0.0.1:62001`使 HBuilderX 连接夜神模拟器的端口

9. 运行到模拟器

   此时可在 HBuilderX 的运行->运行到手机或模拟器看到对应的模拟器信息，点击运行即可

# NVM

- 下载 nvm【[下载地址](https://github.com/coreybutler/nvm-windows/releases)】

  nvm-noinstall.zip：绿色免安装版，但使用时需进行配置，

  nvm-setup.zip：安装版，推荐使用

- 安装

  直接按照流程走即可

- 打开 cmd 输入 nvm 即可看到帮助信息

- 安装 node 版本

  - 查看本地安装的所有版本`nvm list [available]`
  - 安装，命令中的版本号可自定义`nvm install 14.16.0`
  - 使用特定版本`nvm use 14.16.0`
  - 卸载`nvm uninstall 14.16.0`

- 命令提示

1. nvm arch ：显示 node 是运行在 32 位还是 64 位。
2. nvm install <version> [arch] ：安装 node， version 是特定版本也可以是最新稳定版本 latest。可选参数 arch 指定安装 32 位还是 64 位版本，默认是系统位数。可以添加--insecure 绕过远程服务器的 SSL。
3. nvm list [available] ：显示已安装的列表。可选参数 available，显示可安装的所有版本。list 可简化为 ls。
4. nvm on ：开启 node.js 版本管理。
5. nvm off ：关闭 node.js 版本管理。
6. nvm proxy [url] ：设置下载代理。不加可选参数 url，显示当前代理。将 url 设置为 none 则移除代理。
7. nvm node_mirror [url] ：设置 node 镜像。默认是https://nodejs.org/dist/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
8. nvm npm_mirror [url] ：设置 npm 镜像。https://github.com/npm/cli/archive/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
9. nvm uninstall <version> ：卸载指定版本 node。
10. nvm use [version] [arch] ：使用制定版本 node。可指定 32/64 位。
11. nvm root [path] ：设置存储不同版本 node 的目录。如果未设置，默认使用当前目录。
12. nvm version ：显示 nvm 版本。version 可简化为 v。
