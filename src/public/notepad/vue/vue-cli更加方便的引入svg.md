[toc]

> [参考链接](https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage)

## 代码

### package.json

```json
{
  "devDependencies": {
    "svg-sprite-loader": "^6.0.11"
  }
}
```

### vue.config.js

```js
module.exports = {
  // ...
  chainWebpack(config) {
    const addSvgRule = (p, prefix) => {
      // set svg-sprite-loader
      config.module.rule('svg').exclude.add(p).end()
      config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(p)
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: `icon-${prefix}[name]`
        })
        .end()
    }
    addSvgRule(path.resolve(__dirname, 'src/icons/svg'), '')
    // 添加多个路径...
  }
}
```

### main.js

```js
import './icons/index'
```

### icons/index.js

```js
import Vue from 'vue'
import SvgIcon from './index.vue' // svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const dirList = [
  // require.context 函数只能是明确路径
  require.context('./svg', false, /\.svg$/)
  // 添加多个目录...
]

dirList.forEach((req) => req.keys().map(req))
```

### icons/index.vue

```vue
<template>
  <svg :style="{ width: width, height: height }" :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>
```
