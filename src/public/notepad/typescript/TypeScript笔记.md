# TypeScript

## 准备工作

- 全局安装`npm install -g typescript`
- 编译`tsc index.ts`
- 生成配置文件`tsc --init`配置输出路径`outDir`，然后点击终端添加运行任务，选择 ts 然后监控 ts 就可以在保存时实时编译了
  > 如果此时运行 vscode 报错说此系统禁止运行脚本，则需要管理员权限运行 vscode 然后终端执行`set-ExecutionPolicy RemoteSigned`即可

# 类型

## 变量

- 定义变量都要书写类型`let str:string = '你好';`
- 给变变量的类型就会报错

## 数组

- 简单定义`let arr:string[] = ['a','b']`
- 通过泛型定义`let arr:Array<number> = [1,2,3]`
- 元祖类型`let arr3: [string, number, boolean] = ['a', 2, true]`
  > 数组中只能存放指定类型的元素，元祖类型数组中元素的类型要按顺序对应

## 枚举类

```ts
enum PayStatus {
  '未支付' = 0,
  '支付中' = 1,
  '已支付' = 2
}
let state1: PayStatus = PayStatus['已支付']
console.log(state1) // 2
```

> 枚举类型就是有标识的序列，就相当于写了备注的数组，用于标识状态和固定值
> 默认不赋值枚举就是其索引值，如果指定了索引而后面元素没指定则按指定的索引值向后增加

## 任意类型

- 定义`let num:any = 10`
- 任意类型的类型被重新改变

## null 和 undefined

- 定义`let num2: number | null | undefined;`

## void 类型

```ts
function running(): void {
  console.log('running')
}
```

> 表示没有任何类型，用于定义方法没有返回值

# 函数

## 定义

- 参数类型，参数默认值，参数可选

```ts
function userInfo(name: string = 'tom', age?: number): string {
  if (age) {
    return `名字：${name}，年龄：${age};`
  } else {
    return `名字：${name}，年龄：保密;`
  }
}
```

- 剩余参数

```ts
function sumNum(a: number, ...result: number[]): number {
  var sum = a
  result.forEach((item) => {
    sum += item
  })
  return sum
}
```

> 函数的参数和返回都要添加类型约束
> 参数可选用?标识
> 默认参数赋值类似 ES6，可选参数不能赋默认值
> 没有返回值用 void 标识

## 函数的重载

```ts
function goodsInfo(name: string): string
function goodsInfo(price: number): number
function goodsInfo(str: any): any {
  if (typeof str === 'string') {
    return `名称：${str}`
  } else {
    return str
  }
}
goodsInfo('苹果')
```

> 多个同名函数参数不同，可以根据参数自动载入，类似 Java；但是只是一种模拟
> 如上在 Es5 里面直接写下面的方法就可以了，其实前面连个方法作用就是参数类型限制

## 类

```ts
// 与Es6写法类似，只是添加了类型约束
class Person {
  // 成员属性
  public name: string
  public age: number
  // 构造函数
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  // 静态方法
  getInfo(): string {
    return `名字：${this.name}，年龄：${this.age}`
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
```

> 类里面的修饰符
>
> - public 公有 在类里面，子类，类外面都可以访问
> - protected 保护类型 在类里面，子类可以访问，类外面不能访问
> - private 私有 在类里面可以访问，子类，类外面都不能访问
> - static 静态方法
> - abstract 抽象类 在抽象类里面必须有抽象方法且该方法子类必须实现，抽象类只能作为基类不能直接被实例化
>
> 属性不加修饰符默认为 public
> Es5 中没有类的修饰符，所以它只会在编译时其作用
> 接口就是定义一种规范，都要按照这个规范去执行它

## 接口

```ts
// 接口
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
```

## 泛型

```ts
function getData<T>(value: T): T {
  return value
}
// 指定需要的类型，然后参数，返回都是这种类型
console.log(getData<string>('132')) // '132'
console.log(getData<number>(132)) // 132
console.log(getData<any>(null)) // null
```

> 上面的 T 可以是任意的大写字母，泛型主要是解决类型不确定，同时又要一些类型的约束

## 模块化

```ts
// as关键字可以改名字
import { getUserInfo, lookShopInfo as look } from './getData'
console.log(getUserInfo('tom'))
console.log(look('Google'))
```

## 命名空间

- 命名空间中不能导入模块
- 添加 namespace 即可，主要是避免命名冲突
- 在外部要使用空间里面的方法，空间里面的方法必须通过 export 暴露然后才可以通过空间名称点它
