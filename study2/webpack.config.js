const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    // 直接对dist目录下的图片文件名修改为了非哈希值
    assetModuleFilename: '[name].[ext]'
  },
  module: {
  rules: [
    {
    // 允许使用iconfont了 ttf, 但是要注意一个问题。在css module的情况下是不能使用import './...css' 这种导入方法的。所以如果要引入字体文件 非css module方法。则应先关闭css module
     test: /\.(jpg|png|gif|ttf)$/,  
     type: 'asset',
     parser: {
        dataUrlCondition: {
          maxSize: 8 * 1024 // 8kb
        }
      }
    }, {
      test: /\.css$/i,
        use: ["style-loader", "css-loader"],
    }, {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // 表示在执行css-loader 前 还应执行前面多少个(此设置为2)loader。防止有些特殊情况 部分loader会有没被执行的情况
              importLoaders: 2,
              // css modules 的效果是不再让传统的css文件全局有效这种情况。转变为 css文件的效果只在当前模块起作用
            }
          },
          // Compiles Sass to CSS
          "sass-loader"
        , {
            // 自动添加厂商前缀 
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
            },
          }
        ]
    }
  ]
 },
}