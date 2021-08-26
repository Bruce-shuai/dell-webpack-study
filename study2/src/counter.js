// 从这里可以看出 人家dell老师的js的能力也是非常强的

function counter() {
  var div = document.createElement('div');
  div.setAttribute('id', 'number');
  div.innerHTML = 1;
  div.onclick = function() {
    div.innerHTML = parseInt(div.innerHTML, 10) + 1;
  }
  document.body.appendChild(div);
}

export default counter;