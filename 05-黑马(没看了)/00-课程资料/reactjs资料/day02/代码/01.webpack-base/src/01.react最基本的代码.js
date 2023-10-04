// 假设，main.js 还是我们的入口文件
// console.log('ok')
// webpack-dev-server 打包好的 main.js 是托管到了内存中；所以在项目根目录中看不到；
// 但是，我们可以认为，在项目根目录中，有一个看不见的 main.js


// 1. 这两个导入时候，接收的成员名称，必须这么写
import React from 'react' // 创建组件、虚拟DOM元素，生命周期
import ReactDOM from 'react-dom' // 把创建好的 组件 和 虚拟DOM 放到页面上展示的


// 2. 创建虚拟DOM元素
// 参数1： 创建的元素的类型，字符串，表示元素的名称
// 参数2： 是一个对象或 null, 表示 当前这个 DOM 元素的属性
// 参数3： 子节点（包括 其它 虚拟DOM 获取 文本子节点）
// 参数n: 其它子节点
//  <h1 id="myh1" title="this is a h1">这是一个大大的H1</h1>
// const myh1 = React.createElement('h1', null, '这是一个大大的H1')
const myh1 = React.createElement('h1', { id: 'myh1', title: 'this is a h1' }, '这是一个大大的H1')

const mydiv = React.createElement('div', null, '这是一个div元素', myh1)

// 渲染 页面上的 DOM 结构，最好的方式，就是写 HTML 代码

// const mytest = <div>aaa</div>


// 3. 使用 ReactDOM 把虚拟DOM 渲染到页面上
// 参数1： 要渲染的那个虚拟DOM元素
// 参数2： 指定页面上的DOM元素，当作容器 
ReactDOM.render(mytest, document.getElementById('app'))
// Target container is not a DOM element.  经过分析，猜测：第二个参数接收的应该是一个  DOM 元素而不是 选择器



/* const vm = new Vue({
  data:{},
  el: '#app',
  methods: {}
}) */