<template>
  <div id="welcome" :class="{ show: showWeather }">
    <center>
      <span>今日：</span>
      <iframe
        scrolling="no"
        height="18"
        frameborder="0"
        allowtransparency="true"
        src="https://i.tianqi.com/index.php?c=code&id=1&icon=1&wind=0&num=1"
      >
      </iframe>
    </center>
    <div class="closebox" @click="showWeather = false">关闭</div>
  </div>
</template>

<script>
export default {
  name: 'Weather',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showWeather: {
      get() {
        return this.show
      },
      set(v) {
        this.$emit('update:show', v)
      }
    }
  }
}
</script>

<style lang="less">
#welcome {
  text-align: center;
  background: #ffffff;
  border: 0px solid #ffffff;
  color: #000000;
  font-size: 14px;
  opacity: 0.9;
  padding: 10px 20px;
  position: fixed;
  left: -550px;
  bottom: 24px;
  z-index: 99999;
  border-top-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
  transition: 0.3s;
  .from-url {
    color: #3d3b4f;
    font-weight: 700;
  }
  .closebox {
    color: #20a0ff;
    text-align: center;
    font-size: 16px;
    margin-top: 10px;
    cursor: pointer;
  }
  &.show {
    left: 24px;
    transition: 0.5s;
  }
}
</style>
