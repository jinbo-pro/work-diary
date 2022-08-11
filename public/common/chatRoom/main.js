import { createLoadVue } from '/utils/module/loadVue.js'

const load = createLoadVue('/common/chatRoom')

window.package = {
  vue: Vue,
  vant: vant
}

async function main() {
  const App = await load('./App.vue')
  new Vue({
    el: '#app',
    ...App
  })
}
main()
