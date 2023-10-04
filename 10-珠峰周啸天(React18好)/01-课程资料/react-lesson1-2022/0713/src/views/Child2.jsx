import React from "react";

const Child2 = function Child2(props, ref) {
    // console.log(ref);  //传递进来的REF对象
    return <div>
        我是子组件「函数组件」
        <div className="box" ref={ref}></div>
    </div>;
};
export default Child2; 
