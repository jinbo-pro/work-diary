import * as ruleFn from './ruleFn.js'

function validator(rule, value, callback, fnName, title) {
  if (value === '') return callback(new Error(`${title}不能为空`))
  const fn = ruleFn[fnName]
  if (!fn) {
    console.log(`未配置 ${fnName} 校验规则`)
    return callback()
  }
  if (!fn(value)) return callback(new Error(`请填写正确的${title}`))
  callback()
}

const configList = [
  { title: '手机号', fnName: 'isTel' },
  { title: '邮箱', fnName: 'isEmail' },
  { title: '整数', fnName: 'isInteger' },
  { title: '金额', fnName: 'isPrice' },
  { title: '实数', fnName: 'isReal' },
  { title: '汉字', fnName: 'isChinese' },
  { title: '身份证号', fnName: 'isIDCard' },
  { title: '密码', fnName: 'passwordStrong' }
]
const keyList = []
const formData = {}
const formDataRules = {}
for (let i = 0; i < configList.length; i++) {
  const key = `key_${i}`
  const title = configList[i].title
  keyList.push({ title, key })
  formData[key] = ''
  formDataRules[key] = [
    {
      required: true,
      validator: (rule, value, callback) => {
        return validator(rule, value, callback, configList[i].fnName, title)
      },
      trigger: 'blur'
    }
  ]
}

new Vue({
  el: '#app',
  data() {
    return {
      keyList,
      formData,
      formDataRules
    }
  },
  methods: {
    /**新增/编辑提交 */
    onSubmit() {
      this.$refs.formData.validate((valid) => {
        if (!valid) return this.$message.error('校验不通过')
        this.$message.success('提交成功')
      })
    }
  }
})
