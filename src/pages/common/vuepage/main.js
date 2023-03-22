import { routes } from './router/routes.js'

Vue.use(window.VueRouter)
const router = new window.VueRouter({ routes })

import App from './App.vue'
new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
