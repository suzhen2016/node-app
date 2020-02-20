const request = require('request')
let _code = require('../../untils/model/code')
const response = require('../../untils/model/respones')
const fs = require("fs");
const path = require("path");

class upload {
    constructor(){}
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
            // console.log(file,param)
            if (!param.type) {
                response.success(ctx, {}, {code: _code.param_err_code, msg: _code.param_msg})
            } else {
                if (param.type!='image') {
                    response.success(ctx, {}, {code: _code.param_err_code, msg: 'type类型错误'})
                    return false;
                }

                var tmpath= file['path'];          // path.join(__dirname, './files');
                
                // 新建一个文件以及路径
                var newpath = path.join(__dirname, './chunks/' + param.hash + '-' +param.name + '-'+ param.index);
                
                // 创建一个可以写入的流，写入到文件 newpath这个路径下的文件中
                var stream = fs.createWriteStream(newpath);
                // 创建一个可读流     并将创建的可写入流的    通过管道写入可写流
                var reader = fs.createReadStream(tmpath).pipe(stream, { end: false });
                reader.on('end', () => {
                    console.log(newpath)
                    writer.end('结束');
                });
                response.success(ctx, {hash: param.hash,}, {code: 0, msg: '上传切片完成'})
            }

        } catch (error) {
            // 处理报错
            console.log(error)

            ctx.body = {code: 20001, message:'fail'}

            console.log(error)
        }
    }
    
}

module.exports = upload.main;