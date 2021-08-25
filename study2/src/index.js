// import './index.css';
import './index.scss';
var bilibili = require('./BIBI.png');

var img = new Image();
img.src = bilibili;
img.classList.add('bilibili');

var root = document.getElementById('root');
root.append(img);
console.log('bilibili', bilibili);