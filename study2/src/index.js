var bilibili = require('./BIBI.png');

var img = new Image();
img.src = bilibili;

var root = document.getElementById('root');
root.append(img);
console.log('bilibili', bilibili);