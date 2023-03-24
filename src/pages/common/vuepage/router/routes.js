import { loadScript } from '@/utils/module/loadScript'
import AboutLayout from '../components/AboutLayout.vue'

export const routes = [
  {
    path: '/',
    meta: { title: '首页', icon: 'el-icon-house' },
    component: () => import('../pages/home.vue')
  },
  {
    path: '/commonUtils',
    meta: { title: '常用工具', icon: 'el-icon-coin' },
    component: AboutLayout,
    children: [
      {
        path: '/richText',
        meta: { title: '富文本', tag: 'richText,tinymce,word' },
        component: () => import('../pages/commonUtils/richText.vue')
      },
      {
        path: '/elementFormCreate',
        meta: { title: 'element表单生成', tag: 'formData,低代码' },
        component: () => import('../pages/commonUtils/lowcode/elementFormCreate.vue')
      },
      {
        path: '/HumpAndLine',
        meta: { title: '驼峰和连字符转换', tag: '工具' },
        component: () => import('../pages/commonUtils/HumpAndLine.vue')
      },
      {
        path: '/webcrypto',
        meta: { title: '加密工具', tag: 'md5,sha1,aes' },
        component: async () => {
          await loadScript('https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-y/crypto-js/4.1.1/crypto-js.min.js')
          return import('../pages/commonUtils/webcrypto.vue')
        }
      },
      {
        path: '/objKeySort',
        meta: { title: '对象键排序', tag: 'object,sort' },
        component: () => import('../pages/commonUtils/objKeySort.vue')
      },
      {
        path: '/ObjectTransform',
        meta: { title: 'FormData对象格式转换' },
        component: () => import('../pages/commonUtils/ObjectTransform/index.vue')
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
        meta: { title: 'URI编码解码', tag: 'decodeURI,encodeURI' },
        component: () => import('../pages/codeTransform/decodeAndEncode.vue')
      },
      {
        path: '/UnicodeToText',
        meta: { title: 'unicode与utf-8互转', tag: '编码转换' },
        component: () => import('../pages/codeTransform/UnicodeToText.vue')
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
        meta: { title: '虚拟列表渲染', tag: '大数据渲染' },
        component: () => import('../pages/libdemo/VirtualListRender/index.vue')
      },
      {
        path: '/echartsCommon',
        meta: { title: 'echarts常用案例', tag: '图表,demo' },
        component: () => import('../pages/libdemo/echartsCommon/index.vue')
      }
    ]
  },
  {
    path: '/testDemo',
    meta: { title: '测试demo', icon: 'el-icon-monitor' },
    component: AboutLayout,
    children: [
      {
        path: '/simManage',
        meta: { title: 'simManage', tag: 'sim' },
        component: () => import('../pages/testDemo/simManage.vue')
      }
    ]
  },
  {
    path: '*',
    component: () => import('../pages/sys/404.vue')
  }
]
