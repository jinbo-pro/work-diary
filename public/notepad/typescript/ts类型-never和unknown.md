[toc]

参考文档：
[TS 类型: never 和 unknown](https://blog.csdn.net/m0_62181310/article/details/126823750)
[Typescript unknown 类型介绍](https://zhuanlan.zhihu.com/p/545347624)

## unknown

理解：unknown 处于最顶层，相当于任意类型的父类型（任意类型的父亲），所以，可以将任意类型赋值给它（其他任意类型都是它儿子）
特点：unknown 类型可以接受任意类型，但是无法赋值给其他类型

- 示例

```ts
// unknown 是最顶级类型，是所有其他类型的“父亲”【出现在等号（=）左侧】
let u: unknown
u = 1
u = 'a'
u = [1, 3, 5]
// 错误：
// let a: number = u
```

- 使用场景

```ts
function fn(str: string): unknown {
  return JSON.parse(str)
}
const json = fn('{"name":"tom"}')
if (typeof json == 'object') {
  console.log(json)
}
```

## never

理解：never 处于最底层，相当于任意类型的子类型（任意类型的儿子），所以，可以赋值给其他任意类型（其他任意类型都是它父亲）
特点：never 类型可以赋值给任意类型，但是无法给 never 赋值其他类型

- 示例

```ts
// never 是最底层类型，是所有其他类型的“儿子”【出现在等号（=）右侧】
let fn = () => {
  throw new Error('err...')
}
let n: never = fn() // n => never
let a: number = 1
a = n
// 错误：
n = a
```

- 使用场景

```ts
type IMedthod = 'get' | 'post'

function ccc(method: IMedthod, url: string): any {
  switch (method) {
    case 'get':
      return 1
    case 'post':
      return 2
    default:
      // 类型收缩-用于以后 IMedthod 类型修改检测用
      const n: never = method
      return n
  }
}
```
