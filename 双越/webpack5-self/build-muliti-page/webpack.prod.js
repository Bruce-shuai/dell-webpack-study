const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    // 2. 对于多入口文件，需要设置为[name]占位符，而非bundle以防止重名
    // filename: 'bundle.[contenthash].js'   
    filename: '[name].[contenthash].js'
  }
});