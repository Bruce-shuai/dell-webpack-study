const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');


// webpack 的插件


// Hot Module Replacement 热模块更新
// 使用webpack dev server 打包的文件不会放在目录上，而是隐藏在电脑内存里，这样能有效提高打包的速度，让我们开发得更快
// HotModuleReplacementPlugin 这个插件 搭配 热更新 挺厉害的 

// HMR 能够实现局部模块更新而不影响整个页面内容(不会整个页面刷新)

// 注意一个问题  引入 CSS 文件，hmr直接能带来热更新效果。而如果是JS文件，就需要先使用 if(module.hot) 这种自己来进行一定的配置。
// 原因是在css-loader 里自动配置了 module.hot 所以不用自己再去配置。 react 是借助了一些 babel percet。 babel percet 里面也会内置一些这样的配置。 
// 所以要知道，使用hmr其实都是要配置if (module.hot) 这样的东西。只是有些地方自动提供了这些东西。所以，想要自己配置hmr效果， if(module.hot)这样的配置需要自己来弄！

module.exports = {
  
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: './dist',
    hot: true
  },
  entry: {
    main: "./src/index.js"
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: '[name].[ext]'
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/template-html.html'
  }), new CleanWebpackPlugin(),
  // 开启HMR 功能 似乎这个插件不用也可以
  new webpack.HotModuleReplacementPlugin()
  ],
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