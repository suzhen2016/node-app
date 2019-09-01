const request = require('request')
const Sign = require('./sign')
var FormData = require('form-data');

class Rec{
    constructor(){

    }
    static async main(ctx, next){
        try {
            console.log('ctx',ctx.request.body)
            let res = await Rec.help("","",{img:ctx.request.body.img});
            // let res = {name:'7842'}
            ctx.body = res;
            
        } catch (error) {
            ctx.boay = {}
            console.log(error)
        }
    }
    static help(url,method,data){
        return new Promise((resolve,reject)=>{
            let sign_str = new Sign().main();
            
            if(!sign_str){
                return resolve(JSON.stringify({code:50000}));
            }
            
            let options = {
                url:'https://recognition.image.myqcloud.com/ocr/businesscard',
                method: method || "POST",
                rejectUnauthorized: false,
                headers: {
                        'host': 'recognition.image.myqcloud.com',
						'content-type': 'multipart/form-data; boundary=--------------------------383660354937594681851334',
                        'authorization':sign_str,
                        'Content-Length': 735
                        // Content-Type: application/json
                }
            }
            // options.formData = {url_list:[],'appid':'1255863403',"bucket":"test"};
            let formData = new FormData()
            // options.formData = {image:'','appid':'1255863403'};
            formData.append('appid','1255863403')
            formData.append('image','2423')
            
            
            // var headers = formData.getHeaders()
            // console.log('options',headers)
            options.formData = formData;
            request(options, function(error, response, body) {
                if (error) return reject(error);
                try {
                    return resolve(body);
                } catch (e) {
                    return reject(body);
                }
            });
            
        })
    }
}
module.exports = Rec.main;