let db = require('./db');
let mongodb = require('mongodb');

/**
 * 数据库查询服务
 */
class db_help{

	constructor(){}
    
    static object_id(id){
        return new Promise( async (resolve, reject) => {
            try{
                if(id){
                    id = new mongodb.ObjectID(id);
                }else{
                    id = new mongodb.ObjectID();
                }
                return resolve(id);
            }catch(e){
                return reject(e);
            }
            
        })
    }

    //查数量
	static count(collection, where){
        return new Promise( async (resolve, reject) => {
            try{
                let db_client = await db.getInstance();

                let docs = await db_client.collection(collection,{strict: false}).count(where||{});
                
                return resolve(docs);
            }catch(e){
                return reject(e);
            }
            
        })
    }

    //查多条
	static find(collection, where, options){
        return new Promise( async (resolve, reject) => {
            try{
                let db_client = await db.getInstance();

                let docs = await db_client.collection(collection,{strict: false}).find(where||{}, options).toArray();
                
                return resolve(docs);
            }catch(e){
                return reject(e);
            }
            
        })
    }
    
    //查单条
    static findOne(collection, where, options){
        return new Promise( async (resolve, reject) => {
            try{
                let db_client = await db.getInstance();
                
                let doc = db_client.collection(collection,{strict: false}).findOne(where||{}, options || {});
                
                return resolve(doc);
            }catch(e){
                return reject(e);
            }
            
        })
    }

    //更新
    static update(collection, where, update, options){
        return new Promise( async (resolve, reject) => {
            try{
                let db_client = await db.getInstance();
                // let doc = db_client.collection(collection,{strict: false}).findOne(where || {}, options || {});
                let doc = await db_client.collection(collection,{strict: false}).updateOne(where, update, options);
                return resolve(doc);
            }catch(e){
                return reject(e);
            }
            
        })
    }

    //更新
    static updateMany(collection, where, update, options){
        return new Promise( async (resolve, reject) => {
            try{
                let db_client = await db.getInstance();

                let doc = await db_client.collection(collection,{strict: false}).updateMany(where, update, options);
                
                return resolve(doc);
            }catch(e){
                return reject(e);
            }
            
        })
    }

    //插入
    static insert(collection, obj){
        return new Promise( async (resolve, reject) => {
            try{
                let db_client = await db.getInstance();

                let doc = await db_client.collection(collection,{strict: false}).insertOne(obj);
                
                return resolve(doc.ops[0]);
            }catch(e){
                return reject(e);
            }
            
        })
    }

    static remove(collection, obj){
        return new Promise( async (resolve, reject) => {
            let db_client = await db.getInstance();

            let doc = await db_client.collection(collection,{strict: false}).deleteOne(obj);
            
            return resolve(doc);
        })
    }

    static remove_all(collection, obj){
        return new Promise( async (resolve, reject) => {
            let db_client = await db.getInstance();

            let doc = await db_client.collection(collection,{strict: false}).deleteMany(obj);
            
            return resolve(doc);
        })
    }

}

// setInterval(async ()=>{
//     let a = await db_help.findOne("books");
//     console.log(a);
// },1000);

module.exports = db_help;