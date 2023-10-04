/**
 * @Author liming
 * @Date 2023/10/2 7:13
 **/
// 函数组件每一次渲染/更新，都具备独立的闭包
import React, { useState } from "react";
export default function Demo(props) {
    let [num, setNum] = useState(10);
    /**
     *  函数组件的第一次渲染和每一次更新，都是把函数重新执行「产生新的闭包」
     */
    const handler = () => {
        console.log('handler函数执行了')
        setNum(100);
        /**
         * 在React中，useState Hook是异步的。当你调用setNum函数时，React会开始更新状态，但这个更新并不会立即完成。
         * 这就是为什么在你的setTimeout回调函数中，打印num的值仍然是旧的值（在这个例子中是10），而不是你刚刚通过setNum设置的新值（100）。
         *
         * 这是因为setTimeout回调函数在状态更新完成之前就已经被执行了。
         * 换句话说，setTimeout中的代码是在React的状态更新之前运行的，因此它无法访问到更新后的状态值。
         *
         * 如果你想要在状态更新后执行某些操作，你可以使用useEffect Hook。useEffect可以接受一个回调函数，
         * 并在组件的状态或属性发生变化时执行这个回调函数。
         */
        setTimeout(() => {
            console.log('setTimeout执行了')
            console.log(num); //10
        }, 5000);
    };
    return <div>
        <span>{num}</span>
        <button onClick={handler}>新增</button>
    </div>;
};
