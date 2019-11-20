const path = require('path')
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('./dist/public/')
  },
  devServer: {
    contentBase: './../dist',
    hot: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      { test: /\.jsx?$/, use: 'babel-loader' }
    ]
  },
  resolve: {  //默认是无法解析 jsx扩展名，所以需要resolve配置一下
    extensions: ['.jsx', '.js']
  }
}