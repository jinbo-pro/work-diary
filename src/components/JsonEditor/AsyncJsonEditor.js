import { loadScript } from '@/utils/module/loadScript'

/**JsonEditor 异步加载 */
export default async () => {
  await loadScript('https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-y/jsoneditor/9.7.2/jsoneditor.min.js')
  await loadScript('https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-y/jsoneditor/9.7.2/jsoneditor.min.css', 'link')
  return import('./index.vue')
}
