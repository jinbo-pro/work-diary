# jest

[toc]

# 常用断言

## 常用

- not: 类似于 ! 取反

  `expect(2).not.toBe(1)`

- toBe：类似 ===

  `expect(1).toBe(1)`

- toEqual：基本用来，匹配对象是否相等

  `expect({ one: 1 }).toEqual({ one: 1 })`

- toBeNull：用来匹配某个值 等于 null

  `expect(null).toBeNull(null)`

- toBeUndefined：用来匹配某个值 等于 undefined

  `expect(undefined).toBeUndefined(undefined)`

- toBeTruthy： 用来匹配某个值 等于 真

  `expect(true).toBeTruthy()`

- toBeFalsy： 用来匹配某个值 等于 假

  `expect(false).toBeFalsy()`

## 数字相关

- toBeGreaterThan 比某个数字大

  `expect(2).toBeGreaterThan(1)`

- toBeLessThan 比某个数字小

  `expect(1).toBeLessThan(2)`

- toBeGreaterThanOrEqual 大于等于某个数字

  `expect(2).toBeGreaterThanOrEqual(2)`

- toBeLessThanOrEqual 小于等于某个数字

  `expect(2).toBeLessThanOrEqual(2)`

- toBeCloseTo 用来计算浮点数相加是否相等

  ```js
  expect(0.1 + 0.2).toBe(0.3) // 这个通不过测试
  expect(0.1 + 0.2).toBeCloseTo(0.3) // 这样就可以了
  ```

## 字符串相关

- toMatch 匹配 字符串内是否包含(可以写正则表达式) 某个字符串

  ```js
  expect('你好').toMatch('/你/')
  expect('你好啊').toMatch('你好')
  ```

## 数组相关

- toContain 是否包含 也可以用到字符串上

  ```js
  const arr = [1, 2, 3, 4]
  expect(arr).toContain(3)

  const setData = new Set(arr)
  expect(setData).toContain(2)
  ```

- toHaveLength 验证数组或字符串长度

  ```js
  expect([1, 2, 3]).toHaveLength(3)
  expect('abc').toHaveLength(3)
  expect('').not.toHaveLength(5)
  ```

- toContainEqual(item)

  ```js
  function myBeverages() {
    return [
      { delicious: true, sour: false },
      { delicious: false, sour: true }
    ]
  }
  test('is delicious and not sour', () => {
    const myBeverage = { delicious: true, sour: false }
    expect(myBeverages()).toContainEqual(myBeverage)
  })
  ```

## 异常相关

- toThrow(抛出的异常信息 “可以不填，可以写正则”) 测试异常

  ```js
  const errorFn = () => {
    throw new Error('这是一个错误')
  }
  test('测试函抛出出异常', () => {
    expect(errorFn).toThrow() // 正确
    expect(errorFn).toThrow('这是一个错误') // 正确
    expect(errorFn).toThrow(/这是一个错误/) // 正确

    expect(errorFn).toThrow('这不是一个错误') // 错误
  })
  ```
