<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="jsb ac">
        <div class="label_title">{{ title }}</div>
        <slot name="header"></slot>
      </div>
      <el-input v-model="cardValue" type="textarea" :rows="5" v-bind="$attrs" @blur="blur"></el-input>
      <div class="foot_btn jac">
        <el-button size="mini" @click="dialogVisible = true"> 展开 </el-button>
        <el-button size="mini" @click="copyContent"> 复制 </el-button>
      </div>
    </el-card>
    <el-dialog top="5vh" title="详细" width="700px" :close-on-click-modal="false" :visible.sync="dialogVisible">
      <div class="content">
        <el-input v-model="cardValue" type="textarea" autosize v-bind="$attrs"></el-input>
      </div>
      <span slot="footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { copyText } from '@/utils/page.js'
export default {
  name: 'CardContent',
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    cardValue: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  },
  methods: {
    blur(val) {
      this.$emit('blur', val)
    },
    // 复制内容
    copyContent() {
      const val = this.value
      if (!val) {
        this.$message.info('内容为空')
      }
      copyText(val)
      this.$message.success('复制成功')
    }
  }
}
</script>

<style lang="less" scoped>
.label_title {
  height: 30px;
  font-size: 18px;
  font-weight: bold;
}
.foot_btn {
  padding-top: 16px;
}
.content {
  height: 500px;
  overflow-y: scroll;
  font-family: Consolas, Monaco, 'Andale Mono', monospace;
}
</style>
