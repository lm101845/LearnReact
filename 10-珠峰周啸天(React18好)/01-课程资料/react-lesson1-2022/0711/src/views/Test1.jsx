import React from "react";

const Test1 = function Test1() {
    let num = 0;
    return <div className="box">
        {num}
        <br />
        <button onClick={() => {
            num++;
            console.log(num);
        }}>新增</button>
    </div>;
};

export default Test1;