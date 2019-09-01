var router = require('koa-router')()

router.get('/msg', async (ctx, next) => {
    console.log('33')
    ctx.body = {message:'添加成功'}
})
module.exports = router
