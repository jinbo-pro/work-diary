[toc]

# jquery 常用代码片段

## 选择器

```js
$('.aa').parent(expr) // 找上一级父亲节点，可以传入expr进行过滤
$('.aa').parents(expr) // 查找所有祖先元素，不限于父元素
$('.aa').children(expr) // 返回所有子节点，这个方法只会返回直接的孩子节点
$('.aa').contents() // 返回下面的所有内容，包括节点和文本。
$('.aa').prev() // 返回上一个兄弟节点，不是所有的兄弟节点
$('.aa').prevAll() // 返回所有之前的兄弟节点
$('.aa').next() // 返回下一个兄弟节点，不是所有的兄弟节点
$('.aa').nextAll() // 返回所有之后的兄弟节点
$('.aa').siblings() // 返回兄弟姐妹节点，不分前后
$('.aa').find(expr) // 找到对应子节点
$('div[data-id=xxx]') // 获取 data-id=xxx 的div
```

## 获取类选择器里面的 index

```js
var index = $('.select-type').index($(this))
```
