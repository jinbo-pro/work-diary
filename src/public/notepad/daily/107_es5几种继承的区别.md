# 继承

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

## 简单原型链继承

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

## 借用构造函数

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

## 寄生组合继承

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
