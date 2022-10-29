<template>
  <!-- wrapper可视容器需要设置overflow-y:auto;才能监听滚动事件，在父组件使用该组件时，需要设置wrapper可视容器的区域范围 -->
  <div class="wrapper" @scroll.passive="scrollHandler" ref="wrapper">
    <!-- content填充要显示内容以及上下空白占位 -->
    <div class="content" :style="blankFillStyle">
      <div v-for="(item, index) in showDataList" :key="index + item.id">
        <!-- 每条数据的内容结构通过插槽的方式让父组件调用该组件时填充进来 -->
        <slot :row="item"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 一条数据内容的高度
    oneDataHeight: {
      type: Number,
      default: 0
    },
    // 源数据列表
    sourceDataList: {
      type: Array,
      default: () => []
    },
    // 是否向外触发滚动至底事件(scroll-last)
    scrollLastFlag: {
      type: Boolean,
      default: false
    },
    // 是否向外触发滚动事件(scroll)，会传出滚动的位移
    scrollFlag: {
      type: Boolean,
      default: false
    }
  },
  name: 'VirtualScroll',
  data() {
    return {
      // 可视屏幕容积数量
      screenContainSize: 0,
      // 当前可视数据起始位置索引
      startIndex: 0,
      // 滚动事件触发执行的函数
      scrollFn: null,
      // 保存滚动的位移
      scrollY: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 挂载后，根据可视容器高度计算可视屏幕容积数量
      this.myResize()
      // 屏幕尺寸变化以及横屏，都要重新计算可视屏幕容积数量
      window.onresize = this.myResize
      window.onorientationchange = this.myResize
      // 通过定时器节流处理生成的函数，用于处理滚动事件
      // this.scrollFn = this.throttle(this.setStartIndex, 17);
    })
  },
  methods: {
    // 根据可视容器高度计算可视屏幕容积数量
    myResize() {
      // 两次取反可取整，上下有多余空间，因此需要加2条数据
      this.screenContainSize = ~~(this.$refs.wrapper.offsetHeight / this.oneDataHeight) + 2
    },
    // 定时器节流函数
    throttle(fn, delay) {
      let timer = null
      return function (...args) {
        if (!timer) {
          timer = setTimeout(() => {
            fn.apply(this, args)
            clearTimeout(timer)
            timer = null
          }, delay)
        }
      }
    },
    // 滚动事件处理
    scrollHandler() {
      // 1.定时器节流方式
      // 定时器节流，因为定时时间是设定死的，无法根据设备屏幕刷新率相匹配；
      // 如果定时时间设置高了，对于高刷新率设备屏幕来说，当滚动速度很快时，这个定时节流就是个累赘，数据处理速率慢，很容易出现白屏现象
      // this.scrollFn();

      // 2.请求动画帧节流方式
      // 请求动画帧函数是根据设备屏幕的刷新率来设置回调函数执行的时间间隔的，效果上比定时器节流要好很多

      const fps = 30 //屏幕刷新率为30hz
      const interval = parseInt(1000 / fps) //每次的时间间隔
      let then = Date.now()
      // 定义请求动画帧回调函数
      const callback = () => {
        const now = Date.now()
        this.setStartIndex()
        // 兼容低刷新率设备，如果屏幕刷新率低于30hz，递归执行回调函数
        if (now - then >= interval) {
          then = now
          window.requestAnimationFrame(callback)
        }
      }
      window.requestAnimationFrame(callback)
    },
    // 根据滚动的位移计算当前数据起始位置索引
    setStartIndex() {
      this.scrollY = this.$refs.wrapper.scrollTop
      if (this.scrollFlag) {
        this.$emit('scroll', this.scrollY)
      }
      let currentIndex = ~~(this.scrollY / this.oneDataHeight)
      // 如果上一次的startIndex与现在的startIndex相等，直接返回，无须处理
      if (currentIndex === this.startIndex) return
      this.startIndex = currentIndex
      // 滚动至底向外发布事件
      if (this.endIndex >= this.sourceDataList.length && this.scrollLastFlag) {
        this.$emit('scroll-last')
      }
    },
    // 设置滚动到具体的位置,delay：过渡时间
    scrollTo(val, delay = 0) {
      if (delay === 0) {
        this.$refs.wrapper.scrollTop = val
        return
      }
      const ms = Math.ceil(delay / 5)
      const timer = setInterval(() => {
        const scrollTop = this.$refs.wrapper.scrollTop
        const speed = Math.ceil((scrollTop - val) / 5)
        this.$refs.wrapper.scrollTop = scrollTop - speed <= val ? val : scrollTop - speed
        if (this.$refs.wrapper.scrollTop === val) {
          clearInterval(timer)
        }
      }, ms)
    },
    // 获取滚动位移
    scrollOffset() {
      return this.scrollY
    }
  },
  computed: {
    // 当前可视数据结束位置索引
    endIndex() {
      // 屏幕下方加一屏缓冲数据，以消除因向上滚动过快而出现的白屏现象
      // let endIndex = this.startIndex + this.screenContainSize;
      let endIndex = this.startIndex + this.screenContainSize * 2
      // 如果endIndex位置索引数据不存在，则就等于源数据的长度
      if (!this.sourceDataList[endIndex]) {
        endIndex = this.sourceDataList.length
      }
      return endIndex
    },
    // 当前在屏幕上要展示的数据列表
    showDataList() {
      // 屏幕上方留一屏缓冲数据，以消除因向下滚动过快而出现的白屏现象
      let startIndex = this.startIndex
      if (startIndex < this.screenContainSize) {
        startIndex = 0
      } else {
        startIndex = this.startIndex - this.screenContainSize
      }
      // 截取要展示的数据
      return this.sourceDataList.slice(startIndex, this.endIndex)
    },
    // 计算上下空白占位填充
    blankFillStyle() {
      // 上方因为留了一屏缓冲数据，因此滚动过一屏数据后才开始计算上方空白占位
      let startIndex = this.startIndex
      if (startIndex < this.screenContainSize) {
        startIndex = 0
      } else {
        startIndex = this.startIndex - this.screenContainSize
      }
      return {
        paddingTop: startIndex * this.oneDataHeight + 'px',
        paddingBottom: (this.sourceDataList.length - this.endIndex) * this.oneDataHeight + 'px'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper {
  height: 100%;
  overflow-y: auto;
}
</style>
