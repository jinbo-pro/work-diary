## 往返缓存

> 有些事件看似是 vue 等框架支持的，其实原生 js 早就支持了

> **「往返缓存」**指浏览器为了在页面间执行前进后退操作时能拥有更流畅体验的一种策略，以下简称 `BFCache` 。该策略具体表现为：当用户前往新页面前将旧页面的 DOM 状态保存在 `BFCache` 里，当用户返回旧页面前将旧页面的 DOM 状态从 `BFCache` 里取出并加载。大部分 `移动端浏览器` 都会部署 `BFCache` ，可大大节省接口请求的时间和带宽。

解决往返缓存的方式如下：通过监听页面的销毁或显示事件手动执行代码即可

- 页面销毁事件

```js
// 在新页面监听页面销毁事件
window.addEventListener('onunload', () => {
  // 执行旧页面代码
})
```

- 页面显示事件

```js
window.addEventListener('pageshow', (e) => {
  if (e.persisted) {
    console.log('浏览器-往返缓存')
    location.reload()
  }
})
```

> `pageshow事件` 在每次页面加载时都会触发，无论是首次加载还是再次加载都会触发，这就是它与 `load事件` 的区别。
> `pageshow事件` 暴露的 `persisted` 可判断页面是否从 `BFCache` 里取出。
