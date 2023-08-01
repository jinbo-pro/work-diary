import { post } from '@/utils/module/RequestFetch.js'

new Vue({
  el: '#app',
  data() {
    return {
      isLogin: false,
      userName: '',
      password: ''
    }
  },
  created() {
    this.checkAuth()
  },
  methods: {
    loginHandle() {
      post('/login', {
        userName: this.userName,
        password: this.password
      }).then((res) => {
        console.log(res)
        this.isLogin = true
      })
    },
    exitLogin() {
      post('/exitLogin').then((res) => {
        this.isLogin = false
        this.userName = ''
        this.password = ''
      })
    },
    checkAuth() {
      post('/checkAuth').then((res) => {
        this.isLogin = res.code == 0
      })
    }
  }
})
