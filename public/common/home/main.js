import { createLoadVue } from '/utils/module/loadVue.js'

const load = createLoadVue('/common/home')
async function main() {
  const App = await load('./App.vue')
  new Vue({
    el: '#app',
    ...App
  })
}
main()
