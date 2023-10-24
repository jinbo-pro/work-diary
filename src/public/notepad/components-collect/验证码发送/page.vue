<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="发送验证码">
        <SendVerificationCode :time="codeTime" @sendVerificationCode="sendVerificationCode" />
      </el-form-item>
      <el-form-item label="自定义插槽">
        <SendVerificationCode :time="codeTime" @sendVerificationCode="sendVerificationCode">
          <template slot-scope="{ data }">
            <span>{{ data }}</span>
            <el-button @click="data.sendVerificationCode">发送</el-button>
          </template>
        </SendVerificationCode>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/**
 * 验证码组件
 * 使用示例
 */
import SendVerificationCode from './SendVerificationCode.vue'
export default {
  components: {
    SendVerificationCode
  },
  data() {
    return {
      codeTime: 30
    }
  },
  created() {},
  methods: {
    sendVerificationCode(cb) {
      console.log('准备发送验证码')
      // 模拟请求
      setTimeout(() => {
        console.log('验证码发送成功')
        // 请求完成启动倒计时
        cb()
      }, 1200)
    }
  }
}
</script>
