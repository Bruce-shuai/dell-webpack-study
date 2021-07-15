import avatar from './avatar.jpg';

// 引入了css模块化的概念，表示css只在这一个模块里有效
import style from './index.scss';
import createAvatar from './createAvatar'; 

createAvatar();
var img = new Image();
img.src = avatar;
img.classList.add(style.avatar);

var root = document.getElementById('root');
root.append(img);