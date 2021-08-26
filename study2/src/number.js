function number() {
  var div = document.createElement('div');
  div.setAttribute('id', 'number');
  // 假如这个时候把div.innerHTML改为其他数字。那么counter又要重新刷新为1了
  div.innerHTML = 9000;
  document.body.appendChild(div);
}

export default number;