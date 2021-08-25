const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');
// webpack中 plugin 的作用：
// plugin 可以在webpack运行到某个时刻的时候，帮你做一些事情
// plugin 就非常像react的生命周期函数

// 打包新的文件前，自动把原来打包的文件删除 
// CleanWebpackPlugin(非官方提供的plugin)
// 安装方法：  npm install clean-webpack-plugin -D
// 插件官网：https://github.com/johnagan/clean-webpack-plugin

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
    sub: './src/index2.js'
  },
  output: {
    // 这让所有文件的文件名前都对应有cdn地址  具体内容 看看文档的output部分
    publicPath: 'http://cdn.com.cn',
    // 对于多入口文件，最后打包出的文件，这里可以通过placeholder来控制打包出来的文件名是什么
    filename: '[name]_[hash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: '[name].[ext]'
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/template-html.html'
  }), new CleanWebpackPlugin()],
  module: {
  rules: [
    {
     test: /\.(jpg|png|gif|ttf)$/,  
     type: 'asset',
     parser: {
        dataUrlCondition: {
          maxSize: 8 * 1024 // 8kb
        }
      }
    }, {
      test: /\.css$/i,
        use: ["style-loader", "css-loader"],
    }, {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            }
          },
          "sass-loader"
        , {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          }
        ]
    }
  ]
 },
}