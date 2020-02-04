const router = require('koa-router')()

// 保存答题
router.post('/insert_topic', require('./insert.js'))

// 更新答题
router.post('/update_topic', require('./update.js'))

module.exports = router