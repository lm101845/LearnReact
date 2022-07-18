import React, {useCallback, useState} from 'react';
import A from "./components/A";

const App = () => {
    console.log('App渲染');
    const [count, setCount] = useState(1);

    // useCallback
    // useCallback 是一个钩子函数，用来创建React中的回调函数
    // useCallback 创建的回调函数不会总在组件重新渲染时重新创建

    // const clickHandler = () => {
    //     setCount(prevState => prevState + 1);
    // };

    const [num, setNum] = useState(1);

    /*
    *   useCallback()
    *       参数：
    *           1. 回调函数
    *           2. 依赖数组
    *               - 当依赖数组中的变量发生变化时，回调函数才会重新创建
    *               - 如果不指定依赖数组，回调函数每次都会重新创建
    *               - 一定要将回调函数中使用到的所有变量都设置到依赖数组中
    *                   除了（setState）
    * */
    const clickHandler = useCallback(() => {
        setCount(prevState => prevState + num);
        setNum(prevState => num + 1);
    }, [num]);

    return (
        <div>
            <h2>App -- {count}</h2>
            <button onClick={clickHandler}>增加</button>
            <A onAdd={clickHandler}/>
        </div>
    );
};

export default App;
