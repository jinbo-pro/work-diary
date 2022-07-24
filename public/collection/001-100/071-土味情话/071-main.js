new Vue({
  el: '#app',
  data() {
    return {
      list
    }
  },
  methods: {
    copyText(text) {
      if (!text) return
      document.execCommand('Copy')
      var inputZ = document.createElement('input')
      inputZ.setAttribute('id', 'inputCopy')
      inputZ.value = text
      document.body.appendChild(inputZ)
      document.getElementById('inputCopy').select()
      document.execCommand('Copy')
      document.body.removeChild(inputZ)
      alert('复制成功')
    }
  }
})
