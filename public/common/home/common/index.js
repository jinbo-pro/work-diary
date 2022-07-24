/**是否为腾讯静态服务器 */
export function isTxCode() {
  return /tcloudbaseapp/.test(location.href)
}
