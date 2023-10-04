import React, { useState } from "react";

// 自定义Hook：提供公共的逻辑和操作
const usePartState = function usePartState(initial) {
    // initial:初始状态值「对象，包含需要的多个状态」
    let [state, setState] = useState(initial);

    // 定义支持部分状态修改的办法
    const setPartState = (partState) => {
        setState({
            ...state,
            ...partState
        });
    };

    return [state, setPartState];
};


export default function Demo(props) {
    let [state, setState] = usePartState({
        x: 10,
        y: 20
    });
    const handler = () => {
        setState({
            x: state.x + 10
        });
    };
    return <div>
        <span>{state.x}</span>
        <span>{state.y}</span>
        <button onClick={handler}>处理</button>
    </div>;
};