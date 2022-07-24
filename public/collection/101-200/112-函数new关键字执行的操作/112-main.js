/**
 * 在函数式的表现形式如下
 */

function Foo(val) {
  if (new.target) {
    console.log(val, '函数被 new 调用了')
  } else {
    console.log(val, '普通调用')
  }
}

Foo(1)
new Foo(2)

/**
 * 在构造函数中的表现形式
 */
class A {
  constructor() {
    console.log(new.target.name)
  }
}

class B extends A {
  constructor() {
    super()
  }
}

var a = new A() // logs "A"
var b = new B() // logs "B"

class C {
  constructor() {
    console.log(new.target)
  }
}
class D extends C {
  constructor() {
    super()
  }
}

var c = new C() // logs class C{constructor(){console.log(new.target);}}
var d = new D() // logs class D extends C{constructor(){super();}}
