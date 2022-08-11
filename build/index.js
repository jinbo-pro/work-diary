const path = require('path')
const esbuild = require('esbuild')
const { copyDir } = require('../app/utils/file')

function resolve(dir) {
  return path.resolve(__dirname, '../' + dir)
}

async function main() {
  await esbuild.build({
    entryPoints: [resolve('index.js')],
    platform: 'node',
    target: ['node16'],
    outfile: resolve('dist/index.js'),
    bundle: true,
    minify: true
  })
  await copyDir(resolve('public'), resolve('dist/public'))
  console.log('[ 打包完成 ]')
}

main()
