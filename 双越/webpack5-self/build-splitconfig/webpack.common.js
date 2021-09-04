const path = require('path');
const { srcPath, distPath } = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// [contenthash:8] 这个配置要好好思考一下

module.exports = {
  entry: path.join(srcPath, 'index.js'),
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader', 
          'css-loader',
          // postcss-loader 是用来做浏览器兼容性的
          // postcss <-> Autoprefixer
          {
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
            }  
          },
          "less-loader"
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // 这是webpack5内置的资源文件，不用再手动下载
        type: 'asset/resource',
      },
    ]
  },
  output: {
    filename: 'main.js',
    clean: true,
    path: distPath
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.join(srcPath, 'index.html'),
    filename: 'index.html'
  }
  )],
}

