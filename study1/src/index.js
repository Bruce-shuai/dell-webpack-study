console.log('hello world !  bruce');

// sourceMap

// 浏览器知道dist 目录下main.js文件96行出错
// sourceMap 它是一个映射关系，他知道dist目录下main.js文件96 实际上
// 对应的是src目录下index.js文件中的第一行


// 最佳devtool 开发实践：
// development(开发环境): eval-cheap-module-source-map
// production(上线环境): cheap-module-source-map