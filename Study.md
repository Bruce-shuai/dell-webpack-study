### Webpack 是什么？

Webpack 出现之前，单纯的静态页面还好。只有简单的代码逻辑。但随着业务需求变得复杂且庞大。一个文件难以承载这么多的代码量以及代码逻辑，因此让项目变得难以进行维护。

选择多文件管理(其实也就是面向对象思维)。 于是在一个 html 页面，让 script 标签多次被使用(引入多个 js 文件)，这种 scipt 标签创建文件的方法。文件之间似乎不用 import、export 这种模块导入的方法就已经能够相互关联了

但是多个 script 标签会带来以下问题(注意哦！这里其实也涉及了性能优化的方面。因此要好好考虑考虑)

```
1. 整个页面的运行加载速度会变慢（http请求会增多！运行到每个script标签都要进行一次http请求 之前学过，http请求比cpu计算，页面渲染要耗费的时间更多！！）

2. 虽然在同个html页面的任一script标签的内容可以相互关联，但是开发者却很难从代码中看出某个代码函数是源于哪个文件。(很难明晰各个代码及对应文件的层级关系)

3. 很难查错。 因为在html中，代码是顺序执行的。script标签也是顺序执行的，因此script对应文件的放置也是有讲究的。很可能上一个代码文件的内容需要 下一个代码文件的内容支持才行，但因为文件的顺序放错，程序出错，但这种错误又很难被开发者发现
```

#### 新方法

(牛逼，平时都是这样用的，但以前却不知道为什么要这样用)：
只在 html 文件引入一个 script 标签(一个 js 公共文件)就可以了，然后在 js 文件里引入其他 js 文件(引入方法： import、export「这是 es6 的语法，普通浏览器是无法支持的，需要 babel 转译」 或者用 commendjs 的 modules.exports、require)。 这样 html 只需请求一次 js 文件。 并且文件与文件之间的依赖关系变得非常清晰了还有即使 import 文件的顺序不一样，也毫无影响~

但是注意： 如果直接在 js 中使用 import，export(非 react、vue 框架) 称为 ES Module 方法，会报错！！(浏览器不认识 import、export) ~哈哈，这也给了我一个思考点，关于 react、vue 的优势！！！
(有个问题： 如果使用 module.exports 和 require 呢？ 答案是 也是不能够使用的？！！)
通过 webpack 来翻译 import，export，让浏览器能够识别 import export 方法

#### 安装 webpack

1. 进入项目文件目录： npm init 或者 npm init -y(这样可以减少一些操作) (这样会在根目录下得到一个 package.json 文件)
2. 安装 webpack: npm install webpack webpack-cli --save-dev

#### 通过 webpack 翻译 import、export

```
运行代码 终端： npx webpack 文件路径    // 通过webpack去翻译在script标签的js文件, 这里的npx 起到了一个什么样的作用呢？

输入此npm后，根目录会自动增加一个dist文件夹，该文件夹里面多了一个main.js 文件~  该文件就是webpack帮助我们翻译好了的文件！！此时html的script标签引入的不再是原来的index.js 标签，而应该换成dist文件夹里的main.js 这个文件

这样，浏览器就可以识别import  export这种ES module了
```

##### Webpack 明确定义

webpack 可不止我前面说的仅仅提供 ES module 翻译功能那么简单，下面将讲述 Webpack 的明确定义

Webpack 其实就不算一个翻译器。很多 ES 高版本的，浏览器无法解读的语法，webpack 实质也无法识别

Webpack is a module bundler(Webpack 实质是一个模块打包工具)
是一个能把各种模块打包到一起的工具

> 比如：上文提到的，import 其实也是导入一个模块~ 然后将各种 import 导入的模块打包~

> 其实在我们写 ES 代码的时候，不仅仅有 ES Module 这种模块规范, 还有 CommonJS 模块规范(这是 nodejs 喜欢用的模块规范，怪说不得，我学 nodejs 全用的 require...，有一个问题是，如果在前端代码中写 CommonJS,应该也是没有问题的吧？！)还有 CMD、AMD 这种模块规范

> 因为 Webpack 是一个模块打包工具，所以能够识别任何模块引入语法

> 最早的时候，webpack 是一个 js 的模块打包工具 -> 现在可以打包任何形式的模块了(比如 css 文件, less 文件, png 图片文件~)

##### 额外补充 npm 的相关知识

npm 是 Node.js 默认的、用 JavaScript 编写的软件包管理系统
注意：npm 完全用 JS 写成
npm 会随着 Node.js 自动安装。

注意(亮点)： 如果一个项目中存在`package.json`文件，那么用户可以直接使用`npm install`命令自动安装和维护当前项目所需的所有模块

##### 搭建 Webpack 环境

Webpack 本质上是基于 nodejs 开发的模块打包工具，所以需要安装 nodejs~ （这个我早就安好了）
node 官网安装： 选择 LTS 而不是 Current 版本。 因为 LTS 是稳定的最新版本。 Current 是测试版本(不太稳定)

提高 webpack 打包速度有两个非常重要的点：

1. 保持 nodejs 版本尽量新
2. 保持 webpack 的版本尽量新

---

如果在终端输入 npm -v 和 node -v 都有对应的版本号，说明 node、npm 安装已成功

安装 Webpack：

1. 在创建的项目文件夹下，运行：`npm init`
   (注意：npm 是 node 的包管理工具，它可以帮助我们以 node 规范的形式创建一个项目或创建一个规范的 node 的包文件。所以我们要想用 webpack 去管理项目,首先要让项目符合 node 的规范，用 npm init 初始项目的时候，这个项目就会符合 node 的规范, 生成一个 package.json 文件)
2. webpack 安装(两种方式):
3. 全局安装 npm install webpack webpack-cli -g (我的电脑要加一个 sudo) 查看 webpack 和 webpack-cli 版本： webpack -v (全局安装：不推荐使用 问题： 如果两个项目都要 webpack 打包，但是一个项目要的是 webpack4 一个项目是 webpack5 打包，这就难受了~)

卸载全局的 webpack 的方法： npm uninstall webpack webpack-cli -g (加一个 sudo)

2. 项目内安装 webpack 进入需要安装 webpack 的项目根目录里。然后运行代码： npm install webpack webpack-cli --save-dev
   (也可不写--save-dev 直接换成 -D 这两个是等价的) 这时候在终端输入 webpack -v 是找不到 webpack 的，因为我们输入 webpack 这个命令的时候，node 会在全局模块中找 webpack，但是这时候我们的 webpack 并没有安装在全局。而是安装在项目内。 但是 node 提供了一个命令叫 npx 我们通过： npx webpack -v 可以看见 webpack 和 webpack-cli 版本 npx 会帮助我们在当前项目的目录的 node_modules 文件夹里帮助我们找 webpack 安装包

如何看一个包的版本号是否存在(查看包的历史版本~)？ 可以在终端输入： npm info webpack

> npx 和 npm 二者的关系：npx 会到当前文件夹下的 node_modules 下找命令，而 npm 只会到全局去找命令

##### 使用 Webpack 的配置文件

各种文件(比如 js 文件和图片文件)的打包流程是不一样的
(js 文件可以直接执行，图片文件这些需要自己配置打包流程才行)
现在的 webpack 有一些默认的配置文件。

如果你想在 webpack 中编写 webpack 的配置文件。  
webpack 的默认配置文件： webpack.config.js 所以自己可以创建这个文件来自己编写配置

```
webpack.config.js：
/* CommendJS 语法 */
module.exports = {   // 这是一个对象
// 这些配置都是webpack给我们提供的配置接口
  entry: './index.js',        // 项目要做打包，这里是指的项目从哪一个文件进行打包(这里我弄的是study1 文件夹里的配置)
  output: {  // 对象
    filename: 'bundel.js', 打包好的文件的命名
    path: path.resolve(__dirname, 'bundle')      // 这里指的是打包的文件我要放置到哪一个文件夹下(path后面要跟一个绝对路径, 这里要引入node的一个核心模块
    const path = require('path');
    然后调用path的resolve方法。把__dirname 这个node里的变量，和bundle(文件夹名)做一个结合，就是bundle.js的绝对路径了
    )
  }
}
```

输入 npx webpack 看看是否生成了想要的打包文件

如果运行正确的话： 会有一个 bundle 文件夹生成，以及文件夹里有个 bundle.js 文件(被压缩了的)

如果不想用 webpack.config.js 命名 webpack 的配置文件。而是用其他名字，那么打包的时候要注意应该输入的不是 npx webpack 而是 npx webpack --config webpackconfig.js

---

> 使用 npx script 简化 打包代码~

```
1. 在package.json文件里，scripts 配置内容：
"script": {
  "bundle": "webpack"
}
这句话的意思是，当你执行bundle这个命令的时候，就会自动去执行webpack这个命令   因此，就可以不再使用 npx webpack 这个指令来打包了，而是使用 npx run bundle 来执行同样的操作

原理： 当运行npm run bundle的时候，实质是在运行package.json里面的bundle命令 (scripts 里的内容会先去对应文件夹下的node_modules找是否安装了webpack)
```

注意：
如果是全局安装 webpack

运行 webpack 打包的指令： webpack + 文件名

如果是在项目里安装 webpack

运行 webpack 打包的指令： npx wenpack + 文件名

(如果在 package.json 文件里的 scipt 做了一些操作的话)

运行 webpack 打包的指令： npm run ...

```
小总结：
webpack 做打包的时候其实并不知道该如何打包~ 需要配置文件(webpack.config.json)来辅助它打包。如果你不写webpack.config.json 其实webpack也有自己的一套默认配置方案，只是功能少，如果不写自己的配置，就会使用默认配置。 所以根据工程需求，我们要配置专属的功能

const path = require('path');

module.exports = {
  entry: '....',   // 项目打包的入口文件
  output: {
    filename: '....', // 打包出的最终运行文件
    path: path.resolve(__dirname, '文件夹名') // 绝对路径(其实不写也可以，因为webpack有个默认的path配置项)
  }
}
```

##### webpack-cli 的作用

使我们能在命令行里正确使用 webpack 命令，如果没安装 webpack-cli，那么我们就无法在命令行里使用 webpack 或 npx webpack 这样的指令

##### 浅谈 Webpack 打包知识点

npm run bundle 后，终端显示的内容如下：
Hash: .... // 哈希值，代表本次打包的唯一哈希值
Version: webpack 版本

webpack 默认 mode 配置: production  
mode: 'production' 这样打包的代码会被压缩~

mode: 'development' 这种打包，代码是不会被压缩的

##### Loader 是什么？

当你去打包一个模块的时候(比如打包 png 文件，应该有什么配置，就应该像下面这样来写~)

(注意： 在默认 Webpack 配置下，webpack 是能够打包 js 文件的)

例如：

```
module.exports = {
  module: {
    rules: [{ // 规则
      test: /\.jpg$/, // 这是以 jpg 结尾的文件
      use: { // 打包方式
        loader: 'file-loader' // 要安装该 loader(npm install file-loader -D)
      }
    }]
  }
}
```

file-loader 底层帮助我们做了以下几件事

1. 首先会帮我们打包，移动到 dist 文件夹下
2. 文件地址返回到变量

> loader 是什么？

loader 其实就是一个打包的方案，它知道对于一个特定的文件(比如 ong 文件、css 文件...)，webpack 应该如何去打包

> 使用 Loader 打包静态资源(图片篇)

如果希望图片文件打包后，图片名字不会变。需要做的配置如下：

```
 use: {
        loader: 'file-loader',
        options: {
          // placeholder 占位符
          name: '[name].[ext]'   // 打包生成的名字(包括后缀)和原来的名字一模一样
        }
      }
```

url-loader 和 file-loader 非常相似，只是多了一个 limit 的选项
