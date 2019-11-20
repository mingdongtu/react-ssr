import express from 'express'
import React from 'react'
// const webpackDevServer = require('webpack-dev-server');
// const webpack = require('webpack');
// const config = require('./../../build/webpack.server.config.js');
// const options = {
//   contentBase: './../../dist',
//   hot: true,
//   host: 'localhost'
// };
// webpackDevServer.addDevServerEntrypoints(config, options);
//将客户端组件拿到服务端进行渲染
import App from './../shared/App'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
const app = express()
app.use(express.static('public'))  //定义静态资源所在的位置
app.get('*', (req, res) => {
  const content = renderToString(<StaticRouter location={req.url}><App /></StaticRouter>)
  console.log('update')
  res.send(`
      <html>
        <head></head>
            <body>
              <div id="root">${content}</div>
              <script src='/bundle.js'></script>
            </body> 
      </html>
  `)
})
console.log('server is running at http://localhost:3000');

app.listen(3000)