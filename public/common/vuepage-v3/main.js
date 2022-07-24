import { createLoadVue } from '/utils/module/loadVue.js'
import { router } from './router/index.js'
import { vuepage_v3 } from '/config.js'

const { createApp } = Vue

window.package = {
  vue: Vue,
  'element-plus': ElementPlus
}

const load = createLoadVue(vuepage_v3, true)
async function main() {
  const App = await load('./App.vue')
  const app = createApp(App)
  app.use(router).use(ElementPlus).mount('#app')
}
main()
