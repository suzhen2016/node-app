let MongoClient = require('mongodb').MongoClient;
let settting = require('../../untils/settings')

// 连接数据库启动服务
class Mongo {
    constructor () {

        this.instance = null; // 连接实体
    }

    /**
     * 连接数据库
     */
    static get_db (){
        return new Promise((resolve, reject) => {

            MongoClient.connect(settting.mongo.url,settting.mongo.option,function(err,client){

                if (err) reject(err)

                return resolve(client);

            })
        })
    }

    static getInstance(){
		return new Promise( async (resolve, reject) => {
            let db ;
            
	        if(!this.instance) {

	        	try{
	        		this.instance = await Mongo.get_db();

                    db = this.instance.db('trade');
                    
                    return resolve(db);
                    
	        	} catch (e) {
	        		return reject(e);
	        	}
	        }

            db = this.instance.db('trade');
            
	        return resolve(db);
        })
	}

	static close(){
		this.instance = null;
	}
}

module.exports = Mongo;