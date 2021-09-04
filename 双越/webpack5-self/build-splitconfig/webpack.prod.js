const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'bundle.[contentHash:8].js'   // 内容变了，hash就会变。好处就是，在每次刷新页面，js文件就不会变。会命中缓存。增加速度
  }
});