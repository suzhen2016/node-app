const router = require('koa-router')()

// 上传切片上传文件
router.post('/getTextByurl', require('./getText.js'));

module.exports = router