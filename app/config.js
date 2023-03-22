const path = require('path')
const { getArguments } = require('./utils/tools')
const args = getArguments()
const env = args.includes('-dev') ? 'dev' : 'prod'

module.exports = {
  env,
  publicPath: path.join(__dirname, env == 'dev' ? '../dist/public' : '../public')
}
