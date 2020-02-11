var koa = require('koa')
const router = require('koa-router')()
var body = require('koa-body')({
    multipart: true,  // 允许上传多个文件
})
const multiparty = require("koa2-multiparty");

// 上传文件
router.post('/upload', multiparty(), require('./upload.js'))

// 上传切片上传文件
router.post('/upload-chunk', multiparty(), require('./upload-chunk.js'))

// 上传切片上传文件
router.post('/chunk-over', require('./chunk-over.js'))
module.exports = router