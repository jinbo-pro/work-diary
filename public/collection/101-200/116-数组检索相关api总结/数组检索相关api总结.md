[toc]
定义一个数组

```js
var list = [1, 2, 3, 0, null, 6]
```

## indexOf

```js
/**
 * indexOf
 * 数组中是否包含检索值， 如果有则返回对应值的索引， 若果没有则返回 -1
 * 使用场景 查找数组中对应值的索引
 */
list.indexOf(2) // 1
```

## findIndex

```js
/**
 * findIndex
 * 只是可以传入一个回调函数进行判断， 返回值和 indexOf 一样
 * 使用场景 查找数组中对应值的索引
 */
list.findIndex((e) => e == 2) // 1
```

## find

```js
/**
 * find
 * 数组中是否包含检索值， 如果有则返回对应值， 若果没有则返回 undefined
 * 使用场景 查找数组中对应值
 */
list.find((e) => e == 2) // 2
```

## includes

```js
/**
 * includes
 * 数组中是否包含检索值， 如果有则返回 true， 若果没有则返回 false
 * 使用场景 查找数组中对应值
 */
list.includes(2) // true
```

## some

```js
/**
 * some
 * 只是可以传入一个回调函数进行判断， 返回值和 includes 一样
 * 使用场景 查找数组中对应值
 */
list.some((e) => e == 2) // true
```
