const request = require('request')
let _code = require('../../../untils/model/code')
const response = require('../../../untils/model/respones')
const db_help = require('../../../data_base/mongodb/db_help')

class insert {
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
                // 检验查询用户是否已经注册
                let w = {
                    username: param.username,
                }
    
                let data = await db_help.findOne("user", w);

                if (data && data._id) {  // 已经注册了

                    response.success(ctx, '', {code: 20020, msg: '用户已经注册了'})
                }
                if (!data) {            // 未注册

                    let data = await db_help.insert("user", param);

                    response.success(ctx, data, {code: 0, msg: '注册成功'})
                }
                
            }

        } catch (error) {
            // 处理报错
            console.log(error)

            ctx.body = {code: 20001, message:'fail'}

            console.log(error)
        }
    }

    static checkout_param (){

    }
    
}
insert.findErr = '查询错误';

module.exports = insert.main;