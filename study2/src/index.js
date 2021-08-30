// Webpack 和 Code Splitting

// 浏览器并行加载概念
// 让项目代码的公用部分进行拆分，从而提升项目的运行速度「Code Splitting」
// webpack 的相关插件能够自行帮助我们对代码进行 Code Splitting (非常智能)，而不需要自己再手动的把公用代码进行文件拆分。
// 并且webpack的相关配置项非常的简单

// import _ from 'lodash';
// console.log(_.join(['a', 'b', 'c']));

// 不仅可以同步的引入模块进行打包外还可以去做异步模块的引入

// 异步加载也会做代码分割，甚至无需做任何配置，便会自动进行代码分割
function getComponent() {
  return import('lodash').then(({default: _}) => {
    var element = document.createElement('div');
    element.innerHTML = _.join(['Dell', 'Lee'], '-');
    return element;
  })
}

getComponent().then(element => {
  document.body.appendChild(element);
})