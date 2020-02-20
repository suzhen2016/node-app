const Koa = require('koa')
const api = require('./router.js')
const router = require('koa-router')()
let bodyParser = require('koa-body');
const response = require('../untils/model/respones')
const ip = require('../untils/factory/ip')
const path = require('path')
const static = require('koa-static')
const Encryp = require('../untils/common/Encryp.js')
const fs = require('fs');
const md5 = require('md5');

let app = new Koa();

app.use(bodyParser())
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

// 本地静态文件访问 直接访问该目录下的地址即可  http://172.20.13.160:5000/public/index.html
app.use(static(path.join(__dirname, '../../web')));

// 上传文件页面
var html = router.get("/", (ctx)=>{
    // 文件显示读取
    ctx.body = require("fs").readFileSync(path.join(__dirname, '../../web/upload/index.html'), "utf-8");
    // ctx.body = '你好'
});

// 拉取百度文库内容
router.get('/bdwd', (ctx) => {
    ctx.body = require("fs").readFileSync(path.join(__dirname, './index.html'), "utf-8");
})
// md5加密之后数据
fs.readFile(path.join(__dirname, './upload/files/output.txt'), function(err, buf) {
    console.log(md5(buf));
});

// 设置请求头信息
app.use(async (ctx, next) => {
    try {
        ctx.set('Access-Control-Allow-Origin', '*')
        ctx.set(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Content-Length, Accept, User-Agent, x-access-token, version, package-name'
        )
        ctx.set(
            'Access-Control-Allow-Methods',
            'PUT, POST, GET, DELETE, OPTIONS'
        )
        ctx.set('Cache-control', 'max-age=0, private, must-revalidate')

        if (ctx.request.method == 'OPTIONS') ctx.response.status = 200
        
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500; 
        ctx.response.body = { message: '服务报错' }
    }
    await next()
})

//以下是测试代码
let a = router.post('/demo',async (ctx,next) => {

    if(ctx.request.body){ // post请求 nanme参数

        const data = [{'tool_name': '线上问题记录', 'hissevenper': 2, 'hissevencout': 1, 'tool_create_name': '王彦青', 'counthistoryTimes': 680}, {'tool_name': '快速创建商户', 'hissevenper': 9, 'hissevencout': 2, 'tool_create_name': '宋建敏', 'counthistoryTimes': 203}, {'tool_name': 'mysql数据同步', 'hissevenper': 0, 'hissevencout': 0, 'tool_create_name': '', 'counthistoryTimes': 339}, {'tool_name': 'mock平台', 'hissevenper': 0, 'hissevencout': 0, 'tool_create_name': '', 'counthistoryTimes': 24}, {'tool_name': '线上问题记录导出', 'hissevenper': 0, 'hissevencout': 0, 'tool_create_name': '', 'counthistoryTimes': 20}, {'tool_name': '车服工具平台', 'hissevenper': 11, 'hissevencout': 4, 'tool_create_name': '王彦青', 'counthistoryTimes': 320}, {'tool_name': '一键删除数据库', 'hissevenper': 58, 'hissevencout': 1, 'tool_create_name': '王彦青', 'counthistoryTimes': 120}, {'tool_name': '一键删除商户', 'hissevenper': 9, 'hissevencout': 2, 'tool_create_name': '宋建敏', 'counthistoryTimes': 203}, {'tool_name': '一键删除商户', 'hissevenper': 0, 'hissevencout': 0, 'tool_create_name': '', 'counthistoryTimes': 82}, {'tool_name': '获取兑换码', 'hissevenper': 1, 'hissevencout': 1, 'tool_create_name': '闫玉伟', 'counthistoryTimes': 246}, {'tool_name': '获取优惠券', 'hissevenper': 0, 'hissevencout': 0, 'tool_create_name': '', 'counthistoryTimes': 47}, {'tool_name': '创建crm商户', 'hissevenper': 0, 'hissevencout': 0, 'tool_create_name': '', 'counthistoryTimes': 42}, {'tool_name': 'ngrinder性能测试平台', 'hissevenper': 0, 'hissevencout': 0, 'tool_create_name': '', 'counthistoryTimes': 3}, {'tool_name': '效能平台', 'hissevenper': 0, 'hissevencout': 0, 'tool_create_name': '', 'counthistoryTimes': 5}]
        // let data = {data: data}

        response.success(ctx,data,'成功查询')

    }else response.success(ctx,{},'参数不符合')
    
})

router.use(a.routes())

router.use('/api', api.routes()) //A:添加每个方法的请求加前缀，也可在 实例化router时添加参数注册prefix

// 注册使用路由中间件
app.use(router.routes())

app.use(router.allowedMethods())//添加针对OPTIONS的响应处理，一些预检请求会先触发 OPTIONS 然后才是真正的请求

// 测试 Encryp加密解密
let key = '1234567890123456';
let iv = '2624750004598718';
let data = 'GPKYYIEuwOPOftyyxBE1h25nQyu2oJGtzLBXpFq1U7S3gxP4i+ovg8BVD/ZUSUDuDZ2GAgJn2r+//6t6LqdJU2WrB/cZ2XbpSXkEFPUt31I=';
let str = 'shed color since rude buyer enable rabbit rookie can harsh pause cheese'

// let jie = Encryp.decrypt(key,iv,data);
// let jia = Encryp.crypted(key,iv,str);

//记录机器ip、端口
global.server_ip = ip.get_ip();

global.server_port = 5000;

app.listen(global.server_port,global.server_ip, function () {

  console.log(global.server_ip,global.server_port);

});

