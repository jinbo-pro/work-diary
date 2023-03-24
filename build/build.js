const { build } = require('vite')
const esbuild = require('esbuild')
const { resolve } = require('./utils')
const createConfig = require('./createConfig')

;(async () => {
  // 打包页面
  await build(createConfig('production'))
  // 打包服务器
  await esbuild.build({
    entryPoints: [resolve('app/index.js')],
    platform: 'node',
    target: ['node16'],
    outfile: resolve('dist/app/index.js'),
    bundle: true,
    minify: true
  })
  console.log('build success')
})()
