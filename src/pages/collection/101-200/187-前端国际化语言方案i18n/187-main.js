// 准备翻译的语言环境信息
const messages = {
  en: {
    title: 'title',
    message: {
      hello: 'hello world'
    }
  },
  zh: {
    title: '标题',
    message: {
      hello: '你好世界'
    }
  }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: 'zh', // 设置地区
  messages // 设置地区信息
})

// 通过 `i18n` 选项创建 Vue 实例
new Vue({
  i18n,
  el: '#app',
  data() {
    return {
      selectLang: 'zh',
      langList: [
        { label: '简体中文', value: 'zh' },
        { label: 'English', value: 'en' }
      ]
    }
  },
  methods: {
    checkLang() {
      this.$i18n.locale = this.selectLang
    }
  }
})
