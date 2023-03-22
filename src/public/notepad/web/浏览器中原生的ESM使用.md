[toc]

[参考文档](https://q.shanyue.tech/engineering/752.html)

## 链接方式导入

- module 标签导入

```html
<script type="module">
  import lodash from 'https://cdn.skypack.dev/lodash'
  const str = lodash.trim('  abc  ')
  console.log(str) // abc
</script>
```

- import() 函数导入

```html
<script>
  import('https://cdn.skypack.dev/lodash').then((_) => {
    const str = lodash.trim('  abc  ')
    console.log(str) // abc
  })
</script>
```

## 没有链接裸导入

- 首先添加导入路径映射 importmap

```html
<script type="importmap">
  {
    "imports": {
      "lodash": "https://cdn.skypack.dev/lodash",
      "vue": "https://cdn.jsdelivr.net/npm/vue@3.2.45/dist/vue.esm-browser.prod.js"
    }
  }
</script>
```

- 导入

```html
<script>
  import('lodash').then((_) => {
    console.log(_, '-->>> _')
    const a = _.trim('  abc  ')
    console.log(a)
  })
  import('vue').then((vue) => {
    console.log(vue, '-->>> vue')
  })
</script>
```
