import "@babel/polyfill";

// 来一个es6语法，让更多浏览器支持es6的语法(不单单是限于chrome这种先进的浏览器)
// babel 让 es6的语法 变为了 es5语法 
// babel的知识点 还是看 babel官网的为妙   babel官网 --> Setup --> 选择webpack
// 可以通过 在cli里输入 npx webpack 看在dist目录下的main.js 文件  通过搜索关键字eval 
// 来查看eval里的代码(即当前index.js文件的代码)是否被转化为es5的内容
// 但是还是要注意一个问题，即使转化为es5的代码  仍会有 Promise 函数、map语法... 在低版本的垃圾浏览器里(这里我可没说是IE)仍然不太支持，这时候不仅
// 要用preset-env做语法解析。还要把一些缺失的变量和函数补充到翻译后的代码里去，这时就需要 Babel-Polyfill 
// babel-polyfill 查询方法： Babel 官网  --> Docs  --> 左侧 polyfill
// 注意： 使用了 babel-polyfill 后，一个文件的内容会变得很大(因为也补充了不少的内容)，所以要控制文件的大小，需要用到polyfill的某部分内容，才会启动某部分内容
// 而不是全部都弄出来 方法：useBuiltIns: 'usage'  具体操作 文档 和 该项目的babel.config.json文件的内容

// tm的，这个babel的内容多啊   babel的内容比webpack更加的深层次

const arr = [
  new Promise(() => {}),
  new Promise(() => {})
];

arr.map(item => {
  console.log(item);
})