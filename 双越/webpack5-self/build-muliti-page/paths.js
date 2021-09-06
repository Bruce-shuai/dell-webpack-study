// 这种配相对路径的好处是什么呢？ --> 这样似乎方便把webpack配置放在专门的文件夹里
const path = require('path');   

const srcPath = path.join(__dirname, '..', 'src');    
const distPath = path.join(__dirname, '..', 'dist'); // 表示打包后的内容会放在一个dist文件夹里
module.exports = {
  srcPath,
  distPath
}