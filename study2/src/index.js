import _ from 'lodash';
import $ from 'jquery';

const dom = $('<div>');
dom.html(_.join(['dell', 'leeeeeelll'], '-----')
$('body').append(dom);

// Shimming 的作用 --> 解决webpack打包过程中的兼容问题  比如 polyfill
// ProvidePlugin


// 环境变量的使用: 看看文档哪里有这个讲解