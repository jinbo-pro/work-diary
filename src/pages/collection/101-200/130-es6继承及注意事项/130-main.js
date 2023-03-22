console.log('130-es6继承及注意事项')

const defaultOptions = {
  name: 'base',
  age: 0
}
let classNameIndex = 1
class Node {
  static config(customOptions) {
    const options = this.options || defaultOptions
    // demo 使用 Object.assign 模拟深度拷贝
    this.options = Object.assign({}, options, customOptions)
  }
  static define(options) {
    const cls = class extends this {}
    const className = `CustomNode${classNameIndex++}`
    Object.defineProperty(cls, 'name', { value: className })
    cls.config(options)
    return cls
  }
  constructor() {}
  test() {}
}

class Rect extends Node {}
Rect.config({ name: 'rect', lv1: 1 })
console.log(Rect.options, '-->>> Rect.options') // {name: 'rect', age: 0, lv1: 1}

class TT extends Rect {}
TT.config({ tt: 99, lv2: 2 })
console.log(TT.options, '-->>> TT.options') // {name: 'rect', age: 0, lv1: 1, tt: 99, lv2: 2}

/**
 * 便捷继承方法 define
 * 对于不需要扩展自定义方法的继承， 直接使用此方法简单继承
 */
const AA = Rect.define({ name: 'aa', age: 18, lv2: 2 })
console.log(AA.options, 'AA.options') // {name: 'aa', age: 18, lv1: 1, lv2: 2}

const BB = AA.define({ name: 'bb', x: 0, lv3: 3 })
console.log(BB.options, 'BB.options') // {name: 'bb', age: 18, lv1: 1, lv2: 2, x: 0, lv3: 3}

console.log('=============================')
console.dir(Rect)
console.dir(TT)
console.dir(AA)
console.dir(BB)
