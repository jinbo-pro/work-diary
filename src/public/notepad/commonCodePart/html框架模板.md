[toc]

## react

### react-html 模板

> react html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.production.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/babel-standalone@6.26.0/babel.min.js"></script>
    <title>react-hello</title>
  </head>

  <body>
    <div id="app"></div>
    <script type="text/babel">
      // 组件
      class HelloWord extends React.Component {
        alertMessage() {
          alert('你刚才点了我一下。。。。')
        }
        render() {
          return <h2 onClick={this.alertMessage}>你好世界！！！</h2>
        }
      }
      // 渲染
      ReactDOM.render(<HelloWord />, document.getElementById('app'))
    </script>
  </body>
</html>
```

## vue

### vue2-html 模板

> vue2 html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-y/vue/2.6.14/vue.min.js"></script>
    <title>vue-hello</title>
  </head>

  <body>
    <div id="app">
      <button @click="handel">{{ message }}</button>
    </div>
    <script>
      new Vue({
        el: '#app',
        data() {
          return {
            message: '点击'
          }
        },
        created() {},
        mounted() {},
        methods: {
          handel() {
            console.log('123456')
          }
        }
      })
    </script>
  </body>
</html>
```

### vue3-html 模板

> vue3 html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue@3.2.45/dist/vue.global.prod.js"></script>
    <title>vue3-hello</title>
  </head>
  <body>
    <div id="app">
      <h1>{{ foo }}</h1>
      <button @click="handel">点击</button>
      <hello-vue-app></hello-vue-app>
    </div>
    <script>
      const { ref } = Vue
      const HelloVueApp = {
        template: '<p>{{ message }}</p>',
        setup() {
          const message = ref('Hello')
          return {
            message
          }
        }
      }
      const App = {
        setup() {
          const foo = ref(1)
          return {
            foo,
            handel: () => {
              foo.value++
            }
          }
        },
        components: {
          'hello-vue-app': HelloVueApp
        }
      }
      Vue.createApp(App).mount('#app')
    </script>
  </body>
</html>
```

## 其他

### mockjs-使用 demo

> mockjs html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-y/Mock.js/1.0.0/mock-min.js"></script>
    <title>mockjs-demo</title>
  </head>

  <body>
    <script>
      const Mock = window.Mock
      // 评论列表
      function commentList(num = 10) {
        let result = Mock.mock({
          [`data|${num}`]: [
            {
              'id|+3': 99, // 评论id
              'star|1-1000': 1, // 点赞数
              creator: '@cname()', // 创建人
              headImg: '@image("150x150")', // 用户头像
              name: '@ctitle(6, 20)', // 标题
              content: '@cparagraph(1, 3)', // 内容
              'createTime|1546300800-1640908800': 1 // 创建时间2019-01-01 ~ 2021-12-31
            }
          ]
        })
        return result.data
      }
      // 用户列表
      function userList(pageSize = 10) {
        let result = Mock.mock({
          [`data|${pageSize}`]: [
            {
              'id|+3': 99, // id
              name: '@cname()', // 名字
              'age|10-99': 1, // 年龄
              'gender|1-2': 1, // 性别
              'status|0-3': 1, // 状态
              'headerImg|1-3': ['@image("150x150")'], // 头像
              content: '@cparagraph(1)', // 简介
              'createTime|1546300800-1640908800': 1 // 创建时间2019-01-01 ~ 2021-12-31
            }
          ]
        })
        return result.data
      }
      // 列表数据 - [主要用于mockjs测试]
      function listData(count = 10) {
        let result = Mock.mock({
          [`data|${count}`]: [
            {
              id: '@id()', // 18位字符型id
              ip: '@ip()', // ipv4
              guid: '@guid()', // 全局唯一guid
              name: '@name()', // 英文姓名
              cname: '@cname()', // 中文姓名
              cfirst: '@cfirst()', // 中文姓
              province: '@province()', // 省
              city: '@city()', // 市
              county: '@county()', // 区县
              addressInfo: Mock.Random.county(true), // 省市县级联  @county(true) 与上面的county冲突了 不能一起写
              ctitle: '@ctitle(3,10)', // 中文标题3-10个字
              cword: '@cword(8,20)', // 中文文章8-20个字
              cparagraph: '@cparagraph(1,3)', // 中文句子1-3句
              title: '@title(1,3)', // 英文标题1-3个    英文文章和句子类似于中文的只是去掉c即可
              hex: '@hex()', // hex颜色
              rgb: '@rgb()', // rgb颜色
              now: '@now()', // 当前时间
              datetime: '@datetime("yyyy-MM-dd HH:mm:ss")', // 随机时间 可设置格式
              'headerImg|1-3': ['@image("150x150", @hex())'], // 头像 Random.image( size?, background?, foreground?, format?, text? )
              range: '@range(2, 20, 2)', // 数列Random.range( start, stop, step )
              string: '@string(3,10)', // 字符串3-10个字里面有字母标点等
              float: '@float(10,500)', // 10-500之间的浮点数
              'number|10-999': 1, // 10-999之间的整数
              'numberAuto|+2': 2 // 输出整数初始为2每次自增2
            }
          ]
        })
        return result.data
      }
    </script>
  </body>
</html>
```

### layui-demo-使用 demo

> layui-demo html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.jsdelivr.net/npm/layui@2.6.13/dist/css/layui.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/layui@2.6.13/dist/layui.min.js"></script>
    <title>layui-demo</title>
  </head>
  <body>
    <i class="layui-icon layui-icon-face-smile" style="font-size: 30px; color: #1e9fff"></i>
    <button type="button" class="layui-btn layui-btn-normal" onclick="handel()">点击</button>
    <script>
      const { $, layer } = layui
      function handel() {
        layer.open({
          type: 1,
          content: '弹窗信息'
        })
      }
    </script>
  </body>
</html>
```

### less.js 使用 demo

> less.js html

```less
/* ./demo.less */
.max {
  color: red;
  .box {
    font-size: 12px;
  }
}
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet/less" href="./demo.less" />
    <script src="https://cdn.jsdelivr.net/npm/less@4.1.3/dist/less.min.js"></script>
    <title>less html</title>
    <style type="text/less"></style>
  </head>
  <body>
    <div class="max">
      <div class="box">1</div>
    </div>
  </body>
</html>
```
