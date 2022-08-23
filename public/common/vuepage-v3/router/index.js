import { createLoadVue } from '/utils/module/loadVue.js'

const { defineAsyncComponent } = Vue
const { createRouter, createWebHashHistory } = VueRouter
const load = createLoadVue('/common/vuepage-v3/router')
const asyncCom = (path) => defineAsyncComponent(() => load(path))

export const routes = [
  {
    path: '/',
    meta: { title: '首页' },
    component: asyncCom('../pages/home.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: asyncCom('../pages/404.vue')
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
