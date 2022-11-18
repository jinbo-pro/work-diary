<template>
  <view>
    <view @click="onCreate">
      <slot />
    </view>
    <WxaCanvas ref="WxaCanvas" @success="onCreateSuccess" @fail="onCreateFail" />
  </view>
</template>

<script>
/**
 * wxa-plugin-canvas 的 uni-app 复刻版
 * 参数配置参见： https://www.npmjs.com/package/wxa-plugin-canvas
 */
import WxaCanvas from './index.vue'
export default {
  name: 'poster',
  props: {
    config: {
      type: Object,
      value: () => ({})
    },
    preload: {
      // 是否预下载图片资源
      type: Boolean,
      value: false
    },
    hideLoading: {
      // 是否隐藏loading
      type: Boolean,
      value: false
    }
  },
  components: {
    WxaCanvas
  },
  data() {
    return {}
  },
  onReady() {
    if (this.preload) {
      const poster = this.$refs.WxaCanvas
      this.downloadStatus = 'doing'
      poster
        .downloadResource(this.config)
        .then(() => {
          this.downloadStatus = 'success'
          this.trigger('downloadSuccess')
        })
        .catch((e) => {
          this.downloadStatus = 'fail'
          this.trigger('downloadFail', e)
        })
    }
  },
  methods: {
    trigger(event, data) {
      if (this.listener && typeof this.listener[event] === 'function') {
        this.listener[event](data)
      }
    },
    once(event, fun) {
      if (typeof this.listener === 'undefined') {
        this.listener = {}
      }
      this.listener[event] = fun
    },
    downloadResource(reset) {
      return new Promise((resolve, reject) => {
        if (reset) {
          this.downloadStatus = null
        }
        const poster = this.$refs.WxaCanvas
        if (this.downloadStatus && this.downloadStatus !== 'fail') {
          if (this.downloadStatus === 'success') {
            resolve()
          } else {
            this.once('downloadSuccess', () => resolve())
            this.once('downloadFail', (e) => reject(e))
          }
        } else {
          poster
            .downloadResource(this.config)
            .then(() => {
              this.downloadStatus = 'success'
              resolve()
            })
            .catch((e) => reject(e))
        }
      })
    },
    onCreate(reset = false) {
      !this.hideLoading && uni.showLoading({ mask: true, title: '生成中' })
      return this.downloadResource(typeof reset === 'boolean' && reset)
        .then(() => {
          !this.hideLoading && uni.hideLoading()
          const poster = this.$refs.WxaCanvas
          poster.create(this.config)
        })
        .catch((err) => {
          !this.hideLoading && uni.hideLoading()
          uni.showToast({ icon: 'none', title: err.errMsg || '生成失败' })
          console.error(err)
          this.$emit('fail', err)
        })
    },
    onCreateSuccess(e) {
      this.$emit('success', e)
    },
    onCreateFail(err) {
      console.error(err)
      this.$emit('fail', err)
    }
  }
}
</script>
