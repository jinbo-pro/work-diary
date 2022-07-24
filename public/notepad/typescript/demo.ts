'use strict'

/** 类型 **/
namespace Type {
  // 定义变量
  let str: string = '你好ts 1313266 9'
  // 定义数组
  let arr1: string[] = ['a', 'b']
  let arr2: Array<number> = [1, 2, 3]
  // 元祖类型的数组--需要按类型填充元素
  let arr3: [string, number, boolean] = ['a', 2, true]
  // 枚举类
  enum PayStatus {
    '未支付' = 0,
    '支付中' = 1,
    '已支付' = 2
  }
  let state1: PayStatus = PayStatus['已支付']
  // 任意类型
  let num1: any = 10
  num1 = 'tom'
  // null和undefined
  let num2: number | null | undefined
  num2 = 20
  // void类型
  function running(): void {
    console.log('running')
  }
}
/** 函数 **/
namespace Fn {
  // 参数默认值，可选
  function userInfo(name: string = 'tom', age?: number): string {
    if (age) {
      return `名字：${name}，年龄：${age};`
    } else {
      return `名字：${name}，年龄：保密;`
    }
  }
  // 剩余参数
  function sumNum(a: number, ...result: number[]): number {
    var sum = a
    result.forEach((item) => {
      sum += item
    })
    return sum
  }
  // 函数的重载
  function goodsInfo(name: string): string
  function goodsInfo(price: number): number
  function goodsInfo(str: any): any {
    if (typeof str === 'string') {
      return `名称：${str}`
    } else {
      return str
    }
  }
}
/** 类 **/
namespace ClassName {
  // 与Es6写法类似，只是添加了类型约束
  class Person {
    // 成员属性
    protected name: string
    protected age: number
    // 构造函数
    constructor(name: string, age: number) {
      this.name = name
      this.age = age
    }
    // 实例方法
    getInfo(): string {
      return `名字：${this.name}，年龄：${this.age}`
    }
    // 静态方法
    static runMsg(): void {
      console.log('我是Person')
    }
  }
  // 继承
  class Tom extends Person {
    // super会调用父级constructor设置成员属性
    constructor(name: string, age: number) {
      super(name, age)
    }
    tomRun(): void {
      console.log('这里是Tom家族')
    }
  }
  // 抽象类，多态；父类定义一个方法不去实现，让子类去实现，每个子类有不同的表现

  abstract class Animal {
    public name: string
    constructor(name: string) {
      this.name = name
    }
    abstract eat(): void
  }
  class Dog extends Animal {
    constructor(name: string) {
      super(name)
    }
    eat(): void {
      console.log('狗吃肉')
    }
  }
  class Cat extends Animal {
    constructor(name: string) {
      super(name)
    }
    eat(): void {
      console.log('猫吃鱼')
    }
  }
}
/** 接口 **/
namespace InterfaceName {
  // 传入的对象必须包含name和age属性，并且约束了类型
  // 注意：接口里面以【分号】结束，添加?修饰则为可选属性
  // 对象类型接口
  interface MsgInfo {
    name: string
    age: number
    time?: string
  }

  function lookInfo(msg: MsgInfo): void {
    console.log(msg)
  }
  let msg = {
    name: 'jack',
    age: 24,
    time: '20-05-04'
  }
  // 如果直接传入则必须完全满足接口的形式，以对象形式传入则必须包含接口的形式
  lookInfo(msg)

  // 函数类型接口
  // 对函数的参数和返回进行规范
  interface Crypt {
    (key: string, value: number): string
  }

  var myCrypt: Crypt = function (key: string, value: number): string {
    return key + value
  }
  console.log(myCrypt('jack', 66))

  // 类类型接口
  // 对类里面的属性和方法进行约束
  interface CarInterfaceOne {
    name: string
    status: boolean
    running(str: string): void
  }
  // 接口的继承
  interface CarInterfaceTwo extends CarInterfaceOne {
    time: string
    code(): void
  }
  class Goods {
    name: string
    constructor(name: string) {
      this.name = name
    }
    code(): void {
      console.log('code')
    }
  }
  // 继承与接口的实现
  class Automobile extends Goods implements CarInterfaceTwo {
    time: string
    status: boolean
    constructor(name: string, status: boolean, time: string) {
      super(name)
      this.time = time
      this.status = status
    }
    running(str: string): void {
      console.log('running')
    }
  }
}
/** 泛型 **/
namespace GenericParadigm {
  // 泛型函数
  function getData<T>(value: T): T {
    return value
  }
  // 指定需要的类型，然后参数，返回都是这种类型
  console.log(getData<string>('132')) // '132'
  console.log(getData<number>(132)) // 132
  console.log(getData<any>(null)) // null
  // 泛型类
  class MinNum<T> {
    public list: T[] = []
    add(...parame: T[]): void {
      this.list = this.list.concat(parame)
    }
    min(): T {
      var result = this.list[0]
      this.list.forEach((item) => {
        if (item < result) {
          result = item
        }
      })
      return result
    }
  }
  var min1 = new MinNum<number>()
  min1.add(2, 7, 8, 6, 1)
  console.log('最小值为：', min1.min())

  var min2 = new MinNum<string>()
  min2.add('j', 'i', 'n', 'b', 'o')
  console.log('最小值为：', min2.min())
  // 泛型接口
  interface ConfigFn<T> {
    (value: T): T
  }
  function ajaxConfig<T>(value: T): T {
    return value
  }
  var myAjaxConfig: ConfigFn<string> = ajaxConfig
  console.log('myAjaxConfig：', myAjaxConfig('666'))
}
/** 模块化 **/
// as关键字可以改名字
import { getUserInfo, lookShopInfo as look } from './getData'
console.log(getUserInfo('tom'))
console.log(look('Google'))

/** 命名空间 **/
// 命名空间中不能导入模块
// 添加namespace即可，主要是避免命名冲突
// 在外部要使用空间里面的方法，空间里面的方法必须通过export暴露然后才可以通过空间名称点它
