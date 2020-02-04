const request = require('request')
let _code = require('../../../untils/model/code')
const response = require('../../../untils/model/respones')
const db_help = require('../../../data_base/mongodb/db_help')

class Login{

    constructor(){

    }
    //接口实际处理逻辑
    static async main(ctx, next){
        try {
            /**
             * 
             * @param {*} username 用户名
             * @param {*} password 密码
             */

            let param = ctx.request.body;

            if (!param.username || !param.password) {

                response.success(ctx, {}, {code: _code.param_err_code, msg: _code.param_msg})

            }else {

                let data = await db_help.findOne("user", param) || {};

                if (data._id) {
                    
                    data.userid = data._id;

                    delete data._id;
                    
                    response.success(ctx, data, {code: 0, msg: '登录成功'})

                } else  response.success(ctx, {} , {code: 20002, msg: '用户名或密码错误'})
                
            }

        } catch (error) {
            // 处理报错
            ctx.body = {code: 20001, message: 'fail'}
            
            console.log(error)
        }
    }
    
}
module.exports = Login.main;