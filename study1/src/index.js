// Hot Module Replacement  热更新
// devServer 把打包文件夹放到了 电脑内存里，这样可以有效提高打包的速度，让开发更快

import './style.css';

var btn = document.createElement('button');
btn.innerHTML = '新增';    // 这些基本的js知识还是要好好掌握才行啊！
document.body.appendChild(btn);

btn.onclick = function() {
  var div = document.createElement('div');
  div.innerHTML = 'item';
  document.body.appendChild(div);
}