import { createLoadVue } from '/utils/module/loadVue.js'
import { router } from './router/index.js'
import { vuepage } from '/config.js'

const load = createLoadVue(vuepage)
async function main() {
  const App = await load('./App.vue')
  new Vue({
    el: '#app',
    router,
    ...App
  })
}
main()
