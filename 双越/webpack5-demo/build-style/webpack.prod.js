const path = require('path')
const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { srcPath, distPath } = require('./paths')

module.exports = merge(webpackCommonConf, {
    mode: 'production',
    output: {
        filename: 'bundle.[contenthash:8].js',  // 打包代码时，加上 hash 戳, 效果是什么！？
        path: distPath,
        clean: true,                            // 代替CleanWebpackPlugin
        // publicPath: 'http://cdn.abc.com'     // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
    },
    plugins: [
        // new CleanWebpackPlugin(),            // 会默认清空 output.path 文件夹
        new webpack.DefinePlugin({
            // window.ENV = 'production'
            // 全局变量的使用有更好的方法吗？   这里需要看看dell老师的课
            ENV: JSON.stringify('production')
        })
    ]
})
