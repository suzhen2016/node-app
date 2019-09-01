var crypto = require('crypto');
class Sign{
    constructor(){
        this.secretId  = 'AKIDgzEduLdgodoAh8kfs06LRPICB6uYiw01';
        this.secretKey = 'Qo493nYDhMJE1d4QxMm39KTSI3oeXHsR';
        this.appid     = '1255863403';
        this.pexpired  = 86400;
        this.userid   =  '0';
    }
    main(){
        try {
            
            var now = parseInt(Date.now() / 1000),sign = '',

            rdm = parseInt(Math.random() * Math.pow(2, 32)),
            
            plainText = 'a=' + this.appid + '&k=' + this.secretId + '&e=' + (now + this.pexpired) + '&t=' + now + '&r=' + rdm + this.userid + '&f=',
            
            data = new Buffer(plainText,'utf8'),
            
            res = crypto.createHmac('sha1',this.secretKey).update(data).digest(),
            
            bin = Buffer.concat([res,data]);

            sign = bin.toString('base64');

            return sign;
        } catch (error) {
            
            console.log(error)

            return sign;
        }
    }
}

module.exports = Sign;