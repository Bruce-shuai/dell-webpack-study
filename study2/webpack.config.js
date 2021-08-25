const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');

// 使用webpack dev server来提高开发效率(避免总是手动在CLI里输入 npm run build,以及手动打开打包后的html文件)
// 实现上述功能  3种方法  webpack文档有详细介绍  最适合第二种，第一种过于简单而且功能偏弱。第三种跟nodejs相关，且配置比较的复杂
// 方法1： "watch": "webpack --watch"  运行的时候是 npm run watch  即可达到自动监听文件变化后的效果 (避免再次手动在cli里输入npm run ...)
// 方法2：具体操作 文档有！  方法2 不仅避免文件进行修改后总是 手动 npm run ... 还能自动打开打包后的html文件, 并且修改的文件内容，不需要手动刷新网页(人家自动帮我们刷新网页)就可以呈现在页面上。并且拥有服务器的一些功能
// 因为有了一些服务器功能(具备http协议)，就可以发送ajax请求了(原本是file://开头，而非http开头)
// 这里就可以联想到人家react 也是通过webpack dev server来进行操作的
// 关于devserver 更多的细节  webpack的devserver专栏有很多内容值得一看
// 方法3：middleware的内容，不太想了解...省略

module.exports = {
  
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: './dist',
  },
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