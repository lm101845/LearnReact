// 1.导入包
import React from "react";
import ReactDOM from "react-dom";

// 创建虚拟DOM元素
// 回顾：什么是虚拟DOM  用JS对象的形式，来表示DOM元素和DOM之间的嵌套关系

// 写法1：恶心写法
// const mydiv = React.createElement(
//   "div",
//   { id: "mydiv", title: "div aaa" },
//   "这是一个div元素"
// );

// HTML是最优秀的标记语言

// 写法2：简洁写法
// 但是这行代码并不符合js语法规范，所以需要使用第三方Loader
// 注意：在JS文件中，默认不能写这种类似于HTML一样的标记，否则打包会失败
// 为了解决这个问题，我们可以安装babel来转换这些JS中的标签
// 大家注意，这种在js中混合写入类似于HTML的语法叫做JSX语法;即符合XML规范的JS
// 我们可以把JSX转换为上面的写法1，写法1是不会报错的
// 注意：JSX语法的本质，还是在运行的时候，被转换成了React.createElement的形式来执行
const mydiv = (
  <div id="mydiv" title="div aaa">
    这是一个div元素
    <h1>这是一个大大的H1</h1>
  </div>
);
// 这个标签不是你直接写完后直接丢到页面上显示了，而是中间被babel进行了一层转换

// 调用render函数渲染
ReactDOM.render(mydiv, document.getElementById("app"));
