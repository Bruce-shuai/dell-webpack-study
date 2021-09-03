const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { srcPath, distPath } = require('./paths');

// merge的用法：Guides/Production
// 


module.exports = {
    // path.join 这个方法值得研究一下 这个好像是nodejs的用法...
    entry: path.join(srcPath, 'index'),
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: srcPath,          // include 和 exclude 在这里用得好
                exclude: /node_modules/    
            },
            // {
            //     test: /\.css$/,
            //     // loader 的执行顺序是：从后往前
            //     use: ['style-loader', 'css-loader']
            // },
            {
                test: /\.css$/,
                // loader 的执行顺序是：从后往前
                use: ['style-loader', 'css-loader', 'postcss-loader'] // 加了 postcss
            },
            {
                test: /\.less$/,
                // 增加 'less-loader' ，注意顺序
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html'
        })
    ],
}
