<template>
  <div class="main">
    <div v-for="(item, index) in list" :key="index" :class="{ is_me: item.userInfo.id == userInfo.id }">
      <div v-if="item.type == 'join'" class="join_box">{{ item.userInfo.userName }} 加入了聊天</div>
      <div v-else>
        <div class="user_box">{{ item.userInfo.userName }}</div>
        <div class="item_box">
          <div class="head_img" v-if="item.userInfo.id != userInfo.id">
            <van-image width="38px" height="38px" fit="cover" :src="item.userInfo.userHeadImg" />
          </div>
          <div class="content" v-html="item.data" @click="lookInfo"></div>
          <div v-if="item.userInfo.id == userInfo.id" class="head_img">
            <van-image width="38px" height="38px" fit="cover" :src="item.userInfo.userHeadImg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import { IsPC } from '../tools.js'
export default {
  name: 'MessageGroup',
  props: {
    userInfo: {
      type: Object,
      default: () => ({})
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    list() {
      this.$nextTick(() => {
        // 消息滚动到底部
        const mainDom = document.querySelector('.main')
        mainDom.scrollTop = mainDom.scrollHeight
      })
    }
  },
  methods: {
    lookInfo(e) {
      if (IsPC()) return
      const img = e.srcElement
      if (img.tagName == 'IMG') {
        ImagePreview([img.src])
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  height: calc(100vh - 95px);
  overflow-y: scroll;
  background-color: #ededed;
}

.item_box {
  padding: 8px;
  margin: 8px;
  display: flex;
  margin-top: 0;
  align-items: center;
}
.content {
  padding: 10px;
  border-radius: 4px;
  word-break: break-all;
  background-color: #fff;
  margin-left: 8px;
  margin-right: 0;
  position: relative;
  // 小三角
  &::after {
    content: '';
    border: 5px solid transparent;
    border-right-color: #fff;
    top: 14px;
    left: -10px;
    display: block;
    position: absolute;
    z-index: 1;
    text-indent: 0;
    transform: translate(0, -50%);
    transition: 0.25s;
  }
  img {
    margin-top: 12px;
    max-width: 100%;
  }
}
.join_box,
.user_box {
  text-align: left;
  font-size: 12px;
  color: #999;
  padding: 0 16px;
}
.join_box {
  padding: 8px;
  text-align: center;
}

.is_me {
  .user_box {
    text-align: right;
  }
  .item_box {
    justify-content: flex-end;
  }
  .content {
    background-color: #95eb6c;
    margin-right: 8px;
    margin-left: 0;
    &::after {
      left: auto;
      right: -10px;
      border-left-color: #95eb6c;
      border-right-color: transparent;
    }
  }
}
</style>
