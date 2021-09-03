const path = require('path')
const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')

module.exports = merge(webpackCommonConf, {
    mode: 'development',
    plugins: [    // plugin的效果会和common叠加吗？
        // DefinePlugin 用法是啥？
        new webpack.DefinePlugin({
                  // window.ENV = 'production'
            ENV: JSON.stringify('development')
        })
    ],
    devServer: {                // devServer 适合开发环境里使用
        port: 8080,
        progress: true,         // 显示打包的进度条
        contentBase: distPath,  // 根目录
        open: true,             // 自动打开浏览器
        compress: true,         // 启动 gzip 压缩

        // 设置代理
        proxy: {
            // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
            '/api': 'http://localhost:3000',

            // 将本地 /api2/xxx 代理到 localhost:3000/xxx
            '/api2': {
                target: 'http://localhost:3000',
                pathRewrite: {
                    '/api2': ''
                }
            }
        }
    }
})
