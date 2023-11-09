import { pageShowRefresh } from '@/utils/module/pageShowRefresh.js'

pageShowRefresh.add('aaa', () => {
  console.log(1, '-->>> 1')
})

pageShowRefresh.add('bbb', () => {
  console.log(2, '-->>> 2')
})
