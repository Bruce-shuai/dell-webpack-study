import _ from 'lodash';   

// 首先 不再用 clearWebpackPlugin 这个插件了  因为webpack5 有更优秀更简单的方法
// Code Splitting 代码分割
// 先安装一个lodash  npm install loadsh --save

// 字符串连接效果
console.log(_.join(['a', 'b', 'c'], '***'));
// 此处省略10万行业务逻辑

// 会带来一个潜在问题  
// 比如 loadsh 有1mb 大小，我的业务逻辑 有1mb大小 打包的文件就是2mb
// 打包文件会很大，加载时间会长
// 如果修改了业务代码，用户又要重新刷新这2mb的内容...
// 解决方法： 把lodash 挂载到全局window

// 浏览器可以并行加载文件 (一个2mb的文件的加载时间 高度 2个1mb的文件的加载时间 ，尽管不是绝对的)
// 当页面业务逻辑发生变化时，只要加载main.js 即可(lodash文件不需要再加载，因为已经放在浏览器缓存里面了)

// Code Splitting  通过对代码进行拆分 来 提升代码的性能
// 尽管Code Splitting 这个概念不是有webpack提出来的。但现在webpack与code spliting 已经密不可分了
// 因为 webpack 有非常多的插件能够帮助我们实现Code Splitting
// webpack 的插件能让我们不用自己进行手动代码分割
// 人家 自动帮助我们打包了 一个vendors-node..文件来放置公共内容  运行 npm run dev-build

// 代码分割有两种方式： 同步代码 和 异步加载代码分割
// 直接在webpack官网查如何实现