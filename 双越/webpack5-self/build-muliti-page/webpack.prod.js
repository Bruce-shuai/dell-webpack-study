const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
// 线上环境 css代码 进行压缩
// mini-css-extract-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],  // 注意，这里不再使用 style-loader
      },
    ],
  },
  output: {
    // 2. 对于多入口文件，需要设置为[name]占位符，而非bundle以防止重名
    // filename: 'bundle.[contenthash].js'   
    filename: '[name].[contenthash].js'
  },
  plugins: [
    // 这样做的目的是什么呢？
    new MiniCssExtractPlugin({
      filename: 'css/main.[contenthash].css'
    }),
  ],
  optimization: {
    // 压缩css文件
    minimize: true,
    minimizer: [new TerserPlugin(),new CssMinimizerPlugin()],
    
    // 分割代码块
    splitChunks: {
      chunks: 'all',
      /**
       * initial 入口 chunk，对于异步导入的文件不处理
       * async 异步 chunk
       * all 全部 chunk
       */
    },
  },
});