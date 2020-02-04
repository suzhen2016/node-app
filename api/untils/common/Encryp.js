const crypto = require('crypto');
// odejs-aes-128-cbc加解密算法
class Encryp {
   
    constructor() {
    }

    /**
     * odejs-aes-128-cbc加解密算法=======解密
     * @param {*} key 
     * @param {*} iv 
     * @param {*} crypted  需要解密的密文
     */
    static decrypt(key, iv, crypted) {
        crypted = new Buffer(crypted, 'base64').toString('binary');
        var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
        var decoded = decipher.update(crypted, 'binary', 'utf8');
        decoded += decipher.final('utf8');
        return decoded;
    }

    /**
     * odejs-aes-128-cbc加解密算法=======加密
     * @param {*} key 
     * @param {*} iv 
     * @param {*} data  需要加密字符串
     */
    static crypted(key, iv, data) {
        let cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
        let crypted = cipher.update(data, 'utf8', 'binary');
        crypted += cipher.final('binary');
        crypted = new Buffer(crypted, 'binary').toString('base64');
        return crypted;
    }
}

module.exports = Encryp;