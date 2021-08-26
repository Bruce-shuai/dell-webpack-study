const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');


module.exports = {
  
  mode: 'development',
  optimization: {
    usedExports: true,
  },
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