module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  // 全局变量
  globals: {
    $: 'readonly' // readonly 只读 writable 可写
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  /**
   * "off" or 0 - 关闭规则
   * "warn" or 1 - 将规则视为一个警告（不会影响退出码）
   * "error" or 2 - 将规则视为一个错误 (退出码为1)
   * 本规则借鉴了 vue-element-admin 配置
   * https://gitee.com/mirrors/vue-element-admin/blob/master/.eslintrc.js
   * 更多规则参考:
   * https://eslint.bootcss.com/docs/rules/
   * http://www.verydoc.net/eslint/00003312.html
   * https://github.com/vuejs/eslint-plugin-vue/tree/master/docs/rules
   */
  rules: {
    'vue/html-indent': 0, // html 标签空格控制
    'vue/no-mutating-props': 0, // 这个属性没搞懂，但是我不想要
    'vue/attributes-order': 0, // 组件属性指令顺序
    'vue/html-closing-bracket-newline': 0, // html闭合括号前不能换行
    'vue/attribute-hyphenation': 0, // 组件绑定的属性需要用连字符
    'vue/order-in-components': [
      1,
      {
        // 组件options的键顺序
        order: ['name', 'props', 'components', 'data', 'computed', 'watch', 'created', 'mounted', 'methods']
      }
    ],
    'vue/max-attributes-per-line': 0, // 组价的属性一行展示
    'vue/component-definition-name-casing': 0, // vue组件name大驼峰命名
    'vue/singleline-html-element-content-newline': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/name-property-casing': [0, 'PascalCase'],
    'vue/no-v-html': 0,
    'vue/html-self-closing': [
      0,
      {
        html: {
          void: 'never',
          normal: 'any',
          component: 'any'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'accessor-pairs': 2,
    'arrow-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'block-spacing': [2, 'always'],
    'brace-style': [
      2,
      '1tbs',
      {
        allowSingleLine: true
      }
    ],
    camelcase: [
      0,
      {
        properties: 'always'
      }
    ],
    'comma-dangle': 0, // 尾随逗号
    'comma-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    'comma-style': [2, 'last'],
    'constructor-super': 2,
    curly: 0,
    'dot-location': [2, 'property'],
    eqeqeq: 0, // 等于号用 === 强等
    'generator-star-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'handle-callback-err': [2, '^(err|error)$'],
    indent: 0, // 空格缩进
    'jsx-quotes': [2, 'prefer-single'],
    'key-spacing': [
      2,
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'new-cap': [
      2,
      {
        newIsCap: true,
        capIsNew: false
      }
    ],
    'new-parens': 2,
    'brace-style': 0, // 大括号风格
    'no-array-constructor': 2,
    'no-caller': 2,
    'no-console': 'off',
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-const-assign': 2,
    'no-control-regex': 0,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2, // 不允许对象使用重复的键
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'no-eval': 0, // 不能用 eval
    'no-ex-assign': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': [2, 'functions'],
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [
      2,
      {
        allowLoop: false,
        allowSwitch: false
      }
    ],
    'no-lone-blocks': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-spaces': 0, // 多个空格
    'no-multi-str': 2,
    'no-multiple-empty-lines': 0, // 空行不能太多
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'], // return 不要执行任务
    'no-self-assign': 2, // 不要写自己赋值给自己
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-trailing-spaces': 0, // 不允许在行尾添加尾随空白
    'no-undef': 2, // 禁用未声明的变量，除非它们在 /* globals */ 注释中被提到
    'no-undef-init': 2,
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unused-vars': [
      1,
      {
        // 不能有定义后未使用的变量
        vars: 'all',
        args: 'none'
      }
    ],
    'no-useless-call': 2,
    'no-unneeded-ternary': 0, // 不允许三元运算符
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,
    'one-var': 0, // 变量定义不能写成一行
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before'
        }
      }
    ],
    'no-extra-semi': 0, // 不必要的分号
    'padded-blocks': [1, 'never'], // 不必要的空行
    quotes: 0.0, // 强制单引号或双引号
    semi: 0, // 末尾不能有分号
    'semi-spacing': 0, // 分号前不能有空格
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': 0, // 函数前要有个空格
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false
      }
    ],
    'spaced-comment': 0, // 单行注释后面有个空格
    'template-curly-spacing': [2, 'never'],
    'use-isnan': 2,
    'valid-typeof': 2,
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    yoda: [2, 'never'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 没有 debugger
    'object-curly-spacing': 0, // 不允许大括号内的空格
    'array-bracket-spacing': [2, 'never']
  }
}
