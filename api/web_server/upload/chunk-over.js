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
            let param = ctx.request.body;
            if (!param.type) {
                response.success(ctx, {}, {code: _code.param_err_code, msg: _code.param_msg})
            } else {
                if (param.type!='image') {
                    response.success(ctx, {}, {code: _code.param_err_code, msg: 'type类型错误'})
                    return false;
                }
                
                var msg = upload.mergeFileChunk(param);

                // 处理请求参数
                response.success(ctx, param, {code: msg=='上传成功' ? 0 : 1, msg})
                
            }

        } catch (error) {
            // 处理报错
            console.log(error)

            ctx.body = {code: 20001, message:'fail'}

            console.log(error)
        }
    }

    static mergeFileChunk(param) {

        const chunkDir = path.join(__dirname, './chunks/' + param.hash + '-' + param.name);
        const filePath = path.join(__dirname, './files/'+ param.name);
        // const chunkPaths = await fs.readdir(chunkDir);
        // await fse.writeFile(filePath, "");
        var err= '上传成功';
        try {
            for(let i=0; i< param.sum; i++) {
                if (fs.existsSync(`${chunkDir}-${i}`)) {
                    
                    var data = fs.readFileSync(`${chunkDir}-${i}`);
                    fs.appendFileSync(filePath, data);
                    // console.log(`${chunkDir}-${i}`)
                    fs.unlinkSync(`${chunkDir}-${i}`);  // 删除切片文件
                } else {
                    console.log(`${chunkDir}-${i},暂时不存在`);
                    // i--;
                }
            }
        } catch (error) {
            err = '上传失败';
            console.log(error)
            return err;
        }
        return err;
        // fse.rmdirSync(chunkDir); // 合并后删除保存切片的目录
      };
}

module.exports = upload.main;