const { getIPAddress } = require('../app/utils/tools')
const { createServer } = require('vite')
const createConfig = require('./createConfig')

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
  console.log('dev success')
  console.log(`- Local:     http://localhost:${port}\n- Network:   http://${getIPAddress()}:${port}`)
})()
