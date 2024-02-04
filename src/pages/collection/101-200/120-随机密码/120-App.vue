<template>
  <div>
    <van-radio-group v-model="num" @change="createPassword">
      <van-cell-group>
        <van-cell v-for="item in numList" :key="item" :title="`${item} 位`" clickable @click="num = item">
          <template #right-icon>
            <van-radio :name="item" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <div class="form_item_box">
      <van-checkbox-group v-model="type" direction="horizontal" @change="createPassword">
        <van-checkbox v-for="item in typeList" :key="item.value" :name="item.value">{{ item.label }}</van-checkbox>
      </van-checkbox-group>
    </div>
    <div class="form_item_box handle_box">
      <van-button style="margin-right: 12px" @click="randomPro" round>随机PRO</van-button>
      <van-button type="info" style="margin-right: 12px" @click="copyResult" round>复制</van-button>
      <van-button type="primary" @click="createPassword" round>生成</van-button>
    </div>
    <van-field v-model="result" rows="3" autosize label="结果" type="textarea" readonly />

    <van-cell
      v-for="(item, index) in historyList"
      :key="item.time"
      :title="index + 1"
      :value="item.content"
      :label="item.time"
      @click="copyHistory(item.content)"
    />
  </div>
</template>

<script>
const { Toast } = vant
import { randomString, randomStringUnicode } from '@/utils/easyHash.js'
import { parseTime } from '@/utils/time.js'
import { copyText } from '@/utils/page.js'
import { local } from '@/utils/storage'
export default {
  data() {
    return {
      num: 12,
      type: [1, 2, 3],
      typeList: [
        { label: '数字', value: 1 },
        { label: '小写', value: 2 },
        { label: '大写', value: 3 },
        { label: '符号', value: 4 }
      ],
      numList: [8, 12, 16, 32],
      result: '',
      historyList: []
    }
  },
  created() {
    const historyList = local.get('120-historyList')
    if (historyList) {
      this.historyList = historyList
    }
  },
  mounted() {
    this.createPassword()
  },
  methods: {
    createPassword() {
      if (!this.type.length) return Toast({ message: '至少选择一种类型' })
      this.result = randomString(this.num, this.type)
    },
    copyResult() {
      copyText(this.result)
      Toast({ message: '复制成功' })
      if (this.historyList.length > 10) {
        this.historyList.pop()
      }
      this.historyList.unshift({ content: this.result, time: parseTime(new Date()) })
      local.set('120-historyList', this.historyList)
    },
    copyHistory(text) {
      copyText(text)
      Toast({ message: '复制成功' })
    },
    randomPro() {
      this.result = randomStringUnicode(this.num, 33)
    }
  }
}
</script>

<style lang="less">
.form_item_box {
  padding: 12px;
}
.handle_box {
  display: flex;
  justify-content: center;
}
</style>
