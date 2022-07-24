<template>
  <div>
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
      pageList: []
    }
  },
  created() {
    this.pageList = routes.filter((e) => e.meta)
  },
  methods: {}
}
</script>
