/**
 * 1. 绑定在原型链上
 */
Function.prototype._bind1 = function () {
  console.log('bind1')
}
{
  const fn = function () {}
  fn._bind1()
}

/**
 * 2. 改变 this 指向
 */
Function.prototype._bind2 = function (args) {
  const self = this
  return function () {
    self.apply(args)
  }
}
{
  const obj = { a: 1 }
  const fn = function () {
    console.log(this.a)
  }
  fn._bind2(obj)() // 1
}

/**
 * 3. 支持柯里化
 */
Function.prototype._bind3 = function (thisObj) {
  const self = this
  const args = [...arguments].slice(1)
  return function () {
    const finalArgs = [...args, ...arguments]
    self.apply(thisObj, finalArgs)
  }
}
{
  const obj = { i: 1 }
  const fn = function (a, b, c) {
    console.log(this.i + a + b + c)
  }
  const fn3 = fn._bind3(obj, 1, 2)
  fn3(3) // 7
}

/**
 * 4.重写new调用逻辑
 */

/*
 补充知识
 如何检测一个函数是否被 new 调用
 new.target 属性，正好是用来检测构造方法是否是通过 new 运算符来被调用的
 */
Function.prototype._bind4 = function (thisObj) {
  const self = this
  const args = [...arguments].slice(1)
  return function () {
    const finalArgs = [...args, ...arguments]
    // new.target 用来检测是否是被 new 调用
    if (new.target !== undefined) {
      // this 指向的为构造函数本身
      var result = self.apply(this, finalArgs)
      // 判断改函数是否返回对象
      if (result instanceof Object) {
        return reuslt
      }
      // 没有返回对象就返回 this
      return this
    } else {
      // 如果不是 new 就原来的逻辑
      return self.apply(thisObj, finalArgs)
    }
  }
}

// 这样做有什么用呢 经过这样改造之后在原生的bind上添加了一些自定义功能
// 使用场景少， 仅做研究用

/**
 * 5.修复4中的prototype 再加上一些判断
 */
// 可参见完整的 function-bind 实现: https://github.com/Raynos/function-bind/blob/master/implementation.js
