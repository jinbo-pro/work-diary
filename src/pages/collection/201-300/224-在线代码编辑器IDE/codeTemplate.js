const vueCode = {
  html: `
  <div id="app">
    <p>{{ content }}</p>
  </div>
  `,
  css: ``,
  js: `
  new Vue({
    el: '#app',
    data() {
      return {
        content: '123456'
      }
    },
    created() {},
    methods: {}
  })
  `
}
export const codeTemplateList = [
  {
    name: 'vue2',
    lib: ['https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-y/vue/2.6.14/vue.min.js'],
    code: vueCode
  },
  {
    name: 'vue2-element-ui',
    lib: [
      'https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-y/vue/2.6.14/vue.min.js',
      'https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-y/element-ui/2.15.7/index.min.js',
      'https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-y/element-ui/2.15.7/theme-chalk/index.min.css'
    ],
    code: vueCode
  },
  {
    name: 'vue2-vant2',
    lib: [
      'https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-y/vue/2.6.14/vue.min.js',
      'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-y/vant/2.12.44/index.min.css',
      'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-y/vant/2.12.44/vant.min.js'
    ],
    code: vueCode
  }
]
