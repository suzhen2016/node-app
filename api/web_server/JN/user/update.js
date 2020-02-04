const request = require('request')
let _code = require('../../../untils/model/code')
const response = require('../../../untils/model/respones')
const db_help = require('../../../data_base/mongodb/db_help')

class update {
    constructor(){
    }
    //接口实际处理逻辑
    static async main(ctx, next){

            try {
                /**
                 * @param {*} name               用户名
                 * @param {*} photoUrl           头像信息
                 * @param {*} sex                性别
                 * @param {*} subject            科目
                 * @param {*} grade              教学等级
                 * @param {*} education          学历
                 * @param {*} startTimeEducation 职业生涯开始时间
                 * @param {*} teachingIdea       教学理念
                 * @param {*} teachingAims       教学目标
                 */
                let param = ctx.request.body, _id = '',ps = ['name', 'photoUrl', 'sex', 'grade', 'subject', 'education', 'startTimeEducation', 'teachingIdea', 'teachingAims' ];
                let p = {}, data = {};
                if (!param.userid) {
    
                    response.success(ctx, {}, {code: _code.param_err_code, msg: _code.param_msg})
    
                } else {
                   
                    try{
                        _id = await db_help.object_id(param.userid);

                    }catch(e){}

                    // 更新参数字段信息
                    for (const key of ps) {

                        if (param[key]) p[key] = param[key];

                    }

                    if (Object.values(p).length) {
                        const d = { $set: p};

                        const w = {_id: _id};

                        data = await db_help.update("user", w, d);

                        if (data) {

                            response.success(ctx, p, {code: 0, msg: '保存成功'})
                        } else {
                            response.success(ctx, {}, {code: 20002, msg: '更新失败'})
                        }
                    }  
                    
                   
                }
    
            } catch (error) {

                // 处理报错
                ctx.body = {code:20001, message: 'fail'}

                console.log(error)
            }
        
    }

}

module.exports = update.main;