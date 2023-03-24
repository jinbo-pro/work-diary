<template>
  <div class="float_tools_max">
    <div
      v-for="(item, index) in toolsList"
      @click="handel(item.url)"
      class="item_tools_box"
      :data-name="item.name"
      :key="index"
    >
      {{ item.icon }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleDialog: false,
      toolsList: [
        { name: 'vuepage', icon: 'vue', url: '/pages/common/vuepage/vuepage.html' },
        { name: 'gitee', icon: 'gitee', url: 'https://gitee.com/lijinbode/work-diary' }
      ]
    }
  },
  methods: {
    handel(url) {
      window.open(url)
    }
  }
}
</script>

<style lang="less" scoped>
.float_tools_max {
  position: fixed;
  right: 16px;
  bottom: 50px;
  z-index: 666;
  .item_set_box {
    padding: 16px;
    .label_box {
      width: 80px;
    }
  }
}
.item_tools_box {
  width: 38px;
  height: 38px;
  line-height: 38px;
  font-size: 12px;
  text-align: center;
  border-radius: 6px;
  color: #8b9bb0;
  cursor: pointer;
  position: relative;
  text-shadow: 0 1px rgba(255, 255, 255, 1);
  background: rgba(255, 255, 255, 1);
  background: linear-gradient(#fff, #f0f2f4);
  border: 1px solid rgba(0, 40, 83, 0.2);
  box-shadow: 0 2px 2px rgba(31, 45, 62, 0.1), 0 0 0 1px #fff inset;
  transition: 0.25s;
  margin: 5px auto 3px;
  .iconfont {
    font-size: 18px;
    color: #252525;
  }
  &:hover {
    border-color: #20a0ff;
    color: #fff;
    text-shadow: 0 -1px #0087ec;
    box-shadow: 0 3px 3px rgba(32, 160, 255, 0.35), 0 0 3px 16px rgba(32, 160, 255, 1) inset;
    .iconfont {
      color: #fff;
    }
  }
  // 提示信息
  &::before {
    color: #fff;
    content: attr(data-name);
    box-sizing: border-box;
    background: rgba(31, 45, 62, 0.8);
    padding: 5px 7px;
    white-space: nowrap;
    border-radius: 5px;
    font-size: 12px;
    line-height: 12px;
    text-shadow: 0 1px 2px rgba(31, 45, 62, 1);
    transition: 0.25s;
    transform: translate(-100%, -50%);
    display: block;
    position: absolute;
    z-index: 1;
    text-indent: 0;
    top: 50%;
    left: -8px;
    opacity: 0;
  }
  // 小三角形
  &::after {
    content: '';
    border: 5px solid transparent;
    border-left-color: rgba(31, 45, 62, 0.8);
    top: 50%;
    left: -8px;
    opacity: 0;
    display: block;
    position: absolute;
    z-index: 1;
    text-indent: 0;
    transform: translate(0, -50%);
    transition: 0.25s;
  }
  &:hover::before,
  &:hover::after {
    opacity: 1;
    visibility: visible;
  }
}
</style>
