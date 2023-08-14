const Router = require('koa-router')
const router = new Router()

// UpFile
const UpFile = require('./controller/UpFile')
router.post('/fileUpload', (ctx) => UpFile.index(ctx))
router.post('/batchUpload', (ctx) => UpFile.batchUpload(ctx))
router.post('/getChunkList', (ctx) => UpFile.getChunkList(ctx))
router.post('/single', (ctx) => UpFile.single(ctx))
router.post('/merge', (ctx) => UpFile.merge(ctx))

// Api
const Api = require('./controller/Api')
router.get('/api/jsonp', (ctx) => Api.jsonp(ctx))
router.get('/api/listData', (ctx) => Api.listData(ctx))
router.post('/api/sendBeacon', (ctx) => Api.sendBeacon(ctx))
router.post('/api/userListData', (ctx) => Api.userListData(ctx))

// Login
const Login = require('./controller/Login')
router.post('/login', (ctx) => Login.login(ctx))
router.all('/checkAuth', (ctx) => Login.checkAuth(ctx))
router.all('/exitLogin', (ctx) => Login.exitLogin(ctx))

// Sim
const Sim = require('./controller/Sim')
router.all('/sim', (ctx) => Sim.setData(ctx))
router.get('/sim/getData', (ctx) => Sim.getData(ctx))
router.get('/sim/clearData', (ctx) => Sim.clearData(ctx))

// QrcodeLogin
const QrcodeLogin = require('./controller/QrcodeLogin')
router.get('/qrcode/checkLogin', (ctx) => QrcodeLogin.checkLogin(ctx))
router.get('/qrcode/relationAccount', (ctx) => QrcodeLogin.relationAccount(ctx))

// StaticPage
const StaticPage = require('./controller/StaticPage')
router.all('/page/:id', (ctx) => StaticPage.page(ctx))

module.exports = router
