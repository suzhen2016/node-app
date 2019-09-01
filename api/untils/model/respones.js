let _code = require('./code')

class respones{
    constructor(){}

    static success(ctx,data,msg){
        let body = {
            status:'success',
            model:data,
            code:_code.success,
            msg:msg || _code.success_msg,
            date:new Date().getTime()
        }
        ctx.body = body;
        // console.log('ctx.response',ctx)
    }

    static params_err(ctx,data,msg){
        let body = {
            status:'err',
            model:data,
            code:_code.param_err,
            msg:msg || _code.param_msg,
            date:new Date().getTime()
        }
        ctx.body = body;
    }
    
}

module.exports = respones;