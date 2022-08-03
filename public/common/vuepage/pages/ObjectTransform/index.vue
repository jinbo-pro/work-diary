<template>
  <div>
    <p>对象格式转换</p>
    <el-row>
      <el-col v-for="(item, index) in cardList" :key="index" :span="8">
        <CardContent :title="item" v-model="obj[item]" @blur="handel(item)">
          <div slot="header">
            <el-button v-if="item == 'queryObjectStr'" size="mini" @click="openJsonDialog"> 打开json编辑 </el-button>
          </div>
        </CardContent>
      </el-col>
    </el-row>
    <el-dialog top="5vh" width="50%" title="JsonEditor" :visible.sync="dialogVisible">
      <JsonEditor ref="JsonEditor" />
      <span slot="footer">
        <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { copyText } from '/utils/page.js'
import { transformFn } from './transformFn.js'
import JsonEditor from '/components/JsonEditor.vue'
import CardContent from '../../components/CardContent.vue'
export default {
  components: {
    JsonEditor,
    CardContent
  },
  data() {
    return {
      dialogVisible: false,
      obj: {},
      queryObject: {},
      cardList: Object.keys(transformFn)
    }
  },
  created() {
    // 初始化 obj
    for (let key in transformFn) {
      this.$set(this.obj, key, '')
    }
  },
  methods: {
    // 编辑
    handel(key) {
      const str = this.obj[key]
      const obj = transformFn[key].toObj(str)
      this.queryObject = obj
      for (let k in transformFn) {
        if (key == k) continue
        this.obj[k] = transformFn[k].toMe(obj)
      }
    },
    // 打开 json 编辑弹窗
    openJsonDialog() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.JsonEditor.setValue(this.queryObject)
      })
    },
    // 复制内容
    copyContent(val) {
      if (!val) {
        this.$message.info('内容为空')
      }
      copyText(val)
      this.$message.success('复制成功')
    }
  }
}
</script>
