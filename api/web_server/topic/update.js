const request = require('request')
const response = require('../../untils/model/respones')
const db_help = require('../../data_base/mongodb/db_help')

class update {
    constructor(){
    }
    //接口实际处理逻辑
    static async main(ctx, next){
            try {
                let param = ctx.request.body, _id = '';
    
                if (!param.answer) {
    
                    response.success(ctx,{code:404,message:'缺少参数'})
    
                }else {
                   
                    try{
                        _id = await db_help.object_id(param._id);
                    }catch(e){
                        
                    }
                    const d = {
                        $set:{
                            topicId: param.topicId,
                            answer: param.answer,
                        }
                    };
                    const w = {_id: _id};
                    console.log(w)
                    let data = await db_help.update("topic", w, d);
    
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
module.exports = update.main;