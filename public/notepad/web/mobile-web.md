# 移动端

[toc]

## 触底加载更多

```js
// 监听滚动条
mounted() {
    // 监听scroll事件
    window.addEventListener('scroll', this.onScroll, false)
},
beforeDestroy() {
    console.log('离开了')
    window.removeEventListener('scroll', this.onScroll)
},

// data
dataList:[],
pageList: {
    total: 10, // 总条目数
    pageNow: 1, // 页数
    rowNum: 6 // 每页数量
},
// methods
//滚动触底加载
onScroll() {
    let dom = document.querySelector('#goods')
    if (!dom) return
    let innerHeight = dom.clientHeight
    // 获取窗口高度
    let outerHeight = document.documentElement.clientHeight
    let scrollTop = document.documentElement.scrollTop
    if (scrollTop > innerHeight - outerHeight - 100) {
        if (this.loadEnd) {
            // console.log('加载完毕')
        } else {
            this.getList()
        }
    }
},
// 获取商品列表
getList() {
    this.loadMore = true

    if (this.noRepeat) {
        console.log(this.noRepeat, '重复请求')
        return
    }
    this.noRepeat = true

    let data = { ...this.pageList }
    delete data.total
    this.$wapi('product/productList', data).then(res => {
        this.loadMore = false
        this.pageList.total = Number(res.data.total)
        if (res.data.lastPage >= this.pageList.pageNow) {
            this.dataList = this.dataList.concat(res.data.list)
        }
        if (!res.data.hasNextPage) {
            console.log('没有了----')
            this.loadEnd = true
        }
        this.noRepeat = false // 重复请求状态解除
        this.pageList.pageNow++
    })
},
```

## 触底加载更多 vue-scroller

安装组件`npm install vue-scroller -d`

- 引入

```js
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
```

- 使用

```html
<scroller
  :on-refresh="refresh"
  :on-infinite="infinite"
  ref="myscroller"
  noDataText="亲，我也是有底线的~"
>
  　　
  <div v-for="(item,index) in productList" :key="index">
    <p>{{ item }}</p>
  </div>
</scroller>
```

- 加载动作

```js
  // 下拉刷新
  　　refresh(){
      　　this.data.pageIndex = 1;      // 重置页数刷新每次页数都是第一页
      　　this.loadEnd = false;         // 重置数据判断
      　　this.getList();
  　　},
  // 上拉加载
      infinite(done){
      　　this.getList(done)  // 注意将done方法传进入，组件好控制加载
      },
      // 获取列表
      getList(done){
              if (this.loadEnd) {
                  // 加载完毕隐藏加载圈圈
                  this.$refs.myscroller.finishInfinite(true)
                  return
              }
              this.api('aaa').then(res => {
                  if (res.data.lastPage >= this.pageList.pageNow) {
                      this.productList = this.productList.concat(
                          res.data.list
                      )
                  }
                  if (!res.data.hasNextPage) {
                      console.log('没有了----')
                      this.loadEnd = true
                  }
                  this.pageList.pageNow++
                  // 继续加载
                  if (typeof done == 'function') { // 判断一下有时需要初始加载 就不用传done了
                      done()
                  }
              })
      }
```

- 使用方式二，作滑动盒子

  ```html
  <scroller>
    <div class="notice_content">
      <p class="top8" v-html="noticeInfo.content" id="richText"></p>
    </div>
  </scroller>
  ```

  直接把要滑动的东西往里面一包就搞定了，类似于微信小程序的 scrollview scroll-y 属性

> 特点：自带加载动画，无需做重复加载处理（done 函数在请求成功后才触发下次请求）
> 流动加载的推荐方法

## 打电话

```html
<button id="call">点击打电话</button>
```

```js
var call = document.getElementById('call')
call.onclick = function () {
  window.location.href = 'tel://' + '15775861587'
}
```

## 海报生成

> 业务需求，移动端分享海报，同时可以通过微信的长按分享给朋友，朋友通过是被海报中的二维码可以进入对应页面查看详情

- 准备工作--安装模块

  ```js
  // 安装 html2canvas
  npm install html2canvas
  // 下载 qrcode.js 引入 【https://github.com/davidshimjs/qrcodejs】
  import QRCode from '@/utils/qrcode.min.js'
  ```

  > 注意事项：
  >
  > - `html2canvas` 版本要控制在 `1.0.0-rc.4` ，最新的版( `1.0.0-rc.5` )在 IOS13.4 以上 在截取 dom 图是总是失败【╮(╯-╰)╭】安装时可以使用`npm install --save html2canvas@1.0.0-rc.4`命令安装
  > - qrcode.js 没有导出，注意添加模块到处语句

- 编写海报模板

  > 由于业务需求不是截取屏幕所以要先写海报模板，若截取屏幕就可以省略此步

  ```html
  <div id="imageWrapper">
    <p>hello</p>
    <div id="qrcode"></div>
  </div>
  ```

- 编写海报弹窗

  ```html
  <!-- 海报弹窗 -->
  <div
    class="canvas-prop fdc jac"
    v-show="hasConvertImg"
    @touchmove.stop.prevent="touchmovehandle"
  >
    <div class="img-share" @click.stop>
      <div class="img-box">
        <img :src="convertImgDataUrl" class="img_share" />
        <div
          class="close-layer iconfont icon-shibai"
          @click="hasConvertImg = false"
        ></div>
      </div>
    </div>
    <div class="share-prop">长按识别图中的二维码查看详情</div>
  </div>
  ```

- 海报和二维码生成

  ```js
  // methods
  // 生成二维码
    createdQrcode() {
        return new Promise((resolve, reject) => {
            new QRCode(document.getElementById('qrcode'), location.href)
            setTimeout(() => {
                resolve()
            }, 10)
        })
    },
    // 生成海报
    createdPoster() {
        return new Promise((resolve, reject) => {
            // 若滚动条不在顶部则会导致截图不完整或截图空白【(oﾟvﾟ)ノ】
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
            let imageWrapper = document.getElementById('imageWrapper')
            html2canvas(imageWrapper, {
                allowTaint: true, // 允许canvas污染
                useCORS: true,	// 使用跨域
                logging: true
            }).then(canvas => {
                let dataURL = canvas.toDataURL('image/png')
                this.convertImgDataUrl = dataURL
                resolve()
            })
        })
    },
    // 海报和二维码生成
    toImage() {
        if (this.onRe) return
        this.onRe = true
        if (this.convertImgDataUrl) {
            this.hasConvertImg = true
            this.onRe = false
            return
        }
        Indicator.open('海报生成中...')
        this.createdQrcode()
            .then(() => {
                return this.createdPoster()
            })
            .then(() => {
                Indicator.close()
                this.onRe = false
                this.hasConvertImg = true
            })
            .catch(err => {
                Indicator.close()
                console.log(err, '-->>> err')
                Toast({
                    message: '海报生成失败!',
                    position: 'middle',
                    duration: 1500
                })
            })
  },
  ```

  > 注意：
  >
  > - html2canvas 里面的图片最好时共享的不然截图获取不到
  > - 若滚动条不在顶部则会导致截图不完整或截图空白【(o ﾟ v ﾟ)ノ】截图时应设置滚动条位置
  > - 将海报模板固定在浏览器视口，防止 ios 懒渲染而找不到 dom，导致海报截图空白【~(￣ ▽ ￣)~】使用`position: fixed;`
  > - 若海报固定在浏览器顶端，那么 IOS 端下拉刷新页面时海报模板会被发现，所以还要再上面加个中间遮挡层【(●ˇ∀ˇ●)】

## 移动端适配

- 安装手淘字体适配`lib-flexible`

  在`min.js`里面引入`import 'lib-flexible/flexible.js'`

  > 注意使用手淘弹性适应后不需要设置 meta 标签了，它会自动生成如下的 meta 标签
  >
  > `<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>`

- css 宽度适配

  - 方案一：使用 rem

  安装 css 转 rem 依赖`postcss-pxtorem`

  在` package.json`中添加如下配置

  ```js
  "postcss": {
      "plugins": {
          "autoprefixer": {},
          "postcss-pxtorem": {
              "rootValue": 75,  // 设计稿375就是37.5 设计稿是750就是75
              "selectorBlackList": ['weui','mu'], // 忽略转换正则匹配项
              "propList": ["*"]
          }
      }
  }
  ```

  > 注意
  >
  > 1.只能转换单独的 .css|.less|.scss 之类的文件、.vue 文件中的 style 中的 px
  >
  > 2.不能转换行内样式中的 px

  - 方案二：使用 vw 视窗

  设置高宽时使用 less 的 calc 计算，如设计稿是 750 的，元素的宽是 100px，那么下法如下：

  `width: calc(100vw / 7.5);`

- 点击延迟问题

  安装`fastclick`移动端点击延迟处理

  `main.js`里面设置

  ```js
  import FastClick from 'fastclick'
  FastClick.attach(document.body)
  ```

  > 原因： 移动设备上的浏览器默认会在用户点击屏幕大约延迟 300 毫秒后才会触发点击事件，这是为了检查用户是否在做双击。 为了能够立即响应用户的点击> 事件，才有了 FastClick
  >
  > 使用`needsclick`过滤特定的元素
  >
  > 如果页面上有一些特定的元素不需要使用 fastclick 来立刻触发点击事件，可以在元素的 class 上添加 needsclick:`Ignored by FastClick` 另外 FastClick 是不会对 PC 浏览器添加监听事件的

# mui-ui

## picker

```html
<!--所在省市-->
<div @click="popupVisible6 = true" class="select">
  <mt-cell title="所在区域" is-link class="input-label">
    <span class="input-label"
      >{{ selectPicker.province || "请选择所在区域" }}</span
    >
  </mt-cell>
</div>
<mt-popup
  v-model="popupVisible6"
  @touchmove.native.prevent
  position="bottom"
  class="mint-popup"
>
  <mt-picker
    :slots="provinceList"
    @change="onValuesChange($event, 'province')"
    :visible-item-count="5"
    :show-toolbar="true"
    ref="picker"
    value-key="name"
  ></mt-picker>
</mt-popup>
```

```js
// 设置初始值
 created() {
    this.$http.get('/api/common/city/all').then(res => {
        this.provinceList[0].values = res.data.data
        this.provinceList[2].values = res.data.data[1].data
    })
},
// data
 provinceList: [
    {
        flex: 1,
        values: [],
        className: 'slot6',
        textAlign: 'center'
    },
    { divider: true, content: '-', className: 'slot2' },
    {
        flex: 1,
        values: [],
        className: 'slot7',
        textAlign: 'center'
    }
],
selectPicker:{},
selectCityValues: [],

// methods
onValuesChange(picker, pickerName) {
    let values = picker.values
    console.log(values)
    // console.log(picker)
    // 初始组件会设置一次，异步数据直接就undefined了
    if (values[0]) {
        this.selectPicker[pickerName] = values[0].name + '-' + values[1].name
        picker.setSlotValues(1, values[0].data) // 【多级响应关键句】
        this.selectCityValues = values
    }
},
```

> 注意点：
>
> 这个 picker 单个的还好弄，多列的就有点坑了，数据格式要按照要求，多级数据的 values 数组不要搞错了
>
> 多列的设置响应级语句`picker.setSlotValues(1, values[0].data)`，如果使用 vue 的方法就直接掉进坑里面无法自拔

# IOS 兼容性

## 阻止双击放大

ios 可以双击放大页面，需要阻止；添加 meta 标签 重要属性`user-scalable=no`阻止用户缩放

```html
<meta
  name="viewport"
  content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no"
/>
```
