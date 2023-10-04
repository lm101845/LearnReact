import React from 'react';
import ReactDOM from 'react-dom/client';
import './code';

/* let name = "珠峰培训";
let num = 10;
let arr = [{
  id: 1,
  title: '哈哈哈'
}, {
  id: 2,
  title: '呵呵呵'
}];
let obj = {
  name: 'xxx',
  age: 25
}; */

/* const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <div className="box">{name}</div>
    <div style={{
      color: 'red',
      fontSize: '14px'
    }}>
      {num > 10 ? 'OK' : 'NO'}
    </div>
    <ul>
      {arr.map(item => {
        let { id, title } = item;
        return <li key={id}>
          {title}
        </li>;
      })}
    </ul>
    {Reflect.ownKeys(obj).map((key, index) => {
      let val = obj[key];
      return <span key={index}>
        {key} : {val}
      </span>
    })}
  </>
); */

/* let level = 6;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    {React.createElement(`h${level}`, null, "我是标题")}
  </>
); */

/*
 {}中可以渲染出来的值
   原始值类型：只渲染字符串/数字，其余的值都会渲染为空 
   对象类型：
     数组对象：可以进行渲染，而且不是转换为字符串（每一项之间没有逗号分隔），它会逐一迭代数组每一项，把每一项都拿出来单独进行渲染！！
     函数对象：可以做为函数组件进行渲染，但是要写成 <Component/> 这种格式
     其它对象：一般都是不可以直接进行渲染的 
        + 可以是一个jsx对象
        + 如果设置的是style样式，则样式值必须写为对象格式
        + ...
 */


/* const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className="box">
    <h2 className="title">我是标题</h2>
    <ul className="list" style={{ color: 'red' }}>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
    </ul>
  </div>
); */

/* const jsx = React.createElement(
  "div",
  { className: "box" },
  React.createElement(
    "h2",
    { className: "title" },
    "\u6211\u662F\u6807\u9898"
  ),
  React.createElement(
    "ul",
    {
      className: "list",
      style: {
        color: 'red'
      }
    },
    React.createElement("li", null, "\u5217\u88681"),
    React.createElement("li", null, "\u5217\u88682"),
    React.createElement("li", null)
  )
);
console.log(jsx); */


/*
 JSX语法底层的渲染机制
   @1 基于 babel-preset-react-app 语法包，可以把jsx语法，渲染解析为 React.createElement 格式 
    遇到“HTML标签/调用组件标签”，就会创建为createElement格式
    React.createElement(
      标签名/组件,
      属性对象:对象中包含标签上设置的各个属性，如果没有任何属性，值是null,
      后续的参数都是其子节点
    )
   
  @2 把React.createElement方法执行，创建出“JSX元素对象/虚拟DOM对象/React child”
    {
      $$typeof: Symbol(react.element),
      type: "div" ,  //标签名/组件
      props: {
        含解析出来的各个属性,
        如果有子节点，则多一个chldren的属性，没有子节点就没有这个属性，属性值可能是一个值或者是一个数组
      },
      ref: null,
      key: null
    }

  @3 root.render 把虚拟DOM对象转换为真实的DOM对象,放在浏览器中进行渲染
 */