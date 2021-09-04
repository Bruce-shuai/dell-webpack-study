// ES模块化引入css
import './style/style1.css';
// 引入第三方库
import _ from 'lodash';

// 打印全局变量
// console.log('window.ENV', ENV); 
// 打印ES6语法 --> 箭头函数
const print = (info) => {
  console.log('info:', info);
}
print('hello webpack 5');
// 这里是为了展示Tree shaking 还是仅仅为了能够使用ES6呢？
import { sum } from './math';   
const sumRes = sum(10, 20);
console.log('sumRes', sumRes);
// 引入图片模块
function insertImgElem(imgFile) {
  const img = new Image();
  img.src = imgFile;
  document.body.appendChild(img);
}
import imgFile1 from './img/1.png';
insertImgElem(imgFile1);
import imgFile2 from './img/2.jpeg';
insertImgElem(imgFile2);