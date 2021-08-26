import "@babel/polyfill";

// Development 和 Production 模式的区分打包
// 二者主要区别如下：
// 1. 在开发环境中  source map是非常全面的，可以帮助我们在开发环境下快速定位问题
// 而在Production环境中，source map的作用就没那么大了，所以source map的配置就会相对更加简洁一些
// 2. 在开发环境下，打包后的代码一般不需要进行压缩，但是一旦代码要上线，我们希望代码可以被压缩，所以production模式下
// 代码是要被压缩的。上线的配置 甚至是不需要devserver的。因为自己本身就会有一个服务器

// 由于开发环境下的webpack config文件和上线环境的config的配置不一样。所以解决方法是设置3个config文件
// 分别是 webpack.dev.js(开发环境)  webpack.prod.js(上线)  webpack.common.js(开发和生产环境都有的共用内容)
// 想要三者文件合并  需要第三方模块: npm install webpack-merge -D 

// npm run build   --> build 一般是生成线上代码的指令
// 所以我之前使用 react的时候  执行 npm run build 就会出现打包文件夹 dist

console.log('看看三个文件的配置是否成功了')