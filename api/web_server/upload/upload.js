const request = require('request')
let _code = require('../../untils/model/code')
const response = require('../../untils/model/respones')
const multiparty = require("koa2-multiparty");
const fs = require("fs");
const path = require("path");

class upload {
    constructor(){
    }
    //接口实际处理逻辑
    static async main(ctx, next){
        try {
            /**
             * 
             * @param {*} file 文件
             * @param {*} type 类型
             */
            let param = ctx.req.body;
            let file = ctx.req.files.file;

            // 执行读入流
            upload.createWriteStream();

            if (!param.type) {
                response.success(ctx, {}, {code: _code.param_err_code, msg: _code.param_msg})
            } else {
                if (param.type!='image') {
                    response.success(ctx, {}, {code: _code.param_err_code, msg: 'type类型错误'})
                    return false;
                }

                var tmpath= file['path'];       // path.join(__dirname, './files');
                var tmparr =file['name'].split('.');
                var ext ='.'+tmparr[tmparr.length-1];
                
                // 新建一个文件以及路径
                var newpath = path.join(__dirname, './files/'+ parseInt(Math.random()*100) + Date.parse(new Date()).toString() + ext);
                
                // 创建一个可以写入的流，写入到文件 newpath这个路径下的文件中
                var stream = fs.createWriteStream(newpath);

                // 创建一个可读流     并将创建的可写入流的    通过管道写入可写流
                fs.createReadStream(tmpath).pipe(stream);

                // 处理请求参数
                response.success(ctx, param, {code: 0, msg: '上传成功'})
                
            }

        } catch (error) {
            // 处理报错
            console.log(error)

            ctx.body = {code: 20001, message:'fail'}

            console.log(error)
        }
    }

    // 写入流
    static createWriteStream (){
        var data = '我是苏镇，你好。我是即将写入到内容';

        // 创建一个可以写入的流，写入到文件 output.txt 中
        var writerStream = fs.createWriteStream(path.join(__dirname, './files/'+ 'output.txt'));

        // 使用 utf8 编码写入数据
        writerStream.write(data,'UTF8');

        // 标记文件末尾
        writerStream.end();

        // 处理流事件 --> data, end, and error
        writerStream.on('finish', function() {
            console.log("写入完成。");
        });

        writerStream.on('error', function(err){
            console.log(err.stack);
        });

        console.log("程序执行完毕");
    }
    
}
upload.findErr = '查询错误';

module.exports = upload.main;