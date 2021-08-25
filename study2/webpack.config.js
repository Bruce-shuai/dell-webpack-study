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
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: '[name].[ext]'
  },
  // htmlWebpackPlugin 会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中
  plugins: [new HtmlWebpackPlugin({
    // 可以自定义一个html的模板，方便自动生成的html文件具备模板提供的格式
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