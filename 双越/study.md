结合 dell 老师的课程 以及 webpack 官方文档的内容来学习！

**双越**一栏主要是面试相关内容！

这一栏，主要跟**性能优化**相关。甚至可以结合 dell 老师的 webpack 的内容

### webpack

- webpack 已经是前端打包构建的不二选择
- 每日必用，面试必考
- 成熟的工具，重点在于配置和使用，原理并不高优

#### 讲解范围

- 基本配置
- 高级配置
- 性能优化
  - 优化打包效率
  - 优化产出代码
- 构建流程概述
- babel

#### webpack 面试题

- 前端代码为何要进行构建和打包？
- module chunk bundle 分别什么意思？有何区别？
- loader 和 plugin 的区别？
- webpack 如何实现懒加载？
- webpack 常见的性能优化
- babel-runtime 和 babel-polyfill 的区别

#### 关于 webpack5

- webpack5 主要是内部效率的优化
- 对比 webpack4，没有太多使用上的改动

#### webpack 基本配置

- vue-cli create-react-app
- 常用上述脚手架，而不会自己配置 webpack...
- 则面试不会通过

---

- 拆分配置和 merge 「prop dev common webpackConfig」
- 启动本地服务 「webpack-dev-server」 + 跨域问题(跨域这个东西最近要了解一下才行) -> 设置 proxy
- 处理 ES6 「babel」
- 处理样式 「style-loader、css-loader、postcss-loader、less-loader」
- 处理图片
- 模块化

---

#### webpack 高级配置

- 基本配置只能做 demo 不能做线上项目
- 面试考察基本配置，只是为了快速判断你是否用过 webpack
- 以下高级配置，也是通过面试的必要条件

---

- 多入口文件问题
- 抽离压缩 css 文件
- 抽离公共代码 (避免资源浪费，减少加载次数)
- 懒加载
- 处理 JSX 处理 vue

---

#### module chunk bundle 的区别

- module - 各个源码文件，webpack 中一切皆模块(html 文件 除外) 能被引用的文件都是模块(无论什么类型)
- chunk - 多模块合并成的，如 entry import() splitChunk
- bundle - 最终的输出文件 (一般一个 chunk 对应一个 bundle)

---

#### webpack 性能优化

- 大厂必考 & 社区热议话题
- 优化打包构建速度 - 开发体验和效率
- 优化产出代码 - 产品性能 (不要像背书一样来说，而是通过分析问题的方式来谈论...)

---

##### webpack 性能优化 - 构建速度

- 优化 babel-loader
- IgnorePlugin
- noParse
- happyPack
- ParallelUglifyPlugin
- 自动刷新
- 热更新
- DllPlugin

```
优化babel-loader
{
  test: /\.js$/,
  use: ['babel-loader?cacheDirectory'],   // 开启缓存
  include: path.resolve(__dirname, 'src'),// 明确范围
  // // 排除范围，include 和 exclude 两者选一即可
  // exclude: path.resolve(__dirname, 'node_modules')
}
```

**IgnorePlugin** 避免引入无用模块

- > import moment from 'moment'
- 默认会引入所有语言 js 代码，代码过大
- 如何只引入中文？

**noParse** 避免重复打包

```
module.exports = {
  module: {
    // 独立完整的 `react.min.js` 文件就没有采用模块化  min.js 文件一般都是已经打包过的了
    // 忽略对 `react.min.js` 文件的递归解析处理
    noParse: [/react\.min\.js$/],
  },
}
```

**IgnorePlugin vs noParse**

- IgnorePlugin 直接不引入，代码中没有
- noParse 引入，但不打包

**happyPack**多进程打包 (这是社区中的热门词汇)

- js 单线程，开启多进程打包 --> 这样能够提高打包速度
- 提高构建速度(特别是多核 cpu)

```
要先安装happPack
```

**ParallelUglifyPlugin**多进程压缩 js

- webpack 内置 Uglify 工具压缩 js
- js 单线程，开启多进程压缩更快
- 和 happyPack 同理

#### 关于开启多进程

- 项目较大，打包较慢，开启多进程能提高速度
- 项目较小，打包很快，开启多进程会降低速度(进程开销)
- 按需使用

#### 自动刷新

```
module.export = {
  watch: true,     // 开启监听，默认为false
  // 注意，开启监听之后，webpack-dev-server 会自动开启刷新浏览器

  // 监听配置
  watchOptions: {
    ignored: /node_modules/,    // 忽略哪些
    // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    aggregateTimeout: 300,      // 默认为300ms
    // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
    poll: 1000                  // 默认每隔1000毫秒去询问一次
  }
}
```

#### 热更新

- 自动刷新：整个网页全部刷新，速度较慢
- 自动刷新：整个网页全部刷新，状态会丢失
- 热更新：新代码生效，网页不刷新，状态不丢失(路由，输入框里的数据，全局变量 都不会丢失) ... 按需引入才行

```
HotModuleReplacementPlugin
```

这个是需要自己去配置一些东西的

**DllPlugin**动态链接库插件

- 前端框架如 vue React，体积大，构建慢
- 较稳定，不常升级版本
- 同一个版本只构建一次即可，不用每次都重新构建
- webpack 已内置 DllPlugin 支持
- DllPlugin-打包出 dll 文件
- DllReferencePlugin-使用 dll 文件

#### webpack 优化构建速度(可用于生成环境)

- 优化 babel-loader
- IgnorePlugin
- noParse
- happyPack
- ParallelUglifyPlugin

#### webpack 优化构建速度(不可用于生成环境！)

- 自动刷新 (只是为了提高开发体验)
- 热更新 (决不能用于生产环境)
- DllPlugin (只是用于在开发环境下提高打包速度)

某位朋友做的笔记：

```
用于公共环境（common）：
优化 babel-loader
happyPack
IgnorePlugin
用于生产环境（prod）：
noParse（xxx.min.js dev 中不利于debug）
ParalleUglifyPlugin（dev 环境代码没必要压缩体积）
用于开发环境（dev）：
自动刷新（仅为了开发体验，仅用于 dev）
热更新（仅为了开发体验，仅用于 dev）
DllPlugin（仅为了开发频繁打包体验，用于 dev）
```

##### webpack 性能优化 - 产出代码

- 体积更小
- 合理分包，不重复加载
- 速度更快，内存使用更少

---

- 小图片 base64 编码
- bundle 加 hash (辅助没改变的文件命中缓存 加载更快)
- 懒加载
- 提取公共代码
- IngorePlugin
- 使用 cdn 加速
- 使用 production
- Scope Hosting

---

**使用 production**

- 能够自动开启代码压缩 (dev 环境下是没有必要压缩代码的) --> 代码体积更小，性能会更快
- Vue React 等会自动删掉调试代码(如开发环境的 warning)
- 自动启用 Tree-shaking
  注意： tree-shaking 在'productioin'模式下会自动开启，不用其他配置
- 对于 tree-shaking 有一个注意点： ES6 Moudle 才能启动 tree shaking commonjs 就不行

---

**ES6 Module 和 Commonjs 区别**

- ES6 Module 静态引入，编译时引入
- Commonjs 动态引入，执行时引入
- 只有 ES6 Module 才能静态分析，实现 Tree-Shaking

```
let apiList = require('../config/api.js')
if (isDev) {
  // 可以动态引入，执行时引入(未执行时，根本不知道下面的这行代码是否存在)
  apiList = require('../config/api_dev.js')
}
```

```
import apiList from '../config/api.js'
if (isDev) {
  // 编译时报错，只能静态引入 (只能放在最上面，不能放在if这种条件句)
  import apiList from '../config/api_dev.js'
}
```

#### Scope Hosting --> 代码体积越大，效果就会越好

- 代码体积更小
- 创建函数作用域更少
- 代码可读性更好

### babel

- 前端开发环境必备工具
- 同 webpack，需要了解基本的配置和使用
- 面试考察概率不高，但要求必会

* 环境搭建 & 基本配置
* babel-polyfill
* babel-runtime

#### babel 环境搭建 和 基本配置

- 环境搭建
- .babelrc 配置
- presets 和 plugins

#### babel-polyfill 是什么

- 什么是 Polyfill
- core-js 和 regenerator 是啥
- babel-polyfill 即上述两者的集合
- babel 7.4 之后弃用 babel-polyfill
- 推荐直接使用 core-js 和 regenerator
- 但并不影响面试会考察它

### webpack 考点总结 和 复习

- 基本配置
  - 拆分配置 和 merge
  - 启动本地服务
  - 处理 ES6
  - 处理样式
  - 处理图片
- 高级配置
  - 多入口
  - 抽离 CSS 文件
  - 抽离公共代码
  - 懒加载
  - 处理 JSX
  - 处理 Vue
- 优化打包效率
  (能用于生产环境)
  - 优化 babel-loader
  - IgnorePlugin
  - noParse
  - happyPack
  - ParallelUglifyPlugin
    (不能用于生产环境)
  - 自动刷新
  - 热更新
  - DllPlugin
- 优化产出代码
  - 小图片 base64 编码
  - bundle 加 hash
  - 懒加载
  - 提取公共代码
  - 使用 CDN 加速
  - IgnorePlugin
  - 使用 production
  - Scope Hosting
- 构建流程概述

---

##### webpack 面试真题-前端代码为何要打包和构建？

- 体积更小(Tree-Shaking、压缩、合并)，加载更快
- 编译高级语言或语法(TS、ES6+、模块化、scss)
- 兼容性和错误检查(Polyfill、postcss、eslint)
- 统一、高效的开发环境
- 统一的构建流程和产出标准
- 集成公司构建规范(提测、上线等)

##### module chunk bundle 的区别

- module - 各个源码文件，webpack 中一切皆模块
- chunk - 多模块合并成的，如 entry import() splitChunk
- bundle - 最终的输出文件

##### loader 和 plugin 的区别

- loader 模块转换器，如 less -> css
- plugin 扩展插件，如 HtmlWebpackPlugin

##### 常见 loader 和 plugin

##### babel 和 webpack 的区别

- babel - JS 新语法编译工具，不关心模块化
- webpack - 打包构建工具，是多个 loader plugin 的集合

##### 如何产出一个 lib

##### webpack 如何实现懒加载

- import()
- 结合 Vue React 异步组件
- 结合 Vue-router React-router 异步加载路由

##### 为何 Proxy 不能被 Polyfill？

...

似乎 `thread-loader` 能够代替 `happypack`
