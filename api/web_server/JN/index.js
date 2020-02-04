const router = require('koa-router')()

// 用户模块接口
router.use('/user', require('./user').routes())

module.exports = router