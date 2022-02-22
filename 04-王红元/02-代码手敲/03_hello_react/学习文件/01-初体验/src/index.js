// import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// 这样写index.js里面内容太多了
// class App extends React.Component {
//     constructor() {
//         super()
//         this.state = {
//             counter: 0
//         }
//     }
//     render() {
//         return (
//             <div>
//                 <h1>Hello React!</h1>
//                 <h2>当前计数</h2>
//                 <button>+</button>
//                 <button>-</button>
//             </div>
//         );
//     }
// }

// ReactDOM.render( < h2 > 你好, React < /h2>, document.getElementById('root'))
ReactDOM.render( < App / > , document.getElementById('root'))
    // 注意：h2尾部标签的/要放到前面！！不然报错！！