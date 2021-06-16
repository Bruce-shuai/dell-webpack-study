import Header from './header';
import Sidebar from './sidebar';
import Content from './content';

var dom = document.getElementById('root');

// ？？ 这里竟然不用 import 来导入？！ 
// 这也许就是script标签的魅力吧~
new Header();
new Sidebar();
new Content();
