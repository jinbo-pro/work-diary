[toc]

> [参考链接](https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage)

## 代码

### package.json

```json
{
  "devDependencies": {
    "svg-sprite-loader": "4.1.3"
  }
}
```

### vue.config.js

```js
module.exports = {
  // ...
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
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
import SvgIcon from '@/components/SvgIcon.vue' // svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)
```

### SvgIcon.vue

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
