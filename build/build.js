const fs = require('fs')
const { build } = require('vite')
const esbuild = require('esbuild')
const { resolve } = require('./utils')
const createConfig = require('./createConfig')
const getFileFlatList = require('../app/utils/getFileFlatList')

;(async () => {
  await build(createConfig('production'))
  // server
  await esbuild.build({
    entryPoints: [resolve('app/index.js')],
    platform: 'node',
    target: ['node16'],
    outfile: resolve('dist/app/index.js'),
    bundle: true,
    minify: true
  })
  // 打包页面描述文件
  const list = getFileFlatList(resolve('/src/pages/collection'), true)
  let metaConfig = {}
  for (let item of list) {
    if (item.isFile && item.fileName == 'm.json') {
      const meta = require(item.filePath)
      metaConfig[meta.name] = meta.tag
    }
  }
  fs.writeFileSync(resolve('dist/public/metaConfig.json'), JSON.stringify(metaConfig))
  console.log('build success')
})()
