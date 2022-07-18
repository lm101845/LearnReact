import React, {useState} from 'react';
import B from './B';

const App = () => {
    console.log('App组件重新渲染了！');


    const [count, setCount] = useState(0);

    /*
    * Too many re-renders.
    *   - 当我们直接在函数体中调用setState时，就会触发上述错误
    *   - 问题：
    *       不是说过，当新的state值和旧值相同时，它是不会触发组件的重新渲染的
    *   - setState()的执行流程（函数组件）
    *       setCount() --> dispatchSetDate()
    *                       --> 会先判断，组件当前处于什么阶段
    *                   如果是渲染阶段 --> 不会检查state值是否相同
    *                   如果不是渲染阶段 --> 会检查state的值是否相同
    *                       - 如果值不相同，则对组件进行重新渲染
    *                       - 如果值相同，则不对组件进行重新渲染
    *                           如果值相同，React在一些情况下会继续执行当前组件的渲染
    *                               但是这个渲染不会触发其子组件的渲染，这次渲染不会产生实际的效果
    *                               这种情况通常发生在值第一次相同时
    *
    * */
    // setCount(0);

    /*
    *   count 0
    *       第一次点击按钮 count --> 1
    *           'App组件重新渲染了！' 执行了
    *       第二次点击按钮 count --> 1
    *           'App组件重新渲染了！' 执行了
    *       第三次点击按钮 count --> 1
    *           'App组件重新渲染了！' 没执行
    *
    * */
    const clickHandler = ()=>{
        console.log('点击按钮！');
      setCount(1);
    };

    return (
        <div>
            {count}

            <B/>
            <button onClick={clickHandler}>点我一下</button>
        </div>
    );
};

export default App;
