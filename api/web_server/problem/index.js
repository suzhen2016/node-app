const router = require('koa-router')()

// 保存题
router.post('/insert_problem', require('./add.js'))
// 查询所有题
router.post('/get_list', require('./find.js').main)
// 查询单个
router.post('/get_one', require('./find.js').findOne)
// 更新单个
router.post('/update_one', require('./update.js'))
// 删除单个
router.post('/dele', require('./dele.js'))
module.exports = router