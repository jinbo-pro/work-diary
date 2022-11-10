import { clearSearch, searchKeyWord } from './searchKeyWord.js'

new Vue({
  el: '#app',
  data() {
    return {
      keyDoc: '',
      list: []
    }
  },
  created() {
    const res = Mock.mock({
      'data|50-100': [
        {
          id: '@id()',
          name: '@cname()',
          city: '@city()',
          title: '@cparagraph(1,3)'
        }
      ]
    })
    this.list = res.data
  },
  methods: {
    searchHandel() {
      clearSearch()
      searchKeyWord(this.keyDoc)
    }
  }
})
