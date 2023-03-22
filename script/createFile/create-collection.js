const path = require('path')
const createFileBase = require('./createFileBase')
const outPath = path.resolve(__dirname, '../../src/pages/collection')
createFileBase(outPath, 100)
