[toc]

# 简介

## 在 JavaScript EventLoop 中的优先级概念

- 具有较高优先级的任务称为微任务。包括：Promise、ObjectObserver、MutationObserver、process.nextTick、async/await。

- 优先级较低的任务称为宏任务。包括：setTimeout 、 setInterval 和 XHR 。

### 小标题

## 看下面一段代码，分析其执行顺序

```js
console.log('start')
const promise1 = Promise.resolve().then(() => {
  console.log('promise1')
  const timer2 = setTimeout(() => {
    console.log('timer2')
  }, 0)
})

const timer1 = setTimeout(() => {
  console.log('timer1')
  const promise2 = Promise.resolve().then(() => {
    console.log('promise2')
  })
}, 0)
console.log('end')
```

执行事件的顺序为

1. 同步代码
2. 所有微任务
3. 第一个宏任务
4. 所有新添加的微任务
5. 下一个宏任务

以此顺序一直循环直到所有代码执行完毕
所以分析得出上面代码的执行顺序为

1. 执行同步代码

```js
console.log('start')
console.log('end')
```

执行得到结果
start
end

2. 执行所有微任务

```js
const promise1 = Promise.resolve().then(() => {
  console.log('promise1')
  const timer2 = setTimeout(() => {
    console.log('timer2')
  }, 0)
})
```

执行得到结果
promise1
同时将宏任务 timer2 添加到 宏任务队列

3. 执行第一个宏任务

```js
const timer1 = setTimeout(() => {
  console.log('timer1')
  const promise2 = Promise.resolve().then(() => {
    console.log('promise2')
  })
}, 0)
```

执行得到结果
timer1
同时将微任务 promise2 添加到 微任务队列

**注意**

> 此时虽然正在执行宏任务队列，但是由于遇到了微任务，所以会优先执行微任务当所有的微任务执行完成后才会继续执行宏任务队列

4. 执行所有新添加的微任务

```js
const promise2 = Promise.resolve().then(() => {
  console.log('promise2')
})
```

执行得到结果
promise2

5. 执行下一个宏任务

```js
const timer2 = setTimeout(() => {
  console.log('timer2')
}, 0)
```

执行得到结果
timer2

综上得到执行结果为
start
end
promise1
timer1
promise2
timer2

## 小结

1. JavaScript 引擎总是先执行同步代码，然后再执行异步代码。
2. 微任务的优先级高于宏任务。
3. 微任务可以在 Event Loop 中插队。
