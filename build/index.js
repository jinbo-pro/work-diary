const path = require('path')
const esbuild = require('esbuild')
const { copyDir } = require('../app/utils/file')

function resolve(dir) {
  return path.resolve(__dirname, '../' + dir)
}

async function main() {
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
  console.log('[ 打包完成 ]')
}

main()
