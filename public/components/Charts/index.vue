<template>
  <div :id="chartId" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import { init } from 'https://lib.baomitu.com/echarts/5.3.3/echarts.esm.min.js'
import resize from './resize.js'

const guid = () => {
  const S = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return `${S()}${S()}-${S()}-${S()}-${S()}-${S()}${S()}${S()}`
}

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '350px'
    },
    height: {
      type: String,
      default: '260px'
    },
    option: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chartId: '',
      chart: null
    }
  },
  watch: {
    option(val) {
      this.chart.setOption(val)
    }
  },
  created() {
    this.chartId = this.id || guid('chart-')
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      if (!this.option) {
        return console.log('没有数据')
      }
      this.chart = init(document.getElementById(this.chartId))
      this.chart.setOption(this.option)
    }
  }
}
</script>
