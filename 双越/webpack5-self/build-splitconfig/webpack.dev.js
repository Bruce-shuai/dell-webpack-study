const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { distPath } = require('./paths');

// webpack.DefinePlugin用法 以及 设置代理还要再研究研究
module.exports = merge(common, {
  mode: 'development',
  // 这里的devtool配置是不适合生产环境的
  devtool: 'inline-source-map',
  // 注意：devServer 只能够用于开发环境
  devServer: {
    static: distPath,
    compress: true,     // 启动代码压缩
    port: 9000,

    // 跨域请求其他接口
    proxy: {
      // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
      '/api': 'http://localhost:3000',

      // 将本地 /api2/xxx 代理到 localhost:3000/xxx
      '/api2': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '/api2': ''
        }
      }
    }
  },
});