@[TOC]

# 序

> 本文是学习 ECMAScript 6 后的笔记总结，学习 ES6 时！我就想着我用了这么就的 js 应该算入门了吧！结果学了之后才发现我还真的没有如到门呢！故写此笔记`(ง •_•)ง`当然我的笔记不会写那么详细了，我只记录我想记录的内容，当然还有就是有那么一丢丢的引用在里面了哈哈`o(*￣▽￣*)o`

- 首先附上**学习参考资料**
- 阮一峰老师的 ES6 入门： **[《ECMAScript 6 入门》](http://es6.ruanyifeng.com/)**
- Es6 教程：**[ECMAScript ES6 从一脸懵逼到灵活运用/干净女声甜美教学](https://www.bilibili.com/video/av47304735)**

---

## let 与 const 命令

let 与 const 都是变量或函数的声明

- 特点：

1. 作用域块级内有效
2. 不存在变量声明提升
3. 暂时性死区--声明前使用报错
4. 不允许重复声明
5. const 声明一个常量，实际是锁定了变量指向的【指针不变】，复杂数据类型里面的属性还是可变的
6. let 和 const 的本质区别，其实是编译器内部的处理不同。

- 解决的问题

1. var 声明污染全局变量

2. 代替立即执行函数

3. 使代码更加规范

- 使用实例

```html
<button class="but">按钮0</button>
<button class="but">按钮1</button>
<button class="but">按钮2</button>
```

```js
//循环绑定多个按钮
var but = document.getElementsByClassName('but')
for (let i = 0; i < but.length; i++) {
  but[i].onclick = function () {
    console.log('按钮--', i)
  }
}
//控制台依次输出，如果是var声明的则【i值会被覆盖】

//之前的解决方案-->立即执行函数形成闭包
for (var i = 0; i < but.length; i++) {
  ;(function (index) {
    but[index].onclick = function () {
      console.log('按钮--', index)
    }
  })(i)
}
```

## 变量的解构赋值

数组和对象的解构都是简化操作，方便查看

由于以往的数组和对象解构繁琐，面对多个解构时很麻烦所以简化解构方式，由此诞生

- 模式匹配

```js
//数组
let [a, b, c] = [1, 2, 3]
//等效于赋值	a = 1; b = 2; c = 3
//也可用于字符串
let [a, b, c] = 'one' //a = 'o'	b = 'n'	c = 'e'
//对象
let { foo, bar } = { foo: 'aaa', bar: 'bbb' }
foo // "aaa"
bar // "bbb"
```

- 数据交换

```js
let a = 22
let b = 33
;[a, b] = [b, a]
console.log(a, b) //33  22
```

- 参数默认值

```js
//推荐使用【双默认值】，不传参数则默认为空对象
function move({ x = 0, y = 0 } = {}) {
  return [x, y]
}

move({ x: 3, y: 8 }) // [3, 8]
move({ x: 3 }) // [3, 0]
move({}) // [0, 0]
move() // [0, 0]
//在ES5只能使用||变相的进行默认赋值，遇到参数是0，false等还的判断其参数类型
```

> 注意：函数使用了解构赋值或扩展运算符的在函数【内部设定】严格模式会【报错】，因为函数参数先于函数体执行，此时还不知道函数体内部是否设有严格模式

## 函数的扩展

- rest 参数

采用数组解构的方式形如`...参数名`表示剩余的所有参数，用于代替`arguments`对象

```js
function add(...values) {
  let sum = 0
  //这里的values为[5, 3]
  for (var val of values) {
    sum += val
  }
  return sum
}

add(2, 5, 3) // 10
```

- 箭头函数

```js
//省略function关键字用 =>代替
setTimeout(() => {
  console.log(123)
}, 1000)

//单一的一条语句可以省略return
var a = (b) => b
// 等同于
var a = function (b) {
  return b
}
```

> - 特点：
> - 里面的 this 指向的是外面一层
> - 不能做构造函数
> - 不可以使用 arguments 对象
> - 不可以使用 yield 命令

## 数组的扩展

扩展运算符

```js
//rest剩余参数的逆运算
console.log(...[1, 2, 3])
// 1 2 3
```

代替函数的 apply 方法，将数组转为参数

```js
// ES5 的写法
Math.max.apply(null, [14, 3, 77])
// ES6 的写法
Math.max(...[14, 3, 77])
// 等同于
Math.max(14, 3, 77)
```

用途：

```js
//1.复制数组
const a1 = [1, 2]
const a2 = [...a1]
//好处：这样复制创建一个【新的数组】，改变a2不会影响a1；也就是深拷贝
//2.合并数组，省略concat方法，用[...arr]即可如：
let a3 = [...a1, ...a2] //[1, 2, 1, 2]
//3.将字符串解构为数组
;[...'hello']
// [ "h", "e", "l", "l", "o" ]
```

## 对象新增方法

- Object.assign()

```js
//对象的复制粘贴
const target = { a: 1, b: 1 }
const source1 = { b: 2, c: 2 }
const source2 = { c: 3 }

Object.assign(target, source1, source2)
//有相同【键】就覆盖，没有就写入
target // {a:1, b:2, c:3}
//拷贝数组如下--按【键】覆盖
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]

//>>常用于对象【属性的合并】
```

在 vue 中为对象添加动态属性不响应时应该将对象进行深拷贝如下：

```js
this.obj = Object.assign({}, this.obj, {
  name: 'lisi'
})
```

- keys，values，entries，fromEntries

```js
let { keys, values, entries } = Object
let obj = { a: 1, b: 2, c: 3 }
//Object.keys()    返回对象所有的【键】组成的数组
for (let key of keys(obj)) {
  console.log(key) // 'a', 'b', 'c'
}
//Object.values() 返回对象所有的【值】组成的数组
for (let value of values(obj)) {
  console.log(value) // 1, 2, 3
}
//Object.entries()将对象转为【可循环】迭代的数组
for (let [key, value] of entries(obj)) {
  console.log([key, value]) // ['a', 1], ['b', 2], ['c', 3]
}
/*
console.log(entries(obj)) //其实就是【键值对】组成的数组
(2) ["a", 1]
(2) ["b", 2]
(2) ["c", 3]
*/
//还有Object.fromEntries()是Object.entries()的逆操作适用于将【Map结构转为对象】
```

## Symbol

是新的数据类型，表示独一无二的值

遍历方法`Object.getOwnPropertySymbols()`，当然 symbol 属性本意是有隐藏性的所以遍历方法就显得没那么重要了-->>方法名字都这么长就是为了不让我们记住`(￣▽￣)"`

`Symbol.for()`方法生成新的 Symbol 会被登记在全局环境中，下次通过该方法生成 Symbol 时会先检查给定的`key`是否已经存在，如果存在就获取其值不会重复定义

```js
let s1 = Symbol.for('foo')
let s2 = Symbol.for('foo')

s1 === s2 // true
```

用途

- 设置私有属性

```js
// --TomClass.js--
const _SEX = Symbol() //通过Symbol添加私有属性
class Person {
  constructor(name, age, sex) {
    //接收参数
    this.name = name
    this.age = age
    this[_SEX] = sex
  }
  son() {
    //类里面的方法，不能加function关键字
    return this[_SEX] //只能通过该方法访问私有属性
  }
}
module.exports = Person

// --index.js--
const Tom = require('./TomClass')
const tom1 = new Tom('tom1', 18, '男')
console.log(tom1) //Person { name: 'tom1', age: 18, [Symbol()]: '男' }
console.log(tom1.son()) //男
console.log(tom1['_SEX']) //undefined
console.log(tom1[Symbol()]) //undefined
console.log(tom1['Symbol()']) //undefined
```

> - 在这之前设置私有属性只是在前面加上下划线区分，如`_name`，`_age`但是这样做既可以看到也可以修改
> - 而现在虽然可以看到实例上的`_SEX`属性但是不能访问了，从根本上治疗熊孩子们乱改属性

## Set 和 Map 数据结构

类似于哈希表的数据结构，方便查询

Set 里面的值是唯一的，可用于数组去重`[...new Set(array)]`
【注意】：两个对象总是不相等的，NaN 等于自身

```js
var set = new Set([{}, {}, [], [], NaN, NaN]);
// -- 打印set为 --
0: {}
1: {}
2: []
3: []
4: NaN
size: 5
```

Map 数据结构就是一种扩展的对象，只是它的键可以是任意的数据类型

```js
//弥补对象的键只能是字符串的不足，可以是所有的数据类型
const m = new Map()
const o = { p: 'Hello World' }
const list = ['tom', 'jack', 'lisi']
m.set('list', list)
m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
console.log(m)
/*
0: {Object => "content"}
key: {p: "Hello World"}
value: "content"
1: {"list" => Array(3)}
key: "list"
value: (3) ["tom", "jack", "lisi"]
*/
```

> 可以看到 m 的键键值都可以是任意类型

## Promise 与 async

- 首先新建一个异步函数，返回 Promise 对象

```js
function api(data) {
  return new Promise((resolve, reject) => {
    let flag = (data * Math.random()).toFixed(2)
    setTimeout(() => {
      if (flag > 100) {
        resolve(flag)
      } else {
        reject(flag)
      }
    }, 1000)
  })
}
```

- Promise 方法

```js
api(500)
  .then((res) => {
    console.log('第一次请求结果--', res)
    return api(res)
  })
  .then((res) => {
    console.log('第二次请求结果--', res)
    if (res < 200) {
      /*以下三种方式中断Promise链，前两种抛出异常，后一种返回空*/
      // throw new exceptionname;
      // return Promise.reject('小于100')
      return new Promise(() => {})
    }
    return api(res)
  })
  .then((res) => {
    console.log('第三次请求结果--', res)
  })
  .catch((err) => {
    console.log('错误信息--', err)
  })
  .finally(() => {
    console.log('promise执行了')
  })
```

个人觉得中断方法还是第三种好些，不报错看着舒服！
`then`为成功的回调，`catch`接收请求的错误信息，也可以不用 catch 方法而在 then 方法里面写两个回调函数，`finally`无论 promise 请求是否成功都会执行

```js
promise.then(
  (res) => {},
  (err) => {}
)
//--- 等同于 ---
promise.then((res) => {}).catch((err) => {})
```

`Promise.all()`该方法是当里面的异步函数都成功，或第一个失败时才进入回调在处理多个异步处理时【非常有用】

```js
// 全部完成才执行
Promise.all([api(5000), api(4000)]).then((res) => {
  console.log(res) //["2939.26", "814.90"]
})
```

还有`Promise.race()`方法意为赛跑，就是哪个返回得快就取那个的结果；暂时没用到，以后用到了再补充`(～￣▽￣)～`

- async/await 方法

这是 Es7 的异步处理方法，来看看效果怎么样！

```js
;(async () => {
  let one, two, thr
  //async await的错误捕获要使用try catch捕获
  try {
    one = await api(500)
    two = await api(one)
    thr = await api(two)
  } catch (e) {
    console.log('错误因素--', e)
  }
  console.log('1--', one) //1-- 232.61
  console.log('2--', two) //2-- 221.56
  console.log('3--', thr) //3-- 184.21
})()
```

- 小结

> `Promise`方法
> 优点：将异步函数变成了链式方法，不会再进入回调地狱了
> 缺点：中断不方便，要么抛出异常要么返回空
>
> `async/await`方法
> 优点：将异步函数完美的转换成了同步函数的样子，逻辑清晰可见
> 缺点：请求的错误只能用 try/catch 来收集处理

## Iterator 遍历器

- 可迭代对象的方法，内置的方法

```js
let arr = [1, 2, 3]
iter = arr[Symbol.iterator]()

iter.next()
//{value: 1, done: false}
iter.next()
//{value: 2, done: false}
iter.next()
//{value: 3, done: false}
iter.next()
//{value: undefined, done: true}
//该方法就是iterator接口
```

```js
//array[Symbol.iterator]()方法大致如下
function makeIterator(array) {
  var nextIndex = 0
  return {
    next: function () {
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { value: undefined, done: true }
    }
  }
}
```

循环遍历就是用`next`方法，用来移动指针。开始时，指针指向数组的开始位置。然后，每次调用`next`方法，指针就会指向数组的下一个成员。
当然目前还没用到它，相信以后会用到的，它既然存在了肯定有用的。
说道循环遍历就小结一下常用循环吧！

**三种常用循环的比较**

- forEach 遍历
  1. 优点：遍历数组所有元素，可获取 item，index
  2. 缺点：不能中断
- for...of
  1. 优点：遍历所有可枚举元素，可中断
  2. 缺点：获取 index 需借助`entries()`方法
- for...in
  1. 优点：遍历所有的键，可获取 index
  2. 缺点：不可枚举的键也遍历了

## Generator 生成器

yield 定义返回值，next()调用时依次返回

```js
function* helloWorldGenerator() {
  yield 'hello'
  yield 'world'
  return 'ending'
}

var hw = helloWorldGenerator()
hw.next()
//{value: "hello", done: false}
hw.next()
//{value: "world", done: false}
hw.next()
//{value: "ending", done: true}
hw.next()
//{value: undefined, done: true}
```

与数组的`Symbol.iterator`遍历器类似

用途：异步（一般都用`promise`或`async`）；流程管理（接触不到）;
所以暂时是用不到了`ε=ε=ε=(~￣▽￣)~`

## Class 函数

ES6 引入了 Class（类）这个概念，作为对象的模板。通过`class`关键字，可以定义类。虽然这只是一种语法糖，但是我想说这个糖是真的好吃`( •̀ ω •́ )✧`

```js
class Person {
  constructor(name, age) {
    //constructor接收参数
    this.name = name
    this.age = age
  }
  son() {
    //类里面的方法，不能加function关键字
    return 'hello'
  }
  static sum(a, b) {
    //static静态方法，可做工具方法调用
    return a + b
  }
}
var tony = new Person('托尼', 10)
//--> Person{ name: "托尼", age: 10 }

// 静态方法可直接调用，常用作工具函数
Person.sum(10, 20)
//--> 30
```

- 注意事项

1. class 类整体使用严格模式注意语法
2. 在类中声明方法的时候，不能加 function 关键字
3. 方法之间不能用逗号分隔，否则会报错
4. class 不存在变量提升，所以需要先定义再使用
5. 可以通过 prototype 属性对类添加方法

- prototype 添加属性
  虽然可以直接自类中定义方法，但是其实方法还是定义在 prototype 上的。

```js
Person.prototype.movie = function () {
  return '看电影'
}
tony.movie() //看电影

// --或者--
Object.assign(Person.prototype, { sex: '男', goods: '手机' })
console.log(tony.sex) //男
console.log(tony.goods) //手机
```

## Class 的继承

### 回顾 Es5 继承方式

- 定义一个父类

```js
function Person(name) {
  // 属性
  this.name = name || 'Person'
  // 实例方法
  this.sleep = function (thing) {
    console.log(this.name + '正在：' + thing)
  }
}
// 原型方法
Person.prototype.eat = function (food) {
  console.log(this.name + '正在吃：' + food)
}
```

- 简单的原型链继承

```js
function Tom() {}
Tom.prototype = new Person('tom1')
// 修复原型链指向
Tom.prototype.constructor = Jack
Tom.prototype.tomGoods = '手机' //添加方法或属性写在new后面

// Tom家族的实例
let tom1 = new Tom()
tom1.sleep('睡觉') //tom1正在：睡觉
tom1.eat('泡面') //tom1正在吃：泡面
console.log(tom1.tomGoods) //手机
```

- 组合继承

```js
function Jack(name) {
  Person.call(this)
  this.name = name || 'jack'
}
// 借助中间函数继承原型链防止原型链变动影响自己
;(function () {
  var temp = function () {}
  temp.prototype = Person.prototype
  Jack.prototype = new temp()
})()
// 修复原型链指向
Jack.prototype.constructor = Jack
// 添加属性
Jack.prototype.jackGoods = '电脑'

// Jack家族的实例
let jack1 = new Jack('jack1')
jack1.sleep('看书') //jack1正在：看书
jack1.eat('牛排') //jack1正在吃：牛排
console.log(jack1.jackGoods) //电脑
```

> 可以看到 Es5 的继承写得简单点吧！不能继承太多东西，要想好好的继承一下就要多些写好几行！累呀！`(っ °Д °;)っ`有没有什么好的方法呢？终于在一个不知道什么天气的夜晚 Es6 拿出了解决方案

### Es6 extends 继承

```js
//父类
class Person {
  constructor(name) {
    this.name = name || 'Person'
  }
  sleep(thing) {
    console.log(this.name + '正在：' + thing)
  }
  eat(food) {
    console.log(this.name + '正在吃：' + food)
  }
}
//继承
class Tom extends Person {
  constructor(name, goods) {
    super(name) // 调用父类的constructor(name),在this之前出现
    this.name = name
    this.goods = goods
  }
}
//实例
let tom1 = new Tom('tom1', '手机')
tom1.sleep('睡觉') //tom1正在：睡觉
tom1.eat('泡面') //tom1正在吃：泡面
console.log(tom1.goods) //手机

let jack1 = new Tom('jack1', '电脑')
jack1.sleep('看书') //jack1正在：看书
jack1.eat('牛排') //jack1正在吃：牛排
console.log(jack1.goods) //电脑
```

> 方便快捷五星好评！也不用修复原型链了，直接就用

## Module 的语法

- export 命令

```js
//1.导出变量，多个可写入一个对象里
export var a = 1
//2.导出函数
export function app() {
  return 1
}
//引入方式
import { a } from './utils/a.js'
```

> 注意：export 导出为对象，用 import 引入需要对应变量的名称，用大括号解构，不对应变量名称则无法加载

- export default 命令

```js
//1.导出变量，多个可写入一个对象里
var a = 1
export default a
//2.导出函数
export default function app(){ return 1 }
//引入方式
import a from './utils/a.js'
```

> 与 export 的区别在于，引入时可以自定义变量名，无需对应
> 本质上就是输出一个叫做`default`的变量或方法，若写成 export default var a = 1 则报错

## 模块化拓展

- node 引入方式

```js
//utils.js
let a = 100
console.log(module.exports) //{}
console.log(exports) //{}
exports.a = 200 //将module.exports内容改成 {a : 200}
exports = '指向其他内存区' //这里把exports的指向指走

//test.js
var a = require('/utils')
console.log(a) // 打印为 {a : 200}
//node建议用 module.exports 导出，然后用require导入
```

1. `require`： node 和 es6 都支持的引入

2. `export / import` ： 只有 es6 支持的导出引入

3. `module.exports / exports`： 只有 node 支持的导出

> node 输出是一个值的【拷贝】，ES6 输出是值的【引用】。
>
> node 是【运行】时加载，ES6 是【编译】时输出接口。

- 浏览器 module 的加载
  为解决浏览器加载较大 js 文件导致的【堵塞】情况以往的操作如下

```html
<!--开启script标签的异步加载功能-->
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```

1. defer 是“渲染完再执行”

2. async 是“下载完就暂停渲染执行 js”

3. 如果有多个 defer 脚本，会按照它们在页面出现的顺序加载，而多个 async 脚本是不能保证加载顺序的。

Es6 的方法，开启 module 属性 --> 感觉就是少写一个单词而已`ˋ( ° ▽、° ) `

```html
<!--Es6提供新的方案-->
<script type="module" src="./foo.js"></script>
<!-- 等同于 -->
<script type="module" src="./foo.js" defer></script>

<!--同时async属性也可以打开，打开async的js文件，下载完毕浏览器就会停下来执行它-->
```

本文涉及到的一些观点也只是个人观点，如有不足之处还望各路大佬多多指正`(●'◡'●)`
