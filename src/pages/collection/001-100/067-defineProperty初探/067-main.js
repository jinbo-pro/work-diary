// 数据描述符 writable
let Person = {}
Object.defineProperty(Person, 'name', {
  value: 'jack',
  writable: false, // 是否可以改变，默认为 false
  enumerable: false, // 是否可枚举，默认为 false
  configurable: false // 是否可配置和删除描述属性，默认为 false
  // get: function () {
  //     return _this._data[key];
  // },
  // set: function (newValue) {
  //     _this._data[key] = newValue;
  // }
})
Person.name = 'tom' // 因为writable为false所以该操作无效
console.log(Person, '-->>> Person') // {name: "jack"}
console.log(Person.name, '-->>> Person') // {name: "jack"}

let obj = {}
obj.name = 'jack'

// 上面的代码等同于
let objTwo = {}
Object.defineProperty(objTwo, 'name', {
  value: 'jack',
  writable: true,
  enumerable: true,
  configurable: true
})
