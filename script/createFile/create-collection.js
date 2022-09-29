const path = require('path')
const createFileBase = require('./createFileBase')
const outPath = path.resolve(__dirname, '../../public/collection')
createFileBase(outPath, 100)
