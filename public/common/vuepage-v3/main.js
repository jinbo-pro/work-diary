import { createLoadVue } from '/utils/module/loadVue.js'
import { router } from './router/index.js'

const { createApp } = Vue

window.package = {
  vue: Vue,
  'element-plus': ElementPlus
}

const load = createLoadVue('/common/vuepage-v3', true)
async function main() {
  const App = await load('./App.vue')
  const app = createApp(App)
  app.use(router).use(ElementPlus).mount('#app')
}
main()
