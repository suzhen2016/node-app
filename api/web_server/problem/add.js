const request = require('request')
const response = require('../../untils/model/respones')
const db_help = require('../../data_base/mongodb/db_help')

class insert {
    constructor(){
    }
    //接口实际处理逻辑
    static async main(ctx, next){
        try {
            let param = ctx.request.body;

            if (!param.title || !param.option) {
                response.params_err(ctx,{code:404,message:'缺少参数'})
            }else {
                let data = await db_help.insert("problem", param);
                response.success(ctx, data)
            }

        } catch (error) {
            // 处理报错
            ctx.body = {code:201,message:'fail'}
            console.log(error)
        }
    }

    static checkout_param (){

    }
    
}
module.exports = insert.main;