const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 这是webpack自带的一个插件
const webpack = require('webpack')


module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: {
    main: './src/index.js'
  },
  devServer: {
    contentBase: './dist',   // 启用一个服务器
    open: true,
    hot: true
    // hotOnly: true    // 表示即使热更新生效，也不让浏览器自动刷新
  },
  module: {
    rules: [{
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: 'url-loader',
        options: { 
          // 使用了url-loader后，图片没有被打包到dist目录下(而是将图片转为Base64的代码放到打包后的js文件里)
          name: '[name]_[hash].[ext]',   
          outputPath: 'images/',
          limit: 204800    
        }
        // 小图片用url-loader 转化为 Base64 节省 网络请求发送次数
      }
    }, {
      test: /\.scss$/,
      use: [
        'style-loader', 
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        }, 
        'postcss-loader',
        'sass-loader'
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader', 
        'css-loader',
        'postcss-loader'
      ]
    }, {
      test: /\.(ttf|woff|woff2)$/,
      use: {
        loader: 'file-loader',
      }
    }]
  },
  output: {  
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  }, 
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}