import { createLoadVue } from '/utils/module/loadVue.js'
import { routes } from './router/routes.js'

Vue.use(window.VueRouter)
const router = new window.VueRouter({ routes })

const load = createLoadVue('/common/vuepage')
async function main() {
  const App = await load('./App.vue')
  new Vue({
    el: '#app',
    router,
    ...App
  })
}
main()
