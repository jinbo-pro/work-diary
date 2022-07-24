[toc]

## 配置说明

> "off" or 0 - 关闭规则
>
> "warn" or 1 - 将规则视为一个警告（不会影响退出码）
>
> "error" or 2 - 将规则视为一个错误 (退出码为 1)
>
> 本规则借鉴 vue-element-admin 配置
>
> https://gitee.com/mirrors/vue-element-admin/blob/master/.eslintrc.js
>
> 更多规则参考:
>
> https://eslint.bootcss.com/docs/rules/
>
> http://www.verydoc.net/eslint/00003312.html
>
> https://github.com/vuejs/eslint-plugin-vue/tree/master/docs/rules

## 我的配置

```js
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
        order: [
          'name',
          'props',
          'components',
          'data',
          'computed',
          'watch',
          'created',
          'mounted',
          'methods'
        ]
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
    'padded-blocks': [2, 'never'], // 不必要的空行
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
```

## 其他配置

```js
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  globals: {
    process: true,
    Plyr: true,
    AMap: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  plugins: [
    'html' // 插件，此插件用于识别文件中的js代码，没有MIME类型标识没有script标签也可以识别到，因此拿来识别.vue文件中的js代码
  ],
  rules: {
    /**
     * 代码中可能的错误或逻辑错误
     */
    'no-cond-assign': ['error', 'always'], // 禁止条件表达式中出现赋值操作符
    'no-console': ['error', { allow: ['warn', 'error'] }], // 禁用 console
    'no-constant-condition': ['error', { checkLoops: true }], // 禁止在条件中使用常量表达式
    'no-control-regex': ['error'], // 禁止在正则表达式中使用控制字符
    'no-debugger': ['error'], // 禁用 debugger
    'no-dupe-args': ['error'], // 禁止 function 定义中出现重名参数
    'no-dupe-keys': ['error'], // 禁止对象字面量中出现重复的 key
    'no-duplicate-case': ['error'], // 禁止出现重复的 case 标签
    'no-empty': ['error', { allowEmptyCatch: true }], // 禁止出现空语句块
    'no-empty-character-class': ['error'], // 禁止在正则表达式中使用空字符集
    'no-ex-assign': ['error'], // 禁止对 catch 子句的参数重新赋值
    'no-extra-boolean-cast': ['error'], // 禁止不必要的布尔转换
    'no-extra-semi': ['error'], // 禁止不必要的分号
    'no-func-assign': ['warn'], // 禁止对 function 声明重新赋值
    'no-inner-declarations': ['error'], // 禁止在嵌套的块中出现变量声明或 function 声明
    'no-invalid-regexp': ['error', { allowConstructorFlags: [] }], // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
    'no-irregular-whitespace': ['error'], // 禁止在字符串和注释之外不规则的空白
    'no-obj-calls': ['error'], // 禁止把全局对象作为函数调用
    'no-regex-spaces': ['error'], // 禁止正则表达式字面量中出现多个空格
    'no-sparse-arrays': ['error'], // 禁用稀疏数组
    'no-unexpected-multiline': ['error'], // 禁止出现令人困惑的多行表达式
    'no-unsafe-finally': ['error'], // 禁止在 finally 语句块中出现控制流语句
    'no-unsafe-negation': ['error'], // 禁止对关系运算符的左操作数使用否定操作符
    'use-isnan': ['error'], // 要求使用 isNaN() 检查 NaN

    /**
     * 最佳实践
     */
    'default-case': ['error'], // 要求 switch 语句中有 default 分支
    'dot-notation': ['error'], // 强制尽可能地使用点号
    eqeqeq: ['warn'], // 要求使用 === 和 !==
    'no-caller': ['error'], // 禁用 arguments.caller 或 arguments.callee
    'no-case-declarations': ['error'], // 不允许在 case 子句中使用词法声明
    'no-empty-function': ['error'], // 禁止出现空函数
    'no-empty-pattern': ['error'], // 禁止使用空解构模式
    'no-eval': ['error'], // 禁用 eval()
    'no-global-assign': ['error'], // 禁止对原生对象或只读的全局对象进行赋值
    // "no-magic-numbers": ["error", { "ignoreArrayIndexes": true }], // 禁用魔术数字
    'no-redeclare': ['error', { builtinGlobals: true }], // 禁止重新声明变量
    'no-self-assign': ['error', { props: true }], // 禁止自我赋值
    'no-unused-labels': ['error'], // 禁用出现未使用过的标
    'no-useless-escape': ['error'], // 禁用不必要的转义字符
    radix: ['error'], // 强制在parseInt()使用基数参数

    /**
     * 变量声明
     */
    'no-delete-var': ['error'], // 禁止删除变量
    'no-undef': ['error'], // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-unused-vars': ['error'], // 禁止出现未使用过的变量
    'no-use-before-define': ['error'], // 禁止在变量定义之前使用它们

    /**
     * 风格指南
     */
    'array-bracket-newline': ['error', { multiline: true }], // 在数组开括号后和闭括号前强制换行
    'array-bracket-spacing': ['error', 'never'], // 强制数组方括号中使用一致的空2
    'block-spacing': ['error', 'never'], // 禁止或强制在代码块中开括号前和闭括号后有空格
    'brace-style': ['error', '1tbs'], // 强制在代码块中使用一致的大括号风格
    'comma-dangle': ['error', 'never'], // 要求或禁止末尾逗号
    'comma-spacing': ['error', { before: false, after: true }], // 强制在逗号前后使用一致的空格
    'comma-style': ['error', 'last'], // 强制使用一致的逗号风格
    'computed-property-spacing': ['error', 'never'], // 强制在计算的属性的方括号中使用一致的空格
    'consistent-this': ['error', 'that'], // 当获取当前执行环境的上下文时，强制使用一致的命名
    'eol-last': ['error', 'always'], // 要求或禁止文件末尾存在空行
    'func-call-spacing': ['error', 'never'], // 要求或禁止在函数标识符和其调用之间有空格
    'func-names': ['error', 'always'], // 要求或禁止使用命名的 function 表达式
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }], // 强制一致地使用 function 声明或表达式
    'function-paren-newline': ['error', 'multiline'], // 强制在函数括号内使用一致的换行
    'implicit-arrow-linebreak': ['error', 'beside'], // 强制隐式返回的箭头函数体的位置
    indent: ['error', 2, { SwitchCase: 1 }], // 两个空格缩进
    'jsx-quotes': ['error', 'prefer-double'], // 强制在 JSX 属性中一致地使用双引号或单引号
    'key-spacing': ['error', { beforeColon: false, afterColon: true }], // 强制在对象字面量的属性中键和值之间使用一致的间距
    'line-comment-position': [
      'error',
      { position: 'above', ignorePattern: 'ETC' }
    ], // 强制行注释的位置
    'linebreak-style': ['error', 'unix'], // 换行符风格
    'max-depth': ['error', 4], // 强制可嵌套的块的最大深度
    'max-nested-callbacks': ['error', 3], // 强制回调函数最大嵌套深度
    'max-params': ['error', 6], // 强制函数定义中最多允许的参数数量
    'multiline-comment-style': ['error', 'starred-block'], // 强制对多行注释使用特定风格
    'multiline-ternary': ['error', 'always-multiline'], // 要求或禁止在三元操作数中间换行
    'new-cap': ['error', { capIsNew: false }], // 要求构造函数首字母大写
    'no-array-constructor': ['error'], // 禁用 Array 构造函数
    'no-mixed-operators': ['error'], // 禁止混合使用不同的操作符
    'no-mixed-spaces-and-tabs': ['error'], // 禁止空格和 tab 的混合缩进
    'no-multiple-empty-lines': ['error'], // 禁止出现多行空行
    'no-new-object': ['error'], // 禁用 Object 的构造函数
    'no-tabs': ['error'], // 禁用 tab
    'no-trailing-spaces': [
      'error',
      { skipBlankLines: false, ignoreComments: false }
    ], // 禁用行尾空白
    'no-whitespace-before-property': ['error'], // 禁止属性前有空白
    'nonblock-statement-body-position': ['error', 'beside'], // 强制单个语句的位置
    'object-curly-spacing': ['error', 'never'], // 强制在大括号中使用一致的空格
    'operator-linebreak': ['error', 'after'], // 强制操作符使用一致的换行符
    quotes: ['error', 'single'], // 使用单引号
    semi: ['error', 'always'], // 要求或禁止使用分号代替 ASI
    'semi-spacing': ['error', { before: false, after: true }], // 强制分号之前和之后使用一致的空格
    'space-before-function-paren': ['error', 'never'], // 强制在 function的左括号之前使用一致的空格
    'space-in-parens': ['error', 'never'], // 强制在圆括号内使用一致的空格
    'space-infix-ops': ['error'], // 要求操作符周围有空格
    'space-unary-ops': ['error', { words: true, nonwords: false }], // 强制在一元操作符前后使用一致的空格
    'spaced-comment': ['error', 'always'], // 强制在注释中 // 或 /* 使用一致的空格

    /**
     * ECMAScript 6
     */
    'arrow-spacing': ['error', { before: true, after: true }], // 强制箭头函数的箭头前后使用一致的空格
    'no-var': ['error'], // 要求使用 let 或 const 而不是 var
    'object-shorthand': ['error', 'always'], // 要求或禁止对象字面量中方法和属性使用简写语法
    'prefer-arrow-callback': ['error', { allowNamedFunctions: false }] // 要求回调函数使用箭头函数
  }
}
```
