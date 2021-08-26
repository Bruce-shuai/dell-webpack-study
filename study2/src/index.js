import './style.css';
import number from './number';
import counter from './counter';

number();
counter();

// 这个module.hot 用起来舒服啊
// 为了让 number 变化的时候，counter不变化，有以下配置
if(module.hot) {   // 表示如果开启了HMR 就能执行下面的代码
  module.hot.accept('./number', () => {
    document.body.removeChild(document.getElementById('number'));
    number();   // 表示，只要number文件发生了一点改变，之前的number节点就会被删除掉，然后number函数就会被重新执行一下，生成新的number节点。
    // 整个过程 counter不受影响
  })
}



// var btn = document.createElement('button');
// btn.innerHTML = '新增item';

// document.body.appendChild(btn);

// btn.onclick = function() {
//   var div = document.createElement('div')
//   div.innerHTML = 'item';
//   document.body.appendChild(div);
// }