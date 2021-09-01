// 自己写一个loader，loader非常简单，实质就是一个函数而已
module.exports = function(source) {   // 不能写成箭头函数
  return source.replace('dell', 'dellell')
} 

// 自己配置loader的方法在 webpack文档的api/loader-api栏有讲解