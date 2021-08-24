const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    // 直接对dist目录下的图片文件名修改为了非哈希值
    assetModuleFilename: '[name].[ext]'
  },
  module: {
  //  rules: [
  //    {
  //     //  test: /\.png/,
  //     test: /\.(jpg|png|gif)$/,  // 打包更多的文件
  //     type: 'asset/resource',
  //     generator: {
  //       filename: 'static/[hash][ext][query]'
  //     }
  //    }
  //  ]
  rules: [
    {
    // 这个比以前的url-loader和file-loader更厉害
     test: /\.(jpg|png|gif)$/,  
     type: 'asset',
     parser: {
        dataUrlCondition: {
          // 如果指定的文件小于124kb 会被转化为base64 字符串 直接放在dist/main.js里，而不会单独生成一个文件
          // 事实上 如果文件小(一般是8kb以下) 变成base64 放在 文件里 很好，打开main.js 就可看见图片。但如果是太大文件，为了防止
          // 加载文件太慢，还是作为一个新的文件为妙(尽管会多发送一次http请求)
          maxSize: 124 * 1024 // 124kb
        }
      }
    }
  ]
 },
}