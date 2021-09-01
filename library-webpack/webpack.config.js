const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    library: {
      name: 'webpackMath',   // 这样就可以支持标签语法 可以在全局变量中增加一个变量
      type: 'umd',   // 表示不管用什么方法来引入这个库，都能让你引用得到
    },
    externals: {
      lodash: {
        commonjs: 'lodash',
        amd: 'lodash',
      }
    }
  }
}