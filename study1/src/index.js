import _ from 'lodash';

var element = document.createElement('div');
element.innerHTML = _.join(['Dell', 'Lee'], '-');
document.body.appendChild(element);


// 异步实现懒加载？ 使用import 语法


// 代码使用率   异步加载  性能会提升
// 缓存 不行  而是 代码利用率来提高性能