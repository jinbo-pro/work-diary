import { createLoadVue } from '/utils/module/loadVue.js'
import { home } from '/config.js'

const load = createLoadVue(home)
async function main() {
  const App = await load('./App.vue')
  new Vue({
    el: '#app',
    ...App
  })
}
main()
