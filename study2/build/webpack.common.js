const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const webpack = require('webpack');

// 这里的相关内容可以看看 webpack文档的production部分

module.exports = {
  entry: {
    main: "./src/index.js"
  },
  output: {
    filename: '[name].[contenthash].js',   // 入口文件 走这个名字
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: '[name].[contenthash].js',
    clean: true,
    assetModuleFilename: '[name].[ext]'   // 间接的js文件(在html文件里没有直接被引入的js文件)走这个名字
  },
  // 帮助我们自动进行代码分割(Code Splitting)
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/template-html.html'
  }),new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[hash].css",   /* 如果一个文件会被html直接引用 就走filename，不然走chunkFilename*/ 
      chunkFilename: "[id].css",
    })
  ],
  module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /node_modules/,  // exclude 表示 如果我的js文件在node_modules 里面，就不使用babel-loader(node_modules是一些第三方的代码 我们没必要对其使用es6转es5的语法，因为第三方模块早就帮助我们做好了这一步，没必要再做一遍)
      use: {
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
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
        use: ["style-loader",MiniCssExtractPlugin.loader, "css-loader"],
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