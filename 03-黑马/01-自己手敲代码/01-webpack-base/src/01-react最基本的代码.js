/*
 * @Author: liming
 * @Date: 2021-04-12 07:21:58
 * @LastEditTime: 2021-04-12 07:22:29
 * @FilePath: \01-黑马\01-自己手敲代码\01-webpack-base\src\main.js
 */
// 假设,main.js还是我们的入口文件
console.log("ok");

// 1.这2个导入的时候，接收的成员名称，必须这么写
import React from "react";
// 创建组件、虚拟DOM元素、生命周期
import ReactDOM from "react-dom";
// 将创建好的组件和虚拟DOM放到页面上展示

// 2.创建虚拟DOM元素
// 参数1：创建的元素的类型，字符串，表示元素的名称
// 参数2：是一个对象或null,表示当前这个DOM元素的属性
// 参数3：子节点(包括其他虚拟DOM或文本子节点)
// 参数n：其他子节点
// <h1 id='myh1' title='this is a h1'>这是一个大大的h1</h1>
// const myh1 = React.createElement("h1", null, "这是一个大大的H1");
const myh1 = React.createElement(
  "h1",
  { id: "myh1", title: "this is a h1" },
  "这是一个大大的H1"
);

const mydiv = React.createElement("div", null, "这是一个div元素", myh1);
//第4个参数myh1表示h1是div的子节点
// 但是这样做很麻烦，我创建一个元素就调用一个api，一个页面中有几百个元素，那就要调用几百次，太麻烦了

// 渲染页面上的DOM结构，最好的方式就是使用HTML代码。
// 但是js文件里面正常情况下是不允许你写HTML代码的
// 但是React里面就允许你这么干

// const mytest = <div>aaa</div>;
// 3.使用ReactDOM把虚拟DOM渲染到页面上
// 参数1：要渲染的那个虚拟DOM元素
// 参数2：指定页面上的容器(我这个元素要放到容器内)
// ReactDOM.render(myh1, "#app");
// 这样写会报错
// 经过分析，猜测：第二个参数接收的应该是一个DOM元素而不是选择器

ReactDOM.render(myh1, document.getElementById("app"));
// app前面不用写#号的
