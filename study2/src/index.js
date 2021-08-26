import "@babel/polyfill";

// Tree Shaking 只支持ES Module(即import export  需要静态引入方式)


// 这里只想导出 add 方法， minus 方法不想导出。所以就用Tree Shaking把模块里没用的东西“摇晃掉” 
// 所以，如果采用了 Tree Shaking ,则 {} 包裹的add方法能够被导出来，而 {} 之外的就被摇晃掉！！ 估计平时在react中，人家也是这样来处理的！
// 但是为了防止tree shaking 对例如下面的css 导入： import './...css'有影响。所以用如下的方法来进行修改：
// package.json 文件的 "sideEffects": false --> 修改为 --> "sideEffects": ["*.css"]

// production 环境下 有很多默认的方法
import { add } from './math.js';

add(1, 2)