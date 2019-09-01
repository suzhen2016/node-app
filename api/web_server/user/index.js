const router = require('koa-router')()

//用户模块接口
router.post('/get_user_info', require('./info.js'))

module.exports = router