import { loadScript } from '@/utils/module/loadScript'

/**echarts 异步加载 */
export default async () => {
  await loadScript('https://lib.baomitu.com/echarts/5.3.3/echarts.min.js')
  return import('./index.vue')
}
