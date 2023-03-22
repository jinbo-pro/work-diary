<template>
  <div>
    <poster
      ref="poster"
      :hide-loading="true"
      :preload="false"
      :config="posterConfig"
      @success="onPosterSuccess"
      @fail="onPosterFail"
    >
      <button>生成海报</button>
    </poster>

    <button @click="onCreateOtherPoster">异步生成海报二</button>
  </div>
</template>

<script>
import poster from './WxaCanvas/poster.vue'
import { posterConfig } from './options'
export default {
  name: 'hiabao',
  components: {
    poster
  },
  data() {
    return {
      posterConfig
    }
  },
  methods: {
    onPosterSuccess(e) {
      uni.previewImage({
        current: e,
        urls: [e]
      })
    },
    onPosterFail(err) {
      console.error(err)
    },
    /**
     * 异步生成海报
     */
    async onCreateOtherPoster() {
      // 模拟请求数据
      this.posterConfig = JSON.parse(JSON.stringify(posterConfig))
      await this.$nextTick()
      this.$refs.poster.onCreate(true)
    }
  }
}
</script>
