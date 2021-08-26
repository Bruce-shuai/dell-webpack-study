// 首先 安装 npm install react react-dom --save

import "@babel/polyfill";
import React, { Component } from 'react';
import ReactDom from 'react-dom';

const App = () => {
  return <div>Hello World</div>
}

ReactDom.render(<App />, document.getElementById('root'));