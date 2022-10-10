/**协商缓存配置 */
exports.Expires = {
  /**缓存的文件类型 */
  fileMatch: /^(gif|png|jpg|js|css)$/gi,
  /**缓存时间 */
  maxAge: 60 * 60 * 24 * 30
}
/**GZIP压缩配置 */
exports.Compress = {
  /**可压缩的文件类型 */
  match: /css|js|html/gi
}
/**文件类型映射 */
exports.mimeTypes = {
  css: 'text/css',
  gif: 'image/gif',
  html: 'text/html',
  ico: 'image/x-icon',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  js: 'text/javascript',
  json: 'application/json',
  pdf: 'application/pdf',
  png: 'image/png',
  svg: 'image/svg+xml',
  swf: 'application/x-shockwave-flash',
  tiff: 'image/tiff',
  txt: 'text/plain',
  wav: 'audio/x-wav',
  wma: 'audio/x-ms-wma',
  wmv: 'video/x-ms-wmv',
  xml: 'text/xml'
}