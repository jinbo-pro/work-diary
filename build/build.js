const fs = require('fs')
const os = require('os')
const { build } = require('vite')
const esbuild = require('esbuild')
const { resolve } = require('./utils')
const createConfig = require('./createConfig')

;(async () => {
  await Promise.all([
    // 打包页面
    build(createConfig('production')),
    // 打包服务器
    esbuild.build({
      entryPoints: [resolve('app/index.js')],
      platform: 'node',
      target: ['node16'],
      outfile: resolve('dist/app/index.js'),
      bundle: true,
      minify: true
    })
  ])
  // 添加打包信息
  const indexPath = resolve('dist/public/index.html')
  const home = fs.readFileSync(indexPath).toString()
  const code = `<script>console.log('build: ${os.hostname()} ${new Date().toLocaleString()}');</script>`
  fs.writeFileSync(indexPath, `${home}\n${code}`)
  console.log('build success')
})()
