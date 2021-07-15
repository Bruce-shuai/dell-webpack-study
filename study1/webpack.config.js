const path = require('path');

module.exports = {

  mode: 'development',   // 模式默认是production
  entry: './src/index.js',
  module: {
    rules: [{
      test: /\.(jpg|png|gif)$/,   // 正则表达式
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',   // 打包生成的名字(包括后缀)和原来的名字一模一样
          limit: 2048             // 表示如果图片的字节小于2048的话，会以Base64的格式放到bundke.js 文件里
        }
      }
    }, {
      test: /\.scss$/,   // 正则表达式
      use: [
        'style-loader', 
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            modules: true
          }
        }, 
        'postcss-loader',
        'sass-loader',
      ]
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}