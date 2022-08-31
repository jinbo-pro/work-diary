<template>
  <van-popup v-model="showPopup" style="width: 90%" round :close-on-click-overlay="false" @close="close">
    <div class="mask_max fdc jsb" @click.stop>
      <van-field v-model="userName" label="昵称" placeholder="请输入昵称" />
      <van-cell title="头像">
        <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" />
      </van-cell>
      <div class="foot_btn">
        <van-button size="small" round block type="info" @click="confirm">确认</van-button>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { tips } from '../tools.js'
import { postFormData } from '/utils/module/RequestFetch.js'
export default {
  name: 'SubmitPrompt',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userName: '',
      userHeadImg: '',
      fileList: []
    }
  },
  computed: {
    showPopup: {
      get() {
        return this.show
      },
      set(v) {
        this.$emit('update:show', v)
      }
    }
  },
  created() {},
  methods: {
    close() {
      this.showPopup = false
    },
    confirm() {
      if (!this.userName) return tips(this.placeholder)
      this.$emit('confirm', {
        userName: this.userName,
        userHeadImg: this.userHeadImg || 'https://place.dog/100/100'
      })
      this.close()
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      const formData = new FormData()
      formData.append('file', file.file)
      postFormData('/fileUpload', formData).then((res) => {
        this.userHeadImg = res.data.split('7586')[1]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.mask_max {
  padding: 24px;
  .van-cell {
    color: #646566;
  }
}
.foot_btn {
  margin-top: 26px;
}
</style>
