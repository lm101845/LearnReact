


/*
*   组件
*       - React中组件有两种创建方式
*       - 函数式组件
*           - 函数组件就是一个返回JSX的普通
*           - 组件的首字母必须是大写
*       - 类组件
* */
import ReactDOM from "react-dom/client";
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById('root'));

// React组件可以直接通过JSX渲染
root.render(<App/>);
