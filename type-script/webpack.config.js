const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,                  // 这里的?表示可以支持ts、tsx
        use: 'ts-loader',
        exclude: /node_modules/,          // node_modules 里的内容 不会受到 ts-loader的影响
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],   // 表示这些后缀名可以省略
  },
  output: {
    filename: 'bundle.js',    // 注意：这里是js文件
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};