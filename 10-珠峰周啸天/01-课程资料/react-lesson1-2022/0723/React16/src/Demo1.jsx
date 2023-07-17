import React, { useState } from "react";

export default function Demo(props) {
    console.log('OK');
    let [x, setX] = useState(10);
    let [y, setY] = useState(20);

    const handler = () => {
        /* setX(100);
        setY(200); */

        setTimeout(() => {
            setX(100);
            setY(200);
        }, 1000);
    };

    return <div>
        <span>{x}</span>
        <span>{y}</span>
        <button onClick={handler}>处理</button>
    </div>;
};