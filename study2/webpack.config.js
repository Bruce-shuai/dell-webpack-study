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
  //  rules: [
  //    {
  //     //  test: /\.png/,
  //     test: /\.(jpg|png|gif)$/,  // 打包更多的文件
  //     type: 'asset/resource',
  //     generator: {
  //       filename: 'static/[hash][ext][query]'
  //     }
  //    }
  //  ]
  rules: [
    {
    // 这个比以前的url-loader和file-loader更厉害
     test: /\.(jpg|png|gif)$/,  
     type: 'asset',
     parser: {
        dataUrlCondition: {
          maxSize: 124 * 1024 // 124kb
        }
      }
    }, {
      test: /\.css$/i,
        use: ["style-loader", "css-loader"],
    }, {
        test: /\.s[ac]ss$/i,
        // 对style-loader的常用知识点进行补充
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // 表示在执行css-loader 前 还应执行前面多少个(此设置为2)loader。防止有些特殊情况 部分loader会有没被执行的情况
              importLoaders: 2,
              // css modules 的效果是不再让传统的css文件全局有效这种情况。转变为 css文件的效果只在当前模块起作用
              modules: true,   // 引用css文件的方法变为：import style from './ ...css'
              // 使用webpack打包字体文件
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