var router = require('koa-router')()
var user = require('./user')
var topic = require('./topic')

// 名片模块 router.use('/user', user.allowedMethods())
router.use('/user', user.routes())//添加路由请求的节点
// 腾讯api
router.post('/businesscard', require('./recognition/request.js'))
// 答题
router.use('/topic', require('./topic').routes())

// 题目
router.use('/problem', require('./problem').routes())

module.exports = router