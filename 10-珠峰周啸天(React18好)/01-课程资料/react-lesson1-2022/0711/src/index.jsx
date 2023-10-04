import React from 'react';
import ReactDOM from 'react-dom/client';
import FunctionComponent from './views/FunctionComponent';
import Test1 from './views/Test1';
import ClassDemo from './views/ClassDemo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <FunctionComponent x={20} y='30' arr={[10, 20, 30]}>
      <div className="slot-box" slot="foot">
        尾部信息
      </div>
      <div className="slot-box" slot="head">
        头部信息
      </div>
    </FunctionComponent> */}
    {/* <Test1 /> */}

    <ClassDemo x={10} />
  </React.StrictMode>
);

/*
 render渲染的时候，如果发现type值是一个
   @1 字符串：创建元素标签....
   @2 函数：把函数执行，把解析出来的props当做实参传递给函数
     + 单闭合调用，不能传递子节点信息「没有children」
     + 双闭合调用，可以有children -> 实现出类似于vue中插槽的概念「有助于组件的更多复用」
   @3 类：把类基于new执行，创造其一个实例
 */
/* console.log(
  React.createElement(
    FunctionComponent,
    {
      x: 20,
      y: "30",
      arr: [10, 20, 30]
    },
    React.createElement(
      "div",
      {
        className: "slot-box"
      },
      "\u6211\u662F\u4E00\u4E9B\u989D\u5916\u7684\u4FE1\u606F"
    )
  )
); */
/* 
console.log(React.createElement(ClassDemo, {
  x: 10,
  y: 20
})); */