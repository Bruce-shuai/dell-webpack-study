const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  module: {
    rules: [{
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: 'file-loader',
        options: { // 补充一些额外的参数
          // placeholder 占位符
          name: '[name]_[hash].[ext]',   // 表示打包后的文件名字及后缀保持不变(注意不要忘记写单引号)
          outputPath: 'images/'          // 将打包的文件放进限定的文件夹
        }
      }
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}