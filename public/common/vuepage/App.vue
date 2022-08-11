<template>
  <div>
    <el-button v-for="(item, index) in toolsList" :key="index" size="mini" @click="openLink(item.url)">
      {{ item.name }}
    </el-button>
    <hr />
    <router-link v-for="(item, index) in pageList" :key="index" :to="item.path">
      <el-button size="mini">{{ item.meta.title }}</el-button>
    </router-link>
    <router-view />
  </div>
</template>

<script>
import { routes } from './router/index.js'
export default {
  data() {
    return {
      pageList: [],
      toolsList: [
        { name: 'vue3-element-plus', url: '/common/vuepage-v3/index.html' },
        { name: '聊天室', url: '/common/chatRoom/index.html' }
      ]
    }
  },
  created() {
    this.pageList = routes.filter((e) => e.meta)
  },
  methods: {
    openLink(url) {
      window.open(url)
    }
  }
}
</script>
