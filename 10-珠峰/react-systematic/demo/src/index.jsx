import React from 'react';
import ReactDOM from 'react-dom/client';
import DemoOne from "./views/DemoOne";
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        <DemoOne title="我是标题1" x={20}>
            <span slot="footer">我是页脚1</span>
            <span slot="footer">我是页脚2</span>
            <span>哈哈哈</span>
            <span slot="header">我是页眉</span>
            {/*注意：slot是随便取的，也可以叫别的*/}
        </DemoOne>
        {/*<DemoOne title="我是标题2">*/}
        {/*    <span>哈哈哈</span>*/}
        {/*    <span>嘿嘿嘿</span>*/}
        {/*</DemoOne>*/}
        {/*<DemoOne title="我是标题3"/>*/}
    </>
)
