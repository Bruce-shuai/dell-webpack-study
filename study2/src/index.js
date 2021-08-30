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

function getComponent() {
  // 注意，下面的magic comments 是用:来进行分割而不是=
  return import(/* webpackChunkName:"testname"*/'lodash').then(({default: _}) => {
    var element = document.createElement('div');
    element.innerHTML = _.join(['Dell', 'Lee'], '-');
    return element;
  })
}

getComponent().then(element => {
  document.body.appendChild(element);
})

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
