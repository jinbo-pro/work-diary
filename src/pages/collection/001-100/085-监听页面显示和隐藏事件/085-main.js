import { pageShowRefresh } from '@/utils/module/pageShowRefresh.js'

pageShowRefresh('aaa', () => {
  console.log(1, '-->>> 1')
})

pageShowRefresh('bbb', () => {
  console.log(2, '-->>> 2')
})
