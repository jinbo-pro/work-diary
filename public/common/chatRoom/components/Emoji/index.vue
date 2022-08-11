<template>
  <div :class="['emoji_max ac fw', { show: show }]">
    <div v-for="(item, index) in emojiList" :key="index" @click="selectEmoji(item)" class="item jac">{{ item }}</div>
  </div>
</template>

<script>
import { emojiList } from './emojiList.js'
export default {
  name: 'Emoji',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      emojiList
    }
  },
  methods: {
    selectEmoji(item) {
      this.$emit('select', item)
    }
  }
}
</script>

<style lang="less" scoped>
.emoji_max {
  padding: 0;
  height: 0;
  font-size: 22px;
  transition: 0.3s;
  overflow-y: hidden;
  .item {
    width: 40px;
    height: 32px;
  }
}
.show {
  height: 120px;
  transition: 0.3s;
  overflow-y: scroll;
}
</style>
