const request = require('request')
const response = require('../../untils/model/respones')
const db_help = require('../../data_base/mongodb/db_help')

class dele {
    constructor(){
    }

    static async main (ctx, next){
        try {
            let param = ctx.request.body;

            if(!param._id) { 

                response.params_err(ctx,{code:401,message:'缺少参数'})
                
            }
            let w = {
                _id: await db_help.object_id(param._id)
            }
            let data = await db_help.remove("problem",w);

            response.success(ctx, data)

        } catch (error) {
            // 处理报错
            ctx.body = {code:201,message:'fail'}
            console.log(error)
        }
    }
    
}
module.exports = dele.main;