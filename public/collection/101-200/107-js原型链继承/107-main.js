function Animal(name) {
  this.name = name
}
Animal.prototype.echo = function () {
  console.log(this.name, 'name')
}

/**
 * 圣杯继承
 * Cat(name, age) 相当于 constructor(name, age)
 * Animal.apply(this, [name]) 相当于 super(name)
 * 原型链继承 相当于 extends
 */
function Cat(name, age) {
  // 1. 借用构造函数
  Animal.apply(this, [name])
  this.age = age
}
;(function () {
  // 2. 原型链继承
  var Temp = function () {}
  Temp.prototype = Animal.prototype
  Cat.prototype = new Temp()
  // 3. 修复原型链指向
  Cat.prototype.constructor = Cat
})()
var tom = new Cat('tom', 18)
console.log(tom, '-->>> tom')
tom.echo()

/**
 * 封装原型链继承为 extend
 */
function extend(instance, ctx) {
  var Temp = function () {}
  Temp.prototype = ctx.prototype
  instance.prototype = new Temp()
  instance.prototype.constructor = instance
}

function Mouse(name, city) {
  Animal.apply(this, [name])
  this.city = city
}
extend(Mouse, Animal)

var jerry = new Mouse('jerry', '成都')
console.log(jerry, '-->>> jerry')
jerry.echo()

/**
 * ES6 继承
 */
class Dog extends Animal {
  constructor(name, food) {
    super(name)
    this.food = food
  }
}

var dog1 = new Dog('金毛', 'bone')
console.log(dog1, '-->>> dog1')
dog1.echo()
