// 组件写法1：类式组件
// import React, { Component } from 'react';
// export default class App extends Component {
//     constructor() {
//         super();
//         this.state = {
//             message: '你好啊，李银河'
//         }
//     }
//     //render函数是组件里面必须实现的方法
//     render() {
//         return (
//             <div>
//                 <h1>我是类式App组件</h1>
//                 <h2>{this.state.message }</h2>
//             </div>
//         );
//     }
// }

// 组件写法2：函数式组件
/***
 * 函数式组件的特点：
 *  1.没有this对象
 *  2.没有内部状态(hooks可以用来解决这个问题)
 */
import React from 'react';
export default function App() {
    return (
        <div>
            <h1>我是function形式的App组件</h1>
            <h2>你好啊，王小波</h2>
        </div>
    );
    //函数式组件或render函数可以return的东西是比较固定的
}