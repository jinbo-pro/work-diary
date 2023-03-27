import ContextmenuDirective from '../Contextmenu/contextmenu.js'
Vue.directive('contextmenu', ContextmenuDirective)

import App from './App.vue'
new Vue({ render: (h) => h(App) }).$mount('#app')
