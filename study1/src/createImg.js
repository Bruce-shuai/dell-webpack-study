import fenjing from './img.png';

function createImg() {
  var img = new Image(); 
  img.src = fenjing;
  img.classList.add('fengjing');
  var root = document.getElementById('root');
  root.append(img);
}

export default createImg;