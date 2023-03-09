new Vue({
  el: '#app',
  data() {
    return {
      code: ''
    }
  },
  mounted() {
    this.initEdit()
  },
  methods: {
    initEdit() {
      this.editor = CodeMirror.fromTextArea(document.getElementById('code'), {
        // Java 编辑器模式
        mode: 'text/x-java',
        // 显示行号
        lineNumbers: true,
        // 设置主题
        theme: 'darcula',
        // 括号匹配
        matchBrackets: true,
        // 全屏模式
        // fullScreen: true,
        // 自动聚焦
        autofocus: true,
        // 代码校验
        // lint: true,
        // 自动缩进
        smartIndent: true,
        // 自动补全括号
        autoCloseBrackets: true,
        // 代码折叠
        lineWrapping: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
      })
      this.editor.on('change', (coder) => {
        this.code = coder.getValue()
      })
      this.editor.on('keyup', function (cm, event) {
        // 所有的字母和 '.' 在键按下之后都将显示智能代码提示
        if (!cm.state.completionActive && ((event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode == 190)) {
          CodeMirror.commands.autocomplete(cm, null, {
            completeSingle: false,
            // hint: handleShowHint // 自定义代码提示参考： https://blog.gavinzh.com/2020/12/13/codemirror-getting-started/
          })
        }
      })
    },
    getCode() {
      console.log(this.code)
    },
    clearCode() {
      this.editor.setValue('')
    }
  }
})
