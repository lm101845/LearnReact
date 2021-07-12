// 1. 导入包
import React from 'react'
import ReactDOM from 'react-dom'

// 2. 创建虚拟DOM元素
// 回顾：什么是虚拟DOM   用JS对象的形式，来表示 DOM 和 DOM 之间的嵌套关系
// const mydiv = React.createElement('div', { id: 'mydiv', title: 'div aaa' }, '这是一个div元素')

// HTML 是最优秀的标记语言；
// 注意： 在 JS 文件中，默认不能写 这种 类似于 HTML 的标记；否则 打包会失败；
// 可以使用 babel 来转换 这些 JS 中的标签；
// 大家注意：这种 在 JS 中，混合写入类似于 HTML 的语法，叫做 JSX 语法； 符合 XML 规范的 JS ；
// 注意： JSX 语法的本质，还是 在运行的时候，被转换成了 React.createElement 形式来执行的；
const mydiv = <div id="mydiv" title="div aaa">
  这是一个div元素
<h1>这是一个大大的H1</h1>
</div>


// 3. 调用 render 函数渲染
ReactDOM.render(mydiv, document.getElementById('app'))