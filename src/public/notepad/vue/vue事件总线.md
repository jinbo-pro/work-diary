## 一个简单的事件总线使用示例

```js
// 创建事件总线
const eventBus = new Vue()

const usercom = {
  template: `
  <div>
    <p>当前组件数据：{{ title }} - 公共数据：{{ publicTitle }}</p>
    <button @click="removeEvent">移除订阅</button>
    <button @click="addEvent">添加订阅</button>
    <button @click="send">发布</button>
  </div>
  `,
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      publicTitle: ''
    }
  },
  mounted() {
    this.addEvent()
  },
  methods: {
    send() {
      // 发布
      eventBus.$emit('change-title', this.title)
    },
    addEvent() {
      // 订阅
      eventBus.$on('change-title', this.eventChcange)
    },
    removeEvent() {
      // 不传回调函数则会移除所有的监听
      eventBus.$off('change-title', this.eventChcange)
      console.log(this.title, '移除事件监听成功')
    },
    eventChcange(val) {
      this.publicTitle = val
    }
  }
}

new Vue({
  el: '#app',
  components: {
    usercom
  },
  data() {
    return {
      text: ''
    }
  },
  mounted() {
    eventBus.$on('change-title', (val) => {
      this.text = val
    })
  },
  methods: {
    handle() {
      // 发布
      eventBus.$emit('change-title', this.text)
    },
    clearEvent() {
      eventBus.$off('change-title')
    }
  }
})

```

## 自定义事件总线

自定义的事件总线方便管理，每个事件都是唯一的不会出现重复订阅

- vueGlobalEventBus.js
```js

/**事件名 */
export const EVENT = {
  /**添加根画布 */
  ROOT_ADDED: 'ROOT_ADDED',
  /**节点点击 */
  ELEMENT_CLICK: 'ELEMENT_CLICK',
  /**节点选择 */
  SELECTION_CHANGED: 'SELECTION_CHANGED'
}

/**
 * 简易的事件总线管理
 */
class VueGlobalEventBus {
  constructor() {
    this.eventMap = new Map()
  }
  /**
   * 添加事件
   * @param {string} name
   * @param {function} fn
   */
  on(name, fn) {
    this.eventMap.set(name, fn)
  }
  /**
   * 移除事件
   * @param {string} name
   */
  off(name) {
    if (this.eventMap.has(name)) {
      this.eventMap.delete(name)
    }
  }
  /**
   * 触发事件
   * @param {string} name
   * @param {any} data
   */
  emit(name, data) {
    if (this.eventMap.has(name)) {
      const fn = this.eventMap.get(name)
      fn(data)
    }
  }
}

/**vue全局事件 */
export const globalEventBus = new VueGlobalEventBus()

```

- 页面事件发布

```js
import { EVENT, globalEventBus } from '@/utils/vueGlobalEventBus'
globalEventBus.emit(EVENT.ELEMENT_CLICK, '123')
```

- 页面事件订阅

```js
import { EVENT, globalEventBus } from '@/utils/vueGlobalEventBus'
globalEventBus.on(EVENT.ELEMENT_CLICK, (e) => {
  console.log(e, '-->>> e'); // 123
})
```