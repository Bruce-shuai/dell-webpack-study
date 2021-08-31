// Webpack 和 Code Splitting

// 浏览器并行加载概念
// 让项目代码的公用部分进行拆分，从而提升项目的运行速度「Code Splitting」
// webpack 的相关插件能够自行帮助我们对代码进行 Code Splitting (非常智能)，而不需要自己再手动的把公用代码进行文件拆分。
// 并且webpack的相关配置项非常的简单

// import _ from 'lodash';
// console.log(_.join(['a', 'b', 'c']));

// 不仅可以同步的引入模块进行打包外还可以去做异步模块的引入

// 异步加载也会做代码分割，甚至无需做任何配置「无需做optimization配置」，便会自动进行代码分割
// function getComponent() {
//   return import('lodash').then(({default: _}) => {
//     var element = document.createElement('div');
//     element.innerHTML = _.join(['Dell', 'Lee'], '-');
//     return element;
//   })
// }

// getComponent().then(element => {
//   document.body.appendChild(element);
// })

// webpack的代码分割 底层使用了 SplitChunksPlugin 插件
// SplitChunksPlugin 常用配置如下：

// magic comments  魔法注释

// function getComponent() {
//   // 注意，下面的magic comments 是用:来进行分割而不是=
//   return import(/* webpackChunkName:"testname"*/'lodash').then(({default: _}) => {
//     var element = document.createElement('div');
//     element.innerHTML = _.join(['Dell', 'Lee'], '-');
//     return element;
//   })
// }

// getComponent().then(element => {
//   document.body.appendChild(element);
// })

// SplitChunksPlugin 默认配置具体详解：
// module.exports = {
//   //...
//   optimization: {
//     splitChunks: {
//       chunks: 'async',   /* 表示在做代码分割的时候，只对异步代码进行分割，这也说明了，我们做同步代码分割的时候，为什么自己要手动进行optimization配置！ */
//       minSize: 20000,    /* 表示模块至少多大(字节数)才会进行代码分割 */
//       minRemainingSize: 0,
//       minChunks: 1,      /* 表示至少使用多少次该模块 才会进行代码分割 */
//       maxAsyncRequests: 30,   /* 表示同时加载的模块数是多少个 */
//       maxInitialRequests: 30, /* 表示文件最多能分割出多少个文件 */
//       enforceSizeThreshold: 50000,
//       cacheGroups: {          /* 缓存组(和event loop 有相似之效) */    
//         defaultVendors: {     /* 具体指示该如何进行打包 */
//           test: /[\\/]node_modules[\\/]/, /* 符合在node_modules文件夹里才会进行打包 */
//           priority: -10,      /* priority 值越大 优先级越高(与下面的default 相比较) */
//           reuseExistingChunk: true, /* ... */
//         },
//         default: {
//           minChunks: 2,
//           priority: -20,
//           reuseExistingChunk: true,
//         },
//       },
//     },
//   },
// };



// ---------------Lazy Loading 懒加载，Chunk---------------
// 明明同步 代码分割就挺简单的 为何要有异步 代码分割呢？
// 事实上，异步 代码分割可以实现懒加载的行为

function getComponent() {
  return import(/* webpackChunkName:"testname"*/'lodash').then(({default: _}) => {
    var element = document.createElement('div');
    element.innerHTML = _.join(['Dell', 'Lee'], '-');
    return element;
  })
}

// 只有在页面进行鼠标点击后，才会运行下面代码。 才会执行import 并 加载testname.js文件
// 懒加载 其实就是通过import来异步加载一个模块
// 这样可以让页面加载速度更快
// 懒加载事实上是es上的一个概念
document.addEventListener('click', () => {
  getComponent().then(element => {
    document.body.appendChild(element);
  })
})


// Chunk是什么？
// 在webpack打包过后生成了几个js文件，就有多少个Chunk(每个js文件都是一个Chunk，html文件不是这样的)


// ----------------打包分析, Preloading, Prefetching----------------
// 官方提供了打包分析网站：
// 一个 webpack 官方提供的分析仓库(主要是教你如何使用)：
// [点击](https://github.com/webpack/analyse)
// webpack 数据分析 可视化网页：
// [点击](http://webpack.github.io/analyse/#chunks)

// 打包后 会在根目录下生成一个 stats.json 文件(是对打包过程的描述)

// ----preloading、prefetching----
// 做页面性能优化，webpack 希望达到的一个目的是，当你第一次加载页面的时候，它的加载速度就是最快的
// 在chrome 上的控制台里可以查看页面的利用率
// 做高性能前端代码的时候，重点不是缓存，而是代码使用率。webpack希望你尽可能多写异步代码，让网站性能提升更高


// --------------CSS文件的代码分割------------

import "./style.css";
// 注意 webpack 会直接把css文件直接打包到js里面。如果想直接把css打包到dist目录下。就需要MiniCssExtractPlugin插件