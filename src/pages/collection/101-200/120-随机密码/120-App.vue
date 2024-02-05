<template>
  <div>
    <div class="container">
      <p>位数：</p>
      <van-radio-group v-model="num" direction="horizontal" @change="createPassword">
        <van-radio v-for="item in numList" :key="item" :name="item">{{ item }}</van-radio>
      </van-radio-group>
      <p>字符类型：</p>
      <van-checkbox-group v-model="type" direction="horizontal" @change="createPassword">
        <van-checkbox v-for="item in typeList" :key="item.value" :name="item.value">{{ item.label }}</van-checkbox>
      </van-checkbox-group>
      <div class="handle_box" style="margin-top: 16px">
        <van-button size="large" round type="primary" @click="createPassword">生成</van-button>
        <van-button size="large" round type="info" @click="copyResult" style="margin-left: 12px">复制</van-button>
      </div>
    </div>
    <van-field v-model="result" rows="3" autosize label="结果" type="textarea" readonly />

    <van-tabs v-model="active">
      <van-tab title="复制历史">
        <van-cell
          v-for="(item, index) in historyList"
          :key="item.time"
          :title="index + 1"
          :value="item.content"
          :label="item.time"
          @click="copyHistory(item.content)"
        />
      </van-tab>
      <van-tab title="高级功能">
        <div class="container">
          <p>高级随机字符函数：</p>
          <div class="handle_box">
            <van-button size="large" round style="margin-right: 12px" @click="nanoid">nanoid</van-button>
            <van-button size="large" round @click="randomPro">随机ASCII字符</van-button>
          </div>
          <p>复制历史管理：</p>
          <van-button size="large" round @click="clearCopyHistory">清空复制历史</van-button>
          <p>自定义位数：</p>
          <div class="handle_box">
            <van-stepper v-model="num" min="8" max="99" />
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
const { Toast, Dialog } = vant
import { randomString, randomStringUnicode, nanoid } from '@/utils/easyHash.js'
import { parseTime } from '@/utils/time.js'
import { copyText } from '@/utils/page.js'
import { local } from '@/utils/storage'
const storeKey = '120-copy-historyList'
export default {
  data() {
    return {
      active: 0,
      num: 16,
      type: [1, 2, 3],
      typeList: [
        { label: '数字', value: 1 },
        { label: '小写', value: 2 },
        { label: '大写', value: 3 },
        { label: '符号', value: 4 }
      ],
      numList: [8, 12, 16, 32, 64],
      result: '',
      historyList: []
    }
  },
  created() {
    const historyList = local.get(storeKey)
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
      Toast.success('复制成功')
      if (this.historyList.length > 10) {
        this.historyList.pop()
      }
      this.historyList.unshift({ content: this.result, time: parseTime(new Date()) })
      local.set(storeKey, this.historyList)
    },
    copyHistory(text) {
      copyText(text)
      Toast.success('复制成功')
    },
    randomPro() {
      this.result = randomStringUnicode(this.num, 33)
    },
    nanoid() {
      this.result = nanoid(this.num)
    },
    async clearCopyHistory() {
      await Dialog.confirm({ title: '提示', message: '确认清空所有复制历史吗？' })
      local.remove(storeKey)
      this.historyList = []
    }
  }
}
</script>

<style lang="less">
.container {
  padding: 12px;
  padding-top: 0;
}
.handle_box {
  display: flex;
  justify-content: center;
}
</style>
