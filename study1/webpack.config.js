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
        loader: 'url-loader',
        options: { 
          // 使用了url-loader后，图片没有被打包到dist目录下(而是将图片转为Base64的代码放到打包后的js文件里)
          name: '[name]_[hash].[ext]',   
          outputPath: 'images/',
          limit: 204800    
        }
        // 小图片用url-loader 转化为 Base64 节省 网络请求发送次数
      }
    }, {
      test: /\.scss$/,
      use: [
        'style-loader', 
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,  // 这样就保证了即使在scss文件里再引用scss文件，同样会经历完整的执行scss相关loader的步骤
            modules: true      // 表示开启css模块化打包
          }
        }, 
        'postcss-loader',
        'sass-loader'
      ]
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}