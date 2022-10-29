import { createLoadVue } from '/utils/module/loadVue.js'

const load = createLoadVue('/common/vuepage/router')
const AboutLayout = () => load('../components/AboutLayout.vue')

export const routes = [
  {
    path: '/',
    meta: { title: '首页', icon: 'el-icon-house' },
    component: () => load('../pages/home.vue')
  },
  {
    path: '/commonUtils',
    meta: { title: '常用工具', icon: 'el-icon-coin' },
    component: AboutLayout,
    children: [
      {
        path: '/elementFormCreate',
        meta: { title: 'element表单生成' },
        component: () => load('../pages/commonUtils/lowcode/elementFormCreate.vue')
      },
      {
        path: '/HumpAndLine',
        meta: { title: '驼峰和连字符转换' },
        component: () => load('../pages/commonUtils/HumpAndLine.vue')
      },
      {
        path: '/webcrypto',
        meta: { title: '加密工具' },
        component: () => load('../pages/commonUtils/webcrypto.vue')
      },
      {
        path: '/objKeySort',
        meta: { title: '对象键排序' },
        component: () => load('../pages/commonUtils/objKeySort.vue')
      },
      {
        path: '/ObjectTransform',
        meta: { title: 'FormData对象格式转换' },
        component: () => load('../pages/commonUtils/ObjectTransform/index.vue')
      }
    ]
  },
  {
    path: '/codeTransform',
    meta: { title: '编码转换', icon: 'el-icon-cpu' },
    component: AboutLayout,
    children: [
      {
        path: '/decodeAndEncode',
        meta: { title: 'ObjectTransform' },
        component: () => load('../pages/codeTransform/decodeAndEncode.vue')
      },
      {
        path: '/UnicodeToText',
        meta: { title: 'UnicodeToText' },
        component: () => load('../pages/codeTransform/UnicodeToText.vue')
      }
    ]
  },
  {
    path: '/libdemo',
    meta: { title: '案例demo', icon: 'el-icon-present' },
    component: AboutLayout,
    children: [
      {
        path: '/VirtualListRender',
        meta: { title: '虚拟列表渲染' },
        component: () => load('../pages/libdemo/VirtualListRender/index.vue')
      },
      {
        path: '/echartsCommon',
        meta: { title: 'echarts常用案例' },
        component: () => load('../pages/libdemo/echartsCommon/index.vue')
      }
    ]
  },
  {
    path: '*',
    component: () => load('../pages/sys/404.vue')
  }
]
