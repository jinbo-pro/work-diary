<template>
  <div>
    <van-button @click="createBarcode">打开扫码</van-button>
    <div v-show="showCanCode" id="camera">
      <div id="scan"></div>
      <div class="action">
        <div class="items">
          <div class="item" @click="openLight">
            <img src="./icon/shandian.png" />
          </div>
          <div class="item" @click="getPicture">
            <img src="./icon/tupian.png" />
          </div>
          <div class="item" @click="cancelScan">
            <img src="./icon/guanbi.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * plus.barcode 文档参考：
 * https://www.html5plus.org/doc/zh_cn/barcode.html
 */
import { canMove, stopMove } from '@/utils/jcore'
var barcode = null
export default {
  data() {
    return {
      codeUrl: '',
      isLight: false,
      showCanCode: false
    }
  },
  watch: {
    showCanCode(v) {
      // 打开时防止页面滚动
      v ? stopMove() : canMove()
    }
  },
  beforeDestroy() {
    if (!window.plus) return
    barcode.cancel()
    barcode.close()
  },
  mounted() {
    // 未扫码直接返回时关闭扫码界面
    document.addEventListener('plusready', () => {
      plus.key.addEventListener('backbutton', () => {
        if (barcode) {
          this.cancelScan()
          return
        }
        const currentWebview = plus.webview.getTopWebview()
        currentWebview.canBack(function (evt) {
          if (evt.canBack) {
            currentWebview.back()
          } else {
            currentWebview.close('auto')
          }
        })
      })
    })
  },
  methods: {
    // 打开闪光灯
    openLight() {
      this.isLight = !this.isLight
      barcode.setFlash(this.isLight)
    },
    // 取消扫描
    cancelScan() {
      if (!window.plus) return
      this.showCanCode = false
      if (barcode) {
        barcode.cancel() //关闭扫描
        barcode.close() //关闭条码识别控件
        barcode = null
      }
    },
    // 创建扫码
    createBarcode() {
      this.showCanCode = true
      console.log(1)
      barcode = plus.barcode.create('barcode', [plus.barcode.QR], {
        top: '100px',
        left: '0px',
        width: '100%',
        height: '500px',
        position: 'static'
      })
      barcode.onmarked = (type, result) => {
        this.codeUrl = result
        console.log(result, '-->>> result')
        this.cancelScan()
      }
      plus.webview.currentWebview().append(barcode)
      barcode.start()
    },
    // 从相册选择图片扫码
    getPicture() {
      plus.gallery.pick((src) => {
        plus.barcode.scan(src, (type, result) => {
          this.codeUrl = result
          console.log(result, '-->>> result')
          this.cancelScan()
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
#scan {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 1);
}
.action {
  position: fixed;
  z-index: 9999;
  width: 100%;
  left: 0;
  bottom: 50px;
}
.items {
  display: flex;
  justify-content: space-around;
  background: rgba(0, 0, 0, 0.35);
  width: 60%;
  padding: 4px;
  margin: 4px auto;
}
.item {
  flex-basis: 50px;
  text-align: center;
}
.item img {
  width: 27px;
}
</style>
