<template>
  <div>
    <p>滑动解锁组件测试</p>
    <DragVerify
      ref="dragVerifyRef"
      text="请按住滑块拖动解锁"
      successText="验证通过"
      handlerIcon="el-icon-d-arrow-right"
      successIcon="el-icon-circle-check"
      handlerBg="#F5F7FA"
      :width="300"
      :isPassing.sync="isPassing"
      @update:isPassing="updateIsPassing"
    ></DragVerify>
  </div>
</template>

<script>
import DragVerify from '../../components/DragVerify.vue'
export default {
  components: {
    DragVerify
  },
  data() {
    return {
      isPassing: false //  滑动解锁是否验证通过
    }
  },
  created() {},
  methods: {
    /**
     * 滑动解锁完成 回调函数
     * @param {boolean} isPassing 解锁是否通过
     */
    updateIsPassing(isPassing) {
      console.log(isPassing)
    }
  }
}
</script>

<style lang="less" scoped></style>
