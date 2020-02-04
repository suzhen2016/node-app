const request = require('request')
const response = require('../../untils/model/respones')
const db_help = require('../../data_base/mongodb/db_help')
class info{
    constructor(){

    }
    //接口实际处理逻辑
    static async main(ctx, next){
        try {
            // let data = {name:'苏镇',work:'web 全栈'};
            let data = await db_help.find("user");

            response.success(ctx,data)
        } catch (error) {
            // 处理报错
            ctx.body = {code: 201, message: 'fail'}
            console.log(error)
        }
    }
    
}
module.exports = info.main;