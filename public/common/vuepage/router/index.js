import { vuepage } from '/config.js'
import { createLoadVue } from '/utils/module/loadVue.js'

const load = createLoadVue(vuepage + '/router')

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    meta: { title: 'ObjectTransform' },
    component: () => load('../pages/ObjectTransform/index.vue')
  },
  {
    path: '/home',
    meta: { title: '首页' },
    component: () => load('../pages/home.vue')
  },
  {
    path: '/webcrypto',
    meta: { title: '加密工具' },
    component: () => load('../pages/webcrypto/index.vue')
  },
  {
    path: '/decodeAndEncode',
    meta: { title: 'ObjectTransform' },
    component: () => load('../pages/decodeAndEncode.vue')
  },
  {
    path: '/UnicodeToText',
    meta: { title: 'UnicodeToText' },
    component: () => load('../pages/UnicodeToText.vue')
  },
  {
    path: '/HumpAndLine',
    meta: { title: '驼峰和连字符转换' },
    component: () => load('../pages/HumpAndLine.vue')
  },
  {
    path: '*',
    component: () => load('../pages/404.vue')
  }
]

export const router = new VueRouter({
  routes
})
