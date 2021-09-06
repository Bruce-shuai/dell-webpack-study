const path = require('path');
const { srcPath, distPath } = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// [contenthash:8] 这个配置要好好思考一下
module.exports = {
  // 配置多入口文件： 1. 多页面就先要有多入口
  entry: {
    index: path.join(srcPath, 'index.js'),
    other: path.join(srcPath, 'other.js'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader', 
          'css-loader',
          // postcss-loader 是用来做浏览器兼容性的
          // postcss <-> Autoprefixer
          {
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
            }  
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        }
      },
      // {
      //   test: /\.less$/i,
      //   loader: [
      //     // compiles Less to CSS
      //     "style-loader",
      //     "css-loader",
      //     "less-loader",
      //   ],
      // },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // 这是webpack5内置的资源文件，不用再手动下载
        type: 'asset/resource',
      },
    ]
  },
  output: {
    filename: '[name].[contenthash].js',
    clean: true,
    path: distPath,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
      chunks: ['index']    // 3. 表示index.html文件,只引入index.js文件。而非所有js文件
    }), 
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'other.html'),
      filename: 'other.html',
      chunks: ['other']
    })
  ],
}
