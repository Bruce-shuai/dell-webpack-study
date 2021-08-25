const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');

// sourceMap  指定具体是哪个文件的哪个位置出错。
// sourceMap 它是一个映射关系，他知道dist目录下js文件哪行出错所对应的src目录的js文件哪一行出错
// 通过devtool 来具体设置source-map的映射方法
module.exports = {
  // 在开发者模式下(development)，sourceMap是已经被默认使用了的。devtool: 'source-map' 启动source-map
  mode: 'development',
  // 这里的devtool 可以配置各种操作，具体方法可看webpack的devtool这一节的内容
  // devtool: 'source-map',
  // cheap 只会告诉你是哪一行出错，不会告诉你是哪一行的哪一列出错，相对更加节省性能
  // module 不仅会管自己的业务代码哪里出错，如果你下载了第三方模块例如:lodash 它也会给你纠错lodash里的内容
  // eval 是打包速度最快的模式，通过eval方式来执行。但是如果是比较复杂的代码用eval的话 提供的信息就不太完整就不会太推荐

  // 如果仅是source-map 就会在打包文件里生成一个 main.js.map 文件

  // 最佳source-map实践：
  // 在开发环境(development)中使用source-map： eval-cheap-module-source-map   // 提示比较全面，打包速度也挺快
  // 在线上环境(production)中使用source-map： cheap-module-source-map

  devtool: 'eval-cheap-module-source-map',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].js',
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