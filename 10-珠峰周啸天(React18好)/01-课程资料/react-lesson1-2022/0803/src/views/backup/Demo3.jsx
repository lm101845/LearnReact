import React from "react";
import sty from './demo3.module.css';

const Demo = function Demo() {
    const { demo, title, subTitle } = sty;
    return <div className={demo}>
        <h1 className={title}>珠峰培训</h1>
        <h2 className={subTitle}>珠峰培训</h2>
        <span>珠峰培训</span>
    </div>;
};
export default Demo;