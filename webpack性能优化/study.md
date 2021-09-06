### webpack 性能优化

#### 提升 webpack 打包速度的方法

<!-- 等下 webpack性能优化3看完后，看看 resolve 等文档内容 -->

> 注意！如果改了 webpack 的配置，需要重启 webpack 再运行代码

1. 跟上技术的迭代(Node, Npm, Yarn) 都需要最新版本(因为版本会做性能优化)
2. 在尽可能少的模块上应用 Loader(对于 exclude 和 include 这种语法要多用起来，让 loader 作用范围尽可能的小)
3. plugin 尽可能精简并确保可靠
4. resolve 参数合理配置(不要过度配置 resolve，恰到好处就行，不然会降低 webpack 的打包速度？) ---> 具体操作 看 webpack 文档
5. 使用 DllPlugin 提高打包速度
