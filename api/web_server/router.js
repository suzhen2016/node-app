var router = require('koa-router')()
var user = require('./user')
var topic = require('./topic')

/**
 * 测试api
*/
// 名片模块 router.use('/user', user.allowedMethods())

router.use('/user', user.routes())//添加路由请求的节点

// 腾讯api
router.post('/businesscard', require('./recognition/request.js'))

// 答题
router.use('/topic', require('./topic').routes())

// 题目
router.use('/problem', require('./problem').routes())

/**
 * 聚能教育api
 */
router.use('/JN', require('./JN').routes())


/**
 * 文件上传
 */
router.use('/file', require('./upload').routes());

/**
 * 文档爬虫
 */
router.use('/bdwk', require('./bdwk').routes());


module.exports = router