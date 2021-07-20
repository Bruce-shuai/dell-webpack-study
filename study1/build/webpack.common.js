const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /node_modules/,    // 因为第三方模块早就做好了转义，所以没必要再次使用一遍转义(exclude 是排除在外的意思)
      loader: 'babel-loader'
    }, {
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: 'url-loader',
        options: { 
          name: '[name]_[hash].[ext]',   
          outputPath: 'images/',
          limit: 2048
        }
      }
    }, {
      test: /\.scss$/,
      use: [
        'style-loader', 
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        }, 
        'postcss-loader',
        'sass-loader'
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader', 
        'css-loader',
        'postcss-loader'
      ]
    }, {
      test: /\.(ttf|woff|woff2)$/,
      use: {
        loader: 'file-loader',
      }
    }]
  },
  output: {  
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true
  }, 
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },  
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}