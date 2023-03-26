const { createServer } = require('vite')
const createConfig = require('./createConfig')
const { getIPAddress } = require('../app/utils/tools')
const getpageDataListGz = require('./getpageDataListGz')

;(async () => {
  const config = createConfig('development')
  const port = 7586
  const server = await createServer({
    ...config,
    server: {
      host: '0.0.0.0',
      port,
      proxy: {
        '/api': {
          target: 'http://localhost:39006'
        }
      }
    }
  })
  await server.listen()
  // 写入目录数据
  console.time('page data')
  getpageDataListGz()
  console.timeEnd('page data')
  console.log('dev success')
  console.log(`- Local:     http://localhost:${port}\n- Network:   http://${getIPAddress()}:${port}`)
})()
