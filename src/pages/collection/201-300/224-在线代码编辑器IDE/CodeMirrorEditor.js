function prettierHandle(text, parser) {
  return prettier.format(text, {
    parser, // parser see: https://prettier.io/docs/en/options.html#parser
    semi: false,
    singleQuote: true,
    trailingComma: 'none',
    printWidth: 120,
    plugins: Object.values(prettierPlugins)
  })
}

const modeOptionsMap = {
  js: {
    mode: 'text/javascript',
    parser: 'babel',
    lint: {
      // jshint 配置参考: https://github.com/jshint/jshint/blob/main/examples/.jshintrc
      esversion: 8 // 指定代码版本 es8
    }
  },
  css: {
    mode: 'text/css',
    parser: 'css',
    lint: {
      // csslint 配置参考: https://github.com/CSSLint/csslint/wiki/Rules
      'box-model': false,
      'display-property-grouping': false
    }
  },
  html: {
    mode: 'text/html',
    parser: 'html',
    lint: {
      // htmlhint 配置参考: https://htmlhint.com/docs/user-guide/list-rules
    }
  }
}

export class CodeMirrorEditor {
  constructor(container, mode = 'js') {
    const config = modeOptionsMap[mode]
    const editor = CodeMirror.fromTextArea(container, {
      width: '500px',
      height: '400px',
      mode: config.mode, // 编辑器模式
      lineNumbers: true, // 显示行号
      theme: 'darcula', // 设置主题
      matchBrackets: true, // 括号匹配
      fullScreen: false, // 全屏模式
      autofocus: true, // 自动聚焦
      scrollbarStyle: 'overlay', // 滚动条
      // 代码校验
      lint: config.lint,
      smartIndent: true, // 自动缩进
      autoCloseBrackets: true, // 自动补全括号
      lineWrapping: true, // 自动换行
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      indentWithSpaces: true,
      // 快捷键
      extraKeys: {
        // 格式化代码
        'Alt-F': async (cm) => {
          const code = await prettierHandle(cm.getValue(), config.parser)
          cm.setValue(code)
        }
      }
    })
    // 所有的字母和 '.' 在键按下之后都将显示智能代码提示
    editor.on('keyup', (cm, event) => {
      const keyCode = event.keyCode
      if (!cm.state.completionActive && ((keyCode >= 65 && keyCode <= 90) || keyCode == 190)) {
        CodeMirror.commands.autocomplete(cm, null, {
          completeSingle: false
          // hint: handleShowHint // 自定义代码提示参考： https://blog.gavinzh.com/2020/12/13/codemirror-getting-started/
        })
      }
    })

    this.editor = editor
  }
  getValue() {
    return this.editor.getValue()
  }
  setValue(value) {
    this.editor.setValue(value)
  }
}
