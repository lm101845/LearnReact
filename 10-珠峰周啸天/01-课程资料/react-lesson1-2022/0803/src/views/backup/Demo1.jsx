import React from "react";

const Demo = function Demo(props) {
    let { color } = props;

    const boxSty = {
        width: '300px',
        height: '200px',
        backgroundColor: 'lightblue'
    };
    const textSty = {
        color,
        fontWeight: 'normal',
        fontSize: '18px'
    };

    return <div style={boxSty}>
        <h1 style={textSty}>珠峰培训</h1>

        <h2 style={{
            ...textSty,
            fontSize: '16px'
        }}>珠峰培训</h2>

        <span>珠峰培训</span>
    </div>;
};
export default Demo;