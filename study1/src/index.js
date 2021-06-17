import Header from './header';
import Sidebar from './sidebar';
import Content from './content';
import Avatar from './avatar.jpg';


new Header();
new Sidebar();
new Content();

var img = new Image();   // 这个用法之前学js的时候也没见过啊~
img.src = Avatar;

var root = document.getElementById('root');
root.append(img)