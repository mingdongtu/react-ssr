# React 服务端渲染 

## client
  ```js
import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from "../shared/App";
import { Provider } from 'react-redux'
import { createClientStore } from '../shared/store/index'
const store = createClientStore()
ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
1、拿到store里面的数据，然后渲染客户端
2、BrowserRouter 让页面存入栈中，点击回退能记住
3、Provider 组件用于将redux中的store 注入到当前环境中
 
 ```
 ## server
  ```js
import express from 'express'
import React from 'react'
import App from './../shared/App'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { createServerStore } from './../shared/store/index'
import { Provider } from 'react-redux'
import { matchRoutes } from 'react-router-config'
import routes from '../shared/Routes'
const app = express()
app.use(express.static('public'))  //定义静态资源所在的位置
app.get(['/', '/about', '/home'], (req, res) => {  //监听这几个路由
  const matchedRouters = matchRoutes(routes, req.path)
  const promises = [];
  const store = createServerStore()
  matchedRouters.forEach(item => {
    if (item.route.loadData) {
      promises.push(new Promise(resolve => {
        item.route.loadData(store).then(resolve)
      }))
    }
  })
  Promise.all(promises).then(() => {
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      </Provider>
    )
    res.send(`
    <html>
      <head></head>
          <body>
            <div id="root">${content}</div>
            <script>
                window.REDUX = ${JSON.stringify(store.getState())}
            </script>
            <script src='/bundle.js'></script>
          </body> 
    </html>
`)
  })
})
//监听一个请求
app.get('/getData', (req, res) => {
  res.json({
    isSuccess: true,
    data: 'this is your first SSR data'
  })
})
console.log('server is running at http://localhost:3001');
app.listen(3001)


1、核心思想就是将自己创建的组件放在在服务端（Node），匹配路由，然后通过组件的生命周期来调用另一个服务端（如java服务端）的接口拿到数据，然后存储在store里面，然后组件获取store里的数据进行渲染
2、用express起一个服务
3、app.get 只负责捕获浏览器http请求，路由切换不会被捕获
4、app.use(express.static('public'))  When a file is not found, instead of sending a 404 response, it instead calls next() to move on to the next middleware, allowing for stacking and fall-backs.
5、react-router-config 匹配一些对应路径的http(s)请求的路径，允许在路由配置的时候传递额外的参数



  ```

  




