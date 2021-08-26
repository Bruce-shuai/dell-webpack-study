const webpack = require('webpack');
const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
  mode: 'development',
  optimization: {
    usedExports: true,
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: './dist',
    hot: true
  },
  plugins: [
  // 开启HMR 功能 似乎这个插件不用也可以
  new webpack.HotModuleReplacementPlugin()
  ],
}

module.exports = merge(commonConfig, devConfig);