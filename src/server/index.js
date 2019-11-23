import express from 'express'
import React from 'react'
//将客户端组件拿到服务端进行渲染
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
    console.log('routes!!!!!!!!!', item)
    if (item.route.loadData) {
      promises.push(new Promise(resolve => {
        item.route.loadData(store).then(resolve)
      }))
    }
  })
  Promise.all(promises).then(() => {

    const content = renderToString(
      //通过Provider 将store里面的数据注入到这个里面来 
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
                window.REDUX_DATA = ${JSON.stringify(store.getState())}
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