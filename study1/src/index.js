import fenjing from './img.png';
// import './index.scss';   // 这种引入scss文件的方法 会影响全局的样式
// 因此，引入css模块化的概念  表示css只在指定的模块内有效。 写法如下
import style from './index.scss';
import createImg from './createImg';

createImg();
var img = new Image();  // 这里是创建了一个img 标签
img.src = fenjing;
// css moudle 的 使用方式如下
img.classList.add(style.fengjing);
var root = document.getElementById('root');
// 这里的js api 应该要好好学学才行
root.append(img);