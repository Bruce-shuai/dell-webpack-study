// import _ from 'lodash';

// var element = document.createElement('div');
// element.innerHTML = _.join(['Dell', 'Lee'], '-');
// document.body.appendChild(element);


// 下面这种操作可以实现懒加载的行为  -->  懒加载的意思是，一开始不全部加载(只把当前需要的内容加载出来)，后续 需要加载某些文件的时候才会加载某些文件
// 因此 下面这种import 语法 是 可以实现懒加载的效果的
// react 中的路由概念，路由切换就是使用了懒加载的概念(先每种页面进行代码分割即Code Spliting 然后通过异步组件的形式 将对应的代码载入进来就行了，这样会让速度提升) 
// 懒加载 实质上是 es 里提出的概念(用import语法来体现)
function getComponent() {
  return import(/* webpackChunkName:"lodash" */'lodash').then(({default:_}) =>{
    var element = document.createElement('div');
    element.innerHTML = _.join(['Dell', 'Lee'], '-');
    return element;
  })
}


document.addEventListener('click', () => {
  getComponent().then(element => {
    document.body.appendChild(element);
  })
})

// chunk 是什么？
// 指打包后的文件夹里有几个js文件。每个js文件都被叫做一个chunk (html文件 不是一个chunk)
// webpack 本身提供的 code spliting 默认配置其实已经不错了。但是如果非要自己配也是可以的