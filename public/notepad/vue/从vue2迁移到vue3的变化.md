[toc]

# vue 的响应式

## 简单类型的响应

vue3 的 proxy 是基于对象的，对于简单类型他会将其包装成对象，对象的 value 就是值本身

```ts
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    // 定义
    const name = ref<string>('tom')
    // 改变值
    const handel = () => {
      name.value = 'jack'
    }
    return {
      name
    }
  }
})
```

## 对象类型的响应

对象类型的响应需要注意解构赋值的时候响应性丢失的问题

```ts
import { defineComponent, ref, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    // 定义
    const obj = reactive({
      name: 'tom',
      age: 18,
      list: [1, 2]
    })
    // 改变值
    const handel = () => {
      obj.name = 'jack'
      obj.age = 20
      obj.list.push(3)
    }
    // 解构时响应性的丢失
    const { age } = obj // 丢失
    const { list } = obj // 保持
    const { name } = toRefs(obj) // 保持
  }
})
```

- 注意事项
  > 直接解构 简单类型 将丢失响应性
  > 简单类型需要使用 toRefs 解构才能保持响应性
  > 直接解构 引用类型 将重新生成响应性，所以不会丢失响应性

# watch 数据监听

- immediate
  由于监听是惰性的也就是说只有值改变的时候才会触发监听，设置 immediate 后则会在初始化后执行一次监听

```ts
watch(
  message,
  () => {
    console.log('触发监听', message.value)
  },
  // 设置 immediate 选项
  {
    immediate: true
  }
)
```

- 监听注意事项
  ref 无法主动开启 watch 的深度监听需要手动开启， reactive 可以
- 取消监听

```js
// 定义一个取消观察的变量，它是一个函数
const unwatch = watch(message, () => {
  // ...
})

// 在合适的时期调用它，可以取消这个监听
unwatch()
```

## watchEffect 批量监听

watchEffect 会监听当前组件中所有的响应值变化，然后触发副作用函数，而且 watchEffect 初始化后也会执行一次，相当于于设置了 immediate

```ts
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
  setup() {
    // 单独定义两个数据，后面用来分开改变数值
    const name = ref<string>('Petter')
    const age = ref<number>(18)

    // 定义一个调用这两个数据的函数
    const getUserInfo = (): void => {
      console.log({
        name: name.value,
        age: age.value
      })
    }

    // 2s后改变第一个数据
    setTimeout(() => {
      name.value = 'Tom'
    }, 2000)

    // 4s后改变第二个数据
    setTimeout(() => {
      age.value = 20
    }, 4000)

    // 直接监听调用函数，在每个数据产生变化的时候，它都会自动执行
    watchEffect(getUserInfo)
  }
})
```

# computed 计算属性

使用示例

```ts
// 在 Vue 3 的写法：
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup() {
    // 定义基本的数据
    const firstName = ref<string>('Bill')
    const lastName = ref<string>('Gates')

    // 定义需要计算拼接结果的数据
    const fullName = computed(() => `${firstName.value} ${lastName.value}`)

    // 2s 后改变某个数据的值
    setTimeout(() => {
      firstName.value = 'Petter'
    }, 2000)

    // template 那边在 2s 后也会显示为 Petter Gates
    return {
      fullName
    }
  }
})
```

**注意事项**

- 只会更新响应式数据的计算

- 定义出来的 computed 变量，和 ref 变量的用法一样，也是需要通过 .value 才能拿到它的值

- computed 的 value 是只读的

## 重写 get 和 set

```ts
// 注意这里computed接收的入参已经不再是函数
const foo = computed({
  // 这里需要明确的返回一个值
  get() {
    // ...
  },
  // 这里接收一个参数，代表修改 foo 时，赋值下来的新值
  set(newValue) {
    // ...
  }
})
```

# directive 自定义指令

[参考](https://vue3.chengpeiquan.com/component.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8C%87%E4%BB%A4-new)

# css 预处理

## 深度操作符

```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

# 路由

history 服务器设置

```shell
location / {
  try_files $uri $uri/ /index.html;
}
```

## 路由操作变更

```js
import { useRouter } from 'vue-router'
const router = useRouter()
// 跳转首页
router.push({
  name: 'home'
})

// 返回上一页
router.back()
```

## 404 路由配置

新版的路由不再支持直接配置通配符 \* ，而是必须使用带有自定义正则表达式的参数进行定义。

```js
const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@views/404.vue')
  }
]
```

## 组件路由钩子

onBeforeRouteUpdate , onBeforeRouteLeave

```ts
import { defineComponent, onMounted, watch } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()

    // 获取文章详情
    const getArticleDetail = (articleId: number): void => {
      // 请求文章内容
      // 此处略...
    }

    // 组件挂载完成后执行文章内容的请求
    onMounted(() => {
      const ARTICLE_ID: number = Number(route.params.id) || 0
      getArticleDetail(ARTICLE_ID)
    })

    // 组件被复用时重新请求新的文章内容（注意：要获取的是to的params）
    onBeforeRouteUpdate((to, from) => {
      const NEW_ARTICLE_ID: number = Number(to.params.id) || 0
      getArticleDetail(NEW_ARTICLE_ID)
    })

    // 监听整个路由
    watch(route, (to, from) => {
      // 处理一些事情
      // ...
    })
  }
})
```

# 组件通信

## Prop 属性

- 获取属性

```ts
// props 获取绑定的属性 attrs 获取自定义属性
export default defineComponent({
  setup(props, { attrs }) {
    // attrs 是个对象，每个 Attribute 都是它的 key
    console.log(attrs.class)

    // 如果传下来的 Attribute 带有短横线，需要通过这种方式获取
    console.log(attrs['data-hash'])
  }
})
```

- inheritAttrs 屏蔽子组件自定义属性的渲染

```ts
export default defineComponent({
  inheritAttrs: false,
  setup() {
    // ...
  }
})
```

- ts 项目组件属性类型接口编写

```ts
import { defineComponent, PropType } from 'vue'
interface IFUserItem {
  name: string
  age: number
}
export default defineComponent({
  props: {
    user: {
      // 方式1. 使用 PropType 包装 (推荐)
      type: Object as PropType<IFUserItem>,
      default: () => ({})
    },
    userTwo: {
      // 方式2. 函数返回接口
      type: Object as () => IFUserItem,
      required: true
    }
  }
})
```

## emit 事件

绑定和 vue2 基本一直， 不过子组件规范起见需要写一个时间接收登记 emits

```ts
export default defineComponent({
  emits: ['update-age'],
  setup(props, { emit }) {
    // 2s 后更新年龄
    setTimeout(() => {
      emit('update-age', 22)
    }, 2000)
  }
})
```

## v-model 双向绑定

支持多个值绑定

父组件

```vue
<template>
  <Child v-model:user-name="userInfo.name" v-model:uid="userInfo.id" />
</template>
```

子组件

```js
// Child.vue
export default defineComponent({
  props: {
    userName: String,
    uid: Number
  },
  emits: ['update:userName', 'update:uid'],
  setup(props, { emit }) {
    // 2s 后更新用户名
    setTimeout(() => {
      emit('update:userName', 'Tom')
    }, 2000)
  }
})
```

## 爷孙组件通信

爷爷组件

```js
import { defineComponent, provide } from 'vue'
export default defineComponent({
  // ...
  setup() {
    // provide一个ref
    const msg = ref < string > 'Hello World!'
    provide('msg', msg)

    // 2s 后更新数据
    setTimeout(() => {
      // 修改消息内容
      msg.value = 'Hi World!'
    }, 2000)
  }
})
```

孙子组件

```js
import { defineComponent, inject } from 'vue'
export default defineComponent({
  setup() {
    // 获取数据
    const msg = inject('msg')
    // 打印刚刚拿到的数据
    console.log(msg)
    // 因为 2s 后数据会变，我们 3s 后再看下，可以争取拿到新的数据
    setTimeout(() => {
      console.log(msg)
    }, 3000)
    // 响应式数据还可以直接给 template 使用，会实时更新
    return {
      msg
    }
  }
})
```

> 注意： 爷孙组件的数据传递不建议使用响应数据，不然后面维护起来很麻烦，很难知道数据来自那一层

# 全局状态管理

vue3 的全局状态管理显得不是那么重要，因为可以通过 provide/inject 或者 全局事件总线 EventBus 甚至 export 一个 reactive 对象也足以满足大部分业务需求 ， 只有项目足够大的时候可以考虑使用 vuex 或者 Pinia 管理全局转态

## Pinia

[pinia 使用指引](https://vue3.chengpeiquan.com/pinia.html)

# 高效开发

## 全局编译器宏

```js
// 项目根目录下的 .eslintrc.js
module.exports = {
  // 原来的lint规则，补充下面的globals...
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  }
}
```

至于这几个全局函数的用处，[详细参见](https://vue3.chengpeiquan.com/efficient.html)
这里简单说下 defineProps 和 defineEmits

## script-setup

script-setup 的推出是为了让熟悉 3.0 的用户可以更高效率的开发组件，减少一些心智负担，只需要给 script 标签添加一个 setup 属性，那么整个 script 就直接会变成 setup 函数，所有顶级变量、函数，均会自动暴露给模板使用（无需再一个个 return 了）。

```vue
<!-- 使用 script-setup 格式 -->
<script setup lang="ts">
// ...
</script>
```

由于整个 script 都变成了一个大的 setup function ，没有了组件选项，也没有了 setup 入参，所以没办法和标准写法一样去接收 props 和 emits 了。

### props 接收方式变化

这是就要用到 defineProps 了

```js
defineProps({
  name: {
    type: String,
    required: false,
    default: 'Petter'
  },
  tags: {
    type: Number,
    default: 1
  }
})
```

### emits 接收方式变化

```js
// 获取 emit
const emit = defineEmits(['chang-name'])
// 调用 emit
emit('chang-name', 'Tom')
```

### attrs 的接收方式变化

```js
// 导入 useAttrs 组件
import { useAttrs } from 'vue'
// 获取 attrs
const attrs = useAttrs()
// attrs是个对象，和 props 一样，需要通过 key 来得到对应的单个 attr
console.log(attrs.msg)
```

### 顶层 await 的支持

```vue
<script setup lang="ts">
const post = await fetch(`/api/post/1`).then((r) => r.json())
</script>
```

# 拓展

- Deno - node 替代方法
