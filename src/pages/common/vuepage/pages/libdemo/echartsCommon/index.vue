<template>
  <div class="jsbw">
    <div v-for="(item, index) in options" :key="index" class="chart_item_box">
      <Charts :option="item" width="500px" height="300px" />
    </div>
  </div>
</template>

<script>
import AsyncCharts from '@/components/Charts/AsyncCharts.js'
import { baseBar } from './options/baseBar.js'
import { baseLine } from './options/baseLine.js'
import { basePie } from './options/basePie.js'
export default {
  components: {
    Charts: AsyncCharts
  },
  data() {
    return {
      options: [baseBar, baseLine, basePie]
    }
  },
  created() {},
  methods: {}
}
</script>
