/**
 * @description 常用文件夹路径
 * @author 双越
 */

const path = require('path');
// 这里的这个用法是真的专业
const srcPath = path.join(__dirname, '..', 'src');
const distPath = path.join(__dirname, '..', 'dist');

module.exports = {
    srcPath,
    distPath
}
