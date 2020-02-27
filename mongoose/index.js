// mongodb的链接测试
const mongoose = require('mongoose');

// 链接
mongoose.connect('mongodb://127.0.0.1/JUNENG',{
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useMongoClient: true
})

// 检查链接状态

mongoose.connection.once('open', (res)=>{
    console.log('数据库已经链接成功！！ 😁');
})

mongoose.connection.once('close', (res)=>{
    console.log('数据库已经断开！！ o(╥﹏╥)o');
})

// 断开数据库链接
// mongoose.disconnect();