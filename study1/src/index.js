import fenjing from './img.png';

var img = new Image();  // 这里是创建了一个img 标签
img.src = fenjing;

var root = document.getElementById('root');
// 这里的js api 应该要好好学学才行
root.append(img);