### Webpack 是什么？

Webpack 出现之前，单纯的静态页面还好。只有简单的代码逻辑。但随着业务需求变得复杂且庞大。一个文件难以承载这么多的代码量及代码逻辑，以及难以进行代码维护。

选择多文件管理(其实也就是面向对象思维)。 于是在一个 html 页面会让 script 标签就会多次使用(引入多个 js 文件)，这种 scipt 标签创建文件的方法。文件之间似乎不用 import、export 这种模块导入的方法就已经能够相互关联了

但是多个 script 标签会带来以下问题(注意哦！性能优化要好好考虑考虑)

```
1. 整个页面的运行加载速度会变慢（http请求会增多！每个script标签都要一次http请求 之前说过，http请求比cpu计算，页面渲染要耗费的时间更多！！）

2. 虽然在同个html页面的任一script标签的内容可以相互关联，但是开发者却很难从代码中看出某个代码函数是源于哪个文件。(很难明晰各个代码及对应文件的层级关系)

3. 很难查错。 因为在html中，代码是顺序执行的。script标签也是顺序执行的，因此script对应文件的放置也是有讲究的。很可能上一个代码文件的内容需要 下一个代码文件的内容支持才行，但因为文件的顺序放错，程序出错，但这种错误又很难被开发者发现
```

#### 新方法

(牛逼，平时都是这样用的，但以前却不知道为什么要这样用)：
只在 html 文件引入一个 script 标签(一个 js 公共文件)就可以了，然后在 js 文件里引入其他 js 文件(引入方法： import、export「这是 es6 的语法，普通浏览器是无法支持的，需要 babel 转译」 或者用 commendjs 的 modules.exports、require)。 这样 html 只需请求一次 js 文件。 并且文件与文件之间的依赖关系变得非常清晰了还有就是即使 import 文件的顺序不一样，也毫无影响~

但是注意： 如果直接在 js 中这样使用 import，export(非 react、vue 框架) 称为 ES Module 方法，会报错！！ ~哈哈，这也给了我一个思考点，关于 react、vue 的优势！！！
(有个问题： 如果使用 module.exports 和 require 呢？ 好像也是不能够使用的？！！)
通过 webpack 来翻译 import，export，让浏览器能够识别 import export 方法

#### 安装 webpack

1. 进入项目文件目录： npm init 或者 npm init -y(这样可以减少一些操作) (这样会在根目录下得到一个 package.json 文件)
2. 安装 webpack: npm install webpack webpack-cli --save-dev

#### 通过 webpack 翻译 import、export

```
1. 终端： npx webpack 文件路径    // 通过webpack去翻译在script标签的js文件, 这里的npx 起到了一个什么样的作用呢？

输入此npm并安装后，根目录多了一个dist文件夹，该文件夹里面多了一个main.js 文件~  该文件就是webpack帮助我们翻译好了的文件！！此时html的script标签引入的不再是原来的index.js 标签，而应该换成dist文件夹里的main.js 这个文件

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
