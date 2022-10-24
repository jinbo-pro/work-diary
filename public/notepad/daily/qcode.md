[toc]

# 常用 cdn

```html
<!-- npm cdn -->
<script src="https://unpkg.com/包名@版本号"></script>
<!-- 示例 -->
<script src="https://unpkg.com/vue@2.6.10"></script>

<!-- jsdelivr cdn -->
<script src="https://cdn.jsdelivr.net/包名@版本号"></script>
<!-- 示例 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10"></script>
```

# css

## 网格布局

### grid 方案

```css
.max2 {
  display: grid;
  grid-row-gap: 16px;
  grid-column-gap: 16px;
  grid-template-columns: auto auto auto;
}
```

### 响应式大小

```css
.grid2 {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}
```

### 左侧固定右侧自适应

```css
.grid3 {
  display: grid;
  grid-template-columns: 300px 1fr;
}
```

# js

## 文件格式整理

```js
const { deerTools, myUtils } = require('D:/myPackage')
const path = require('path')
const src = path.resolve(__dirname, '../src')
const list = deerTools.file.getFileFlatList(src)

const ignore = [
  // 忽略文件/文件夹
  'src/assets/style/font',
  'src/lib'
]
const formatList = list.filter((e) => {
  return !ignore.some((d) => e.filePath.includes(d))
})

const fileSuffixs = [
  // 需要整理的文件后缀
  '.vue',
  '.js',
  '.css',
  '.scss',
  '.less'
]

myUtils.dirFormat(formatList, fileSuffixs)
```

## 模拟图片

- mock-js
  https://dummyimage.com/320x320

  ![](https://dummyimage.com/50x50)

## 带颜色的 console

### 浏览器

```js
console.log('%cconsole.log', 'color: green;');

// 1.将css样式传递给数组
const styles = [
  'color：green'，
  'background：yellow'，
  'font-size：30px'，
  'border：1px solid red'，
  'text-shadow：2px 2px black'，
  'padding：10px'，
].join（';'）; // 2.连接单个数组项并将它们连接成一个用分号分隔的字符串（;）
// 3.传递样式变量
console.log（'％cHello There'，styles）;
// or
console.log('%c%s', styles, 'Some Important Message Here');
```

### nodejs

```js
// Cyan
console.log('\x1b[36m%s\x1b[0m', 'I am cyan')
// Yellow
console.log('\x1b[33m%s\x1b[0m', 'yellow')
```

## Excel 连字符号转驼峰命名

```batch
=LEFT(C3,1)&MID(SUBSTITUTE(PROPER(C3),"_",""),2,100)
```
