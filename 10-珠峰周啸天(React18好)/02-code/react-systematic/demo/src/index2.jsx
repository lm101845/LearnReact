import React from 'react';
import ReactDOM from 'react-dom/client';
import DemoOne from "@/views类组件上下文/DemoOne";



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        珠峰培训
        <DemoOne title="我是标题" x = {100} data = {[100,200]} className="box" style={{fontSize:'30px'}}/>
        <DemoOne>
            <span>哈哈哈</span>
            <h2>
                <ul>
                    <li>你好</li>
                    <li>我好</li>
                    <li>大家好</li>
                </ul>
            </h2>
        </DemoOne>
    </>
)

console.log(React.createElement(DemoOne, {
    title: "\u6211\u662F\u6807\u9898",
    x: 100,
    data: [100, 200],
    className: "box",
    style: {
        fontSize: '30px'
    }
}))
