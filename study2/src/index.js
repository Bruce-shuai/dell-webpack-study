import _ from 'lodash';
import $ from 'jquery';

const dom = $('<div>');
dom.html(_.join(['dell', 'leeeeeelll']), '-----')
$('body').append(dom);

// Webpack 与 浏览器缓存(Caching)
// contenthash 这个是真牛逼 这里可以联想到双越视频 的 浏览器缓存 以及人家提到过的 contenthash + webpack