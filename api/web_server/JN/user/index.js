const router = require('koa-router')()

// 用户注册
router.post('/register', require('./insert.js'))

// 用户登录
router.post('/login', require('./login.js'))

// 用户设置信息
router.post('/update', require('./update.js'))

// 获取用户信息
router.post('/get_user_info', require('./userinfo.js'))

module.exports = router