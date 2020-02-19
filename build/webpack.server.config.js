const path = require('path')
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/server/index.js',
  target: 'node',  //指明打包的环境是node
  output: {
    filename: 'app.js',
    path: path.resolve('./dist/')
  },
  plugins: [
    new UglifyJsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/, use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {  //默认是无法解析 jsx扩展名，所以需要resolve配置一下
    extensions: ['.jsx', '.js']
  },
  externals: [nodeExternals()]  //node 包不会打包
}