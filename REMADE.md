# electron_write_helper

> koa2的服务端

## 相关文档

- [gitlab]()

## 项目文档

| doc                                       | more                           |
| ----------------------------------------- | ------------------------------ |
| [utils](./docs/utils/README.md)           | utils 工具函数整理             |
| [ip](./utils/factory/ip)           | 获得当前电脑的ipv4地址             |

### 接收参数

- 三种前端的发送数据的格式
 1、multipart/form-data
 2、application/x-www-urlencoded
 3、application/json


- 使用 koa-body 接收

  可以接收application/x-www-urlencoded 

  ```javascrpt 
  $ npm install koa-body
  const koaBody = require('koa-body');
  app.use(koaBody());
  router.post('/demo',async (ctx,next) => {
    console.log('接口请求准备处理响应',ctx.request.body)
    // => POST body
    // ctx.response.status = 200
    ctx.body = {txt:'开始吧'}
  })
  ```

  .这个可以接收三种的所有格式

  ```javascript
    const router = require('koa-router')();
    const koaBody = require('koa-body')({
        multipart: true,  // 允许上传多个文件
        formidable: { 
        uploadDir: 'public/images/headImage',// 上传的文件存储的路径 
        keepExtensions: true  //  保存图片的扩展名
    }
    });
    router.post('/users', koaBody,(ctx) => {
        console.log(ctx.request.body);
        ctx.body = JSON.stringify(ctx.request.body);
        }
    );
    app.use(router.routes());
  ```

  .路由koa-router知识点
  ```javascript
	const Router = require('koa-router')
	const router = new Router({
		prefix: '/my/awesome/prefix', //可以不必在每个路径匹配的前端都添加巨长的前缀：
		sensitive: true,//严格匹配路由的大小写
	})

  	router.get('/index', ctx => { ctx.body = 'pong!' })

    // curl /my/awesome/prefix/index => pong!
    //转发请求
    app.use((ctx, next) => {
		if (ctx.path === '/login') { // 匹配到旧版请求，转发到新版
			ctx.routerPath = '/login-v2' // 手动改变routerPath 中间件中改变ctx.routerPath可以很轻易的使路由匹配到我们想转发的地方去
		}
		next()
	})
	app.use(router.routes())


  ```


  ```javascript
    	// 监听浏览器tab的变化；
		// window.addEventListener('visibilitychange', async (e) => {
		// 	// 当前窗口隐藏
		// 	if (document.visibilityState === 'hidden'){
		// 		this.ws.close();
		// 	} else {
		// 		// 当前窗口又移回来了;
		// 		await this.ws.connect(this.userId);
		// 		this.ws.reconnect();
		// 		this.ws.onMessage( (e) => {
		// 			console.log('222222',e.data);
		// 		});
		// 	}
		// });

  ```

  ### 本地静态文件访问
  
  引入 koa-static文件，然后app.use(static(path.join(__dirname, '../../web/public')));
  再去访问自己起的服务下的路即可：[http://172.20.12.75:5000/index.html](http://172.20.12.75:5000/index.html)