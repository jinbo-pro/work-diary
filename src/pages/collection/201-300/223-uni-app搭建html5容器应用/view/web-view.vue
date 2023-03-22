<template>
  <view>
    <web-view src="http://localhost:7586/h5-page.html" @message="handleMessage"></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },

  methods: {
    // webview向外部发送消息
    handleMessage(e) {
      console.log('接收到消息：' + JSON.stringify(e.detail.data))
    }
  }
}
</script>
