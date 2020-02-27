const request = require('request')
let _code = require('../../untils/model/code')
const response = require('../../untils/model/respones')
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio"); //非核心模块
const iconv = require('iconv-lite');

class BDWD {
    constructor(){
    }
    //接口实际处理逻辑
    static async main(ctx, next){
        try {
            /**
             * @param {*} src 网址
             */
            let { src } = ctx.request.body;

            let html = await BDWD.getHtml(src);

            let $ = cheerio.load(html, {
                //     /*将中文转码后正常展示出来*/
                    decodeEntities:false
                });

            const jsTxt = $('body').text() || '未找到';

            // let txt = html.replace(/<[^<>]+>/g,'');

            response.success(ctx, jsTxt, {code: 0, msg: '查找成功'})

        } catch (error) {
            // 处理报错

            ctx.body = {code: 20001, message:'fail'}

        }
    }

    static async getHtml (url){
        return new Promise((resolve, reject)=>{
            request({ url , encoding:null }, (error, response, body)=>{
                if (error){
                    reject(error)
                } else {
                    let  html  = iconv.decode(body, 'GBK'); //解决获取的内容乱码的问题
                    resolve(html)
                }
            });
        })
    }
}

module.exports = BDWD.main;