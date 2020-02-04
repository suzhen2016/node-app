const request = require('request')
let _code = require('../../../untils/model/code')
const response = require('../../../untils/model/respones')
const db_help = require('../../../data_base/mongodb/db_help')

class userInfo {
    constructor(){
    }
    //接口实际处理逻辑
    static async main(ctx, next){

            try {
                /**
                 * @param {*} userid               用户名
                 */
                let param = ctx.request.body, _userid = '',ps = ['name', 'photoUrl', 'sex', 'grade', 'education', 'startTimeEducation', 'teachingIdea', 'teachingAims' ];
                let data = {};

                if (!param.userid) {
    
                    response.success(ctx, {}, {code: _code.param_err_code, msg: _code.param_msg})
    
                } else {
                   
                    try{
                        _userid = await db_help.object_id(param.userid);

                        const w = {_id: _userid};

                        data = await db_help.findOne("user", w);

                    } catch (e) {}

                    // 更新参数字段信息
                    for (const key of ps) {

                        if (!data[key]) data[key] = '';
                        data.userid = data._id;
                        delete data._id;

                    }
                    
                    response.success(ctx, data, {code: 0, msg: '查询成功'})
                }
    
            } catch (error) {

                // 处理报错
                ctx.body = {code: 201, message: 'fail'}

                console.log(error)
            }
        
    }

}

module.exports = userInfo.main;