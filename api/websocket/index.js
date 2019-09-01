const WebSocket  = require('ws');
const http = require('http');
const Koa = require('koa')
let bodyParser = require('koa-body');



let app = new Koa();
app.use(bodyParser())

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

let server = http.createServer(app.server);
const wss = new WebSocket.Server({server})

app.use(bodyParser())
wss.on('connection',function(ws,req) {
    // console.log(ctx.headers,22222, req.url)

    console.log('ip地址',req.connection.remoteAddress) // 获取ip地址
    
    ws.send('恭喜，链接上了！');
    let i = 1;
    setInterval(function() {
        // wss.clients.forEach(function each(client) {
        //     console.log(client.readyState,WebSocket.OPEN,)
        // });
        i++
        ws.send('[232]');
        console.log('i')
    },10000)
    
    ws.on('message',function(ms) {
        console.log(ms)
        ws.send('收到你的回话！')
    })

    ws.on('close', function close() {
        console.log('disconnected');
    });

})

server.listen(30046,function name(params) {
    console.log('websocket 服务器启动成功！');
});