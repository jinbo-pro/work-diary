<template>
  <div>
    <p>JSON对象键排序</p>
    <CardContent title="JSON源数据" v-model="src" />
    <CardContent title="排序后数据" :value="dist">
      <div slot="header">
        <el-button size="mini" @click="openJsonDialog"> 打开json编辑 </el-button>
      </div>
    </CardContent>
    <el-dialog top="5vh" width="50%" title="JsonEditor" :visible.sync="dialogVisible">
      <JsonEditor ref="JsonEditor" />
      <span slot="footer">
        <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 对象键排序输出
 */
function objSort(obj) {
  const result = {}
  const parse = (item) => {
    if (Array.isArray(item)) {
      return item.map(parse)
    } else if (typeof item === 'object') {
      return objSort(item)
    } else {
      return item
    }
  }
  const sortKey = Object.keys(obj).sort()
  sortKey.forEach((k) => {
    result[k] = parse(obj[k])
  })
  return result
}
import AsyncJsonEditor from '@/components/JsonEditor/AsyncJsonEditor.js'
import CardContent from '@/components/CardContent.vue'
export default {
  components: {
    JsonEditor: AsyncJsonEditor,
    CardContent
  },
  data() {
    return {
      src: '',
      dialogVisible: false
    }
  },
  computed: {
    dist() {
      if (!this.src) return ''
      try {
        const newObj = objSort(JSON.parse(this.src))
        return JSON.stringify(newObj)
      } catch (error) {
        return ''
      }
    }
  },
  methods: {
    // 打开 json 编辑弹窗
    openJsonDialog() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.JsonEditor.setValue(JSON.parse(this.dist))
      })
    }
  }
}
</script>
