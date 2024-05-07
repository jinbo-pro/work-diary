import { randomStringMini } from '@/utils/easyHash.js'
import { CrossPageInfo } from './CrossPageInfo.js'
const cros = new CrossPageInfo('cros-page-test')

new Vue({
  el: '#app',
  data() {
    return {
      isAdd: location.href.includes('isAdd=1'),
      tableData: [
        { id: 1, name: '张三' },
        { id: 2, name: '李四' }
      ]
    }
  },
  created() {
    this.card = new BroadcastChannel('card')
    this.card.onmessage = (e) => {
      this.messageList.push(e.data)
    }
  },
  mounted() {
    cros.on((data) => {
      console.log(data, '1')
      this.tableData.push(data)
    })
  },
  methods: {
    openAddPage() {
      window.open(location.href + '?isAdd=1')
    },
    addHandle() {
      cros.emit({
        id: Date.now(),
        name: '名字' + randomStringMini()
      })
    }
  }
})
