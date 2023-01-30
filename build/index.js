const fs = require('fs')
const path = require('path')
const esbuild = require('esbuild')
const { copyDir, clearDir } = require('../app/utils/file')

function resolve(dir) {
  return path.resolve(__dirname, '../' + dir)
}

async function main() {
  // 删除上传的文件
  clearDir(resolve('public/upload'))
  // diary
  await esbuild.build({
    entryPoints: [resolve('app/index.js')],
    platform: 'node',
    target: ['node16'],
    outfile: resolve('dist/app/index.js'),
    bundle: true,
    minify: true
  })
  await copyDir(resolve('public'), resolve('dist/public'))
  // websocket
  await esbuild.build({
    entryPoints: [resolve('app/websocket/socket.js')],
    platform: 'node',
    target: ['node16'],
    outfile: resolve('dist/app/websocket.js'),
    bundle: true,
    minify: true
  })
  // 添加打包时间
  const home = fs.readFileSync(resolve('public/index.html')).toString()
  const code = `${home}\n<script>console.log('${new Date().toLocaleString()}');</script>`
  fs.writeFileSync(resolve('dist/public/index.html'), code)
  console.log('[ 打包完成 ]')
}

main()
