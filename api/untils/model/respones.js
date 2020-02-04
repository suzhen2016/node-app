let _code = require('./code')

class respones{
    constructor(){}

    static success(ctx,data, ops){
        let body = {
            status: 'success',
            model: data,
            code: ops && ops.code || _code.success,
            message: ops && ops.msg || _code.success_msg,
            date: new Date().getTime()
        }
        ctx.body = body;
    }

    static params_err(ctx,data,ops){
        let body = {
            status: 'err',
            model: data,
            code: ops && ops.code || _code.param_err,
            message: ops && ops.msg || _code.param_msg,
            date:new Date().getTime()
        }
        ctx.body = body;
    }
    
}

module.exports = respones;