<template>
  <div class="main">
    <div v-for="(item, index) in list" :key="index" :class="{ is_me: item.userInfo.id == userInfo.id }">
      <div v-if="item.type == 'join'" class="join_box">{{ item.userInfo.name }} 加入了聊天</div>
      <div v-else>
        <div class="user_box">{{ item.userInfo.name }}</div>
        <div class="item_box">
          <div class="content" v-html="item.data"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  }
}
</script>

<style lang="less" scoped>
.main {
  height: calc(100vh - 100px);
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
  }
}
</style>
